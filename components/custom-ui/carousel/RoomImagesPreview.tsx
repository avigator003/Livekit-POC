import useUnmutedTracks from "@/hooks/room/useUnmutedTracks";
import useVideoPresenter from "@/hooks/room/useVideoPresenter";
import useRoomStore from "@/store/room/useRoomStore";
import { VideoTrack } from "@livekit/components-react";
import { Carousel, Typography } from "@material-tailwind/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ShadowModal from "../modal/ShadowModal";
import UploadedImagesModal from "@/components/dashboard/room/modal/UploadedImagesModal";
import useImagesStore from "@/store/room/useImagesStore";
import { Button } from "@nextui-org/button";
import { useCurrentCoHost, useCurrentHost } from "@/hooks/room/useCurrentHost";

export function RoomImagesPreview() {
  const { uploadedImages } = useRoomStore();
  const { setSelectedImageIndex, removeSelectedImageIndex } = useImagesStore();
  const unmutedTracks: any = useUnmutedTracks();
  const videoPresenter = useVideoPresenter();
  const [showUploadedImageModal, setUploadedImagesModal] =
    useState<boolean>(false);

  const handleShowUploadedImagesModal = () => {
    setUploadedImagesModal(!showUploadedImageModal);
  };

  const handleShowUploadedImages = (index: number) => {
    removeSelectedImageIndex();
    setUploadedImagesModal(!showUploadedImageModal);
    setSelectedImageIndex(index);
  };

  const isCohost = useCurrentCoHost();
  const isHost = useCurrentHost();

  return (
    <div className="aspect-[16/9] rounded-xl">
      <ShadowModal
        body={<UploadedImagesModal />}
        isOpen={showUploadedImageModal}
        onClose={handleShowUploadedImagesModal}
      />
      <Carousel
        className="aspect-[16/9] h-full w-full rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {unmutedTracks?.length > 0 ? (
          <div className="relative aspect-[16/9] w-full">
            <VideoTrack
              {...unmutedTracks[0]}
              className="aspect-[16/9] h-full rounded-md"
            />
            {unmutedTracks.length > 0 && (
              <div className="absolute bottom-0 left-2">
                {videoPresenter} is presenting...
              </div>
            )}
          </div>
        ) : uploadedImages.length > 0 ? null : (
          <div className="relative h-full w-full">
            <div className="h-full w-full bg-black object-cover"></div>
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-[#121212]">
              <div className="w-3/4 text-center md:w-2/4">
                <div className="relative mt-3 aspect-[16/7] w-full rounded-md lg:mt-0">
                  <Typography
                    variant="lead"
                    color="white"
                    className="mb-12 opacity-80"
                  >
                    No one is presenting the room! Be the first one by sharing
                    video, screen, or images.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
        {uploadedImages?.map((imageUrl: string, index: number) => {
          return (
            <div key={imageUrl} className="relative aspect-[16/9] w-full">
              <img
                src={imageUrl}
                className="block aspect-[16/9] h-full w-full rounded-lg"
              />
              <div className="absolute bottom-0 left-0 aspect-[16/9] h-full w-full bg-black opacity-20"></div>

              {(isCohost || isHost) && (
                <div className="absolute right-5 top-5 cursor-pointer">
                  <div className="mx-auto mb-4 w-3/4 md:w-2/4">
                    <Trash2
                      color="red"
                      size={30}
                      onClick={() => handleShowUploadedImages(index)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
