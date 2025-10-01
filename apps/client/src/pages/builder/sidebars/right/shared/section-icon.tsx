import type { IconProps } from "@phosphor-icons/react";
import {
  CodeIcon,
  DiamondsFourIcon,
  DownloadSimpleIcon,
  InfoIcon,
  LayoutIcon,
  NoteIcon,
  PaletteIcon,
  ReadCvLogoIcon,
  ShareFatIcon,
  TextTIcon,
  TranslateIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";

type MetadataKey =
  | "template"
  | "layout"
  | "typography"
  | "theme"
  | "css"
  | "page"
  | "locale"
  | "sharing"
  | "statistics"
  | "export"
  | "notes"
  | "information";

const getSectionIcon = (id: MetadataKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case "notes": {
      return <NoteIcon size={18} {...props} />;
    }
    case "template": {
      return <DiamondsFourIcon size={18} {...props} />;
    }
    case "layout": {
      return <LayoutIcon size={18} {...props} />;
    }
    case "typography": {
      return <TextTIcon size={18} {...props} />;
    }
    case "theme": {
      return <PaletteIcon size={18} {...props} />;
    }
    case "css": {
      return <CodeIcon size={18} {...props} />;
    }
    case "page": {
      return <ReadCvLogoIcon size={18} {...props} />;
    }
    case "locale": {
      return <TranslateIcon size={18} {...props} />;
    }
    case "sharing": {
      return <ShareFatIcon size={18} {...props} />;
    }
    case "statistics": {
      return <TrendUpIcon size={18} {...props} />;
    }
    case "export": {
      return <DownloadSimpleIcon size={18} {...props} />;
    }
    case "information": {
      return <InfoIcon size={18} {...props} />;
    }

    default: {
      return null;
    }
  }
};

type SectionIconProps = Omit<ButtonProps, "size"> & {
  id: MetadataKey;
  name: string;
  size?: number;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, size = 14, ...props }: SectionIconProps) => (
  <Tooltip side="left" content={name}>
    <Button size="icon" variant="ghost" className="size-8 rounded-full" {...props}>
      {icon ?? getSectionIcon(id, { size })}
    </Button>
  </Tooltip>
);
