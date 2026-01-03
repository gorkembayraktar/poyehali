import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiFire, HiSparkles, HiSun, HiMoon, HiShare, HiBars3, HiCog6Tooth } from 'react-icons/hi2'
import { FaXTwitter, FaGithub } from 'react-icons/fa6'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import BottomNav from './BottomNav'
import logo from '../assets/logo.png'
import { useProgress } from '../contexts/ProgressContext'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'
import ShareModal from './ShareModal'
import SettingsModal from './SettingsModal'
import { useSound } from '../contexts/SoundContext'

function Layout({ children }) {
  const location = useLocation()
  const { streak, totalXP } = useProgress()
  const { theme, toggleTheme } = useTheme()
  const { isSettingsOpen, setIsSettingsOpen } = useSound()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const menuActions = [
    {
      label: 'Başarıyı Paylaş',
      icon: HiShare,
      onClick: () => { setIsShareModalOpen(true); setIsActionMenuOpen(false); },
      color: 'text-orange-500'
    },
    {
      label: 'Sistem Ayarları',
      icon: HiCog6Tooth,
      onClick: () => { setIsSettingsOpen(true); setIsActionMenuOpen(false); },
      color: 'text-slate-700 dark:text-slate-200'
    },
    {
      label: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/gorkembayraktar/poyehali',
      color: 'text-slate-700 dark:text-slate-200'
    }
  ]

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
                <span className="font-bold text-slate-800 dark:text-white">Poyehali</span>
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

                <div className="relative">
                  <button
                    onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                    className={`
                      p-2 rounded-xl transition-all active:scale-95
                      ${isActionMenuOpen
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
                      }
                    `}
                  >
                    <HiBars3 className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isActionMenuOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsActionMenuOpen(false)}
                          className="fixed inset-0 z-[100]"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                          className="absolute right-0 mt-2 w-52 py-2 z-[110] rounded-2xl shadow-2xl border border-orange-500/20 dark:border-orange-500/10 overflow-hidden"
                        >
                          {/* Rich Background with Strong Brand Color */}
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-600 dark:from-orange-500 dark:to-orange-700" />
                          <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                          <div className="relative z-10">
                            {menuActions.map((action, idx) => (
                              <div key={idx}>
                                {action.href ? (
                                  <a
                                    href={action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors"
                                  >
                                    <action.icon className="w-5 h-5 text-white" />
                                    <span className="text-sm font-bold text-white">{action.label}</span>
                                  </a>
                                ) : (
                                  <button
                                    onClick={action.onClick}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                                  >
                                    <action.icon className="w-5 h-5 text-white" />
                                    <span className="text-sm font-bold text-white">{action.label}</span>
                                  </button>
                                )}
                                {idx === 0 && <div className="mx-2 my-1 h-px bg-white/20" />}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
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
      <SettingsModal />
    </div>
  )
}

export default Layout
