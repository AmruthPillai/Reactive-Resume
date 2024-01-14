import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { SectionIcon } from "@/client/pages/builder/_components/sections/shared/section-icon";

export const SectionBar = () => {
  const navigate = useNavigate();

  const params = useParams<{ id: string; section: string }>();

  const handleSectionClick = (sectionId: string) => {
    navigate(`/builder/${params.id}/${sectionId}`);
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
          onClick={() => handleSectionClick(ResumeSections.BASICS)}
          name={t({
            message: "Basics",
            context:
              "The basics section of a resume consists of User's Picture, Full Name, Location etc.",
          })}
        />
        <SectionIcon
          id={ResumeSections.SUMMARY}
          onClick={() => handleSectionClick(ResumeSections.SUMMARY)}
        />
        <SectionIcon
          id={ResumeSections.PROFILES}
          onClick={() => handleSectionClick(ResumeSections.PROFILES)}
        />
        <SectionIcon
          id={ResumeSections.EXPERIENCE}
          onClick={() => handleSectionClick(ResumeSections.EXPERIENCE)}
        />
        <SectionIcon
          id={ResumeSections.EDUCATION}
          onClick={() => handleSectionClick(ResumeSections.EDUCATION)}
        />
        <SectionIcon
          id={ResumeSections.SKILLS}
          onClick={() => handleSectionClick(ResumeSections.SKILLS)}
        />
        <SectionIcon
          id={ResumeSections.LANGUAGES}
          onClick={() => handleSectionClick(ResumeSections.LANGUAGES)}
        />
        <SectionIcon
          id={ResumeSections.AWARDS}
          onClick={() => handleSectionClick(ResumeSections.AWARDS)}
        />
        <SectionIcon
          id={ResumeSections.CERTIFICATIONS}
          onClick={() => handleSectionClick(ResumeSections.CERTIFICATIONS)}
        />
        <SectionIcon
          id={ResumeSections.INTERESTS}
          onClick={() => handleSectionClick(ResumeSections.INTERESTS)}
        />
        <SectionIcon
          id={ResumeSections.PROJECTS}
          onClick={() => handleSectionClick(ResumeSections.PROJECTS)}
        />
        <SectionIcon
          id={ResumeSections.PUBLICATIONS}
          onClick={() => handleSectionClick(ResumeSections.PUBLICATIONS)}
        />
        <SectionIcon
          id={ResumeSections.VOLUNTEER}
          onClick={() => handleSectionClick(ResumeSections.VOLUNTEER)}
        />
        <SectionIcon
          id={ResumeSections.REFERENCES}
          onClick={() => handleSectionClick(ResumeSections.REFERENCES)}
        />

        <SectionIcon
          id={ResumeSections.CUSTOM}
          variant="outline"
          name={t`Add a new section`}
          icon={<Plus size={14} />}
          onClick={() => {
            handleSectionClick(ResumeSections.CUSTOM);
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
