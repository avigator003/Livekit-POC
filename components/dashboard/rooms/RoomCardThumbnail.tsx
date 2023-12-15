"use client";

import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Spinner } from "@nextui-org/react";
import liveAnimation from "../../../public/lottie/live.json";
import { useJoinRoom } from "@/hooks/room/userRoomJoin";
import { setupHeaderToken } from "@/setup/api";
import useRoomStore from "@/store/room/useRoomStore";

export default function RoomCardThumbnail({ room }: any) {
  const router = useRouter();
  const roomStore =useRoomStore();
  const {
    roomName,
    thumbnail,
    host,
  } = room;
  const [isHovered, setIsHovered] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState<boolean>(false);


  const onJoinPress = useJoinRoom(room, setJoiningRoom, router);

  return (
    <div
      className={`relative h-full max-h-[293px] w-full transform cursor-pointer rounded-[20px] transition-transform hover:scale-110 ${
        isHovered ? "bg-transparent" : ""
      }`}
      onClick={onJoinPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute left-2 top-2 z-10 flex items-center gap-2 rounded-[4px] bg-red-500 px-2 py-0.5 text-white text-[0.9rem]">
           <Lottie
            animationData={liveAnimation}
            className="h-5 w-5"
          />
        LIVE
      </div>

      {joiningRoom ? (
        <div className="top-50 relative h-[202.99px] w-full self-center text-center">
          <Spinner
            color="success"
            size="lg"
            classNames={{
              wrapper: "h-14 w-14 mt-10",
            }}
          />
          <p className="mt-5 text-lg text-faceBlue">Joining Room..</p>
        </div>
      ) : (
        <div className="relative h-[202.99px] w-full">
          <Image
            src={thumbnail}
            fill
            alt="Room Thumbnail"
            className="rounded-t-[20px] object-cover"
          />
        </div>
      )}

      <div className="flex h-[90px] w-full items-center gap-4 rounded-b-[20px] bg-[#07080C] px-2">
        <div className="relative ml-2 h-[40px] w-[40px]">
          <Image
            fill
            className="self-center rounded-full object-cover"
            alt="Profile Picture"
            src="https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg"
          />
        </div>

        <div className="flex flex-1 flex-col items-start">
          <p
            className={`overflow-hidden line-clamp-2 text-[0.87rem] text-gray-900 dark:text-white mb-1`}
          >
            {" "}
            {roomName}
          </p>
          <p className="truncate text-[0.75rem] text-default-400">
            {host.name} (HOST) • 20K InsIde Room
          </p>
        </div>
        <MoreVertical size={20} className="ml-auto" />
      </div>
    </div>
  );
}
