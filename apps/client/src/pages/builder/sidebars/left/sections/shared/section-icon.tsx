import type { IconProps } from "@phosphor-icons/react";
import {
  ArticleIcon,
  BooksIcon,
  BriefcaseIcon,
  CertificateIcon,
  CompassToolIcon,
  GameControllerIcon,
  GraduationCapIcon,
  HandHeartIcon,
  MedalIcon,
  PuzzlePieceIcon,
  ShareNetworkIcon,
  TranslateIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { defaultSection } from "@reactive-resume/schema";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

export const getSectionIcon = (id: SectionKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case "basics": {
      return <UserIcon size={18} {...props} />;
    }
    case "summary": {
      return <ArticleIcon size={18} {...props} />;
    }
    case "awards": {
      return <MedalIcon size={18} {...props} />;
    }
    case "profiles": {
      return <ShareNetworkIcon size={18} {...props} />;
    }
    case "experience": {
      return <BriefcaseIcon size={18} {...props} />;
    }
    case "education": {
      return <GraduationCapIcon size={18} {...props} />;
    }
    case "certifications": {
      return <CertificateIcon size={18} {...props} />;
    }
    case "interests": {
      return <GameControllerIcon size={18} {...props} />;
    }
    case "languages": {
      return <TranslateIcon size={18} {...props} />;
    }
    case "volunteer": {
      return <HandHeartIcon size={18} {...props} />;
    }
    case "projects": {
      return <PuzzlePieceIcon size={18} {...props} />;
    }
    case "publications": {
      return <BooksIcon size={18} {...props} />;
    }
    case "skills": {
      return <CompassToolIcon size={18} {...props} />;
    }
    case "references": {
      return <UsersIcon size={18} {...props} />;
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
