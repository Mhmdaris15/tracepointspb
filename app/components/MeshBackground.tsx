'use client';

import { useEffect, useRef } from 'react';

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep base */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #080b14 0%, #0d1229 50%, #080b14 100%)' }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orb 1 — purple */}
      <div
        className="absolute animate-orb-drift"
        style={{
          top: '-10%',
          left: '-5%',
          width: '70vw',
          height: '70vw',
          maxWidth: '900px',
          maxHeight: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Orb 2 — blue */}
      <div
        className="absolute animate-orb-drift-reverse"
        style={{
          bottom: '10%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Orb 3 — cyan accent */}
      <div
        className="absolute"
        style={{
          top: '40%',
          left: '35%',
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(34,211,238,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'orb-drift 22s ease-in-out infinite reverse',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,11,20,0.7) 100%)',
        }}
      />
    </div>
  );
}
