"use client";
import {
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import RoomAd from "../RoomAd";
import { useSpeakers } from "../../../../hooks/room/useSpeakers";
import { useAudiences } from "../../../../hooks/room/useAudiences";
import { Speaker } from "lucide-react";
import Speakers from "./Speakers";
import Audiences from "./Audiences";

function RoomUsers() {
  const speakers = useSpeakers();
  const audiences = useAudiences();

  const getUserProfilePicture = (participant: any) => {
    const metadata = JSON?.parse(participant?.metadata);
    return metadata.picture;
  };

  const isHost = (metadata: any) => {
    const metaDataJson = JSON.parse(metadata);
    return metaDataJson.isHost;
  };

  const isCohost = (metadata: any) => {
    const metaDataJson = JSON.parse(metadata);
    return metaDataJson.isCohost;
  };

  return (
    <div className="mt-3 flex flex-col gap-2 lg:mt-1 lg:w-[18.75rem] sm:w-full md:w-full xs:w-full">
      <div>
        <p className="mb-3 text-black dark:text-white text-[0.875rem]">Speakers</p>
        {speakers?.length > 0 ? (
          <ScrollArea>
            <div className="flex space-x-10 overflow-x-auto pb-4 h-full w-full">
              <Speakers
                getUserProfilePicture={getUserProfilePicture}
                isHost={isHost}
                isCohost={isCohost}
              />
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        ) : (
          <p className="text-xs">
            No one is speaking yet. Be the first one to speak
          </p>
        )}
      </div>
      <div className="lg:hidden">
        <RoomAd />
      </div>
      <div className="">
        {audiences?.length > 0 && (
          <>
            <p className="mb-2 text-sm text-black dark:text-white">
              Audiences - {audiences?.length}
            </p>

            <ScrollArea>
              <div className="flex space-x-8 overflow-x-auto px-2 lg:pb-16">
                <Audiences
                  getUserProfilePicture={getUserProfilePicture}
                  isHost={isHost}
                />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomUsers;
