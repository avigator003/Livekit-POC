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
    return audiences?.map((listener: any, index: any) => (
      <div
        key={index}
        className="flex flex-col text-gray-800 dark:text-[#D9D9D9] h-full w-full"
      >
        <div className="ml-[0.6rem]">
          <Avatar src={getUserProfilePicture(listener)} size="md" />
        </div>
        <p className="mt-1 w-16 truncate text-left text-[1.174rem]">
          {listener.name.split(" ")[0]}
        </p>
        <p className="right-2 text-xs text-center">Listener</p>
      </div>
    ));
  };
  return (
    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 xs::grid-cols-2 gap-5">
      {getAllAudiences()}
    </div>
  );
}

export default Audiences;
