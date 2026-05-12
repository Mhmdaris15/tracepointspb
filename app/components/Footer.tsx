'use client';

import { motion } from 'framer-motion';
import { contact } from '@/app/lib/content';
import type { SiteContent } from '@/app/lib/content';
import RegistrationMark from './RegistrationMark';
import { asset } from '@/app/lib/paths';

type FooterProps = SiteContent['footer'] & {
  manifest: SiteContent['manifest'];
};

/**
 * Magazine colophon footer. Three columns of metadata, double-rule above,
 * registration marks at corners. The bottom row carries the imprint —
 * deliberately small, deliberately precise.
 */
export default function Footer({
  logo,
  tagline,
  links,
  copyright,
  contactLabel,
  manifest,
}: FooterProps) {
  return (
    <footer className="relative border-t-2 border-double border-[var(--ink)] bg-[var(--paper)] px-6 py-14 lg:px-10 lg:py-20">
      {/* Corners */}
      <RegistrationMark
        size={14}
        className="absolute top-4 left-4"
        color="var(--ink)"
      />
      <RegistrationMark
        size={14}
        className="absolute top-4 right-4"
        color="var(--ink)"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Postal medallion — engraved decorative crest, the kind of
            ornament a printed publication uses to close its colophon. */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={asset('/images/generated/decorative-postal-mark.png')}
            alt="TracePoint SPB delivery manifest verified medallion"
            loading="lazy"
            decoding="async"
            className="h-32 w-32 sm:h-40 sm:w-40"
            style={{ mixBlendMode: 'multiply' }}
            draggable={false}
          />
        </motion.div>

        {/* Massive colophon wordmark */}
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
            COLOPHON · {manifest.edition}
          </p>
          <h2
            className="mt-2 font-display text-[18vw] sm:text-[14vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.05em] text-[var(--ink)]"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 90, "WONK" 1',
            }}
          >
            TracePoint
            <span className="text-[var(--post)]">.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
              {logo} — Studio
            </p>
            <p className="mt-4 max-w-sm font-display text-lg italic leading-snug text-[var(--ink-soft)]">
              {tagline}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--paper-deep)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  d="M8 14s-5-4.5-5-8a5 5 0 1110 0c0 3.5-5 8-5 8z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="8" cy="6" r="1.5" fill="currentColor" />
              </svg>
              {contact.location}
            </div>
          </div>

          {/* Index */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              Index
            </p>
            <ul className="space-y-2">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-baseline gap-2 text-[var(--ink)] transition-colors hover:text-[var(--post)]"
                  >
                    <span className="font-mono text-[9px] tabular text-[var(--ink-mute)] group-hover:text-[var(--post)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-base">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Correspondence */}
          <div className="md:col-span-4">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              {contactLabel}
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-baseline justify-between gap-2 border-b border-dashed border-[var(--ink)]/30 pb-2 transition-colors hover:border-[var(--post)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  Email
                </span>
                <span className="font-display text-sm text-[var(--ink)] group-hover:text-[var(--post)]">
                  {contact.email}
                </span>
              </a>
              <a
                href={contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-2 border-b border-dashed border-[var(--ink)]/30 pb-2 transition-colors hover:border-[var(--post)]"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  Telegram
                </span>
                <span className="font-display text-sm text-[var(--ink)] group-hover:text-[var(--post)]">
                  {contact.telegram}
                </span>
              </a>
              <div className="flex items-baseline justify-between gap-2 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  Coords
                </span>
                <span className="font-mono text-sm text-[var(--ink)]">
                  {contact.coords}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--ink)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            {copyright}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            SET IN <span className="text-[var(--ink)]">FRAUNCES</span> ·{' '}
            <span className="text-[var(--ink)]">INSTRUMENT SANS</span> ·{' '}
            <span className="text-[var(--ink)]">JETBRAINS MONO</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            Made on the ground · St. Petersburg
          </p>
        </div>
      </div>

      {/* Bottom corners */}
      <RegistrationMark
        size={14}
        className="absolute bottom-4 left-4"
        color="var(--ink)"
      />
      <RegistrationMark
        size={14}
        className="absolute bottom-4 right-4"
        color="var(--ink)"
      />
    </footer>
  );
}
