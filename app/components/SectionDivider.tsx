'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { asset } from '@/app/lib/paths';
import RegistrationMark from './RegistrationMark';

type Treatment = 'duo' | 'duo-deep' | 'noir';

interface SectionDividerProps {
  /** Path inside /public, e.g. "/images/generated/foo.png" */
  image: string;
  alt: string;
  kicker: string;       // e.g. "ACT — between"
  headline: string;     // larger serif statement
  caption?: string;     // small italic line
  metaLeft?: string;    // top-left mono line
  metaRight?: string;   // top-right mono line
  treatment?: Treatment;
  /** Where text aligns on the photo */
  align?: 'left' | 'right';
  /** Foreground tone — light text on dark photo or vice-versa */
  tone?: 'light' | 'dark';
  /** Minimum height in vh on desktop */
  heightVh?: number;
}

/**
 * SectionDivider — full-bleed parallax band between page sections.
 * One large image, scroll-driven Y translate (-8% → 8%), gradient scrim
 * for legibility, and a single typographic statement aligned to the
 * bottom corner. Designed to feel like a magazine pull-page that breaks
 * the column rhythm.
 */
export default function SectionDivider({
  image,
  alt,
  kicker,
  headline,
  caption,
  metaLeft,
  metaRight,
  treatment = 'duo',
  align = 'left',
  tone = 'light',
  heightVh = 70,
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.0]);

  const filterClass =
    treatment === 'duo-deep'
      ? 'photo-duo-deep'
      : treatment === 'noir'
        ? 'photo-noir'
        : 'photo-duo';

  const textColor = tone === 'light' ? 'var(--paper)' : 'var(--ink)';
  const kickerColor = tone === 'light' ? 'var(--post)' : 'var(--post)';
  const metaMute =
    tone === 'light' ? 'rgba(236,228,210,0.7)' : 'rgba(26,23,20,0.55)';

  const scrimGradient =
    tone === 'light'
      ? align === 'left'
        ? 'linear-gradient(90deg, rgba(8,7,10,0.78) 0%, rgba(8,7,10,0.5) 35%, rgba(8,7,10,0.0) 70%)'
        : 'linear-gradient(270deg, rgba(8,7,10,0.78) 0%, rgba(8,7,10,0.5) 35%, rgba(8,7,10,0.0) 70%)'
      : align === 'left'
        ? 'linear-gradient(90deg, rgba(236,228,210,0.92) 0%, rgba(236,228,210,0.6) 40%, rgba(236,228,210,0.0) 75%)'
        : 'linear-gradient(270deg, rgba(236,228,210,0.92) 0%, rgba(236,228,210,0.6) 40%, rgba(236,228,210,0.0) 75%)';

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border-y border-[var(--ink)]/40"
      style={{
        minHeight: 420,
        height: `${heightVh}vh`,
        background: tone === 'light' ? '#08070a' : 'var(--paper)',
      }}
    >
      {/* Photo with parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y, scale }}
      >
        <img
          src={asset(image)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${filterClass}`}
          draggable={false}
        />
      </motion.div>

      {/* Scrim — directional, so the text side stays legible without
          flattening the whole image */}
      <div className="pointer-events-none absolute inset-0" style={{ background: scrimGradient }} />

      {/* Top meta strip */}
      {(metaLeft || metaRight) && (
        <div
          className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-10"
          style={{ color: textColor }}
        >
          {metaLeft && (
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
              <RegistrationMark size={12} color={textColor} />
              <span style={{ opacity: 0.75 }}>{metaLeft}</span>
            </div>
          )}
          {metaRight && (
            <div
              className="font-mono text-[10px] uppercase tracking-[0.24em]"
              style={{ opacity: 0.75 }}
            >
              {metaRight}
            </div>
          )}
        </div>
      )}

      {/* Bottom typographic statement */}
      <div
        className={`absolute inset-x-0 bottom-0 flex p-6 sm:p-12 ${
          align === 'right' ? 'justify-end text-right' : 'justify-start text-left'
        }`}
      >
        <motion.div
          className="max-w-[28ch] sm:max-w-[34ch]"
          style={{ color: textColor }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: kickerColor }}
          >
            {kicker}
          </p>
          <h3
            className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
            }}
          >
            <em className="not-italic">{headline}</em>
          </h3>
          {caption && (
            <p
              className="mt-4 font-display text-base italic leading-snug sm:text-lg"
              style={{ color: metaMute }}
            >
              {caption}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
