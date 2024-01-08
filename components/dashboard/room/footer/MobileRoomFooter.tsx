import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useLocalParticipant } from "@livekit/components-react";
import { useCurrentHost } from "@/hooks/room/useCurrentHost";
import useCameraHandler from "@/hooks/room/room-actions/useCameraHandler";
import useAudioHandler from "@/hooks/room/room-actions/useAudioHandler";
import useScreenShareHandler from "@/hooks/room/room-actions/useScreenShareHandler";
import useHandRaiseHandler from "@/hooks/room/room-actions/useHandRaiseHandler";
import useEndRoomHandler from "@/hooks/room/room-actions/useEndRoomHandler";
import { ChevronUp } from "lucide-react";
import audio_close_dark from "@/public/audio_close_dark.svg";
import logout from "@/public/logout.svg";
import audio_close_light from "@/public/audio_close_light.svg";
import audio_open_dark from "@/public/audio_open_dark.svg";
import audio_open_light from "@/public/audio_open_light.svg";
import blocked_users_dark from "@/public/blocked_users_dark.svg";
import blocked_users_light from "@/public/blocked_users_light.svg";
import broadcast_dark from "@/public/broadcast_dark.svg";
import broadcast_light from "@/public/broadcast_light.svg";
import handraise_dark from "@/public/handraise_dark.svg";
import handraise_light from "@/public/handraise_light.svg";
import screenshare_dark from "@/public/screenshare_dark.svg";
import screenshare_light from "@/public/screenshare_light.svg";
import video_close_dark from "@/public/video_close_dark.svg";
import video_close_light from "@/public/video_close_light.svg";
import video_open_dark from "@/public/video_open_dark.svg";
import video_open_light from "@/public/video_open_light.svg";
import gallery_dark from "@/public/gallery_dark.svg";
import { useTheme } from "next-themes";
import { useSpeakers } from "@/hooks/room/useSpeakers";
import { useAudioVideoEnables } from "@/hooks/room/useAudioVideoEnabled";

interface MobileRoomFooterProps {
  handleImageUpload: () => void;
  handleEgress: (value: boolean) => void;
  handleBlockedUsersDialogOpenChange: (value: boolean) => void;
  handleHandRaisedParticipantsDialogOpenChange: (value: boolean) => void;
}

function MobileRoomFooter(props: MobileRoomFooterProps) {
  const {
    handleEgress,
    handleBlockedUsersDialogOpenChange,
    handleHandRaisedParticipantsDialogOpenChange,
    handleImageUpload,
  } = props;

  const isCurrentUserHost = useCurrentHost();
  const { isCameraEnabled, isMicrophoneEnabled } = useLocalParticipant();

  const { handleCamera } = useCameraHandler();
  const { handleAudio } = useAudioHandler();
  const { handleScreenShare } = useScreenShareHandler();
  const { handleHandRaise } = useHandRaiseHandler();
  const { endRoom } = useEndRoomHandler();

  const { theme } = useTheme();

  let isDark = theme === "dark";

  let handraiseImage = isDark ? handraise_dark : handraise_light;
  let screenshareImage = isDark ? screenshare_dark : screenshare_light;
  let blocked_users = isDark ? blocked_users_dark : blocked_users_light;
  let broadcastImage = isDark ? broadcast_dark : broadcast_light;
  let audioOn = isDark ? audio_open_dark : audio_open_light;
  let audioOff = isDark ? audio_close_dark : audio_close_light;
  let videoOn = isDark ? video_open_dark : video_open_light;
  let videoOff = isDark ? video_close_dark : video_close_light;

  const {
    isAudioEnabled,
    isScreeneShareEnabled,
    isVideoEnabled,
  } = useAudioVideoEnables();

  return (
    <div className="box_shadow dark:dark_box_shadow fixed bottom-0 left-0 z-40 col-span-12 flex w-full justify-between space-x-4 rounded-t-[8px] bg-white px-2 py-2 dark:bg-[#121212] lg:hidden">
      {(isCurrentUserHost || isScreeneShareEnabled) && (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={gallery_dark}
            alt="Whalesbook Logo"
            width={23}
            height={23}
            onClick={handleImageUpload}
          />
        </div>
      )}

      {isVideoEnabled && (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={isCameraEnabled ? videoOn : videoOff}
            alt="Whalesbook Logo"
            className="cursor-pointer"
            width={30}
            height={30}
            onClick={handleCamera}
          />
        </div>
      )}

      {isAudioEnabled && (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={isMicrophoneEnabled ? audioOn : audioOff}
            className="cursor-pointer"
            alt="Whalesbook Logo"
            width={30}
            height={30}
            onClick={handleAudio}
          />
        </div>
      )}

      {!isCurrentUserHost && (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={handraiseImage}
            alt="Whalesbook Logo"
            className="cursor-pointer"
            width={30}
            height={30}
            onClick={handleHandRaise}
          />
        </div>
      )}

      {isScreeneShareEnabled && (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={screenshareImage}
            alt="Whalesbook Logo"
            width={30}
            height={30}
            className="cursor-pointer"
            onClick={handleScreenShare}
          />
        </div>
      )}

      {!isCurrentUserHost ? (
        <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
          <Image
            src={logout}
            alt="Whalesbook Logo"
            width={30}
            height={30}
            className="cursor-pointer"
            onClick={endRoom}
          />
        </div>
      ) : (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div className="cursor-pointer rounded-lg p-2 hover:bg-gray-500">
              <ChevronUp />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Room Actions" variant="faded">
            <DropdownItem
              onClick={() => handleHandRaisedParticipantsDialogOpenChange(true)}
              key="share"
              className="cursor-pointer p-2"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={handraiseImage}
                  alt="Whalesbook Logo"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                Raised Hand Requests
              </div>
            </DropdownItem>

            <DropdownItem
              key="profile"
              className="cursor-pointer rounded-lg p-2 hover:bg-gray-500"
            >
              <div
                className=" flex items-center gap-2"
                onClick={() => handleBlockedUsersDialogOpenChange(true)}
              >
                <Image
                  src={blocked_users}
                  alt="Whalesbook Logo"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                Blocked Users
              </div>
            </DropdownItem>

            <DropdownItem
              key="live"
              className="cursor-pointer rounded-lg p-2 hover:bg-gray-500"
              onClick={() => {
                handleEgress(true);
              }}
            >
              <div className=" flex items-center gap-2">
                <Image
                  src={broadcastImage}
                  alt="Boradcast"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                Broadcast
              </div>
            </DropdownItem>

            <DropdownItem key="logout" className="cursor-pointer p-2">
              <div className="flex items-center gap-2">
                <Image
                  src={logout}
                  alt="Whalesbook Logo"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                Leave Room
              </div>
            </DropdownItem>
            <DropdownItem key="logout" className="cursor-pointer p-2">
              <div
                className="flex items-center gap-2"
                onClick={() => {
                  endRoom();
                }}
              >
                <Image
                  src={logout}
                  alt="Whalesbook Logo"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                End Room
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}

export default MobileRoomFooter;
