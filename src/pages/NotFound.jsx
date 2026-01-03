import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiHome, HiQuestionMarkCircle } from 'react-icons/hi2'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
            >
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

                <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                    }}
                    className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-400 to-amber-600 rounded-3xl shadow-xl shadow-orange-500/20 flex items-center justify-center relative"
                >
                    <span className="text-6xl font-black text-white select-none">?</span>
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center"
                    >
                        <HiQuestionMarkCircle className="w-8 h-8 text-indigo-500" />
                    </motion.div>
                </motion.div>

                <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">
                    Oops! Yolumuzu Şaşırdık
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                    Aradığın sayfa Rusça öğrenme yolculuğunda bir yerlerde kaybolmuş olabilir. Endişelenme, ana kampa geri dönebilirsin!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/')}
                        className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                    >
                        <HiHome className="w-5 h-5" />
                        Ana Sayfaya Dön
                    </motion.button>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        Geri Git
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                        HATA KODU: <span className="text-orange-500/50">404</span>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default NotFound
