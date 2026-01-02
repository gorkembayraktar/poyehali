import { createContext, useContext, useState, useEffect } from 'react'

const SoundContext = createContext()

const STORAGE_KEY = 'poyehali_sound_settings'

export function SoundProvider({ children }) {
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY)
            return saved ? JSON.parse(saved) : false
        }
        return false
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isMuted))
    }, [isMuted])

    const toggleSound = () => setIsMuted(prev => !prev)

    return (
        <SoundContext.Provider value={{ isMuted, toggleSound }}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSound() {
    const context = useContext(SoundContext)
    if (!context) {
        throw new Error('useSound must be used within SoundProvider')
    }
    return context
}
