'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/app/lib/content';

interface Props {
  locale: Locale;
  onToggle: () => void;
  label: string; // the OTHER language label to show
}

export default function LanguageSwitcher({ locale, onToggle, label }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#94a3b8',
      }}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(139,92,246,0.4)',
        color: '#e2e8f0',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${label}`}
    >
      {/* Active locale */}
      <AnimatePresence mode="wait">
        <motion.span
          key={locale}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {locale.toUpperCase()}
        </motion.span>
      </AnimatePresence>

      <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>

      <span style={{ color: 'rgba(139,92,246,0.7)' }}>{label}</span>
    </motion.button>
  );
}
