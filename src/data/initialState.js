import leftSections from './leftSections';

const initialState = {
  id: '',
  profile: {
    heading: 'Profile',
    photograph: '',
    firstName: '',
    lastName: '',
    subtitle: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
    },
    profile: '',
    website: '',
    email: '',
  },
  social: {
    heading: 'Social',
    visible: true,
    items: [],
  },
  objective: {
    heading: 'Objective',
    visible: true,
    body: '',
  },
  work: {
    heading: 'Work Experience',
    visible: true,
    items: [],
  },
  education: {
    heading: 'Education',
    visible: true,
    items: [],
  },
  awards: {
    heading: 'Awards',
    visible: true,
    items: [],
  },
  certifications: {
    heading: 'Certifications',
    visible: true,
    items: [],
  },
  skills: {
    heading: 'Skills',
    visible: true,
    items: [],
  },
  hobbies: {
    heading: 'Hobbies',
    visible: true,
    items: [],
  },
  languages: {
    heading: 'Languages',
    visible: true,
    items: [],
  },
  references: {
    heading: 'References',
    visible: true,
    items: [],
  },
  name: '',
  metadata: {
    template: 'onyx',
    font: 'Montserrat',
    layout: [leftSections.filter((x) => !x.fixed).map((x) => x.id)],
    colors: {
      text: '#444444',
      primary: '#5875DB',
      background: '#FFFFFF',
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default initialState;
