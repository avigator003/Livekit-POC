import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatStore {
  chatMessages: Array<any>;
  addChatMessage: (newMessage: any) => void;
  clearPersistedData: () => void; // New function to clear persisted data
  // Fixed the typo in the function name
}

const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatMessages: [],
      addChatMessage: (newMessage: any) =>
        set((state: any) => ({
          chatMessages: [...state.chatMessages, newMessage],
        })),
      clearPersistedData: () => set(() => ({ chatMessages: [] })), // Clear the data by setting it to an empty array
    }),
    {
      name: "chat",
    }
  )
);

export default useChatStore;
