
import Image from "next/image";
import React from "react";
import plat_store from "@/public/playStore.svg";

function Notifcations() {
  return (
    <div className="max-h-unit-6xl flex justify-center items-center">
      <div className="grid grid-cols-12  mt-64">
        <div className="col-span-3 ml-20"/>
        <div className="col-span-6">
          <p className="text-[1.2rem] ml-3 text-center">
            The feature you're looking for is not currently available on our
            website. However, you can access it through our app.
          </p>
          <div className="flex flex-row mt-10 ml-20">
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
          <div className="col-span-3 ml-20"/>
        </div>
      </div>
    </div>
  );
}

export default Notifcations;
