import { create } from "zustand";

interface AuthStore {
  username: string;
  setUsername: (username: string) => void;

  name: string;
  setName: (name: string) => void;

  email: string;
  setEmail: (email: string) => void;

  gender: string;
  setGender: (gender: string) => void;

  dob: string;
  setDob: (dob: string) => void;

  password: string;
  setPassword: (password: string) => void;

  bio: string;
  setBio: (bio: string) => void;

  profilePicture: string | null;
  setProfilePicture: (profilePicture: string | null) => void;

  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;

  verificationId: string;
  setVerificationId: (verificationId: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  username: "",
  setUsername: (username: string) => set({ username }),

  name: "",
  setName: (name: string) => set({ name }),

  email: "",
  setEmail: (email: string) => set({ email }),

  gender: "",
  setGender: (gender: string) => set({ gender }),

  dob: "",
  setDob: (dob: string) => set({ dob }),

  password: "",
  setPassword: (password: string) => set({ password }),

  bio: "",
  setBio: (bio: string) => set({ bio }),

  profilePicture: "",
  setProfilePicture: (profilePicture: string | null) => set({ profilePicture }),

  phoneNumber: "",
  setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),

  verificationId: "",
  setVerificationId: (verificationId: string) => set({ verificationId }),
}));

export default useAuthStore;
