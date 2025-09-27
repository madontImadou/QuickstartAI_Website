import React from 'react';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

interface AnimatedCardProps {
  delay: number;
  className?: string;
  children: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ delay, className = '', children }) => {
  const ref = useStaggerAnimation(delay);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimatedCard;