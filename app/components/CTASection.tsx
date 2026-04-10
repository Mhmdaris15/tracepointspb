'use client';

import { motion } from 'framer-motion';
import { contact } from '@/app/lib/content';
import type { SiteContent } from '@/app/lib/content';

type CTAProps = SiteContent['cta'];

export default function CTASection({ headline, subheadline, emailLabel, telegramLabel, orLabel }: CTAProps) {
  const headlineLines = headline.split('\n');

  return (
    <section id="contact" className="relative px-6 py-32 lg:px-8">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 65%)' }}
      />

      <div className="mx-auto max-w-4xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.06) 50%, rgba(8,11,20,0.9) 100%)',
            border: '1px solid rgba(139,92,246,0.18)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Corner glows */}
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(139,92,246,0.18) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at bottom right, rgba(59,130,246,0.12) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
          <div className="absolute top-0 left-1/4 right-1/4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />

          {/* Floating icon */}
          <motion.div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(37,99,235,0.25) 100%)', border: '1px solid rgba(139,92,246,0.25)' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9 text-violet-300" aria-hidden="true">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Headline */}
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? <span className="gradient-text">{line}</span> : line}
              </span>
            ))}
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400 leading-relaxed">{subheadline}</p>

          {/* Contact buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Telegram */}
            <motion.a
              href={contact.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-7 py-4 text-sm font-semibold text-white sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, #0088cc 0%, #006ba6 100%)',
                boxShadow: '0 0 30px rgba(0,136,204,0.4)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0,136,204,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 -skew-x-12"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', x: '-100%' }}
                whileHover={{ x: '300%' }}
                transition={{ duration: 0.6 }}
              />
              {/* Telegram SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
              </svg>
              <span>
                <span className="block text-[10px] font-normal opacity-75 text-left">{telegramLabel}</span>
                <span className="block">{contact.telegram}</span>
              </span>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-7 py-4 text-sm font-semibold text-white sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.85) 0%, rgba(37,99,235,0.85) 100%)',
                boxShadow: '0 0 30px rgba(124,58,237,0.35)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(124,58,237,0.55)' }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 -skew-x-12"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', x: '-100%' }}
                whileHover={{ x: '300%' }}
                transition={{ duration: 0.6 }}
              />
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                <span className="block text-[10px] font-normal opacity-75 text-left">{emailLabel}</span>
                <span className="block">{contact.email}</span>
              </span>
            </motion.a>
          </div>

          {/* Or divider */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs text-slate-500">{orLabel}</span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Direct contact info */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-violet-400" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-slate-400">{contact.email}</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-400" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
              </svg>
              <span className="text-slate-400">{contact.telegram}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
