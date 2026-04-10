'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/app/lib/content';

type PlansProps = SiteContent['plans'];

const accentMap = {
  violet: {
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    glow: 'rgba(139,92,246,0.15)',
    badge: 'rgba(139,92,246,0.15)',
    badgeBorder: 'rgba(139,92,246,0.3)',
    text: '#a78bfa',
    btnBg: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
    btnShadow: 'rgba(124,58,237,0.4)',
    checkColor: '#a78bfa',
    iconBg: 'rgba(139,92,246,0.15)',
  },
  blue: {
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    glow: 'rgba(59,130,246,0.12)',
    badge: 'rgba(59,130,246,0.15)',
    badgeBorder: 'rgba(59,130,246,0.3)',
    text: '#60a5fa',
    btnBg: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
    btnShadow: 'rgba(37,99,235,0.4)',
    checkColor: '#60a5fa',
    iconBg: 'rgba(59,130,246,0.15)',
  },
};

function FlyerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PlansSection({ eyebrow, headline, subheadline, services }: PlansProps) {
  const headlineLines = headline.split('\n');

  return (
    <section id="plans" className="relative px-6 py-32 lg:px-8">
      {/* Bg accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)' }} />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            className="inline-block mb-4 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? (
                  <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {line}
                  </span>
                ) : line}
              </span>
            ))}
          </motion.h2>
          <motion.p
            className="mt-4 mx-auto max-w-2xl text-slate-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subheadline}
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => {
            const a = accentMap[service.accent];
            return (
              <motion.div
                key={service.title}
                className="relative group overflow-hidden rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${a.bg} 0%, rgba(8,11,20,0.85) 100%)`,
                  border: `1px solid ${a.border}`,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.01, y: -4 }}
              >
                {/* Top glow on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${a.text}, transparent)` }}
                />

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 h-48 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${a.glow} 0%, transparent 70%)`, transform: 'translate(20%, -20%)' }}
                />

                <div className="p-8 lg:p-10">
                  {/* Badge */}
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase"
                      style={{ background: a.badge, border: `1px solid ${a.badgeBorder}`, color: a.text }}
                    >
                      {service.badge}
                    </span>
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: a.iconBg, color: a.text }}
                    >
                      {service.icon === 'flyer' ? <FlyerIcon /> : <GlobeIcon />}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: a.text }}>
                    {service.subtitle}
                  </div>
                  <h3 className="mb-4 text-2xl font-black text-white lg:text-3xl">{service.title}</h3>
                  <p className="mb-8 text-sm leading-relaxed text-slate-400">{service.description}</p>

                  {/* Feature list */}
                  <ul className="mb-8 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: a.iconBg }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" style={{ color: a.checkColor }} aria-hidden="true">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.a
                    href={service.ctaHref}
                    className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-semibold text-white"
                    style={{
                      background: a.btnBg,
                      boxShadow: `0 0 30px ${a.btnShadow}`,
                    }}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 50px ${a.btnShadow}` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glint */}
                    <motion.span
                      className="absolute inset-0 -skew-x-12"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', x: '-100%' }}
                      whileHover={{ x: '300%' }}
                      transition={{ duration: 0.7 }}
                    />
                    {service.cta}
                    <svg viewBox="0 0 24 24" fill="none" className="ml-2 h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-8 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          All plans are custom-quoted based on your goals —{' '}
          <a href="#contact" className="text-violet-400 hover:text-violet-300 transition-colors">
            get in touch
          </a>{' '}
          for a free consultation.
        </motion.p>
      </div>
    </section>
  );
}
