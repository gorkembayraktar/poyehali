import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { FaPerson, FaPersonWalking } from 'react-icons/fa6'

function PathProgress() {
    const { scrollYProgress } = useScroll()
    const containerRef = useRef(null)
    const [isInteracting, setIsInteracting] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const [walkFrame, setWalkFrame] = useState(0)

    // Detect scrolling activity
    useEffect(() => {
        let scrollTimeout
        const unsubscribe = scrollYProgress.on("change", () => {
            setIsScrolling(true)
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => setIsScrolling(false), 200)
        })
        return () => {
            unsubscribe()
            clearTimeout(scrollTimeout)
        }
    }, [scrollYProgress])

    // Walking animation toggle (Only when moving)
    useEffect(() => {
        if (!isScrolling && !isInteracting) {
            setWalkFrame(0)
            return
        }

        const interval = setInterval(() => {
            setWalkFrame(prev => (prev === 0 ? 1 : 0))
        }, 300)
        return () => clearInterval(interval)
    }, [isScrolling, isInteracting])

    // Visual: Smooth spring for natural scrolling
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
    const smoothProgress = useSpring(scrollYProgress, springConfig)

    // This value will drive the marker position
    const displayProgress = useMotionValue(0)

    // Sync displayProgress with either smooth spring or direct interaction
    useEffect(() => {
        if (!isInteracting) {
            return smoothProgress.on("change", (latest) => {
                displayProgress.set(latest)
            })
        }
    }, [isInteracting, smoothProgress, displayProgress])

    const yPercentage = useTransform(displayProgress, [0, 1], ["0%", "100%"])

    const updateScrollFromPoint = (clientY) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const relativeY = clientY - rect.top
        const progress = Math.max(0, Math.min(1, relativeY / rect.height))

        // Update displayProgress IMMEDIATELY for zero-lag feedback
        displayProgress.set(progress)

        const scrollTarget = progress * (document.documentElement.scrollHeight - window.innerHeight)
        window.scrollTo({
            top: scrollTarget,
            behavior: 'auto'
        })
    }

    const handleTrackClick = (e) => {
        if (e.target.closest('.scroll-marker')) return
        updateScrollFromPoint(e.clientY)
    }

    const handlePanStart = () => setIsInteracting(true)
    const handlePanEnd = () => setIsInteracting(false)
    const handlePan = (event, info) => {
        updateScrollFromPoint(info.point.y)
    }

    return (
        <motion.div
            ref={containerRef}
            onClick={handleTrackClick}
            onPanStart={handlePanStart}
            onPanEnd={handlePanEnd}
            onPan={handlePan}
            className="sticky top-1/4 h-64 w-12 -left-10 hidden sm:flex flex-col z-50 pointer-events-auto cursor-pointer group select-none"
        >
            {/* Wider hit area (Invisible) */}
            <div className="absolute inset-y-0 w-full bg-transparent" />

            {/* Background Track */}
            <div className="absolute inset-y-0 w-1 bg-slate-200 dark:bg-white/5 rounded-full transition-all group-hover:bg-slate-300 dark:group-hover:bg-white/10" />

            {/* Active Progress Line */}
            <motion.div
                style={{ scaleY: displayProgress, transformOrigin: 'top' }}
                className="absolute inset-y-0 w-1 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full"
            />

            {/* Visual Marker (Always syncs with real scroll) */}
            <motion.div
                style={{ top: yPercentage }}
                animate={{
                    scale: isInteracting ? 1.3 : 1,
                    boxShadow: isInteracting ? "0 0 20px rgba(249, 115, 22, 0.4)" : "0 10px 15px -3px rgba(249, 115, 22, 0.3)"
                }}
                className="scroll-marker absolute w-8 h-8 -left-[14px] rounded-full bg-orange-500 shadow-xl shadow-orange-500/50 border-2 border-white dark:border-[#121212] flex items-center justify-center transition-shadow z-20"
            >
                <motion.div
                    animate={isScrolling || isInteracting ? {
                        y: [0, -2, 0],
                        rotate: [-5, 5, -5]
                    } : {
                        y: 0,
                        rotate: 0
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: isScrolling || isInteracting ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                >
                    {walkFrame === 0 ? (
                        <FaPerson className="text-xl text-white scale-x-[1.1]" />
                    ) : (
                        <FaPersonWalking className="text-xl text-white scale-x-[1.1]" />
                    )}
                </motion.div>
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-full bg-orange-400 blur-[8px] opacity-60 -z-10 animate-pulse" />
            </motion.div>
        </motion.div>
    )
}

export default PathProgress
