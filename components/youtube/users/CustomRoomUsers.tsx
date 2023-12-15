"use client";
import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CustomRoomSpeakers from "./CustomRoomSpeakers";

function CustomRoomUsers() {

  const getUserProfilePicture = (participant: any) => {
    const metadata = JSON?.parse(participant?.metadata);
    return metadata.picture;
  };

  return (
    <div className="mt-3 flex flex-col gap-2 lg:mt-1">
      <div>
        <ScrollArea>
          <div className="flex space-x-8 overflow-x-auto px-2 pb-1">
            <CustomRoomSpeakers getUserProfilePicture={getUserProfilePicture}/>
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default CustomRoomUsers;
