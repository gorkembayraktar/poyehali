import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiXMark } from 'react-icons/hi2'
import { getLessonById } from '../data/learningPath'
import { getLettersByLevel, confusionSets, alphabet } from '../data/alphabet'
import { useProgress } from '../contexts/ProgressContext'
import IntroductionCard from '../components/lessons/IntroductionCard'
import SoundMatchCard from '../components/lessons/SoundMatchCard'
import ConfusionCard from '../components/lessons/ConfusionCard'
import TestCard from '../components/lessons/TestCard'

// Stages in order
const STAGES = ['introduction', 'sound_match', 'confusion', 'test']

function Lesson() {
    const { lessonId } = useParams()
    const navigate = useNavigate()
    const { isLessonUnlocked, startLesson, completeLesson, updateLessonProgress, progress } = useProgress()

    const lesson = getLessonById(lessonId)
    const [stage, setStage] = useState('introduction')
    const [stageIndex, setStageIndex] = useState(0)
    const [answers, setAnswers] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    // Get letters for this lesson
    const letters = useMemo(() => {
        if (!lesson) return []
        if (lesson.letters) {
            return alphabet.filter(l => lesson.letters.includes(l.letter))
        }
        if (lesson.section === 'alphabet') {
            const levelMatch = lesson.id.match(/alphabet_(\d+)/)
            if (levelMatch) {
                return getLettersByLevel(parseInt(levelMatch[1]))
            }
        }
        return []
    }, [lesson])

    // Get confusion items for this lesson
    const confusions = useMemo(() => {
        if (!lesson) return []
        // For alphabet lessons, use critical confusions from current letters
        const criticalLetters = letters.filter(l => l.confusionLevel === 'critical' || l.confusionLevel === 'high')
        return criticalLetters.map(l => {
            const found = [...confusionSets.critical, ...confusionSets.high].find(c => c.russian === l.letter)
            return found
        }).filter(Boolean)
    }, [letters, lesson])

    // Generate test questions
    const testQuestions = useMemo(() => {
        return letters.slice(0, 5).map(letter => ({
            letter: letter.letter,
            correct: letter.turkish,
            options: shuffleArray([
                letter.turkish,
                ...getRandomOptions(letter.turkish, 3)
            ]),
            questionText: `${letter.letter} harfi hangi sesi çıkarır?`
        }))
    }, [letters])

    // Generate sound match options
    const soundMatchOptions = useMemo(() => {
        const allTurkish = alphabet.map(l => l.turkish)
        return [...new Set(allTurkish)].slice(0, 8)
    }, [])

    // Check if lesson is accessible
    useEffect(() => {
        if (!lesson) {
            navigate('/')
            return
        }
        if (!isLessonUnlocked(lessonId)) {
            navigate('/')
            return
        }
        startLesson(lessonId)
    }, [lesson, lessonId, isLessonUnlocked, startLesson, navigate])

    // Get current stage items
    const getCurrentItems = () => {
        switch (stage) {
            case 'introduction':
                return letters
            case 'sound_match':
                return letters
            case 'confusion':
                return confusions.length > 0 ? confusions : null
            case 'test':
                return testQuestions
            default:
                return []
        }
    }

    const currentItems = getCurrentItems()
    const currentItem = currentItems ? currentItems[stageIndex] : null

    // Reset state on stage change
    useEffect(() => {
        setAnswers([])
        setStageIndex(0)
    }, [stage])

    // Handle next in stage
    const handleNext = (finalAnswers) => {
        if (stageIndex < currentItems.length - 1) {
            setStageIndex(prev => prev + 1)
        } else {
            // Move to next stage
            const currentStageIndex = STAGES.indexOf(stage)
            if (currentStageIndex < STAGES.length - 1) {
                const nextStage = STAGES[currentStageIndex + 1]
                // Skip confusion stage if no confusion items
                if (nextStage === 'confusion' && confusions.length === 0) {
                    setStage('test')
                } else {
                    setStage(nextStage)
                }
                // Stage reset handled by useEffect
            } else {
                // Lesson complete
                handleLessonComplete(finalAnswers)
            }
        }
    }

    // Handle answer (for test/sound match)
    const handleAnswer = (isCorrect) => {
        const newAnswers = [...answers, isCorrect]
        setAnswers(newAnswers)

        updateLessonProgress(lessonId, {
            stage,
            stageIndex: stageIndex + 1,
            answers: newAnswers
        })

        handleNext(newAnswers)
    }

    // Calculate and complete lesson
    const handleLessonComplete = (finalAnswers) => {
        // Ensure we rely on passed answers for the immediate final calculation
        const answersToUse = finalAnswers || answers
        const correctAnswers = answersToUse.filter(a => a).length
        const totalQuestions = Math.max(testQuestions.length, 1) // Prevent division by zero
        let score = Math.round((correctAnswers / totalQuestions) * 100)

        // Safety clamp
        score = Math.min(100, Math.max(0, score))

        setFinalScore(score)
        setIsComplete(true)

        const passed = completeLesson(lessonId, score)
    }

    // Handle exit
    const handleExit = () => {
        navigate('/')
    }

    // Handle retry
    const handleRetry = () => {
        setStage('introduction')
        // setStageIndex(0) and setAnswers([]) handled by useEffect
        setIsComplete(false)
        setFinalScore(0)
    }

    if (!lesson) return null

    // Completion screen
    if (isComplete) {
        const passed = finalScore >= lesson.passScore

        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-[2rem] p-8 max-w-md w-full text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className={`
              w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center
              ${passed
                                ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                                : 'bg-gradient-to-br from-slate-400 to-slate-500'
                            }
            `}
                    >
                        <span className="text-4xl">
                            {passed ? '🎉' : '😔'}
                        </span>
                    </motion.div>

                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                        {passed ? 'Tebrikler!' : 'Tekrar Dene'}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        {passed
                            ? 'Bu dersi başarıyla tamamladın!'
                            : `Geçmek için %${lesson.passScore} gerekli.`
                        }
                    </p>

                    {/* Score circle */}
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                className="text-slate-200 dark:text-slate-700"
                            />
                            <motion.circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke={passed ? '#10b981' : '#f43f5e'}
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 56}
                                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - finalScore / 100) }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-black text-slate-800 dark:text-white">
                                {finalScore}%
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        {passed ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/')}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg"
                            >
                                Devam Et
                            </motion.button>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRetry}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg"
                                >
                                    Tekrar Dene
                                </motion.button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-700 font-medium"
                                >
                                    Ana Sayfaya Dön
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        )
    }

    // Get stage progress
    const totalStages = STAGES.filter(s => s !== 'confusion' || confusions.length > 0).length
    const currentStageNum = STAGES.slice(0, STAGES.indexOf(stage) + 1).filter(s => s !== 'confusion' || confusions.length > 0).length
    const stageProgress = currentItems ? ((stageIndex + 1) / currentItems.length) * 100 : 0

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-4 z-40 mb-8 px-4"
            >
                <div className="glass-card rounded-2xl px-4 py-3 max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={handleExit}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <HiXMark className="w-6 h-6 text-slate-500" />
                        </button>

                        <div className="text-center">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {lesson.title}
                            </span>
                        </div>

                        <div className="text-xs font-mono text-slate-400">
                            {currentStageNum}/{totalStages}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${stageProgress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <div className="px-4">
                <AnimatePresence mode="wait">
                    {stage === 'introduction' && currentItem && (
                        <IntroductionCard
                            key={`intro-${stageIndex}`}
                            letter={currentItem}
                            onNext={handleNext}
                            index={stageIndex}
                            total={letters.length}
                        />
                    )}

                    {stage === 'sound_match' && currentItem && (
                        <SoundMatchCard
                            key={`sound-${stageIndex}`}
                            letter={currentItem}
                            options={shuffleArray([
                                currentItem.turkish,
                                ...getRandomOptions(currentItem.turkish, 3)
                            ])}
                            onAnswer={handleAnswer}
                            index={stageIndex}
                            total={letters.length}
                        />
                    )}

                    {stage === 'confusion' && currentItem && (
                        <ConfusionCard
                            key={`confusion-${stageIndex}`}
                            confusion={currentItem}
                            onAnswer={handleAnswer}
                            index={stageIndex}
                            total={confusions.length}
                        />
                    )}

                    {stage === 'test' && currentItem && (
                        <TestCard
                            key={`test-${stageIndex}`}
                            question={currentItem}
                            onAnswer={handleAnswer}
                            index={stageIndex}
                            total={testQuestions.length}
                            isGate={lesson.type === 'gate'}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

// Helper functions
function shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

function getRandomOptions(correct, count) {
    const allOptions = ['A', 'B', 'V', 'G', 'D', 'YE', 'YO', 'ZH', 'Z', 'İ', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'TS', 'Ç', 'Ş', 'ŞÇ', 'I', 'E', 'YU', 'YA']
    const filtered = allOptions.filter(o => o !== correct)
    const shuffled = shuffleArray(filtered)
    return shuffled.slice(0, count)
}

export default Lesson
