import { ResumeData } from "@reactive-resume/schema";
import { create } from "zustand";

export const useStore = create<ResumeData>()(() => ({}) as ResumeData);
