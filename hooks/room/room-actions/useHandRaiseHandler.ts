// useHandRaiseHandler.ts
import { useCallback } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import useCustomDataSender from "./useCustomDataSender"; // Make sure to import your existing custom hook
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { RoomFactory } from "@/repository/RoomRepository";
import useRoomStore from "@/store/room/useRoomStore";

interface HandRaiseHandlerHook {
  handleHandRaise: () => Promise<void>;
}

const useHandRaiseHandler = (): HandRaiseHandlerHook => {
  const { localParticipant } = useLocalParticipant();
  const { sendCustomData } = useCustomDataSender(); // Use your existing custom hook
  const authStore = useAuthenticationStore();
  const roomStore = useRoomStore();

  const handleHandRaise = useCallback(async () => {
    const user = authStore.user;
    const handRaisedData = {
      userId: user?.id,
      raised: true,
      username: user?.userName,
      name: user?.name,
      profilePic: "",
      type: "handraise",
      identity: localParticipant?.identity,
      metadata: localParticipant?.metadata,
    };

    sendCustomData(handRaisedData);

    const result = await RoomFactory.getInstance().raiseHand(
      roomStore.room?.id,
      user?.id
    );
  }, [localParticipant, sendCustomData, authStore, roomStore]);

  return {
    handleHandRaise,
  };
};

export default useHandRaiseHandler;
