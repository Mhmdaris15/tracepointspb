'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RegistrationMark from './RegistrationMark';
import { asset } from '@/app/lib/paths';
import { proofPhotos } from '@/app/lib/content';

/** Stages that get a small photo evidence sticker. Steps 03 & 04 are the
 *  delivery and proof-of-delivery stages — pinning a real photo there
 *  ties the abstract process directly to the dossier downstream. */
const stageEvidence: Record<number, { file: string; tilt: number }> = {
  2: { file: proofPhotos.find((p) => p.file === 'photo_2026-05-12_00-59-58.jpg')!.file, tilt: -3 },
  3: { file: proofPhotos.find((p) => p.file === 'photo_2026-05-12_01-00-22.jpg')!.file, tilt: 4 },
};

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  eyebrow: string;
  headline: string;
  routePrefix: string;
  stamps: string[];
  steps: Step[];
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ProcessSection({
  eyebrow,
  headline,
  routePrefix,
  stamps,
  steps,
}: ProcessProps) {
  const headlineLines = headline.split('\n');
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative border-t border-[var(--ink)]/20 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-14 grid grid-cols-12 gap-6 lg:mb-24">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              <span className="h-px w-6 bg-[var(--ink)]" />
              <span>{eyebrow}</span>
            </div>
          </div>
          <motion.h2
            className="col-span-12 lg:col-span-8 font-display text-[12vw] sm:text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-[-0.04em] text-[var(--ink)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1' }}
          >
            {headlineLines.map((l, i) => (
              <span key={i} className="block">
                {i === 0 ? l : <em className="not-italic text-[var(--post)]">{l}</em>}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Itinerary header bar */}
        <div className="card-manila relative mb-8 flex flex-wrap items-center justify-between gap-3 border-b-0 px-6 py-3 sm:px-8">
          <div className="reg-mark" style={{ top: 8, left: 8 }} />
          <div className="reg-mark" style={{ top: 8, right: 8, left: 'auto' }} />
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
            <RegistrationMark size={11} />
            <span>{routePrefix} · 04 — Tsentralny</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
            STAGES {String(steps.length).padStart(2, '0')} · DURATION ~11H
          </div>
        </div>

        {/* Timeline */}
        <div className="relative card-paper card-paper-raised">
          {/* Track */}
          <div
            className="absolute left-[68px] top-12 bottom-12 w-px lg:left-[120px]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, var(--ink) 0 6px, transparent 6px 12px)',
              backgroundSize: '1px 12px',
              backgroundRepeat: 'repeat-y',
            }}
          >
            <div
              ref={fillRef}
              className="absolute top-0 left-0 w-px"
              style={{
                background: 'var(--post)',
                boxShadow: '0 0 0 1.5px var(--post)',
              }}
            />
          </div>

          {/* Stops */}
          <ol className="relative">
            {steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="grid grid-cols-[88px_1fr] gap-4 border-b border-[var(--ink)]/15 px-4 py-8 last:border-b-0 sm:gap-8 sm:px-6 sm:py-10 lg:grid-cols-[140px_1fr]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                {/* Stamped node + time */}
                <div className="relative flex flex-col items-center pt-2">
                  <span
                    className="relative z-10 flex h-12 w-12 items-center justify-center border-2 border-[var(--ink)] bg-[var(--paper)] font-display text-base font-black text-[var(--ink)]"
                    style={{
                      boxShadow: '3px 3px 0 0 var(--ink)',
                    }}
                  >
                    {step.number}
                  </span>
                  <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--post)]">
                    {stamps[i] ?? ''}
                  </span>
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                    MSK
                  </span>
                </div>

                {/* Card content */}
                <div className="relative pt-1 pr-0 sm:pr-32 lg:pr-40">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                    <span>STAGE {step.number}</span>
                    <span className="h-px w-8 bg-[var(--ink)]/30" />
                    <span>SIGNED</span>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-black leading-[0.95] tracking-[-0.03em] text-[var(--ink)] sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {step.description}
                  </p>
                  {/* Footnote marginalia */}
                  <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                    <span>F.{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px flex-1 bg-[var(--ink)]/30" />
                    {stageEvidence[i] && (
                      <a href="#proof" className="text-[var(--post)] underline-offset-2 hover:underline">
                        SEE EXHIBIT →
                      </a>
                    )}
                  </div>

                  {/* Pinned evidence — small polaroid stuck to the right
                      margin on stages where a photograph is part of the work */}
                  {stageEvidence[i] && (
                    <motion.figure
                      className="polaroid hidden sm:block absolute -top-1 right-0 w-28 lg:w-36"
                      style={{ transform: `rotate(${stageEvidence[i].tilt}deg)` }}
                      initial={{ opacity: 0, y: 30, rotate: stageEvidence[i].tilt + 6 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        rotate: stageEvidence[i].tilt,
                      }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.9, delay: 0.2, ease }}
                      whileHover={{ rotate: 0, scale: 1.04, y: -3, transition: { duration: 0.4 } }}
                    >
                      <span
                        className="tape"
                        style={{ top: -10, left: '50%', transform: 'translateX(-50%) rotate(-3deg)', width: 50, height: 14 }}
                      />
                      <div
                        className="relative overflow-hidden photo-grain"
                        style={{ aspectRatio: '4 / 5', background: '#1a1714' }}
                      >
                        <img
                          src={asset(`/images/${stageEvidence[i].file}`)}
                          alt={`Evidence — stage ${step.number}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover photo-duo"
                          draggable={false}
                        />
                      </div>
                      <figcaption className="absolute bottom-1 left-2 right-2 flex items-baseline justify-between">
                        <span className="photo-caption text-[8px]">№{step.number}</span>
                        <span className="photo-caption text-[8px]" style={{ color: 'var(--post)' }}>
                          {stamps[i] ?? ''}
                        </span>
                      </figcaption>
                    </motion.figure>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
