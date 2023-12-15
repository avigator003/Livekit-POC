// useStopEgressHandler.ts
import { EgressFactory, StopEgressData } from "@/repository/EgressRepository";
import { useCallback } from "react";
import toast from "react-hot-toast"; // Import toast if not already imported

interface StopEgressHandlerHook {
  stopEgress: (roomId: string) => Promise<void>;
}

const useStopEgressHandler = (): StopEgressHandlerHook => {
  const stopEgress = useCallback(async (roomId: string) => {
    const data: StopEgressData = {
      room_id: roomId,
    };
    const response = await EgressFactory.getInstance().stopEgress(data);
    response
      ? toast.success("Streaming stopped")
      : toast.error("Unable to stop your streaming");
  }, []);

  return {
    stopEgress,
  };
};

export default useStopEgressHandler;
