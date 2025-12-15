import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface LiveRecordedToggleProps {
  isLiveActive: boolean;
  onLiveClick: () => void;
  onRecordedClick: () => void;
  hasLiveSession?: boolean;
}

const LiveRecordedToggle: React.FC<LiveRecordedToggleProps> = ({
  isLiveActive,
  onLiveClick,
  onRecordedClick,
  hasLiveSession = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <motion.button
        type="button"
        onClick={onLiveClick}
        aria-pressed={isLiveActive}
        aria-label={hasLiveSession ? 'Join live class, currently live' : 'View live class schedule'}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className="relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d6b161] text-[#0a192f] font-semibold text-sm sm:text-base shadow-md hover:bg-[#c4a055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors w-full sm:w-auto"
      >
        {hasLiveSession && !shouldReduceMotion && (
          <span
            className="absolute -top-1 -right-1 flex h-3 w-3"
            aria-live="polite"
            aria-label="Live session indicator"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        )}
        <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
        <span>Live Class</span>
      </motion.button>

      <motion.button
        type="button"
        onClick={onRecordedClick}
        aria-pressed={!isLiveActive}
        aria-label="View recorded classes"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#0a192f]/30 dark:border-gray-500 bg-transparent text-[#0a192f] dark:text-gray-100 font-semibold text-sm sm:text-base hover:bg-[#0a192f]/5 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors w-full sm:w-auto"
      >
        <span>Recorded Class</span>
      </motion.button>
    </div>
  );
};

export default LiveRecordedToggle;


