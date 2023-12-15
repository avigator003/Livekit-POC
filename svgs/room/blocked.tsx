const BlockedIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
    >
      <path
        d="M21.4736 21.8135L18.1836 25.1035"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.4736 25.1035L18.1836 21.8135"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.7981 13.3903C11.0214 13.297 8.81641 11.022 8.81641 8.22199C8.81641 5.36366 11.1264 3.04199 13.9964 3.04199C16.8547 3.04199 19.1764 5.36366 19.1764 8.22199C19.1647 11.022 16.9597 13.297 14.1831 13.3903C14.0664 13.3787 13.9264 13.3787 13.7981 13.3903Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.9977 26.1543C11.8743 26.1543 9.76266 25.6176 8.15266 24.5443C5.32932 22.6543 5.32932 19.5743 8.15266 17.6959C11.361 15.5493 16.6227 15.5493 19.831 17.6959"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BlockedIcon;
