import Image from "next/image";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer
      className="mt-8 bg-[#EFEFEF] px-8 py-3 dark:bg-[#0A0A0A]"
      id="contact"
    >
      <div className="mx-auto flex w-full flex-col">
        <div className="flex w-full items-center justify-center gap-1">
          <div className="relative h-[42px] w-[48px]">
            <Image src="/logo.png" alt="logo" fill />
          </div>
          <h3 className="text-lg font-medium text-black dark:text-white sm:text-xl">
            Whalesbook
          </h3>
        </div>

        <ul className="my-4 flex w-full flex-col items-center justify-center gap-3 font-medium sm:flex-row sm:gap-10">
          <li className="cursor-pointer text-black transition-all hover:text-black/50 dark:text-[#7D7C7C] dark:hover:text-white">
            About Us
          </li>
          <li className="cursor-pointer text-black transition-all hover:text-black/50 dark:text-[#7D7C7C] dark:hover:text-white">
            Privacy Policy
          </li>
          <li className="cursor-pointer text-black transition-all hover:text-black/50 dark:text-[#7D7C7C] dark:hover:text-white">
            Contact Us
          </li>
        </ul>

        <div className="flex items-center justify-center gap-6">
          <button className="rounded-full bg-faceBlue p-2 text-white">
            <Facebook size={20} />
          </button>
          <button className="rounded-full bg-faceBlue p-2 text-white">
            <Instagram size={20} />
          </button>
          <button className="rounded-full bg-faceBlue p-2 text-white">
            <Twitter size={20} />
          </button>
          <button className="rounded-full bg-faceBlue p-2 text-white">
            <Youtube size={20} />
          </button>
        </div>
      </div>

      <div className="mx-auto my-4 h-[1px] w-full max-w-6xl rounded-full border-[1px] border-[#BCBBBB] bg-[#BCBBBB] dark:border-[#5f5f5f] dark:bg-[#5f5f5f]" />

      <p className="w-full text-center text-sm text-[#7D7C7C] dark:text-white">
        &copy; 2023 Whale Pvt. Ltd. All Rights Reserved{" "}
      </p>
    </footer>
  );
};

export default Footer;
