import useRoomStore from "@/store/room/useRoomStore";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { useLocalParticipant, useRemoteParticipants } from "@livekit/components-react";
import { RemoteParticipant } from "livekit-client";
import { useEffect, useState } from "react";

export const useCurrentHost = (): boolean => {
  const roomStore = useRoomStore();
  const authStore = useAuthenticationStore();

  const [isHost, setIsHost] = useState<boolean>(false);

  useEffect(() => {
    const currentUserLoggedIn = authStore.user?.id;
    const roomHost = roomStore.room?.host;
    setIsHost(currentUserLoggedIn === roomHost?._id);
  }, []);

  return isHost;
};

const useIsCohost = (participant: RemoteParticipant): boolean => {
  const metadata = JSON.parse(participant?.metadata || "");
  return metadata.isCohost || false;
};




export const useCurrentCoHost = (): boolean => {
  const remoteParticipants = useRemoteParticipants();
  const { localParticipant }: any = useLocalParticipant();
  const [isCohost, setIsCohost] = useState<boolean>(false);
  const authStore = useAuthenticationStore();

  useEffect(() => {
    const currentUserLoggedIn = authStore.user?.id;

    // Check if the local participant is a cohost
    if (localParticipant.metadata && useIsCohost(localParticipant)) {
      setIsCohost(true);
      return; // If the local participant is a cohost, no need to check remote participants
    }

    // Check if the current user is a cohost in remote participants
    const isCurrentUserCohost = remoteParticipants.some((participant:any) => {
      return useIsCohost(participant) && participant.metadata?.userId === currentUserLoggedIn;
    });

    setIsCohost(isCurrentUserCohost);
  }, [remoteParticipants, localParticipant, authStore.user?.id]);

  return isCohost;
};

