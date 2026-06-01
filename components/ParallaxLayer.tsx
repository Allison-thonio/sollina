import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Simple parallax layer component.
 * Accepts an array of layers with image sources and depth factors.
 * The deeper the layer, the slower it moves relative to mouse movement.
 */
interface Layer {
  src: string;
  alt?: string;
  depth: number; // 0 (foreground) to 1 (background)
}

interface ParallaxLayerProps {
  layers: Layer[];
  style?: React.CSSProperties;
}

export default function ParallaxLayer({ layers, style }: ParallaxLayerProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2; // -1 to 1
    const y = ((clientY - top) / height - 0.5) * 2;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      className="relative overflow-hidden"
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            pointerEvents: 'none',
            willChange: 'transform',
          }}
          animate={{
            x: -offset.x * layer.depth * 30,
            y: -offset.y * layer.depth * 30,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <Image src={layer.src} alt={layer.alt ?? ''} fill style={{ objectFit: 'cover' }} />
        </motion.div>
      ))}
    </div>
  );
}
