import useRoomStore from "@/store/room/useRoomStore";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { useEffect, useState } from "react";
import { useSpeakers } from "./useSpeakers";

export const useAudioVideoEnables = (): any => {
  const roomStore = useRoomStore();
  const authStore = useAuthenticationStore();
  const speakers = useSpeakers();

  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [isScreeneShareEnabled, setIsScreenEnabled] = useState<boolean>(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);

  useEffect(() => {
    const currentUserLoggedIn = authStore.user?.id;

    // Check if any speaker has the same userId as the current user
    const currentUserSpeaker = speakers.find((speaker) => {
      try {
        if (speaker.metadata) {
          const parsedMetadata = JSON.parse(speaker.metadata);
          return parsedMetadata.userId === currentUserLoggedIn;
        }
      } catch (error) {
        console.error("Error parsing metadata:", error);
        return false; // Consider the speaker as not matching if parsing fails
      }
    });

    if (currentUserSpeaker && currentUserSpeaker.metadata) {
      try {
        const parsedMetadata = JSON.parse(currentUserSpeaker.metadata);
        setIsAudioEnabled(!!parsedMetadata.isSpeaker);
        setIsScreenEnabled(!!parsedMetadata.isPresenter);
        setIsVideoEnabled(!!parsedMetadata.isVideoOn);
      } catch (error) {
        console.error("Error parsing metadata:", error);
      }
    }
  }, [authStore.user?.id, speakers]);

  return { isAudioEnabled, isScreeneShareEnabled, isVideoEnabled };
};
