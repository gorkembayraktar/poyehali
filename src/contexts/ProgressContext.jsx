import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { learningPath, getLessonById } from '../data/learningPath'
import { stories } from '../data/stories'

const ProgressContext = createContext()

const STORAGE_KEY = 'russian_learning_progress'

// Initial progress state
const initialProgress = {
    completedLessons: {}, // { lessonId: { score, completedAt, attempts } }
    masteredSections: {}, // { sectionId: true }
    currentLesson: 'alphabet_1',
    gateScores: {},
    lessonProgress: {}, // { lessonId: { stage, stageIndex, answers } }
    streak: {
        current: 0,
        lastActivityDate: null,
        longestStreak: 0
    },
    totalXP: 0
}

export function ProgressProvider({ children }) {
    const [progress, setProgress] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    return { ...initialProgress, ...parsed }
                } catch (e) {
                    console.error('Failed to parse progress:', e)
                }
            }
        }
        return initialProgress
    })

    // Save to localStorage whenever progress changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }, [progress])

    // Check if a lesson (or story) is unlocked
    const isLessonUnlocked = useCallback((lessonId) => {
        // Try to find in learning path first
        const lesson = getLessonById(lessonId)
        if (lesson) {
            // First lesson it always unlocked
            if (!lesson.requires) return true

            const { lessonId: requiredLessonId, gateId, minScore } = lesson.requires

            if (requiredLessonId) {
                const requiredCompletion = progress.completedLessons[requiredLessonId]
                return requiredCompletion && requiredCompletion.score >= minScore
            }

            if (gateId) {
                const gateScore = progress.gateScores[gateId]
                return gateScore && gateScore >= minScore
            }
        }

        // Try to find in stories
        const story = stories.find(s => s.id === lessonId)
        if (story) {
            if (!story.requires) return true
            // Support both object { storyId } and existing lesson-like requires
            const requiredStoryId = story.requires.storyId || story.requires.lessonId
            return progress.completedLessons[requiredStoryId] !== undefined
        }

        return false
    }, [progress.completedLessons, progress.gateScores])

    // Get lesson state (locked, active, in_progress, completed)
    const getLessonState = useCallback((lessonId) => {
        const lesson = getLessonById(lessonId) || stories.find(s => s.id === lessonId)
        if (!lesson) return 'locked'

        // Check if completed
        if (progress.completedLessons[lessonId]) {
            return 'completed'
        }

        // Check if in progress
        if (progress.lessonProgress[lessonId]) {
            return 'in_progress'
        }

        // Check if unlocked (active)
        if (isLessonUnlocked(lessonId)) {
            return 'active'
        }

        return 'locked'
    }, [progress.completedLessons, progress.lessonProgress, isLessonUnlocked])

    // Get the first active (not completed, not locked) lesson
    const getActiveLesson = useCallback(() => {
        for (const lesson of learningPath) {
            const state = getLessonState(lesson.id)
            if (state === 'active' || state === 'in_progress') {
                return lesson
            }
        }
        return learningPath[0]
    }, [getLessonState])

    // Start a lesson
    const startLesson = useCallback((lessonId) => {
        if (!isLessonUnlocked(lessonId)) return false

        setProgress(prev => ({
            ...prev,
            currentLesson: lessonId,
            lessonProgress: {
                ...prev.lessonProgress,
                [lessonId]: prev.lessonProgress[lessonId] || {
                    stage: 'introduction',
                    stageIndex: 0,
                    answers: [],
                    startedAt: new Date().toISOString()
                }
            }
        }))

        return true
    }, [isLessonUnlocked])

    // Update lesson progress
    const updateLessonProgress = useCallback((lessonId, updates) => {
        setProgress(prev => ({
            ...prev,
            lessonProgress: {
                ...prev.lessonProgress,
                [lessonId]: {
                    ...prev.lessonProgress[lessonId],
                    ...updates
                }
            }
        }))
    }, [])

    // Complete a lesson or story
    const completeLesson = useCallback((lessonId, score) => {
        const item = getLessonById(lessonId) || stories.find(s => s.id === lessonId)
        if (!item) return false

        const passScore = item.passScore || 0 // Stories don't have passScore usually
        const passed = score >= passScore

        setProgress(prev => {
            const newProgress = { ...prev }

            // Record completion
            newProgress.completedLessons = {
                ...prev.completedLessons,
                [lessonId]: {
                    score,
                    passed,
                    completedAt: new Date().toISOString(),
                    attempts: (prev.completedLessons[lessonId]?.attempts || 0) + 1
                }
            }

            // If it's a gate, record gate score
            if (item.type === 'gate') {
                newProgress.gateScores = {
                    ...prev.gateScores,
                    [lessonId]: Math.max(prev.gateScores[lessonId] || 0, score)
                }
            }

            // Clean up lesson progress
            const { [lessonId]: _, ...remainingProgress } = prev.lessonProgress
            newProgress.lessonProgress = remainingProgress

            // Update streak
            const today = new Date().toDateString()
            const lastActivity = prev.streak.lastActivityDate

            if (lastActivity !== today) {
                const yesterday = new Date(Date.now() - 86400000).toDateString()

                if (lastActivity === yesterday) {
                    newProgress.streak = {
                        current: prev.streak.current + 1,
                        lastActivityDate: today,
                        longestStreak: Math.max(prev.streak.longestStreak, prev.streak.current + 1)
                    }
                } else {
                    newProgress.streak = {
                        current: 1,
                        lastActivityDate: today,
                        longestStreak: Math.max(prev.streak.longestStreak, 1)
                    }
                }
            }

            // Add XP (Stories usually have xpReward field)
            const reward = item.xpReward || (passed ? 50 : 10)
            newProgress.totalXP = prev.totalXP + reward

            return newProgress
        })

        return passed
    }, [])

    // Master an entire section
    const masterSection = useCallback((sectionId) => {
        const sectionLessons = learningPath.filter(l => l.section === sectionId)

        setProgress(prev => {
            const newProgress = { ...prev }
            const now = new Date().toISOString()

            // Mark all lessons as completed
            sectionLessons.forEach(lesson => {
                if (!newProgress.completedLessons[lesson.id]) {
                    newProgress.completedLessons[lesson.id] = {
                        score: 100,
                        passed: true,
                        completedAt: now,
                        attempts: 1,
                        isAutoMastered: true
                    }

                    if (lesson.type === 'gate') {
                        newProgress.gateScores[lesson.id] = 100
                    }

                    // Award some XP
                    newProgress.totalXP += 25
                }
            })

            newProgress.masteredSections = {
                ...prev.masteredSections,
                [sectionId]: true
            }

            return newProgress
        })
    }, [])

    // Reset all progress
    const resetProgress = useCallback(() => {
        setProgress(initialProgress)
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    // Get overall progress percentage
    const getOverallProgress = useCallback(() => {
        const completed = learningPath.filter(l => progress.completedLessons[l.id]).length
        const total = learningPath.length
        return Math.round((completed / total) * 100)
    }, [progress.completedLessons])

    // Get stories progress percentage
    const getStoriesProgress = useCallback(() => {
        const completed = stories.filter(s => progress.completedLessons[s.id]).length
        const total = stories.length
        return total > 0 ? Math.round((completed / total) * 100) : 0
    }, [progress.completedLessons])

    // Get section progress
    const getSectionProgress = useCallback((sectionId) => {
        const sectionLessons = learningPath.filter(l => l.section === sectionId)
        const completed = sectionLessons.filter(l => progress.completedLessons[l.id]).length
        return {
            completed,
            total: sectionLessons.length,
            percentage: Math.round((completed / sectionLessons.length) * 100)
        }
    }, [progress.completedLessons])

    const value = {
        progress,
        isLessonUnlocked,
        getLessonState,
        getActiveLesson,
        startLesson,
        updateLessonProgress,
        completeLesson,
        masterSection,
        resetProgress,
        getOverallProgress,
        getSectionProgress,
        streak: progress.streak,
        totalXP: progress.totalXP,
        masteredSections: progress.masteredSections,
        getStoriesProgress
    }

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    const context = useContext(ProgressContext)
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider')
    }
    return context
}
