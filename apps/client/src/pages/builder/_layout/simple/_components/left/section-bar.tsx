import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
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
          id="basics"
          onClick={() => scrollIntoView("#basics")}
          name={t({
            message: "Basics",
            context:
              "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
          })}
        />
        <SectionIcon id="summary" onClick={() => scrollIntoView("#summary")} />
        <SectionIcon id="profiles" onClick={() => scrollIntoView("#profiles")} />
        <SectionIcon id="experience" onClick={() => scrollIntoView("#experience")} />
        <SectionIcon id="education" onClick={() => scrollIntoView("#education")} />
        <SectionIcon id="skills" onClick={() => scrollIntoView("#skills")} />
        <SectionIcon id="languages" onClick={() => scrollIntoView("#languages")} />
        <SectionIcon id="awards" onClick={() => scrollIntoView("#awards")} />
        <SectionIcon id="certifications" onClick={() => scrollIntoView("#certifications")} />
        <SectionIcon id="interests" onClick={() => scrollIntoView("#interests")} />
        <SectionIcon id="projects" onClick={() => scrollIntoView("#projects")} />
        <SectionIcon id="publications" onClick={() => scrollIntoView("#publications")} />
        <SectionIcon id="volunteer" onClick={() => scrollIntoView("#volunteer")} />
        <SectionIcon id="references" onClick={() => scrollIntoView("#references")} />

        <SectionIcon
          id="custom"
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
