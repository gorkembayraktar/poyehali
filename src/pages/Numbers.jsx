import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PracticeCard from '../components/PracticeCard'
import LearnCard from '../components/LearnCard'
import CompletionScreen from '../components/CompletionScreen'
import ProgressBar from '../components/ProgressBar'

const numbers = [
  { russian: 'ноль', transcription: 'nol', correct: 'Sıfır', options: ['Sıfır', 'Bir', 'İki', 'Üç'], visual: '0' },
  { russian: 'один', transcription: 'odin', correct: 'Bir', options: ['Bir', 'İki', 'Üç', 'Dört'], visual: '1' },
  { russian: 'два', transcription: 'dva', correct: 'İki', options: ['İki', 'Üç', 'Dört', 'Beş'], visual: '2' },
  { russian: 'три', transcription: 'tri', correct: 'Üç', options: ['Üç', 'Dört', 'Beş', 'Altı'], visual: '3' },
  { russian: 'четыре', transcription: 'chetyre', correct: 'Dört', options: ['Dört', 'Beş', 'Altı', 'Yedi'], visual: '4' },
  { russian: 'пять', transcription: 'pyat', correct: 'Beş', options: ['Beş', 'Altı', 'Yedi', 'Sekiz'], visual: '5' },
  { russian: 'шесть', transcription: 'shest', correct: 'Altı', options: ['Altı', 'Yedi', 'Sekiz', 'Dokuz'], visual: '6' },
  { russian: 'семь', transcription: 'sem', correct: 'Yedi', options: ['Yedi', 'Sekiz', 'Dokuz', 'On'], visual: '7' },
  { russian: 'восемь', transcription: 'vosem', correct: 'Sekiz', options: ['Sekiz', 'Dokuz', 'On', 'On Bir'], visual: '8' },
  { russian: 'девять', transcription: 'devyat', correct: 'Dokuz', options: ['Dokuz', 'On', 'On Bir', 'On İki'], visual: '9' },
  { russian: 'десять', transcription: 'desyat', correct: 'On', options: ['On', 'On Bir', 'On İki', 'On Üç'], visual: '10' },
  { russian: 'одиннадцать', transcription: 'odinnadtsat', correct: 'On Bir', options: ['On Bir', 'On İki', 'On Üç', 'On Dört'], visual: '11' },
  { russian: 'двенадцать', transcription: 'dvenadtsat', correct: 'On İki', options: ['On İki', 'On Üç', 'On Dört', 'On Beş'], visual: '12' },
  { russian: 'тринадцать', transcription: 'trinadtsat', correct: 'On Üç', options: ['On Üç', 'On Dört', 'On Beş', 'On Altı'], visual: '13' },
  { russian: 'четырнадцать', transcription: 'chetyrnadtsat', correct: 'On Dört', options: ['On Dört', 'On Beş', 'On Altı', 'On Yedi'], visual: '14' },
  { russian: 'пятнадцать', transcription: 'pyatnadtsat', correct: 'On Beş', options: ['On Beş', 'On Altı', 'On Yedi', 'On Sekiz'], visual: '15' },
  { russian: 'шестнадцать', transcription: 'shestnadtsat', correct: 'On Altı', options: ['On Altı', 'On Yedi', 'On Sekiz', 'On Dokuz'], visual: '16' },
  { russian: 'семнадцать', transcription: 'semnadtsat', correct: 'On Yedi', options: ['On Yedi', 'On Sekiz', 'On Dokuz', 'Yirmi'], visual: '17' },
  { russian: 'восемнадцать', transcription: 'vosemnadtsat', correct: 'On Sekiz', options: ['On Sekiz', 'On Dokuz', 'Yirmi', 'On Dokuz'], visual: '18' },
  { russian: 'девятнадцать', transcription: 'devyatnadtsat', correct: 'On Dokuz', options: ['On Dokuz', 'Yirmi', 'On Sekiz', 'On Yedi'], visual: '19' },
  { russian: 'двадцать', transcription: 'dvadtsat', correct: 'Yirmi', options: ['Yirmi', 'On Dokuz', 'On Sekiz', 'On Yedi'], visual: '20' },
]

function Numbers() {
  const [mode, setMode] = useState('learn')
  const [learnIndex, setLearnIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [isComplete, setIsComplete] = useState(false)

  const shuffled = [...numbers].sort(() => Math.random() - 0.5)

  const handleLearnNext = () => {
    if (learnIndex < numbers.length - 1) {
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
    if (learnIndex >= numbers.length) {
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
        <ProgressBar current={learnIndex + 1} total={numbers.length} />
        <AnimatePresence>
          <LearnCard
            key={learnIndex}
            item={numbers[learnIndex]}
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

export default Numbers

