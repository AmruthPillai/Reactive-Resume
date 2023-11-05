import { UserDto } from "@reactive-resume/dto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserDto | null;
}

interface AuthActions {
  setUser: (user: UserDto | null) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "auth" },
  ),
);
