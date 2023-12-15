import { create } from "zustand";

interface LoginSignupStore {
  currentSignUpStep: number;
  setCurrentSignUpStep: (step: number) => void;

  currentLoginStep: number;
  setCurrentLoginStep: (step: number) => void;

  isSignupModalOpen: boolean,
  setIsSignupModalOpen: () => void;
  resetIsSignUpModalOpen : () => void;

  isSignUpFlow : boolean
  setIsSignupFlow :(value:boolean) => void;
}
const useLoginSignupStore = create<LoginSignupStore>()((set) => ({
  currentSignUpStep: 1,
  currentLoginStep: 1,
  isSignupModalOpen: false,
  isSignUpFlow :false,
  setCurrentSignUpStep: (step) => set({ currentSignUpStep: step }),
  setCurrentLoginStep: (step) => set({ currentLoginStep: step }),
  setIsSignupModalOpen: () => set((state) => ({ isSignupModalOpen: !state.isSignupModalOpen })),
  resetIsSignUpModalOpen : () => set((state) => ({ isSignupModalOpen: false })),
  setIsSignupFlow: (value) => set({ isSignUpFlow: value }),
}));

export default useLoginSignupStore;
