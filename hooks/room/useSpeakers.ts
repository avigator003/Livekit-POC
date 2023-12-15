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

export const useSpeakers = (): RemoteParticipant[] => {
  const remoteParticipants = useRemoteParticipants();
  const { localParticipant }: any = useLocalParticipant();
  const [speakers, setSpeakers] = useState<RemoteParticipant[]>([]);

  useEffect(() => {
    const speakersList = useFilterParticipants(remoteParticipants, useIsSpeaker);
    if (localParticipant.metadata && useIsSpeaker(localParticipant)) {
      setSpeakers([...speakersList, localParticipant]);
    } else {
      setSpeakers(speakersList);
    }
  }, [remoteParticipants, localParticipant]);

  return speakers;
};




