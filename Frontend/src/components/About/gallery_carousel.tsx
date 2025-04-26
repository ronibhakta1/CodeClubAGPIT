'use client';

import { useState, useEffect } from 'react';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { motion } from 'motion/react';

interface CarouselImage {
  id: number;
  image: string;
  title: string;
  tagline: string;
}

export function GalleryCarousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
  const [touchedImageId, setTouchedImageId] = useState<number | null>(null);

  // Load carousel images from the JSON file
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch('/carousel_images.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCarouselImages(data);
      } catch (err) {
        console.error("Error loading carousel images:", err);
      }
    };

    fetchCarouselImages();
  }, []);

  // Handle touch events for mobile devices
  const handleTouchStart = (id: number) => {
    setTouchedImageId(id);
  };

  const handleTouchEnd = () => {
    setTouchedImageId(null);
  };

  return (
    <div className="py-4 px-3 sm:py-6 sm:px-4 max-w-[1200px] mx-auto">
      {/* Carousel Images Section */}
      <div className="mb-6 sm:mb-10">
        <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">AGPIT Board of Directors & Faculty</h2><br /><br />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
          {carouselImages.map((item) => (
            <div 
              key={item.id}
              className="relative aspect-square w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px] overflow-hidden rounded-[8px] shadow-lg" 
              onMouseEnter={() => setHoveredImageId(item.id)}
              onMouseLeave={() => setHoveredImageId(null)}
              onTouchStart={() => handleTouchStart(item.id)}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-image.jpg";
                }}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
                blurIntensity={0.5}
                animate={(hoveredImageId === item.id || touchedImageId === item.id) ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full"
                animate={(hoveredImageId === item.id || touchedImageId === item.id) ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex flex-col items-start gap-0 px-2 py-2 sm:px-3 sm:py-3">
                  <p className="text-sm sm:text-base font-semibold text-zinc-900 line-clamp-1">{item.title}</p>
                  <span className="text-xs text-zinc-900 line-clamp-2">{item.tagline}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}