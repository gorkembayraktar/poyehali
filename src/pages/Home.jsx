import { motion } from 'framer-motion'
import { HiSun, HiMoon, HiSparkles } from 'react-icons/hi2'
import { useTheme } from '../contexts/ThemeContext'
import { useProgress } from '../contexts/ProgressContext'
import LearningPath from '../components/learning-path/LearningPath'

function Home() {
  const { theme, toggleTheme } = useTheme()
  const { streak, totalXP } = useProgress()

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#0f1016] transition-colors duration-500">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-float opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-float-delayed opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse-slow opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] animate-float opacity-40 mix-blend-multiply dark:mix-blend-screen"></div>

        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-xl">🇷🇺</span>
              </div>
              <div>
                <h1 className="font-bold text-slate-800 dark:text-white text-sm">
                  Rusça Öğren
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Adım adım ilerle
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* XP Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <HiSparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {totalXP} XP
                </span>
              </div>

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-500 transition-all"
              >
                {theme === 'light' ? (
                  <HiMoon className="w-5 h-5" />
                ) : (
                  <HiSun className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-8">
        <LearningPath />
      </main>
    </div>
  )
}

export default Home
