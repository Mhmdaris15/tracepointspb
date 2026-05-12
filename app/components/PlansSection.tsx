'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/app/lib/content';
import { proofPhotos } from '@/app/lib/content';
import { asset } from '@/app/lib/paths';
import RegistrationMark from './RegistrationMark';

type PlansProps = SiteContent['plans'];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const accentMap = {
  violet: { color: 'var(--cobalt)', mark: 'I' },
  blue:   { color: 'var(--olive)',  mark: 'II' },
};

function FlyerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="14" y="8" width="36" height="48" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 8l36 48M50 8L14 56" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <rect x="20" y="16" width="24" height="2" fill="currentColor" />
      <rect x="20" y="22" width="18" height="1" fill="currentColor" />
      <rect x="20" y="26" width="22" height="1" fill="currentColor" />
      <rect x="20" y="30" width="14" height="1" fill="currentColor" />
      <rect x="20" y="42" width="24" height="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function GlobeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="32" cy="32" rx="22" ry="9" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="32" cy="32" rx="9" ry="22" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" strokeWidth="1" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
}

export default function PlansSection({
  eyebrow,
  headline,
  subheadline,
  services,
}: PlansProps) {
  const headlineLines = headline.split('\n');

  return (
    <section
      id="plans"
      className="relative border-t border-[var(--ink)]/20 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-14 grid grid-cols-12 gap-6 lg:mb-20">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              <span className="h-px w-6 bg-[var(--ink)]" />
              <span>{eyebrow}</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <motion.h2
              className="font-display text-[12vw] sm:text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-[-0.04em] text-[var(--ink)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1' }}
            >
              {headlineLines.map((l, i) => (
                <span key={i} className="block">
                  {i === 0 ? l : <em className="not-italic text-[var(--post)]">{l}</em>}
                </span>
              ))}
            </motion.h2>
            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {subheadline}
            </motion.p>
          </div>
        </div>

        {/* Facing pages */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-0">
          {services.map((service, i) => {
            const a = accentMap[service.accent];
            const isLeftPage = i === 0;
            return (
              <motion.article
                key={service.title}
                className={`relative ${
                  isLeftPage
                    ? 'card-manila md:border-r-0'
                    : 'card-paper md:border-l'
                } perforate-top card-paper-raised md:rounded-none`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
              >
                {/* Registration marks */}
                <div className="reg-mark" style={{ top: 10, left: 10 }} />
                <div
                  className="reg-mark"
                  style={{ top: 10, right: 10, left: 'auto' }}
                />

                {/* Top filing bar */}
                <header className="flex items-center justify-between border-b border-[var(--ink)] px-6 py-3 sm:px-8">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
                    <span
                      className="px-1.5 py-0.5"
                      style={{
                        background: a.color,
                        color: 'var(--paper)',
                      }}
                    >
                      {a.mark}
                    </span>
                    <span>{service.badge}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                    FORM-{String(i + 1).padStart(2, '0')}
                  </span>
                </header>

                {/* Proof strip — flyer card gets a real mailbox photo,
                    web-dev card gets the printed dashboard mockup. Both
                    serve as visual evidence of the deliverable. */}
                <div
                  className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--ink)]"
                  style={{ background: 'var(--ink)' }}
                >
                  <img
                    src={
                      service.icon === 'flyer'
                        ? asset(`/images/${proofPhotos[2].file}`)
                        : asset('/images/generated/dashboard-printed-mock.png')
                    }
                    alt={
                      service.icon === 'flyer'
                        ? 'Mailbox row, units filled — Kalininskiy'
                        : 'Printed campaign analytics proof-sheet'
                    }
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover photo-duo transition-transform duration-700 ease-out hover:scale-[1.04]"
                    draggable={false}
                  />
                  {/* Bottom caption strip on photo */}
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-baseline justify-between px-4 py-2"
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(8,7,10,0.85), transparent)',
                    }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--paper)]">
                      {service.icon === 'flyer'
                        ? `EVIDENCE · ${proofPhotos[2].district} · ${proofPhotos[2].time}`
                        : 'PROOF · CAMPAIGN ANALYTICS PRINT'}
                    </span>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.22em]"
                      style={{ color: a.color === 'var(--cobalt)' ? '#9eb0d9' : '#d3c97a' }}
                    >
                      №00{i + 1}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-8 sm:px-10 sm:py-10">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.24em]"
                        style={{ color: a.color }}
                      >
                        {service.subtitle}
                      </span>
                      <h3 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] sm:text-5xl">
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className="shrink-0 border border-[var(--ink)] p-2"
                      style={{ color: a.color }}
                    >
                      {service.icon === 'flyer' ? (
                        <FlyerMark className="h-14 w-14" />
                      ) : (
                        <GlobeMark className="h-14 w-14" />
                      )}
                    </span>
                  </div>

                  <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {service.description}
                  </p>

                  {/* Feature ledger */}
                  <div className="mt-8 border-y border-[var(--ink)] py-2">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      <span>#</span>
                      <span>Inclusion</span>
                      <span>OK</span>
                    </div>
                  </div>
                  <ul className="divide-y divide-[var(--ink)]/15">
                    {service.features.map((feature, idx) => (
                      <li
                        key={feature}
                        className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 py-2.5"
                      >
                        <span className="font-mono text-[10px] tabular text-[var(--ink-mute)]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-[var(--ink)]">
                          {feature}
                        </span>
                        {/* Hand-drawn tick */}
                        <svg
                          viewBox="0 0 14 14"
                          className="h-3.5 w-3.5"
                          fill="none"
                          aria-hidden="true"
                          style={{ color: a.color }}
                        >
                          <path
                            d="M2 8 C 4 6, 5 7, 6 10 C 8 4, 10 3, 13 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </li>
                    ))}
                  </ul>

                  {/* Footer with CTA */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--ink)] pt-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      Signed · TracePoint SPB
                    </div>
                    <a href={service.ctaHref} className="btn-ink">
                      {service.cta}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-3 w-3"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 8h12M9 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Spine note */}
        <motion.p
          className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          All forms are custom-quoted — write to us and we will return with a
          plan, not a brochure.
        </motion.p>
      </div>
    </section>
  );
}
