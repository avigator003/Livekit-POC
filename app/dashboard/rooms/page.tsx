"use client";

import { Button } from "@nextui-org/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Loader from "@/components/custom-ui/loader/Loader";
import CreateRoomModal from "@/components/dashboard/rooms/CreateRoomModal";
import RoomCardNoThumbnail from "@/components/dashboard/rooms/RoomCardNoThumbnail";
import RoomCardThumbnail from "@/components/dashboard/rooms/RoomCardThumbnail";
import { RoomFactory } from "@/repository/RoomRepository";
import { setupHeaderToken } from "@/setup/api";
import useRoomStore from "@/store/room/useRoomStore";
import { useJoinRoom } from "@/hooks/room/userRoomJoin";
import { useRouter } from "next/navigation";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { Select as CustomSelect, SelectItem } from "@nextui-org/react";
import useRoomResolutionStore, {
  Resolution,
} from "@/store/room/useRoomResolutionStore";
import {
  ScreenSharePresets,
  VideoEncoding,
  VideoPresets,
  videoCodecs,
} from "livekit-client";

function Rooms() {
  const roomStore = useRoomStore();
  const authenticationStore = useAuthenticationStore();
  const {
    setVideoCodec,
    videoCodec,
    screenSharePretests,
    setScreenSharePretests,
  } = useRoomResolutionStore();
  const router = useRouter();
  const query = useQueryClient();

  const [
    openCreateRoomModal,
    setOpenCreateRoomModal,
  ] = useRoomStore((state) => [
    state.openCreateRoomModal,
    state.setOpenCreateRoomModal,
  ]);

  const roomsData: any = roomStore.filteredRooms || {};
  const [joiningRoom, setJoiningRoom] = useState<boolean>(false);
  const [roomToJoin, setRoomToJoin] = useState();

  const getRooms = async () => {
    try {
      const token = authenticationStore.user?.token || "";
      await setupHeaderToken(token);
      const result = await RoomFactory.getInstance().getAll();
      const allRooms: any[] = result.rooms.map((room: any) => ({
        description: room.description,
        roomName: room.roomName,
        id: room.room_id,
        host: room.host,
        thumbnail: room?.thumbnail,
        textThumbnail: room.textThumbnail,
      }));
      setRoomToJoin(allRooms[0]);
      roomStore.setRooms(allRooms);
      roomStore.setFilteredRooms(allRooms);
      return result.rooms;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomStore.isNewRoomCreated) {
      query.invalidateQueries({ queryKey: ["rooms"] });
      setOpenCreateRoomModal();
    }
  }, [roomStore.isNewRoomCreated]);
  //Get Rooms
  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["rooms"],
    () => getRooms(),
    {
      staleTime: 50000,
      retry: 1,
      onSuccess: (data) => {
        if (roomStore.isNewRoomCreated) {
          onJoinPress();
          roomStore.handleIsNewRoomCreated(false);
        }
      },
    }
  );

  const onJoinPress = useJoinRoom(roomsData[0], setJoiningRoom, router);

  const handleScreensharePretests = (value: string) => {
    //@ts-ignore
    const videoEncoding: VideoEncoding = value;
    console.log("typeif", typeof videoEncoding, videoEncoding.maxBitrate);
    // setScreenSharePretests(videoEncoding);
  };

  const handleVideoCodecs = (value: string) => {
    setVideoCodec(videoCodecs[Number(value)]);
  };

  const getResolution = (value: string) => {
    const [widthStr, heightStr] = value.split("x");

    // Convert width and height to integers
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);

    const resolution: Resolution = {
      width,
      height,
    };
    return resolution;
  };

  const videoOptions = [
    { value: "h360fps3", label: "h360fps3" },
    { value: "h720fps5", label: "h720fps5" },
    { value: "h720fps15", label: "h720fps15" },
    { value: "h720fps30", label: "h720fps30" },
    { value: "h1080fps15", label: "h1080fps15" },
    { value: "h1080fps30", label: "h1080fps30" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader isLabled={true} label="Loading Rooms" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-5 flex w-full items-center justify-between">
        <p className="text-md font-bold dark:text-white w-40">All Live Rooms</p>
        {/* <div className="flex flex-row justify-start space-x-8 w-full ml-10 relative bottom-5">
          <> {console.log("vide", typeof videoCodec)}</>
          <div>
            <CustomSelect
              size="lg"
              label="Video Codec"
              labelPlacement="outside"
              variant="bordered"
              defaultSelectedKeys={[String(videoCodecs.indexOf(videoCodec))]}
              value={videoCodec}
              onChange={(e) => handleVideoCodecs(e.target.value)}
              classNames={{
                innerWrapper: ["text-gray-900 dark:text-white w-24"],
                selectorIcon: ["text-gray-900 dark:text-white"],
                label: ["!mt-2"],
                trigger: [
                  "!mt-5",
                  "border-[2px]",
                  "border-borderColor",
                  "rounded-[10px]",
                  "!text-sm",
                ],
              }}
            >
              <SelectItem key={"1"} value={"1"}>
                H.264
              </SelectItem>
              <SelectItem key={"0"} value={"0"}>
                VP8
              </SelectItem>
              <SelectItem key={"2"} value={"2"}>
                VP9
              </SelectItem>
              <SelectItem key={"3"} value={"3"}>
                AV1
              </SelectItem>
            </CustomSelect>
          </div>
        </div> */}

        <Button
          radius="lg"
          onClick={() => setOpenCreateRoomModal()}
          className="h-9 rounded-lg bg-faceBlue p-2 text-white shadow-lg"
        >
          Create New Room
        </Button>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 1xl:grid-cols-3">
        {roomsData?.map((room: any) => (
          <div key={room.id}>
            {room.thumbnail ? (
              <RoomCardThumbnail room={room} />
            ) : (
              <RoomCardNoThumbnail room={room} />
            )}
          </div>
        ))}
      </div>

      <CreateRoomModal
        isOpen={openCreateRoomModal}
        onClose={() => {
          setOpenCreateRoomModal();
        }}
      />
    </div>
  );
}

export default Rooms;
