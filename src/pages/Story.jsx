import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiSpeakerWave, HiCheck, HiPlay, HiPause } from 'react-icons/hi2'
import { FaHandshake, FaMugHot, FaMapLocationDot, FaCartShopping, FaUserTie, FaUser, FaPersonWalking, FaUserTag } from 'react-icons/fa6'
import { useSound } from '../contexts/SoundContext'
import { useProgress } from '../contexts/ProgressContext'
import { getStoryById } from '../data/stories'

const iconMap = {
    'handshake': <FaHandshake className="w-5 h-5" />,
    'coffee': <FaMugHot className="w-5 h-5" />,
    'map': <FaMapLocationDot className="w-5 h-5" />,
    'cart': <FaCartShopping className="w-5 h-5" />
}

const avatarMap = {
    'man_suit': <FaUserTie />,
    'woman_suit': <FaUserTie />,
    'woman_apron': <FaUserTag />,
    'man_casual': <FaPersonWalking />,
    'woman_casual': <FaUser />,
    'man': <FaUser />,
    'woman': <FaUser />
}

const InteractiveWord = ({ word, tr, gender }) => {
    const [isHovered, setIsHovered] = useState(false)
    const { playSFX } = useSound()

    const speakWord = (e) => {
        e.stopPropagation()
        if (!window.speechSynthesis) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(word.replace(/[.,!?;:]/g, ''))
        utterance.lang = 'ru-RU'

        const voices = window.speechSynthesis.getVoices()
        const ruVoices = voices.filter(v => v.lang.startsWith('ru'))

        if (ruVoices.length > 0) {
            const femaleKeywords = ['female', 'irina', 'elena', 'tatyana', 'milena', 'katya', 'google', 'zira', 'samantha']
            const maleKeywords = ['male', 'pavel', 'dmitry', 'maxim', 'aleksandr', 'yuri', 'microsoft', 'david', 'mark']

            let selectedVoice = null
            if (gender === 'female') {
                selectedVoice = ruVoices.find(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)) && !maleKeywords.some(k => v.name.toLowerCase().includes(k)))
            } else {
                selectedVoice = ruVoices.find(v => maleKeywords.some(k => v.name.toLowerCase().includes(k)) && !femaleKeywords.some(k => v.name.toLowerCase().includes(k)))
            }

            if (!selectedVoice) selectedVoice = ruVoices[0]
            utterance.voice = selectedVoice
        }

        window.speechSynthesis.speak(utterance)
    }

    return (
        <span
            className="relative inline-block cursor-pointer mx-[1px]"
            onClick={speakWord}
            onMouseEnter={() => {
                setIsHovered(true)
                playSFX('hover.mp3')
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={`border-b-2 border-transparent hover:border-orange-400 hover:text-orange-500 transition-colors duration-150`}>
                {word}
            </span>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 text-white text-[11px] font-medium rounded-lg whitespace-nowrap z-50 shadow-xl pointer-events-none"
                    >
                        {tr}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}

const Story = () => {
    const { storyId } = useParams()
    const navigate = useNavigate()
    const { playSFX } = useSound()
    const { completeLesson } = useProgress()

    const story = getStoryById(storyId)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [showTranslations, setShowTranslations] = useState({})
    const [isPlaying, setIsPlaying] = useState(false)
    const [autoPlay, setAutoPlay] = useState(true)
    const [voicesLoaded, setVoicesLoaded] = useState(false)

    const scrollRef = useRef(null)

    useEffect(() => {
        if (!story) navigate('/')
    }, [story, navigate])

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            if (voices.length > 0) {
                setVoicesLoaded(true)
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
        return () => { window.speechSynthesis.onvoiceschanged = null }
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [currentIndex])

    useEffect(() => {
        if (autoPlay && !isPlaying && voicesLoaded) {
            const currentLine = story.dialogue[currentIndex]
            if (currentLine) {
                speak(currentLine)
            }
        }
    }, [currentIndex, autoPlay, voicesLoaded])


    if (!story) return null

    const currentDialogue = story.dialogue.slice(0, currentIndex + 1)
    const isFinished = currentIndex === story.dialogue.length - 1

    const speak = (line) => {
        if (!window.speechSynthesis) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(line.text)
        utterance.lang = 'ru-RU'

        const voices = window.speechSynthesis.getVoices()
        const ruVoices = voices.filter(v => v.lang.startsWith('ru'))

        if (ruVoices.length > 0) {
            const femaleKeywords = ['female', 'irina', 'elena', 'tatyana', 'milena', 'katya', 'google', 'zira', 'samantha']
            const maleKeywords = ['male', 'pavel', 'dmitry', 'maxim', 'aleksandr', 'yuri', 'microsoft', 'david', 'mark']

            let selectedVoice = null

            if (line.gender === 'female') {
                selectedVoice = ruVoices.find(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)) && !maleKeywords.some(k => v.name.toLowerCase().includes(k)))
            } else {
                selectedVoice = ruVoices.find(v => maleKeywords.some(k => v.name.toLowerCase().includes(k)) && !femaleKeywords.some(k => v.name.toLowerCase().includes(k)))
            }

            if (!selectedVoice) {
                if (ruVoices.length >= 2) {
                    selectedVoice = line.gender === 'female' ? ruVoices[0] : ruVoices[1]
                } else {
                    selectedVoice = ruVoices[0]
                }
            }
            utterance.voice = selectedVoice
        }

        utterance.onstart = () => setIsPlaying(true)
        utterance.onend = () => {
            setIsPlaying(false)
            if (autoPlay) {
                if (currentIndex < story.dialogue.length - 1) {
                    setCurrentIndex(prev => prev + 1)
                } else {
                    setAutoPlay(false)
                }
            }
        }

        window.speechSynthesis.speak(utterance)
    }

    const next = () => {
        if (currentIndex < story.dialogue.length - 1) {
            playSFX('pop.mp3')
            setCurrentIndex(prev => prev + 1)
        }
    }

    const toggleTranslation = (index) => {
        setShowTranslations(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const handleComplete = () => {
        playSFX('success.mp3')
        completeLesson(story.id, 100)
        // Pass completed story ID to trigger scroll/sound in Stories view
        navigate('/story', { state: { completedStoryId: story.id } })
    }

    const handleBack = () => {
        // Save scroll position for Stories view is handled in handleStoryClick, 
        // but here we just go back.
        navigate('/story')
    }

    return (
        <div className=" bg-slate-100 dark:bg-[#0a0a0a] flex flex-col items-center overflow-hidden">

            {/* Minimal Header */}
            <div className="w-full max-w-2xl px-4 py-3 bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-white/5 flex items-center justify-between z-30 shadow-sm shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            {iconMap[story.icon] || story.icon} {story.title}
                        </h1>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (!autoPlay) {
                            setAutoPlay(true)
                            if (!isPlaying) speak(story.dialogue[currentIndex])
                        } else {
                            setAutoPlay(false)
                            window.speechSynthesis.cancel()
                            setIsPlaying(false)
                        }
                    }}
                    className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold transition-all border ${autoPlay
                        ? 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20'
                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10'
                        }`}
                >
                    {autoPlay ? <HiPause className="w-3.5 h-3.5" /> : <HiPlay className="w-3.5 h-3.5" />}
                    <span>{autoPlay ? 'OYNATILIYOR' : 'OTOMATİK'}</span>
                </button>
            </div>

            {/* Chat Content - Vertical Space Optimized */}
            <div className=" w-full max-w-2xl px-3 bg-[#e5e5e5] dark:bg-[#0a0a0a] flex flex-col min-h-0 relative">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto pt-4 pb-4 space-y-4 scroll-smooth no-scrollbar relative z-10"
                >
                    <AnimatePresence initial={false}>
                        {currentDialogue.map((line, index) => {
                            const isA = line.speaker === story.characterA.name
                            const char = isA ? story.characterA : story.characterB

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full ${isA ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`flex max-w-[90%] md:max-w-[80%] gap-2 ${isA ? 'flex-row' : 'flex-row-reverse'}`}>
                                        {/* Avatar */}
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-white dark:bg-[#1e1e1e] shadow-sm border border-slate-100 dark:border-white/5 shrink-0 self-end mb-0.5 text-slate-600 dark:text-slate-300">
                                            {avatarMap[char.avatar] || char.avatar}
                                        </div>

                                        {/* Chat Bubble - Compact */}
                                        <div className={`flex flex-col ${isA ? 'items-start' : 'items-end'}`}>
                                            <div className="flex items-center gap-2 mb-0.5 px-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{char.name}</span>
                                            </div>

                                            <div className={`
                                                relative px-3 py-2 rounded-xl shadow-sm text-sm md:text-[15px] leading-snug
                                                ${isA
                                                    ? 'bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-white/5'
                                                    : 'bg-emerald-600 text-white rounded-br-none'
                                                }
                                            `}>
                                                <div className="flex flex-wrap gap-x-1">
                                                    {(line.words || []).map((w, wi) => (
                                                        <InteractiveWord key={wi} word={w.ru} tr={w.tr} gender={line.gender} />
                                                    ))}
                                                    {(!line.words) && line.text}
                                                </div>

                                                <AnimatePresence>
                                                    {showTranslations[index] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className={`text-xs mt-1.5 pt-1.5 border-t ${isA ? 'border-slate-100 text-slate-500' : 'border-emerald-500 text-emerald-100'}`}
                                                        >
                                                            {line.translation}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Action Buttons (Hidden by default, hover to see) */}
                                            <div className={`flex items-center gap-2 px-1 opacity-0 hover:opacity-100 transition-opacity ${'opacity-100'} h-4`}>
                                                <button
                                                    onClick={() => speak(line)}
                                                    className="p-0.5 hover:text-orange-500 text-slate-400 transition-colors"
                                                >
                                                    <HiSpeakerWave className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => toggleTranslation(index)}
                                                    className="text-[9px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                >
                                                    {showTranslations[index] ? 'GİZLE' : 'ÇEVİRİ'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Control */}
            <div className="w-full bg-slate-50 dark:bg-[#121212] border-t border-slate-200 dark:border-white/5 p-3 z-30 shrink-0">
                <div className="max-w-2xl mx-auto">
                    {!isFinished ? (
                        !isPlaying && !autoPlay &&
                        <button
                            onClick={next}
                            className="w-full py-3 bg-slate-800 dark:bg-white text-white dark:text-black font-bold text-sm rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <span>Sonraki</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            className="w-full py-3 bg-green-600 text-white font-bold text-sm rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <HiCheck className="w-5 h-5" />
                            <span>Tamamla</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Story
