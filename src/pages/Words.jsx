import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHandPaper, FaPrayingHands, FaCheck, FaTimes, FaThumbsUp, FaThumbsDown, FaWater, FaBreadSlice, FaAppleAlt, FaBook, FaHome, FaCar, FaDog, FaCat, FaUserAlt, FaUserTie, FaUserFriends, FaSun } from 'react-icons/fa'
import PracticeCard from '../components/PracticeCard'
import LearnCard from '../components/LearnCard'
import CompletionScreen from '../components/CompletionScreen'
import ProgressBar from '../components/ProgressBar'

const words = [
  { russian: 'привет', transcription: 'privet', correct: 'Merhaba', options: ['Merhaba', 'Güle güle', 'Teşekkürler', 'Lütfen'], visual: <FaHandPaper className="text-orange-500" /> },
  { russian: 'пока', transcription: 'poka', correct: 'Güle güle', options: ['Güle güle', 'Merhaba', 'Teşekkürler', 'Lütfen'], visual: <FaHandPaper className="text-rose-500" /> },
  { russian: 'спасибо', transcription: 'spasibo', correct: 'Teşekkürler', options: ['Teşekkürler', 'Lütfen', 'Merhaba', 'Güle güle'], visual: <FaPrayingHands className="text-emerald-500" /> },
  { russian: 'пожалуйста', transcription: 'pozhaluysta', correct: 'Lütfen', options: ['Lütfen', 'Teşekkürler', 'Merhaba', 'Güle güle'], visual: <FaPrayingHands className="text-amber-500" /> },
  { russian: 'да', transcription: 'da', correct: 'Evet', options: ['Evet', 'Hayır', 'Belki', 'Tamam'], visual: <FaCheck className="text-green-500" /> },
  { russian: 'нет', transcription: 'net', correct: 'Hayır', options: ['Hayır', 'Evet', 'Belki', 'Tamam'], visual: <FaTimes className="text-red-500" /> },
  { russian: 'хорошо', transcription: 'khorosho', correct: 'İyi/Tamam', options: ['İyi/Tamam', 'Kötü', 'Belki', 'Evet'], visual: <FaThumbsUp className="text-blue-500" /> },
  { russian: 'плохо', transcription: 'plokho', correct: 'Kötü', options: ['Kötü', 'İyi', 'Belki', 'Evet'], visual: <FaThumbsDown className="text-orange-500" /> },
  { russian: 'вода', transcription: 'voda', correct: 'Su', options: ['Su', 'Ekmek', 'Elma', 'Kitap'], visual: <FaWater className="text-cyan-500" /> },
  { russian: 'хлеб', transcription: 'khleb', correct: 'Ekmek', options: ['Ekmek', 'Su', 'Elma', 'Kitap'], visual: <FaBreadSlice className="text-yellow-600" /> },
  { russian: 'яблоко', transcription: 'yabloko', correct: 'Elma', options: ['Elma', 'Ekmek', 'Su', 'Kitap'], visual: <FaAppleAlt className="text-red-600" /> },
  { russian: 'книга', transcription: 'kniga', correct: 'Kitap', options: ['Kitap', 'Elma', 'Ekmek', 'Su'], visual: <FaBook className="text-orange-600" /> },
  { russian: 'дом', transcription: 'dom', correct: 'Ev', options: ['Ev', 'Araba', 'Köpek', 'Kedi'], visual: <FaHome className="text-sky-600" /> },
  { russian: 'машина', transcription: 'mashina', correct: 'Araba', options: ['Araba', 'Ev', 'Köpek', 'Kedi'], visual: <FaCar className="text-red-500" /> },
  { russian: 'собака', transcription: 'sobaka', correct: 'Köpek', options: ['Köpek', 'Kedi', 'Ev', 'Araba'], visual: <FaDog className="text-amber-700" /> },
  { russian: 'кошка', transcription: 'koshka', correct: 'Kedi', options: ['Kedi', 'Köpek', 'Ev', 'Araba'], visual: <FaCat className="text-slate-600" /> },
  { russian: 'мама', transcription: 'mama', correct: 'Anne', options: ['Anne', 'Baba', 'Kardeş', 'Arkadaş'], visual: <FaUserAlt className="text-pink-500" /> },
  { russian: 'папа', transcription: 'papa', correct: 'Baba', options: ['Baba', 'Anne', 'Kardeş', 'Arkadaş'], visual: <FaUserTie className="text-blue-700" /> },
  { russian: 'друг', transcription: 'drug', correct: 'Arkadaş', options: ['Arkadaş', 'Anne', 'Baba', 'Kardeş'], visual: <FaUserFriends className="text-teal-500" /> },
  { russian: 'солнце', transcription: 'solntse', correct: 'Güneş', options: ['Güneş', 'Ay', 'Yıldız', 'Bulut'], visual: <FaSun className="text-yellow-400" /> },
]

function Words() {
  const [mode, setMode] = useState('learn')
  const [learnIndex, setLearnIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [isComplete, setIsComplete] = useState(false)

  const shuffled = [...words].sort(() => Math.random() - 0.5)

  const handleLearnNext = () => {
    if (learnIndex < words.length - 1) {
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
    if (learnIndex >= words.length) {
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
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
        <ProgressBar current={learnIndex + 1} total={words.length} />
        <AnimatePresence>
          <LearnCard
            key={learnIndex}
            item={words[learnIndex]}
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

export default Words

