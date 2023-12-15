// useCustomDataSender.ts
import { useCallback } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import toast from "react-hot-toast";
import { DataPacket_Kind } from "livekit-client";

interface CustomDataSenderHook {
  sendCustomData: (data: any) => void;
}

const useCustomDataSender = (): CustomDataSenderHook => {
  const { localParticipant } = useLocalParticipant();

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

  return {
    sendCustomData,
  };
};

export default useCustomDataSender;
