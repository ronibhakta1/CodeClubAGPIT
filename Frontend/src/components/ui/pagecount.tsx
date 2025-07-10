import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  separator?: string;
  direction?: 'up' | 'down';
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration = 2,
  separator = ',',
  direction = 'up',
  className = '',
}) => {
  const [count, setCount] = useState(from);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const progress = Math.min(1, deltaTime / (duration * 1000));
      
      const currentCount = direction === 'up'
        ? Math.floor(from + (to - from) * progress)
        : Math.floor(from - (from - to) * progress);

      setCount(currentCount);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    previousTimeRef.current = time;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [from, to, duration, direction]);

  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return <span className={cn("font-bold", className)}>{formattedCount}</span>;
};

export default CountUp;