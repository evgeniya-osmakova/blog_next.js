'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/icons/file.svg',
  loading = 'lazy',
  sizes,
  quality = 80,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative ${className || ''}`} style={{ opacity: isLoaded ? 1 : 0.7, transition: 'opacity 0.3s' }}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        quality={quality}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}
