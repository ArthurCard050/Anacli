import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  fetchPriority = 'auto',
  ...props 
}: OptimizedImageProps) => {
  // Para imagens locais, otimiza apenas formatos raster (não SVG)
  const optimizedSrc = src.startsWith('/assets/') && !src.endsWith('.svg')
    ? src.replace(/\.(png|jpg|jpeg)$/i, '.avif')
    : src;

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '100vw'}
        quality={quality}
        fetchPriority={fetchPriority}
        {...props}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      fetchPriority={fetchPriority}
      {...props}
    />
  );
};

export default OptimizedImage;