'use client';

import { asset } from '@/app/lib/paths';

/**
 * Paper backdrop. Real photographed cream-paper texture tiled at 480px,
 * layered over the cream base with a soft horizontal dye-wash, vertical
 * fold crease, and inkline margins. The tile gives the page genuine fiber
 * detail that no SVG noise can fake.
 */
export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base paper colour */}
      <div className="absolute inset-0 bg-[var(--paper)]" />

      {/* Real paper fiber tile — multiply-blended so it stains the page */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${asset('/images/generated/paper-texture-fibrous.png')})`,
          backgroundSize: '480px 480px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'multiply',
          opacity: 0.55,
        }}
      />

      {/* Subtle horizontal cream gradient — uneven dye */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 35%, rgba(255,247,229,0.4) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(180,160,120,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Center fold — a faint vertical crease, like a folded broadsheet */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(26,23,20,0.06) 20%, rgba(26,23,20,0.10) 50%, rgba(26,23,20,0.06) 80%, transparent)',
        }}
      />

      {/* Ink margins — faint top and bottom rules */}
      <div
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{ background: 'rgba(26,23,20,0.18)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[1px]"
        style={{ background: 'rgba(26,23,20,0.12)' }}
      />

      {/* Light vignette to anchor edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(140,120,90,0.18) 100%)',
        }}
      />
    </div>
  );
}
