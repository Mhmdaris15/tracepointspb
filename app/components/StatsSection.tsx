'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RegistrationMark from './RegistrationMark';
import { asset } from '@/app/lib/paths';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

interface StatsSectionProps {
  eyebrow: string;
  headline: string;
  ledgerLabel: string;
  totalLabel: string;
  items: StatItem[];
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    if (value === 0) {
      el.textContent = `0${suffix}`;
      return;
    }

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2.2,
      ease: 'power3.out',
      paused: true,
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toLocaleString() + suffix;
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="figure-xl tabular">
      0{suffix}
    </span>
  );
}

export default function StatsSection({
  eyebrow,
  headline,
  ledgerLabel,
  totalLabel,
  items,
}: StatsSectionProps) {
  const headlineLines = headline.split('\n');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ledgerImgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative border-t border-[var(--ink)]/20 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-14 grid grid-cols-12 gap-6 lg:mb-20">
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
                {i === 1 ? <em className="not-italic text-[var(--post)]">{l}</em> : l}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Ledger photographic banner — a real ledger being written, the
            origin of the numbers tabulated below */}
        <motion.div
          className="relative mb-0 overflow-hidden border border-[var(--ink)] border-b-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative aspect-[16/6] w-full sm:aspect-[16/4]">
            <motion.img
              src={asset('/images/generated/ledger-page-detail.png')}
              alt="Hand writing campaign serial numbers in a paper ledger"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-[120%] w-full object-cover photo-duo"
              style={{ y: ledgerImgY }}
              draggable={false}
            />
            {/* Soft cream wash on the right so type sits cleanly */}
            <div
              className="absolute inset-y-0 right-0 w-2/3 sm:w-1/2"
              style={{
                background:
                  'linear-gradient(270deg, rgba(236,228,210,0.96) 25%, rgba(236,228,210,0.6) 60%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-10">
              <div className="max-w-md text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
                  Originating Record
                </p>
                <p className="mt-2 font-display text-2xl italic leading-tight text-[var(--ink)] sm:text-3xl">
                  Every figure below started its life on a paper line.
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  Ledger №2026-Q2 · last entry 17:48 MSK
                </p>
              </div>
            </div>
            <div className="reg-mark" style={{ top: 10, left: 10 }} />
            <div className="reg-mark" style={{ top: 10, right: 10, left: 'auto' }} />
          </div>
        </motion.div>

        {/* Ledger card */}
        <motion.div
          className="card-paper card-paper-raised relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          {/* Faint engraved map watermark — sits behind all rows at low
              opacity, anchors the ledger geographically to the city */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              backgroundImage: `url(${asset('/images/generated/map-spb-engraved.png')})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right -10% center',
              opacity: 0.08,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Registration corners */}
          <div className="reg-mark" style={{ top: 10, left: 10 }} />
          <div className="reg-mark" style={{ top: 10, right: 10, left: 'auto' }} />
          <div className="reg-mark" style={{ bottom: 10, left: 10 }} />
          <div
            className="reg-mark"
            style={{ bottom: 10, right: 10, left: 'auto' }}
          />

          {/* Top filing bar */}
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink)] bg-[var(--paper-deep)] px-6 py-3 sm:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
              <RegistrationMark size={11} />
              <span>{ledgerLabel}</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--post)]">
              CERTIFIED · TRACEPOINT SPB
            </div>
          </header>

          {/* Rows */}
          <ol className="divide-y divide-[var(--ink)]">
            {items.map((item, i) => (
              <motion.li
                key={item.label}
                className="grid grid-cols-12 items-center gap-4 px-6 py-8 sm:px-10 sm:py-10 transition-colors hover:bg-[var(--paper-deep)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                {/* Numeric prefix */}
                <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  L.{String(i + 1).padStart(2, '0')}
                </span>

                {/* Massive figure */}
                <span className="col-span-5 text-[var(--ink)] text-[14vw] sm:text-[10vw] lg:text-[6vw]">
                  {item.value === 0 ? (
                    <span className="figure-xl tabular">0</span>
                  ) : (
                    <AnimatedNumber value={item.value} suffix={item.suffix} />
                  )}
                </span>

                {/* Label */}
                <div className="col-span-5">
                  <p className="font-display text-xl font-bold leading-tight text-[var(--ink)] lg:text-2xl">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    {item.description}
                  </p>
                </div>

                {/* Verified stamp */}
                <div className="col-span-1 hidden justify-end sm:flex">
                  <span
                    className="rotate-[-6deg] border border-[var(--post)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--post)]"
                  >
                    VER
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Totals bar */}
          <footer className="grid grid-cols-12 items-center gap-4 border-t-2 border-double border-[var(--ink)] bg-[var(--ink)] px-6 py-6 sm:px-10">
            <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]/70">
              SUM
            </span>
            <span className="col-span-5 font-display text-[6vw] sm:text-[4vw] font-black leading-none tracking-[-0.04em] text-[var(--paper)] lg:text-3xl">
              {totalLabel}
            </span>
            <span className="col-span-6 text-right font-display text-2xl font-black leading-tight tracking-[-0.02em] text-[var(--paper)] lg:text-3xl">
              100% transparency.
              <span className="block text-[var(--post)] italic">
                No black boxes.
              </span>
            </span>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
