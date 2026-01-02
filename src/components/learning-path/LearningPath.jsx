import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiSparkles, HiFire, HiAcademicCap, HiBookOpen, HiSpeakerWave, HiExclamationTriangle, HiCalculator, HiSwatch, HiChatBubbleLeftRight, HiArrowPath, HiBolt, HiTrophy } from 'react-icons/hi2'
import { learningPath, sections } from '../../data/learningPath'
import { useProgress } from '../../contexts/ProgressContext'
import PathNode from './PathNode'

// Icon mapping for lessons
export const lessonIcons = {
    alphabet_1: HiAcademicCap,
    alphabet_2: HiAcademicCap,
    alphabet_3: HiAcademicCap,
    alphabet_4: HiAcademicCap,
    alphabet_5: HiAcademicCap,
    alphabet_6: HiAcademicCap,
    alphabet_gate: HiBolt,
    phonetic_1: HiSpeakerWave,
    phonetic_2: HiSpeakerWave,
    phonetic_3: HiSpeakerWave,
    phonetic_gate: HiBolt,
    confusion_1: HiExclamationTriangle,
    confusion_2: HiExclamationTriangle,
    confusion_3: HiExclamationTriangle,
    master_gate: HiTrophy,
    numbers_1: HiCalculator,
    numbers_2: HiCalculator,
    colors: HiSwatch,
    daily_words: HiBookOpen,
    simple_phrases: HiChatBubbleLeftRight,
    daily_loop: HiArrowPath
}

// Section icons
export const sectionIcons = {
    alphabet: HiAcademicCap,
    phonetics: HiSpeakerWave,
    confusion: HiExclamationTriangle,
    vocabulary: HiBookOpen,
    practice: HiArrowPath
}

function LearningPath() {
    const navigate = useNavigate()
    const { getLessonState, getOverallProgress, streak } = useProgress()
    const overallProgress = getOverallProgress()

    const handleLessonClick = (lesson) => {
        navigate(`/lesson/${lesson.id}`)
    }

    // Group lessons by section
    const groupedLessons = learningPath.reduce((acc, lesson) => {
        const section = lesson.section
        if (!acc[section]) {
            acc[section] = []
        }
        acc[section].push(lesson)
        return acc
    }, {})

    return (
        <div className="min-h-screen pb-20">
            {/* Header with progress */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-20 z-40 mb-8"
            >
                <div className="glass-card rounded-2xl p-4 mx-auto max-w-md">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <HiSparkles className="w-5 h-5 text-indigo-500" />
                            <span className="font-bold text-slate-700 dark:text-slate-200">
                                İlerleme
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Streak */}
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                <HiFire className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                    {streak.current}
                                </span>
                            </div>
                            {/* Percentage */}
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                {overallProgress}%
                            </span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${overallProgress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Learning Path - Zigzag Layout */}
            <div className="max-w-lg mx-auto px-4">
                {Object.entries(groupedLessons).map(([sectionKey, sectionLessons], sectionIndex) => {
                    const section = sections[sectionKey]
                    const SectionIcon = sectionIcons[sectionKey] || HiBookOpen

                    return (
                        <motion.div
                            key={sectionKey}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="mb-12"
                        >
                            {/* Section Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: sectionIndex * 0.1 + 0.1 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                                >
                                    <SectionIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                    <span className="font-bold text-slate-700 dark:text-slate-300">
                                        {section.title}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Zigzag Path */}
                            <div className="relative">
                                {sectionLessons.map((lesson, lessonIndex) => {
                                    const globalIndex = learningPath.findIndex(l => l.id === lesson.id)
                                    const currentState = getLessonState(lesson.id)
                                    const nextLesson = sectionLessons[lessonIndex + 1]
                                    const nextState = nextLesson ? getLessonState(nextLesson.id) : null

                                    // Zigzag: alternate left and right
                                    const isLeft = lessonIndex % 2 === 0
                                    const isLast = lessonIndex === sectionLessons.length - 1

                                    return (
                                        <div key={lesson.id} className="relative">
                                            {/* Node Row */}
                                            <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                                <div className={`${isLeft ? 'ml-8 md:ml-16' : 'mr-8 md:mr-16'}`}>
                                                    <PathNode
                                                        lesson={lesson}
                                                        onClick={handleLessonClick}
                                                        index={globalIndex}
                                                    />
                                                </div>
                                            </div>

                                            {/* Curved Connector to Next */}
                                            {!isLast && (
                                                <svg
                                                    className="w-full h-24 overflow-visible"
                                                    viewBox="0 0 400 100"
                                                    preserveAspectRatio="none"
                                                >
                                                    <path
                                                        d={isLeft
                                                            ? "M 80 0 C 80 50, 320 50, 320 100"
                                                            : "M 320 0 C 320 50, 80 50, 80 100"
                                                        }
                                                        fill="none"
                                                        stroke={currentState === 'completed' ? '#10b981' : '#cbd5e1'}
                                                        strokeWidth="4"
                                                        strokeLinecap="round"
                                                        className="dark:stroke-slate-600 drop-shadow-sm"
                                                    />
                                                    {/* Animated dot for active connection */}
                                                    {currentState === 'completed' && (nextState === 'active' || nextState === 'in_progress') && (
                                                        <motion.circle
                                                            r="6"
                                                            fill="#6366f1"
                                                            initial={{ offsetDistance: '0%' }}
                                                            animate={{ offsetDistance: '100%' }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                                        >
                                                            <animateMotion
                                                                dur="2s"
                                                                repeatCount="indefinite"
                                                                path={isLeft
                                                                    ? "M 80 0 C 80 50, 320 50, 320 100"
                                                                    : "M 320 0 C 320 50, 80 50, 80 100"
                                                                }
                                                            />
                                                        </motion.circle>
                                                    )}
                                                </svg>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Section divider */}
                            {sectionIndex < Object.keys(groupedLessons).length - 1 && (
                                <div className="flex justify-center py-6">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                                        <div className="w-1 h-8 bg-gradient-to-b from-slate-300 dark:from-slate-600 to-transparent" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom spacing */}
            <div className="h-20" />
        </div>
    )
}

export default LearningPath
