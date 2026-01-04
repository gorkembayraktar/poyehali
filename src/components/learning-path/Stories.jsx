import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useMemo } from 'react'
import { stories } from '../../data/stories'
import { useProgress } from '../../contexts/ProgressContext'
import { useSound } from '../../contexts/SoundContext'
import StoryNode from './StoryNode'
import { HiChatBubbleLeftRight, HiMap, HiShoppingBag, HiSun } from 'react-icons/hi2'

const categoryIcons = {
    'İlk Adımlar': HiChatBubbleLeftRight,
    'Günlük Yaşam': HiSun,
    'Şehir & Ulaşım': HiMap,
    'Alışveriş': HiShoppingBag
}

const Stories = () => {
    const { progress, isLessonUnlocked, getLessonState } = useProgress()
    const { playSFX } = useSound()
    const navigate = useNavigate()
    const location = useLocation()
    const storyRefs = useRef({})

    // Detect completion and new unlock
    useEffect(() => {
        const completedStoryId = location.state?.completedStoryId
        if (completedStoryId) {
            const storyIndex = stories.findIndex(s => s.id === completedStoryId)
            const nextStory = stories[storyIndex + 1]

            if (nextStory && isLessonUnlocked(nextStory.id)) {
                playSFX('unlock.mp3')
                window.history.replaceState({}, document.title)

                // First: Instant snap to the story just completed
                if (storyRefs.current[completedStoryId]) {
                    storyRefs.current[completedStoryId].scrollIntoView({
                        behavior: 'auto',
                        block: 'center'
                    })
                }

                // Second: Short smooth scroll to the newly unlocked story
                setTimeout(() => {
                    if (storyRefs.current[nextStory.id]) {
                        storyRefs.current[nextStory.id].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        })
                    }
                }, 100)
            }
        }
    }, [location.state, isLessonUnlocked, playSFX])

    // Scroll Restoration Logic
    useEffect(() => {
        if (!location.state?.completedStoryId) {
            const savedScrollPos = sessionStorage.getItem('stories_scroll_pos')
            if (savedScrollPos) {
                const pos = parseInt(savedScrollPos)
                setTimeout(() => {
                    window.scrollTo(0, pos)
                    sessionStorage.removeItem('stories_scroll_pos')
                }, 50)
            } else {
                const activeStory = stories.find(s => getLessonState(s.id) === 'active')
                if (activeStory) {
                    setTimeout(() => {
                        if (storyRefs.current[activeStory.id]) {
                            storyRefs.current[activeStory.id].scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            })
                        }
                    }, 500)
                }
            }
        }
    }, [])

    const groupedStories = useMemo(() => stories.reduce((acc, story) => {
        if (!acc[story.category]) acc[story.category] = []
        acc[story.category].push(story)
        return acc
    }, {}), [])

    const categories = useMemo(() => Object.keys(groupedStories), [groupedStories])

    const handleStoryClick = (story) => {
        if (isLessonUnlocked(story.id)) {
            sessionStorage.setItem('stories_scroll_pos', window.scrollY.toString())
            playSFX('nav_click.mp3')
            navigate(`/story/${story.id}`)
        } else {
            playSFX('error.mp3')
        }
    }

    return (
        <div className="max-w-lg mx-auto py-8 pb-32">
            {categories.map((cat, catIndex) => {
                const storiesInCat = groupedStories[cat]
                const Icon = categoryIcons[cat] || HiChatBubbleLeftRight

                return (
                    <div key={cat} className="mb-16">
                        {/* Category Header */}
                        <div className="sticky top-[172px] md:top-[92px] z-20 flex items-center gap-3 mb-10 px-4 py-3 bg-slate-50/80 dark:bg-[#121212]/80 backdrop-blur-md">
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white leading-tight">
                                    {cat}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono uppercase tracking-wider">
                                    {storiesInCat.length} HİKAYE
                                </p>
                            </div>
                        </div>

                        <div className="relative px-4">
                            {storiesInCat.map((story, index) => {
                                const state = getLessonState(story.id)
                                const unlocked = state !== 'locked'
                                const completed = state === 'completed'
                                const isLeft = index % 2 === 0
                                const isLastInCat = index === storiesInCat.length - 1

                                return (
                                    <div key={story.id} className="relative" ref={el => storyRefs.current[story.id] = el}>
                                        <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`${isLeft ? 'ml-8 md:ml-16' : 'mr-8 md:mr-16'}`}>
                                                <StoryNode
                                                    story={story}
                                                    unlocked={unlocked}
                                                    completed={completed}
                                                    onClick={handleStoryClick}
                                                    index={index}
                                                />
                                            </div>
                                        </div>

                                        {!isLastInCat && (
                                            <svg
                                                className="w-full h-24 overflow-visible"
                                                viewBox="0 0 400 100"
                                                preserveAspectRatio="none"
                                            >
                                                <path
                                                    d={isLeft
                                                        ? "M 80 0 C 80 50, 320 50, 320 100"
                                                        : "M 320 0 C 320 50, 80 50, 80 100"
                                                    }
                                                    fill="none"
                                                    stroke={completed ? '#10b981' : '#cbd5e1'}
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    className="dark:stroke-slate-600 drop-shadow-sm transition-colors duration-500"
                                                />
                                                {completed && index + 1 < storiesInCat.length && getLessonState(storiesInCat[index + 1].id) !== 'completed' && isLessonUnlocked(storiesInCat[index + 1].id) && (
                                                    <motion.circle
                                                        r="6"
                                                        fill="#f97316"
                                                    >
                                                        <animateMotion
                                                            dur="2s"
                                                            repeatCount="indefinite"
                                                            path={isLeft
                                                                ? "M 80 0 C 80 50, 320 50, 320 100"
                                                                : "M 320 0 C 320 50, 80 50, 80 100"
                                                            }
                                                        />
                                                    </motion.circle>
                                                )}
                                            </svg>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Stories
