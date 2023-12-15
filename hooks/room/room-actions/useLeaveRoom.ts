// useEndRoomHandler.ts
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const useLeaveRoomHandler = () => {
  const router = useRouter();

  const leaveRoom = useCallback(async () => {
    router.push("/dashboard/rooms");
  }, [router]);

  return {
    leaveRoom,
  };
};

export default useLeaveRoomHandler;
