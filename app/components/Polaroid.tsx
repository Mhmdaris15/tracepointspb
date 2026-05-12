'use client';

import { motion, type MotionStyle } from 'framer-motion';
import { asset } from '@/app/lib/paths';
import type { ProofPhoto } from '@/app/lib/content';

interface PolaroidProps {
  photo: ProofPhoto;
  caption?: string;
  /** Photo treatment — duotone variant */
  treatment?: 'duo' | 'duo-deep' | 'noir' | 'raw';
  /** Width in any CSS unit */
  width?: string | number;
  /** Aspect ratio for the photo area, e.g. "4 / 5" */
  aspect?: string;
  /** Visual tilt in degrees */
  tilt?: number;
  /** Optional small tape strip at the top */
  showTape?: boolean;
  /** Optional small pin dot */
  showPin?: boolean;
  /** Additional class names on the outer card */
  className?: string;
  /** Lift on hover */
  lift?: boolean;
  /** Loading priority for the image */
  priority?: boolean;
  style?: MotionStyle;
}

/**
 * Polaroid — framed photograph with a caption strip and optional tape pin.
 * The whole card lifts and de-tilts on hover, like an item being inspected
 * on a corkboard. Caption is shown in mono on the cream stock below.
 */
export default function Polaroid({
  photo,
  caption,
  treatment = 'duo',
  width,
  aspect = '4 / 5',
  tilt = 0,
  showTape = false,
  showPin = false,
  className = '',
  lift = true,
  priority = false,
  style,
}: PolaroidProps) {
  const filterClass =
    treatment === 'duo-deep'
      ? 'photo-duo-deep'
      : treatment === 'noir'
        ? 'photo-noir'
        : treatment === 'raw'
          ? ''
          : 'photo-duo';

  return (
    <motion.figure
      className={`polaroid ${className}`}
      style={{
        width,
        rotate: `${tilt}deg`,
        ...style,
      }}
      whileHover={
        lift
          ? { y: -8, rotate: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
    >
      {showTape && (
        <span
          className="tape"
          style={{
            top: -10,
            left: '50%',
            transform: 'translateX(-50%) rotate(-2deg)',
          }}
        />
      )}
      {showPin && <span className="pin-dot" style={{ top: 14, right: 14 }} />}
      <div
        className="relative overflow-hidden photo-grain"
        style={{ aspectRatio: aspect, background: '#1a1714' }}
      >
        <img
          src={asset(`/images/${photo.file}`)}
          alt={`${photo.district} · ${photo.building}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${filterClass}`}
          draggable={false}
        />
      </div>
      <figcaption className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between text-[var(--ink)]">
        <span className="photo-caption">
          {caption ?? `${photo.district} · ${photo.building}`}
        </span>
        <span className="photo-caption" style={{ color: 'var(--post)' }}>
          {photo.time}
        </span>
      </figcaption>
    </motion.figure>
  );
}
