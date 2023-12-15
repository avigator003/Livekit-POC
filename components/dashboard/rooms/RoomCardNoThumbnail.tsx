"use client";

import { Spinner } from "@nextui-org/react";
import { BarChart2, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import no_thumbnail from "@/public/no_thumbnail.svg";
import { RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore from "@/store/room/useRoomStore";
import { WhalesRoom } from "@/types/WhalesRoom";
import Lottie from "lottie-react";
import liveAnimation from "../../../public/lottie/live.json";
import { setupHeaderToken } from "@/setup/api";
import { useJoinRoom } from "@/hooks/room/userRoomJoin";

export default function RoomCardNoThumbnail({ room }: any) {
  const router = useRouter();
  const {  roomName, host, textThumbnail } = room;
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

      <div className="w-full">
        <div className="relative flex h-[202.99px] w-full items-center justify-center px-4 pt-4">
          {joiningRoom ? (
            <div className="self-center text-center text-lg uppercase text-gray-900 dark:text-white">
              <Spinner
                color="success"
                size="lg"
                classNames={{
                  wrapper: "h-14 w-14",
                }}
              />
              <p className="mt-10 text-lg text-faceBlue">Joining Room..</p>
            </div>
          ) : (
            <Image
              src={no_thumbnail}
              fill
              alt="Room Thumbnail"
              className="rounded-t-[20px] object-cover"
            />
          )}

          {!joiningRoom && (
            <div className="flex flex-1 flex-col text-center z-30 w-full">
              <p
                className={`overflow-hidden line-clamp-4 text-[1.2rem] text-gray-900 dark:text-white w-full`}
              >
                {textThumbnail}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[90px] w-full items-center gap-4 rounded-b-[20px] bg-[#07080C] px-2 py-4">
        <div className="relative ml-2 h-[40px] w-[40px]">
          <Image
            fill
            className="self-center rounded-full object-cover"
            alt="Profile Picture"
            src="https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg"
          />
        </div>

        <div className="flex flex-col items-start">
          <p
            className={`overflow-hidden line-clamp-2 text-[0.87rem] text-gray-900 dark:text-white mb-1 w-full`}
          >
            {" "}
            {roomName}
          </p>
          <p className="truncate text-[0.75rem] text-default-400">
            {host.name} (HOST) • 20K Inside Room
          </p>
        </div>
        <MoreVertical size={20} className="ml-auto" />
      </div>
    </div>
  );
}
