import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiFire, HiSparkles, HiSun, HiMoon, HiShare } from 'react-icons/hi2'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import BottomNav from './BottomNav'
import logo from '../assets/logo.png'
import { useProgress } from '../contexts/ProgressContext'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'
import ShareModal from './ShareModal'

function Layout({ children }) {
  const location = useLocation()
  const { streak, totalXP } = useProgress()
  const { theme, toggleTheme } = useTheme()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-[#121212] transition-colors duration-500">
      {/* Simplified Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#121212]"></div>
      </div>

      {/* Left Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area (Offset by sidebar width) */}
      <div className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto flex justify-center items-start min-h-screen">

          {/* Center Column - Content */}
          <div className="flex-1 w-full max-w-2xl relative z-10 border-r border-slate-200 dark:border-white/5 md:border-none min-h-screen pb-24 md:pb-0">
            {/* Mobile Header - Only visible on small screens */}
            <div className="md:hidden sticky top-0 z-50 p-4 bg-white/80 dark:bg-[#181818]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Rusça Logo" className="w-8 h-8 object-contain" />
                <span className="font-bold text-slate-800 dark:text-white">Privet</span>
              </div>

              {/* Mobile Stats & Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <HiFire className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{streak.current}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiSparkles className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{totalXP}</span>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="p-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 active:scale-90 transition-all"
                  >
                    <HiShare className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200"
                  >
                    {theme === 'light' ? <HiMoon className="w-5 h-5" /> : <HiSun className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="py-8 md:py-12 px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Stats (Sticky) */}
          <RightSidebar />

        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Shared Modal for Mobile */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        stats={{ streak: streak.current, totalXP }}
      />
    </div>
  )
}

export default Layout
