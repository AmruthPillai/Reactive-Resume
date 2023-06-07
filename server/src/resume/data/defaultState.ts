import { Resume } from 'schema';

const defaultCSS = `/* Enter custom CSS here */

* {
    outline: 1px solid #000;
}`;

const defaultState: Partial<Resume> = {
  basics: {
    email: '',
    headline: '',
    birthdate: '',
    photo: {
      url: '',
      visible: true,
      filters: {
        size: 128,
        shape: 'square',
        border: false,
        grayscale: false,
      },
    },
    name: '',
    phone: '',
    summary: '',
    website: '',
    location: {
      address: '',
      city: '',
      country: '',
      region: '',
      postalCode: '',
    },
    profiles: [],
  },
  sections: {
    work: {
      id: 'work',
      name: 'Work Experience',
      type: 'work',
      columns: 2,
      visible: true,
      items: [],
    },
    education: {
      id: 'education',
      name: 'Education',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    awards: {
      id: 'awards',
      name: 'Awards',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    certifications: {
      id: 'certifications',
      name: 'Certifications',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    publications: {
      id: 'publications',
      name: 'Publications',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    skills: {
      id: 'skills',
      name: 'Skills',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    languages: {
      id: 'languages',
      name: 'Languages',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    interests: {
      id: 'interests',
      name: 'Interests',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    volunteer: {
      id: 'volunteer',
      name: 'Volunteer Experience',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    references: {
      id: 'references',
      name: 'References',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
    projects: {
      id: 'projects',
      name: 'Projects',
      type: 'basic',
      columns: 2,
      visible: true,
      items: [],
    },
  },
  metadata: {
    css: {
      value: defaultCSS,
      visible: false,
    },
    theme: {
      text: '#000000',
      background: '#ffffff',
      primary: '#f44336',
    },
    locale: 'en',
    date: {
      format: 'MMMM DD, YYYY',
    },
    page: {
      format: 'A4',
    },
    layout: [
      [
        ['work', 'education', 'projects', 'volunteer', 'references'],
        ['skills', 'interests', 'languages', 'awards', 'certifications', 'publications'],
      ],
    ],
    template: 'kakuna',
    typography: {
      family: {
        heading: 'Open Sans',
        body: 'Open Sans',
      },
      size: {
        heading: 28,
        body: 14,
      },
    },
  },
  public: true,
};

export default defaultState;
