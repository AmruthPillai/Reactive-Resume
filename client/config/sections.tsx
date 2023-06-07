import {
  Architecture,
  CardGiftcard,
  Category,
  Coffee,
  Download,
  EmojiEvents,
  FontDownload,
  Groups,
  Language,
  Link as LinkIcon,
  Map,
  Margin,
  MenuBook,
  Palette,
  Person,
  Sailing,
  School,
  Settings as SettingsIcon,
  Share,
  Style,
  Twitter,
  VolunteerActivism,
  Work,
} from '@mui/icons-material';
import isEmpty from 'lodash/isEmpty';
import { Section as SectionRecord, SectionType } from 'schema';

import Basics from '@/components/build/LeftSidebar/sections/Basics';
import Location from '@/components/build/LeftSidebar/sections/Location';
import Profiles from '@/components/build/LeftSidebar/sections/Profiles';
import Section from '@/components/build/LeftSidebar/sections/Section';
import CustomCSS from '@/components/build/RightSidebar/sections/CustomCSS';
import Export from '@/components/build/RightSidebar/sections/Export';
import Layout from '@/components/build/RightSidebar/sections/Layout';
import Links from '@/components/build/RightSidebar/sections/Links';
import Settings from '@/components/build/RightSidebar/sections/Settings';
import Sharing from '@/components/build/RightSidebar/sections/Sharing';
import Templates from '@/components/build/RightSidebar/sections/Templates';
import Theme from '@/components/build/RightSidebar/sections/Theme';
import Typography from '@/components/build/RightSidebar/sections/Typography';
import { SidebarSection } from '@/types/app';

export const left: SidebarSection[] = [
  {
    id: 'basics',
    icon: <Person />,
    component: <Basics />,
  },
  {
    id: 'location',
    icon: <Map />,
    component: <Location />,
  },
  {
    id: 'profiles',
    icon: <Twitter />,
    component: <Profiles />,
  },
  {
    id: 'work',
    icon: <Work />,
    component: (
      <Section
        type={'work'}
        addMore={true}
        path="sections.work"
        titleKey="name"
        subtitleKey="position"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'education',
    icon: <School />,
    component: (
      <Section
        type={'education'}
        path="sections.education"
        titleKey="institution"
        subtitleKey="area"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'awards',
    icon: <EmojiEvents />,
    component: (
      <Section type={'awards'} path="sections.awards" titleKey="title" subtitleKey="awarder" isEditable isHideable />
    ),
  },
  {
    id: 'certifications',
    icon: <CardGiftcard />,
    component: (
      <Section
        type={'certifications'}
        path="sections.certifications"
        titleKey="name"
        subtitleKey="issuer"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'publications',
    icon: <MenuBook />,
    component: (
      <Section
        type={'publications'}
        path="sections.publications"
        titleKey="name"
        subtitleKey="publisher"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'skills',
    icon: <Architecture />,
    component: (
      <Section type={'skills'} path="sections.skills" titleKey="name" subtitleKey="level" isEditable isHideable />
    ),
  },
  {
    id: 'languages',
    icon: <Language />,
    component: (
      <Section type={'languages'} path="sections.languages" titleKey="name" subtitleKey="level" isEditable isHideable />
    ),
  },
  {
    id: 'interests',
    icon: <Sailing />,
    component: (
      <Section
        type={'interests'}
        path="sections.interests"
        titleKey="name"
        subtitleKey="keywords"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'volunteer',
    icon: <VolunteerActivism />,
    component: (
      <Section
        type={'volunteer'}
        path="sections.volunteer"
        titleKey="organization"
        subtitleKey="position"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'projects',
    icon: <Coffee />,
    component: (
      <Section
        type={'projects'}
        path="sections.projects"
        titleKey="name"
        subtitleKey="description"
        isEditable
        isHideable
      />
    ),
  },
  {
    id: 'references',
    icon: <Groups />,
    component: (
      <Section
        type={'references'}
        path="sections.references"
        titleKey="name"
        subtitleKey="relationship"
        isEditable
        isHideable
      />
    ),
  },
];

export const right: SidebarSection[] = [
  {
    id: 'templates',
    icon: <Category />,
    component: <Templates />,
  },
  {
    id: 'layout',
    icon: <Margin />,
    component: <Layout />,
  },
  {
    id: 'typography',
    icon: <FontDownload />,
    component: <Typography />,
  },
  {
    id: 'theme',
    icon: <Palette />,
    component: <Theme />,
  },
  {
    id: 'css',
    icon: <Style />,
    component: <CustomCSS />,
  },
  {
    id: 'sharing',
    icon: <Share />,
    component: <Sharing />,
  },
  {
    id: 'export',
    icon: <Download />,
    component: <Export />,
  },
  {
    id: 'settings',
    icon: <SettingsIcon />,
    component: <Settings />,
  },
  {
    id: 'links',
    icon: <LinkIcon />,
    component: <Links />,
  },
];

export const getSectionsByType = (sections: Record<string, SectionRecord>, type: SectionType): SectionRecord[] => {
  if (isEmpty(sections)) return [];

  return Object.entries(sections).reduce((acc, [id, section]) => {
    if (section.type.startsWith(type) && section.isDuplicated) {
      return [...acc, { ...section, id }];
    }

    return acc;
  }, [] as SectionRecord[]);
};

export const getCustomSections = (sections: Record<string, SectionRecord>): SectionRecord[] => {
  if (isEmpty(sections)) return [];

  return Object.entries(sections).reduce((acc, [id, section]) => {
    if (section.type === 'custom') {
      return [...acc, { ...section, id }];
    }

    return acc;
  }, [] as SectionRecord[]);
};

const sections = [...left, ...right];

export default sections;
