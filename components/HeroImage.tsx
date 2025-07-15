import React from 'react';

interface HeroImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc = '/fallback-hero.jpg',
  className = '',
  ...props 
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackSrc) {
      target.src = fallbackSrc;
    }
  };

  // Type-safe URL handling
  const getImageSource = () => {
    if (typeof src === 'string') {
      if (process.env.NODE_ENV === 'development' && src.startsWith('http')) {
        return src.replace('https://', 'http://');
      }
      return src;
    }
    return fallbackSrc; // Handle Blob case or undefined
  };

  return (
    <img
      src={getImageSource()}
      alt={alt || 'Hero image'}
      className={`w-full h-auto ${className}`}
      onError={handleError}
      {...props}
    />
  );
};

export default HeroImage;