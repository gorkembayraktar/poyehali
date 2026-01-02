// Complete Russian Alphabet Data with Confusion Markers
// Each letter includes: character, transcription, Turkish equivalent, confusion level, and similar letters

export const alphabet = [
  // Level 1: А Б В Г Д Е
  { 
    letter: 'А', 
    transcription: 'a', 
    turkish: 'A', 
    sound: '/a/',
    level: 1,
    confusionLevel: 'none',
    looksLike: null,
    example: { word: 'Анна', meaning: 'Anna (isim)', transcription: 'anna' }
  },
  { 
    letter: 'Б', 
    transcription: 'b', 
    turkish: 'B', 
    sound: '/b/',
    level: 1,
    confusionLevel: 'medium',
    looksLike: 'B (Latin)',
    warning: 'Latin B ile aynı görünür ve aynı ses!',
    example: { word: 'Брат', meaning: 'Erkek kardeş', transcription: 'brat' }
  },
  { 
    letter: 'В', 
    transcription: 'v', 
    turkish: 'V', 
    sound: '/v/',
    level: 1,
    confusionLevel: 'critical',
    looksLike: 'B (Latin)',
    warning: '⚠️ KRİTİK: Latin B gibi görünür ama V sesi çıkarır!',
    example: { word: 'Вода', meaning: 'Su', transcription: 'voda' }
  },
  { 
    letter: 'Г', 
    transcription: 'g', 
    turkish: 'G', 
    sound: '/g/',
    level: 1,
    confusionLevel: 'low',
    looksLike: 'Γ (Yunan Gamma)',
    example: { word: 'Город', meaning: 'Şehir', transcription: 'gorod' }
  },
  { 
    letter: 'Д', 
    transcription: 'd', 
    turkish: 'D', 
    sound: '/d/',
    level: 1,
    confusionLevel: 'low',
    looksLike: null,
    example: { word: 'Дом', meaning: 'Ev', transcription: 'dom' }
  },
  { 
    letter: 'Е', 
    transcription: 'ye', 
    turkish: 'YE', 
    sound: '/je/',
    level: 1,
    confusionLevel: 'medium',
    looksLike: 'E (Latin)',
    warning: 'Latin E gibi görünür ama YE sesi çıkarır!',
    example: { word: 'Ел', meaning: 'Yedi (geçmiş)', transcription: 'yel' }
  },

  // Level 2: Ё Ж З И Й К
  { 
    letter: 'Ё', 
    transcription: 'yo', 
    turkish: 'YO', 
    sound: '/jo/',
    level: 2,
    confusionLevel: 'low',
    looksLike: 'Е with dots',
    example: { word: 'Ёж', meaning: 'Kirpi', transcription: 'yozh' }
  },
  { 
    letter: 'Ж', 
    transcription: 'zh', 
    turkish: 'J (Fransızca)',
    sound: '/ʒ/',
    level: 2,
    confusionLevel: 'none',
    looksLike: null,
    example: { word: 'Жена', meaning: 'Eş (kadın)', transcription: 'zhena' }
  },
  { 
    letter: 'З', 
    transcription: 'z', 
    turkish: 'Z', 
    sound: '/z/',
    level: 2,
    confusionLevel: 'medium',
    looksLike: '3 (rakam)',
    warning: 'Rakam 3 gibi görünür!',
    example: { word: 'Зима', meaning: 'Kış', transcription: 'zima' }
  },
  { 
    letter: 'И', 
    transcription: 'i', 
    turkish: 'İ', 
    sound: '/i/',
    level: 2,
    confusionLevel: 'medium',
    looksLike: 'N (ters)',
    warning: 'Ters N gibi görünür!',
    example: { word: 'Имя', meaning: 'İsim', transcription: 'imya' }
  },
  { 
    letter: 'Й', 
    transcription: 'y', 
    turkish: 'Y (kısa)',
    sound: '/j/',
    level: 2,
    confusionLevel: 'low',
    looksLike: 'И with breve',
    example: { word: 'Йогурт', meaning: 'Yoğurt', transcription: 'yogurt' }
  },
  { 
    letter: 'К', 
    transcription: 'k', 
    turkish: 'K', 
    sound: '/k/',
    level: 2,
    confusionLevel: 'none',
    looksLike: 'K (Latin)',
    example: { word: 'Кот', meaning: 'Kedi', transcription: 'kot' }
  },

  // Level 3: Л М Н О П Р
  { 
    letter: 'Л', 
    transcription: 'l', 
    turkish: 'L', 
    sound: '/l/',
    level: 3,
    confusionLevel: 'low',
    looksLike: null,
    example: { word: 'Лампа', meaning: 'Lamba', transcription: 'lampa' }
  },
  { 
    letter: 'М', 
    transcription: 'm', 
    turkish: 'M', 
    sound: '/m/',
    level: 3,
    confusionLevel: 'none',
    looksLike: 'M (Latin)',
    example: { word: 'Мама', meaning: 'Anne', transcription: 'mama' }
  },
  { 
    letter: 'Н', 
    transcription: 'n', 
    turkish: 'N', 
    sound: '/n/',
    level: 3,
    confusionLevel: 'critical',
    looksLike: 'H (Latin)',
    warning: '⚠️ KRİTİK: Latin H gibi görünür ama N sesi çıkarır!',
    example: { word: 'Нос', meaning: 'Burun', transcription: 'nos' }
  },
  { 
    letter: 'О', 
    transcription: 'o', 
    turkish: 'O', 
    sound: '/o/',
    level: 3,
    confusionLevel: 'none',
    looksLike: 'O (Latin)',
    example: { word: 'Окно', meaning: 'Pencere', transcription: 'okno' }
  },
  { 
    letter: 'П', 
    transcription: 'p', 
    turkish: 'P', 
    sound: '/p/',
    level: 3,
    confusionLevel: 'medium',
    looksLike: 'Π (Yunan Pi)',
    example: { word: 'Папа', meaning: 'Baba', transcription: 'papa' }
  },
  { 
    letter: 'Р', 
    transcription: 'r', 
    turkish: 'R', 
    sound: '/r/',
    level: 3,
    confusionLevel: 'critical',
    looksLike: 'P (Latin)',
    warning: '⚠️ KRİTİK: Latin P gibi görünür ama R sesi çıkarır!',
    example: { word: 'Рука', meaning: 'El', transcription: 'ruka' }
  },

  // Level 4: С Т У Ф Х Ц
  { 
    letter: 'С', 
    transcription: 's', 
    turkish: 'S', 
    sound: '/s/',
    level: 4,
    confusionLevel: 'high',
    looksLike: 'C (Latin)',
    warning: 'Latin C gibi görünür ama S sesi çıkarır!',
    example: { word: 'Сок', meaning: 'Meyve suyu', transcription: 'sok' }
  },
  { 
    letter: 'Т', 
    transcription: 't', 
    turkish: 'T', 
    sound: '/t/',
    level: 4,
    confusionLevel: 'none',
    looksLike: 'T (Latin)',
    example: { word: 'Там', meaning: 'Orada', transcription: 'tam' }
  },
  { 
    letter: 'У', 
    transcription: 'u', 
    turkish: 'U', 
    sound: '/u/',
    level: 4,
    confusionLevel: 'high',
    looksLike: 'Y (Latin)',
    warning: 'Latin Y gibi görünür ama U sesi çıkarır!',
    example: { word: 'Утро', meaning: 'Sabah', transcription: 'utro' }
  },
  { 
    letter: 'Ф', 
    transcription: 'f', 
    turkish: 'F', 
    sound: '/f/',
    level: 4,
    confusionLevel: 'low',
    looksLike: 'Φ (Yunan Phi)',
    example: { word: 'Фото', meaning: 'Fotoğraf', transcription: 'foto' }
  },
  { 
    letter: 'Х', 
    transcription: 'kh', 
    turkish: 'H (gırtlak)',
    sound: '/x/',
    level: 4,
    confusionLevel: 'high',
    looksLike: 'X (Latin)',
    warning: 'Latin X gibi görünür ama H (gırtlak) sesi çıkarır!',
    example: { word: 'Хлеб', meaning: 'Ekmek', transcription: 'khleb' }
  },
  { 
    letter: 'Ц', 
    transcription: 'ts', 
    turkish: 'TS', 
    sound: '/ts/',
    level: 4,
    confusionLevel: 'none',
    looksLike: null,
    example: { word: 'Цена', meaning: 'Fiyat', transcription: 'tsena' }
  },

  // Level 5: Ч Ш Щ Ъ Ы Ь
  { 
    letter: 'Ч', 
    transcription: 'ch', 
    turkish: 'Ç', 
    sound: '/tʃ/',
    level: 5,
    confusionLevel: 'none',
    looksLike: '4 (rakam)',
    example: { word: 'Час', meaning: 'Saat', transcription: 'chas' }
  },
  { 
    letter: 'Ш', 
    transcription: 'sh', 
    turkish: 'Ş', 
    sound: '/ʃ/',
    level: 5,
    confusionLevel: 'none',
    looksLike: null,
    example: { word: 'Школа', meaning: 'Okul', transcription: 'shkola' }
  },
  { 
    letter: 'Щ', 
    transcription: 'shch', 
    turkish: 'ŞÇ', 
    sound: '/ʃtʃ/',
    level: 5,
    confusionLevel: 'medium',
    looksLike: 'Ш with tail',
    warning: 'Ш ile karıştırılabilir!',
    example: { word: 'Щи', meaning: 'Lahana çorbası', transcription: 'shchi' }
  },
  { 
    letter: 'Ъ', 
    transcription: 'hard sign', 
    turkish: '(sert işaret)',
    sound: '(sessiz)',
    level: 5,
    confusionLevel: 'none',
    looksLike: null,
    description: 'Ses çıkarmaz, önceki sessiz harfi sertleştirir',
    example: { word: 'Объект', meaning: 'Nesne', transcription: 'obyekt' }
  },
  { 
    letter: 'Ы', 
    transcription: 'y (gırtlak i)', 
    turkish: 'I (kalın)',
    sound: '/ɨ/',
    level: 5,
    confusionLevel: 'none',
    looksLike: null,
    description: 'Türkçe "I" sesine benzer ama daha gırtlaktan',
    example: { word: 'Мы', meaning: 'Biz', transcription: 'my' }
  },
  { 
    letter: 'Ь', 
    transcription: 'soft sign', 
    turkish: '(yumuşak işaret)',
    sound: '(sessiz)',
    level: 5,
    confusionLevel: 'medium',
    looksLike: 'Ъ (hard sign)',
    warning: 'Ъ ile karıştırılabilir!',
    description: 'Ses çıkarmaz, önceki sessiz harfi yumuşatır',
    example: { word: 'Мать', meaning: 'Anne', transcription: 'mat\'' }
  },

  // Level 6: Э Ю Я
  { 
    letter: 'Э', 
    transcription: 'e', 
    turkish: 'E (sert)', 
    sound: '/ɛ/',
    level: 6,
    confusionLevel: 'medium',
    looksLike: 'Ǝ (ters E)',
    warning: 'Е ile karıştırma! Э = E, Е = YE',
    example: { word: 'Это', meaning: 'Bu', transcription: 'eto' }
  },
  { 
    letter: 'Ю', 
    transcription: 'yu', 
    turkish: 'YU', 
    sound: '/ju/',
    level: 6,
    confusionLevel: 'none',
    looksLike: null,
    example: { word: 'Юг', meaning: 'Güney', transcription: 'yug' }
  },
  { 
    letter: 'Я', 
    transcription: 'ya', 
    turkish: 'YA', 
    sound: '/ja/',
    level: 6,
    confusionLevel: 'medium',
    looksLike: 'R (ters)',
    warning: 'Ters R gibi görünür!',
    example: { word: 'Яблоко', meaning: 'Elma', transcription: 'yabloko' }
  }
]

// Confusion sets for focused training
export const confusionSets = {
  critical: [
    {
      russian: 'В',
      looksLike: 'B',
      actualSound: 'V',
      confusedSound: 'B',
      tip: 'В = Voda (su), B sesi değil V sesi!'
    },
    {
      russian: 'Р',
      looksLike: 'P',
      actualSound: 'R',
      confusedSound: 'P',
      tip: 'Р = Ruka (el), P sesi değil R sesi!'
    },
    {
      russian: 'Н',
      looksLike: 'H',
      actualSound: 'N',
      confusedSound: 'H',
      tip: 'Н = Nos (burun), H sesi değil N sesi!'
    }
  ],
  high: [
    {
      russian: 'С',
      looksLike: 'C',
      actualSound: 'S',
      confusedSound: 'C/K',
      tip: 'С = Sok (meyve suyu), C sesi değil S sesi!'
    },
    {
      russian: 'У',
      looksLike: 'Y',
      actualSound: 'U',
      confusedSound: 'Y',
      tip: 'У = Utro (sabah), Y sesi değil U sesi!'
    },
    {
      russian: 'Х',
      looksLike: 'X',
      actualSound: 'Kh (H)',
      confusedSound: 'X/KS',
      tip: 'Х = Khleb (ekmek), X sesi değil gırtlak H sesi!'
    }
  ],
  medium: [
    {
      russian: 'Е',
      looksLike: 'E',
      actualSound: 'YE',
      confusedSound: 'E',
      tip: 'Е = Yel (yedi), sade E değil YE sesi!'
    },
    {
      russian: 'Я',
      looksLike: 'R (ters)',
      actualSound: 'YA',
      confusedSound: 'R',
      tip: 'Я = Yabloko (elma), R değil YA sesi!'
    }
  ]
}

// Get letters by level
export const getLettersByLevel = (level) => alphabet.filter(l => l.level === level)

// Get critical confusion letters
export const getCriticalConfusions = () => alphabet.filter(l => l.confusionLevel === 'critical')

// Get all confusion letters
export const getAllConfusions = () => alphabet.filter(l => 
  l.confusionLevel === 'critical' || 
  l.confusionLevel === 'high' || 
  l.confusionLevel === 'medium'
)
