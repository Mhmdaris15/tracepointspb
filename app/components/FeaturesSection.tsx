'use client';

import { motion } from 'framer-motion';
import RegistrationMark from './RegistrationMark';

type IconName = 'key' | 'camera' | 'network';

const icons: Record<IconName, React.FC<{ className?: string }>> = {
  key: ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="18" cy="30" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M26 22l16-16M37 11l5 5M40 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="30" r="2.5" fill="currentColor" />
    </svg>
  ),
  camera: ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M28 9h-10l-4 6H7a3 3 0 00-3 3v19a3 3 0 003 3h34a3 3 0 003-3V18a3 3 0 00-3-3h-7l-4-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="2.5" fill="currentColor" />
      <rect x="36" y="19" width="3" height="3" fill="currentColor" />
    </svg>
  ),
  network: ({ className }) => (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="39" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="39" cy="39" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path
        d="M24 13v8M24 27l-13 9M24 27l13 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

interface FeaturesProps {
  eyebrow: string;
  headline: string;
  numberPrefix: string;
  cards: { icon: string; title: string; description: string; tag: string }[];
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FeaturesSection({
  eyebrow,
  headline,
  numberPrefix,
  cards,
}: FeaturesProps) {
  const headlineLines = headline.split('\n');

  return (
    <section
      id="services"
      className="relative border-t border-[var(--ink)]/20 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ── Section header — masthead row ───────────────────────────── */}
        <div className="mb-16 grid grid-cols-12 gap-6 lg:mb-24">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              <span className="h-px w-6 bg-[var(--ink)]" />
              <span>{eyebrow}</span>
            </div>
          </div>
          <motion.h2
            className="col-span-12 lg:col-span-8 font-display text-[12vw] sm:text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-[-0.04em] text-[var(--ink)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1' }}
          >
            {headlineLines.map((l, i) => (
              <span key={i} className="block">
                {i === 1 ? <em className="not-italic text-[var(--post)]">{l}</em> : l}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* ── Triptych ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = icons[card.icon as IconName] ?? icons.key;
            const numeral = String(i + 1).padStart(2, '0');
            return (
              <motion.article
                key={card.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
              >
                {/* Article meta */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
                    {numberPrefix} № {numeral}
                  </span>
                  <RegistrationMark size={12} color="var(--ink)" />
                </div>

                {/* Top rule */}
                <div className="h-px w-full bg-[var(--ink)]" />
                <div className="mt-1 h-px w-full bg-[var(--ink)]/30" />

                {/* Massive numeral */}
                <div className="relative mt-4 flex items-start justify-between">
                  <span
                    className="font-display text-[26vw] sm:text-[18vw] md:text-[12vw] lg:text-[9.5vw] font-black leading-[0.78] tracking-[-0.06em] text-[var(--post)] select-none"
                    style={{
                      fontVariationSettings:
                        '"opsz" 144, "SOFT" 0, "WONK" 1',
                    }}
                  >
                    {numeral}
                  </span>
                  {/* Icon as a stamp box */}
                  <span
                    className="mt-3 flex h-14 w-14 shrink-0 items-center justify-center border border-[var(--ink)]"
                    style={{
                      background:
                        'repeating-linear-gradient(45deg, transparent 0 4px, rgba(26,23,20,0.05) 4px 5px)',
                    }}
                  >
                    <Icon className="h-8 w-8 text-[var(--ink)]" />
                  </span>
                </div>

                {/* Tag */}
                <div className="mt-4">
                  <span
                    className="inline-block px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]"
                    style={{ background: 'var(--ink)' }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-3xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] lg:text-4xl">
                  {card.title}
                </h3>

                {/* Body */}
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {card.description}
                </p>

                {/* Bottom footnote */}
                <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  <span>FN. {numeral}</span>
                  <span className="h-px flex-1 bg-[var(--ink)]/30" />
                  <span>SEE PROCESS →</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
