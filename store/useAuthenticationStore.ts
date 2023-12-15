import { WhalesUser } from "@/types/WhalesUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
  user: WhalesUser | null;
  addUser: (user: WhalesUser) => void;
  removeUser: () => void;
}

const useAuthenticationStore = create<TokenStore>()(
  persist(
    (set) => ({
      user: null,
      addUser: (user) => set({ user: user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthenticationStore;
