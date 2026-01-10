import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiSparkles, HiFire, HiAcademicCap, HiBookOpen, HiSpeakerWave, HiExclamationTriangle, HiCalculator, HiSwatch, HiChatBubbleLeftRight, HiArrowPath, HiBolt, HiTrophy, HiCheck, HiLockClosed, HiChevronDown } from 'react-icons/hi2'
import { learningPath, sections } from '../../data/learningPath'
import { lessonIcons, sectionIcons } from '../../constants/icons'
import { useProgress } from '../../contexts/ProgressContext'
import { useSound } from '../../contexts/SoundContext'
import PathNode from './PathNode'
import PathProgress from './PathProgress'
import Stories from './Stories'

const LearningPath = ({ view, sections: propSections }) => {
    const navigate = useNavigate()
    const { getLessonState, getOverallProgress, getStoriesProgress, streak, masterSection, masteredSections, getActiveLesson } = useProgress()
    const { playSFX } = useSound()
    const overallProgress = getOverallProgress()
    const activeLesson = getActiveLesson()
    const activeNodeRef = useRef(null)

    const [confirmingMastery, setConfirmingMastery] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const groupedLessons = learningPath.reduce((acc, lesson) => {
        const section = lesson.section
        if (!acc[section]) {
            acc[section] = []
        }
        acc[section].push(lesson)
        return acc
    }, {})

    // Determine which sections to show based on prop or view
    const sectionOrder = propSections || ['alphabet', 'phonetics', 'confusion', 'vocabulary', 'practice']

    // Flatten lessons for currently visible sections to find boundaries
    const viewLessons = sectionOrder.flatMap(key => groupedLessons[key] || [])

    // Determine the "smart" target lesson to scroll to for this view
    const targetScrollLessonId = (() => {
        if (!activeLesson || viewLessons.length === 0) return null

        // 1. If global active lesson is in this view, that's our target
        const isActiveInView = viewLessons.find(l => l.id === activeLesson.id)
        if (isActiveInView) return activeLesson.id

        // 2. If not, check if we are "past" this view or "before" it
        const activeGlobalIndex = learningPath.findIndex(l => l.id === activeLesson.id)
        const firstViewLesson = viewLessons[0]
        const lastViewLesson = viewLessons[viewLessons.length - 1]

        if (!firstViewLesson || !lastViewLesson) return null

        const firstViewGlobalIndex = learningPath.findIndex(l => l.id === firstViewLesson.id)
        const lastViewGlobalIndex = learningPath.findIndex(l => l.id === lastViewLesson.id)

        // If global pointer is beyond this view -> Show the end (Mastery)
        if (activeGlobalIndex > lastViewGlobalIndex) {
            return lastViewLesson.id
        }

        // If global pointer is before this view -> Show the start
        if (activeGlobalIndex < firstViewGlobalIndex) {
            return firstViewLesson.id
        }

        return viewLessons[0].id
    })()

    useEffect(() => {
        const clickedLessonId = sessionStorage.getItem('clicked_lesson_id')
        const clickedLessonTs = sessionStorage.getItem('clicked_lesson_ts')
        const clickedViewPath = sessionStorage.getItem('clicked_view_path')
        const savedPos = sessionStorage.getItem('path_scroll_pos')

        const isRecent = clickedLessonTs && (Date.now() - parseInt(clickedLessonTs) < 3600000)
        const isSameView = clickedViewPath === location.pathname

        // Helper to clear all scroll-related storage
        const clearScrollStorage = () => {
            sessionStorage.removeItem('clicked_lesson_id')
            sessionStorage.removeItem('clicked_lesson_ts')
            sessionStorage.removeItem('path_scroll_pos')
            sessionStorage.removeItem('clicked_view_path')
        }

        if (clickedLessonId && isRecent && isSameView) {
            // Robust polling to find the element even if rendering is delayed
            let attempts = 0
            const maxAttempts = 20 // 1 second total (20 * 50ms)

            const pollForElement = setInterval(() => {
                const element = document.getElementById(`lesson-node-${clickedLessonId}`)
                // console.log('Scroll Restore Polling:', { attempt: attempts, found: !!element })

                if (element) {
                    element.scrollIntoView({ behavior: 'auto', block: 'center' })
                    clearInterval(pollForElement)
                    clearScrollStorage() // Success! Clean up immediately
                }

                attempts++
                if (attempts >= maxAttempts) {
                    clearInterval(pollForElement)
                    // Fallback if element never found
                    if (savedPos) {
                        window.scrollTo(0, parseInt(savedPos))
                    }
                    clearScrollStorage() // Failed/Timed out. Clean up.
                }
            }, 50)

            return () => clearInterval(pollForElement)
        } else if (savedPos && isSameView) {
            // Context matches but no specific lesson ID (generic restore)
            window.scrollTo(0, parseInt(savedPos))
            clearScrollStorage()
        } else if (targetScrollLessonId && activeNodeRef.current && !clickedLessonId) {
            // Smart scroll (only if NOT restoring a user click)
            const timer = setTimeout(() => {
                activeNodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 500)
            return () => clearTimeout(timer)
        } else {
            // Cleanup on mount if we have stale keys for a different view or old data
            if (clickedLessonId || savedPos) {
                clearScrollStorage()
            }
        }
    }, [targetScrollLessonId, location.pathname])

    const handleLessonClick = (lesson) => {
        sessionStorage.setItem('path_scroll_pos', window.scrollY.toString())
        sessionStorage.setItem('clicked_lesson_id', lesson.id)
        sessionStorage.setItem('clicked_lesson_ts', Date.now().toString())
        sessionStorage.setItem('clicked_view_path', location.pathname)
        playSFX('nav_click.mp3')
        navigate(`/lesson/${lesson.id}`)
    }

    const handleMasterSection = (sectionId, title) => {
        if (confirmingMastery === sectionId) {
            masterSection(sectionId)
            playSFX('correct.mp3')
            setConfirmingMastery(null)
        } else {
            setConfirmingMastery(sectionId)
            playSFX('nav_click.mp3')
            setTimeout(() => setConfirmingMastery(null), 3000)
        }
    }



    const isSectionComplete = (sectionId) => {
        const sectionLessons = groupedLessons[sectionId] || []
        if (sectionLessons.length === 0) return false
        return sectionLessons.every(l => getLessonState(l.id) === 'completed')
    }

    const storiesProgress = getStoriesProgress()

    const menuItems = [
        {
            id: 'path',
            title: 'Öğrenme Yolu',
            subtitle: 'Genel İlerleme',
            icon: HiAcademicCap,
            progress: overallProgress,
            color: 'orange'
        },
        {
            id: 'cyrillic',
            title: 'Kiril Alfabesi',
            subtitle: 'Harfler & Sesler',
            icon: HiBookOpen,
            progress: getOverallProgress(sections['alphabet']), // Optional: custom progress calculation could be added later
            color: 'rose'
        },
        {
            id: 'stories',
            title: 'Hikayeler',
            subtitle: 'Diyaloglar & Pratik',
            icon: HiChatBubbleLeftRight,
            progress: storiesProgress,
            color: 'emerald'
        }
    ]

    const activeViewData = menuItems.find(item => item.id === view)
    const otherViewsData = menuItems.filter(item => item.id !== view)

    const ProgressCircle = ({ progress, size = 32, color = 'orange' }) => {
        // ... (ProgressCircle implementation remains same)
        const radius = (size / 2) - 4
        const circumference = 2 * Math.PI * radius
        const offset = circumference - (progress / 100) * circumference

        const colorMap = {
            orange: 'text-orange-500',
            emerald: 'text-emerald-500',
            rose: 'text-rose-500' // Added rose
        }

        return (
            <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
                <svg className="transform -rotate-90" width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        className="stroke-slate-100 dark:stroke-white/5 fill-none"
                        strokeWidth="3"
                    />
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        className={`${colorMap[color] || 'text-orange-500'} fill-none`}
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-[9px] font-black text-slate-500 dark:text-slate-400">%{progress}</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 md:top-4 z-40 mb-8 px-4 md:px-0"
            >
                <div className="mx-auto max-w-lg relative">
                    <button
                        onClick={() => {
                            playSFX('nav_click.mp3')
                            setIsMenuOpen(!isMenuOpen)
                        }}
                        className="w-full glass-card rounded-2xl p-4 border border-slate-200 dark:border-white/5 shadow-sm flex items-center justify-between group active:scale-95 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl transition-colors ${activeViewData.color === 'orange' ? 'bg-orange-500' : activeViewData.color === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'} text-white shadow-lg shadow-${activeViewData.color}-500/20`}>
                                <activeViewData.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <h2 className="font-bold text-slate-800 dark:text-white text-lg leading-tight uppercase tracking-tight">
                                    {activeViewData.title}
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                    {activeViewData.subtitle}: %{activeViewData.progress}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ProgressCircle progress={activeViewData.progress} size={36} color={activeViewData.color} />
                            <HiChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full left-0 right-0 mt-2 p-1.5 glass-card rounded-2xl border border-slate-200 dark:border-white/5 shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
                            >
                                {otherViewsData.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                                        onClick={() => {
                                            if (item.id === 'stories') {
                                                navigate('/story')
                                            } else if (item.id === 'cyrillic') {
                                                navigate('/alphabet')
                                            } else {
                                                navigate('/')
                                            }
                                            setIsMenuOpen(false)
                                            playSFX('nav_click.mp3')
                                        }}
                                        className="w-full flex items-center justify-between p-3.5 rounded-xl transition-all mb-1 last:mb-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-500/10 text-${item.color}-500`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <span className="block font-bold uppercase tracking-widest text-xs text-slate-400 leading-none mb-1">{item.subtitle}</span>
                                                <span className="block font-black uppercase tracking-tight text-sm text-slate-800 dark:text-white">{item.title}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">İLERLEME</span>
                                                <span className="block text-sm font-black text-slate-700 dark:text-slate-300 leading-none">%{item.progress}</span>
                                            </div>
                                            <ProgressCircle progress={item.progress} color={item.color} />
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="max-w-lg mx-auto relative">
                <div className="absolute left-0 top-0 bottom-0 w-0 hidden sm:block">
                    <PathProgress />
                </div>

                {view !== 'stories' ? (
                    <div className="px-4">
                        {sectionOrder.map((sectionKey, sectionIndex) => {
                            const sectionLessons = groupedLessons[sectionKey] || []
                            if (sectionLessons.length === 0) return null

                            const section = (sections && sections[sectionKey]) || { title: sectionKey }
                            const SectionIcon = sectionIcons[sectionKey] || HiBookOpen
                            const isMastered = isSectionComplete(sectionKey)

                            const prevSectionId = sectionIndex > 0 ? sectionOrder[sectionIndex - 1] : null
                            const isLocked = prevSectionId ? !isSectionComplete(prevSectionId) : false

                            return (
                                <motion.div
                                    key={sectionKey}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: sectionIndex * 0.1 }}
                                    className={`mb-12 ${isLocked ? 'opacity-50 grayscale-[0.5]' : ''}`}
                                >
                                    <div className={`
                                    sticky top-[172px] md:top-[92px] z-20 
                                    flex items-center justify-between mb-8 px-4 py-3 
                                    bg-slate-50/80 dark:bg-[#121212]/80 backdrop-blur-md 
                                    border-y border-transparent transition-all
                                    ${isLocked ? 'pointer-events-none' : ''}
                                `}>
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className={`p-2 rounded-xl ${isMastered ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>
                                                <SectionIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 dark:text-white leading-tight">
                                                    {section.title}
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                    {sectionLessons.length} Ders • {isMastered ? 'Tamamlandı' : isLocked ? 'Kilitli' : 'Devam Ediyor'}
                                                </p>
                                            </div>
                                        </motion.div>

                                        <button
                                            onClick={() => !isMastered && !isLocked && handleMasterSection(sectionKey, section.title)}
                                            className={`
                                            group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 overflow-hidden
                                            ${isMastered
                                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                                    : isLocked
                                                        ? 'bg-slate-100 dark:bg-white/5 border-transparent text-slate-400 cursor-not-allowed'
                                                        : confirmingMastery === sectionKey
                                                            ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20 animate-pulse'
                                                            : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400'
                                                }
                                        `}
                                        >
                                            {(isMastered || (confirmingMastery === sectionKey && !isLocked)) && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className={`absolute inset-0 -z-10 ${isMastered ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-amber-500'}`}
                                                />
                                            )}

                                            {isLocked ? (
                                                <HiLockClosed className="w-4 h-4" />
                                            ) : (
                                                <HiCheck className={`w-4 h-4 transition-transform duration-500 ${(isMastered || confirmingMastery === sectionKey) ? 'scale-125' : 'group-hover:scale-110'}`} />
                                            )}

                                            <span className="text-xs font-black uppercase tracking-widest">
                                                {isMastered ? 'BİLDİĞİM' : isLocked ? 'KİLİTLİ' : confirmingMastery === sectionKey ? 'EMİN MİSİN?' : 'BİLİYORUM'}
                                            </span>

                                            {!isMastered && !isLocked && confirmingMastery !== sectionKey && (
                                                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        {sectionLessons.map((lesson, lessonIndex) => {
                                            const globalIndex = learningPath.findIndex(l => l.id === lesson.id)
                                            const currentState = getLessonState(lesson.id)
                                            const nextLesson = sectionLessons[lessonIndex + 1]
                                            const nextState = nextLesson ? getLessonState(nextLesson.id) : null

                                            const isLeft = lessonIndex % 2 === 0
                                            const isLast = lessonIndex === sectionLessons.length - 1
                                            // Determine if this is the target lesson to scroll to
                                            const isTarget = lesson.id === targetScrollLessonId

                                            return (
                                                <div
                                                    key={lesson.id}
                                                    id={`lesson-node-${lesson.id}`}
                                                    className="relative"
                                                    ref={isTarget ? activeNodeRef : null}
                                                >
                                                    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                                        <div className={`${isLeft ? 'ml-8 md:ml-16' : 'mr-8 md:mr-16'}`}>
                                                            <PathNode
                                                                lesson={lesson}
                                                                onClick={handleLessonClick}
                                                                index={globalIndex}
                                                            />
                                                        </div>
                                                    </div>

                                                    {!isLast && (
                                                        <svg
                                                            className="w-full h-24 overflow-visible pointer-events-none"
                                                            viewBox="0 0 400 100"
                                                            preserveAspectRatio="none"
                                                        >
                                                            <path
                                                                d={isLeft
                                                                    ? "M 80 0 C 80 50, 320 50, 320 100"
                                                                    : "M 320 0 C 320 50, 80 50, 80 100"
                                                                }
                                                                fill="none"
                                                                stroke={currentState === 'completed' ? '#10b981' : '#cbd5e1'}
                                                                strokeWidth="4"
                                                                strokeLinecap="round"
                                                                className="dark:stroke-slate-600 drop-shadow-sm"
                                                            />
                                                            {currentState === 'completed' && (nextState === 'active' || nextState === 'in_progress') && (
                                                                <motion.circle
                                                                    r="6"
                                                                    fill="#6366f1"
                                                                >
                                                                    <animateMotion
                                                                        dur="2s"
                                                                        repeatCount="indefinite"
                                                                        path={isLeft
                                                                            ? "M 80 0 C 80 50, 320 50, 320 100"
                                                                            : "M 320 0 C 320 50, 80 50, 80 100"
                                                                        }
                                                                    />
                                                                </motion.circle>
                                                            )}
                                                        </svg>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {sectionIndex < sectionOrder.length - 1 && (
                                        <div className="flex justify-center py-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                                                <div className="w-1 h-8 bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                ) : (
                    <Stories />
                )}
            </div>
            <div className="h-20" />
        </div>
    )
}

export default LearningPath
