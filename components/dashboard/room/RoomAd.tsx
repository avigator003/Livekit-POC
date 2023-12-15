"use client";

import Image from "next/image";

function RoomAd() {
  return (
    <div className="relative h-[15.62rem] w-[18.75rem]">
      <Image
        alt="NextUI hero Image"
        src="https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg"
        className="rounded-md object-cover"
        fill
      />
    </div>
  );
}

export default RoomAd;
