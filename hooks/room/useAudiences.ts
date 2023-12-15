import { useLocalParticipant, useRemoteParticipants } from "@livekit/components-react";
import { RemoteParticipant } from "livekit-client";
import { useEffect, useState } from "react";

const useFilterParticipants = (
    participants: RemoteParticipant[],
    condition: (participant: RemoteParticipant) => boolean
  ): RemoteParticipant[] => {
    return participants?.filter(condition) || [];
  };


const useIsSpeaker = (participant: RemoteParticipant): boolean => {
  const metadata = JSON.parse(participant?.metadata || "");
  return metadata.isSpeaker || false;
};
  
export const useAudiences = (): RemoteParticipant[] => {
    const remoteParticipants = useRemoteParticipants();
    const { localParticipant }: any = useLocalParticipant();
    const [audiences, setAudiences] = useState<RemoteParticipant[]>([]);
  
    useEffect(() => {
      const audiencesList = useFilterParticipants(remoteParticipants, (participant) => !useIsSpeaker(participant));
      if (localParticipant.metadata && !useIsSpeaker(localParticipant)) {
        setAudiences([...audiencesList, localParticipant]);
      } else {
        setAudiences(audiencesList);
      }
    }, [remoteParticipants, localParticipant]);
  
    return audiences;
  };