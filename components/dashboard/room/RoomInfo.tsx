import useRoomStore from "@/store/room/useRoomStore";
import React from "react";

function RoomInfo() {
  const roomStore = useRoomStore();
  return <div>{roomStore.room?.description}</div>;
}

export default RoomInfo;
