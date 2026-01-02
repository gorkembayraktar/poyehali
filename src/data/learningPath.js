// Learning Path Configuration
// Defines the complete linear learning structure with unlock conditions

export const LESSON_STATES = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
}

export const GATE_REQUIREMENTS = {
  alphabet_gate: 80,
  phonetic_gate: 85,
  master_gate: 90
}

// Complete learning path structure
export const learningPath = [
  // ===== ALPHABET SECTION =====
  {
    id: 'alphabet_1',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 1',
    subtitle: 'А Б В Г Д Е',
    letters: ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    icon: '🔤',
    color: 'orange',
    requires: null, // Always unlocked
    passScore: 80
  },
  {
    id: 'alphabet_2',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 2',
    subtitle: 'Ё Ж З И Й К',
    letters: ['Ё', 'Ж', 'З', 'И', 'Й', 'К'],
    icon: '🔤',
    color: 'orange',
    requires: { lessonId: 'alphabet_1', minScore: 80 },
    passScore: 80
  },
  {
    id: 'alphabet_3',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 3',
    subtitle: 'Л М Н О П Р',
    letters: ['Л', 'М', 'Н', 'О', 'П', 'Р'],
    icon: '🔤',
    color: 'orange',
    requires: { lessonId: 'alphabet_2', minScore: 80 },
    passScore: 80
  },
  {
    id: 'alphabet_4',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 4',
    subtitle: 'С Т У Ф Х Ц',
    letters: ['С', 'Т', 'У', 'Ф', 'Х', 'Ц'],
    icon: '🔤',
    color: 'orange',
    requires: { lessonId: 'alphabet_3', minScore: 80 },
    passScore: 80
  },
  {
    id: 'alphabet_5',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 5',
    subtitle: 'Ч Ш Щ Ъ Ы Ь',
    letters: ['Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь'],
    icon: '🔤',
    color: 'orange',
    requires: { lessonId: 'alphabet_4', minScore: 80 },
    passScore: 80
  },
  {
    id: 'alphabet_6',
    type: 'lesson',
    section: 'alphabet',
    title: 'Alfabe 6',
    subtitle: 'Э Ю Я + Tekrar',
    letters: ['Э', 'Ю', 'Я'],
    icon: '🔤',
    color: 'orange',
    requires: { lessonId: 'alphabet_5', minScore: 80 },
    passScore: 80
  },
  {
    id: 'alphabet_gate',
    type: 'gate',
    section: 'alphabet',
    title: 'Alfabe Kapısı',
    subtitle: 'Tüm harfleri test et',
    icon: '⚡',
    color: 'amber',
    requires: { lessonId: 'alphabet_6', minScore: 80 },
    passScore: 80,
    description: 'Bu kapıyı geçmeden ilerleyemezsin!'
  },

  // ===== PHONETICS SECTION =====
  {
    id: 'phonetic_1',
    type: 'lesson',
    section: 'phonetics',
    title: 'Sesli Harfler',
    subtitle: 'Ünlü sesler',
    icon: '🔊',
    color: 'amber',
    requires: { gateId: 'alphabet_gate', minScore: 80 },
    passScore: 80
  },
  {
    id: 'phonetic_2',
    type: 'lesson',
    section: 'phonetics',
    title: 'Sessiz Harfler',
    subtitle: 'Ünsüz grupları',
    icon: '🔊',
    color: 'amber',
    requires: { lessonId: 'phonetic_1', minScore: 80 },
    passScore: 80
  },
  {
    id: 'phonetic_3',
    type: 'lesson',
    section: 'phonetics',
    title: 'Zor Sesler',
    subtitle: 'Ж, Ш, Щ, Ц, Ч',
    icon: '🔊',
    color: 'amber',
    requires: { lessonId: 'phonetic_2', minScore: 80 },
    passScore: 80
  },
  {
    id: 'phonetic_gate',
    type: 'gate',
    section: 'phonetics',
    title: 'Fonetik Kapısı',
    subtitle: '%85 gerekli',
    icon: '⚡',
    color: 'amber',
    requires: { lessonId: 'phonetic_3', minScore: 80 },
    passScore: 85,
    description: 'Sesleri mükemmel tanımalısın!'
  },

  // ===== CONFUSION MASTERY SECTION =====
  {
    id: 'confusion_1',
    type: 'lesson',
    section: 'confusion',
    title: 'Karışıklık 1',
    subtitle: 'В/B, Р/P, Н/H',
    icon: '⚠️',
    color: 'rose',
    requires: { gateId: 'phonetic_gate', minScore: 85 },
    passScore: 80,
    confusionSet: ['В', 'Р', 'Н']
  },
  {
    id: 'confusion_2',
    type: 'lesson',
    section: 'confusion',
    title: 'Karışıklık 2',
    subtitle: 'С/C, У/Y, Х/X',
    icon: '⚠️',
    color: 'rose',
    requires: { lessonId: 'confusion_1', minScore: 80 },
    passScore: 80,
    confusionSet: ['С', 'У', 'Х']
  },
  {
    id: 'confusion_3',
    type: 'lesson',
    section: 'confusion',
    title: 'Karışıklık 3',
    subtitle: 'Karışık test',
    icon: '⚠️',
    color: 'rose',
    requires: { lessonId: 'confusion_2', minScore: 80 },
    passScore: 80,
    confusionSet: ['В', 'Р', 'Н', 'С', 'У', 'Х', 'Е', 'Я']
  },
  {
    id: 'master_gate',
    type: 'gate',
    section: 'confusion',
    title: 'Master Kapısı',
    subtitle: '%90 gerekli',
    icon: '🏆',
    color: 'amber',
    requires: { lessonId: 'confusion_3', minScore: 80 },
    passScore: 90,
    description: 'En zor sınav! Hazır mısın?'
  },

  // ===== VOCABULARY SECTION =====
  {
    id: 'numbers_1',
    type: 'lesson',
    section: 'vocabulary',
    title: 'Sayılar 1-10',
    subtitle: 'один, два, три...',
    icon: '🔢',
    color: 'emerald',
    requires: { gateId: 'master_gate', minScore: 90 },
    passScore: 80
  },
  {
    id: 'numbers_2',
    type: 'lesson',
    section: 'vocabulary',
    title: 'Sayılar 11-100',
    subtitle: 'одиннадцать...',
    icon: '🔢',
    color: 'emerald',
    requires: { lessonId: 'numbers_1', minScore: 80 },
    passScore: 80
  },
  {
    id: 'colors',
    type: 'lesson',
    section: 'vocabulary',
    title: 'Renkler',
    subtitle: 'красный, синий...',
    icon: '🎨',
    color: 'emerald',
    requires: { lessonId: 'numbers_2', minScore: 80 },
    passScore: 80
  },
  {
    id: 'daily_words',
    type: 'lesson',
    section: 'vocabulary',
    title: 'Günlük Kelimeler',
    subtitle: 'Temel kelimeler',
    icon: '📚',
    color: 'emerald',
    requires: { lessonId: 'colors', minScore: 80 },
    passScore: 80
  },

  // ===== PRACTICE SECTION =====
  {
    id: 'simple_phrases',
    type: 'lesson',
    section: 'practice',
    title: 'Basit Cümleler',
    subtitle: 'İlk cümlelerim',
    icon: '💬',
    color: 'cyan',
    requires: { lessonId: 'daily_words', minScore: 80 },
    passScore: 80
  },
  {
    id: 'daily_loop',
    type: 'practice',
    section: 'practice',
    title: 'Günlük Pratik',
    subtitle: 'Sonsuz tekrar',
    icon: '🔄',
    color: 'cyan',
    requires: { lessonId: 'simple_phrases', minScore: 80 },
    passScore: null // No pass score - always available once unlocked
  }
]

// Section metadata for visual grouping
export const sections = {
  alphabet: {
    title: 'Alfabe',
    description: 'Kiril alfabesini öğren',
    color: 'orange',
    icon: '🔤'
  },
  phonetics: {
    title: 'Fonetik',
    description: 'Sesleri tanı',
    color: 'amber',
    icon: '🔊'
  },
  confusion: {
    title: 'Karışıklık Ustası',
    description: 'Benzer harfleri ayırt et',
    color: 'rose',
    icon: '⚠️'
  },
  vocabulary: {
    title: 'Kelime Hazinesi',
    description: 'Temel kelimeler',
    color: 'emerald',
    icon: '📚'
  },
  practice: {
    title: 'Pratik',
    description: 'Günlük tekrar',
    color: 'cyan',
    icon: '🔄'
  }
}

// Helper to get lesson by ID
export const getLessonById = (id) => learningPath.find(l => l.id === id)

// Helper to get next lesson
export const getNextLesson = (currentId) => {
  const currentIndex = learningPath.findIndex(l => l.id === currentId)
  return learningPath[currentIndex + 1] || null
}

// Helper to get previous lesson
export const getPreviousLesson = (currentId) => {
  const currentIndex = learningPath.findIndex(l => l.id === currentId)
  return learningPath[currentIndex - 1] || null
}
