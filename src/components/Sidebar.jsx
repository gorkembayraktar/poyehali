import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHome, HiTrophy, HiBookOpen, HiShoppingBag, HiUser, HiAcademicCap } from 'react-icons/hi2'
import { FaXTwitter, FaGithub } from 'react-icons/fa6'
import logo from '../assets/logo.png'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()

    const width = 'w-64' // fixed width for sidebar

    const menuItems = [
        { label: 'ANA SAYFA', icon: HiHome, path: '/' },
        { label: 'LİDERLİK', icon: HiTrophy, path: '/leaderboard', disabled: true },
        { label: 'GÖREVLER', icon: HiBookOpen, path: '/quests', disabled: true },
        { label: 'MAĞAZA', icon: HiShoppingBag, path: '/shop', disabled: true },
        { label: 'PROFİL', icon: HiUser, path: '/profile', disabled: true },
    ]

    return (
        <div className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#121212] z-[1] ${width}`}>
            {/* Logo Area */}
            <div className="p-6 mb-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Rusça Logo" className="w-10 h-10 object-contain" />
                    <h1 className="font-bold text-slate-800 dark:text-white text-xl tracking-tight">
                        Poyehali
                    </h1>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                        <button
                            key={item.label}
                            onClick={() => !item.disabled && navigate(item.path)}
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
            <div className="px-4 mb-4">
                <a
                    href="https://kirilalfabesi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
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

            {/* Footer */}
            <div className="p-4 mt-auto border-t-2 border-slate-100 dark:border-white/5 pt-6 space-y-1">
                <a
                    href="https://github.com"
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
            </div>
        </div>
    )
}

export default Sidebar
