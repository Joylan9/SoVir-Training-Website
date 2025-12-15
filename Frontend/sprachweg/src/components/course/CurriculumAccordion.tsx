import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export type CurriculumItemType = 'LIVE' | 'RECORDED' | 'NEW';

export interface CurriculumItem {
  title: string;
  duration: string;
  type: CurriculumItemType;
}

export interface CurriculumModule {
  id: string;
  weekLabel: string;
  title: string;
  summary: string;
  items: CurriculumItem[];
}

export interface CurriculumAccordionProps {
  modules: CurriculumModule[];
}

const badgeColors: Record<CurriculumItemType, string> = {
  LIVE: 'bg-red-500/10 text-red-500 border-red-500/40',
  RECORDED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
  NEW: 'bg-[#d6b161]/10 text-[#d6b161] border-[#d6b161]/40',
};

const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ modules }) => {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-3">
      {modules.map((module) => {
        const isOpen = module.id === openId;

        return (
          <div
            key={module.id}
            className="rounded-2xl border border-gray-200/70 bg-white/70 p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900/70"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : module.id)}
              aria-expanded={isOpen}
              aria-controls={`curriculum-panel-${module.id}`}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#d6b161]">
                  {module.weekLabel}
                </p>
                <p className="text-sm font-semibold text-[#0a192f] dark:text-gray-50">
                  {module.title}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                  {module.summary}
                </p>
              </div>
              <span
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`curriculum-panel-${module.id}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    {module.items.map((item, index) => (
                      <div
                        key={`${module.id}-${index}-${item.title}`}
                        className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-3 py-2 text-xs dark:bg-gray-800/60"
                      >
                        <div>
                          <p className="font-medium text-[#0a192f] dark:text-gray-100">{item.title}</p>
                          <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                            {item.duration}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${badgeColors[item.type]}`}
                        >
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default CurriculumAccordion;


