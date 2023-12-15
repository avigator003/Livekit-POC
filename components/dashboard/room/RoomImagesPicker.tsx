import { CarouselWithUploadedImagesContent } from "@/components/custom-ui/carousel/UploadedImagesCarousel";
import { RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore from "@/store/room/useRoomStore";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import upload from "@/public/upload.svg";
import plus from "@/public/plus.svg";
import { X } from "lucide-react";

const ImagePicker = () => {
  const {
    message,
    handleFile,
    files,
    setFiles,
    fileInputRef,
    setFileInputRef,
    removeImage,
  } = useImagesStore();
  const roomStore = useRoomStore();

  useEffect(() => {
    setFileInputRef(fileInputRef);
  }, [fileInputRef, setFileInputRef]);

  const uploadImages = async (data: FormData) => {
    const roomId = roomStore.room?.id || "";
    return await RoomFactory.getInstance().uploadImages(data, roomId);
  };

  const { mutate, isLoading } = useMutation(uploadImages, {
    onSuccess: (response: any) => {
      setFiles([]);
      toast.success("Images Uploaded Successfully");
    },
    onError: (err) => {
      toast.error("Unable to upload images.");
    },
  });

  const handleDeleteImages = async (fileName: string) => {
    removeImage(fileName);
  };

  const handleUploadImages = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });
    mutate(formData);
  };

  return (
    <>
      <div className="flex h-full w-full px-3">
        <div className="rounded-lg shadow-xl w-full">
          <div className="m-4">
            <span className="flex justify-center items-center text-2xl mb-4">
              Upload
            </span>
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                <CarouselWithUploadedImagesContent />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <label className="relative flex h-[250px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-borderColor bg-[#1D1D1D] text-textGrey transition-all hover:bg-borderColor">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <Image
                      alt="upload_image"
                      src={upload}
                      className="cursor-pointer"
                      width={70}
                      height={70}
                    />
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Browse Images
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => handleFile(e, fileInputRef)} // Pass fileInputRef as a parameter
                    className="opacity-0"
                    multiple
                    name="files[]"
                  />
                </label>
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="pl-2 mt-6 text-[#676767] font-extrabold">
                  Uploaded
                </p>
                <div className="grid grid-cols-6">
                  {files?.map((file: any, key: any) => (
                    <div
                      key={key}
                      className="relative col-span-2 sm:col-span-1 p-2"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        className="rounded-md h-[4rem] w-[4.5rem]"
                        alt={`preview-${key}`}
                      />
                      <div
                        className="absolute top-3 right-3 p-1 cursor-pointer bg-[#D9D9D9] rounded-full"
                        onClick={() => handleDeleteImages(file.name)}
                      >
                        <X size={12} color="black" />
                      </div>
                    </div>
                  ))}
                  <div className="relative col-span-2 sm:col-span-1 p-2 bg-grey rounded-lg h-[4.10rem] w-[4.5rem] mt-[0.4rem] ml-2 pl-3">
                    <label htmlFor="fileInput" className="cursor-pointer">
                      <Image
                        alt="plus"
                        src={plus}
                        className="cursor-pointer"
                        width={50}
                        height={60}
                      />
                    </label>
                    <input
                      id="fileInput"
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => handleFile(e, fileInputRef)} // Pass fileInputRef as a parameter
                      className="opacity-0"
                      multiple
                      name="files[]"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-row justify-between space-x-5">
              <Button
                onClick={handleUploadImages}
                className="hover:bg-faceBlue/90 mt-7 w-full rounded-lg bg-faceBlue py-3 text-center text-sm text-white ring-offset-slate-50 hover:opacity-90"
              >
                Upload Images
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePicker;
