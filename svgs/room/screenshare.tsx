const ScreenShareIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M19.1788 10.3838C23.3788 10.7455 25.0938 12.9038 25.0938 17.6288V17.7805C25.0938 22.9955 23.0054 25.0838 17.7904 25.0838H10.1837C4.96875 25.0838 2.88042 22.9955 2.88042 17.7805V17.6288C2.88042 12.9388 4.57208 10.7805 8.70208 10.3955"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 17.5003L14 4.22363"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.9102 6.82533L14.0018 2.91699L10.0935 6.82533"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ScreenShareIcon;
