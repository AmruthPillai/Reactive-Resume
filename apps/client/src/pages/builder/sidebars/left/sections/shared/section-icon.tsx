import type { IconProps } from "@phosphor-icons/react";
import {
  Article,
  Books,
  Briefcase,
  Certificate,
  CompassTool,
  GameController,
  GraduationCap,
  HandHeart,
  Medal,
  PuzzlePiece,
  ShareNetwork,
  Translate,
  User,
  Users,
} from "@phosphor-icons/react";
import type { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { defaultSection } from "@reactive-resume/schema";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

const getSectionIcon = (id: SectionKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case "basics": {
      return <User size={18} {...props} />;
    }
    case "summary": {
      return <Article size={18} {...props} />;
    }
    case "awards": {
      return <Medal size={18} {...props} />;
    }
    case "profiles": {
      return <ShareNetwork size={18} {...props} />;
    }
    case "experience": {
      return <Briefcase size={18} {...props} />;
    }
    case "education": {
      return <GraduationCap size={18} {...props} />;
    }
    case "certifications": {
      return <Certificate size={18} {...props} />;
    }
    case "interests": {
      return <GameController size={18} {...props} />;
    }
    case "languages": {
      return <Translate size={18} {...props} />;
    }
    case "volunteer": {
      return <HandHeart size={18} {...props} />;
    }
    case "projects": {
      return <PuzzlePiece size={18} {...props} />;
    }
    case "publications": {
      return <Books size={18} {...props} />;
    }
    case "skills": {
      return <CompassTool size={18} {...props} />;
    }
    case "references": {
      return <Users size={18} {...props} />;
    }

    default: {
      return null;
    }
  }
};

type SectionIconProps = Omit<ButtonProps, "size"> & {
  id: SectionKey;
  name?: string;
  size?: number;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, size = 14, ...props }: SectionIconProps) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id, defaultSection),
  ) as SectionWithItem;

  return (
    <Tooltip side="right" content={name ?? section.name}>
      <Button size="icon" variant="ghost" className="size-8 rounded-full" {...props}>
        {icon ?? getSectionIcon(id, { size })}
      </Button>
    </Tooltip>
  );
};
