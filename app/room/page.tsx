"use client";
import {
  LiveKitRoom,

} from "@livekit/components-react";
import "@livekit/components-styles";
import React, { useEffect, useState } from "react";

import useRoomStore, { ImageUrl } from "@/store/room/useRoomStore";
import MobileRoomUi from "./components/MobileRoomUi";

import RoomAd from "@/components/dashboard/room/RoomAd";
import RoomChat from "@/components/dashboard/room/RoomChat";
import RoomHeader from "@/components/dashboard/room/RoomHeader";
import RoomFooter from "@/components/dashboard/room/footer/RoomFooter";
import RoomUsers from "@/components/dashboard/room/users/RoomUsers";
import { RoomFactory } from "@/repository/RoomRepository";
import { setupHeaderToken } from "@/setup/api";
import useChatStore from "@/store/room/useChatStore";
import useImagesStore from "@/store/room/useImagesStore";
import { WhalesRoom } from "@/types/WhalesRoom";
import toast from "react-hot-toast";
import RoomAudioVideoRenderer from "@/components/dashboard/room/RoomAudioVideoRenderer";
import { motion } from "framer-motion";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { Room, ScreenSharePresets, VideoPreset, VideoPresets, videoCodecs } from "livekit-client";
import useRoomResolutionStore from "@/store/room/useRoomResolutionStore";
import Loader from "@/components/custom-ui/loader/Loader";

const LivekitRoom: React.FC = () => {
  const roomToken = useRoomStore().room?.token;
  const chatStore = useChatStore();
  const roomStore = useRoomStore();
  const roomImageStore = useImagesStore();
  const authenticationStore = useAuthenticationStore();
  const [livekitRoom, setLivekitRoom] = useState(null);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    chatStore.clearPersistedData();
    setupHeaderToken(authenticationStore.user?.token || "");
    window.addEventListener("resize", () => setVw(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setVw(window.innerWidth));
  }, []);

  useEffect(() => {
    joinRoom();
  }, []);

  const joinRoom = async () => {
    try {
      const room = roomStore.room;
      const { token, description, name, id, host, roomImages }: any = room;

      const result = await RoomFactory.getInstance().joinRoom({
        roomName: name || "",
        room_id: id || "",
      });
      if (result) {
        const images = result.data?.roomImages.map((image: any) => {
          const newImageUrl: ImageUrl = {
            url: image.image_url,
            userId: image.user._id,
          };
          return newImageUrl;
        });

        roomImageStore.setIsRoomJoined(true);
        roomStore.setUploadedImages(images);
        const room: WhalesRoom = {
          token: result.data.token,
          id: id,
          description,
          name: name,
          host,
          roomImages: images,
        };
        roomStore.setRoom(room);
      }
    } catch (err) {
      toast.error("Unable to Join room");
    }
  };

  useEffect(() => {
    const connectRoom = async () => {
      const room: any = new Room({
        publishDefaults: {
          videoCodec:'av1',
          screenShareEncoding: new VideoPreset(1280, 720, 750_000, 7, 'medium').encoding,
        },
      });
      const url = process.env.NEXT_PUBLIC_LIVEKIT_URL || "";
      const token = roomToken || "";
      await room.connect(url, token);
      setLivekitRoom(room);
    };
    connectRoom();
  }, []);

  if (livekitRoom === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader isLabled={true} label="Joining Room" />
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen w-full overflow-hidden bg-white px-2 py-5 dark:bg-[#010101] lg:px-10">
      {livekitRoom && (
        <LiveKitRoom
          room={livekitRoom}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          token={roomToken}
          className="flex-1"
        >
          {vw > 1024 ? (
            <div className="grid grid-cols-12 gap-4 h-full">
              {roomStore.isChatOpen && (
                <div className="col-span-3 space-y-10 h-screen">
                  <motion.div
                    className="fixed h-full space-y-3"
                    animate={{ width: roomStore.isChatOpen ? "23%" : "0%" }}
                  >
                    <div className="h-[95%]">
                      <RoomChat />
                    </div>
                  </motion.div>
                </div>
              )}
              <div
                className={`col-span-${
                  roomStore.isChatOpen ? "6" : "9"
                } flex flex-col h-full`}
              >
                {/* Fixed aspect content with 16:9 aspect ratio */}
                <div className="aspect-w-16 aspect-h-9">
                  <div className="relative mt-2 mb-20">
                    <RoomHeader />
                    {/* Content within the fixed aspect ratio container */}
                    <RoomAudioVideoRenderer />
                  </div>
                </div>
              </div>
              <div className="col-span-3 mt-[3rem]">
                <div className="fixed flex h-full w-[22%] flex-col gap-8">
                  <div className="">
                    <RoomAd />
                  </div>
                  <div className="h-auto w-auto lg:relative lg:h-[57%] md:h-[41%] overflow-y-auto">
                    <RoomUsers />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <MobileRoomUi />
          )}

          {roomStore.isChatOpen ? (
            <div className={`right-0 fixed bottom-5 w-full z-10`}>
              <RoomFooter />
            </div>
          ) : (
            <div className={`right-40 fixed bottom-5 w-full z-10`}>
              <RoomFooter />
            </div>
          )}
        </LiveKitRoom>
      )}
    </div>
  );
};

export default LivekitRoom;
