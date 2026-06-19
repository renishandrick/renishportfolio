'use client';

import { useEffect, useState } from 'react';

export default function MouseGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: position.x - 300,
          top: position.y - 300,
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 70%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />
    </div>
  );
}
