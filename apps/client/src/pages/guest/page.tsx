import { t } from "@lingui/macro";
import type { ResumeDto } from "@reactive-resume/dto";
import { defaultResumeData } from "@reactive-resume/schema";
import { useEffect } from "react";

import { BuilderPage } from "@/client/pages/builder/page";
import { useResumeStore } from "@/client/stores/resume";

export const GUEST_RESUME_STORAGE_KEY = "reactive-resume-guest";

export const createGuestResume = (): ResumeDto => ({
  id: "guest",
  title: t`Guest Resume`,
  slug: "guest-resume",
  data: structuredClone(defaultResumeData),
  visibility: "private",
  locked: false,
  userId: "guest",
  user: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const GuestBuilderPage = () => {
  const resume = useResumeStore((state) => state.resume);
  const isGuest = useResumeStore((state) => state.isGuest);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = useResumeStore.getState();

    if (current.isGuest && current.resume && current.resume.id === "guest" && current.resume.data) {
      return;
    }

    const stored = window.sessionStorage.getItem(GUEST_RESUME_STORAGE_KEY);

    let guestResume: ResumeDto;

    if (stored) {
      try {
        const parsed: ResumeDto = JSON.parse(stored);
        guestResume = {
          ...createGuestResume(),
          ...parsed,
        };
      } catch {
        guestResume = createGuestResume();
      }
    } else {
      guestResume = createGuestResume();
    }

    useResumeStore.setState({ resume: guestResume, isGuest: true });
    useResumeStore.temporal.getState().clear();
  }, []);

  useEffect(() => {
    if (!isGuest) return;
    if (typeof window === "undefined") return;
    if (!resume || !resume.id) return;

    window.sessionStorage.setItem(GUEST_RESUME_STORAGE_KEY, JSON.stringify(resume));
  }, [isGuest, resume]);

  return <BuilderPage />;
};


