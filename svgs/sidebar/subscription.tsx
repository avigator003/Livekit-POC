const SubscriptionIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4H18V6H2V4ZM4 0H16V2H4V0ZM18 8H2C0.9 8 0 8.9 0 10V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V10C20 8.9 19.1 8 18 8ZM18 18H2V10H18V18ZM8 10.73V17.26L14 14L8 10.73Z"
        fill="white"
      />
    </svg>
  );
};

export default SubscriptionIcon;
