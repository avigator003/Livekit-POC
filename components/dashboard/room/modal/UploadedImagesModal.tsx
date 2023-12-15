import { useCurrentCoHost, useCurrentHost } from "@/hooks/room/useCurrentHost";
import { DeleteImagesData, RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore, { ImageUrl } from "@/store/room/useRoomStore";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UploadedImagesModal() {
  const {
    uploadedImages,
    room,
    setActiveImageIndex,
    activeImageIndex,
  } = useRoomStore();
  const isCohost = useCurrentCoHost();
  const isHost = useCurrentHost();

  const {
    selectedImageIndexes,
    setSelectedImageIndex,
    selectAllImageIndexes,
    setIsImageDeleted,
  } = useImagesStore();

  const {user} = useAuthenticationStore();
  const handleCheckboxChange = (index: number) => {
    setSelectedImageIndex(index); // Pass a single-index array
  };

  const deleteRoomImages = async (data: DeleteImagesData) => {
    const roomId = room?.id || "";
    return await RoomFactory.getInstance().deleteImages(data, roomId);
  };

  const { mutate, isLoading } = useMutation(deleteRoomImages, {
    onSuccess: (response: any) => {
      setActiveImageIndex(activeImageIndex - 1);
      setIsImageDeleted();
      toast.success("Images deleted successfully");
    },
    onError: (err) => {
      toast.error("Unable to delete images");
    },
  });

  const handleDeleteImages = () => {
    const selectedImageUrls = selectedImageIndexes.map(
      (index) => uploadedImages[index].url
    );
    const deleteImagesData: DeleteImagesData = {
      image_urls: selectedImageUrls,
    };
    setIsImageDeleted();
    mutate(deleteImagesData);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <span className="flex justify-center items-center text-xl mb-8">
          Uploaded Images
        </span>
        <div className="flex flex-row justify-between space-x-5">
          <Button
            className="hover:bg-faceBlue/90 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90"
            onClick={() => {
              selectAllImageIndexes(uploadedImages.length);
            }}
          >
            Select All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {uploadedImages?.map((imageUrl: ImageUrl, index: number) => {
          const isChecked = selectedImageIndexes.includes(index);
          return (
            <>
              {(isCohost || isHost || imageUrl.userId === user?.id) && (
                <div
                  key={activeImageIndex}
                  className="relative w-full aspect-w-16 aspect-h-7"
                >
                  <img
                    src={imageUrl.url}
                    className="w-full object-cover aspect-[16/9] rounded-lg"
                  />

                  <div className="absolute left-0 bottom-0 w-full h-full bg-black opacity-10"></div>

                  <div className="absolute left-0 top-0 p-1">
                    <div className="w-3/4 md:w-2/4 mx-auto mb-4">
                      <input
                        type="checkbox"
                        id={`checkbox-${index}`}
                        checked={isChecked}
                        className="cursor-pointer"
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="flex flex-row justify-between space-x-5">
        <Button
          className="hover:bg-faceBlue/90 mt-7 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90"
          onClick={handleDeleteImages}
        >
          Delete Images
        </Button>
      </div>
    </div>
  );
}

export default UploadedImagesModal;
