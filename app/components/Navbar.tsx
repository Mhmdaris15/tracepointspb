'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Locale } from '@/app/lib/content';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  logo: string;
  links: { label: string; href: string }[];
  cta: string;
  locale: Locale;
  langLabel: string;
  onLocaleToggle: () => void;
}

export default function Navbar({ logo, links, cta, locale, langLabel, onLocaleToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(8,11,20,${v * 0.88})`),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
      }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.8) 100%)',
                boxShadow: '0 0 20px rgba(139,92,246,0.4)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">{logo}</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher locale={locale} onToggle={onLocaleToggle} label={langLabel} />
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(59,130,246,0.9) 100%)',
                boxShadow: '0 0 20px rgba(139,92,246,0.3)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              {cta}
            </motion.a>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher locale={locale} onToggle={onLocaleToggle} label={langLabel} />
            <button
              className="flex flex-col gap-1.5 p-2 text-slate-400"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.span className="block h-0.5 w-6 bg-current" animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-0.5 w-6 bg-current" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
              <motion.span className="block h-0.5 w-6 bg-current" animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden md:hidden"
        >
          <div className="pb-6 pt-2 flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(59,130,246,0.9) 100%)' }}
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
