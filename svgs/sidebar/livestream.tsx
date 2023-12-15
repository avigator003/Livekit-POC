const LiveStreamIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4H12.41L15.7 0.71L15 0L11 4L7 0L6.29 0.71L9.59 4H2C1.46957 4 0.960859 4.21071 0.585786 4.58579C0.210714 4.96086 0 5.46957 0 6V18C0 19.1 0.9 20 2 20H20C21.1 20 22 19.1 22 18V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4ZM20 18H2V6H20V18ZM8 8V16L15 12L8 8Z"
        fill="#FBFCFF"
      />
    </svg>
  );
};

export default LiveStreamIcon;
