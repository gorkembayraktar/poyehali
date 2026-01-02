import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PracticeCard from '../components/PracticeCard'
import LearnCard from '../components/LearnCard'
import CompletionScreen from '../components/CompletionScreen'
import ProgressBar from '../components/ProgressBar'

const colors = [
  { russian: 'красный', transcription: 'krasnyy', correct: 'Kırmızı', options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'], visual: '🔴' },
  { russian: 'синий', transcription: 'siniy', correct: 'Mavi', options: ['Mavi', 'Kırmızı', 'Yeşil', 'Sarı'], visual: '🔵' },
  { russian: 'зелёный', transcription: 'zelyonyy', correct: 'Yeşil', options: ['Yeşil', 'Mavi', 'Kırmızı', 'Sarı'], visual: '🟢' },
  { russian: 'жёлтый', transcription: 'zheltyy', correct: 'Sarı', options: ['Sarı', 'Turuncu', 'Mor', 'Pembe'], visual: '🟡' },
  { russian: 'оранжевый', transcription: 'oranzhevyy', correct: 'Turuncu', options: ['Turuncu', 'Sarı', 'Mor', 'Pembe'], visual: '🟠' },
  { russian: 'фиолетовый', transcription: 'fioletovyy', correct: 'Mor', options: ['Mor', 'Turuncu', 'Pembe', 'Siyah'], visual: '🟣' },
  { russian: 'розовый', transcription: 'rozovyy', correct: 'Pembe', options: ['Pembe', 'Mor', 'Turuncu', 'Siyah'], visual: '🌸' },
  { russian: 'чёрный', transcription: 'chernyy', correct: 'Siyah', options: ['Siyah', 'Beyaz', 'Gri', 'Kahverengi'], visual: '⚫' },
  { russian: 'белый', transcription: 'belyy', correct: 'Beyaz', options: ['Beyaz', 'Siyah', 'Gri', 'Kahverengi'], visual: '⚪' },
  { russian: 'серый', transcription: 'seryy', correct: 'Gri', options: ['Gri', 'Siyah', 'Beyaz', 'Kahverengi'], visual: '🔘' },
  { russian: 'коричневый', transcription: 'korichnevyy', correct: 'Kahverengi', options: ['Kahverengi', 'Gri', 'Siyah', 'Beyaz'], visual: '🟤' },
]

function Colors() {
  const [mode, setMode] = useState('learn')
  const [learnIndex, setLearnIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [isComplete, setIsComplete] = useState(false)

  const shuffled = [...colors].sort(() => Math.random() - 0.5)

  const handleLearnNext = () => {
    if (learnIndex < colors.length - 1) {
      setLearnIndex(prev => prev + 1)
    } else {
      setMode('test')
      setCurrentIndex(0)
    }
  }

  const handleAnswer = (isCorrect) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const handleNext = () => {
    if (currentIndex < shuffled.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setMode('learn')
    setLearnIndex(0)
    setCurrentIndex(0)
    setScore({ correct: 0, total: 0 })
    setIsComplete(false)
  }

  const handleStartTest = () => {
    setMode('test')
    setCurrentIndex(0)
  }

  if (isComplete) {
    return (
      <>
        <CompletionScreen score={score} onRestart={handleRestart} />
      </>
    )
  }

  if (mode === 'learn') {
    if (learnIndex >= colors.length) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center min-h-[50vh]"
          >
            <div className="glass dark:bg-slate-800/80 rounded-xl shadow-lg p-6 md:p-10 max-w-md mx-auto w-full border border-white/30 dark:border-slate-700 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                Öğretme Tamamlandı!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Şimdi test moduna geçebilirsiniz.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartTest}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Teste Başla
              </motion.button>
            </div>
          </motion.div>
        </>
      )
    }

    return (
      <>
        <ProgressBar current={learnIndex + 1} total={colors.length} />
        <AnimatePresence>
          <LearnCard
            key={learnIndex}
            item={colors[learnIndex]}
            onNext={handleLearnNext}
            autoAdvanceDelay={4000}
          />
        </AnimatePresence>
      </>
    )
  }

  return (
    <>
      <ProgressBar current={currentIndex + 1} total={shuffled.length} />

      <AnimatePresence>
        <PracticeCard
          key={currentIndex}
          item={shuffled[currentIndex]}
          onNext={handleNext}
          isCorrect={score.total > 0 && shuffled[currentIndex]?.correct}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>
    </>
  )
}

export default Colors

