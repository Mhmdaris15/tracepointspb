'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

interface StatsSectionProps {
  eyebrow: string;
  headline: string;
  items: StatItem[];
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState('0');
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay(Math.round(latest).toLocaleString());
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const statColors = [
  { text: '#a78bfa', glow: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
  { text: '#60a5fa', glow: 'rgba(59,130,246,0.3)', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
  { text: '#34d399', glow: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  { text: '#f472b6', glow: 'rgba(244,114,182,0.3)', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)' },
];

export default function StatsSection({ eyebrow, headline, items }: StatsSectionProps) {
  const headlineLines = headline.split('\n');

  return (
    <section id="stats" className="relative px-6 py-32 lg:px-8">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-7xl">
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
                {i === 0 ? <span className="gradient-text-blue">{line}</span> : line}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const color = statColors[i % statColors.length];
            return (
              <motion.div
                key={item.label}
                className="relative group overflow-hidden rounded-2xl p-8 text-center"
                style={{
                  background: `linear-gradient(135deg, ${color.bg} 0%, rgba(8,11,20,0.7) 100%)`,
                  border: `1px solid ${color.border}`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${color.glow} 0%, transparent 70%)` }}
                />

                {/* Value */}
                <div
                  className="mb-2 text-5xl font-black lg:text-6xl"
                  style={{ color: color.text, textShadow: `0 0 30px ${color.glow}` }}
                >
                  {item.value === 0 ? (
                    <span>0</span>
                  ) : (
                    <AnimatedNumber value={item.value} suffix={item.suffix} />
                  )}
                </div>

                {/* Label */}
                <div className="mb-1 text-sm font-semibold text-white">{item.label}</div>

                {/* Description */}
                <div className="text-xs text-slate-500">{item.description}</div>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 h-16 w-16 rounded-bl-full opacity-20"
                  style={{ background: `radial-gradient(circle at top right, ${color.text} 0%, transparent 70%)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Divider visual */}
        <motion.div
          className="mt-16 mx-auto h-px max-w-3xl"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(59,130,246,0.4) 70%, transparent 100%)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Transparency call-out */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl rounded-2xl p-8 text-center"
          style={{
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.15)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4))' }} />
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-violet-400" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.4), transparent)' }} />
          </div>
          <p className="text-lg font-semibold text-white">
            100% Transparency. <span className="text-violet-400">No Black Boxes.</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Our direct distribution model eliminates intermediaries — you see exactly where your materials go, every single time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
