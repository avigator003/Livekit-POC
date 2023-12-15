import { useEffect, useState } from "react";
import useUnmutedTracks from "./useUnmutedTracks";

const useVideoPresenter = (): string | null => {
  const [presenter, setPresenter] = useState<string | null>(null);
  const unmutedTracks: any = useUnmutedTracks();

  useEffect(() => {
    const fetchPresenter = async () => {
      const presenterName: any =
        unmutedTracks && unmutedTracks[0]?.participant.name;
      setPresenter(presenterName);
    };

    fetchPresenter();
  }, [unmutedTracks]);

  return presenter;
};

export default useVideoPresenter;
