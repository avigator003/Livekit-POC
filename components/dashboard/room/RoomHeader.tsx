"use client";

import {
  useDataChannel,
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useRoomStore, { ImageUrl } from "@/store/room/useRoomStore";
import { decodeJsonData } from "@/lib/utils";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import PermissionModal from "./modal/RoomPermissionsModal";
import { ArrowLeft, ChevronDown, Info, MoreVertical } from "lucide-react";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { useIncomingMessageHandler } from "./listeners/Listeners";
import { useRouter } from "next/navigation";
import { ListenerType } from "./listeners/ListenerType";
import ShadowModal from "@/components/custom-ui/modal/ShadowModal";
import RoomInfo from "./RoomInfo";
import { WhalesRoomImages } from "@/types/WhalesRoomImages";
import { RemoteTrackPublication, Track, VideoQuality } from "livekit-client";
import useUnmutedTracks from "@/hooks/room/useUnmutedTracks";

const RoomHeader = () => {
  const authenticationStore = useAuthenticationStore();
  const roomStore = useRoomStore();
  const router = useRouter();
  const authStore = useAuthenticationStore();
  const remoteParticipants = useRemoteParticipants();
  const [host, setHost] = useState<any>();
  const [remoteParticipant, setRemoteParticipants] = useState<any>([]);
  const speakersSet = useRef(new Set());
  const { localParticipant }: any = useLocalParticipant();

  const [handRaises, setHandRaises] = React.useState<any>([]);
  const [request, setRequest] = React.useState<any>({});
  const [handRaised, setHandRaised] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [roomInfoModal, setRoomInfoModal] = useState<boolean>(false);
  const incomingMessageHandler = useIncomingMessageHandler();
  const [videoQuality, setVideoQuality] = useState(0);

  const handleVideoQuality = (value: string) => {
    const trackUserId = JSON.parse(unmutedTracks[0]?.participant.metadata).userId;
    if (authenticationStore.user?.id !== trackUserId) {
      var publication = unmutedTracks[0].publication;
      switch (value) {
        case "0":
          publication?.setVideoQuality(VideoQuality.LOW);
          break;
        case "1":
          publication?.setVideoQuality(VideoQuality.MEDIUM);
          break;
        case "2":
          publication?.setVideoQuality(VideoQuality.HIGH);
          break;
        default:
          publication?.setVideoQuality(VideoQuality.OFF);
          break;
      }
    }
  };

  useEffect(() => {
    remoteParticipants?.forEach((participant: any) => {
      if (participant.metadata) {
        const metadata = JSON.parse(participant?.metadata);
        if (metadata.isHost) {
          setHost(metadata);
        }
      }
    });

    setRemoteParticipants(remoteParticipants);
    if (localParticipant.metadata) {
      const metadata = JSON.parse(localParticipant?.metadata);
      if (metadata.isHost) {
        setHost(metadata);
      }
    }
  }, [remoteParticipants]);

  // const handleParticipantPermissionsChanged = useCallback(
  //   (data: any) => {
  //     const identity = data?.identity;
  //     let participant: any = null;

  //     participant = remoteParticipant?.find((participant: any) => {
  //       return participant.identity === identity;
  //     });

  //     if (participant === null || participant === undefined)
  //       participant = localParticipant?.find((participant: any) => {
  //         return participant.identity === identity;
  //       });

  //     const metadata = JSON.parse(participant?.metadata);
  //     const newSpeakerSet = new Set(speakersSet.current);

  //     if (metadata.isHost || metadata.isCohost || metadata.isSpeaker) {
  //       setHandRaises((prevState: any) =>
  //         prevState.filter((item: any) => item.userId !== metadata.userId)
  //       );
  //       if (request.userId === metadata.userId) {
  //         handleDialogOpenChange(false);
  //       }

  //       newSpeakerSet.add(metadata.userId);
  //       setSpeakers((prevState: any) => {
  //         const index = prevState.findIndex(
  //           (item: any) => item?.identity === identity
  //         );
  //         if (index !== -1) {
  //           prevState[index] = participant;
  //         } else {
  //           prevState.push(participant);
  //         }
  //         return prevState;
  //       });
  //     } else {
  //       newSpeakerSet.delete(metadata.userId);
  //       setSpeakers((prevState) =>
  //         prevState.filter((item: any) => item?.identity !== identity)
  //       );
  //     }

  //     speakersSet.current = newSpeakerSet;
  //   },
  //   [request.userId]
  // );

  const handleHandRaise = useCallback(
    (data: any) => {
      const currentUserId = authStore.user?.id;
      if (data?.rejected) {
        if (data.userId === currentUserId) {
          setHandRaised(false);
        }
        handleDialogOpenChange(false);
        return;
      }

      if (data?.raised) {
        setRequest(data);
        const metadata = JSON.parse(localParticipant?.metadata);
        if (metadata.isHost || metadata.isCohost) {
          handleDialogOpenChange(true);

          const isAlreadyPresent = handRaises.find(
            (item: any) => item.userId === data.userId
          );
          if (!isAlreadyPresent) {
            setHandRaises((prevState: any) => [data, ...prevState]);
          }
        }
      } else {
        setHandRaises((prevState: any) =>
          prevState.filter((item: any) => item.userId !== data.userId)
        );
        //handleDialogOpenChange(false);
      }
    },
    [handRaises, localParticipant?.metadata]
  );

  const handleRoomImages = (jsonData: WhalesRoomImages) => {
    const images = jsonData.image_urls.map((image: any) => {
      const newImageUrl: ImageUrl = {
        url: image.image_url,
        userId: image?.user._id,
      };
      return newImageUrl;
    });
    roomStore.setUploadedImages(images);
  };

  // listen to data
  const handleData = (data: any) => {
    const loggedInUserId = authStore.user?.id;
    const jsonData = decodeJsonData(data.payload);

    const jsonDataType: ListenerType = jsonData.type;
    setUserId(jsonData.userId);
    switch (jsonDataType) {
      case ListenerType.HandRaise: {
        handleHandRaise(jsonData);
        break;
      }
      case ListenerType.Message:
        incomingMessageHandler(jsonData);
        break;
      case ListenerType.HandleScreenShare:
        if (jsonData?.user?._id !== loggedInUserId) {
          localParticipant?.setScreenShareEnabled(false);
          localParticipant?.setCameraEnabled(false);
        }
        break;
      case ListenerType.ImageUpdated:
      case ListenerType.ImageUploaded:
        handleRoomImages(jsonData);
        break;
    }
  };

  const { message } = useDataChannel(handleData);

  const handleDialogOpenChange = (value: boolean) => {
    setDialogOpen(value);
  };

  const handleBack = () => {
    router.push("/dashboard/rooms");
  };

  const handleRoomInfo = () => {
    setRoomInfoModal(!roomInfoModal);
  };

  const unmutedTracks: any[] = useUnmutedTracks() || [];

  return (
    <>
      <PermissionModal
        isOpen={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        userId={userId}
      />

      <ShadowModal
        isHeaderVisible={true}
        header="Room Description"
        body={<RoomInfo />}
        isOpen={roomInfoModal}
        onClose={handleRoomInfo}
      />

      <div className="col-span-12 space-y-3">
        <div className="col-span-8 flex-col md:col-span-8">
          <div className="flex justify-between lg:p-2">
            <div className="flex items-center gap-3 lg:gap-5">
              <ArrowLeft
                className="self-center cursor-pointer mr-6"
                size={24}
                onClick={handleBack}
              />
              <div className="rounded-full">
                <Avatar
                  size="sm"
                  isBordered
                  className="self-start"
                  color="danger"
                  src={host?.picture}
                />
              </div>
            </div>

            <p className="ml-3 w-full self-center truncate uppercase lg:ml-5">
              {roomStore.room?.name}
            </p>
            {/* {unmutedTracks?.length > 0 && (
              <div className="w-[30%] self-center truncate uppercase mr-10">
                <Select
                  size="md"
                  aria-label="quality"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Quality"
                  value={videoQuality}
                  onChange={(e) => handleVideoQuality(e.target.value)}
                  classNames={{
                    innerWrapper: ["text-gray-900 dark:text-white"],
                    selectorIcon: ["text-gray-900 dark:text-white"],
                    trigger: ["rounded-[10px]", "text-sm"],
                  }}
                >
                  <SelectItem key={VideoQuality.LOW} value={VideoQuality.LOW}>
                    LOW Quality
                  </SelectItem>
                  <SelectItem
                    key={VideoQuality.MEDIUM}
                    value={VideoQuality.MEDIUM}
                  >
                    MEDIUM Quality
                  </SelectItem>
                  <SelectItem key={VideoQuality.HIGH} value={VideoQuality.HIGH}>
                    HIGH Quality
                  </SelectItem>
                </Select>
              </div>
            )} */}

            <div className="flex w-fit items-center justify-end space-x-3 lg:space-x-5 cursor-pointer">
              <ChevronDown size={24} onClick={handleRoomInfo} />
              <MoreVertical size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomHeader;
