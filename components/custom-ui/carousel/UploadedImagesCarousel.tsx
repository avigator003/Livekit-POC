import { DeleteImagesData, RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore from "@/store/room/useRoomStore";
import { Carousel, Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

export function CarouselWithUploadedImagesContent() {
  const { files, removeImage } = useImagesStore();

  const handleDeleteImages = async (fileName: string) => {
    removeImage(fileName);
  };

  return (
    <Carousel
      className="rounded-xl relative"
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
      {files?.map((file: any, key: any) => {
        return (
          <div key={key} className="relative w-full">
            <img
              src={URL.createObjectURL(file)}
              className="w-full object-cover aspect-[16/9]"
              alt={`preview-${key}`}
            />
            <div className="absolute left-0 bottom-0 w-full h-full bg-black opacity-20"></div>

            <div className="absolute left-0 bottom-0">
              <div className="w-3/4 md:w-2/4 mx-auto mb-4">
                <Button size="sm" onClick={() => handleDeleteImages(file.name)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
