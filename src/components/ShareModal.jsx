import { motion, AnimatePresence } from 'framer-motion'
import { HiXMark, HiShare, HiClipboard, HiClipboardDocumentCheck, HiFire, HiSparkles, HiAcademicCap, HiPhoto } from 'react-icons/hi2'
import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import logo from '../assets/logo.png'

function ShareModal({ isOpen, onClose, stats }) {
    const [copied, setCopied] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const cardRef = useRef(null)

    const shareUrl = window.location.origin
    const shareText = `Rusça öğrenme yolculuğumda ${stats.totalXP} XP topladım ve ${stats.streak} günlük seri yaptım! Sen de katıl: ${shareUrl}`

    const handleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(shareText)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text:', err)
        }
    }

    const handleCopyAsImage = async () => {
        if (!cardRef.current) return

        setIsExporting(true)
        try {
            // Render the card to canvas
            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // Higher quality
                backgroundColor: null,
                useCORS: true,
                logging: false,
            })

            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error('Blob creation failed')

                try {
                    // Use ClipboardItem API to copy image
                    const item = new ClipboardItem({ 'image/png': blob })
                    await navigator.clipboard.write([item])

                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                } catch (err) {
                    // Fallback for browsers that don't support image clipboard
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `privet-basari-${stats.streak}-gun.png`
                    a.click()
                    URL.revokeObjectURL(url)

                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                }
            }, 'image/png')
        } catch (err) {
            console.error('Failed to export image:', err)
        } finally {
            setIsExporting(false)
        }
    }

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Privet - Rusça Öğreniyorum',
                    text: shareText,
                    url: shareUrl,
                })
            } catch (err) {
                console.error('Sharing failed:', err)
            }
        } else {
            handleCopyText()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm glass-card rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md text-white/70 hover:text-white transition-colors"
                        >
                            <HiXMark className="w-5 h-5" />
                        </button>

                        <div className="p-8 pt-12 text-center">
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
                                BAŞARINI KUTLA 🥳
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">
                                İlerlemeni premium bir görsel olarak paylaş.
                            </p>

                            {/* Share Card Preview */}
                            <div
                                ref={cardRef}
                                className="relative w-full aspect-[4/5] rounded-[2rem] bg-[#090909] overflow-hidden p-8 flex flex-col justify-between text-left shadow-2xl mb-8 border border-white/5"
                                style={{
                                    background: `
                                        radial-gradient(circle at 100% 0%, rgba(79, 70, 229, 0.4) 0%, transparent 50%),
                                        radial-gradient(circle at 0% 100%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                                        #090909
                                    `
                                }}
                            >
                                {/* Header: Logo & Branding */}
                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center p-2.5 shadow-xl">
                                        <img src={logo} alt="Privet" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white tracking-tight leading-none">Privet</h3>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1">Rusça Öğren</p>
                                    </div>
                                </div>

                                {/* Main Stats */}
                                <div className="relative z-10">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-orange-400 mb-1">
                                                <HiFire className="w-5 h-5" />
                                                <span className="text-xs font-black uppercase tracking-widest">GÜN SERİ</span>
                                            </div>
                                            <div className="text-6xl font-black text-white tracking-tighter">
                                                {stats.streak}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 text-indigo-400 mb-1">
                                                <HiSparkles className="w-5 h-5" />
                                                <span className="text-xs font-black uppercase tracking-widest">TOPLAM XP</span>
                                            </div>
                                            <div className="text-5xl font-black text-white tracking-tighter">
                                                {stats.totalXP}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="relative z-10 flex justify-between items-end">
                                    <div className="flex items-center gap-2">
                                        {/* Removed redundant badge */}
                                    </div>
                                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                        privet.app
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleCopyAsImage}
                                    disabled={isExporting}
                                    className={`
                                        flex flex-col items-center justify-center gap-2 py-4 rounded-3xl transition-all active:scale-95
                                        ${copied
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                            : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10'
                                        }
                                    `}
                                >
                                    {isExporting ? (
                                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                    ) : copied ? (
                                        <HiClipboardDocumentCheck className="w-6 h-6" />
                                    ) : (
                                        <HiPhoto className="w-6 h-6" />
                                    )}
                                    <span className="text-[11px] font-black uppercase tracking-wider">
                                        {isExporting ? 'Hazırlanıyor' : copied ? 'Kopyalandı' : 'RESİM KOPYALA'}
                                    </span>
                                </button>
                                <button
                                    onClick={handleNativeShare}
                                    className="flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-600 transition-all active:scale-95 border-b-4 border-indigo-700 hover:border-indigo-800"
                                >
                                    <HiShare className="w-6 h-6" />
                                    <span className="text-[11px] font-black uppercase tracking-wider">PAYLAŞ</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ShareModal
