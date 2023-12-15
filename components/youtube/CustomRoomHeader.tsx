import { useRemoteParticipants } from "@livekit/components-react";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

function CustomRoomHeader() {
  const participants = useRemoteParticipants();

  const getTotalParticipants = () => {
    const count = participants ? participants.length : 0;

    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "K";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else {
      return count;
    }
  };

  return (
    <div className="flex justify-start lg:p-2 space-x-6 mb-2">
      <div className="flex items-center gap-3 lg:gap-5">
        <div className="flex items-center justify-start gap-4">
          <div className="relative flex h-[75px] w-[84px] flex-col items-center">
            <Image src="/logo.png" alt="Whalesbook_Logo" fill />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-600 dark:text-white">
            WhalesBook
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center bg-[#D80032] px-4 rounded-sm">
        <p className="font-[1200] text-2xl text-white">Live</p>
        <p className="font-[1200] uppercase text-3xl text-white">{getTotalParticipants()}</p>
      </div>

      <div className="flex w-screen items-center justify-end space-x-3 lg:space-x-5">
        <Marquee direction="right" className="font-extrabold text-3xl">
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      </div>
    </div>
  );
}

export default CustomRoomHeader;
