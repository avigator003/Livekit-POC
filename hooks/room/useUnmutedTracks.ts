import { useEffect, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";

const useUnmutedTracks = (): Track[] | null => {
  const [unmutedTracks, setUnmutedTracks] = useState<Track[] | null>(null);
  const cameraTracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], {
    onlySubscribed: true,
  });
  useEffect(() => {
    const fetchUnmutedTracks = async () => {
      const tracks : any = cameraTracks?.filter((track) => !track.publication.isMuted) || [];
      setUnmutedTracks(tracks);
    };

    fetchUnmutedTracks();
  }, [cameraTracks]);

  return unmutedTracks;
};

export default useUnmutedTracks;
