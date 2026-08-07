import React, { useState, useEffect } from 'react';

interface SpriteAnimatorProps {
  src: string;
  row?: number;
  rows?: number;
  frameCount?: number;
  fps?: number;
  className?: string;
}

export const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({
  src,
  row = 0,
  rows = 1,
  frameCount = 4,
  fps = 10,
  className = ''
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % Math.max(1, frameCount));
    }, 1000 / Math.max(1, fps));
    return () => clearInterval(interval);
  }, [frameCount, fps]);

  const totalRows = Math.max(rows, row + 1);
  const bgX = frameCount > 1 ? (frame / (frameCount - 1)) * 100 : 0;
  const bgY = totalRows > 1 ? (row / (totalRows - 1)) * 100 : 0;

  return (
    <div
      className={`relative overflow-hidden select-none pointer-events-none ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: `${Math.max(1, frameCount) * 100}% ${Math.max(1, totalRows) * 100}%`,
        backgroundPosition: `${bgX}% ${bgY}%`,
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
