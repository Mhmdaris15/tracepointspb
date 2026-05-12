'use client';

import { tickerItems } from '@/app/lib/content';

/**
 * Continuous horizontal marquee of district codes, GPS coords and route IDs.
 * Reads as live telemetry beneath the masthead — sits in the spirit of a
 * stock ticker or newsroom wire, executed in tabular monospace on cream.
 */
export default function Ticker({
  speed = 60,
  variant = 'ink',
}: {
  speed?: number;
  variant?: 'ink' | 'post';
}) {
  const items = tickerItems.concat(tickerItems); // duplicate for seamless loop
  const color = variant === 'post' ? 'var(--post)' : 'var(--ink)';

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--ink)]/30 bg-[var(--paper)]"
      style={{ ['--ticker-speed' as string]: `${speed}s` }}
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            'linear-gradient(90deg, var(--paper), rgba(236,228,210,0))',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            'linear-gradient(270deg, var(--paper), rgba(236,228,210,0))',
        }}
      />

      <div
        className="ticker-track py-2.5 text-[11px] font-mono uppercase tracking-[0.22em]"
        style={{ color, animationDuration: `${speed}s` }}
      >
        {items.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <svg
              viewBox="0 0 12 12"
              className="h-2 w-2 shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="0" y="5" width="12" height="2" />
              <rect x="5" y="0" width="2" height="12" />
            </svg>
            <span>{it}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
