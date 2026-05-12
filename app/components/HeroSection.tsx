'use client';

import { motion } from 'framer-motion';
import { contact, proofPhotos } from '@/app/lib/content';
import type { SiteContent } from '@/app/lib/content';
import RegistrationMark from './RegistrationMark';
import Polaroid from './Polaroid';

type HeroProps = SiteContent['hero'] & {
  manifest: SiteContent['manifest'];
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function HeroSection({
  kicker,
  headline,
  headlineSuffix,
  subheadline,
  cta,
  ctaSecondary,
  badge,
  serial,
  meta,
  receiptItems,
  manifest,
}: HeroProps) {
  const headlineLines = headline.split('\n');

  return (
    <section className="relative px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        {/* ── KICKER ROW — file label + manifest origin ─────────────────── */}
        <motion.div
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
            <RegistrationMark size={12} color="var(--ink)" />
            <span>{kicker}</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            {manifest.origin} <span className="opacity-50">→</span>{' '}
            <span className="text-[var(--post)]">
              {manifest.destination}
            </span>
          </div>
        </motion.div>

        {/* ── HEADLINE LOCKUP ───────────────────────────────────────────── */}
        <div className="relative grid grid-cols-12 gap-6">
          {/* Left margin column — vertical ticker of door numbers */}
          <div className="col-span-12 hidden lg:col-span-1 lg:flex lg:flex-col lg:items-start lg:gap-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
              SHEET
            </div>
            <div className="font-display text-[80px] font-black leading-none tracking-[-0.05em] text-[var(--ink)]">
              01
            </div>
            <div
              className="my-2 w-px flex-1 self-stretch"
              style={{ background: 'var(--ink)' }}
            />
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--ink-mute)] [writing-mode:vertical-rl] rotate-180">
              {serial}
            </div>
          </div>

          {/* Headline column */}
          <div className="col-span-12 lg:col-span-7 relative">
            <h1 className="relative">
              {/* Line 1 */}
              <motion.span
                className="font-display block text-[14vw] sm:text-[12vw] lg:text-[8.4vw] font-black leading-[0.92] tracking-[-0.045em] text-[var(--ink)]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 }}
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
                }}
              >
                {headlineLines[0]}
              </motion.span>

              {/* Line 2 with mid-line ruler & accent */}
              <motion.span
                className="block relative"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.32 }}
              >
                <span
                  className="font-display block text-[14vw] sm:text-[12vw] lg:text-[8.4vw] font-black leading-[0.92] tracking-[-0.045em] text-[var(--ink)] italic"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
                  }}
                >
                  <span className="ink-underline">
                    {(headlineLines[1] ?? '').split(' ')[0]}
                  </span>
                  {' '}
                  {(headlineLines[1] ?? '')
                    .split(' ')
                    .slice(1)
                    .join(' ')}
                </span>
              </motion.span>
            </h1>

            {/* Suffix line — small italic */}
            <motion.p
              className="font-display mt-6 max-w-md text-base italic text-[var(--ink-soft)] leading-snug lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              — {headlineSuffix}
            </motion.p>
          </div>

          {/* Right column — delivery receipt card + postmark */}
          <div className="col-span-12 lg:col-span-4 relative">
            {/* Postmark — diagonal, top-right */}
            <motion.div
              className="absolute -top-6 right-2 z-20 lg:-top-12 lg:-right-4"
              initial={{ opacity: 0, scale: 1.6, rotate: -25 }}
              animate={{ opacity: 0.95, scale: 1, rotate: -8 }}
              transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
            >
              <div className="postmark">
                <span className="leading-tight">SAINT</span>
                <span className="leading-tight">PETERSBURG</span>
                <span className="my-1 block h-px w-10 bg-current opacity-60" />
                <span className="leading-tight">12 · 05 · 26</span>
                <span className="leading-tight opacity-70">RU · 191000</span>
                <span className="postmark-line" />
              </div>
            </motion.div>

            {/* Receipt card */}
            <motion.aside
              className="card-paper card-paper-raised relative mt-12 p-6 lg:mt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
            >
              <div className="reg-mark" style={{ top: 6, left: 6 }} />
              <div
                className="reg-mark"
                style={{ top: 6, right: 6, left: 'auto' }}
              />

              <header className="mb-5 flex items-baseline justify-between border-b border-[var(--ink)] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
                  Delivery Receipt
                </span>
                <span className="font-mono text-[10px] tabular text-[var(--post)]">
                  №040612
                </span>
              </header>

              <dl className="space-y-3">
                {receiptItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--ink)]/30 pb-2"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                      {item.label}
                    </dt>
                    <dd className="font-display text-sm font-semibold tabular text-[var(--ink)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <footer className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--post)] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]">
                    Verified — GPS stamped
                  </span>
                </div>
                {/* Signature */}
                <svg
                  viewBox="0 0 64 24"
                  className="h-6 w-16 text-[var(--ink)]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 18 C 6 4, 10 22, 16 12 S 26 4, 32 14 S 42 22, 48 8 S 58 18, 62 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </footer>
            </motion.aside>
          </div>
        </div>

        {/* ── DECK + ACTIONS ────────────────────────────────────────────── */}
        <div className="relative mt-16 grid grid-cols-12 gap-6">
          <div className="hidden lg:col-span-1 lg:block" />
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
          >
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] lg:text-xl">
              {subheadline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-ink">
                {cta}
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
              <a href="#process" className="btn-paper">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M8 3v10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {ctaSecondary}
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                {badge}
              </span>
            </div>
          </motion.div>

          {/* Right column — real-proof polaroid */}
          <motion.div
            className="col-span-12 lg:col-span-4 relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: easeOut }}
          >
            {/* Tiny meta strip above */}
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--post)] animate-pulse" />
                FRESH FROM THE FIELD
              </span>
              <span>{meta.split(' · ')[1] ?? meta}</span>
            </div>

            <div className="relative">
              <Polaroid
                photo={proofPhotos[0]}
                caption={`${proofPhotos[0].district} · ${proofPhotos[0].building}`}
                treatment="duo"
                aspect="4 / 5"
                width="100%"
                tilt={-1.5}
                showTape
                showPin
                priority
              />
              {/* Press stamp pinned bottom-right */}
              <span
                className="press-stamp absolute -bottom-2 right-3 z-10"
                style={{ background: 'rgba(255,255,255,0.92)' }}
              >
                <span className="h-1 w-1 bg-current" /> EXHIBIT A
              </span>
            </div>

            {/* Caption beneath */}
            <p className="mt-6 font-display text-sm italic leading-snug text-[var(--ink-soft)]">
              Photographed this morning, on the floor where it was filed.
              The dossier is real. Scroll for the rest.
            </p>
          </motion.div>
        </div>

        {/* ── BOTTOM RULE: a "delivery route" dashed line ──────────────── */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]">
            A
          </span>
          <div
            className="relative flex-1"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, var(--ink) 0 6px, transparent 6px 12px)',
              height: 1,
            }}
          >
            <span
              className="absolute -top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--ink)] bg-[var(--post)]"
              style={{ left: '32%' }}
            />
            <span
              className="absolute -top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-[var(--ink)] bg-[var(--paper)]"
              style={{ left: '64%' }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--post)]">
            B
          </span>
        </motion.div>
      </div>
    </section>
  );
}
