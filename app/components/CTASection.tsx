'use client';

import { motion } from 'framer-motion';
import { contact } from '@/app/lib/content';
import type { SiteContent } from '@/app/lib/content';
import RegistrationMark from './RegistrationMark';
import { asset } from '@/app/lib/paths';

type CTAProps = SiteContent['cta'];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function CTASection({
  headline,
  subheadline,
  emailLabel,
  telegramLabel,
  orLabel,
  stampLabel,
  affix,
}: CTAProps) {
  const headlineLines = headline.split('\n');

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--ink)]/20 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="relative mx-auto max-w-[1300px]">
        {/* Wax-seal envelope — pinned beside the postcard like a real
            piece of correspondence dropped on the same desk. Hidden on
            small screens so the postcard stays readable. */}
        <motion.figure
          className="pointer-events-none absolute -bottom-10 -left-8 z-20 hidden w-56 lg:block lg:w-72"
          style={{ rotate: '-9deg' }}
          initial={{ opacity: 0, y: 40, rotate: -16 }}
          whileInView={{ opacity: 1, y: 0, rotate: -9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
        >
          <div
            className="relative overflow-hidden border border-[var(--ink)]"
            style={{
              boxShadow:
                '10px 14px 0 -4px rgba(26,23,20,0.10), 18px 28px 30px -10px rgba(26,23,20,0.30)',
            }}
          >
            <img
              src={asset('/images/generated/envelope-with-wax-seal.png')}
              alt="Envelope with crimson wax seal — TracePoint correspondence"
              loading="lazy"
              decoding="async"
              className="block w-full photo-duo"
              draggable={false}
            />
          </div>
          <figcaption className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
            Sealed. On record.
          </figcaption>
        </motion.figure>

        <motion.article
          className="card-paper card-paper-raised relative overflow-hidden"
          style={{ transform: 'rotate(-0.6deg)' }}
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          {/* Registration corners */}
          <div className="reg-mark" style={{ top: 12, left: 12 }} />
          <div className="reg-mark" style={{ top: 12, right: 12, left: 'auto' }} />
          <div className="reg-mark" style={{ bottom: 12, left: 12 }} />
          <div className="reg-mark" style={{ bottom: 12, right: 12, left: 'auto' }} />

          {/* Postage stamp — top right */}
          <motion.div
            className="absolute top-6 right-6 z-20 lg:top-10 lg:right-10"
            initial={{ opacity: 0, scale: 1.8, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <div className="relative">
              {/* Perforated edge */}
              <div
                className="absolute -inset-2 bg-[var(--paper)]"
                style={{
                  WebkitMaskImage:
                    'radial-gradient(circle at 3px 3px, transparent 2.5px, #000 3px)',
                  WebkitMaskSize: '8px 8px',
                  maskImage:
                    'radial-gradient(circle at 3px 3px, transparent 2.5px, #000 3px)',
                  maskSize: '8px 8px',
                }}
              />
              <div
                className="relative flex flex-col items-center gap-1 border-2 border-[var(--post)] bg-[var(--paper)] px-5 py-3 text-center"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px var(--paper-edge), 0 8px 0 -3px rgba(26,23,20,0.15)',
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--post)]">
                  RUSSIA · POST
                </span>
                <span
                  className="font-display text-3xl font-black leading-none tracking-[-0.04em] text-[var(--post)]"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
                  }}
                >
                  {stampLabel}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--post)]">
                  191000 · СПБ
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top postcard bar */}
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink)] bg-[var(--paper-deep)] px-6 py-3 sm:px-10">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]">
              <RegistrationMark size={11} />
              <span>POSTCARD · OPEN CORRESPONDENCE</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
              FROM: TRACEPOINT SPB / TO: YOU
            </div>
          </header>

          {/* Card body — split spread */}
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {/* LEFT — message */}
            <div className="px-6 py-10 sm:px-10 sm:py-14 md:border-r md:border-[var(--ink)]">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--post)]">
                MESSAGE
              </span>
              <h2 className="mt-4 font-display text-[12vw] sm:text-[8vw] md:text-[5vw] font-black leading-[0.9] tracking-[-0.04em] text-[var(--ink)]">
                {headlineLines.map((l, i) => (
                  <span key={i} className="block">
                    {i === 0 ? l : (
                      <em className="not-italic">
                        <span className="ink-underline">{l.split(' ')[0]}</span>{' '}
                        {l.split(' ').slice(1).join(' ')}
                      </em>
                    )}
                  </span>
                ))}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {subheadline}
              </p>

              {/* Handwriting flourish */}
              <div className="mt-8 flex items-end justify-between gap-4">
                <svg
                  viewBox="0 0 200 36"
                  className="h-9 w-44 text-[var(--ink)]"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 28 C 12 8, 22 30, 32 18 S 50 6, 60 22 S 78 32, 90 16 S 110 4, 122 24 S 144 32, 158 14 S 180 26, 195 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                  — The TracePoint SPB team
                </span>
              </div>
            </div>

            {/* RIGHT — address column / actions */}
            <div className="relative px-6 py-10 sm:px-10 sm:py-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--post)]">
                ADDRESS · REPLY VIA
              </span>

              <div className="mt-6 space-y-4">
                {/* Email pill */}
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center justify-between gap-4 border border-[var(--ink)] bg-[var(--paper)] px-5 py-4 transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                  style={{ boxShadow: '4px 4px 0 0 var(--paper-edge)' }}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-current opacity-70">
                      {emailLabel}
                    </div>
                    <div className="mt-1 font-display text-lg font-bold tracking-tight text-current">
                      {contact.email}
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6 shrink-0 text-current transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </a>

                {/* Telegram pill */}
                <a
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border border-[var(--ink)] bg-[var(--paper)] px-5 py-4 transition-all hover:bg-[var(--post)] hover:text-[var(--paper)] hover:border-[var(--post)]"
                  style={{ boxShadow: '4px 4px 0 0 var(--paper-edge)' }}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-current opacity-70">
                      {telegramLabel}
                    </div>
                    <div className="mt-1 font-display text-lg font-bold tracking-tight text-current">
                      {contact.telegram}
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
                  </svg>
                </a>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--ink)]/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-mute)]">
                  {orLabel}
                </span>
                <div className="h-px flex-1 bg-[var(--ink)]/30" />
              </div>

              {/* Affix reply stamp box */}
              <div
                className="relative flex h-24 items-center justify-center border-2 border-dashed border-[var(--ink)]/40 text-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink-mute)]">
                  {affix}
                </span>
              </div>

              {/* Location footer */}
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                <span>{contact.location}</span>
                <span>{contact.coords}</span>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
