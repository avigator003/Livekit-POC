"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/button";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ArrowLeft, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import ImageSkelton from "@/components/custom-ui/skeleton/ImageSkelton";
import edit_pencil from "@/public/AdminFlowAssets/edit_pencil.svg";
import upload_thumbnail_icon from "@/public/AdminFlowAssets/upload_thumbnail_icon.svg";
import upload_thumbnail_icon2 from "@/public/AdminFlowAssets/upload_thumbnail_icon2.svg";
import no_thumbnail from "@/public/no_thumbnail.svg";
import { RoomFactory } from "@/repository/RoomRepository";
import useRoomStore from "@/store/room/useRoomStore";
import { useJoinRoom } from "@/hooks/room/userRoomJoin";

const schema = yup.object().shape({
  roomName: yup.string().required("Group name is required"),
  description: yup.string().required("Group description is required"),
  thumbnail: yup.mixed().required("Room thumbnail is required"),
  privacy: yup.string().required("Please select privacy"),
});

const defaultValues = {
  roomName: "",
  description: "",
  thumbnail: "",
  privacy: "",
};

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectThumbnail, setSelectThumbnail] = useState<File | null>();
  const [thumbnailUploading, setThumbnailUploading] = useState<boolean>(false);
  const [isThumbnail, setIsThumbnail] = useState(false);
  const [isDescribeContent, setIsDescribeContent] = useState(false);

  const roomStore = useRoomStore();
  const fileInputRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const selectedPrivacy = watch("privacy");

  const handleFileSelect = () => {
    // Trigger the file dialog when the UI is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: any) => {
    setThumbnailUploading(true);
    const selectedFile = event.target.files[0];
    setThumbnailUploading(true);
    if (selectedFile) {
      setSelectThumbnail(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const result = await RoomFactory.getInstance().uploadRoomThumbnail(formData);
        setValue("thumbnail", result.url);
        setThumbnailUploading(false);
      } catch (error) {
        toast.error("An error occurred while uploading room thumbnail");
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const apiData = {
      roomName: data.roomName,
      description: data.description,
      thumbnail: data.thumbnail,
      is_private: data.privacy === "Social (Anyone can join)" ? false : true,
      roomType: "video",
      is_paid: false,
    };
    await RoomFactory.getInstance().createRoom(apiData);
    setSelectThumbnail(null);
    roomStore.handleIsNewRoomCreated(true);
    reset();
  });

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className="bg-transparent"
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <form onSubmit={onSubmit}>
              <div className="h-full overflow-y-auto bg-white pb-5 pt-3 text-white dark:bg-[#0C0E13] sm:fixed sm:right-0 sm:top-0 sm:w-[536px]">
                <Button
                  onClick={onClose}
                  className="mb-6 flex items-center gap-5 bg-transparent p-6"
                >
                  <ArrowLeft className="h-6 w-6 cursor-pointer" />
                  <p className="text-lg font-semibold dark:text-white">
                    Create Room
                  </p>
                </Button>

                <div className="space-y-6 px-5 pb-6">
                  <div className="flex flex-col gap-1">
                    <Input
                      label="Room Name"
                      labelPlacement="outside"
                      {...register("roomName")}
                      type="text"
                      placeholder="Enter room name"
                      variant="bordered"
                      radius="sm"
                      size="lg"
                      classNames={{
                        input: ["text-sm", "text-gray-900 dark:text-white"],
                        inputWrapper: ["!border-[2px]", "!border-borderColor"],
                      }}
                    />
                    {errors.roomName && (
                      <div className="text-sm text-red-500">
                        {errors.roomName.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Select
                      size="lg"
                      label="Privacy"
                      {...register("privacy")}
                      labelPlacement="outside"
                      variant="bordered"
                      placeholder="Select Privacy"
                      value={[selectedPrivacy || ""]}
                      classNames={{
                        innerWrapper: ["text-gray-900 dark:text-white"],
                        selectorIcon: ["text-gray-900 dark:text-white"],
                        label: ["!mt-2"],
                        trigger: [
                          "!mt-5",
                          "border-[2px]",
                          "border-borderColor",
                          "rounded-[10px]",
                          "!text-sm",
                        ],
                      }}
                    >
                      <SelectItem
                        key="Social (Anyone can join)"
                        value="Social (Anyone can join)"
                      >
                        Social (Anyone can join)
                      </SelectItem>
                      <SelectItem
                        key="Group in which you are admin"
                        value="Group in which you are admin"
                      >
                        Group in which you are admin
                      </SelectItem>
                    </Select>
                    {errors.privacy && (
                      <div className="text-sm text-red-500">
                        {errors.privacy.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="mb-2 text-base font-medium">
                      Group Description
                    </p>
                    <Textarea
                      labelPlacement="outside"
                      variant="bordered"
                      {...register("description")}
                      fullWidth
                      size="lg"
                      maxRows={5}
                      minRows={5}
                      placeholder="Description"
                      classNames={{
                        input: ["text-sm", "text-gray-900 dark:text-white"],
                        inputWrapper: [
                          "border-2",
                          "border-borderColor",
                          "rounded-[10px]",
                        ],
                      }}
                    />
                    {errors.description && (
                      <div className="text-sm text-red-500">
                        {errors.description.message}
                      </div>
                    )}
                  </div>

                  {!isThumbnail && !isDescribeContent && (
                    <div className="relative flex h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-borderColor text-textGrey transition-all">
                      <Button
                        onClick={() => {
                          setIsThumbnail(true);
                          setIsDescribeContent(false);
                        }}
                        className="flex w-[250px] items-center gap-2 rounded-full bg-blue-500 text-center text-sm text-white"
                        startContent={
                          <Image
                            src={upload_thumbnail_icon2}
                            width={24}
                            height={24}
                            alt="upload_thumbnail_icon"
                          />
                        }
                      >
                        Upload Thumbnail Image
                      </Button>

                      <Button
                        onClick={() => {
                          setIsThumbnail(false);
                          setIsDescribeContent(true);
                        }}
                        className="flex w-[250px] items-center gap-2 rounded-full border border-blue-500 bg-transparent text-center text-sm text-blue-500"
                        startContent={
                          <Image
                            src={edit_pencil}
                            width={24}
                            height={24}
                            alt="edit_pencil"
                          />
                        }
                      >
                        Describe Your Content
                      </Button>
                    </div>
                  )}

                  {isDescribeContent && (
                    <div>
                      <p className="mb-1 text-base font-medium">
                        Thumbnail Content
                      </p>
                      <div className="relative flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-borderColor text-textGrey transition-all">
                        <button
                          onClick={() => setIsDescribeContent(false)}
                          className="absolute right-1 top-1 z-40 rounded-full p-2"
                        >
                          <XIcon className="text-white" />
                        </button>
                        <div className="image-container aspect-w-16 aspect-h-9">
                          <Image
                            className="rounded-[10px] object-cover transition-all"
                            src={no_thumbnail}
                            alt="upload_thumbnail_icon"
                            fill
                          />
                        </div>
                        <textarea
                          className="inset-0 z-20 flex w-full resize-none items-center justify-center bg-transparent bg-none px-2 text-center text-lg uppercase text-gray-900 outline-none scrollbar-hide dark:text-white"
                          placeholder="Room Name"
                          rows={2}
                          maxLength={79}
                        />
                      </div>
                    </div>
                  )}

                  {isThumbnail && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsThumbnail(false)}
                        className="absolute right-1 top-8 z-40 rounded-full p-2"
                      >
                        <XIcon className="text-white" />
                      </button>
                      <p className="mb-1 text-base font-medium">Thumbnail</p>
                      <div
                        className="relative flex aspect-[16/9] cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-borderColor text-textGrey transition-all hover:bg-borderColor"
                        onClick={handleFileSelect}
                      >
                        <input
                          id="thumbnail-drop"
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        {selectThumbnail ? (
                          <div className="image-container aspect-w-16 aspect-h-9">
                            <Image
                              className="rounded-[10px] object-cover transition-all hover:opacity-80"
                              src={URL.createObjectURL(selectThumbnail)}
                              alt="upload_thumbnail_icon"
                              fill
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            {thumbnailUploading ? (
                              <ImageSkelton />
                            ) : (
                              <>
                                <Image
                                  src={upload_thumbnail_icon}
                                  width={32}
                                  height={32}
                                  alt="upload_thumbnail_icon"
                                  className="aspect-w-16 aspect-h-9"
                                />
                                <p className="">Upload Thumbnail Image</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="mt-8 w-full rounded-md bg-faceBlue py-2 text-center"
                  >
                    Create Now
                  </Button>
                </div>
              </div>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
