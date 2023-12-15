import { cn } from "@/lib/utils";

const Logo: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width={size?.width || 135}
      height={size?.height || 121}
      viewBox="0 0 135 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn(className)}
    >
      <rect y="0.845215" width="134.61" height="120" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_193_77390"
            transform="matrix(0.000958564 0 0 0.00107527 -0.000370186 0)"
          />
        </pattern>
      </defs>
    </svg>
  );
};

export default Logo;
