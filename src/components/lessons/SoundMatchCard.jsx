import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiSpeakerWave, HiCheckCircle, HiXCircle, HiSpeakerXMark } from 'react-icons/hi2'
import { useSound } from '../../contexts/SoundContext'

function SoundMatchCard({ letter, options, onAnswer, onSkip, index, total }) {
    const { playSFX, playVoice } = useSound()
    const [selectedOption, setSelectedOption] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const playSound = () => {
        setIsPlaying(true)
        playVoice(letter.letter)
        // Simple timer for animation state
        setTimeout(() => setIsPlaying(false), 800)
    }

    // Auto-play on mount
    useEffect(() => {
        const timer = setTimeout(playSound, 300)
        return () => clearTimeout(timer)
    }, [letter])

    const handleOptionClick = (option) => {
        if (showResult) return

        setSelectedOption(option)
        setShowResult(true)

        const isCorrect = option === letter.turkish

        if (isCorrect) {
            playSFX('correct.mp3')
        } else {
            playSFX('wrong.mp3')
        }

        // Auto-advance after delay
        setTimeout(() => {
            onAnswer(isCorrect)
        }, isCorrect ? 1000 : 1500)
    }

    const isCorrect = selectedOption === letter.turkish

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
                        Ses Eşleştirme
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {index + 1} / {total}
                    </span>
                </div>

                {/* Question */}
                <div className="text-center mb-8">
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                        Bu ses hangi harf?
                    </p>

                    {/* Audio button */}
                    <motion.button
                        onClick={playSound}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              relative inline-flex items-center justify-center w-24 h-24 rounded-full
              bg-gradient-to-br from-orange-500 to-amber-600 text-white
              shadow-xl shadow-orange-500/30
            `}
                    >
                        <HiSpeakerWave className={`w-10 h-10 ${isPlaying ? 'animate-pulse' : ''}`} />

                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-4 border-white/50"
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.button>

                    <p className="text-sm text-slate-400 mt-3">
                        Tekrar dinlemek için dokun
                    </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {options.map((option, i) => {
                        const isSelected = selectedOption === option
                        const isCorrectOption = option === letter.turkish

                        let stateClass = 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-orange-400'

                        if (showResult) {
                            if (isCorrectOption) {
                                stateClass = 'bg-emerald-500 border-emerald-500 text-white'
                            } else if (isSelected) {
                                stateClass = 'bg-rose-500 border-rose-500 text-white'
                            } else {
                                stateClass = 'opacity-40 bg-slate-100 dark:bg-slate-900 border-transparent'
                            }
                        }

                        return (
                            <motion.button
                                key={option}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleOptionClick(option)}
                                disabled={showResult}
                                className={`
                  p-5 rounded-xl border-2 text-xl font-bold transition-all duration-200
                  flex items-center justify-center gap-2
                  ${stateClass}
                  ${!showResult ? 'hover:shadow-lg hover:-translate-y-1' : ''}
                `}
                            >
                                <span>{option}</span>
                                {showResult && isCorrectOption && (
                                    <HiCheckCircle className="w-6 h-6" />
                                )}
                                {showResult && isSelected && !isCorrectOption && (
                                    <HiXCircle className="w-6 h-6" />
                                )}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Skip option */}
                {!showResult && (
                    <button
                        onClick={() => {
                            playSFX('nav_click.mp3')
                            onSkip()
                        }}
                        className="w-full py-3 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <HiSpeakerXMark className="w-4 h-4" />
                        <span>Şu an dinleyemiyorum</span>
                    </button>
                )}

                {/* Result feedback */}
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`
              mt-6 p-4 rounded-xl text-center
              ${isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                            }
            `}
                    >
                        <p className="font-bold">
                            {isCorrect ? 'Doğru! 🎉' : 'Yanlış'}
                        </p>
                        {!isCorrect && (
                            <p className="text-sm mt-1">
                                {letter.letter} = {letter.turkish}
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default SoundMatchCard
