import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSpeakerWave, HiChevronRight, HiPause, HiPlay } from 'react-icons/hi2'

function LearnCard({ item, onNext, autoAdvanceDelay = 4000 }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeLeft, setTimeLeft] = useState(autoAdvanceDelay / 1000)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isPaused) return

    const interval = 50
    const step = 100 / (autoAdvanceDelay / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          onNext()
          return 0
        }
        return prev - step
      })

      setTimeLeft((prev) => Math.max(0, prev - 0.05))
    }, interval)

    return () => clearInterval(timer)
  }, [onNext, autoAdvanceDelay, isPaused])

  const playAudio = (e) => {
    e?.stopPropagation()
    if ('speechSynthesis' in window) {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(item.russian)
      utterance.lang = 'ru-RU'
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      speechSynthesis.cancel()
      speechSynthesis.speak(utterance)
    }
  }

  const togglePause = () => setIsPaused(!isPaused)

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} // Cubic bezier for premium feel
        className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl shadow-indigo-500/20"
      >
        {/* Glowing Background Overlay */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

        {/* Top Controls */}
        <div className="relative z-10 flex justify-between items-center mb-10">
          <div className="px-4 py-1.5 rounded-full glass-sm border border-white/20 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Öğren
          </div>
          <button
            onClick={togglePause}
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-indigo-500 transition-colors"
          >
            {isPaused ? <HiPlay className="w-6 h-6" /> : <HiPause className="w-6 h-6" />}
          </button>
        </div>

        {/* Content */}
        <div className="text-center space-y-8 mb-12 cursor-pointer relative z-10" onClick={playAudio}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Visual Icon/Text */}
            {item.visual && item.visual !== item.russian && (
              <div className="text-7xl md:text-9xl filter drop-shadow-2xl">
                {item.visual}
              </div>
            )}

            {/* Russian Word */}
            <div className="text-6xl md:text-8xl font-black text-gradient select-none leading-tight filter drop-shadow-xl pb-2">
              {item.russian}
            </div>

            {isPlaying && (
              <motion.div
                className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            )}
          </motion.div>

          <div className="space-y-2">
            {item.transcription && (
              <div className="text-xl text-slate-400 dark:text-slate-500 font-mono tracking-wider">
                /{item.transcription}/
              </div>
            )}

            <div className="text-3xl font-bold text-slate-700 dark:text-slate-200">
              {item.correct}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={playAudio}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 group/btn relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <HiSpeakerWave className="w-6 h-6 group-hover/btn:animate-bounce" />
            <span>Telaffuzu Dinle</span>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      {/* Manual Navigation */}
      <div className="mt-8 flex justify-center">
        <motion.button
          onClick={onNext}
          whileHover={{ x: 4 }}
          className="group flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/50 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
        >
          <span>Sonraki Karta Geç</span>
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/5 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 flex items-center justify-center transition-colors">
            <HiChevronRight className="w-3 h-3" />
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default LearnCard
