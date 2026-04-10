'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  eyebrow: string;
  headline: string;
  steps: Step[];
}

export default function ProcessSection({ eyebrow, headline, steps }: ProcessProps) {
  const headlineLines = headline.split('\n');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="process" className="relative px-6 py-32 lg:px-8" ref={containerRef}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            className="inline-block mb-4 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
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
                  <span style={{ background: 'linear-gradient(135deg, #34d399, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {line}
                  </span>
                ) : line}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-8 top-0 bottom-0 w-px lg:left-1/2 lg:-translate-x-1/2" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #7c3aed 0%, #2563eb 50%, #059669 100%)',
                boxShadow: '0 0 10px rgba(124,58,237,0.5)',
              }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  className="relative grid grid-cols-[64px_1fr] gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12"
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Left side (desktop only, alternating) */}
                  <div className={`hidden lg:flex lg:justify-end lg:items-center ${isRight ? 'order-1' : 'order-3'}`}>
                    {!isRight && (
                      <StepCard step={step} index={i} align="right" />
                    )}
                  </div>

                  {/* Center node */}
                  <div className="relative flex justify-center items-start pt-1 lg:order-2 col-span-1">
                    <motion.div
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-black text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${['#7c3aed','#2563eb','#059669','#b45309'][i % 4]} 0%, ${['#4f46e5','#0284c7','#0d9488','#d97706'][i % 4]} 100%)`,
                        boxShadow: `0 0 20px ${['rgba(124,58,237,0.5)','rgba(37,99,235,0.5)','rgba(5,150,105,0.5)','rgba(180,83,9,0.5)'][i % 4]}`,
                        color: '#fff',
                      }}
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Right side content */}
                  <div className={`lg:flex lg:items-center ${isRight ? 'order-3' : 'order-1'}`}>
                    {/* Mobile always shows here; desktop shows based on alternating */}
                    <div className="lg:hidden">
                      <StepCard step={step} index={i} align="left" />
                    </div>
                    {isRight && (
                      <div className="hidden lg:block">
                        <StepCard step={step} index={i} align="left" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, align }: { step: Step; index: number; align: 'left' | 'right' }) {
  const colors = ['rgba(124,58,237,0.15)', 'rgba(37,99,235,0.15)', 'rgba(5,150,105,0.15)', 'rgba(180,83,9,0.15)'];
  const borders = ['rgba(124,58,237,0.25)', 'rgba(37,99,235,0.25)', 'rgba(5,150,105,0.25)', 'rgba(180,83,9,0.25)'];
  const accents = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24'];

  return (
    <div
      className={`max-w-sm rounded-2xl p-6 ${align === 'right' ? 'text-right' : 'text-left'}`}
      style={{
        background: `linear-gradient(135deg, ${colors[index % 4]} 0%, rgba(8,11,20,0.7) 100%)`,
        border: `1px solid ${borders[index % 4]}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="mb-2 text-sm font-semibold" style={{ color: accents[index % 4] }}>
        Step {step.number}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
    </div>
  );
}
