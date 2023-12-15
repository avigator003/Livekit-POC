// useScreenShareHandler.ts
import { useCallback } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import toast from "react-hot-toast";
import useCustomDataSender from "./useCustomDataSender"; // Make sure to import your existing custom hook
import useUserDetails from "../../common/useUserDetails";

interface ScreenShareHandlerHook {
  handleScreenShare: () => void;
}

const useScreenShareHandler = (): ScreenShareHandlerHook => {
  const { localParticipant, isScreenShareEnabled } = useLocalParticipant();
  const { sendCustomData } = useCustomDataSender(); // Use your existing custom hook
  const  userDetails = useUserDetails();

  const handleScreenShare = useCallback(() => {
    localParticipant
      .setScreenShareEnabled(!isScreenShareEnabled)
      .then(() => {
        localParticipant.setCameraEnabled(false);
        const message = {
          user: userDetails, // Assuming userDetails is accessible
          source: "screen",
          isStopped: isScreenShareEnabled,
          identity: localParticipant.identity,
          messageBody: "",
          createdAt: Date.now(),
          type: "handleScreenShare",
        };
        sendCustomData(message);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, [localParticipant, isScreenShareEnabled, sendCustomData, userDetails]);

  return {
    handleScreenShare,
  };
};

export default useScreenShareHandler;
