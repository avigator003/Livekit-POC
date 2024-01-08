import { WhalesRoom } from "@/types/WhalesRoom";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomStore {
  openCreateRoomModal: boolean;
  setOpenCreateRoomModal: () => void;

  liveRooms: any[];
  setLiveRooms: (rooms: any[]) => void;

  rooms : any[] | null;
  setRooms: (room: any[]) => void;

  filteredRooms : any[] | null;
  setFilteredRooms: (room: any[]) => void;


  room: WhalesRoom | null;
  setRoom: (room: WhalesRoom) => void;

  isNewRoomCreated: boolean;
  handleIsNewRoomCreated: (value:boolean) => void;

  isScreenSharing: boolean;
  setIsScreenSharing: (isScreenSharing: boolean) => void;

  uploadedImages: string[];
  setUploadedImages: (imageUrls: string[]) => void;
  removeUploadedImages: () => void;

}

const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      openCreateRoomModal: false,
      setOpenCreateRoomModal: () =>
        set((state) => ({ openCreateRoomModal: !state.openCreateRoomModal })),

      liveRooms: [],
      setRoom: (room: WhalesRoom) => set({ room: room }),

      room: null,
      setLiveRooms: (rooms: any[]) => set({ liveRooms: rooms }),

      rooms: [],
      setRooms: (rooms: any[]) => set({ rooms: rooms }),

      filteredRooms: [],
      setFilteredRooms: (rooms: any[]) => set({ filteredRooms: rooms }),

      isNewRoomCreated: false,
      handleIsNewRoomCreated: (isNewRoomCreated: boolean) => set({ isNewRoomCreated: isNewRoomCreated }),

      isScreenSharing: false,
      setIsScreenSharing: (isScreenSharing: boolean) =>
        set((state) => ({ isScreenSharing: isScreenSharing })),
        
      uploadedImages: [],
      removeUploadedImages: () => set({ uploadedImages: [] }),
      setUploadedImages: (imageUrls) => set({ uploadedImages: imageUrls }),
     
    }),
    {
      name: "room",
    }
  )
);

export default useRoomStore;
