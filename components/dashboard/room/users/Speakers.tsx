import { Avatar } from "@nextui-org/react";
import React from "react";
import { useSpeakers } from "../../../../hooks/room/useSpeakers";

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
        className="flex flex-col items-center text-gray-800 dark:text-[#D9D9D9]"
      >
        <Avatar src={getUserProfilePicture(speaker)} size="lg" />
        <p className="mt-1 w-14 truncate text-center">
          {speaker.name.split(" ")[0]}
        </p>
        <p className="right-2 text-xs">
          {isHost(speaker.metadata)
            ? "Host"
            : isCohost(speaker.metadata)
            ? "Cohost"
            : "Speaker"}
        </p>
      </div>
    ));
  };
  return <div className="flex flex-row space-x-5">{getAllSpeakers()}</div>;
}

export default Speakers;
