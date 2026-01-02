import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'
import BottomNav from './BottomNav'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-[#0f1016] transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-float opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-float-delayed opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Left Sidebar (Fixed) */}
      <Sidebar />

      {/* Main Content Area (Offset by sidebar width) */}
      <div className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto flex justify-center items-start min-h-screen">

          {/* Center Column - Content */}
          <div className="flex-1 w-full max-w-2xl relative z-10 border-r border-slate-200 dark:border-slate-800 md:border-none min-h-screen pb-24 md:pb-0">
            {/* Mobile Header - Only visible on small screens */}
            <div className="md:hidden sticky top-0 z-50 p-4 bg-white/80 dark:bg-[#0f1016]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-lg">🇷🇺</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">Rusça</span>
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
    </div>
  )
}

export default Layout
