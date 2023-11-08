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
    order: 1,
    id: 'basics',
    icon: <Person />,
    component: <Basics />,
  },
  {
    order: 2,
    id: 'location',
    icon: <Map />,
    component: <Location />,
  },
  {
    order: 3,
    id: 'profiles',
    icon: <Twitter />,
    component: <Profiles />,
  },
  {
    order: 4,
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
    order: 5,
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
    order: 6,
    id: 'awards',
    icon: <EmojiEvents />,
    component: (
      <Section type={'awards'} path="sections.awards" titleKey="title" subtitleKey="awarder" isEditable isHideable />
    ),
  },
  {
    order: 7,
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
    order: 8,
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
    order: 9,
    id: 'skills',
    icon: <Architecture />,
    component: (
      <Section type={'skills'} path="sections.skills" titleKey="name" subtitleKey="level" isEditable isHideable />
    ),
  },
  {
    order: 10,
    id: 'languages',
    icon: <Language />,
    component: (
      <Section type={'languages'} path="sections.languages" titleKey="name" subtitleKey="level" isEditable isHideable />
    ),
  },
  {
    order: 11,
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
    order: 12,
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
    order: 13,
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
    order: 14,
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
    order: 1,
    id: 'templates',
    icon: <Category />,
    component: <Templates />,
  },
  {
    order: 2,
    id: 'layout',
    icon: <Margin />,
    component: <Layout />,
  },
  {
    order: 3,
    id: 'typography',
    icon: <FontDownload />,
    component: <Typography />,
  },
  {
    order: 4,
    id: 'theme',
    icon: <Palette />,
    component: <Theme />,
  },
  {
    order: 5,
    id: 'css',
    icon: <Style />,
    component: <CustomCSS />,
  },
  {
    order: 6,
    id: 'sharing',
    icon: <Share />,
    component: <Sharing />,
  },
  {
    order: 7,
    id: 'export',
    icon: <Download />,
    component: <Export />,
  },
  {
    order: 8,
    id: 'settings',
    icon: <SettingsIcon />,
    component: <Settings />,
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
