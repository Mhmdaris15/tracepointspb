'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotateAmount?: number;
  scale?: number;
  glareColor?: string;
}

export default function TiltedCard({
  children,
  className,
  style,
  rotateAmount = 14,
  scale = 1.03,
  glareColor = 'rgba(255,255,255,0.08)',
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [rotateAmount, -rotateAmount]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-rotateAmount, rotateAmount]);
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.3, ease: 'easeOut' } }}
    >
      <div style={{ transform: 'translateZ(40px)', height: '100%' }}>
        {children}
      </div>

      {/* Glare layer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, ${glareColor}, transparent 50%)`,
          ),
          mixBlendMode: 'plus-lighter',
        }}
      />
    </motion.div>
  );
}
