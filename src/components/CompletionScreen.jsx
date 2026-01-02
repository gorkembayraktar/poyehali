import { motion } from 'framer-motion'
import { useId } from 'react'
import { HiSparkles, HiStar, HiArrowPath } from 'react-icons/hi2'
import { FaTrophy } from 'react-icons/fa'

function CompletionScreen({ score, onRestart }) {
  const percentage = Math.round((score.correct / score.total) * 100)
  const gradientId = useId()

  // Floating particles
  const particles = Array.from({ length: 6 }).map((_, i) => ({
    width: Math.random() * 8 + 4,
    height: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 1
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-[60vh] relative"
    >
      <div className="glass-card rounded-[3rem] p-10 md:p-14 w-full max-w-lg mx-auto relative overflow-hidden text-center shadow-2xl shadow-orange-500/20">

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 opacity-60"
              style={{ width: p.width, height: p.height }}
              initial={{ x: `${p.x}%`, y: "110%" }}
              animate={{ y: "-10%", x: `${p.x + (Math.random() - 0.5) * 50}%` }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-10 inline-flex p-6 rounded-[2rem] bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-500 shadow-xl shadow-amber-500/20 ring-4 ring-white/50 dark:ring-white/10"
        >
          <FaTrophy className="w-16 h-16 drop-shadow-md" />
        </motion.div>

        <h2 className="text-4xl xs:text-5xl font-black text-gradient mb-4 tracking-tight">
          Harika İş!
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium text-lg max-w-xs mx-auto">
          Bölümü başarıyla tamamladın. Gelişimin göz kamaştırıyor!
        </p>

        {/* Circular Progress */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          {/* Outer Ring Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 blur-xl opacity-20 animate-pulse-slow"></div>

          <svg className="transform -rotate-90 w-48 h-48 relative z-10">
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="86"
              stroke="currentColor"
              fill="none"
              className="text-slate-100 dark:text-white/5"
            />
            {/* Foreground Circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="86"
              stroke={`url(#${gradientId})`}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 86}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 86 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 86 * (1 - percentage / 100) }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-5xl font-black text-slate-800 dark:text-white mb-1">
              {percentage}%
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <HiStar className="w-3.5 h-3.5" />
              <span>Başarı</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Doğru</span>
            <span className="text-2xl font-bold text-emerald-500">{score.correct}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Yanlış</span>
            <span className="text-2xl font-bold text-rose-500">{score.total - score.correct}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full py-5 rounded-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
        >
          <HiArrowPath className="w-5 h-5" />
          <span>Tekrar Çalış</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CompletionScreen

