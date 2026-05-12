'use client';

import { ReactNode } from 'react';

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  intensity?: number;
}

export default function ShinyText({
  children,
  className = '',
  speed = 4,
  intensity = 0.8,
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={
        {
          '--shiny-speed': `${speed}s`,
          '--shiny-intensity': intensity,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
