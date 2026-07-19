import React from 'react';
import { useSlideReveal } from '../hooks/useScrollAnimation';

interface SlideRevealCardProps {
  delay: number;
  className?: string;
  children: React.ReactNode;
}

const SlideRevealCard: React.FC<SlideRevealCardProps> = ({ delay, className = '', children }) => {
  const ref = useSlideReveal(delay);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default SlideRevealCard;
