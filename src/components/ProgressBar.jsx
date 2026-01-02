import { motion } from 'framer-motion'

function ProgressBar({ current, total }) {
  const progress = Math.min(100, (current / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 w-full max-w-lg mx-auto"
    >
      <div className="flex items-center justify-between mb-2 px-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          İlerleme
        </span>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-mono">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="glass-input p-1 rounded-full">
        <div className="h-4 bg-slate-100 dark:bg-slate-700/30 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(99,102,241,0.4)] relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProgressBar

