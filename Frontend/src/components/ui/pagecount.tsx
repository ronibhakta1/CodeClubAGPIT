import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  from: number;
  to: number;
  direction?: 'up' | 'down';
  duration?: number;
  separator?: string;
  decimals?: number;
  decimal?: string;
  className?: string;
}

const CountUp = ({
  from,
  to,
  direction = 'up',
  duration = 2,
  separator = '',
  decimals = 0,
  decimal = '.',
  className,
}: CountUpProps) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = direction === 'up' ? to - from : from - to;
    
    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const currentCount = direction === 'up'
        ? from + progress * step
        : from - progress * step;
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      }
    };
    
    window.requestAnimationFrame(animateCount);
    
    return () => {};
  }, [from, to, direction, duration]);
  
  const formatNumber = (num: number) => {
    const fixedNum = num.toFixed(decimals);
    const [intPart, decPart] = fixedNum.split('.');
    
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return decimals
      ? `${formattedInt}${decimal}${decPart}`
      : formattedInt;
  };
  
  return (
    <span className={cn("font-bold", className)}>
      {formatNumber(count) +" +"}
    </span>
  );
};

export default CountUp;