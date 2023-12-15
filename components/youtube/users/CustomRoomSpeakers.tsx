import { useSpeakers } from '@/hooks/room/useSpeakers';
import { Avatar } from '@nextui-org/react';
import React from 'react'

interface SpeakersProps {
    getUserProfilePicture: (participant : any) => string
}
function CustomRoomSpeakers({ getUserProfilePicture }: SpeakersProps) {
    const speakers = useSpeakers();
    const getAllSpeakers = () => {
        return speakers?.map((speaker: any, index: any) => (
          <div
            key={index}
            className="flex flex-col items-start text-gray-800 dark:text-[#D9D9D9]"
          >
            <div className="relative h-10 w-10">
              <Avatar src={getUserProfilePicture(speaker)} size="lg" />
            </div>
            <p className="mt-2 w-14 truncate text-center text-2xl font-extrabold">
              {speaker.name.split(" ")[0]}
            </p>
          </div>
        ));
      };
    
  return (
    <div>{getAllSpeakers()}</div>
  )
}

export default CustomRoomSpeakers