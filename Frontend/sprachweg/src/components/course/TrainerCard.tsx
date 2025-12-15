import React from 'react';

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <img
        src={trainer.avatarUrl}
        alt={trainer.name}
        className="mb-3 h-16 w-16 rounded-full object-cover"
        loading="lazy"
      />
      <h3 className="text-sm font-semibold text-[#0a192f] dark:text-gray-50">{trainer.name}</h3>
      <p className="mt-0.5 text-xs font-medium text-[#d6b161]">{trainer.role}</p>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{trainer.bio}</p>

      <div className="mt-3 flex gap-3">
        {trainer.linkedinUrl && (
          <a
            href={trainer.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#0a192f] underline-offset-2 hover:underline dark:text-gray-100"
          >
            LinkedIn
          </a>
        )}
        {trainer.twitterUrl && (
          <a
            href={trainer.twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#0a192f] underline-offset-2 hover:underline dark:text-gray-100"
          >
            Twitter
          </a>
        )}
      </div>
    </article>
  );
};

export default TrainerCard;


