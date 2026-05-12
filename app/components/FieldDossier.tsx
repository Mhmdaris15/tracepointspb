'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/app/lib/paths';
import { proofPhotos } from '@/app/lib/content';
import type { ProofPhoto, SiteContent } from '@/app/lib/content';
import Polaroid from './Polaroid';
import RegistrationMark from './RegistrationMark';

const dossierIncludes = [
  'Photographic proof per delivered building',
  'GPS-timestamped route map of all stops',
  'Per-district verified count + percentage',
  'Time-of-day distribution histogram',
  'Receipt id index for cross-reference',
];

type Props = SiteContent['proof'];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wallPhotos = proofPhotos.filter((p) => p.kind === 'wall');
const handPhotos = proofPhotos.filter((p) => p.kind === 'hand');
const doorPhotos = proofPhotos.filter((p) => p.kind === 'door');

/**
 * Field Dossier — four-act photo essay of real distribution work.
 *
 *   Act I   "Exhibit A"    Full-bleed dark moment. One wall, cinematic.
 *   Act II  "Contact Sheet" Numbered grid of mailbox rows, hover-lift.
 *   Act III "Hand to Hand" Editorial split — large photo + serif pull-quote.
 *   Act IV  "The Reel"     Scroll-driven horizontal polaroid strip.
 *
 * The whole section deliberately breaks the page's column rhythm: each act
 * has its own width strategy (full-bleed, gridded, split, infinite-scroll).
 */
export default function FieldDossier({
  eyebrow,
  headline,
  lede,
  wallTitle,
  wallCaption,
  wallStamp,
  sheetTitle,
  sheetCaption,
  handTitle,
  handCaption,
  handQuote,
  handQuoteAttribution,
  reelTitle,
  reelCaption,
  ctaLabel,
}: Props) {
  const headlineLines = headline.split('\n');

  // ── Act I parallax ─────────────────────────────────────────────────────
  const wallRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: wallProgress } = useScroll({
    target: wallRef,
    offset: ['start end', 'end start'],
  });
  const wallY = useTransform(wallProgress, [0, 1], ['-8%', '8%']);
  const wallScale = useTransform(wallProgress, [0, 0.5, 1], [1.12, 1.04, 1.0]);
  const wallTint = useTransform(wallProgress, [0, 0.4, 1], [0.0, 0.35, 0.6]);

  // ── Act IV reel parallax ───────────────────────────────────────────────
  const reelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: reelProgress } = useScroll({
    target: reelRef,
    offset: ['start end', 'end start'],
  });
  // Drag the strip horizontally as the user scrolls past it
  const reelX = useTransform(reelProgress, [0, 1], ['8%', '-32%']);

  // Choose the wall hero photo (the most photogenic — silver boxes in Б-14)
  const wallHero: ProofPhoto = wallPhotos[0];
  const handHero: ProofPhoto = handPhotos[0];
  const handSecondary: ProofPhoto = handPhotos[1] ?? handPhotos[0];
  const doorHero: ProofPhoto = doorPhotos[0] ?? handPhotos[0];

  return (
    <section
      id="proof"
      className="relative border-t border-[var(--ink)]/20"
    >
      {/* ── Section masthead ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 pt-28 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-12 gap-6">
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
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
          >
            {headlineLines.map((l, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <em className="not-italic text-[var(--post)]">{l}</em>
                ) : (
                  l
                )}
              </span>
            ))}
          </motion.h2>
        </div>
        <motion.p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)] lg:ml-[33.333%]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {lede}
        </motion.p>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          ACT I — EXHIBIT A — full-bleed dark moment
         ─────────────────────────────────────────────────────────────────── */}
      <div
        ref={wallRef}
        className="letterbox spotlight relative w-full overflow-hidden"
      >
        {/* Edge gradient masks — cream paper at the top and bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-24"
          style={{
            background:
              'linear-gradient(180deg, var(--paper) 0%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24"
          style={{
            background:
              'linear-gradient(0deg, var(--paper) 0%, transparent 100%)',
          }}
        />

        {/* Photo wash */}
        <motion.div
          className="relative h-[78vh] min-h-[600px] w-full"
          style={{ y: wallY, scale: wallScale }}
        >
          <img
            src={asset(`/images/${wallHero.file}`)}
            alt={`${wallHero.district} ${wallHero.building}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover photo-noir"
            draggable={false}
          />
          {/* Slow vignette + bottom darkening */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(8,7,10,0.92) 100%), linear-gradient(180deg, transparent 50%, rgba(8,7,10,0.9) 100%)',
              opacity: wallTint,
            }}
          />
        </motion.div>

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col">
          {/* Top bar — exhibit stamp */}
          <div className="flex items-start justify-between p-6 sm:p-10">
            <motion.div
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--paper)]/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RegistrationMark size={12} color="var(--paper)" />
              <span>{wallStamp}</span>
            </motion.div>
            <motion.div
              className="press-stamp"
              initial={{ opacity: 0, scale: 1.4, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              style={{ background: 'rgba(236,228,210,0.92)' }}
            >
              <span className="h-1.5 w-1.5 bg-current" /> VERIFIED
            </motion.div>
          </div>

          {/* Spacer to push title to lower-left */}
          <div className="flex-1" />

          {/* Title block */}
          <div className="grid grid-cols-12 gap-6 p-6 pb-12 sm:p-10 sm:pb-16">
            <motion.div
              className="col-span-12 lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
                Act I — Exhibit A
              </p>
              <h3
                className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--paper)] sm:text-6xl lg:text-7xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 90, "WONK" 1',
                }}
              >
                <em className="not-italic">{wallTitle}</em>
              </h3>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.15, ease }}
            >
              <p className="font-display text-base italic leading-snug text-[var(--paper)]/85 lg:text-lg">
                {wallCaption}
              </p>
              {/* Metadata strip */}
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--paper)]/20 pt-4">
                {[
                  ['District', wallHero.district],
                  ['Building', wallHero.building],
                  ['Units', wallHero.units],
                  ['GPS', wallHero.coords],
                  ['Stamped', `${wallHero.time} MSK`],
                  ['Receipt', `№${wallHero.receipt}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--paper)]/55">
                      {k}
                    </span>
                    <span className="font-mono text-[11px] tabular text-[var(--paper)]">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          ACT II — CONTACT SHEET — gridded mailbox photos
         ─────────────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 lg:px-10 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
              Act II — Contact Sheet
            </p>
            <h3
              className="mt-2 font-display text-4xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] lg:text-5xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1' }}
            >
              {sheetTitle}
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-8 flex items-end">
            <p className="max-w-md font-display text-base italic leading-snug text-[var(--ink-soft)]">
              {sheetCaption}
            </p>
          </div>
        </div>

        {/* Tight numbered grid — uneven row heights for editorial rhythm.
            The grid mimics an actual darkroom contact sheet: 5 across desktop,
            3 on tablet, 2 on mobile, with two "hero" cells that span. */}
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4">
          {wallPhotos.slice(0, 10).map((photo, i) => {
            // Two cells span on desktop to break the uniform rhythm
            const span =
              i === 0
                ? 'lg:col-span-2 lg:row-span-2'
                : i === 5
                  ? 'lg:col-span-2'
                  : '';
            const aspect =
              i === 0 || i === 5 ? 'aspect-[5/4]' : 'aspect-[4/5]';
            return (
              <motion.figure
                key={photo.file}
                className={`group relative overflow-hidden bg-[var(--ink)] border border-[var(--ink)] ${span} ${aspect}`}
                style={{ boxShadow: '4px 4px 0 0 var(--paper-edge)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: (i % 5) * 0.07, ease }}
              >
                {/* Photo */}
                <img
                  src={asset(`/images/${photo.file}`)}
                  alt={`${photo.district} ${photo.building}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out photo-duo group-hover:scale-105"
                  draggable={false}
                />
                {/* Frame number */}
                <span className="absolute left-2 top-2 z-10 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--paper)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Pin */}
                <span className="pin-dot" style={{ top: 8, right: 8 }} />

                {/* Hover caption — slides up from bottom */}
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-[var(--ink)] px-3 py-2 text-[var(--paper)] transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                    <span>{photo.district}</span>
                    <span className="text-[var(--post)]">{photo.time}</span>
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--paper)]/70">
                    {photo.building} · {photo.units}
                  </div>
                </div>

                {/* Hover ink-flash */}
                <span
                  aria-hidden
                  className="absolute inset-0 z-0 bg-[var(--post)] opacity-0 transition-opacity duration-500 group-hover:opacity-10 mix-blend-multiply"
                />
              </motion.figure>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          ACT III — HAND TO HAND — editorial split
         ─────────────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left — big handheld photo + secondary stacked */}
          <div className="col-span-12 lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease }}
              className="relative"
            >
              <Polaroid
                photo={handHero}
                caption={`${handHero.district} · ${handHero.building}`}
                treatment="duo-deep"
                aspect="3 / 4"
                width="100%"
                tilt={-0.8}
                showTape
                showPin
                className="w-full"
              />
              {/* Press stamp pinned to the photo */}
              <motion.div
                className="press-stamp absolute -bottom-3 right-6 z-10"
                initial={{ opacity: 0, scale: 1.5, rotate: 8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
              >
                <span className="h-1.5 w-1.5 bg-current" /> ON FILE
              </motion.div>
            </motion.div>

            {/* Secondary stacked polaroid — hangs below-left, smaller */}
            <motion.div
              className="absolute -bottom-10 -right-4 z-10 hidden w-44 md:block lg:w-56"
              initial={{ opacity: 0, y: 40, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 4 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
            >
              <Polaroid
                photo={doorHero}
                caption={`${doorHero.district} · entry`}
                treatment="duo"
                aspect="3 / 4"
                width="100%"
                showPin
              />
            </motion.div>
          </div>

          {/* Right — title, quote, attribution */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
                Act III — Hand to Hand
              </p>
              <h3
                className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] sm:text-6xl"
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1',
                }}
              >
                {handTitle}
              </h3>

              {/* Pulled quote */}
              <blockquote
                className="mt-10 relative pl-6 font-display text-2xl italic leading-tight text-[var(--ink)] sm:text-3xl"
                style={{
                  borderLeft: '3px solid var(--post)',
                }}
              >
                {handQuote}
                <footer className="mt-4 font-mono text-[10px] not-italic uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  {handQuoteAttribution}
                </footer>
              </blockquote>

              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {handCaption}
              </p>

              {/* Secondary metadata */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-[var(--ink)]/30 pt-4 max-w-md">
                {[
                  ['District', handHero.district],
                  ['Building', handHero.building],
                  ['Stamped', handHero.time],
                  ['GPS', handHero.coords],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      {k}
                    </span>
                    <span className="font-mono text-[10px] tabular text-[var(--ink)]">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────
          ACT IV — THE REEL — scroll-driven horizontal strip
         ─────────────────────────────────────────────────────────────────── */}
      <div ref={reelRef} className="relative overflow-hidden border-y border-[var(--ink)]/20 bg-[var(--paper-deep)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 mb-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
                Act IV — The Reel
              </p>
              <h3 className="mt-2 font-display text-3xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] lg:text-4xl">
                {reelTitle}
              </h3>
            </div>
            <p className="max-w-md font-display text-base italic leading-snug text-[var(--ink-soft)]">
              {reelCaption}
            </p>
          </div>
        </div>

        {/* Strip */}
        <motion.div
          className="flex gap-6 pl-10 pr-10 lg:gap-10 will-change-transform"
          style={{ x: reelX }}
        >
          {proofPhotos.map((photo, i) => {
            const tilts = [-2, -1, 1.5, -0.5, 2, -1.5, 1, -2.5, 0.5, -1, 2.5, -0.5, 1.5, -1.5];
            const widths = [200, 230, 210, 240, 200, 220, 210, 230, 200, 220, 240, 210, 230, 200];
            return (
              <motion.div
                key={photo.file}
                className="shrink-0"
                style={{
                  width: widths[i % widths.length],
                }}
                animate={{ y: [0, -4, 0, 3, 0] }}
                transition={{
                  duration: 6 + (i % 4),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i * 0.3) % 2,
                }}
              >
                <Polaroid
                  photo={photo}
                  treatment="duo"
                  aspect="4 / 5"
                  width="100%"
                  tilt={tilts[i % tilts.length]}
                  showPin={i % 3 === 0}
                  showTape={i % 5 === 0}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32"
          style={{
            background:
              'linear-gradient(90deg, var(--paper-deep), rgba(226,216,193,0))',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32"
          style={{
            background:
              'linear-gradient(270deg, var(--paper-deep), rgba(226,216,193,0))',
          }}
        />
      </div>

      {/* ── Closing: the deliverable, shown ─────────────────────────────
          A photograph of the printed dossier itself, paired with the CTA.
          This is the moment the prospect sees what they'll actually
          receive — not a placeholder, the real artefact. */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-28">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Photograph */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
          >
            <motion.figure
              className="card-paper card-paper-raised relative overflow-hidden"
              style={{ rotate: '-0.8deg' }}
              whileHover={{ rotate: 0, transition: { duration: 0.4, ease } }}
            >
              <div className="reg-mark" style={{ top: 10, left: 10 }} />
              <div className="reg-mark" style={{ top: 10, right: 10, left: 'auto' }} />
              <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--ink)]">
                <img
                  src={asset('/images/generated/dossier-spread-mockup.png')}
                  alt="Open printed dossier brochure — Delivery Manifest FILE №007"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover photo-duo"
                  draggable={false}
                />
              </div>
              {/* Photo caption strip */}
              <figcaption className="flex items-baseline justify-between border-t border-[var(--ink)] bg-[var(--paper-deep)] px-4 py-2.5 sm:px-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
                  The deliverable, photographed
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--post)]">
                  FILE №007 · A4 / 24 pp.
                </span>
              </figcaption>
            </motion.figure>
            {/* Press stamp diagonal over the photo */}
            <motion.div
              className="press-stamp absolute -bottom-4 left-6 z-20 text-[10px]"
              initial={{ opacity: 0, scale: 1.4, rotate: 8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <span className="h-1.5 w-1.5 bg-current" /> SAMPLE · FILE №007
            </motion.div>
          </motion.div>

          {/* Text + CTA */}
          <motion.div
            className="col-span-12 lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
              The deliverable
            </p>
            <h3 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] lg:text-5xl">
              Every campaign ends with
              <span className="text-[var(--post)] italic"> a dossier like this.</span>
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Printed and bound — or as a downloadable PDF. Either way, the
              same evidence inside.
            </p>

            {/* Includes list */}
            <ul className="mt-6 max-w-md border-y border-[var(--ink)] divide-y divide-[var(--ink)]/20 py-1">
              {dossierIncludes.map((item, idx) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 py-2"
                >
                  <span className="font-mono text-[10px] tabular text-[var(--ink-mute)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-[var(--ink)]">{item}</span>
                  <svg
                    viewBox="0 0 14 14"
                    className="h-3 w-3"
                    fill="none"
                    aria-hidden="true"
                    style={{ color: 'var(--post)' }}
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

            <div className="mt-8">
              <a href="#contact" className="btn-ink">
                {ctaLabel}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
