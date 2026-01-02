import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiXCircle, HiChevronRight } from 'react-icons/hi2'

function TestCard({ question, onAnswer, index, total, isGate = false }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const handleOptionClick = (option) => {
        if (showResult) return

        setSelectedOption(option)
        setShowResult(true)
    }

    const handleNext = () => {
        const isCorrect = selectedOption === question.correct
        onAnswer(isCorrect)
    }

    const isCorrect = selectedOption === question.correct

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md mx-auto"
        >
            <div className={`
        glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden
        ${isGate ? 'ring-2 ring-amber-500/50' : ''}
      `}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <span className={`
            text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full
            ${isGate
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                        }
          `}>
                        {isGate ? '⚡ Kapı Testi' : 'Mini Test'}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                        {index + 1} / {total}
                    </span>
                </div>

                {/* Question */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 mb-4">
                        <span className="text-5xl font-black text-gradient">{question.letter}</span>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        {question.questionText || 'Bu harf hangi sesi çıkarır?'}
                    </p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {question.options.map((option, i) => {
                        const isSelected = selectedOption === option
                        const isCorrectOption = option === question.correct

                        let stateClass = 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-white dark:hover:bg-slate-700'

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
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => handleOptionClick(option)}
                                disabled={showResult}
                                className={`
                  w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200
                  flex items-center justify-between
                  ${stateClass}
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${showResult && isCorrectOption
                                            ? 'bg-white/20'
                                            : showResult && isSelected
                                                ? 'bg-white/20'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                        }
                  `}>
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span className="text-lg">{option}</span>
                                </div>

                                {showResult && isCorrectOption && <HiCheckCircle className="w-6 h-6" />}
                                {showResult && isSelected && !isCorrectOption && <HiXCircle className="w-6 h-6" />}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Result & Continue */}
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={`
              p-4 rounded-xl mb-4 text-center
              ${isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                            }
            `}>
                            <p className="font-bold">
                                {isCorrect ? 'Doğru! ✨' : 'Yanlış'}
                            </p>
                            {!isCorrect && (
                                <p className="text-sm mt-1">
                                    Doğru cevap: {question.correct}
                                </p>
                            )}
                        </div>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2"
                        >
                            <span>Devam Et</span>
                            <HiChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

export default TestCard
