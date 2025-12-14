import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
    return (
        <div
            className={cn(
                'rounded-2xl bg-white p-6 shadow-md',
                'dark:bg-gray-800 dark:border dark:border-gray-700',
                'transition-all duration-300',
                hover && 'hover:shadow-xl hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
