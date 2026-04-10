'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  eyebrow: string;
  headline: string;
  headlineSuffix: string;
  subheadline: string;
  cta: string;
  ctaSecondary: string;
  badge: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function HeroSection({
  eyebrow,
  headline,
  headlineSuffix,
  subheadline,
  cta,
  ctaSecondary,
  badge,
}: HeroProps) {
  const headlineLines = headline.split('\n');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Decorative ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.06)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1100px',
          height: '1100px',
          borderRadius: '50%',
          border: '1px solid rgba(59,130,246,0.04)',
        }}
      />

      <motion.div
        className="relative mx-auto max-w-5xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow badge */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#a78bfa',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }}
            />
            {eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="mb-6">
          <span className="block text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? (
                  <span className="gradient-text">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </span>
          <span
            className="block text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ color: 'rgba(226,232,240,0.85)' }}
          >
            {headlineSuffix}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.a
            href="#contact"
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
              boxShadow: '0 0 40px rgba(124,58,237,0.4), 0 4px 24px rgba(0,0,0,0.4)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(124,58,237,0.6), 0 4px 24px rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glint overlay */}
            <motion.span
              className="absolute inset-0 -skew-x-12"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '300%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {cta}
          </motion.a>

          <motion.a
            href="#process"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-slate-300 transition-colors hover:text-white"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            {ctaSecondary}
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Trust badge */}
        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                'bg-violet-500',
                'bg-blue-500',
                'bg-emerald-500',
                'bg-orange-500',
                'bg-pink-500',
              ].map((color, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-full border-2 border-slate-900 ${color} flex items-center justify-center text-[9px] font-bold text-white`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-500">{badge}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] tracking-widest uppercase text-slate-600">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-600" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
