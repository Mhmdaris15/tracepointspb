'use client';

/**
 * Print registration mark — a crosshair-in-circle used in offset printing to
 * align color plates. Here it lives in card corners as a quiet metadata
 * signature, the kind of detail that announces "this was printed".
 */
export default function RegistrationMark({
  size = 14,
  className = '',
  color = 'currentColor',
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      className={className}
      aria-hidden="true"
      style={{ color }}
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.8" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
