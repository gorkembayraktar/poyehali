import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiHome, HiTrophy, HiBookOpen, HiShoppingBag, HiUser } from 'react-icons/hi2'
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
        <div className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1016] z-50 ${width}`}>
            {/* Logo Area */}
            <div className="p-6 mb-4">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Rusça Logo" className="w-10 h-10 object-contain" />
                    <h1 className="font-bold text-slate-800 dark:text-white text-xl tracking-tight">
                        Privet
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
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800'
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

        </div>
    )
}

export default Sidebar
