import { RoomFactory } from "@/repository/RoomRepository";
import useImagesStore from "@/store/room/useImagesStore";
import useRoomStore from "@/store/room/useRoomStore";
import { WhalesRoom } from "@/types/WhalesRoom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useJoinRoom = (
    room: any,
    setJoiningRoom: React.Dispatch<React.SetStateAction<boolean>>,
    router: ReturnType<typeof useRouter>
  ) => {

    const roomImagesStore =useImagesStore();
    const roomStore=useRoomStore();
    const joinRoomPress:any = async () => {
      try {
        setJoiningRoom(true);
        const result = await RoomFactory.getInstance().joinRoom({
          roomName: room.name,
          room_id: room.id,
        });
        if (result) {
          const images = result.data?.roomImages.map(
            (image: any) => image.image_url
          );
          roomImagesStore.setIsRoomJoined(true);
          roomStore.setUploadedImages(images);

          const joinedRoom: WhalesRoom = {
            token: result.data.token,
            id: room.id,
            description: room.description,
            name: room.roomName,
            host: room.host,
            roomImages: images,
          };
          roomStore.setRoom(joinedRoom);
          roomImagesStore.removeAllImages();
          setJoiningRoom(false);
          router.push("/room");
        }
      } catch (err) {
        console.log("njfnjnenf",err)
        setJoiningRoom(false);
        toast.error("Unable to Join room");
      }
    };
  
    return joinRoomPress;
  };