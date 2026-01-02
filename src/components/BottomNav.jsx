import { useNavigate, useLocation } from 'react-router-dom'
import { HiHome, HiTrophy, HiBookOpen, HiShoppingBag, HiUser } from 'react-icons/hi2'

function BottomNav() {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { label: 'Ana Sayfa', icon: HiHome, path: '/' },
        { label: 'Liderlik', icon: HiTrophy, path: '/leaderboard', disabled: true },
        { label: 'Görevler', icon: HiBookOpen, path: '/quests', disabled: true },
        { label: 'Mağaza', icon: HiShoppingBag, path: '/shop', disabled: true },
        { label: 'Profil', icon: HiUser, path: '/profile', disabled: true },
    ]

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0f1016] border-t border-slate-200 dark:border-slate-800 z-50 pb-safe">
            <div className="flex items-center justify-around p-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path

                    return (
                        <button
                            key={item.label}
                            onClick={() => !item.disabled && navigate(item.path)}
                            disabled={item.disabled}
                            className={`
                flex flex-col items-center gap-1 p-2 rounded-xl transition-all
                ${isActive
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }
                ${item.disabled ? 'opacity-40' : ''}
              `}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default BottomNav
