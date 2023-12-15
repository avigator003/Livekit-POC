import useAudioHandler from "@/hooks/room/room-actions/useAudioHandler";
import useCameraHandler from "@/hooks/room/room-actions/useCameraHandler";
import useEndRoomHandler from "@/hooks/room/room-actions/useEndRoomHandler";
import useHandRaiseHandler from "@/hooks/room/room-actions/useHandRaiseHandler";
import useScreenShareHandler from "@/hooks/room/room-actions/useScreenShareHandler";
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
import { useCurrentCoHost, useCurrentHost } from "@/hooks/room/useCurrentHost";
import { useLocalParticipant } from "@livekit/components-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAudioVideoEnables } from "@/hooks/room/useAudioVideoEnabled";
import { Button } from "@nextui-org/button";
import useRoomStore from "@/store/room/useRoomStore";
import OpenMicIcon from "@/svgs/room/openmic";
import OffMicIcon from "@/svgs/room/offmic";
import ChatIcon from "@/svgs/room/chat";
import HandraiseIcon from "@/svgs/room/handraise";
import BlockedIcon from "@/svgs/room/blocked";
import EgressIcon from "@/svgs/room/egress";
import ImageUploadIcon from "@/svgs/room/imageupload";
import ScreenShareIcon from "@/svgs/room/screenshare";
import VideoOnIcon from "@/svgs/room/videoon";
import VideoOffIcon from "@/svgs/room/videooff";
import EndRoomIcon from "@/svgs/room/endroom";

interface DesktopRoomFooterProps {
  handleImageUpload: () => void;
  handleEgress: (value: boolean) => void;
  handleBlockedUsersDialogOpenChange: (value: boolean) => void;
  handleHandRaisedParticipantsDialogOpenChange: (value: boolean) => void;
}

function DesktopRoomFooter(props: DesktopRoomFooterProps) {
  const {
    handleEgress,
    handleBlockedUsersDialogOpenChange,
    handleHandRaisedParticipantsDialogOpenChange,
    handleImageUpload,
  } = props;

  const roomStore = useRoomStore();
  const { isCameraEnabled, isMicrophoneEnabled } = useLocalParticipant();

  const isCurrentUserHost = useCurrentHost();
  const isCurrentCoHost = useCurrentCoHost();

  const { handleCamera } = useCameraHandler();
  const { handleAudio } = useAudioHandler();
  const { handleScreenShare } = useScreenShareHandler();
  const { handleHandRaise } = useHandRaiseHandler();
  const { endRoom } = useEndRoomHandler();

  const {
    isAudioEnabled,
    isScreeneShareEnabled,
    isVideoEnabled,
  } = useAudioVideoEnables();

  const handleChatModal = () => {
    roomStore.setIsChatOpen();
  };

  return (
    <div className="inline-flex space-x-6 px-4 py-1 dark:bg-[#0D0F13] w-[48%] items-center justify-center">
      {/* <div className="w-full z-40 h-[5rem] flex flex-row space-x-4 bg-white p-2  items-center justify-center"> */}

      <div className="space-x-28 flex flex-row">
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

            <div className="cursor-pointer rounded-lg p-[0.5rem]">
              <div
                className="flex flex-row justify-between p-[0.5rem] rounded-full px-6"
                style={{
                  background:
                    "linear-gradient(97deg, #A54FE7 0.07%, #3578EA 99.93%)",
                }}
                onClick={handleChatModal}
              >
                <div className="mt-[0.2rem] mr-2">
                  <ChatIcon size={{ width: 30, height: 30 }} />
                </div>
                <p className="text-[1.25rem] font-roboto">Chat</p>
              </div>
            </div>
          </>
        )}

        {isVideoEnabled && (
          <div
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-500"
            onClick={handleChatModal}
          >
            <ChatIcon size={{ width: 30, height: 30 }} />
          </div>
        )}
      </div>

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
          className="mt-[0.3rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
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

      {(isCurrentUserHost || isCurrentCoHost) && (
        <div
          className="mt-[0.5rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={() => handleHandRaisedParticipantsDialogOpenChange(true)}
        >
          <HandraiseIcon size={{ width: 30, height: 30 }} />
        </div>
      )}

      {/* {(isCurrentUserHost || isCurrentCoHost) && (
        <div
          className="mt-[0.5rem] ml-[2rem]"
          onClick={() => handleBlockedUsersDialogOpenChange(true)}
        >
          <BlockedIcon size={{ width: 30, height: 30 }} />
        </div>
      )} */}

      {isCurrentUserHost && (
        <div
          className="mt-[0.5rem] ml-[0.6rem] cursor-pointer rounded-lg p-2 hover:bg-gray-500"
          onClick={() => {
            handleEgress(true);
          }}
        >
          <EgressIcon size={{ width: 30, height: 30 }} />
        </div>
      )}

      {isCurrentUserHost && (
        <div
          className="mt-[0.5rem] ml-[0.6rem] cursor-pointer̃"
          onClick={endRoom}>
          <EndRoomIcon size={{ width: 30, height: 30 }} />
        </div>
      )}
    </div>
  );
}

export default DesktopRoomFooter;
