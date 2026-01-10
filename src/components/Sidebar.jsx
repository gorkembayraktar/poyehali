import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHome, HiTrophy, HiBookOpen, HiShoppingBag, HiUser, HiAcademicCap, HiXMark, HiCog6Tooth } from 'react-icons/hi2'
import { FaXTwitter, FaGithub } from 'react-icons/fa6'
import { useSound } from '../contexts/SoundContext'
import SettingsModal from './SettingsModal'
import logo from '../assets/logo.png'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { playSFX, setIsSettingsOpen } = useSound()

    const [showPromo, setShowPromo] = useState(() => {
        return sessionStorage.getItem('poyehali_sidebar_promo_dismissed') !== 'true'
    })

    const handleClosePromo = (e) => {
        e.preventDefault()
        e.stopPropagation()
        playSFX('nav_click.mp3')
        setShowPromo(false)
        sessionStorage.setItem('poyehali_sidebar_promo_dismissed', 'true')
    }

    const width = 'w-64' // fixed width for sidebar

    const menuItems = [
        { label: 'ANA SAYFA', icon: HiHome, path: '/' },
        { label: 'ALFABE', icon: HiAcademicCap, path: '/alphabet' },
        { label: 'LİDERLİK', icon: HiTrophy, path: '/leaderboard', disabled: true },
        { label: 'GÖREVLER', icon: HiBookOpen, path: '/quests', disabled: true },
        { label: 'MAĞAZA', icon: HiShoppingBag, path: '/shop', disabled: true },
        { label: 'PROFİL', icon: HiUser, path: '/profile', disabled: true },
    ]

    return (
        <div className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#121212] z-[1] ${width}`}>
            {/* Logo Area */}
            <div className="px-8 pt-12 pb-8 relative group flex flex-col items-center text-center">
                {/* Architectural Background Detail */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-orange-500/[0.04] via-orange-500/[0.01] to-transparent pointer-events-none" />

                <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="relative"
                    >
                        {/* Branding Pedestal Glow */}
                        <div className="absolute inset-0 bg-orange-500/15 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <img src={logo} alt="Poyehali" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
                        </div>
                    </motion.div>

                    <div className="space-y-2 w-full flex flex-col items-center">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                                Poyehali
                            </h1>
                            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] animate-pulse" />
                        </div>
                        <div className="flex items-center justify-center gap-3 w-full">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-orange-500/20 dark:to-orange-500/10" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-500 whitespace-nowrap">
                                Rusça Öğren
                            </span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-orange-500/20 dark:to-orange-500/10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                        <button
                            key={item.label}
                            onClick={() => {
                                if (!item.disabled) {
                                    playSFX('nav_click.mp3')
                                    navigate(item.path)
                                }
                            }}
                            disabled={item.disabled}
                            className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-transparent'
                                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
              `}
                        >
                            <item.icon className={`w-7 h-7 ${isActive ? 'fill-current' : ''}`} />
                            <span className="font-bold text-sm tracking-wide">
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </nav>

            {/* Promo Card */}
            {showPromo && (
                <div className="px-4 mb-4 relative group">
                    <button
                        onClick={handleClosePromo}
                        className="absolute top-2 right-6 z-20 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Kapat"
                    >
                        <HiXMark className="w-3 h-3" />
                    </button>
                    <a
                        href="https://kirilalfabesi.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <HiAcademicCap className="w-5 h-5" />
                                <span className="text-[10px] font-black tracking-widest uppercase opacity-80">Önerilen Kaynak</span>
                            </div>
                            <h4 className="font-bold text-sm leading-tight mb-1">Kiril Alfabesi</h4>
                            <p className="text-[11px] opacity-90 font-medium">Alfabeyi detaylı öğrenmek için ziyaret et.</p>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                    </a>
                </div>
            )}

            {/* Footer */}
            <div className="p-4 mt-auto border-t-2 border-slate-100 dark:border-white/5 pt-6 space-y-1">
                <a
                    href="https://github.com/gorkembayraktar/poyehali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
                >
                    <FaGithub className="w-5 h-5 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
                    <span className="font-bold text-xs tracking-widest uppercase group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                        GitHub
                    </span>
                </a>
                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
                >
                    <FaXTwitter className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="font-bold text-xs tracking-widest uppercase group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                        Takip Et
                    </span>
                </a>
                <button
                    onClick={() => {
                        playSFX('nav_click.mp3')
                        setIsSettingsOpen(true)
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group w-full"
                >
                    <HiCog6Tooth className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="font-bold text-xs tracking-widest uppercase group-hover:text-slate-800 dark:group-hover:text-white transition-colors text-left font-bold">
                        Ayarlar
                    </span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar
