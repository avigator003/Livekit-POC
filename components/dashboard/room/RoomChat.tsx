"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/room/useChatStore";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { useLocalParticipant } from "@livekit/components-react";
import { Avatar, Input } from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import { DataPacket_Kind } from "livekit-client";
import { Camera, SendHorizonal, Smile } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

function RoomChat() {
  const chatStore = useChatStore();
  const chatMessages = useChatStore((state) => state.chatMessages);
  const authStore = useAuthenticationStore();

  const [liveChatMesssages, setLiveChatMessages] = useState<any>();
  const [chatMessage, setChatMessage] = useState<string>();
  const { localParticipant }: any = useLocalParticipant();

  useEffect(() => {
    setLiveChatMessages(chatMessages);
  }, [chatMessages]);

  const avatars = liveChatMesssages?.map((chat: any, index: number) => (
    <div key={index} className="my-2 flex w-full flex-col">
      <div className="mb-2 flex items-center justify-start space-x-3">
        <div className="flex w-full max-w-[95%] flex-row">
          <div className="w-7/8">
            <Avatar
              classNames={{
                img: ["!opacity-100"],
              }}
              size="sm"
              alt="User Image"
              radius="full"
              src={chat?.user?.profile_photo}
            />
          </div>
          <div className="w-1/8 ml-3 flex flex-grow flex-col">
            <p className="text-xs font-extrabold text-[#B7B7B7]">
              {chat?.user?.name}:
            </p>
            <p className="break-all text-white">{chat?.messageBody}</p>
          </div>
        </div>
      </div>
    </div>
  ));

  const sendCustomData = useCallback(
    (data: any) => {
      if (localParticipant?.permissions?.canPublishData) {
        const strData = JSON.stringify(data);
        const encoder = new TextEncoder();
        localParticipant?.publishData(
          encoder.encode(strData),
          DataPacket_Kind.RELIABLE
        );
      } else {
        toast.error("You don't have enough permission yet");
      }
    },
    [localParticipant]
  );

  const sendMessage = () => {
    if (!chatMessage) return;
    if (localParticipant?.permissions?.canPublishData) {
      const userDetails = {
        name: authStore.user?.name,
        _id: authStore.user?.id,
        profile_photo: authStore.user?.profilePhoto,
      };

      const message = {
        user: userDetails,
        messageBody: chatMessage,
        createdAt: Date.now(),
        type: "message",
      };
      sendCustomData(message);
      chatStore.addChatMessage(message);
      setLiveChatMessages(chatStore.chatMessages);
      setChatMessage("");
    } else {
      console.log("You don't have enough permission yet");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === "Return") {
      // Call your method here
      sendMessage();
    }
  };

  return (
    <div
      className={cn(
        "relative col-span-12 h-full rounded-[8px] bg-white px-3 transition-all duration-500 dark:bg-[#121212] lg:mb-0"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <p className="my-5 text-xl">Live Chat</p>
        <button className="cursor-pointer">-</button>
      </div>

      <ScrollArea className={"h-[18rem] w-full"}>
        {liveChatMesssages?.length === 0 ? (
          <div className="flex w-full items-center justify-center mt-32">
            <p className="text-lg">No Chat Messages</p>
          </div>
        ) : (
          avatars
        )}
      </ScrollArea>

      <div className="absolute bottom-5 w-[94%]">
        <div className="flex items-center gap-3">
          {/* <div className="w-full">
        <EmojiPicker />
        </div> */}
          <Input
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
            radius="lg"
            type="text"
            classNames={{
              inputWrapper: ["h-11", "!bg-transparent"],
              mainWrapper: ["border", "border-[#D0D3DA80]", "rounded-lg"],
            }}
            placeholder="Message"
            onKeyDown={handleKeyDown}
            labelPlacement="outside"
            // startContent={
            //   <Smile className="pointer-events-none mr-1 text-black dark:text-white" />
            // }
          />
          <div
            className="cursor-pointer rounded-full border border-[#D0D3DA80] p-2 hover:bg-[#D0D3DA80]"
            onClick={sendMessage}
          >
            <SendHorizonal
              size={20}
              className="pointer-events-none text-black dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomChat;
