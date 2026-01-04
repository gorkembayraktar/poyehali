import { motion } from 'framer-motion'
import { HiLockClosed, HiCheck, HiSparkles } from 'react-icons/hi2'
import { useProgress } from '../../contexts/ProgressContext'
import { useSound } from '../../contexts/SoundContext'
import { lessonIcons } from '../../constants/icons'

const colorClasses = {
    orange: {
        active: 'from-orange-500 to-amber-600',
        completed: 'bg-orange-500',
        ring: 'ring-orange-500/30',
        glow: 'shadow-orange-500/40'
    },
    rose: {
        active: 'from-rose-500 to-orange-600',
        completed: 'bg-rose-500',
        ring: 'ring-rose-500/30',
        glow: 'shadow-rose-500/40'
    },
    amber: {
        active: 'from-amber-500 to-orange-600',
        completed: 'bg-amber-500',
        ring: 'ring-amber-500/30',
        glow: 'shadow-amber-500/40'
    },
    emerald: {
        active: 'from-emerald-500 to-teal-600',
        completed: 'bg-emerald-500',
        ring: 'ring-emerald-500/30',
        glow: 'shadow-emerald-500/40'
    },
    cyan: {
        active: 'from-cyan-500 to-blue-600',
        completed: 'bg-cyan-500',
        ring: 'ring-cyan-500/30',
        glow: 'shadow-cyan-500/40'
    }
}

function PathNode({ lesson, onClick, index }) {
    const { getLessonState, progress } = useProgress()
    const state = getLessonState(lesson.id)
    const colors = colorClasses[lesson.color] || colorClasses.amber
    const isGate = lesson.type === 'gate'

    const completionData = progress.completedLessons[lesson.id]
    const score = completionData?.score

    // Get the icon component
    const IconComponent = lessonIcons[lesson.id] || null

    // Node size based on type
    const nodeSize = isGate ? 'w-20 h-20' : 'w-16 h-16'

    // State-based styles
    const getNodeStyles = () => {
        switch (state) {
            case 'locked':
                return {
                    bg: 'bg-slate-200/80 dark:bg-white/5',
                    border: 'border-slate-300 dark:border-white/5',
                    text: 'text-slate-400 dark:text-zinc-600',
                    blur: 'opacity-50',
                    cursor: 'cursor-not-allowed'
                }
            case 'active':
                return {
                    bg: `bg-gradient-to-br ${colors.active}`,
                    border: `border-white/20 ring-4 ${colors.ring}`,
                    text: 'text-white',
                    blur: '',
                    cursor: 'cursor-pointer',
                    glow: `shadow-xl ${colors.glow}`
                }
            case 'in_progress':
                return {
                    bg: `bg-gradient-to-br ${colors.active}`,
                    border: `border-white/30 ring-2 ${colors.ring}`,
                    text: 'text-white',
                    blur: '',
                    cursor: 'cursor-pointer',
                    glow: `shadow-lg ${colors.glow}`
                }
            case 'completed':
                return {
                    bg: colors.completed,
                    border: 'border-white/20',
                    text: 'text-white',
                    blur: '',
                    cursor: 'cursor-pointer'
                }
            default:
                return {}
        }
    }

    const { playSFX } = useSound()
    const styles = getNodeStyles()

    const handleClick = () => {
        if (state !== 'locked') {
            playSFX('nav_click.mp3')
            onClick(lesson)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            className="flex flex-col items-center"
        >
            {/* Node Button */}
            <motion.button
                onClick={handleClick}
                disabled={state === 'locked'}
                whileHover={state !== 'locked' ? { scale: 1.1 } : {}}
                whileTap={state !== 'locked' ? { scale: 0.95 } : {}}
                className={`
          ${nodeSize} rounded-full border-2 flex items-center justify-center relative
          transition-all duration-300
          ${styles.bg} ${styles.border} ${styles.text} ${styles.blur} ${styles.cursor} ${styles.glow || ''}
        `}
            >
                {/* Icon */}
                {state === 'locked' ? (
                    <HiLockClosed className="w-6 h-6" />
                ) : (
                    <>
                        {IconComponent ? (
                            <IconComponent className={`${isGate ? 'w-8 h-8' : 'w-7 h-7'}`} />
                        ) : (
                            <span className="text-xl font-bold">{lesson.title.charAt(0)}</span>
                        )}

                        {state === 'completed' && (
                            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0f0f0f] flex items-center justify-center shadow-lg z-10">
                                <HiCheck className="w-4 h-4 text-white" />
                                {score >= 90 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <HiSparkles className="w-3 h-3 text-amber-300" />
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Active pulse animation */}
                {state === 'active' && (
                    <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.active} -z-10`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Gate special rotating border */}
                {isGate && state === 'active' && (
                    <motion.div
                        className="absolute inset-[-4px] rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent 0%, rgba(251,191,36,0.6) 10%, transparent 20%)'
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </motion.button>

            {/* Label */}
            <div className={`mt-3 text-center max-w-[120px] ${state === 'locked' ? 'opacity-50' : ''}`}>
                <p className={`font-bold text-sm leading-tight ${state === 'active' ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                    {lesson.title}
                </p>

                {/* Score badge for completed lessons */}
                {state === 'completed' && score !== undefined && (
                    <div className={`
            mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold
            ${score >= 90
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                            : score >= 80
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                        }
          `}>
                        {score}%
                    </div>
                )}

                {/* Gate requirement badge */}
                {isGate && state === 'active' && (
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                        %{lesson.passScore}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default PathNode
