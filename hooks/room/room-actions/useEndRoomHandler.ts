// useEndRoomHandler.ts
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useRoomStore from "@/store/room/useRoomStore";
import { EndRoomData, RoomFactory } from "@/repository/RoomRepository";
import { EgressFactory } from "@/repository/EgressRepository";
import toast from "react-hot-toast";

interface EndRoomHandlerHook {
  endRoom: () => Promise<void>;
}

const useEndRoomHandler = (): EndRoomHandlerHook => {
  const router = useRouter();
  const roomStore = useRoomStore();

  const endRoom = useCallback(async () => {
    const data: EndRoomData = {
      room_id: roomStore.room?.id || "",
    };
    await RoomFactory.getInstance().endRoom(data);
    router.push("/dashboard/rooms");
  }, [roomStore, router]);

  return {
    endRoom,
  };
};

export default useEndRoomHandler;
