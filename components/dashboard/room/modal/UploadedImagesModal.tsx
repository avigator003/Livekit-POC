import { DeleteImagesData, RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore from "@/store/room/useRoomStore";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UploadedImagesModal() {
  const { uploadedImages, room } = useRoomStore();
  const {
    selectedImageIndexes,
    setSelectedImageIndex,
    selectAllImageIndexes,
  } = useImagesStore();

  const handleCheckboxChange = (index: number) => {
    setSelectedImageIndex(index); // Pass a single-index array
  };

  const deleteRoomImages = async (data: DeleteImagesData) => {
    const roomId = room?.id || "";
    return await RoomFactory.getInstance().deleteImages(data, roomId);
  };

  const { mutate, isLoading } = useMutation(deleteRoomImages, {
    onSuccess: (response: any) => {
      toast.success("Images deleted successfully");
    },
    onError: (err) => {
      toast.error("Unable to delete images");
    },
  });

  const handleDeleteImages = () => {
    const selectedImageUrls = selectedImageIndexes.map(
      (index) => uploadedImages[index]
    );

    const deleteImagesData: DeleteImagesData = {
      image_urls: selectedImageUrls,
    };
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
        {uploadedImages?.map((imageUrl: string, index: number) => {
          const isChecked = selectedImageIndexes.includes(index);
          return (
            <div
              key={imageUrl}
              className="relative w-full aspect-w-16 aspect-h-7"
            >
              <img
                src={imageUrl}
                className="w-full aspect-h-9 object-contain rounded-md"
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
