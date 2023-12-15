"use client";
import Header from "@/components/youtube/CustomRoomHeader";
import CustomRoomAudioVideoRenderer from "@/components/youtube/CustomRoomAudioVideoRenderer";
import {
  LiveKitRoom,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import EgressHelper from "@livekit/egress-sdk";
import { ConnectionState, Track } from "livekit-client";
import { ReactElement, useEffect, useState } from "react";
import CustomRoomUsers from "@/components/youtube/users/CustomRoomUsers";

function CustomRoom() {
  const [error, setError] = useState<Error>();
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [layout, setLayout] = useState("");

  useEffect(() => {
    setUrl(EgressHelper.getLiveKitURL());
    setToken(EgressHelper.getAccessToken());
    setLayout(EgressHelper.getLayout());
  }, []);

  if (!url || !token) {
    return <div className="error">missing required params url and token</div>;
  }

  return (
    <div className="relative w-full">
      <div className="aspect-w-16 aspect-h-9">
        <LiveKitRoom serverUrl={url} token={token} onError={setError}>
          {error ? (
            <div className="error">{error.message}</div>
          ) : (
            <CompositeTemplate layout={layout} />
          )}
        </LiveKitRoom>
      </div>
    </div>
  );
}

interface CompositeTemplateProps {
  layout: string;
}

function CompositeTemplate({ layout: initialLayout }: CompositeTemplateProps) {
  const room = useRoomContext();
  const [layout, setLayout] = useState(initialLayout);
  const [hasScreenShare, setHasScreenShare] = useState(false);
  const screenshareTracks = useTracks([Track.Source.ScreenShare], {
    onlySubscribed: true,
  });

  useEffect(() => {
    if (room) {
      EgressHelper.setRoom(room);

      EgressHelper.onLayoutChanged((newLayout) => {
        setLayout(newLayout);
      });

      // start recording when there's already a track published
      let hasTrack = false;
      for (const p of Array.from(room.participants.values())) {
        if (p.tracks.size > 0) {
          hasTrack = true;
          break;
        }
      }
      EgressHelper.startRecording();

      // if (hasTrack) {
      //   EgressHelper.startRecording();
      // } else {
      //   room.once(RoomEvent.TrackSubscribed, () =>
      //     EgressHelper.startRecording()
      //   );
      // }
    }
  }, [room]);

  useEffect(() => {
    if (screenshareTracks.length > 0 && screenshareTracks[0].publication) {
      setHasScreenShare(true);
    } else {
      setHasScreenShare(false);
    }
  }, [screenshareTracks]);

  const allTracks = useTracks(
    [Track.Source.Camera, Track.Source.ScreenShare, Track.Source.Unknown],
    {
      onlySubscribed: true,
    }
  );
  const filteredTracks = allTracks.filter(
    (tr) =>
      tr.publication.kind === Track.Kind.Video &&
      tr.participant.identity !== room.localParticipant.identity
  );

  let interfaceStyle = "dark";
  // if (layout.endsWith('-light')) {
  //   interfaceStyle = 'light';
  // }

  let containerClass = "roomContainer";
  if (interfaceStyle) {
    containerClass += ` ${interfaceStyle}`;
  }

  // determine layout to use
  let main: ReactElement = <></>;
  let effectiveLayout = layout;
  if (hasScreenShare && layout.startsWith("grid")) {
    effectiveLayout = layout.replace("grid", "speaker");
  }
  if (room.state !== ConnectionState.Disconnected) {
    // if (effectiveLayout.startsWith('speaker')) {
    //   main = <SpeakerLayout tracks={filteredTracks} />;
    // } else if (effectiveLayout.startsWith('single-speaker')) {
    //   main = <SingleSpeakerLayout tracks={filteredTracks} />;
    // } else {
    main = (
      <div>
        <Header />
        <div className="hidden grid-cols-12 space-x-10 lg:grid pr-5x">
          <div className="col-span-11 flex-col">
            <div className="flex flex-col">
              <CustomRoomAudioVideoRenderer />
            </div>
          </div>

          <div className="col-span-1 flex-col">
            <div className="flex flex-col">
              <div className="flex h-fit w-full flex-col items-center">
                <CustomRoomUsers />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className={containerClass}>{main}</div>;
}

export default CustomRoom;
