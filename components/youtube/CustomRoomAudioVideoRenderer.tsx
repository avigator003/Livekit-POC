"use client";

import {RoomAudioRenderer,VideoTrack} from "@livekit/components-react";
import Image from "next/image";
import React from "react";

import useUnmutedTracks from "../../hooks/room/useUnmutedTracks";
import useVideoPresenter from "../../hooks/room/useVideoPresenter";

function CustomRoomAudioVideoRenderer() {
  const unmutedTracks: any = useUnmutedTracks();
  const videoPresenter = useVideoPresenter();

  return (
    <div>
      {unmutedTracks?.length > 0 ? (
        <div className="relative mt-3 h-[976px] w-[1890px] lg:mt-0 -translate-x-10">
          <VideoTrack {...unmutedTracks[0]} className="h-[976px] w-[1890px]" />
          {unmutedTracks.length > 0 && (
            <div className="absolute bottom-0 left-2 text-white text-2xl font-extrabold">
              {videoPresenter} is presenting...
            </div>
          )}
        </div>
      ) : (
        <div className="relative mt-3 h-[976px] w-[1810px] lg:mt-0">
          <Image
            src="https://i.pinimg.com/originals/19/db/31/19db31732931019b73bedcf17924f814.jpg"
            fill
            alt="thumbnail"
          />
        </div>
      )}
      <RoomAudioRenderer />
    </div>
  );
}

export default CustomRoomAudioVideoRenderer;
