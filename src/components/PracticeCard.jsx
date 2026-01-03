import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheckCircle, HiXCircle, HiChevronRight, HiQuestionMarkCircle, HiSparkles } from 'react-icons/hi2'
import { useSound } from '../contexts/SoundContext'

function PracticeCard({ item, onNext, isCorrect, onAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isWrong, setIsWrong] = useState(false)
  const { playSFX } = useSound()

  const handleOptionClick = (option) => {
    if (showAnswer) return

    setSelectedOption(option)
    setShowAnswer(true)

    const correct = option === item.correct
    onAnswer(correct)

    if (correct) {
      playSFX('correct.mp3')
    } else {
      setIsWrong(true)
      playSFX('wrong.mp3')
    }
  }

  const handleNext = () => {
    setShowAnswer(false)
    setSelectedOption(null)
    setIsWrong(false)
    onNext()
  }

  // Shake animation for wrong answers
  const cardVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      rotateX: 0,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 500 }
    },
    normal: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        exit={{ opacity: 0, y: -50, scale: 0.95, filter: "blur(10px)" }}
        animate={isWrong ? "shake" : "normal"}
        variants={cardVariants}
        className="glass-card rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-orange-500/10"
      >
        {/* Dynamic Background */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transform rotate-12">
          <HiQuestionMarkCircle className="w-64 h-64" />
        </div>

        {/* Question Area */}
        <div className="text-center mb-10 relative z-10">
          <div className="inline-block relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center gap-4 mb-4"
            >
              {/* Visual Icon/Text */}
              {item.visual && item.visual !== item.russian && (
                <div className="text-6xl md:text-8xl filter drop-shadow-xl">
                  {item.visual}
                </div>
              )}

              {/* Russian Word */}
              <div className="text-5xl md:text-7xl font-black text-gradient leading-tight filter drop-shadow-lg">
                {item.russian}
              </div>
            </motion.div>

            {/* Decoration */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-8 text-amber-500 opacity-50"
            >
              <HiSparkles className="w-8 h-8" />
            </motion.div>
          </div>

          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mt-2">Bu hangisi?</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {item.options.map((option, index) => {
            const isSelected = selectedOption === option
            const isCorrectOption = option === item.correct

            let stateClass = "bg-white/50 dark:bg-white/5 border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1"
            let icon = null

            if (showAnswer) {
              if (isCorrectOption) {
                stateClass = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-102 ring-4 ring-emerald-500/20"
                icon = <HiCheckCircle className="w-6 h-6 animate-bounce" />
              } else if (isSelected) {
                stateClass = "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/30 ring-4 ring-rose-500/20"
                icon = <HiXCircle className="w-6 h-6" />
              } else {
                stateClass = "opacity-40 bg-slate-100 dark:bg-white/5 border-transparent cursor-not-allowed scale-95"
              }
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                disabled={showAnswer}
                onClick={() => handleOptionClick(option)}
                className={`
                  relative p-6 rounded-2xl border-2 text-xl font-bold transition-all duration-300 flex items-center justify-between group
                  ${stateClass}
                `}
              >
                <span className="flex-grow text-center">{option}</span>
                {icon}
                {!showAnswer && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/0 group-hover:ring-orange-500/50 transition-all duration-300"></div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Feedback & Next Button */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 flex justify-end overflow-hidden"
            >
              <motion.button
                onClick={() => {
                  playSFX('nav_click.mp3')
                  handleNext()
                }}
                autoFocus
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                    px-8 py-4 rounded-xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 
                    font-bold text-lg shadow-xl shadow-slate-500/20 hover:shadow-2xl transition-all flex items-center gap-3
                  "
              >
                <span>Devam Et</span>
                <HiChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default PracticeCard
