'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  href,
  className,
  style,
  strength = 0.35,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const onMove: EventListener = (event) => {
      const e = event as MouseEvent;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.6, ease: 'power3.out' });
      gsap.to(inner, {
        x: dx * 0.4,
        y: dy * 0.4,
        duration: 0.6,
        ease: 'power3.out',
      });
    };
    const onLeave: EventListener = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([el, inner]);
    };
  }, [strength]);

  const content = (
    <span ref={innerRef} className="relative inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={{ display: 'inline-flex', willChange: 'transform', ...style }}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform', ...style }}
    >
      {content}
    </button>
  );
}
