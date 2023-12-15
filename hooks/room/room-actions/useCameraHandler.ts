// useCameraHandler.ts
import { useCallback } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import toast from "react-hot-toast";
import useCustomDataSender from "./useCustomDataSender";
import useUserDetails from "../../common/useUserDetails";

interface CameraHandlerHook {
  handleCamera: () => void;
}

const useCameraHandler = (): CameraHandlerHook => {
  const { localParticipant, isCameraEnabled } = useLocalParticipant();
  const { sendCustomData } = useCustomDataSender();
  const userDetails  =useUserDetails();
  
  const handleCamera = useCallback(() => {
    if (localParticipant) {
      localParticipant.setCameraEnabled(!isCameraEnabled);

      const message = {
        user: userDetails,
        source: "camera",
        isStopped: isCameraEnabled,
        identity: localParticipant?.identity,
        messageBody: "",
        createdAt: Date.now(),
        type: "handleScreenShare",
      };

 
      sendCustomData(message);
    } else {
      toast.error("Local participant not available");
    }
  }, [localParticipant, isCameraEnabled, sendCustomData, userDetails]);

  return {
    handleCamera,
  };
};

export default useCameraHandler;
