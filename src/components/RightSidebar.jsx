import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiFire, HiSparkles, HiShare, HiCog6Tooth } from 'react-icons/hi2'
import { useProgress } from '../contexts/ProgressContext'
import { useSound } from '../contexts/SoundContext'
import ShareModal from './ShareModal'

function RightSidebar() {
    const { streak, totalXP } = useProgress()
    const { setIsSettingsOpen } = useSound()
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)

    return (
        <div className="hidden lg:flex flex-col w-80 sticky top-0 h-screen p-6 gap-6 z-40 overflow-y-auto">
            {/* Header / Quick Actions */}
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                    İlerlemem
                </h2>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all active:scale-95"
                    title="Ayarlar"
                >
                    <HiCog6Tooth className="w-6 h-6" />
                </button>
            </div>

            {/* Stats Panel */}
            <div className="flex items-center gap-4">
                {/* Streak */}
                <div className="flex-1 glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-1 border-2 border-orange-100 dark:border-orange-900/30 group">
                    <HiFire className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-black text-slate-800 dark:text-white">
                        {streak.current}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GÜN SERİ</span>
                </div>

                {/* XP */}
                <div className="flex-1 glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-1 border-2 border-indigo-100 dark:border-indigo-900/30 group">
                    <HiSparkles className="w-7 h-7 text-indigo-500 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-black text-slate-800 dark:text-white">
                        {totalXP}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TOPLAM XP</span>
                </div>
            </div>

            {/* Share Progress Card */}
            <div className="glass-card p-6 rounded-[2rem] bg-slate-900/90 dark:bg-black/40 border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-500">
                            <HiShare className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-orange-500">Başarılarını Paylaş</span>
                    </div>

                    <p className="text-sm text-slate-400 font-medium mb-6 leading-relaxed">
                        Topladığın XP ve serini arkadaşlarına göstererek onlara meydan oku!
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsShareModalOpen(true)}
                        className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
                    >
                        Şimdi Paylaş
                    </motion.button>
                </div>
            </div>

            {/* Footer Widget */}
            <div className="mt-auto glass-card p-4 rounded-2xl border-2 border-slate-200 dark:border-white/5 border-dashed min-h-[120px] flex items-center justify-center text-center">
                <div>
                    <p className="font-bold text-slate-400 dark:text-slate-500 mb-2 text-sm italic">
                        "Yarınki sen, bugün pes etmediğin için sana teşekkür edecek."
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
