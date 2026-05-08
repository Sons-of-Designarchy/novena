interface SvgIconProps {
  name: string;
  className?: string;
}

export default function SvgIcon({ name, className = "" }: SvgIconProps) {
  return (
    <span
      className={`block shrink-0 ${className}`}
      style={{
        backgroundColor: "currentColor",
        maskImage: `url(/icons/${name}.svg)`,
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "center",
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
