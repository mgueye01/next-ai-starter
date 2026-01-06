'use client';

import { useState, useEffect } from 'react';

const TestScrollText = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollDelta = e.deltaY * 0.005;
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1
      );
      setScrollProgress(newProgress);
      console.log('Scroll progress:', newProgress);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollProgress]);

  const translateX = scrollProgress * 200;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="fixed top-4 left-4 bg-black text-white p-2 rounded z-50">
        Progress: {scrollProgress.toFixed(2)}
      </div>
      
      <div className="flex flex-col items-center gap-8">
        <div
          className="text-6xl font-bold text-blue-500"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          elGato
        </div>
        <div
          className="text-6xl font-bold text-red-500"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          Photo Paris
        </div>
      </div>
      
      <div className="mt-8 text-gray-600">
        Scrollez pour tester l'effet
      </div>
    </div>
  );
};

export default TestScrollText;