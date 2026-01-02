import { motion } from 'framer-motion'

function PathConnector({ fromState, toState, index }) {
    // Determine connector color based on states
    const isCompleted = fromState === 'completed'
    const isActive = fromState === 'completed' && (toState === 'active' || toState === 'in_progress')

    return (
        <div className="flex justify-center py-1">
            <div className="relative h-8 w-1">
                {/* Background line */}
                <div className={`
          absolute inset-0 rounded-full
          ${isCompleted
                        ? 'bg-orange-500'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }
        `} />

                {/* Animated fill for active transition */}
                {isActive && (
                    <motion.div
                        className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-orange-500 to-amber-500"
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                    />
                )}

                {/* Glow dot at connection point */}
                {isActive && (
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500"
                        animate={{
                            y: [0, 32, 0],
                            opacity: [1, 0.5, 1],
                            scale: [1, 0.8, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default PathConnector
