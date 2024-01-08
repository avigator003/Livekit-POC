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
import { Spinner } from "@nextui-org/react";
import { WhalesRoom } from "@/types/WhalesRoom";
import { useJoinRoom } from "@/hooks/room/userRoomJoin";
import { useRouter } from "next/navigation";

function Rooms() {
  const roomStore = useRoomStore();
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

  const getRooms = async () => {
    try {
      const result = await RoomFactory.getInstance().getAll();
      const allRooms: any[] = result.rooms.map((room: any) => ({
        description: room.description,
        roomName: room.roomName,
        id: room.room_id,
        host: room.host,
        thumbnail: room.thumbnail,
      }));
      roomStore.setRooms(allRooms);
      roomStore.setFilteredRooms(allRooms);
      console.log("doing1",roomStore.isNewRoomCreated)
      if (roomStore.isNewRoomCreated) {
        onJoinPress();
      }
      return result.rooms;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setupHeaderToken();
    console.log("doing",roomStore.isNewRoomCreated)
    if (roomStore.isNewRoomCreated) {
      query.invalidateQueries({queryKey:["rooms"]})
      setOpenCreateRoomModal();
      roomStore.handleIsNewRoomCreated(false);
    }  
  }, [roomStore.isNewRoomCreated]);

  const onJoinPress = useJoinRoom(roomsData[0], setJoiningRoom, router);

  //Get Rooms
  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["rooms"],
    () => getRooms(),
    { staleTime: 50000, retry: 1 }
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader isLabled={true} label="Loading Rooms" />
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-5 flex w-full items-center justify-between">
        <p className="text-md font-bold dark:text-white">All Live Rooms</p>
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
