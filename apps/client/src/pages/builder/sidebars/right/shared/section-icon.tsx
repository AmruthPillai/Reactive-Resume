import type { IconProps } from "@phosphor-icons/react";
import {
  Code,
  DiamondsFour,
  DownloadSimple,
  Info,
  Layout,
  Note,
  Palette,
  ReadCvLogo,
  ShareFat,
  TextT,
  Translate,
  TrendUp,
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
      return <Note size={18} {...props} />;
    }
    case "template": {
      return <DiamondsFour size={18} {...props} />;
    }
    case "layout": {
      return <Layout size={18} {...props} />;
    }
    case "typography": {
      return <TextT size={18} {...props} />;
    }
    case "theme": {
      return <Palette size={18} {...props} />;
    }
    case "css": {
      return <Code size={18} {...props} />;
    }
    case "page": {
      return <ReadCvLogo size={18} {...props} />;
    }
    case "locale": {
      return <Translate size={18} {...props} />;
    }
    case "sharing": {
      return <ShareFat size={18} {...props} />;
    }
    case "statistics": {
      return <TrendUp size={18} {...props} />;
    }
    case "export": {
      return <DownloadSimple size={18} {...props} />;
    }
    case "information": {
      return <Info size={18} {...props} />;
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
