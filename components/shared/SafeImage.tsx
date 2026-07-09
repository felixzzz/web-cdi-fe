import NextImage, { ImageProps } from "next/image";
import React from "react";

export function getFallbackAltText(src: ImageProps['src']): string {
  let url = "";
  if (typeof src === "string") {
    url = src;
  } else if (src && typeof src === "object" && "src" in src) {
    url = src.src;
  }
  
  if (!url) return "Chandra Daya Investasi";
  
  // Extract filename
  const filename = url.split('/').pop()?.split('?')[0]?.split('#')[0] || "";
  if (!filename) return "Chandra Daya Investasi";
  
  // Remove extension
  const dotIndex = filename.lastIndexOf('.');
  const nameWithoutExtension = dotIndex !== -1 ? filename.substring(0, dotIndex) : filename;
  
  // Replace underscores, hyphens, and percent-encoded spaces with regular spaces
  const cleanName = decodeURIComponent(nameWithoutExtension)
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize first letters of words
  const capitalized = cleanName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return capitalized || "Chandra Daya Investasi";
}

export const SafeImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, src, ...props }, ref) => {
    const isPlaceholder = !alt || alt.trim() === "" || ["icon", "image", "logo"].includes(alt.trim().toLowerCase());
    const resolvedAlt = isPlaceholder ? getFallbackAltText(src) : alt;
    return <NextImage ref={ref} src={src} alt={resolvedAlt} {...props} />;
  }
);

SafeImage.displayName = "SafeImage";

export default SafeImage;
