'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content } from '@/app/lib/content';
import type { Locale } from '@/app/lib/content';
import MeshBackground from './MeshBackground';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PlansSection from './PlansSection';
import StatsSection from './StatsSection';
import ProcessSection from './ProcessSection';
import CTASection from './CTASection';
import Footer from './Footer';

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const c = content[locale];

  const toggleLocale = () => setLocale((l) => (l === 'en' ? 'ru' : 'en'));

  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <Navbar
        logo={c.nav.logo}
        links={c.nav.links}
        cta={c.nav.cta}
        locale={locale}
        langLabel={c.nav.langLabel}
        onLocaleToggle={toggleLocale}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={locale}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <HeroSection
            eyebrow={c.hero.eyebrow}
            headline={c.hero.headline}
            headlineSuffix={c.hero.headlineSuffix}
            subheadline={c.hero.subheadline}
            cta={c.hero.cta}
            ctaSecondary={c.hero.ctaSecondary}
            badge={c.hero.badge}
          />
          <FeaturesSection
            eyebrow={c.features.eyebrow}
            headline={c.features.headline}
            cards={c.features.cards}
          />
          <PlansSection
            eyebrow={c.plans.eyebrow}
            headline={c.plans.headline}
            subheadline={c.plans.subheadline}
            services={c.plans.services}
          />
          <StatsSection
            eyebrow={c.stats.eyebrow}
            headline={c.stats.headline}
            items={c.stats.items}
          />
          <ProcessSection
            eyebrow={c.process.eyebrow}
            headline={c.process.headline}
            steps={c.process.steps}
          />
          <CTASection
            headline={c.cta.headline}
            subheadline={c.cta.subheadline}
            emailLabel={c.cta.emailLabel}
            telegramLabel={c.cta.telegramLabel}
            orLabel={c.cta.orLabel}
          />
        </motion.main>
      </AnimatePresence>

      <Footer
        logo={c.footer.logo}
        tagline={c.footer.tagline}
        links={c.footer.links}
        copyright={c.footer.copyright}
        contactLabel={c.footer.contactLabel}
      />
    </div>
  );
}
