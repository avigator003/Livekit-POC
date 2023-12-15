// useAudioHandler.ts
import { useCallback } from "react";
import { useLocalParticipant } from "@livekit/components-react";
import toast from "react-hot-toast";

interface AudioHandlerHook {
  handleAudio: () => void;
}

const useAudioHandler = (): AudioHandlerHook => {
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();

  const handleAudio = useCallback(() => {
    try {
      localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (err) {
      toast.error("You don't have enough permissions");
    }
  }, [localParticipant, isMicrophoneEnabled]);

  return {
    handleAudio,
  };
};

export default useAudioHandler;
