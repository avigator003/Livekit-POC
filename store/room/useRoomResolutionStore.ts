import { WhalesRoom } from "@/types/WhalesRoom";
import { ScreenSharePresets, VideoCodec, VideoEncoding, VideoPreset, videoCodecs } from "livekit-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Resolution {
  width: number;
  height: number;
}

interface RoomResolutionStore {
  screenSharePretests: VideoEncoding;
  setScreenSharePretests: (value: VideoEncoding) => void;

  videoCodec: VideoCodec;
  setVideoCodec: (value: VideoCodec) => void;
}

const useRoomResolutionStore = create<RoomResolutionStore>()(
  persist(
    (set) => ({
      screenSharePretests: ScreenSharePresets.h720fps15.encoding,
      setScreenSharePretests: (value: VideoEncoding) => set((state) => ({ screenSharePretests: value })),


      videoCodec: videoCodecs[3],
      setVideoCodec: (value: VideoCodec) => set((state) => ({ videoCodec: value })),

    }),
    {
      name: "roomResolution",
    }
  )
);

export default useRoomResolutionStore;
