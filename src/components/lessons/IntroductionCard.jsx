import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSpeakerWave, HiChevronRight, HiExclamationTriangle } from 'react-icons/hi2'

function IntroductionCard({ letter, onNext, index, total }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasListened, setHasListened] = useState(false)

    const playAudio = () => {
        if ('speechSynthesis' in window) {
            setIsPlaying(true)
            setHasListened(true)

            const utterance = new SpeechSynthesisUtterance(letter.letter)
            utterance.lang = 'ru-RU'
            utterance.rate = 0.7
            utterance.pitch = 1
            utterance.onend = () => setIsPlaying(false)
            utterance.onerror = () => setIsPlaying(false)

            speechSynthesis.cancel()
            speechSynthesis.speak(utterance)
        }
    }

    // Auto-play on mount
    useEffect(() => {
        const timer = setTimeout(playAudio, 500)
        return () => clearTimeout(timer)
    }, [letter])

    const isCritical = letter.confusionLevel === 'critical'
    const isHigh = letter.confusionLevel === 'high'
    const haWarning = letter.warning

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md mx-auto"
        >
            <div className="glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                {/* Progress indicator */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Tanıtım
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {index + 1} / {total}
                    </span>
                </div>

                {/* Main letter display */}
                <div className="text-center mb-6">
                    <motion.button
                        onClick={playAudio}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              relative inline-flex items-center justify-center w-32 h-32 rounded-3xl
              ${isCritical
                                ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20 ring-2 ring-rose-500/50'
                                : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20'
                            }
            `}
                    >
                        <span className="text-7xl font-black text-gradient">
                            {letter.letter}
                        </span>

                        {/* Audio wave animation */}
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-orange-500/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.button>

                    {/* Critical warning badge */}
                    {isCritical && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                        >
                            <HiExclamationTriangle className="w-4 h-4" />
                            <span className="text-xs font-bold">KRİTİK HARF</span>
                        </motion.div>
                    )}
                </div>

                {/* Sound info */}
                <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                        {letter.sound}
                    </div>
                    <div className="text-lg text-slate-600 dark:text-slate-300">
                        Türkçe: <span className="font-bold">{letter.turkish}</span>
                    </div>
                </div>

                {/* Confusion warning */}
                {haWarning && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.4 }}
                        className={`
              p-4 rounded-xl mb-6 border-l-4
              ${isCritical
                                ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500'
                                : isHigh
                                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500'
                                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-300'
                            }
            `}
                    >
                        <div className="flex items-start gap-3">
                            <HiExclamationTriangle className={`
                w-5 h-5 flex-shrink-0 mt-0.5
                ${isCritical ? 'text-rose-500' : isHigh ? 'text-amber-500' : 'text-slate-400'}
              `} />
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                    {letter.warning}
                                </p>
                                {letter.looksLike && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Benziyor: <span className="font-mono font-bold">{letter.looksLike}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Example word */}
                {letter.example && (
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Örnek Kelime
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xl font-bold text-slate-800 dark:text-white">
                                    {letter.example.word}
                                </span>
                                <span className="text-slate-400 mx-2">•</span>
                                <span className="text-slate-600 dark:text-slate-300">
                                    {letter.example.meaning}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    if ('speechSynthesis' in window) {
                                        const utterance = new SpeechSynthesisUtterance(letter.example.word)
                                        utterance.lang = 'ru-RU'
                                        utterance.rate = 0.7
                                        speechSynthesis.cancel()
                                        speechSynthesis.speak(utterance)
                                    }
                                }}
                                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <HiSpeakerWave className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <div className="text-sm text-slate-400 font-mono mt-1">
                            /{letter.example.transcription}/
                        </div>
                    </div>
                )}

                {/* Continue button */}
                <motion.button
                    onClick={onNext}
                    disabled={!hasListened}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2
            transition-all duration-300
            ${hasListened
                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                        }
          `}
                >
                    <span>Devam Et</span>
                    <HiChevronRight className="w-5 h-5" />
                </motion.button>

                {!hasListened && (
                    <p className="text-center text-xs text-slate-400 mt-3">
                        Devam etmek için sesi dinle
                    </p>
                )}
            </div>
        </motion.div>
    )
}

export default IntroductionCard
