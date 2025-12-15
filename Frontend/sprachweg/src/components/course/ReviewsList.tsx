import React from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { Star } from 'lucide-react';

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export interface ReviewsListProps {
  rating: number;
  totalReviews: number;
  students: number;
  reviews: Review[];
}

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix }) => {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useAnimationFrame((t) => {
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }
    const progress = Math.min(t / 800, 1);
    count.set(progress * value);
  });

  return (
    <span className="font-semibold text-[#0a192f] dark:text-gray-50">
      {shouldReduceMotion ? value : (rounded as unknown as number)}
      {suffix}
    </span>
  );
};

const ReviewsList: React.FC<ReviewsListProps> = ({
  rating,
  totalReviews,
  students,
  reviews,
}) => {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
      <div className="grid gap-4 md:grid-cols-[2fr,minmax(0,3fr)]">
        <div className="flex flex-col justify-center gap-3 border-b border-gray-100 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#0a192f] dark:text-gray-50">
              {rating.toFixed(1)}
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.round(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Based on <AnimatedCounter value={totalReviews} /> verified reviews
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Trusted by <AnimatedCounter value={students} suffix="+" /> learners
          </p>
        </div>

        <div className="space-y-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl bg-gray-50 p-3 text-xs dark:bg-gray-800/60"
            >
              <p className="text-gray-700 dark:text-gray-100">“{review.quote}”</p>
              <p className="mt-2 text-[11px] font-semibold text-[#0a192f] dark:text-gray-50">
                {review.name}{' '}
                <span className="font-normal text-gray-500 dark:text-gray-400">
                  • {review.role}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsList;


