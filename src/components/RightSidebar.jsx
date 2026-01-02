import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiFire, HiSparkles, HiSun, HiMoon, HiShare } from 'react-icons/hi2'
import { useProgress } from '../contexts/ProgressContext'
import { useTheme } from '../contexts/ThemeContext'
import ShareModal from './ShareModal'

function RightSidebar() {
    const { streak, totalXP } = useProgress()
    const { theme, toggleTheme } = useTheme()
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)

    return (
        <div className="hidden lg:flex flex-col w-80 sticky top-0 h-screen p-6 gap-6 z-40">
            {/* Stats Panel */}
            <div className="flex items-center gap-4">
                {/* Streak */}
                <div className="flex-1 glass-card p-3 rounded-2xl flex items-center justify-center gap-2 border-2 border-orange-100 dark:border-orange-900/30">
                    <HiFire className="w-6 h-6 text-orange-500" />
                    <span className="font-black text-slate-700 dark:text-slate-200">
                        {streak.current}
                    </span>
                </div>

                {/* XP */}
                <div className="flex-1 glass-card p-3 rounded-2xl flex items-center justify-center gap-2 border-2 border-indigo-100 dark:border-indigo-900/30">
                    <HiSparkles className="w-5 h-5 text-indigo-500" />
                    <span className="font-black text-slate-700 dark:text-slate-200">
                        {totalXP} XP
                    </span>
                </div>
            </div>

            {/* Share Widget */}
            <div className="relative group overflow-hidden glass-card p-5 rounded-3xl border border-indigo-500/20 dark:border-indigo-500/10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl -mr-12 -mt-12 rounded-full group-hover:bg-indigo-500/20 transition-colors" />

                <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-indigo-500 dark:text-indigo-400">
                        <div className="p-2 rounded-xl bg-indigo-500/10">
                            <HiShare className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Başarılarını Paylaş</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Topladığın XP ve serini arkadaşlarına göstererek onlara meydan oku!
                    </p>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 active:scale-95 transition-all"
                    >
                        Şimdi Paylaş
                    </button>
                </div>
            </div>

            {/* Theme Toggle */}
            <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                        Görünüm
                    </span>
                </div>

                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        {theme === 'light' ? (
                            <div className="p-2 rounded-lg bg-amber-100 text-amber-500">
                                <HiSun className="w-5 h-5" />
                            </div>
                        ) : (
                            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                <HiMoon className="w-5 h-5" />
                            </div>
                        )}
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                            {theme === 'light' ? 'Aydınlık Mod' : 'Karanlık Mod'}
                        </span>
                    </div>

                    <div className={`
                        w-10 h-6 rounded-full p-1 transition-colors duration-200
                        ${theme === 'dark' ? 'bg-indigo-500' : 'bg-slate-300'}
                    `}>
                        <motion.div
                            animate={{ x: theme === 'dark' ? 16 : 0 }}
                            className="w-4 h-4 rounded-full bg-white shadow-sm"
                        />
                    </div>
                </button>
            </div>

            {/* Placeholder for future widgets like "Friend Updates" or "Daily Quests" */}
            <div className="glass-card p-4 rounded-2xl border-2 border-slate-200 dark:border-white/5 border-dashed min-h-[150px] flex items-center justify-center text-center">
                <div>
                    <p className="font-bold text-slate-400 dark:text-slate-500 mb-2 text-sm">
                        Günlük Görevler
                    </p>
                    <p className="text-[10px] text-slate-400 px-4">
                        Çok yakında burada günlük görevlerin yer alacak...
                    </p>
                </div>
            </div>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                stats={{ streak: streak.current, totalXP }}
            />
        </div>
    )
}

export default RightSidebar
