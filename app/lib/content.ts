// Content configuration — all user-facing strings live here for i18n.
// To switch language on the page, change locale state in LandingPage.tsx.

export type Locale = 'en' | 'ru';

export const contact = {
  email: 'muhammadaris1945@gmail.com',
  telegram: '+79810409453',
  telegramUrl: 'https://t.me/+79810409453',
  location: 'Saint Petersburg, Russia',
  locationRu: 'Санкт-Петербург, Россия',
};

export const content: Record<Locale, SiteContent> = {
  // ─── ENGLISH ────────────────────────────────────────────────────────────────
  en: {
    nav: {
      logo: 'TracePoint SPB',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Plans', href: '#plans' },
        { label: 'How It Works', href: '#process' },
        { label: 'Results', href: '#stats' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Start Campaign',
      langLabel: 'RU',
    },
    hero: {
      eyebrow: 'St. Petersburg · Russia',
      headline: 'Data-Driven Offline\nMarketing',
      headlineSuffix: 'for St. Petersburg.',
      subheadline:
        'Bridging the gap between physical distribution and digital transparency. Every flyer tracked. Every delivery verified. Every campaign measurable.',
      cta: 'Launch Your Campaign',
      ctaSecondary: 'See How It Works',
      badge: 'Trusted by 50+ local businesses',
    },
    features: {
      eyebrow: 'Our Advantage',
      headline: 'Built Different,\nDelivered Smarter.',
      cards: [
        {
          icon: 'key',
          title: 'Strategic Access',
          description:
            'Our proprietary residential entry method guarantees distribution reaches every apartment unit — not just mailboxes.',
          tag: 'Proprietary Method',
        },
        {
          icon: 'camera',
          title: 'Verified Reporting',
          description:
            'GPS-timestamped photo documentation of every single delivery. Real proof, not promises. Your dashboard, your control.',
          tag: 'Photo Evidence',
        },
        {
          icon: 'network',
          title: 'Network Strength',
          description:
            'Led by an authoritative team with deep roots in the St. Petersburg community and partnerships across all districts.',
          tag: 'Local Authority',
        },
      ],
    },
    plans: {
      eyebrow: 'What We Offer',
      headline: 'Two Services,\nOne Trusted Partner.',
      subheadline: 'From putting flyers in every doorway to building your digital storefront — we handle both sides of your brand presence.',
      services: [
        {
          icon: 'flyer',
          badge: 'Core Service',
          title: 'Flyer Distribution',
          subtitle: 'Offline Marketing',
          description: 'Verified, GPS-tracked flyer distribution across all residential districts of St. Petersburg. Every delivery documented with photo proof.',
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
          description: 'High-performance, modern websites that make your business look premium online. From landing pages to full business platforms — built to convert.',
          features: [
            'Custom design & development',
            'Mobile-first, fast-loading',
            'SEO-optimized from day one',
            'Contact forms & integrations',
            'Landing pages & full websites',
            'Ongoing support & updates',
          ],
          cta: 'Get a Website',
          ctaHref: '#contact',
          accent: 'blue',
        },
      ],
    },
    stats: {
      eyebrow: 'Performance Metrics',
      headline: "Numbers That\nDon't Lie.",
      items: [
        { value: 100, suffix: '%', label: 'Transparency Rate', description: 'Every delivery documented' },
        { value: 18, suffix: '+', label: 'Districts Covered', description: 'Across St. Petersburg' },
        { value: 500, suffix: 'K+', label: 'Flyers Distributed', description: 'And counting' },
        { value: 0, suffix: '', label: 'Middlemen', description: 'Direct distribution only' },
      ],
    },
    process: {
      eyebrow: 'The Process',
      headline: 'From Brief\nto Doorstep.',
      steps: [
        {
          number: '01',
          title: 'Campaign Brief',
          description: 'Share your target areas, demographics, and goals. We map the optimal distribution zones across St. Petersburg.',
        },
        {
          number: '02',
          title: 'Strategic Planning',
          description: 'Our local team identifies the highest-impact residential clusters using years of on-the-ground intelligence.',
        },
        {
          number: '03',
          title: 'Verified Distribution',
          description: 'Trained agents deploy with GPS-enabled reporting tools. Every entry point, every unit, documented in real time.',
        },
        {
          number: '04',
          title: 'Proof of Delivery',
          description: 'Receive a comprehensive report with photo evidence, route maps, and delivery statistics within 24 hours.',
        },
      ],
    },
    cta: {
      headline: 'Ready to Reach\nEvery Door?',
      subheadline:
        'Whether you need flyers in every doorway or a website that converts — get in touch and we\'ll build the right plan for you.',
      emailLabel: 'Email us',
      telegramLabel: 'Message on Telegram',
      orLabel: 'or reach us directly',
    },
    footer: {
      logo: 'TracePoint SPB',
      tagline: 'Verified flyer distribution & web development in St. Petersburg.',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Plans', href: '#plans' },
        { label: 'Process', href: '#process' },
        { label: 'Contact', href: '#contact' },
      ],
      copyright: '© 2025 TracePoint SPB. All rights reserved.',
      contactLabel: 'Get in touch',
    },
  },

  // ─── RUSSIAN ─────────────────────────────────────────────────────────────────
  ru: {
    nav: {
      logo: 'TracePoint SPB',
      links: [
        { label: 'Услуги', href: '#services' },
        { label: 'Тарифы', href: '#plans' },
        { label: 'Как работаем', href: '#process' },
        { label: 'Результаты', href: '#stats' },
        { label: 'Контакты', href: '#contact' },
      ],
      cta: 'Начать кампанию',
      langLabel: 'EN',
    },
    hero: {
      eyebrow: 'Санкт-Петербург · Россия',
      headline: 'Маркетинг с\nаналитикой',
      headlineSuffix: 'для Санкт-Петербурга.',
      subheadline:
        'Объединяем физическое распределение листовок с цифровой прозрачностью. Каждая листовка отслеживается. Каждая доставка подтверждается. Каждая кампания измерима.',
      cta: 'Запустить кампанию',
      ctaSecondary: 'Как это работает',
      badge: 'Доверяют 50+ местных бизнесов',
    },
    features: {
      eyebrow: 'Наши преимущества',
      headline: 'Работаем иначе,\nдоставляем умнее.',
      cards: [
        {
          icon: 'key',
          title: 'Стратегический доступ',
          description:
            'Наш уникальный метод входа в жилые дома гарантирует доставку в каждую квартиру — а не только в почтовые ящики.',
          tag: 'Уникальный метод',
        },
        {
          icon: 'camera',
          title: 'Подтверждённая отчётность',
          description:
            'Фотодокументация каждой доставки с GPS-метками времени. Реальные доказательства, а не обещания. Ваш дашборд, ваш контроль.',
          tag: 'Фотодоказательства',
        },
        {
          icon: 'network',
          title: 'Сила сети',
          description:
            'Команда с глубокими корнями в петербургском сообществе и партнёрствами во всех районах города.',
          tag: 'Местный авторитет',
        },
      ],
    },
    plans: {
      eyebrow: 'Что мы предлагаем',
      headline: 'Два сервиса,\nодин надёжный партнёр.',
      subheadline: 'От листовок в каждом подъезде до вашего цифрового присутствия — мы берёмся за обе стороны вашего бренда.',
      services: [
        {
          icon: 'flyer',
          badge: 'Основная услуга',
          title: 'Распределение листовок',
          subtitle: 'Офлайн-маркетинг',
          description: 'Верифицированное GPS-отслеживаемое распределение листовок по жилым районам Санкт-Петербурга. Каждая доставка задокументирована с фотодоказательством.',
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
          description: 'Высокопроизводительные современные сайты, которые делают ваш бизнес выглядящим премиально онлайн. От лендингов до полноценных бизнес-платформ.',
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
      eyebrow: 'Показатели эффективности',
      headline: 'Цифры,\nкоторые не лгут.',
      items: [
        { value: 100, suffix: '%', label: 'Прозрачность', description: 'Каждая доставка задокументирована' },
        { value: 18, suffix: '+', label: 'Районов охвачено', description: 'По всему Санкт-Петербургу' },
        { value: 500, suffix: 'K+', label: 'Листовок роздано', description: 'И продолжаем расти' },
        { value: 0, suffix: '', label: 'Посредников', description: 'Только прямое распределение' },
      ],
    },
    process: {
      eyebrow: 'Процесс работы',
      headline: 'От брифа\nдо двери.',
      steps: [
        {
          number: '01',
          title: 'Бриф кампании',
          description: 'Расскажите о целевых районах, демографии и целях. Мы составим оптимальные зоны распределения по всему городу.',
        },
        {
          number: '02',
          title: 'Стратегическое планирование',
          description: 'Наша местная команда определяет жилые кластеры с максимальным охватом на основе многолетнего опыта работы.',
        },
        {
          number: '03',
          title: 'Верифицированное распределение',
          description: 'Агенты работают с GPS-инструментами отчётности. Каждый подъезд, каждая квартира — задокументированы в реальном времени.',
        },
        {
          number: '04',
          title: 'Подтверждение доставки',
          description: 'Получите подробный отчёт с фотодоказательствами, маршрутными картами и статистикой доставки в течение 24 часов.',
        },
      ],
    },
    cta: {
      headline: 'Готовы охватить\nкаждую дверь?',
      subheadline:
        'Нужны листовки в каждом подъезде или сайт, который конвертирует? Свяжитесь с нами — мы разработаем подходящий план.',
      emailLabel: 'Написать на email',
      telegramLabel: 'Написать в Telegram',
      orLabel: 'или свяжитесь напрямую',
    },
    footer: {
      logo: 'TracePoint SPB',
      tagline: 'Верифицированное распределение листовок и веб-разработка в Санкт-Петербурге.',
      links: [
        { label: 'Услуги', href: '#services' },
        { label: 'Тарифы', href: '#plans' },
        { label: 'Процесс', href: '#process' },
        { label: 'Контакты', href: '#contact' },
      ],
      copyright: '© 2025 TracePoint SPB. Все права защищены.',
      contactLabel: 'Связаться с нами',
    },
  },
};

export interface SiteContent {
  nav: {
    logo: string;
    links: { label: string; href: string }[];
    cta: string;
    langLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineSuffix: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
    badge: string;
  };
  features: {
    eyebrow: string;
    headline: string;
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
    items: { value: number; suffix: string; label: string; description: string }[];
  };
  process: {
    eyebrow: string;
    headline: string;
    steps: { number: string; title: string; description: string }[];
  };
  cta: {
    headline: string;
    subheadline: string;
    emailLabel: string;
    telegramLabel: string;
    orLabel: string;
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
