"use client";
import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import React, { useEffect, useState } from "react";

import useRoomStore, { ImageUrl } from "@/store/room/useRoomStore";

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
import MobileRoomUi from "./MobileRoomUi";
import useAuthenticationStore from "@/store/useAuthenticationStore";

const Room: React.FC = () => {
  const roomToken = useRoomStore().room?.token;
  const chatStore = useChatStore();
  const roomStore = useRoomStore();
  const authenticationStore = useAuthenticationStore();
  const roomImageStore = useImagesStore();
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
    if (!roomImageStore.isRoomJoined) {
      joinRoom();
    }
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

  return (
    <div className="h-full min-h-screen w-full overflow-hidden bg-white px-2 py-5 dark:bg-[#010101] lg:px-10">
      <LiveKitRoom
        token={roomToken}
        connect={true}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className="flex-1"
      >
        {vw > 1024 ? (
          <div className="hidden grid-cols-12 space-x-6 lg:grid">
            <div className="col-span-3 space-y-10 h-auto">
              <div className="fixed h-full w-[20%] space-y-3">
                <div>
                  <RoomHeader />
                </div>
                <div className="h-auto lg:relative lg:h-[calc(100vh-256px)]">
                  <RoomFooter />
                </div>
              </div>
            </div>
            <div className="col-span-5 space-y-10 h-auto">
              <div className="fixed h-auto w-[50%] space-y-3">
                <div>
                  <RoomHeader />
                </div>
                <div className="h-auto lg:relative lg:h-[calc(100vh-256px)]">
                  <RoomFooter />
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col">
                <RoomAd />
              </div>
              <div className="mt-4 flex h-fit w-full flex-col">
                <RoomUsers />
              </div>
            </div>
          </div>
        ) : (
          <MobileRoomUi />
        )}
      </LiveKitRoom>
    </div>
  );
};

export default Room;
