import Image from "next/image";

const TrendingIcon: React.FC<SvgProps> = ({ color, size, className }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_975_15346)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.0691 18.4532L27.6652 22.0493C28.1114 22.495 28.1114 23.2196 27.6652 23.6653C27.2194 24.1116 26.4949 24.1116 26.0491 23.6653L22.4531 20.0693L24.0691 18.4532Z"
          fill="#FBFCFF"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.2608 17.6454L21.6448 19.2614L20.5391 18.1563C21.1328 17.6751 21.6745 17.1334 22.1556 16.5397L23.2608 17.6454Z"
          fill="#FBFCFF"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.9538 4.5686L24.5716 1.95087V4.00002C24.5716 4.31545 24.8276 4.57146 25.143 4.57146C25.4584 4.57146 25.7144 4.31545 25.7144 4.00002V0.571432C25.7144 0.256002 25.4584 0 25.143 0H21.7144C21.399 0 21.143 0.256002 21.143 0.571432C21.143 0.886862 21.399 1.14286 21.7144 1.14286H23.7635L21.2812 3.62516C19.4995 1.41486 16.7709 0 13.7143 0C8.3526 0 4 4.3526 4 9.71434C4 15.0761 8.3526 19.4287 13.7143 19.4287C19.0761 19.4287 23.4287 15.0761 23.4287 9.71434C23.4287 7.82519 22.8881 6.0606 21.9538 4.5686ZM20.703 5.82003L15.2612 11.2612C15.0384 11.4846 14.6761 11.4846 14.4532 11.2612L11.4286 8.23662L6.49715 13.1681C7.78745 15.8567 10.5355 17.7144 13.7143 17.7144C18.1298 17.7144 21.7144 14.1298 21.7144 9.71434C21.7144 8.30119 21.347 6.97261 20.703 5.82003ZM20.0607 4.84574C18.5978 2.94173 16.2984 1.7143 13.7143 1.7143C9.29889 1.7143 5.7143 5.29889 5.7143 9.71434C5.7143 10.5092 5.8303 11.2772 6.04687 12.0024L11.0246 7.02461C11.2475 6.80118 11.6098 6.80118 11.8326 7.02461L14.8572 10.0492L20.0607 4.84574Z"
          fill="#FBFCFF"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_975_15346"
          x="0"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_975_15346"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_975_15346"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    // <Image
    //   src="/AdminFlowAssets/trending.png"
    //   alt="Whalesbook_Logo"
    //   height={20}
    //   width={20}
    // />
  );
};

export default TrendingIcon;
