"use client";
import { RoomAudioRenderer } from "@livekit/components-react";
import { RoomImagesPreview } from "@/components/custom-ui/carousel/RoomImagesPreview";

function RoomAudioVideoRenderer() {
  return (
    <div className="h-full z-50">
      <RoomImagesPreview />
      <RoomAudioRenderer />
    </div>
  );
}

export default RoomAudioVideoRenderer;
