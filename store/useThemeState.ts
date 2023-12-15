import {create} from 'zustand';

interface ThemeState {
    mode: "light" | "dark" | "purple",
    changeMode: () => void
}

const useThemeState = create<ThemeState>()((set) => ({
    mode: "purple",
    changeMode: () => set((state) => ({
        mode: state.mode === 'light' ? 'dark' : 'light'
    })),
}))

export default useThemeState;