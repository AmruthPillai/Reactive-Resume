import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OpenAIStore {
  apiKey: string | null;
  setApiKey: (apiKey: string | null) => void;
}

export const useOpenAiStore = create<OpenAIStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),
    }),
    { name: "openai" },
  ),
);
