/**
 * Generates an optimized Cloudinary URL for performance-gated environments.
 * Caps maximum widths dynamically and forces aggressive webp/avif compression.
 */
export function getOptimizedCloudinaryUrl(src: string, width: number, quality?: number): string {
  // Cap maximum width for slow connectivity (Burundi profile)
  const BURUNDI_MAX_WIDTH = 1200;
  const optimizedWidth = Math.min(width, BURUNDI_MAX_WIDTH);
  
  // Force aggressive compression
  const q = quality ? `q_${quality}` : 'q_auto:eco';
  const transformations = `f_auto,${q},w_${optimizedWidth},c_limit`;

  // If already a full Cloudinary URL with an /upload/ path
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    return src.replace('/upload/', `/upload/${transformations}/`);
  }

  // If a raw identifier is passed, construct a safe absolute URL
  // Defaulting to 'skyline-motors' if no env var is provided
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'skyline-motors';
  const cleanSrc = src.replace(/^\/+/, '');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanSrc}`;
}
