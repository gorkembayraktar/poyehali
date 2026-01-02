import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PracticeCard from '../components/PracticeCard'
import LearnCard from '../components/LearnCard'
import CompletionScreen from '../components/CompletionScreen'
import ProgressBar from '../components/ProgressBar'

const alphabet = [
  { russian: 'А', transcription: 'a', correct: 'A', options: ['A', 'B', 'C', 'D'], visual: 'А' },
  { russian: 'Б', transcription: 'b', correct: 'B', options: ['A', 'B', 'C', 'D'], visual: 'Б' },
  { russian: 'В', transcription: 'v', correct: 'V', options: ['V', 'W', 'X', 'Y'], visual: 'В' },
  { russian: 'Г', transcription: 'g', correct: 'G', options: ['G', 'H', 'I', 'J'], visual: 'Г' },
  { russian: 'Д', transcription: 'd', correct: 'D', options: ['D', 'E', 'F', 'G'], visual: 'Д' },
  { russian: 'Е', transcription: 'ye', correct: 'Ye', options: ['Ye', 'Yo', 'Yu', 'Ya'], visual: 'Е' },
  { russian: 'Ё', transcription: 'yo', correct: 'Yo', options: ['Ye', 'Yo', 'Yu', 'Ya'], visual: 'Ё' },
  { russian: 'Ж', transcription: 'zh', correct: 'Zh', options: ['Zh', 'Ch', 'Sh', 'Shch'], visual: 'Ж' },
  { russian: 'З', transcription: 'z', correct: 'Z', options: ['Z', 'X', 'C', 'V'], visual: 'З' },
  { russian: 'И', transcription: 'ee', correct: 'I', options: ['I', 'Y', 'U', 'O'], visual: 'И' },
  { russian: 'Й', transcription: 'y', correct: 'Y', options: ['Y', 'I', 'U', 'O'], visual: 'Й' },
  { russian: 'К', transcription: 'k', correct: 'K', options: ['K', 'L', 'M', 'N'], visual: 'К' },
  { russian: 'Л', transcription: 'l', correct: 'L', options: ['L', 'M', 'N', 'O'], visual: 'Л' },
  { russian: 'М', transcription: 'm', correct: 'M', options: ['M', 'N', 'O', 'P'], visual: 'М' },
  { russian: 'Н', transcription: 'n', correct: 'N', options: ['N', 'O', 'P', 'Q'], visual: 'Н' },
  { russian: 'О', transcription: 'o', correct: 'O', options: ['O', 'P', 'Q', 'R'], visual: 'О' },
  { russian: 'П', transcription: 'p', correct: 'P', options: ['P', 'Q', 'R', 'S'], visual: 'П' },
  { russian: 'Р', transcription: 'r', correct: 'R', options: ['R', 'S', 'T', 'U'], visual: 'Р' },
  { russian: 'С', transcription: 's', correct: 'S', options: ['S', 'T', 'U', 'V'], visual: 'С' },
  { russian: 'Т', transcription: 't', correct: 'T', options: ['T', 'U', 'V', 'W'], visual: 'Т' },
  { russian: 'У', transcription: 'u', correct: 'U', options: ['U', 'V', 'W', 'X'], visual: 'У' },
  { russian: 'Ф', transcription: 'f', correct: 'F', options: ['F', 'G', 'H', 'I'], visual: 'Ф' },
  { russian: 'Х', transcription: 'kh', correct: 'Kh', options: ['Kh', 'Ch', 'Sh', 'Zh'], visual: 'Х' },
  { russian: 'Ц', transcription: 'ts', correct: 'Ts', options: ['Ts', 'Ch', 'Sh', 'Zh'], visual: 'Ц' },
  { russian: 'Ч', transcription: 'ch', correct: 'Ch', options: ['Ch', 'Sh', 'Zh', 'Ts'], visual: 'Ч' },
  { russian: 'Ш', transcription: 'sh', correct: 'Sh', options: ['Sh', 'Ch', 'Zh', 'Ts'], visual: 'Ш' },
  { russian: 'Щ', transcription: 'shch', correct: 'Shch', options: ['Shch', 'Ch', 'Sh', 'Zh'], visual: 'Щ' },
  { russian: 'Ъ', transcription: 'hard sign', correct: 'Hard Sign', options: ['Hard Sign', 'Soft Sign', 'Yo', 'Ye'], visual: 'Ъ' },
  { russian: 'Ы', transcription: 'y', correct: 'Y', options: ['Y', 'I', 'U', 'O'], visual: 'Ы' },
  { russian: 'Ь', transcription: 'soft sign', correct: 'Soft Sign', options: ['Soft Sign', 'Hard Sign', 'Yo', 'Ye'], visual: 'Ь' },
  { russian: 'Э', transcription: 'e', correct: 'E', options: ['E', 'Ye', 'Yo', 'Yu'], visual: 'Э' },
  { russian: 'Ю', transcription: 'yu', correct: 'Yu', options: ['Yu', 'Ya', 'Ye', 'Yo'], visual: 'Ю' },
  { russian: 'Я', transcription: 'ya', correct: 'Ya', options: ['Ya', 'Yu', 'Ye', 'Yo'], visual: 'Я' },
]

function Alphabet() {
  const [mode, setMode] = useState('learn') // 'learn' | 'test'
  const [learnIndex, setLearnIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [isComplete, setIsComplete] = useState(false)

  const shuffled = [...alphabet].sort(() => Math.random() - 0.5)

  const handleLearnNext = () => {
    if (learnIndex < alphabet.length - 1) {
      setLearnIndex(prev => prev + 1)
    } else {
      // Öğretme modu bitti, test moduna geç
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

  // Öğretme modu
  if (mode === 'learn') {
    if (learnIndex >= alphabet.length) {
      // Öğretme bitti, test başlatma ekranı
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
        <ProgressBar current={learnIndex + 1} total={alphabet.length} />
        <AnimatePresence>
          <LearnCard
            key={learnIndex}
            item={alphabet[learnIndex]}
            onNext={handleLearnNext}
            autoAdvanceDelay={4000}
          />
        </AnimatePresence>
      </>
    )
  }

  // Test modu
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

export default Alphabet

