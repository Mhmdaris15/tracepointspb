'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  splitBy?: 'chars' | 'words';
  delay?: number;
  duration?: number;
  stagger?: number;
  yFrom?: number;
}

export default function SplitTextReveal({
  text,
  className,
  splitBy = 'chars',
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
  yFrom = 60,
}: SplitTextRevealProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('[data-split-item]');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: yFrom, opacity: 0, rotateX: -25 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      });
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration, stagger, yFrom]);

  const tokens =
    splitBy === 'chars'
      ? Array.from(text).map((ch, i) => ({ ch, i, isSpace: ch === ' ' }))
      : text
          .split(/(\s+)/)
          .map((w, i) => ({ ch: w, i, isSpace: /^\s+$/.test(w) }));

  return (
    <span
      ref={wrapperRef}
      className={className}
      style={{ display: 'inline-block', perspective: 800 }}
      aria-label={text}
    >
      {tokens.map(({ ch, i, isSpace }) =>
        isSpace ? (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ) : (
          <span
            key={i}
            data-split-item
            aria-hidden="true"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
