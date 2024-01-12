import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { SectionIcon } from "@/client/pages/builder/_components/sections/shared/section-icon";
import { useResumeStore } from "@/client/stores/resume";

export const SectionBar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
      <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-full">
        <Link to="/dashboard">
          <Icon size={14} />
        </Link>
      </Button>

      <div className="flex flex-col items-center justify-center gap-y-2">
        <SectionIcon
          id={ResumeSections.BASICS}
          onClick={() => scrollIntoView(`#${ResumeSections.BASICS}`)}
          name={t({
            message: "Basics",
            context:
              "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
          })}
        />
        <SectionIcon
          id={ResumeSections.SUMMARY}
          onClick={() => scrollIntoView(`#${ResumeSections.SUMMARY}`)}
        />
        <SectionIcon
          id={ResumeSections.PROFILES}
          onClick={() => scrollIntoView(`#${ResumeSections.PROFILES}`)}
        />
        <SectionIcon
          id={ResumeSections.EXPERIENCE}
          onClick={() => scrollIntoView(`#${ResumeSections.EXPERIENCE}`)}
        />
        <SectionIcon
          id={ResumeSections.EDUCATION}
          onClick={() => scrollIntoView(`#${ResumeSections.EDUCATION}`)}
        />
        <SectionIcon
          id={ResumeSections.SKILLS}
          onClick={() => scrollIntoView(`#${ResumeSections.SKILLS}`)}
        />
        <SectionIcon
          id={ResumeSections.LANGUAGES}
          onClick={() => scrollIntoView(`#${ResumeSections.LANGUAGES}`)}
        />
        <SectionIcon
          id={ResumeSections.AWARDS}
          onClick={() => scrollIntoView(`#${ResumeSections.AWARDS}`)}
        />
        <SectionIcon
          id={ResumeSections.CERTIFICATIONS}
          onClick={() => scrollIntoView(`#${ResumeSections.CERTIFICATIONS}`)}
        />
        <SectionIcon
          id={ResumeSections.INTERESTS}
          onClick={() => scrollIntoView(`#${ResumeSections.INTERESTS}`)}
        />
        <SectionIcon
          id={ResumeSections.PROFILES}
          onClick={() => scrollIntoView(`#${ResumeSections.PROJECTS}`)}
        />
        <SectionIcon
          id={ResumeSections.PUBLICATIONS}
          onClick={() => scrollIntoView(`#${ResumeSections.PUBLICATIONS}`)}
        />
        <SectionIcon
          id={ResumeSections.VOLUNTEER}
          onClick={() => scrollIntoView(`#${ResumeSections.VOLUNTEER}`)}
        />
        <SectionIcon
          id={ResumeSections.REFERENCES}
          onClick={() => scrollIntoView(`#${ResumeSections.REFERENCES}`)}
        />

        <SectionIcon
          id={ResumeSections.CUSTOM}
          variant="outline"
          name={t`Add a new section`}
          icon={<Plus size={14} />}
          onClick={() => {
            addSection();
            // eslint-disable-next-line lingui/no-unlocalized-strings
            scrollIntoView("& > section:last-of-type");
          }}
        />
      </div>

      <UserOptions>
        <Button size="icon" variant="ghost" className="rounded-full">
          <UserAvatar size={28} />
        </Button>
      </UserOptions>
    </div>
  );
};
