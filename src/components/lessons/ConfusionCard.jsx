import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiExclamationTriangle, HiCheckCircle, HiXCircle, HiSpeakerWave } from 'react-icons/hi2'

function ConfusionCard({ confusion, onAnswer, index, total }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const options = [confusion.actualSound, confusion.confusedSound].sort(() => Math.random() - 0.5)

    const handleOptionClick = (option) => {
        if (showResult) return

        setSelectedOption(option)
        setShowResult(true)

        const isCorrect = option === confusion.actualSound

        setTimeout(() => {
            onAnswer(isCorrect)
        }, isCorrect ? 1200 : 2000)
    }

    const playSound = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(confusion.russian)
            utterance.lang = 'ru-RU'
            utterance.rate = 0.6
            speechSynthesis.cancel()
            speechSynthesis.speak(utterance)
        }
    }

    const isCorrect = selectedOption === confusion.actualSound

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md mx-auto"
        >
            <div className="glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                {/* Warning banner */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-6">
                    <HiExclamationTriangle className="w-5 h-5" />
                    <span className="text-sm font-bold">KARIŞIKLIK TESTİ</span>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Dikkatli ol!
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {index + 1} / {total}
                    </span>
                </div>

                {/* Comparison */}
                <div className="flex items-center justify-center gap-8 mb-8">
                    {/* Russian letter */}
                    <motion.button
                        onClick={playSound}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-xl">
                            <span className="text-5xl font-black text-white">{confusion.russian}</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                            RUS
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-lg flex items-center justify-center">
                            <HiSpeakerWave className="w-4 h-4 text-orange-500" />
                        </div>
                    </motion.button>

                    {/* VS */}
                    <div className="text-2xl font-black text-slate-300 dark:text-slate-600">VS</div>

                    {/* Latin lookalike */}
                    <div className="relative">
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                            <span className="text-5xl font-black text-slate-400 dark:text-slate-500">{confusion.looksLike}</span>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-400 text-white text-xs font-bold">
                            LATİN
                        </div>
                    </div>
                </div>

                {/* Question */}
                <div className="text-center mb-6">
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                        <span className="text-2xl font-black text-gradient">{confusion.russian}</span> harfi hangi sesi çıkarır?
                    </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {options.map((option) => {
                        const isSelected = selectedOption === option
                        const isCorrectOption = option === confusion.actualSound

                        let stateClass = 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'

                        if (showResult) {
                            if (isCorrectOption) {
                                stateClass = 'bg-emerald-500 border-emerald-500 text-white ring-4 ring-emerald-500/30'
                            } else if (isSelected) {
                                stateClass = 'bg-rose-500 border-rose-500 text-white'
                            } else {
                                stateClass = 'opacity-40'
                            }
                        }

                        return (
                            <motion.button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                disabled={showResult}
                                whileHover={!showResult ? { scale: 1.03 } : {}}
                                whileTap={!showResult ? { scale: 0.97 } : {}}
                                className={`
                  p-6 rounded-xl border-2 text-2xl font-black transition-all duration-200
                  flex items-center justify-center gap-3
                  ${stateClass}
                `}
                            >
                                <span>{option}</span>
                                {showResult && isCorrectOption && <HiCheckCircle className="w-7 h-7" />}
                                {showResult && isSelected && !isCorrectOption && <HiXCircle className="w-7 h-7" />}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Result */}
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`
              p-4 rounded-xl
              ${isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                                : 'bg-rose-100 dark:bg-rose-900/30'
                            }
            `}
                    >
                        <p className={`
              font-bold text-center mb-2
              ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}
            `}>
                            {isCorrect ? 'Harika! 🎉' : 'Dikkat!'}
                        </p>
                        <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                            {confusion.tip}
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default ConfusionCard
