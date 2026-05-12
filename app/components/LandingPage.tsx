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
import Ticker from './Ticker';
import FieldDossier from './FieldDossier';
import SectionDivider from './SectionDivider';

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
        manifest={c.manifest}
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
            kicker={c.hero.kicker}
            headline={c.hero.headline}
            headlineSuffix={c.hero.headlineSuffix}
            subheadline={c.hero.subheadline}
            cta={c.hero.cta}
            ctaSecondary={c.hero.ctaSecondary}
            badge={c.hero.badge}
            serial={c.hero.serial}
            meta={c.hero.meta}
            receiptItems={c.hero.receiptItems}
            manifest={c.manifest}
          />

          {/* Live telemetry ticker — punctuates Hero and the rest */}
          <Ticker speed={70} variant="ink" />

          <FeaturesSection
            eyebrow={c.features.eyebrow}
            headline={c.features.headline}
            numberPrefix={c.features.numberPrefix}
            cards={c.features.cards}
          />

          {/* Divider — the work, before it leaves the studio */}
          <SectionDivider
            image="/images/generated/hands-sorting-flyers.png"
            alt="Hands sorting printed flyers on a wooden desk"
            kicker="INTERLEAF · BEFORE THE FIELD"
            headline="The flyer, before the door."
            caption="Bundled, counted, stamped — at the studio table, before the team leaves for the route."
            metaLeft="INT. STUDIO · 05:30 MSK"
            metaRight="SHEET 02 / OF 04"
            treatment="duo"
            align="right"
            tone="light"
            heightVh={65}
          />

          <PlansSection
            eyebrow={c.plans.eyebrow}
            headline={c.plans.headline}
            subheadline={c.plans.subheadline}
            services={c.plans.services}
          />

          {/* Divider — and ending at someone's door */}
          <SectionDivider
            image="/images/generated/stack-of-flyers-doorstep.png"
            alt="A stack of flyers on a doorstep at blue-hour dawn"
            kicker="INTERLEAF · AT THE THRESHOLD"
            headline="And ending at someone's door."
            caption="Blue-hour, light snow, the topmost flyer stamped. The frame between the studio and the mailbox."
            metaLeft="EXT. ENTRY · 06:14 MSK"
            metaRight="SHEET 03 / OF 04"
            treatment="duo-deep"
            align="left"
            tone="light"
            heightVh={70}
          />

          {/* Field Dossier — cinematic four-act photo essay of real work */}
          <FieldDossier
            eyebrow={c.proof.eyebrow}
            headline={c.proof.headline}
            lede={c.proof.lede}
            wallTitle={c.proof.wallTitle}
            wallCaption={c.proof.wallCaption}
            wallStamp={c.proof.wallStamp}
            sheetTitle={c.proof.sheetTitle}
            sheetCaption={c.proof.sheetCaption}
            handTitle={c.proof.handTitle}
            handCaption={c.proof.handCaption}
            handQuote={c.proof.handQuote}
            handQuoteAttribution={c.proof.handQuoteAttribution}
            reelTitle={c.proof.reelTitle}
            reelCaption={c.proof.reelCaption}
            ctaLabel={c.proof.ctaLabel}
          />

          {/* Divider — the whole city, mapped */}
          <SectionDivider
            image="/images/generated/city-from-above-night.png"
            alt="Illustrated atlas plate of Saint Petersburg with delivery dots"
            kicker="INTERLEAF · ALL DISTRICTS, ALL HOURS"
            headline="Every dot is a door we have stood in front of."
            caption="Eighteen districts on the chart. A red mark on each verified delivery. The route is read out of the ledger."
            metaLeft="ATLAS PLATE · SPB-2026"
            metaRight="SHEET 04 / OF 04"
            treatment="noir"
            align="left"
            tone="light"
            heightVh={75}
          />

          <StatsSection
            eyebrow={c.stats.eyebrow}
            headline={c.stats.headline}
            ledgerLabel={c.stats.ledgerLabel}
            totalLabel={c.stats.totalLabel}
            items={c.stats.items}
          />

          <ProcessSection
            eyebrow={c.process.eyebrow}
            headline={c.process.headline}
            routePrefix={c.process.routePrefix}
            stamps={c.process.stamps}
            steps={c.process.steps}
          />

          {/* Second ticker — slower, red-ink variant, before the CTA */}
          <Ticker speed={90} variant="post" />

          <CTASection
            headline={c.cta.headline}
            subheadline={c.cta.subheadline}
            emailLabel={c.cta.emailLabel}
            telegramLabel={c.cta.telegramLabel}
            orLabel={c.cta.orLabel}
            stampLabel={c.cta.stampLabel}
            affix={c.cta.affix}
          />
        </motion.main>
      </AnimatePresence>

      <Footer
        logo={c.footer.logo}
        tagline={c.footer.tagline}
        links={c.footer.links}
        copyright={c.footer.copyright}
        contactLabel={c.footer.contactLabel}
        manifest={c.manifest}
      />
    </div>
  );
}
