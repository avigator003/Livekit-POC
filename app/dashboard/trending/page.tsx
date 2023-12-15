import Image from "next/image";
import React from "react";
import plat_store from "@/public/playStore.svg";

function Trending() {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 1xl:grid-cols-2">
        <div className="p-16">
        <Image
          src={"/feature_4.svg"}
          alt="feature_4"
          width={450}
          height={450}
        />
        </div>
      <div className="p-16 lg:mt-32 md:mt-12 space-y-6 text-left">
        <p className="text-[1.2rem] ml-3">
          The feature you're looking for is not currently available on our
          website. However, you can access it through our app.
        </p>
        <div className="flex flex-row">
          <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
            <Image
              src={plat_store}
              alt="Whalesbook Logo"
              width={200}
              height={200}
              className="cursor-pointer"
            />
          </div>
          <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
            <Image
              src={plat_store}
              alt="Whalesbook Logo"
              width={200}
              height={200}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;
