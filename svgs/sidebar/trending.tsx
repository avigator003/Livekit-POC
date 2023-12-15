const TrendingIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
    >
      <path
        d="M14.85 0.850113L16.29 2.29011L11.41 7.17011L8.11999 3.88011C8.02748 3.78741 7.91759 3.71386 7.79661 3.66368C7.67564 3.6135 7.54596 3.58767 7.41499 3.58767C7.28402 3.58767 7.15434 3.6135 7.03337 3.66368C6.91239 3.71386 6.8025 3.78741 6.70999 3.88011L0.709989 9.89011C0.617407 9.9827 0.543967 10.0926 0.493862 10.2136C0.443757 10.3345 0.417969 10.4642 0.417969 10.5951C0.417969 10.726 0.443757 10.8557 0.493862 10.9767C0.543967 11.0976 0.617407 11.2075 0.709989 11.3001C0.802571 11.3927 0.912482 11.4661 1.03345 11.5162C1.15441 11.5663 1.28406 11.5921 1.41499 11.5921C1.54592 11.5921 1.67557 11.5663 1.79653 11.5162C1.9175 11.4661 2.02741 11.3927 2.11999 11.3001L7.40999 6.00011L10.7 9.29011C11.09 9.68011 11.72 9.68011 12.11 9.29011L17.7 3.71011L19.14 5.15011C19.2099 5.21863 19.2983 5.26514 19.3944 5.28386C19.4905 5.30258 19.5899 5.29269 19.6804 5.25543C19.7709 5.21816 19.8485 5.15516 19.9035 5.07422C19.9585 4.99328 19.9886 4.89798 19.99 4.80011V0.500113C19.9927 0.434565 19.982 0.36915 19.9585 0.307906C19.935 0.246662 19.8992 0.19089 19.8532 0.144034C19.8073 0.0971779 19.7523 0.0602325 19.6915 0.0354787C19.6308 0.010725 19.5656 -0.00131124 19.5 0.000113157H15.21C15.1113 -0.000466707 15.0146 0.0281869 14.9321 0.0824629C14.8497 0.136739 14.7851 0.214208 14.7466 0.305108C14.7081 0.396007 14.6974 0.496269 14.7158 0.593257C14.7342 0.690244 14.7809 0.779617 14.85 0.850113Z"
        fill="white"
      />
    </svg>
  );
};

export default TrendingIcon;
