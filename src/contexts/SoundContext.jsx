import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const SoundContext = createContext()

const STORAGE_KEY = 'poyehali_sound_settings_v2'

const DEFAULT_SETTINGS = {
    master: true,
    sfx: true,
    voice: true
}

export function SoundProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                try {
                    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
                } catch (e) {
                    console.error('Failed to parse sound settings:', e)
                }
            }
        }
        return DEFAULT_SETTINGS
    })

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }, [settings])

    const toggleSetting = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    const playSFX = useCallback((soundName) => {
        if (!settings.master || !settings.sfx) return

        const audio = new Audio(`/sounds/${soundName}`)
        audio.volume = 0.6
        audio.play().catch(err => console.log('Audio play failed:', err))
    }, [settings.master, settings.sfx])

    const playVoice = useCallback((text, lang = 'ru-RU') => {
        if (!settings.master || !settings.voice) return

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang
            utterance.rate = 0.8
            utterance.pitch = 1
            speechSynthesis.cancel()
            speechSynthesis.speak(utterance)
        }
    }, [settings.master, settings.voice])

    // Legacy support for toggleSound if needed, though we should migrate to toggleSetting
    const toggleSound = () => toggleSetting('master')
    const isMuted = !settings.master

    return (
        <SoundContext.Provider value={{
            settings,
            toggleSetting,
            playSFX,
            playVoice,
            isMuted, // compatibility
            toggleSound, // compatibility
            isSettingsOpen,
            setIsSettingsOpen
        }}>
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
