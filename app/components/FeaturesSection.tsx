'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type IconName = 'key' | 'camera' | 'network';

const icons: Record<IconName, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  key: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="15" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 10l8-8M17 6l2 2M19 4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  camera: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  network: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v4m0 0l-5.5 6M12 11l5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const cardGradients = [
  { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', glow: 'rgba(139,92,246,0.15)', icon: '#a78bfa' },
  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', glow: 'rgba(59,130,246,0.15)', icon: '#60a5fa' },
  { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.15)', icon: '#34d399' },
];

interface FeaturesProps {
  eyebrow: string;
  headline: string;
  cards: { icon: string; title: string; description: string; tag: string }[];
}

function FeatureCard({
  card,
  gradient,
  index,
}: {
  card: { icon: string; title: string; description: string; tag: string };
  gradient: (typeof cardGradients)[0];
  index: number;
}) {
  const Icon = icons[card.icon as IconName] ?? icons.key;

  return (
    <motion.div
      className="relative group overflow-hidden rounded-2xl p-px"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${gradient.border} 0%, transparent 50%, ${gradient.border} 100%)` }}
      />
      <div
        className="absolute inset-px rounded-2xl"
        style={{ border: `1px solid ${gradient.border}` }}
      />

      <div
        className="relative rounded-2xl p-8"
        style={{
          background: `linear-gradient(135deg, ${gradient.bg} 0%, rgba(8,11,20,0.8) 100%)`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {/* Glow spot */}
        <div
          className="absolute top-0 right-0 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${gradient.glow} 0%, transparent 70%)`, transform: 'translate(20%, -20%)' }}
        />

        {/* Glint sweep on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 -skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)', x: '-100%' }}
            whileHover={{ x: '300%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Icon */}
        <div
          className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: `rgba(${gradient.icon === '#a78bfa' ? '139,92,246' : gradient.icon === '#60a5fa' ? '59,130,246' : '16,185,129'},0.15)` }}
        >
          <Icon className="h-6 w-6" style={{ color: gradient.icon } as React.CSSProperties} />
        </div>

        {/* Tag */}
        <div className="mb-3">
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase"
            style={{ background: `${gradient.bg}`, border: `1px solid ${gradient.border}`, color: gradient.icon }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-white">{card.title}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-400">{card.description}</p>

        {/* Bottom arrow */}
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: gradient.icon }}>
          <span>Learn more</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection({ eyebrow, headline, cards }: FeaturesProps) {
  const headlineLines = headline.split('\n');

  return (
    <section id="services" className="relative px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.span
            className="inline-block mb-4 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? <span className="gradient-text">{line}</span> : line}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <FeatureCard key={card.title} card={card} gradient={cardGradients[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
