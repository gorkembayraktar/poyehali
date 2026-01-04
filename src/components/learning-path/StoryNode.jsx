import { motion } from 'framer-motion'
import { HiLockClosed, HiCheck, HiBookOpen, HiHeart, HiShoppingBag, HiStar } from 'react-icons/hi2'
import { FaHandshake, FaMugHot, FaMapLocationDot, FaCartShopping, FaBus, FaTaxi, FaPaperPlane } from 'react-icons/fa6'
import { useSound } from '../../contexts/SoundContext'

const iconMap = {
    'handshake': <FaHandshake />,
    'coffee': <FaMugHot />,
    'map': <FaMapLocationDot />,
    'cart': <FaCartShopping />,
    'book': <HiBookOpen />,
    'heart': <HiHeart />,
    'bus': <FaBus />,
    'taxi': <FaTaxi />,
    'airplane': <FaPaperPlane />,
    'bag': <HiShoppingBag />,
    'star': <HiStar />
}

const StoryNode = ({ story, unlocked, completed, onClick, index }) => {
    const { playSFX } = useSound()

    const isLeft = index % 2 === 0

    // State-based styles
    const getNodeStyles = () => {
        if (!unlocked) {
            return {
                bg: 'bg-slate-200/80 dark:bg-white/5',
                border: 'border-slate-300 dark:border-white/5',
                text: 'text-slate-400 dark:text-zinc-600',
                blur: 'opacity-50',
                cursor: 'cursor-not-allowed',
                glow: ''
            }
        }
        if (completed) {
            return {
                bg: 'bg-emerald-500',
                border: 'border-white/20',
                text: 'text-white',
                blur: '',
                cursor: 'cursor-pointer',
                glow: 'shadow-lg shadow-emerald-500/20'
            }
        }
        // Active/Unlocked but not completed
        return {
            bg: 'bg-gradient-to-br from-orange-500 to-amber-600',
            border: 'border-white/20 ring-4 ring-orange-500/30',
            text: 'text-white',
            blur: '',
            cursor: 'cursor-pointer',
            glow: 'shadow-xl shadow-orange-500/40'
        }
    }

    const styles = getNodeStyles()

    const handleClick = () => {
        if (unlocked) {
            playSFX('nav_click.mp3')
            onClick(story)
        } else {
            playSFX('error.mp3')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
        >
            <motion.button
                onClick={handleClick}
                disabled={!unlocked}
                whileHover={unlocked ? { scale: 1.1 } : {}}
                whileTap={unlocked ? { scale: 0.95 } : {}}
                className={`
                    w-20 h-20 rounded-full border-2 flex items-center justify-center relative
                    transition-all duration-300
                    ${styles.bg} ${styles.border} ${styles.text} ${styles.blur} ${styles.cursor} ${styles.glow}
                `}
            >
                {/* Icon */}
                <div className="text-3xl flex items-center justify-center">
                    {!unlocked ? (
                        <HiLockClosed className="w-7 h-7" />
                    ) : (
                        iconMap[story.icon] || story.icon
                    )}
                </div>

                {unlocked && completed && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0a0a0a] flex items-center justify-center shadow-lg z-10">
                        <HiCheck className="w-4 h-4 text-white" />
                    </div>
                )}

                {/* Active pulse animation */}
                {unlocked && !completed && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-orange-500 -z-10"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>

            {/* Label */}
            <div className={`mt-3 text-center max-w-[120px] ${!unlocked ? 'opacity-50' : ''}`}>
                <p className={`font-bold text-sm leading-tight ${unlocked && !completed ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                    {story.title}
                </p>
                {unlocked && (
                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[10px] font-black uppercase tracking-tighter text-orange-600 dark:text-orange-400">
                        {story.xpReward} XP
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default StoryNode
