import { Button } from "@nextui-org/button";
import Image from "next/image";
import React from "react";

import AppStoreIcon from "@/svgs/appstore";
import PlayStoreIcon from "@/svgs/playstore";

const Header: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-5 px-2 pt-5 md:grid md:grid-cols-12 md:gap-0 md:px-0 md:pt-14">
      <div className="flex flex-col items-center justify-center px-2 md:col-span-6 md:items-start">
        <h1 className="max-w-sm bg-gradient-to-br from-[#3578EA] to-[#B53AE1] bg-clip-text text-center text-3xl font-extrabold text-transparent md:max-w-none md:text-start md:text-4xl lg:text-5xl lg:leading-[4rem]">
          A Global Social Networking and OTT Platform for <br /> Traders,
          Investors & <br /> Financial Creators
        </h1>

        <div className="mt-5 flex w-full max-w-[18rem] items-center gap-2">
          <Button
            variant="bordered"
            className="flex w-full items-center gap-3 rounded-md border border-[#050505] px-2 py-2 dark:border-border"
          >
            Get it on <PlayStoreIcon size={{ width: 20, height: 20 }} />
          </Button>
          <Button
            variant="bordered"
            className="flex w-full items-center gap-3 rounded-md border border-[#050505] px-2 py-2 dark:border-border"
          >
            Get it on <AppStoreIcon size={{ width: 20, height: 20 }} />
          </Button>
        </div>
      </div>
      <div className="w-full md:col-span-6">
        <div className="relative mx-auto h-[310px] w-[314px] md:ml-auto md:mr-0 lg:h-[529px] lg:w-[543px]">
          <Image
            src="/hero_section_image.svg"
            fill
            style={{ objectFit: "cover" }}
            alt="rev_soon_1"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
