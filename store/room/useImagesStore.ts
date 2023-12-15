import { stat } from "fs";
import React from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ImagesStore {
  files: any[];
  message: string | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>; // Add fileInputRef
  setFiles: (files: any[]) => void;
  setMessage: (message: string | undefined) => void;
  handleFile: (e: any, fileInputRef: React.RefObject<HTMLInputElement>) => void;
  removeImage: (fileName: string) => void;
  setFileInputRef: (ref: React.RefObject<HTMLInputElement>) => void; // Add setFileInputRef

  removeAllImages: () => void;
  selectedImageIndexes: number[];
  setSelectedImageIndex: (index: number) => void;
  removeSelectedImageIndex: () => void;
  selectAllImageIndexes: (imagesLength: number) => void;

  isRoomJoined: boolean;
  setIsRoomJoined: (value: boolean) => void;

  isImageDeleted: boolean;
  setIsImageDeleted: () => void;
}

const useImagesStore = create<ImagesStore>()((set) => ({
  files: [],
  message: "",
  isRoomJoined: false,
  fileInputRef: React.createRef<HTMLInputElement>(), // Initialize fileInputRef
  setFiles: (files) => set({ files }),
  setMessage: (message) => set({ message }),
  handleFile: (e) => {
    set((state) => {
      const selectedFiles = e.target.files;
      const updatedFiles = [...state.files];
      let duplicateFileDetected = false;

      for (let i = 0; i < selectedFiles.length; i++) {
        const fileName = selectedFiles[i].name;

        if (state.files.some((file) => file.name === fileName)) {
          duplicateFileDetected = true;
          toast.error(
            `File "${fileName}" already exists. Please select a different file.`
          );
        } else {
          updatedFiles.push(selectedFiles[i]);
        }
      }

      set({ files: updatedFiles });

      // Reset the input value using a callback
      set((state) => {
        const inputElement = state.fileInputRef.current;
        if (inputElement) {
          inputElement.value = "";
        }
        return state;
      });

      return {
        files: updatedFiles,
      };
    });
  },
  setFileInputRef: (ref) => set({ fileInputRef: ref }), // Add setFileInputRef
  removeImage: (fileName) => {
    set((state) => ({
      files: state.files.filter((x) => x.name !== fileName),
    }));
  },
  removeAllImages: () => set({ files: [] }),
  selectedImageIndexes: [],
  setSelectedImageIndex: (index: number) =>
    set((state) => ({
      selectedImageIndexes: state.selectedImageIndexes.includes(index)
        ? state.selectedImageIndexes.filter((i) => i !== index)
        : [...state.selectedImageIndexes, index],
    })),
  removeSelectedImageIndex: () => set({ selectedImageIndexes: [] }),
  selectAllImageIndexes: (imagesLength: number) => {
    set((state) => {
      if (state.selectedImageIndexes.length === imagesLength) {
        return { selectedImageIndexes: [] };
      } else {
        const indexes = Array.from(
          { length: imagesLength },
          (_, index) => index
        );
        return {
          selectedImageIndexes: indexes,
        };
      }
    });
  },
  setIsRoomJoined: (value) => set({ isRoomJoined: value }),

  isImageDeleted: false,
  setIsImageDeleted: () =>
    set((state) => ({ isImageDeleted: !state.isImageDeleted }))
}));

export default useImagesStore;
