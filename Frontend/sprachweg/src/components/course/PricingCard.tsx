import React from 'react';

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isBestValue?: boolean;
  discountLabel?: string;
}

export interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-4 shadow-sm dark:bg-gray-900 ${
        plan.isBestValue
          ? 'border-[#d6b161] ring-1 ring-[#d6b161]/50'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {plan.isBestValue && (
        <span className="absolute -top-2 right-4 rounded-full bg-[#d6b161] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0a192f]">
          Best value
        </span>
      )}
      {plan.discountLabel && (
        <span className="mt-1 inline-flex w-fit rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-500">
          {plan.discountLabel}
        </span>
      )}

      <h3 className="mt-2 text-sm font-semibold text-[#0a192f] dark:text-gray-50">
        {plan.name}
      </h3>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{plan.description}</p>

      <p className="mt-3 text-lg font-bold text-[#0a192f] dark:text-gray-50">{plan.price}</p>

      <ul className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-[#d6b161]" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0a192f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#112240] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161]"
      >
        Secure Payment
      </button>
    </div>
  );
};

export default PricingCard;


