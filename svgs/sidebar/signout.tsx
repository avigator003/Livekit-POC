const SignoutIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_977_15424)">
        <path
          d="M16.286 18V21.4286C16.286 21.8832 16.1054 22.3193 15.7839 22.6408C15.4624 22.9622 15.0264 23.1429 14.5717 23.1429H2.57171C2.11704 23.1429 1.68102 22.9622 1.35952 22.6408C1.03803 22.3193 0.857422 21.8832 0.857422 21.4286V2.57146C0.857422 2.1168 1.03803 1.68077 1.35952 1.35928C1.68102 1.03779 2.11704 0.857178 2.57171 0.857178H14.5717C15.0264 0.857178 15.4624 1.03779 15.7839 1.35928C16.1054 1.68077 16.286 2.1168 16.286 2.57146V6.00003"
          stroke="#FF5F5F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.1426 12H23.1426"
          stroke="#FF5F5F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.7139 8.57141L23.1424 12L19.7139 15.4286"
          stroke="#FF5F5F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_977_15424">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SignoutIcon;
