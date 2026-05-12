'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Locale, SiteContent } from '@/app/lib/content';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  logo: string;
  links: { label: string; href: string }[];
  cta: string;
  locale: Locale;
  langLabel: string;
  onLocaleToggle: () => void;
  manifest: SiteContent['manifest'];
}

/**
 * Editorial masthead. Two stacked rules:
 *   1. A slim metadata strip with the file number and postmark date.
 *   2. The actual nav — serif wordmark + monospace links + ink CTA.
 * Compresses on scroll into a single condensed bar.
 */
export default function Navbar({
  logo,
  links,
  cta,
  locale,
  langLabel,
  onLocaleToggle,
  manifest,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const stripHeight = useTransform(scrollY, [0, 60], [28, 0]);
  const stripOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(236, 228, 210, ${v})`
        ),
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(26,23,20,0.2)',
      }}
    >
      {/* ── Top metadata strip ────────────────────────────────────────────── */}
      <motion.div
        style={{ height: stripHeight, opacity: stripOpacity }}
        className="overflow-hidden border-b border-[var(--ink)]/15 bg-[var(--paper)]"
      >
        <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            <span className="hidden sm:inline">{manifest.number}</span>
            <span className="hidden md:inline opacity-50">·</span>
            <span className="hidden md:inline">{manifest.postmark}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--post)]">
            <span className="hidden sm:inline">{manifest.filed}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--post)] animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>
      </motion.div>

      {/* ── Main bar ─────────────────────────────────────────────────────── */}
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Wordmark — serif logotype with a dot leader */}
          <a href="#" className="flex items-baseline gap-2.5">
            <span className="font-display text-[22px] font-black leading-none tracking-[-0.04em] text-[var(--ink)]">
              {logo.split(' ')[0]}
              <span className="text-[var(--post)]">.</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
              {logo.split(' ').slice(1).join(' ')}
            </span>
          </a>

          {/* Desktop links — monospace, with index numerals */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink)] transition-colors hover:text-[var(--post)]"
              >
                <span className="text-[9px] text-[var(--ink-mute)] group-hover:text-[var(--post)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              onToggle={onLocaleToggle}
              label={langLabel}
            />
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
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              onToggle={onLocaleToggle}
              label={langLabel}
            />
            <button
              className="flex h-9 w-9 items-center justify-center border border-[var(--ink)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-px w-4 bg-[var(--ink)]"
                animate={isOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute block h-px w-4 bg-[var(--ink)]"
                animate={isOpen ? { rotate: -45, y: 2 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden md:hidden"
        >
          <div className="border-t border-[var(--ink)]/15 py-4 flex flex-col gap-4">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink)] hover:text-[var(--post)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-[9px] text-[var(--ink-mute)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-ink w-fit"
              onClick={() => setIsOpen(false)}
            >
              {cta}
            </a>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
