import { Avatar } from "@nextui-org/react";
import React from "react";
import { useAudiences } from "../../../../hooks/room/useAudiences";

interface AudiencesProps {
  getUserProfilePicture: (participant: any) => string;
  isHost: (speakerMetaData: string) => boolean;
}
function Audiences({ getUserProfilePicture, isHost }: AudiencesProps) {
  const audiences = useAudiences();
  const getAllAudiences = () => {
    return audiences?.map((speaker: any, index: any) => (
      <div
        key={index}
        className="flex flex-col items-center text-gray-800 dark:text-[#D9D9D9]"
      >
        <Avatar src={getUserProfilePicture(speaker)} size="lg" />
        <p className="mt-1 w-14 truncate text-center">
          {speaker.name.split(" ")[0]}
        </p>
        <p className="right-2 text-xs">
          {isHost(speaker.metadata) ? "Host" : "Speaker"}
        </p>
      </div>
    ));
  };
  return <div className="flex flex-row space-x-5">{getAllAudiences()}</div>;
}

export default Audiences;
