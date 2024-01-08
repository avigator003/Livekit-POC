const NotificationIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0277 11.7143V14.3433C18.0277 15.0138 18.294 15.6568 18.7682 16.131C19.2422 16.605 20.0441 16.8714 20.7146 16.8714H1.85742C2.52792 16.8714 3.32979 16.605 3.80391 16.131C4.27801 15.6568 4.54438 15.0138 4.54438 14.3433L4.54436 8.17022C4.54436 6.38224 5.25464 4.66747 6.51894 3.40317C7.78324 2.13887 9.49801 1.42859 11.286 1.42859"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default NotificationIcon;
