'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/app/lib/content';

interface Props {
  locale: Locale;
  onToggle: () => void;
  label: string; // the OTHER language label to show
}

/**
 * Paper-aesthetic language toggle. Reads like a stamped department box on
 * a customs form — current locale on the left, alternate on the right with
 * a hard rule between. No glassmorphism. No glow.
 */
export default function LanguageSwitcher({ locale, onToggle, label }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className="group inline-flex items-stretch border border-[var(--ink)] font-mono text-[10px] uppercase tracking-[0.22em]"
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
      aria-label={`Switch to ${label}`}
    >
      <span className="flex items-center justify-center bg-[var(--ink)] px-2.5 py-1.5 text-[var(--paper)]">
        <AnimatePresence mode="wait">
          <motion.span
            key={locale}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.16 }}
            className="block"
          >
            {locale.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="flex items-center justify-center bg-[var(--paper)] px-2.5 py-1.5 text-[var(--ink-mute)] transition-colors group-hover:text-[var(--post)]">
        {label}
      </span>
    </motion.button>
  );
}
