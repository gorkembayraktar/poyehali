// Stories Data Configuration
// Defines interactive dialogues with gender-specific audio and sequential unlocking

export const stories = [
  // Group: İlk Adımlar (Getting Started)
  {
    id: 'meeting',
    category: 'İlk Adımlar',
    title: 'İlk Tanışma',
    description: 'Dimitry ve Natasha tanışıyor.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    icon: 'handshake',
    xpReward: 50,
    requires: null,
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Привет! Как тебя зовут?', 
        translation: 'Merhaba! Senin adın ne?', 
        gender: 'male',
        words: [
          { ru: 'Привет!', tr: 'Merhaba!' },
          { ru: 'Как', tr: 'Nasıl' },
          { ru: 'тебя', tr: 'seni/senin' },
          { ru: 'зовут?', tr: 'çağırırlar? (adın ne?)' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Привет! Меня зовут Наташа. А тебя?', 
        translation: 'Merhaba! Benim adım Natasha. Ya senin?', 
        gender: 'female',
        words: [
          { ru: 'Привет!', tr: 'Merhaba!' },
          { ru: 'Меня', tr: 'beni/benim' },
          { ru: 'зовут', tr: 'çağırırlar' },
          { ru: 'Наташа.', tr: 'Natasha.' },
          { ru: 'А', tr: 'Ya / ise' },
          { ru: 'тебя?', tr: 'seni? (ya sen?)' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Меня зовут Димитрий. Очень приятно.', 
        translation: 'Benim adım Dimitry. Memnun oldum.', 
        gender: 'male',
        words: [
          { ru: 'Меня', tr: 'beni/benim' },
          { ru: 'зовут', tr: 'çağırırlar' },
          { ru: 'Димитрий.', tr: 'Dimitry.' },
          { ru: 'Очень', tr: 'Çok' },
          { ru: 'приятно.', tr: 'memnun edici.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Мне тоже очень приятно.', 
        translation: 'Ben de memnun oldum.', 
        gender: 'female',
        words: [
          { ru: 'Мне', tr: 'Bana' },
          { ru: 'тоже', tr: 'de/da' },
          { ru: 'очень', tr: 'çok' },
          { ru: 'приятно.', tr: 'memnun edici.' }
        ]
      }
    ]
  },
  {
    id: 'nationality',
    category: 'İlk Adımlar',
    title: 'Nerelisin?',
    description: 'Dimitry ve Natasha nereli olduklarını konuşuyorlar.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    icon: 'map',
    xpReward: 50,
    requires: { storyId: 'meeting' },
    dialogue: [
      { 
        speaker: 'Natasha', 
        text: 'Димитрий, откуда ты?', 
        translation: 'Dimitry, nerelisin?', 
        gender: 'female',
        words: [
          { ru: 'Димитрий,', tr: 'Dimitry,' },
          { ru: 'откуда', tr: 'nereden' },
          { ru: 'ты?', tr: 'sen?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Я из России. Я из Москвы. А ты?', 
        translation: 'Ben Rusya\'danım. Moskova\'dan. Ya sen?', 
        gender: 'male',
        words: [
          { ru: 'Я', tr: 'Ben' },
          { ru: 'из', tr: '-den/dan' },
          { ru: 'России.', tr: 'Rusya.' },
          { ru: 'Москвы.', tr: 'Moskova.' },
          { ru: 'А', tr: 'Ya' },
          { ru: 'ты?', tr: 'sen?' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Я из Турции. Я из Стамбула.', 
        translation: 'Ben Türkiye\'denim. İstanbul\'dan.', 
        gender: 'female',
        words: [
          { ru: 'Я', tr: 'Ben' },
          { ru: 'из', tr: '-den/dan' },
          { ru: 'Турции.', tr: 'Türkiye.' },
          { ru: 'Стамбула.', tr: 'İstanbul.' }
        ]
      }
    ]
  },
  {
    id: 'phone_exchange',
    category: 'İlk Adımlar',
    title: 'Numara Alışverişi',
    description: 'Telefon numarası ve veda.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    icon: 'handshake',
    xpReward: 50,
    requires: { storyId: 'nationality' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Наташа, какой твой номер?', 
        translation: 'Natasha, telefon numaran ne?', 
        gender: 'male',
        words: [
          { ru: 'Наташа,', tr: 'Natasha,' },
          { ru: 'какой', tr: 'hangisi/ne' },
          { ru: 'твой', tr: 'senin' },
          { ru: 'номер?', tr: 'numaran?' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Мой номер: ноль, пять, три...', 
        translation: 'Numaram: sıfır, beş, üç...', 
        gender: 'female',
        words: [
          { ru: 'Мой', tr: 'Benim' },
          { ru: 'номер:', tr: 'numaram:' },
          { ru: 'ноль,', tr: 'sıfır,' },
          { ru: 'пять,', tr: 'beş,' },
          { ru: 'три...', tr: 'üç...' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Спасибо. До свидания!', 
        translation: 'Teşekkürler. Görüşmek üzere!', 
        gender: 'male',
        words: [
          { ru: 'Спасибо.', tr: 'Teşekkürler.' },
          { ru: 'До', tr: 'kadar (e/a)' },
          { ru: 'свидания!', tr: 'buluşma! (görüşmek üzere!)' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'До свидания!', 
        translation: 'Görüşmek üzere!', 
        gender: 'female',
        words: [
          { ru: 'До', tr: 'kadar (e/a)' },
          { ru: 'свидания!', tr: 'buluşma! (görüşmek üzere!)' }
        ]
      }
    ]
  },
  {
    id: 'weekend_plan',
    category: 'İlk Adımlar',
    title: 'Hafta Sonu Planı',
    description: 'Dimitry ve Natasha hafta sonu için plan yapıyorlar.',
    difficulty: 'Orta',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    icon: 'coffee',
    xpReward: 100,
    requires: { storyId: 'phone_exchange' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Алло! Привет, Наташа!', 
        translation: 'Alo! Merhaba Natasha!', 
        gender: 'male',
        words: [
          { ru: 'Алло!', tr: 'Alo!' },
          { ru: 'Привет,', tr: 'Merhaba,' },
          { ru: 'Наташа!', tr: 'Natasha!' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Привет, Димитрий! Как дела? Что ты делаешь?', 
        translation: 'Merhaba Dimitry! Nasıl gidiyor? Ne yapıyorsun?', 
        gender: 'female',
        words: [
          { ru: 'Привет,', tr: 'Merhaba,' },
          { ru: 'Димитрий!', tr: 'Dimitry!' },
          { ru: 'Как', tr: 'Nasıl' },
          { ru: 'дела?', tr: 'işler? (nasılsın?)' },
          { ru: 'Что', tr: 'Ne' },
          { ru: 'ты', tr: 'sen' },
          { ru: 'делаешь?', tr: 'yapıyorsun?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Все хорошо. Сейчас я читаю книгу в парке.', 
        translation: 'Her şey yolunda. Şu an parkta kitap okuyorum.', 
        gender: 'male',
        words: [
          { ru: 'Все', tr: 'Her şey' },
          { ru: 'хорошо.', tr: 'iyi.' },
          { ru: 'Сейчас', tr: 'Şimdi' },
          { ru: 'я', tr: 'ben' },
          { ru: 'читаю', tr: 'okuyorum' },
          { ru: 'книгу', tr: 'kitap' },
          { ru: 'в', tr: 'içinde (-de)' },
          { ru: 'парке.', tr: 'park.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Там хорошая погода?', 
        translation: 'Orada hava iyi mi?', 
        gender: 'female',
        words: [
          { ru: 'Там', tr: 'Orada' },
          { ru: 'хорошая', tr: 'iyi (dişil)' },
          { ru: 'погода?', tr: 'hava?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Да, сегодня очень тепло и солнечно.', 
        translation: 'Evet, bugün çok sıcak ve güneşli.', 
        gender: 'male',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'сегодня', tr: 'bugün' },
          { ru: 'очень', tr: 'çok' },
          { ru: 'тепло', tr: 'sıcak' },
          { ru: 'и', tr: 've' },
          { ru: 'солнечно.', tr: 'güneşli.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'У меня есть идея. Давай встретимся в субботу?', 
        translation: 'Bir fikrim var. Hayadi cumartesi buluşalım mı?', 
        gender: 'female',
        words: [
          { ru: 'У', tr: 'Yanında' },
          { ru: 'меня', tr: 'ben' },
          { ru: 'есть', tr: 'var' },
          { ru: 'идея.', tr: 'fikir.' },
          { ru: 'Давай', tr: 'Hadi' },
          { ru: 'встретимся', tr: 'buluşalım' },
          { ru: 'в', tr: 'içinde (-de)' },
          { ru: 'субботу?', tr: 'Cumartesi?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Отличная идея! Во сколько?', 
        translation: 'Harika fikir! Saat kaçta?', 
        gender: 'male',
        words: [
          { ru: 'Отличная', tr: 'Harika (dişil)' },
          { ru: 'идея!', tr: 'fikir!' },
          { ru: 'Во', tr: 'içinde (-de)' },
          { ru: 'сколько?', tr: 'kaç?' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'В два часа дня. Ты любишь русский ресторан?', 
        translation: 'Öğleden sonra saat ikide. Rus restoranını sever misin?', 
        gender: 'female',
        words: [
          { ru: 'В', tr: 'Saat' },
          { ru: 'два', tr: 'iki' },
          { ru: 'часа', tr: 'saatte' },
          { ru: 'дня.', tr: 'gün (öğle).' },
          { ru: 'Ты', tr: 'Sen' },
          { ru: 'любишь', tr: 'seviyorsun' },
          { ru: 'русский', tr: 'Rus' },
          { ru: 'ресторан?', tr: 'restoran?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Да, очень люблю борщ и пирожки!', 
        translation: 'Evet, borş ve pirojkiyi çok severim!', 
        gender: 'male',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'очень', tr: 'çok' },
          { ru: 'люблю', tr: 'seviyorum' },
          { ru: 'борщ', tr: 'borş' },
          { ru: 'и', tr: 've' },
          { ru: 'пирожки!', tr: 'pirojki!' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Тогда до субботы! Пока!', 
        translation: 'O zaman cumartesiye kadar (görüşürüz)! Hoşça kal!', 
        gender: 'female',
        words: [
          { ru: 'Тогда', tr: 'O zaman' },
          { ru: 'до', tr: 'kadar (-e)' },
          { ru: 'субботы!', tr: 'Cumartesi!' },
          { ru: 'Пока!', tr: 'Hoşça kal!' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Пока, Наташа!', 
        translation: 'Hoşça kal Natasha!', 
        gender: 'male',
        words: [
          { ru: 'Пока,', tr: 'Hoşça kal,' },
          { ru: 'Наташа!', tr: 'Natasha!' }
        ]
      }
    ]
  },
  {
    id: 'cafe',
    category: 'Günlük Yaşam',
    title: 'Kafede',
    description: 'Kahve ve su siparişi.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Garson', gender: 'female', avatar: 'woman_apron' },
    icon: 'coffee',
    xpReward: 60,
    requires: { storyId: 'weekend_plan' },
    dialogue: [
      { 
        speaker: 'Garson', 
        text: 'Здравствуйте! Что вы хотите?', 
        translation: 'Merhaba! Ne istersiniz?', 
        gender: 'female',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba! (Resmi)' },
          { ru: 'Что', tr: 'Ne' },
          { ru: 'вы', tr: 'siz' },
          { ru: 'хотите?', tr: 'istiyorsunuz?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Здравствуйте! Можно кофе, пожалуйста?', 
        translation: 'Merhaba! Kahve alabilir miyim lütfen?', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba! (Resmi)' },
          { ru: 'Можно', tr: 'Mümkün mü / ...alabilir miyim' },
          { ru: 'кофе,', tr: 'kahve,' },
          { ru: 'пожалуйста?', tr: 'lütfen?' }
        ]
      },
      { 
        speaker: 'Garson', 
        text: 'Конечно. С молоком или сахаром?', 
        translation: 'Tabii ki. Sütlü mü yoksa şekerli mi?', 
        gender: 'female',
        words: [
          { ru: 'Конечно.', tr: 'Tabii ki.' },
          { ru: 'С', tr: 'ile' },
          { ru: 'молоком', tr: 'süt' },
          { ru: 'или', tr: 'veya' },
          { ru: 'сахаром?', tr: 'şeker?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Без сахара, но с молоком. И одну воду, пожалуйста.', 
        translation: 'Şekersiz ama sütlü. Ve bir su lütfen.', 
        gender: 'male',
        words: [
          { ru: 'Без', tr: '...sız/siz' },
          { ru: 'сахара,', tr: 'şeker,' },
          { ru: 'но', tr: 'ama' },
          { ru: 'с', tr: 'ile' },
          { ru: 'молоком.', tr: 'süt.' },
          { ru: 'И', tr: 'Ve' },
          { ru: 'одну', tr: 'bir (tane)' },
          { ru: 'воду,', tr: 'su,' },
          { ru: 'пожалуйста.', tr: 'lütfen.' }
        ]
      },
      { 
        speaker: 'Garson', 
        text: 'Хорошо. Минутку.', 
        translation: 'Tamam. Bir dakika.', 
        gender: 'female',
        words: [
          { ru: 'Хорошо.', tr: 'Tamam / İyi.' },
          { ru: 'Минутку.', tr: 'Bir dakikacık.' }
        ]
      }
    ]
  },
  {
    id: 'morning_routine',
    category: 'Günlük Yaşam',
    title: 'Sabah Rutini',
    description: 'Evde kahvaltı ve hazırlık.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    characterB: { name: 'Anne', gender: 'female', avatar: 'woman_casual' },
    icon: 'coffee',
    xpReward: 50,
    requires: { storyId: 'cafe' },
    dialogue: [
      { 
        speaker: 'Natasha', 
        text: 'Доброе утро, мама! Что у нас на завтрак?', 
        translation: 'Günaydın anne! Kahvaltıda neyimiz var?', 
        gender: 'female',
        words: [
          { ru: 'Доброе', tr: 'İyi' },
          { ru: 'утро,', tr: 'sabah,' },
          { ru: 'мама!', tr: 'anne!' },
          { ru: 'Что', tr: 'Ne' },
          { ru: 'у', tr: 'yanında' },
          { ru: 'нас', tr: 'biz' },
          { ru: 'на', tr: '-de/da' },
          { ru: 'завтрак?', tr: 'kahvaltı?' }
        ]
      },
      { 
        speaker: 'Anne', 
        text: 'Доброе утро! У нас есть блины и чай.', 
        translation: 'Günaydın! Blini (Rus krebi) ve çayımız var.', 
        gender: 'female',
        words: [
          { ru: 'Доброе', tr: 'İyi' },
          { ru: 'утро!', tr: 'sabah!' },
          { ru: 'У', tr: 'Yanında' },
          { ru: 'нас', tr: 'biz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'блины', tr: 'blini' },
          { ru: 'и', tr: 've' },
          { ru: 'чай.', tr: 'çay.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'О, я люблю блины! А кофе есть?', 
        translation: 'O, bliniyi severim! Peki kahve var mı?', 
        gender: 'female',
        words: [
          { ru: 'О,', tr: 'O,' },
          { ru: 'я', tr: 'ben' },
          { ru: 'люблю', tr: 'seviyorum' },
          { ru: 'блины!', tr: 'blini!' },
          { ru: 'А', tr: 'Peki' },
          { ru: 'кофе', tr: 'kahve' },
          { ru: 'есть?', tr: 'var mı?' }
        ]
      },
      { 
        speaker: 'Anne', 
        text: 'Да, кофе на столе. Приятного аппетита!', 
        translation: 'Evet, kahve masada. Afiyet olsun!', 
        gender: 'female',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'кофе', tr: 'kahve' },
          { ru: 'на', tr: 'üstünde' },
          { ru: 'столе.', tr: 'masa.' },
          { ru: 'Приятного', tr: 'Keyifli' },
          { ru: 'аппетита!', tr: 'iştah! (afiyet olsun!)' }
        ]
      }
    ]
  },
  {
    id: 'library',
    category: 'Günlük Yaşam',
    title: 'Kütüphanede',
    description: 'Kitap arama ve kütüphaneci ile konuşma.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Kütüphaneci', gender: 'female', avatar: 'woman_suit' },
    icon: 'book',
    xpReward: 50,
    requires: { storyId: 'morning_routine' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Здравствуйте. Где я могу найти книги об истории?', 
        translation: 'Merhaba. Tarih hakkındaki kitapları nerede bulabilirim?', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте.', tr: 'Merhaba.' },
          { ru: 'Где', tr: 'Nerede' },
          { ru: 'я', tr: 'ben' },
          { ru: 'могу', tr: 'yapabilirim' },
          { ru: 'найти', tr: 'bulmak' },
          { ru: 'книги', tr: 'kitaplar' },
          { ru: 'об', tr: 'hakkında' },
          { ru: 'истории?', tr: 'tarih?' }
        ]
      },
      { 
        speaker: 'Kütüphaneci', 
        text: 'Здравствуйте! Они в зале номер пять.', 
        translation: 'Merhaba! Onlar beş numaralı salonda.', 
        gender: 'female',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba!' },
          { ru: 'Они', tr: 'Onlar' },
          { ru: 'в', tr: 'içinde (-de)' },
          { ru: 'зале', tr: 'salon' },
          { ru: 'номер', tr: 'numara' },
          { ru: 'пять.', tr: 'beş.' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Спасибо. А можно взять эту книгу домой?', 
        translation: 'Teşekkürler. Peki bu kitabı eve götürebilir miyim?', 
        gender: 'male',
        words: [
          { ru: 'Спасибо.', tr: 'Teşekkürler.' },
          { ru: 'А', tr: 'Peki' },
          { ru: 'можно', tr: 'mümkün mü' },
          { ru: 'взять', tr: 'almak' },
          { ru: 'эту', tr: 'bu (dişil)' },
          { ru: 'книгу', tr: 'kitap' },
          { ru: 'домой?', tr: 'eve?' }
        ]
      },
      { 
        speaker: 'Kütüphaneci', 
        text: 'Да, конечно. Тише, пожалуйста.', 
        translation: 'Evet, tabii ki. Sessiz olun lütfen.', 
        gender: 'female',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'конечно.', tr: 'tabii ki.' },
          { ru: 'Тише,', tr: 'Daha sessiz,' },
          { ru: 'пожалуйста.', tr: 'lütfen.' }
        ]
      }
    ]
  },
  {
    id: 'doctor',
    category: 'Günlük Yaşam',
    title: 'Doktor Randevusu',
    description: 'Basit bir muayene.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Hasta', gender: 'male', avatar: 'man_casual' },
    characterB: { name: 'Doktor', gender: 'female', avatar: 'woman_suit' },
    icon: 'heart',
    xpReward: 60,
    requires: { storyId: 'library' },
    dialogue: [
      { 
        speaker: 'Doktor', 
        text: 'Здравствуйте! Что у вас болит?', 
        translation: 'Merhaba! Nereniz ağrıyor?', 
        gender: 'female',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba!' },
          { ru: 'Что', tr: 'Ne' },
          { ru: 'у', tr: 'yanında' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'болит?', tr: 'ağrıyor?' }
        ]
      },
      { 
        speaker: 'Hasta', 
        text: 'Здравствуйте, доктор. У меня болит голова.', 
        translation: 'Merhaba doktor. Başım ağrıyor.', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте,', tr: 'Merhaba,' },
          { ru: 'доктор.', tr: 'doktor.' },
          { ru: 'У', tr: 'Yanında' },
          { ru: 'меня', tr: 'ben' },
          { ru: 'болит', tr: 'ağrıyor' },
          { ru: 'голова.', tr: 'kafa (baş).' }
        ]
      },
      { 
        speaker: 'Doktor', 
        text: 'У вас есть температура?', 
        translation: 'Ateşiniz var mı?', 
        gender: 'female',
        words: [
          { ru: 'У', tr: 'Yanında' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'температура?', tr: 'ateş (sıcaklık)?' }
        ]
      },
      { 
        speaker: 'Hasta', 
        text: 'Нет, температуры нет.', 
        translation: 'Hayır, ateşim yok.', 
        gender: 'male',
        words: [
          { ru: 'Нет,', tr: 'Hayır,' },
          { ru: 'температуры', tr: 'ateş' },
          { ru: 'нет.', tr: 'yok.' }
        ]
      },
      { 
        speaker: 'Doktor', 
        text: 'Хорошо. Пейте воду и отдыхайте.', 
        translation: 'Tamam. Su için ve dinlenin.', 
        gender: 'female',
        words: [
          { ru: 'Хорошо.', tr: 'Tamam.' },
          { ru: 'Пейте', tr: 'İçin' },
          { ru: 'воду', tr: 'su' },
          { ru: 'и', tr: 've' },
          { ru: 'отдыхайте.', tr: 'dinlenin.' }
        ]
      }
    ]
  },
  {
    id: 'metro',
    category: 'Şehir & Ulaşım',
    title: 'Yol Sorma',
    description: 'Metro istasyonunu bulma.',
    difficulty: 'Kolay',
    characterA: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    characterB: { name: 'Yolcu', gender: 'male', avatar: 'man_casual' },
    icon: 'map',
    xpReward: 70,
    requires: { storyId: 'doctor' },
    dialogue: [
      { 
        speaker: 'Natasha', 
        text: 'Извините, где метро?', 
        translation: 'Affedersiniz, metro nerede?', 
        gender: 'female',
        words: [
          { ru: 'Извините,', tr: 'Affedersiniz,' },
          { ru: 'где', tr: 'nerede' },
          { ru: 'метро?', tr: 'metro?' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Метро там, прямо и направо.', 
        translation: 'Metro orada, düz ve sağda.', 
        gender: 'male',
        words: [
          { ru: 'Метро', tr: 'Metro' },
          { ru: 'там,', tr: 'orada,' },
          { ru: 'прямо', tr: 'düz' },
          { ru: 'и', tr: 've' },
          { ru: 'направо.', tr: 'sağda.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Это далеко?', 
        translation: 'Uzak mı?', 
        gender: 'female',
        words: [
          { ru: 'Это', tr: 'Bu' },
          { ru: 'далеко?', tr: 'uzak mı?' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Нет, это очень близко. Пять минут.', 
        translation: 'Hayır, çok yakın. Beş dakika.', 
        gender: 'male',
        words: [
          { ru: 'Нет,', tr: 'Hayır,' },
          { ru: 'это', tr: 'bu' },
          { ru: 'очень', tr: 'çok' },
          { ru: 'близко.', tr: 'yakın.' },
          { ru: 'Пять', tr: 'Beş' },
          { ru: 'минут.', tr: 'dakika.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Спасибо большое!', 
        translation: 'Çok teşekkürler!', 
        gender: 'female',
        words: [
          { ru: 'Спасибо', tr: 'Teşekkürler' },
          { ru: 'большое!', tr: 'büyük!' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Пожалуйста!', 
        translation: 'Rica ederim!', 
        gender: 'male',
        words: [
          { ru: 'Пожалуйста!', tr: 'Rica ederim! / Lütfen!' }
        ]
      }
    ]
  },
  {
    id: 'bus_stop',
    category: 'Şehir & Ulaşım',
    title: 'Otobüs Durağı',
    description: 'Otobüs bekleme ve bilgi alma.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Yolcu', gender: 'female', avatar: 'woman_casual' },
    icon: 'bus',
    xpReward: 50,
    requires: { storyId: 'metro' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Извините, какой автобус идет в центр?', 
        translation: 'Affedersiniz, merkeze hangi otobüs gider?', 
        gender: 'male',
        words: [
          { ru: 'Извините,', tr: 'Affedersiniz,' },
          { ru: 'какой', tr: 'hangi' },
          { ru: 'автобус', tr: 'otobüs' },
          { ru: 'идет', tr: 'gider' },
          { ru: 'в', tr: 'içine' },
          { ru: 'центр?', tr: 'merkez?' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Номера десять и пятнадцать. Десятый уже здесь!', 
        translation: 'On ve on beş numaralar. Onuncu zaten burada!', 
        gender: 'female',
        words: [
          { ru: 'Номера', tr: 'Numaralar' },
          { ru: 'десять', tr: 'on' },
          { ru: 'и', tr: 've' },
          { ru: 'пятнадцать.', tr: 'on beş.' },
          { ru: 'Десятый', tr: 'Onuncu' },
          { ru: 'уже', tr: 'zaten' },
          { ru: 'здесь!', tr: 'burada!' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Спасибо! Билет можно купить у водителя?', 
        translation: 'Teşekkürler! Bilet şoförden alınabilir mi?', 
        gender: 'male',
        words: [
          { ru: 'Спасибо!', tr: 'Teşekkürler!' },
          { ru: 'Билет', tr: 'Bilet' },
          { ru: 'можно', tr: 'mümkün mü' },
          { ru: 'купить', tr: 'satın almak' },
          { ru: 'у', tr: 'yanında' },
          { ru: 'водителя?', tr: 'şoför?' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Да, можно. Поторопитесь!', 
        translation: 'Evet, alınabilir. Acele edin!', 
        gender: 'female',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'можно.', tr: 'mümkün.' },
          { ru: 'Поторопитесь!', tr: 'Acele edin!' }
        ]
      }
    ]
  },
  {
    id: 'taxi',
    category: 'Şehir & Ulaşım',
    title: 'Takside',
    description: 'Adres verme ve fiyat sorma.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    characterB: { name: 'Taksici', gender: 'male', avatar: 'man_suit' },
    icon: 'taxi',
    xpReward: 60,
    requires: { storyId: 'bus_stop' },
    dialogue: [
      { 
        speaker: 'Natasha', 
        text: 'Здравствуйте! Пожалуйста, на улицу Арбат.', 
        translation: 'Merhaba! Lütfen Arbat caddesine (gidelim).', 
        gender: 'female',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba!' },
          { ru: 'Пожалуйста,', tr: 'Lütfen,' },
          { ru: 'na', tr: '-e/a' },
          { ru: 'улицу', tr: 'cadde' },
          { ru: 'Арбат.', tr: 'Arbat.' }
        ]
      },
      { 
        speaker: 'Taksici', 
        text: 'Хорошо. Едем. Здесь пробки, будет медленно.', 
        translation: 'Tamam. Gidiyoruz. Burada trafik var, yavaş olacak.', 
        gender: 'male',
        words: [
          { ru: 'Хорошо.', tr: 'Tamam.' },
          { ru: 'Едем.', tr: 'Gidiyoruz.' },
          { ru: 'Здесь', tr: 'Burada' },
          { ru: 'пробки,', tr: 'trafik sıkışıklığı,' },
          { ru: 'будет', tr: 'olacak' },
          { ru: 'медленно.', tr: 'yavaş.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Ничего страшного. Сколько стоит поездка?', 
        translation: 'Önemli değil. Yolculuk ne kadar tutar?', 
        gender: 'female',
        words: [
          { ru: 'Ничего', tr: 'Hiçbir şey' },
          { ru: 'страшного.', tr: 'korkunç (önemli değil).' },
          { ru: 'Сколько', tr: 'Kaç' },
          { ru: 'стоит', tr: 'tutar (eder)' },
          { ru: 'поездка?', tr: 'yolculuk?' }
        ]
      },
      { 
        speaker: 'Taksici', 
        text: 'Пятьсот рублей. Мы приехали!', 
        translation: 'Beş yüz ruble. Geldik!', 
        gender: 'male',
        words: [
          { ru: 'Пятьсот', tr: 'Beş yüz' },
          { ru: 'рублей.', tr: 'ruble.' },
          { ru: 'Мы', tr: 'Biz' },
          { ru: 'приехали!', tr: 'geldik!' }
        ]
      }
    ]
  },
  {
    id: 'airport',
    category: 'Şehir & Ulaşım',
    title: 'Havaalanında',
    description: 'Bavul ve uçuş kontrolü.',
    difficulty: 'Kolay',
    characterA: { name: 'Yolcu', gender: 'male', avatar: 'man_casual' },
    characterB: { name: 'Görevli', gender: 'female', avatar: 'woman_suit' },
    icon: 'airplane',
    xpReward: 70,
    requires: { storyId: 'taxi' },
    dialogue: [
      { 
        speaker: 'Görevli', 
        text: 'Ваш паспорт и билет, пожалуйста.', 
        translation: 'Pasaportunuz ve biletiniz lütfen.', 
        gender: 'female',
        words: [
          { ru: 'Ваш', tr: 'Sizin' },
          { ru: 'паспорт', tr: 'pasaport' },
          { ru: 'и', tr: 've' },
          { ru: 'билет,', tr: 'bilet,' },
          { ru: 'пожалуйста.', tr: 'lütfen.' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Вот, пожалуйста. Где мой чемодан?', 
        translation: 'İşte buyurun. Bavulum nerede?', 
        gender: 'male',
        words: [
          { ru: 'Вот,', tr: 'İşte/Buyurun,' },
          { ru: 'пожалуйста.', tr: 'lütfen.' },
          { ru: 'Где', tr: 'Nerede' },
          { ru: 'мой', tr: 'benim' },
          { ru: 'чемодан?', tr: 'bavul?' }
        ]
      },
      { 
        speaker: 'Görevli', 
        text: 'Сначала регистрация. У вас есть тяжелые вещи?', 
        translation: 'Önce kayıt. Ağır eşyalarınız var mı?', 
        gender: 'female',
        words: [
          { ru: 'Сначала', tr: 'Önce' },
          { ru: 'регистрация.', tr: 'kayıt/check-in.' },
          { ru: 'У', tr: 'Yanında' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'тяжелые', tr: 'ağır' },
          { ru: 'вещи?', tr: 'eşyalar?' }
        ]
      },
      { 
        speaker: 'Yolcu', 
        text: 'Нет, только эта сумка. Какой выход на посадку?', 
        translation: 'Hayır, sadece bu çanta. Uçağa biniş kapısı hangisi?', 
        gender: 'male',
        words: [
          { ru: 'Нет,', tr: 'Hayır,' },
          { ru: 'только', tr: 'sadece' },
          { ru: 'эта', tr: 'bu' },
          { ru: 'сумка.', tr: 'çanta.' },
          { ru: 'Какой', tr: 'Hangi' },
          { ru: 'выход', tr: 'çıkış' },
          { ru: 'на', tr: '-e/a' },
          { ru: 'посадку?', tr: 'biniş?' }
        ]
      },
      { 
        speaker: 'Görevli', 
        text: 'Выход номер двенадцать. Хорошего полета!', 
        translation: 'On iki numaralı kapı. İyi uçuşlar!', 
        gender: 'female',
        words: [
          { ru: 'Выход', tr: 'Çıkış' },
          { ru: 'номер', tr: 'numara' },
          { ru: 'двенадцать.', tr: 'on iki.' },
          { ru: 'Хорошего', tr: 'İyi' },
          { ru: 'полета!', tr: 'uçuş!' }
        ]
      }
    ]
  },
  {
    id: 'grocery',
    category: 'Alışveriş',
    title: 'Market Alışverişi',
    description: 'Ekmek ve süt alma.',
    difficulty: 'Kolay',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Kasiyer', gender: 'female', avatar: 'woman_casual' },
    icon: 'cart',
    xpReward: 80,
    requires: { storyId: 'airport' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Здравствуйте! У вас есть хлеб?', 
        translation: 'Merhaba! Ekmeğiniz var mı?', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba! (Resmi)' },
          { ru: 'У', tr: 'Yanında / -de' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'хлеб?', tr: 'ekmek?' }
        ]
      },
      { 
        speaker: 'Kasiyer', 
        text: 'Да, конечно. Свежий хлеб здесь.', 
        translation: 'Evet, tabii ki. Taze ekmek burada.', 
        gender: 'female',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'конечно.', tr: 'tabii ki.' },
          { ru: 'Свежий', tr: 'Taze' },
          { ru: 'хлеб', tr: 'ekmek' },
          { ru: 'здесь.', tr: 'burada.' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Хорошо. Дайте мне один хлеб и молоко.', 
        translation: 'Tamam. Bana bir ekmek ve süt verin.', 
        gender: 'male',
        words: [
          { ru: 'Хорошо.', tr: 'Tamam.' },
          { ru: 'Дайте', tr: 'Verin' },
          { ru: 'мне', tr: 'bana' },
          { ru: 'один', tr: 'bir' },
          { ru: 'хлеб', tr: 'ekmek' },
          { ru: 'и', tr: 've' },
          { ru: 'молоко.', tr: 'süt.' }
        ]
      },
      { 
        speaker: 'Kasiyer', 
        text: 'Это все?', 
        translation: 'Hepsi bu mu?', 
        gender: 'female',
        words: [
          { ru: 'Это', tr: 'Bu' },
          { ru: 'все?', tr: 'hepsi?' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Да, спасибо.', 
        translation: 'Evet, teşekkürler.', 
        gender: 'male',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'спасибо.', tr: 'teşekkürler.' }
        ]
      }
    ]
  },
  {
    id: 'clothing_store',
    category: 'Alışveriş',
    title: 'Giyim Mağazası',
    description: 'Yeni bir tişört bakma.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    characterB: { name: 'Satıcı', gender: 'male', avatar: 'man_suit' },
    icon: 'bag',
    xpReward: 60,
    requires: { storyId: 'grocery' },
    dialogue: [
      { 
        speaker: 'Satıcı', 
        text: 'Здравствуйте! Чем я могу вам помочь?', 
        translation: 'Merhaba! Size nasıl yardımcı olabilirim?', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba!' },
          { ru: 'Чем', tr: 'Bununla (nasıl)' },
          { ru: 'я', tr: 'ben' },
          { ru: 'могу', tr: 'yapabilirim' },
          { ru: 'вам', tr: 'size' },
          { ru: 'помочь?', tr: 'yardım etmek?' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Привет! Мне нужна эта футболка. У вас есть размер М?', 
        translation: 'Merhaba! Bu tişörte ihtiyacım var. M bedeniniz var mı?', 
        gender: 'female',
        words: [
          { ru: 'Привет!', tr: 'Merhaba!' },
          { ru: 'Мне', tr: 'Bana' },
          { ru: 'нужна', tr: 'lazım' },
          { ru: 'эта', tr: 'bu' },
          { ru: 'футболка.', tr: 'tişört.' },
          { ru: 'У', tr: 'Yanında' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'размер', tr: 'beden/boyut' },
          { ru: 'М?', tr: 'M?' }
        ]
      },
      { 
        speaker: 'Satıcı', 
        text: 'Да, одну минуту. Вот этот размер. Хотите примерить?', 
        translation: 'Evet, bir dakika. İşte bu beden. Denemek ister misiniz?', 
        gender: 'male',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'одну', tr: 'bir' },
          { ru: 'минуту.', tr: 'dakika.' },
          { ru: 'Вот', tr: 'İşte' },
          { ru: 'этот', tr: 'bu' },
          { ru: 'размер.', tr: 'beden.' },
          { ru: 'Хотите', tr: 'İster misiniz' },
          { ru: 'примерить?', tr: 'denemek?' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Да, где здесь зеркало?', 
        translation: 'Evet, burada ayna nerede?', 
        gender: 'female',
        words: [
          { ru: 'Да,', tr: 'Evet,' },
          { ru: 'где', tr: 'nerede' },
          { ru: 'здесь', tr: 'burada' },
          { ru: 'зеркало?', tr: 'ayna?' }
        ]
      }
    ]
  },
  {
    id: 'market',
    category: 'Alışveriş',
    title: 'Pazarda',
    description: 'Taze meyve ve sebze pazarlığı.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Dimitry', gender: 'male', avatar: 'man_suit' },
    characterB: { name: 'Pazarcı', gender: 'male', avatar: 'man_suit' },
    icon: 'cart',
    xpReward: 50,
    requires: { storyId: 'clothing_store' },
    dialogue: [
      { 
        speaker: 'Dimitry', 
        text: 'Здравствуйте. Сколько стоят эти яблоки?', 
        translation: 'Merhaba. Bu elmalar ne kadar?', 
        gender: 'male',
        words: [
          { ru: 'Здравствуйте.', tr: 'Merhaba.' },
          { ru: 'Сколько', tr: 'Kaç' },
          { ru: 'стоят', tr: 'eder' },
          { ru: 'эти', tr: 'bu (çoğul)' },
          { ru: 'яблоки?', tr: 'elmalar?' }
        ]
      },
      { 
        speaker: 'Pazarcı', 
        text: 'Сто рублей за килограмм. Они очень сладкие!', 
        translation: 'Kilosu yüz ruble. Çok tatlılar!', 
        gender: 'male',
        words: [
          { ru: 'Сто', tr: 'Yüz' },
          { ru: 'рублей', tr: 'ruble' },
          { ru: 'за', tr: 'için' },
          { ru: 'килограмм.', tr: 'kilogram.' },
          { ru: 'Они', tr: 'Onlar' },
          { ru: 'очень', tr: 'çok' },
          { ru: 'сладкие!', tr: 'tatlılar!' }
        ]
      },
      { 
        speaker: 'Dimitry', 
        text: 'Хорошо, дайте два килограмма. И еще бананы.', 
        translation: 'Tamam, iki kilo verin. Ve bir de muz.', 
        gender: 'male',
        words: [
          { ru: 'Хорошо,', tr: 'Tamam,' },
          { ru: 'дайте', tr: 'verin' },
          { ru: 'два', tr: 'iki' },
          { ru: 'килограмма.', tr: 'kilogram.' },
          { ru: 'И', tr: 'Ve' },
          { ru: 'еще', tr: 'daha/henüz' },
          { ru: 'бананы.', tr: 'muzlar.' }
        ]
      },
      { 
        speaker: 'Pazarcı', 
        text: 'Вот ваши фрукты. С вас двести пятьдесят рублей.', 
        translation: 'İşte meyveleriniz. Borcunuz iki yüz elli ruble.', 
        gender: 'male',
        words: [
          { ru: 'Вот', tr: 'İşte' },
          { ru: 'ваши', tr: 'sizin' },
          { ru: 'фрукты.', tr: 'meyveler.' },
          { ru: 'С', tr: 'itibaren' },
          { ru: 'вас', tr: 'siz' },
          { ru: 'двести', tr: 'iki yüz' },
          { ru: 'пятьдесят', tr: 'elli' },
          { ru: 'рублей.', tr: 'ruble.' }
        ]
      }
    ]
  },
  {
    id: 'gift_shop',
    category: 'Alışveriş',
    title: 'Hediye Dükkanı',
    description: 'Arkadaş için hediyelik eşya seçme.',
    difficulty: 'Başlangıç',
    characterA: { name: 'Natasha', gender: 'female', avatar: 'woman_suit' },
    characterB: { name: 'Satıcı', gender: 'female', avatar: 'woman_suit' },
    icon: 'star',
    xpReward: 60,
    requires: { storyId: 'market' },
    dialogue: [
      { 
        speaker: 'Natasha', 
        text: 'Здравствуйте! Я ищу подарок для подруги.', 
        translation: 'Merhaba! Arkadaşım (kız) için bir hediye arıyorum.', 
        gender: 'female',
        words: [
          { ru: 'Здравствуйте!', tr: 'Merhaba!' },
          { ru: 'Я', tr: 'Ben' },
          { ru: 'ищу', tr: 'arıyorum' },
          { ru: 'подарок', tr: 'hediye' },
          { ru: 'для', tr: 'için' },
          { ru: 'подруги.', tr: 'kız arkadaş.' }
        ]
      },
      { 
        speaker: 'Satıcı', 
        text: 'У нас есть красивые матрешки и открытки.', 
        translation: 'Bizde güzel matruşkalar ve kartpostallar var.', 
        gender: 'female',
        words: [
          { ru: 'У', tr: 'Yanında' },
          { ru: 'нас', tr: 'biz' },
          { ru: 'есть', tr: 'var' },
          { ru: 'красивые', tr: 'güzel' },
          { ru: 'матрешки', tr: 'matruşkalar' },
          { ru: 'и', tr: 've' },
          { ru: 'открытки.', tr: 'kartpostallar.' }
        ]
      },
      { 
        speaker: 'Natasha', 
        text: 'Какая красивая матрешка! Сколько она стоит?', 
        translation: 'Ne kadar güzel bir matruşka! Fiyatı nedir?', 
        gender: 'female',
        words: [
          { ru: 'Какая', tr: 'Ne kadar/Nasıl' },
          { ru: 'красивая', tr: 'güzel' },
          { ru: 'матрешка!', tr: 'matruşka!' },
          { ru: 'Сколько', tr: 'Kaç/Ne kadar' },
          { ru: 'она', tr: 'o' },
          { ru: 'стоит?', tr: 'tutar?' }
        ]
      },
      { 
        speaker: 'Satıcı', 
        text: 'Восемьсот рублей. Хотите купить?', 
        translation: 'Sekiz yüz ruble. Satın almak ister misiniz?', 
        gender: 'female',
        words: [
          { ru: 'Восемьсот', tr: 'Sekiz yüz' },
          { ru: 'рублей.', tr: 'ruble.' },
          { ru: 'Хотите', tr: 'İster misiniz' },
          { ru: 'купить?', tr: 'satın almak?' }
        ]
      }
    ]
  }
]

export const getStoryById = (id) => stories.find(s => s.id === id)
