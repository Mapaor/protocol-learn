'use client';

import React from 'react';
import { Category, Difficulty } from '../../types/protocol';
import { CATEGORY_COLORS, DIFFICULTY_COLORS } from '../../utils/constants';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'difficulty' | 'default';
  category?: Category;
  difficulty?: Difficulty;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  category,
  difficulty,
  className = '' 
}) => {
  let badgeClasses = 'px-3 py-1 text-xs font-medium rounded-full border ';

  if (variant === 'category' && category) {
    badgeClasses += CATEGORY_COLORS[category];
  } else if (variant === 'difficulty' && difficulty) {
    badgeClasses += DIFFICULTY_COLORS[difficulty];
  } else {
    badgeClasses += 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <span className={`${badgeClasses} ${className}`}>
      {children}
    </span>
  );
};
