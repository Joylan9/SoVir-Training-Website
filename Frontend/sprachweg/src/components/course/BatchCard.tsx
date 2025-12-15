import React from 'react';

export interface Batch {
  id: string;
  startDate: string;
  time: string;
  timezone: string;
  seatsLeft: number;
  isWaitlist?: boolean;
}

export interface BatchCardProps {
  batch: Batch;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const isAlmostFull = batch.seatsLeft > 0 && batch.seatsLeft <= 5;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#d6b161]">
          Upcoming batch
        </p>
        <p className="mt-1 text-sm font-semibold text-[#0a192f] dark:text-gray-50">
          {batch.startDate}
        </p>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {batch.time} ({batch.timezone})
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {batch.isWaitlist
            ? 'Join waitlist'
            : batch.seatsLeft > 0
            ? `${batch.seatsLeft} seats left`
            : 'Full'}
        </p>
        {isAlmostFull && !batch.isWaitlist && (
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-500">
            Filling fast
          </span>
        )}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#0a192f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#112240] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b161]"
      >
        {batch.isWaitlist ? 'Join Waitlist' : 'Enroll in this Batch'}
      </button>
    </div>
  );
};

export default BatchCard;


