import { WhalesRoom } from "@/types/WhalesRoom";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ImageUrl{
  url:string,
  userId:string
}

interface RoomStore {
  openCreateRoomModal: boolean;
  setOpenCreateRoomModal: () => void;

  liveRooms: any[];
  setLiveRooms: (rooms: any[]) => void;

  rooms: any[] | null;
  setRooms: (room: any[]) => void;

  filteredRooms: any[] | null;
  setFilteredRooms: (room: any[]) => void;

  room: WhalesRoom | null;
  setRoom: (room: WhalesRoom) => void;
  removeRoom: () => void;

  isNewRoomCreated: boolean;
  handleIsNewRoomCreated: (value: boolean) => void;

  isScreenSharing: boolean;
  setIsScreenSharing: (isScreenSharing: boolean) => void;

  uploadedImages:ImageUrl[];
  setUploadedImages: (imageUrls: ImageUrl[]) => void;
  removeUploadedImages: () => void;

  activeImageIndex: number;
  setActiveImageIndex: (value: number) => void;

  isChatOpen: boolean;
  setIsChatOpen: () => void;
}

const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      openCreateRoomModal: false,
      setOpenCreateRoomModal: () =>
        set((state) => ({ openCreateRoomModal: !state.openCreateRoomModal })),

      liveRooms: [],
      setLiveRooms: (rooms: any[]) => set({ liveRooms: rooms }),
    
      room: null,
      setRoom: (room: WhalesRoom) => set({ room: room }),
      removeRoom: () => set({ room: null }),

      rooms: [],
      setRooms: (rooms: any[]) => set({ rooms: rooms }),

      filteredRooms: [],
      setFilteredRooms: (rooms: any[]) => set({ filteredRooms: rooms }),

      isNewRoomCreated: false,
      handleIsNewRoomCreated: (value: boolean) =>
        set({ isNewRoomCreated: value }),

      isScreenSharing: false,
      setIsScreenSharing: (isScreenSharing: boolean) =>
        set((state) => ({ isScreenSharing: isScreenSharing })),

      uploadedImages: [],
      removeUploadedImages: () => set({ uploadedImages: [] }),
      setUploadedImages: (imageUrls) => set({ uploadedImages: imageUrls }),

      isChatOpen: false,
      setIsChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

      activeImageIndex: 0,
      setActiveImageIndex: (value) => set({ activeImageIndex: value }),
    }),
    {
      name: "room",
    }
  )
);

export default useRoomStore;
