import Image from "next/image";

interface ExperienceImageProps {
  src: string | null;
  alt: string;
  fallbackLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/** Photo with a typographic fallback for listings that have no approved image. */
export function ExperienceImage({
  src,
  alt,
  fallbackLabel,
  sizes,
  priority = false,
  className = "",
  imageClassName = "",
}: ExperienceImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${fallbackLabel} (no photo available)`}
        className={`relative flex items-center justify-center overflow-hidden bg-ink text-paper ${className}`}
      >
        <span className="font-hand text-3xl leading-none text-lime sm:text-4xl">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-paper-deep ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
