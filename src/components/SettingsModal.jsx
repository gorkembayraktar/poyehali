import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HiXMark,
    HiSpeakerWave,
    HiSpeakerXMark,
    HiMusicalNote,
    HiChatBubbleBottomCenterText,
    HiSun,
    HiMoon,
    HiCog6Tooth
} from 'react-icons/hi2'
import { useTheme } from '../contexts/ThemeContext'
import { useSound } from '../contexts/SoundContext'

function SettingsModal() {
    const { theme, toggleTheme } = useTheme()
    const { settings, toggleSetting, isSettingsOpen, setIsSettingsOpen } = useSound()

    const soundSettings = [
        { key: 'master', label: 'Genel Ses', icon: settings.master ? HiSpeakerWave : HiSpeakerXMark, color: 'orange' },
        { key: 'sfx', label: 'Efektler', icon: HiMusicalNote, color: 'indigo' },
        { key: 'voice', label: 'Seslendirme', icon: HiChatBubbleBottomCenterText, color: 'emerald' },
    ]

    const modalContent = (
        <AnimatePresence>
            {isSettingsOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSettingsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md glass-card rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-500">
                                    <HiCog6Tooth className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                                    Sistem Ayarları
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 transition-colors"
                            >
                                <HiXMark className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 pt-4 space-y-8">
                            {/* Sound Section */}
                            <section>
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-1">
                                    Ses Ayarları
                                </h3>
                                <div className="space-y-3">
                                    {soundSettings.map((item) => (
                                        <button
                                            key={item.key}
                                            onClick={() => toggleSetting(item.key)}
                                            className="w-full flex items-center justify-between p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl transition-colors
                                                    ${settings[item.key]
                                                        ? `bg-${item.color}-500/10 text-${item.color}-500`
                                                        : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                                                    }`}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span className={`font-bold transition-colors
                                                    ${settings[item.key] ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}
                                                `}>
                                                    {item.label}
                                                </span>
                                            </div>

                                            <div className={`
                                                w-12 h-7 rounded-full p-1 transition-colors duration-300
                                                ${settings[item.key] ? 'bg-orange-500' : 'bg-slate-300 dark:bg-white/10'}
                                            `}>
                                                <motion.div
                                                    animate={{ x: settings[item.key] ? 20 : 0 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    className="w-5 h-5 rounded-full bg-white shadow-lg"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Appearance Section */}
                            <section>
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 px-1">
                                    Görünüm
                                </h3>
                                <button
                                    onClick={toggleTheme}
                                    className="w-full flex items-center justify-between p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl transition-colors
                                            ${theme === 'light'
                                                ? 'bg-amber-100 text-amber-500'
                                                : 'bg-indigo-500/20 text-indigo-400'
                                            }`}
                                        >
                                            {theme === 'light' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                                        </div>
                                        <span className="font-bold text-slate-700 dark:text-slate-200">
                                            {theme === 'light' ? 'Açık Tema' : 'Koyu Tema'}
                                        </span>
                                    </div>

                                    <div className={`
                                        w-12 h-7 rounded-full p-1 transition-colors duration-300
                                        ${theme === 'dark' ? 'bg-orange-500' : 'bg-slate-300'}
                                    `}>
                                        <motion.div
                                            animate={{ x: theme === 'dark' ? 20 : 0 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            className="w-5 h-5 rounded-full bg-white shadow-lg"
                                        />
                                    </div>
                                </button>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 text-center">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                Poyehali v2.4 • Rusça Öğrenme Arkadaşın
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )

    return createPortal(modalContent, document.body)
}

export default SettingsModal
