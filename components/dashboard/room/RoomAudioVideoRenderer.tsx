"use client";
import { RoomAudioRenderer, VideoTrack } from "@livekit/components-react";
import { RoomImagesPreview } from "@/components/custom-ui/carousel/RoomImagesPreview";
import { cn } from "@/lib/utils";
import useUnmutedTracks from "../../../hooks/room/useUnmutedTracks";
import useVideoPresenter from "../../../hooks/room/useVideoPresenter";
import { useState, useEffect } from "react";

function RoomAudioVideoRenderer() {
  const unmutedTracks: any = useUnmutedTracks();
  const videoPresenter = useVideoPresenter();
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setVw(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let source = unmutedTracks ? unmutedTracks[0]?.publication?.source : null;

  const aspectRatio = vw > 1024 ? 16 / 9 : vw / 2; // Adjust the aspect ratio as needed

  return (
    <>
      <RoomImagesPreview />
      <RoomAudioRenderer />
    </>
  );
}

export default RoomAudioVideoRenderer;
