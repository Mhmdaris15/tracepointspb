// Content configuration — all user-facing strings live here for i18n.
// To switch language on the page, change locale state in LandingPage.tsx.

export type Locale = 'en' | 'ru';

export const contact = {
  email: 'muhammadaris1945@gmail.com',
  telegram: '+79810409453',
  telegramUrl: 'https://t.me/+79810409453',
  location: 'Saint Petersburg, Russia',
  locationRu: 'Санкт-Петербург, Россия',
  coords: '59°56′N · 30°18′E',
};

// ─── PROOF PHOTOS ──────────────────────────────────────────────────────────
// Catalogued field photos. Each entry references an image in /public/images
// and carries deadpan metadata used by the FieldDossier section's captions.
// `kind` lets the layout know whether a photo is a "wall" (mailbox row),
// "hand" (handheld flyer + building), or "door" (close-up entry).

export type ProofKind = 'wall' | 'hand' | 'door';
export interface ProofPhoto {
  file: string;
  kind: ProofKind;
  district: string;        // district code used in caption
  building: string;        // synthetic building/unit ref
  units: string;           // unit-range label (for wall shots)
  time: string;            // 24h timestamp
  coords: string;          // GPS coords for caption
  receipt: string;         // receipt id
}

export const proofPhotos: ProofPhoto[] = [
  // Wall shots — mailbox rows, the proof of unit-by-unit delivery
  { file: 'photo_2026-05-12_00-59-43.jpg', kind: 'wall', district: 'Tsentralny',     building: 'Б-14',  units: '350 → 367', time: '08:42', coords: '59.9341°N 30.3617°E', receipt: 'TRC-040842' },
  { file: 'photo_2026-05-12_00-59-40.jpg', kind: 'wall', district: 'Petrogradskiy',  building: 'Ж-3',   units: '022 → 036', time: '09:14', coords: '59.9619°N 30.3081°E', receipt: 'TRC-040914' },
  { file: 'photo_2026-05-12_00-59-51.jpg', kind: 'wall', district: 'Kalininskiy',    building: 'К-7',   units: '221 → 235', time: '10:05', coords: '60.0094°N 30.3925°E', receipt: 'TRC-041005' },
  { file: 'photo_2026-05-12_00-59-55.jpg', kind: 'wall', district: 'Nevskiy',        building: 'Н-12',  units: '274 → 306', time: '11:32', coords: '59.9026°N 30.4527°E', receipt: 'TRC-041132' },
  { file: 'photo_2026-05-12_00-59-58.jpg', kind: 'wall', district: 'Frunzenskiy',    building: 'Ф-21',  units: '201 → 218', time: '13:18', coords: '59.8842°N 30.3651°E', receipt: 'TRC-041318' },
  { file: 'photo_2026-05-12_00-59-44.jpg', kind: 'wall', district: 'Admiralteyskiy', building: 'А-9',   units: '085 → 102', time: '14:04', coords: '59.9272°N 30.3082°E', receipt: 'TRC-041404' },
  { file: 'photo_2026-05-12_00-59-46.jpg', kind: 'wall', district: 'Vyborgskiy',     building: 'В-6',   units: '141 → 156', time: '15:11', coords: '60.0095°N 30.3447°E', receipt: 'TRC-041511' },
  { file: 'photo_2026-05-12_00-59-48.jpg', kind: 'wall', district: 'Primorskiy',     building: 'П-18',  units: '309 → 324', time: '16:27', coords: '60.0064°N 30.2542°E', receipt: 'TRC-041627' },
  { file: 'photo_2026-05-12_00-59-52.jpg', kind: 'wall', district: 'Moskovskiy',     building: 'М-4',   units: '177 → 192', time: '17:03', coords: '59.8675°N 30.3242°E', receipt: 'TRC-041703' },
  { file: 'photo_2026-05-12_00-59-59.jpg', kind: 'wall', district: 'Kirovskiy',      building: 'И-2',   units: '044 → 058', time: '17:48', coords: '59.8786°N 30.2705°E', receipt: 'TRC-041748' },

  // Hand shots — handheld flyer + building, the proof of geographic presence
  { file: 'photo_2026-05-12_01-00-22.jpg', kind: 'hand', district: 'Krasnogvardeyskiy', building: 'KG-44', units: 'exterior', time: '09:51', coords: '59.9532°N 30.4271°E', receipt: 'TRC-040951' },
  { file: 'photo_2026-05-12_01-00-02.jpg', kind: 'hand', district: 'Vyborgskiy',        building: 'В-6',   units: 'exterior', time: '12:09', coords: '60.0095°N 30.3447°E', receipt: 'TRC-041209' },
  { file: 'photo_2026-05-12_01-00-03.jpg', kind: 'hand', district: 'Kalininskiy',       building: 'К-7',   units: 'exterior', time: '13:46', coords: '60.0094°N 30.3925°E', receipt: 'TRC-041346' },

  // Door shots — entry photographs, the proof of access
  { file: 'photo_2026-05-12_01-00-24.jpg', kind: 'door', district: 'Vasileostrovskiy', building: 'ВО-11', units: 'lobby', time: '14:32', coords: '59.9398°N 30.2581°E', receipt: 'TRC-041432' },
];

// Universal ticker payload — a mix of district names, GPS coords and signal
// timestamps. Reads as live telemetry beneath the masthead.
export const tickerItems: string[] = [
  'CENTRAL · 59.9343°N 30.3351°E',
  'ADMIRALTEYSKIY · ROUTE 04',
  'PETROGRADSKIY · 59.9619°N 30.3081°E',
  'VYBORGSKIY · ROUTE 11',
  'KALININSKIY · 60.0094°N 30.3925°E',
  'NEVSKIY · ROUTE 07',
  'KIROVSKIY · 59.8786°N 30.2705°E',
  'MOSKOVSKIY · ROUTE 02',
  'FRUNZENSKIY · 59.8842°N 30.3651°E',
  'KRASNOGVARDEYSKIY · ROUTE 09',
  'PRIMORSKIY · 60.0064°N 30.2542°E',
  'VASILEOSTROVSKIY · ROUTE 13',
  'KOLPINSKIY · 59.7506°N 30.5878°E',
  'KURORTNYI · ROUTE 18',
];

export const content: Record<Locale, SiteContent> = {
  // ─── ENGLISH ────────────────────────────────────────────────────────────────
  en: {
    manifest: {
      number: 'TRC-SPB / FILE №007',
      postmark: 'POSTMARKED · SAINT PETERSBURG',
      filed: 'FILED 12.05.2026',
      edition: 'EDITION ONE — VERIFIED',
      origin: 'ORIGIN · 59°56′N 30°18′E',
      destination: 'DESTINATION · EVERY DOORSTEP',
    },
    nav: {
      logo: 'TracePoint SPB',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Plans', href: '#plans' },
        { label: 'Proof', href: '#proof' },
        { label: 'Process', href: '#process' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Start Campaign',
      langLabel: 'RU',
    },
    hero: {
      eyebrow: 'St. Petersburg · Russia',
      kicker: 'FILE №01 — THE DELIVERY MANIFEST',
      headline: 'Door to door.\nData to door.',
      headlineSuffix: 'A field report from St. Petersburg.',
      subheadline:
        'Bridging the gap between physical distribution and digital transparency. Every flyer tracked. Every delivery verified. Every campaign measurable — on paper, and on file.',
      cta: 'Launch Your Campaign',
      ctaSecondary: 'See How It Works',
      badge: 'Trusted by 50+ local businesses',
      serial: 'SERIAL · 2026-05-12 / 06:14 MSK',
      meta: 'SAINT PETERSBURG · 59.93°N 30.31°E',
      receiptItems: [
        { label: 'Route', value: '04 — Tsentralny' },
        { label: 'Floors', value: '1 → 9 / verified' },
        { label: 'Doors', value: '128 of 128' },
        { label: 'Receipt', value: '#TRC-040612' },
      ],
    },
    features: {
      eyebrow: 'Our advantage',
      headline: 'Built different.\nDelivered smarter.',
      numberPrefix: 'Article',
      cards: [
        {
          icon: 'key',
          title: 'Strategic Access',
          description:
            'Our proprietary residential entry method puts the flyer in every apartment hand — not the lobby bin. We don\'t do mailboxes; we do doors.',
          tag: 'Proprietary Method',
        },
        {
          icon: 'camera',
          title: 'Verified Reporting',
          description:
            'Every delivery is stamped with a GPS-timestamped photograph. Real proof. No promises. The receipt arrives before the next morning.',
          tag: 'Photo Evidence',
        },
        {
          icon: 'network',
          title: 'Network Strength',
          description:
            'An authoritative local team with roots through every district of the city, and a logistics ledger built over years on the asphalt.',
          tag: 'Local Authority',
        },
      ],
    },
    plans: {
      eyebrow: 'What we offer',
      headline: 'Two services.\nOne trusted partner.',
      subheadline:
        'From paper in every doorway to a website that opens doors online. We handle both sides of the brand — the physical and the digital.',
      services: [
        {
          icon: 'flyer',
          badge: 'Core Service',
          title: 'Flyer Distribution',
          subtitle: 'Offline Marketing',
          description:
            'Verified, GPS-tracked flyer distribution across every residential district of St. Petersburg. Each delivery documented with photographic proof.',
          features: [
            'Direct-to-door residential delivery',
            'GPS-timestamped photo reports',
            'Coverage across all 18+ districts',
            'Campaign dashboard & analytics',
            'Zero middlemen — direct model',
            '24h proof-of-delivery report',
          ],
          cta: 'Start a Campaign',
          ctaHref: '#contact',
          accent: 'violet',
        },
        {
          icon: 'globe',
          badge: 'New Service',
          title: 'Website Development',
          subtitle: 'Digital Presence',
          description:
            'High-performance, modern websites that make your business look as premium online as it is on the street. From landing pages to full platforms — built to convert.',
          features: [
            'Custom design & development',
            'Mobile-first, fast-loading',
            'SEO-optimized from day one',
            'Contact forms & integrations',
            'Landing pages & full websites',
            'Ongoing support & updates',
          ],
          cta: 'Commission a Website',
          ctaHref: '#contact',
          accent: 'blue',
        },
      ],
    },
    stats: {
      eyebrow: 'Performance ledger',
      headline: 'Numbers,\nin tabular form.',
      ledgerLabel: 'LEDGER · YEAR TO DATE 2026',
      totalLabel: 'TOTAL VERIFIED',
      items: [
        { value: 100, suffix: '%', label: 'Transparency Rate', description: 'Every delivery documented' },
        { value: 18, suffix: '+', label: 'Districts Covered', description: 'Across St. Petersburg' },
        { value: 500, suffix: 'K+', label: 'Flyers Distributed', description: 'And counting' },
        { value: 0, suffix: '', label: 'Middlemen', description: 'Direct distribution only' },
      ],
    },
    proof: {
      eyebrow: 'Field dossier',
      headline: 'The proof,\nphotographed.',
      lede:
        'Numbers convince auditors. Photographs convince clients. Below: a small selection from this month\'s field log — mailboxes, doorways, and the corners of Saint Petersburg where our team has been standing.',
      wallTitle: 'A wall in Tsentralny',
      wallCaption:
        'Building Б-14. Units 350 through 367. Every box filled by 08:42 the morning of 12 May 2026. We photographed the row before we left the floor — habit, not optional.',
      wallStamp: 'EXHIBIT A · FILED 12.05.2026',
      sheetTitle: 'Contact sheet — ten districts, one morning',
      sheetCaption:
        'Each frame is one stairwell, one wall, one verified row. Hover to read the building and timestamp; tap on mobile.',
      handTitle: 'Hand-to-hand. On the asphalt.',
      handCaption:
        'A flyer photographed in front of the address it was just delivered to. The receipt id ties the photo to the campaign report. Nothing about this is theoretical.',
      handQuote:
        '“The mailbox is the unit. The photograph is the receipt. Everything else is decoration.”',
      handQuoteAttribution: '— TracePoint SPB, field protocol',
      reelTitle: 'The week, in passing',
      reelCaption:
        'A drag through a fortnight of routes. The metadata is real; the photographs are not stock.',
      ctaLabel: 'See a full dossier for your campaign',
    },
    process: {
      eyebrow: 'The process',
      headline: 'From brief\nto doorstep.',
      routePrefix: 'Itinerary',
      stamps: ['06:14', '07:42', '09:05', '17:30'],
      steps: [
        {
          number: '01',
          title: 'Campaign Brief',
          description:
            'You share your target areas, demographics and goals. We mark up the optimal distribution zones across the city — by hand, on a real map.',
        },
        {
          number: '02',
          title: 'Strategic Planning',
          description:
            'Our local team identifies the highest-impact residential clusters using years of on-the-ground intelligence — not a CSV from a stranger.',
        },
        {
          number: '03',
          title: 'Verified Distribution',
          description:
            'Trained agents deploy with GPS-enabled tools. Every entry point, every unit, documented in real time and stamped into the ledger.',
        },
        {
          number: '04',
          title: 'Proof of Delivery',
          description:
            'You receive a complete dossier within 24 hours: photo evidence, route maps, time-stamped delivery statistics. The receipt, signed.',
        },
      ],
    },
    cta: {
      headline: 'Ready to reach\nevery door?',
      subheadline:
        'Whether you need flyers in every doorway or a website that converts on the way home from work — write to us. We will reply with a plan, not a brochure.',
      emailLabel: 'Email us',
      telegramLabel: 'Message on Telegram',
      orLabel: 'or reach us directly',
      stampLabel: 'POST',
      affix: 'AFFIX REPLY HERE',
    },
    footer: {
      logo: 'TracePoint SPB',
      tagline:
        'Verified flyer distribution & web development, based in Saint Petersburg.',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Plans', href: '#plans' },
        { label: 'Process', href: '#process' },
        { label: 'Contact', href: '#contact' },
      ],
      copyright: '© 2026 TracePoint SPB. All rights reserved.',
      contactLabel: 'Get in touch',
    },
  },

  // ─── RUSSIAN ─────────────────────────────────────────────────────────────────
  ru: {
    manifest: {
      number: 'TRC-SPB / ДЕЛО №007',
      postmark: 'ПОЧТОВЫЙ ШТЕМПЕЛЬ · САНКТ-ПЕТЕРБУРГ',
      filed: 'ПОДШИТО 12.05.2026',
      edition: 'ВЫПУСК ПЕРВЫЙ — ВЕРИФИЦИРОВАНО',
      origin: 'ОТПРАВЛЕНИЕ · 59°56′С 30°18′В',
      destination: 'НАЗНАЧЕНИЕ · КАЖДЫЙ ПОДЪЕЗД',
    },
    nav: {
      logo: 'TracePoint SPB',
      links: [
        { label: 'Услуги', href: '#services' },
        { label: 'Тарифы', href: '#plans' },
        { label: 'Доказательство', href: '#proof' },
        { label: 'Процесс', href: '#process' },
        { label: 'Контакты', href: '#contact' },
      ],
      cta: 'Начать кампанию',
      langLabel: 'EN',
    },
    hero: {
      eyebrow: 'Санкт-Петербург · Россия',
      kicker: 'ДЕЛО №01 — МАНИФЕСТ ДОСТАВКИ',
      headline: 'От двери к двери.\nОт данных к двери.',
      headlineSuffix: 'Полевой отчёт из Санкт-Петербурга.',
      subheadline:
        'Объединяем физическое распределение листовок с цифровой прозрачностью. Каждая листовка отслежена. Каждая доставка подтверждена. Каждая кампания измерима — на бумаге и в деле.',
      cta: 'Запустить кампанию',
      ctaSecondary: 'Как это работает',
      badge: 'Доверяют 50+ местных бизнесов',
      serial: 'НОМЕР · 2026-05-12 / 06:14 МСК',
      meta: 'САНКТ-ПЕТЕРБУРГ · 59.93°С 30.31°В',
      receiptItems: [
        { label: 'Маршрут', value: '04 — Центральный' },
        { label: 'Этажи', value: '1 → 9 / верифицировано' },
        { label: 'Двери', value: '128 из 128' },
        { label: 'Квитанция', value: '#TRC-040612' },
      ],
    },
    features: {
      eyebrow: 'Наши преимущества',
      headline: 'Работаем иначе.\nДоставляем умнее.',
      numberPrefix: 'Статья',
      cards: [
        {
          icon: 'key',
          title: 'Стратегический доступ',
          description:
            'Наш уникальный метод входа кладёт листовку в руки на этаже, а не в общий ящик в подъезде. Мы работаем с дверями, не с урнами.',
          tag: 'Уникальный метод',
        },
        {
          icon: 'camera',
          title: 'Подтверждённая отчётность',
          description:
            'Каждая доставка получает фотодокумент с GPS-меткой времени. Реальные доказательства. Никаких обещаний. Квитанция приходит до утра.',
          tag: 'Фотодоказательства',
        },
        {
          icon: 'network',
          title: 'Сила сети',
          description:
            'Местная команда с корнями во всех районах города и логистический реестр, выстроенный за годы работы на асфальте.',
          tag: 'Местный авторитет',
        },
      ],
    },
    plans: {
      eyebrow: 'Что мы предлагаем',
      headline: 'Два сервиса.\nОдин надёжный партнёр.',
      subheadline:
        'От листовки в каждом подъезде до сайта, который открывает двери онлайн. Мы берёмся за обе стороны бренда — физическую и цифровую.',
      services: [
        {
          icon: 'flyer',
          badge: 'Основная услуга',
          title: 'Распределение листовок',
          subtitle: 'Офлайн-маркетинг',
          description:
            'Верифицированное GPS-отслеживаемое распределение листовок по всем жилым районам Петербурга. Каждая доставка задокументирована с фотодоказательством.',
          features: [
            'Прямая доставка в квартиры',
            'GPS-фотоотчёты с метками времени',
            'Охват всех 18+ районов',
            'Дашборд кампании и аналитика',
            'Ноль посредников — прямая модель',
            'Отчёт о доставке за 24 часа',
          ],
          cta: 'Начать кампанию',
          ctaHref: '#contact',
          accent: 'violet',
        },
        {
          icon: 'globe',
          badge: 'Новая услуга',
          title: 'Разработка сайтов',
          subtitle: 'Цифровое присутствие',
          description:
            'Высокопроизводительные современные сайты, которые делают ваш бизнес премиальным онлайн, как он премиален на улице. От лендингов до полноценных платформ.',
          features: [
            'Индивидуальный дизайн и разработка',
            'Mobile-first, быстрая загрузка',
            'SEO-оптимизация с первого дня',
            'Формы обратной связи и интеграции',
            'Лендинги и полные веб-сайты',
            'Поддержка и обновления',
          ],
          cta: 'Заказать сайт',
          ctaHref: '#contact',
          accent: 'blue',
        },
      ],
    },
    stats: {
      eyebrow: 'Реестр результатов',
      headline: 'Цифры,\nв табличной форме.',
      ledgerLabel: 'РЕЕСТР · С НАЧАЛА ГОДА 2026',
      totalLabel: 'ВСЕГО ВЕРИФИЦИРОВАНО',
      items: [
        { value: 100, suffix: '%', label: 'Прозрачность', description: 'Каждая доставка задокументирована' },
        { value: 18, suffix: '+', label: 'Районов охвачено', description: 'По всему Санкт-Петербургу' },
        { value: 500, suffix: 'K+', label: 'Листовок роздано', description: 'И продолжаем расти' },
        { value: 0, suffix: '', label: 'Посредников', description: 'Только прямое распределение' },
      ],
    },
    proof: {
      eyebrow: 'Полевое досье',
      headline: 'Доказательство,\nсфотографированное.',
      lede:
        'Аудиторов убеждают цифры. Клиентов убеждают фотографии. Ниже — небольшая выборка из полевого журнала этого месяца: подъезды, двери и углы Петербурга, где стояла наша команда.',
      wallTitle: 'Стена в Центральном',
      wallCaption:
        'Дом Б-14. Квартиры с 350 по 367. Все ящики заполнены к 08:42 утра 12 мая 2026. Мы фотографируем ряд, прежде чем покинуть этаж — это привычка, а не опция.',
      wallStamp: 'ЭКСПОНАТ A · ПОДШИТО 12.05.2026',
      sheetTitle: 'Контакт-лист — десять районов, одно утро',
      sheetCaption:
        'Каждый кадр — один подъезд, одна стена, один верифицированный ряд. Наведите курсор — здание и время. На мобильном — коснитесь.',
      handTitle: 'Из рук в руки. На асфальте.',
      handCaption:
        'Листовка, сфотографированная перед адресом, в который её только что вложили. Номер квитанции связывает фото с отчётом кампании. Здесь нет ничего теоретического.',
      handQuote:
        '«Подъездный ящик — это единица. Фотография — это квитанция. Всё остальное — украшение.»',
      handQuoteAttribution: '— TracePoint SPB, полевой протокол',
      reelTitle: 'Неделя, пробегом',
      reelCaption:
        'Прокрутка двух недель маршрутов. Метаданные настоящие, фотографии — не из стока.',
      ctaLabel: 'Получить полное досье по вашей кампании',
    },
    process: {
      eyebrow: 'Процесс работы',
      headline: 'От брифа\nдо двери.',
      routePrefix: 'Маршрут',
      stamps: ['06:14', '07:42', '09:05', '17:30'],
      steps: [
        {
          number: '01',
          title: 'Бриф кампании',
          description:
            'Вы делитесь целевыми районами, демографией и целями. Мы размечаем оптимальные зоны распределения — вручную, на настоящей карте.',
        },
        {
          number: '02',
          title: 'Стратегическое планирование',
          description:
            'Наша местная команда определяет жилые кластеры с максимальным охватом на основе многолетнего опыта — не CSV-файл от незнакомца.',
        },
        {
          number: '03',
          title: 'Верифицированное распределение',
          description:
            'Агенты работают с GPS-инструментами отчётности. Каждый подъезд и каждая квартира — задокументированы в реальном времени и внесены в реестр.',
        },
        {
          number: '04',
          title: 'Подтверждение доставки',
          description:
            'Полное досье в течение 24 часов: фотодоказательства, маршрутные карты, статистика с метками времени. Квитанция — с подписью.',
        },
      ],
    },
    cta: {
      headline: 'Готовы охватить\nкаждую дверь?',
      subheadline:
        'Нужны листовки в каждом подъезде или сайт, который конвертирует по дороге с работы? Напишите нам — мы ответим планом, а не брошюрой.',
      emailLabel: 'Написать на email',
      telegramLabel: 'Написать в Telegram',
      orLabel: 'или свяжитесь напрямую',
      stampLabel: 'POST',
      affix: 'ПРИКЛЕИТЬ ОТВЕТ ЗДЕСЬ',
    },
    footer: {
      logo: 'TracePoint SPB',
      tagline:
        'Верифицированное распределение листовок и веб-разработка в Санкт-Петербурге.',
      links: [
        { label: 'Услуги', href: '#services' },
        { label: 'Тарифы', href: '#plans' },
        { label: 'Процесс', href: '#process' },
        { label: 'Контакты', href: '#contact' },
      ],
      copyright: '© 2026 TracePoint SPB. Все права защищены.',
      contactLabel: 'Связаться с нами',
    },
  },
};

export interface SiteContent {
  manifest: {
    number: string;
    postmark: string;
    filed: string;
    edition: string;
    origin: string;
    destination: string;
  };
  nav: {
    logo: string;
    links: { label: string; href: string }[];
    cta: string;
    langLabel: string;
  };
  hero: {
    eyebrow: string;
    kicker: string;
    headline: string;
    headlineSuffix: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
    badge: string;
    serial: string;
    meta: string;
    receiptItems: { label: string; value: string }[];
  };
  features: {
    eyebrow: string;
    headline: string;
    numberPrefix: string;
    cards: { icon: string; title: string; description: string; tag: string }[];
  };
  plans: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    services: {
      icon: string;
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      features: string[];
      cta: string;
      ctaHref: string;
      accent: 'violet' | 'blue';
    }[];
  };
  stats: {
    eyebrow: string;
    headline: string;
    ledgerLabel: string;
    totalLabel: string;
    items: { value: number; suffix: string; label: string; description: string }[];
  };
  proof: {
    eyebrow: string;
    headline: string;
    lede: string;
    wallTitle: string;
    wallCaption: string;
    wallStamp: string;
    sheetTitle: string;
    sheetCaption: string;
    handTitle: string;
    handCaption: string;
    handQuote: string;
    handQuoteAttribution: string;
    reelTitle: string;
    reelCaption: string;
    ctaLabel: string;
  };
  process: {
    eyebrow: string;
    headline: string;
    routePrefix: string;
    stamps: string[];
    steps: { number: string; title: string; description: string }[];
  };
  cta: {
    headline: string;
    subheadline: string;
    emailLabel: string;
    telegramLabel: string;
    orLabel: string;
    stampLabel: string;
    affix: string;
  };
  footer: {
    logo: string;
    tagline: string;
    links: { label: string; href: string }[];
    copyright: string;
    contactLabel: string;
  };
}

export const getContent = (locale: Locale = 'en'): SiteContent => content[locale];
