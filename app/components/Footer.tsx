'use client';

import { motion } from 'framer-motion';
import { contact } from '@/app/lib/content';
import type { SiteContent } from '@/app/lib/content';

type FooterProps = SiteContent['footer'];

export default function Footer({ logo, tagline, links, copyright, contactLabel }: FooterProps) {
  return (
    <footer className="relative border-t px-6 py-14 lg:px-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.8) 100%)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">{logo}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">{tagline}</p>
            <div
              className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-slate-500"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-violet-500" aria-hidden="true">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {contact.location}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Navigation</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{contactLabel}</p>
            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors group-hover:bg-violet-500/20"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-violet-400" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {contact.email}
              </a>
              <a
                href={contact.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors group-hover:bg-blue-500/20"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-blue-400" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
                  </svg>
                </span>
                {contact.telegram} (Telegram)
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-600">{copyright}</p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Made with</span>
            <span className="text-red-500/60">♥</span>
            <span>in St. Petersburg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
