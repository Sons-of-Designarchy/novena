import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

export default function HalftoneImage({
  src, alt, fill, width, height,
  className = "", containerClassName = "",
  priority, sizes, style,
}: Props) {
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        className={className}
        style={{
          filter: "contrast(1.32) brightness(0.9) sepia(0.29) saturate(0.8)",
          ...style,
        }}
      />
      <div className="halftone-dots" />
    </div>
  );
}
