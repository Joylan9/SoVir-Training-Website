import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import LiveRecordedToggle from './LiveRecordedToggle';
import type { LiveRecordedToggleProps } from './LiveRecordedToggle';

export interface CourseHeroProps extends Pick<LiveRecordedToggleProps, 'hasLiveSession'> {
  title: string;
  subtitle: string;
  levelBadge?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

const CourseHero: React.FC<CourseHeroProps> = ({
  title,
  subtitle,
  levelBadge,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCta,
  onSecondaryCta,
  hasLiveSession,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 200], [0, shouldReduceMotion ? 0 : -40]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1a365d]">
      {/* Subtle parallax background orb */}
      <motion.div
        style={{ y }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[#d6b161]/20 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-28 pb-16 text-center sm:px-6 lg:px-8 lg:pt-32 lg:pb-20">
        {levelBadge && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#d6b161]"
          >
            {levelBadge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24, scale: shouldReduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-8 max-w-2xl text-sm text-gray-300 sm:text-base"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={onPrimaryCta}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#d6b161] px-6 py-3 text-sm font-semibold text-[#0a192f] shadow-md hover:bg-[#c4a055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {primaryCtaLabel}
          </motion.button>

          <motion.button
            type="button"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={onSecondaryCta}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {secondaryCtaLabel}
          </motion.button>
        </motion.div>

        <LiveRecordedToggle
          isLiveActive={!!hasLiveSession}
          onLiveClick={onPrimaryCta}
          onRecordedClick={onSecondaryCta}
          hasLiveSession={hasLiveSession}
        />
      </div>
    </section>
  );
};

export default CourseHero;


