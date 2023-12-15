import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useLocalParticipant } from "@livekit/components-react";
import { useCurrentCoHost, useCurrentHost } from "@/hooks/room/useCurrentHost";
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
import { useAudioVideoEnables } from "@/hooks/room/useAudioVideoEnabled";
import OpenMicIcon from "@/svgs/room/openmic";
import OffMicIcon from "@/svgs/room/offmic";
import useLeaveRoomHandler from "@/hooks/room/room-actions/useLeaveRoom";
import HandraiseIcon from "@/svgs/room/handraise";
import ScreenShareIcon from "@/svgs/room/screenshare";
import ImageUploadIcon from "@/svgs/room/imageupload";
import VideoOnIcon from "@/svgs/room/videoon";
import VideoOffIcon from "@/svgs/room/videooff";

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
  const isCurrentCohost = useCurrentCoHost();
  const { isCameraEnabled, isMicrophoneEnabled } = useLocalParticipant();

  const { handleCamera } = useCameraHandler();
  const { handleAudio } = useAudioHandler();
  const { handleScreenShare } = useScreenShareHandler();
  const { handleHandRaise } = useHandRaiseHandler();
  const { endRoom } = useEndRoomHandler();
  const { leaveRoom } = useLeaveRoomHandler();

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

  const isCurrentCoHost = useCurrentCoHost();

  return (
    <div className="box_shadow dark:dark_box_shadow fixed bottom-0 left-0 z-50 col-span-12 space-x-5 flex w-full items-center justify-center rounded-t-[8px] bg-white px-2 py-2 dark:bg-[#121212] lg:hidden">
      <div className="flex flex-row justify-center">
        {!isCurrentUserHost && !isVideoEnabled && !isScreeneShareEnabled && (
          <>
            {isAudioEnabled ? (
              <div className="cursor-pointer rounded-lg p-[0.5rem]">
                <div
                  className="flex flex-row justify-between border-[#FFFFFF] border-1 p-[0.5rem] rounded-full px-6"
                  onClick={handleAudio}
                >
                  {isMicrophoneEnabled ? (
                    <>
                      <div className="mt-[0.2rem] mr-2">
                        <OpenMicIcon size={{ width: 30, height: 30 }} />
                      </div>
                      <p className="text-[1.25rem] font-roboto">On</p>
                    </>
                  ) : (
                    <>
                      <div className="mt-[0.2rem] mr-2">
                        <OffMicIcon size={{ width: 30, height: 30 }} />
                      </div>
                      <p className="text-[1.25rem] font-roboto">Off</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="cursor-pointer rounded-lg p-[0.5rem]">
                <div
                  className="flex flex-row justify-between border-[#FFFFFF] border-1 p-[0.5rem] rounded-full px-6"
                  onClick={handleHandRaise}
                >
                  <div className="mt-[0.2rem] mr-2">
                    <OpenMicIcon size={{ width: 30, height: 30 }} />
                  </div>
                  <p className="text-[1.25rem] font-roboto">Request</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* {!isVideoEnabled && (
        <div className="flex flex-row justify-between border-[#FFFFFF] border-1 p-[0.5rem] rounded-full px-6 space-x-3">
          <Image
            src={logout}
            alt="Whalesbook Logo"
            width={25}
            height={25}
            onClick={leaveRoom}
            className="cursor-pointer"
          />
          <p className="text-[1.25rem] font-roboto">Leave</p>
        </div>
      )} */}

      {isAudioEnabled && (isVideoEnabled || isScreeneShareEnabled) && (
        <div
          className="mt-[0.3rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={handleAudio}
        >
          {isMicrophoneEnabled ? (
            <OpenMicIcon size={{ width: 30, height: 30 }} />
          ) : (
            <OffMicIcon size={{ width: 30, height: 30 }} />
          )}
        </div>
      )}

      {isVideoEnabled && (
        <div
          className="mt-[0.3rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={handleCamera}
        >
          {isCameraEnabled ? (
            <VideoOnIcon size={{ width: 30, height: 30 }} />
          ) : (
            <VideoOffIcon size={{ width: 30, height: 30 }} />
          )}
        </div>
      )}
      {isScreeneShareEnabled && (
        <div
          className="mt-[0.1rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={handleScreenShare}
        >
          <ScreenShareIcon size={{ width: 30, height: 30 }} />
        </div>
      )}

      {(isCurrentUserHost || isScreeneShareEnabled) && (
        <div
          className="mt-[0.3rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={handleImageUpload}
        >
          <ImageUploadIcon size={{ width: 30, height: 30 }} />
        </div>
      )}
      

      {(isScreeneShareEnabled ||
        isVideoEnabled ||
        isCurrentUserHost ||
        isCurrentCohost) && (
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
              className={`cursor-pointer p-2 ${
                isCurrentUserHost || isCurrentCoHost ? "" : "hidden"
              }`}
            >
              <div className="flex items-center gap-2">
                <HandraiseIcon size={{ width: 30, height: 30 }} />
                Raised Hand Requests
              </div>
            </DropdownItem>
            <DropdownItem
              key="live"
              className="cursor-pointer rounded-lg p-2 hover:bg-gray-500"
              onClick={() => {
                handleEgress(true);
              }}
            >
              <div className="flex items-center gap-2">
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

            <DropdownItem
              key="logout"
              className={`cursor-pointer p-2 ${
                isCurrentUserHost ? "" : "hidden"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={logout}
                  alt="Whalesbook Logo"
                  width={30}
                  height={30}
                  onClick={endRoom}
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
