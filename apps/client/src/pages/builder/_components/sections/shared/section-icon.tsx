import {
  Article,
  Books,
  Briefcase,
  Certificate,
  CompassTool,
  GameController,
  GraduationCap,
  HandHeart,
  IconProps,
  Medal,
  PuzzlePiece,
  ShareNetwork,
  Translate,
  User,
  Users,
} from "@phosphor-icons/react";
import { defaultSection, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { Button, ButtonProps, Tooltip } from "@reactive-resume/ui";
import { ResumeSections } from "@reactive-resume/utils";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

export const getSectionIcon = (id: SectionKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case ResumeSections.BASICS:
      return <User size={18} {...props} />;
    case ResumeSections.SUMMARY:
      return <Article size={18} {...props} />;
    case ResumeSections.AWARDS:
      return <Medal size={18} {...props} />;
    case ResumeSections.PROFILES:
      return <ShareNetwork size={18} {...props} />;
    case ResumeSections.EXPERIENCE:
      return <Briefcase size={18} {...props} />;
    case ResumeSections.EDUCATION:
      return <GraduationCap size={18} {...props} />;
    case ResumeSections.CERTIFICATIONS:
      return <Certificate size={18} {...props} />;
    case ResumeSections.INTERESTS:
      return <GameController size={18} {...props} />;
    case ResumeSections.LANGUAGES:
      return <Translate size={18} {...props} />;
    case ResumeSections.VOLUNTEER:
      return <HandHeart size={18} {...props} />;
    case ResumeSections.PROJECTS:
      return <PuzzlePiece size={18} {...props} />;
    case ResumeSections.PUBLICATIONS:
      return <Books size={18} {...props} />;
    case ResumeSections.SKILLS:
      return <CompassTool size={18} {...props} />;
    case ResumeSections.REFERENCES:
      return <Users size={18} {...props} />;

    default:
      return null;
  }
};

type SectionIconProps = ButtonProps & {
  id: SectionKey;
  name?: string;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, ...props }: SectionIconProps) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id, defaultSection),
  ) as SectionWithItem;

  return (
    <Tooltip side="right" content={name ?? section.name}>
      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" {...props}>
        {icon ?? getSectionIcon(id, { size: 14 })}
      </Button>
    </Tooltip>
  );
};
