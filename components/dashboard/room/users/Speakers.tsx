import { Avatar } from "@nextui-org/react";
import React from "react";
import { useSpeakers } from "../../../../hooks/room/useSpeakers";
import { useRemoteParticipants } from "@livekit/components-react";

interface SpeakersProps {
  getUserProfilePicture: (participant: any) => string;
  isHost: (speakerMetaData: string) => boolean;
  isCohost: (speakerMetaData: string) => boolean;
}
function Speakers({ getUserProfilePicture, isHost, isCohost }: SpeakersProps) {
  const speakers = useSpeakers();
  const getAllSpeakers = () => {
    return speakers?.map((speaker: any, index: any) => (
      <div
        key={index}
        className="flex flex-col text-gray-800 dark:text-[#D9D9D9] h-full w-full"
      >
        <div className="ml-[0.6rem]">
         <Avatar src={getUserProfilePicture(speaker)} size="md" />
         </div>
        <p className="mt-1 w-16 truncate text-left text-[1.174rem]">
          {speaker.name.split(" ")[0]}
        </p>
        <p className="right-2 text-xs text-center">
          {isHost(speaker.metadata)
            ? "Host"
            : isCohost(speaker.metadata)
            ? "Cohost"
            : "Speaker"}
        </p>
      </div>
    ));
  };
  return (
    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 xs::grid-cols-2 gap-5">
      {getAllSpeakers()}
    </div>
  );
}

export default Speakers;
