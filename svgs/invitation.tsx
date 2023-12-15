import { cn } from "@/lib/utils";

const InvitationIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width={size?.width || 24}
      height={size?.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M15.01 16.5898C14.45 18.3798 11.94 18.4098 11.35 16.6298L10.65 14.5598C10.46 13.9898 10.01 13.5298 9.43997 13.3498L7.35997 12.6498C5.58997 12.0598 5.61997 9.5298 7.40997 8.9898L14.95 6.63979C16.43 6.18979 17.82 7.57979 17.35 9.04979L15.01 16.5898Z"
        stroke={color}
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 22C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15Z"
        stroke={color}
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default InvitationIcon;
