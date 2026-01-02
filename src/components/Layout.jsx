import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineDocumentText, HiOutlineCalculator, HiOutlineBookOpen, HiChevronLeft, HiSun, HiMoon } from 'react-icons/hi2'
import { FaPalette } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

const moduleNames = {
  '/alfabe': { name: 'Alfabe', Icon: HiOutlineDocumentText, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  '/sayilar': { name: 'Sayılar', Icon: HiOutlineCalculator, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  '/renkler': { name: 'Renkler', Icon: FaPalette, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  '/kelimeler': { name: 'Kelimeler', Icon: HiOutlineBookOpen, color: 'text-amber-500', bg: 'bg-amber-500/10' },
}

function Layout({ children }) {
  const location = useLocation()
  const currentModule = moduleNames[location.pathname]
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#0f1016] transition-colors duration-500 selection:bg-fuchsia-500/30">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-float opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-float-delayed opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse-slow opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] animate-float opacity-40 mix-blend-multiply dark:mix-blend-screen"></div>

        {/* Grain Overlay for Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Floating Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card rounded-2xl px-2 py-2 sm:px-6 sm:py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 group px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                    <HiChevronLeft className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors hidden sm:block">
                    Ana Sayfa
                  </span>
                </motion.button>
              </Link>

              <AnimatePresence mode="wait">
                {currentModule && (
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-xl ${currentModule.bg} border border-white/10`}
                  >
                    <currentModule.Icon className={`text-xl ${currentModule.color}`} />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {currentModule.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="block md:hidden">
                {currentModule && (
                  <div className={`p-2 rounded-xl ${currentModule.bg}`}>
                    <currentModule.Icon className={`text-xl ${currentModule.color}`} />
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

              <motion.button
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <HiMoon className="w-5 h-5" />
                ) : (
                  <HiSun className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 pt-32 pb-16 max-w-7xl relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Layout

