import React, { createContext, useReducer } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import remove from 'lodash/remove';
import { v4 as uuidv4 } from 'uuid';
import demoData from '../assets/demo/data.json';
import { move } from '../utils';

const initialState = {
  version: 2,
  data: {
    profile: {
      heading: 'Profile',
      photo: '',
      firstName: '',
      lastName: '',
      subtitle: ''
    },
    contact: {
      heading: "Contact",
      address: {
        heading: 'Address',
        line1: '',
        line2: '',
        line3: '',
      },
      phone: {
          heading: 'Phone',
          value: ''
      },
      website: {
        heading: 'Website',
        value: ''
      },
      email: {
        heading: 'Email address',
        value: ''
      }
    },
    objective: {
      enable: true,
      heading: 'Objective',
      body: '',
    },
    work: {
      enable: true,
      heading: 'Work Experience',
      items: [],
    },
    education: {
      enable: true,
      heading: 'Education',
      items: [],
    },
    awards: {
      enable: true,
      heading: 'Honors & Awards',
      items: [],
    },
    certifications: {
      enable: true,
      heading: 'Certifications',
      items: [],
    },
    skills: {
      enable: true,
      heading: 'Skills',
      items: [],
    },
    hobbies: {
      enable: true,
      heading: 'Hobbies',
      items: [],
    },
    languages: {
      enable: true,
      heading: 'Languages',
      items: [],
    },
    references: {
      enable: true,
      heading: 'References',
      items: [],
    },
    extras: {
      enable: true,
      heading: 'Personal Information',
      items: [],
    },
  },
  theme: {
    layout: 'Onyx',
    font: {
      family: '',
    },
    colors: {
      background: '#ffffff',
      primary: '#212121',
      accent: '#f44336',
    },
  },
  settings: {
    language: 'en',
  },
};

const checkImportedDataType = (payload) => {
  // Reactive-Resume format
  if ("data" in payload && "theme" in payload) {
    if ("version" in payload)
      return `v${payload.version}`;
    return 'v1';
  }
  // LinkedIn format
  if ("userProfile" in payload && "experiences" in payload) {
    return 'linkedin';
  }

  return 'unknown';
}

const checkDate = (value) => {
  const date = new Date(value);
  return Object.prototype.toString.call(date) === '[object Date]'
}

const MigrateV1ToV2 = (payload) => {
  const payloadV2 = { ...initialState };

  Object.assign(payloadV2.data.profile, {
    "heading": payload.data.profile.heading,
    "photo": payload.data.profile.photo,
    "firstName": payload.data.profile.firstName,
    "lastName": payload.data.profile.lastName,
    "subtitle": payload.data.profile.subtitle
  });

  Object.assign(payloadV2.data.contact.address, {
    "line1": payload.data.profile.address.line1,
    "line2": payload.data.profile.address.line2,
    "line3": payload.data.profile.address.line3
  });

  Object.assign(payloadV2.data.contact.phone, {
    "value": payload.data.profile.phone
  });

  Object.assign(payloadV2.data.contact.website, {
    "value": payload.data.profile.website
  });

  Object.assign(payloadV2.data.contact.email, {
    "value": payload.data.profile.email
  });

  Object.assign(payloadV2.data.objective, payload.data.objective);
  Object.assign(payloadV2.data.work, payload.data.work);
  Object.assign(payloadV2.data.education, payload.data.education);
  Object.assign(payloadV2.data.awards, payload.data.awards);
  Object.assign(payloadV2.data.certifications, payload.data.certifications);
  Object.assign(payloadV2.data.skills, payload.data.skills);
  Object.assign(payloadV2.data.hobbies, payload.data.hobbies);
  Object.assign(payloadV2.data.languages, payload.data.languages);
  Object.assign(payloadV2.data.references, payload.data.references);
  Object.assign(payloadV2.data.extras, payload.data.extras);
  Object.assign(payloadV2.theme, payload.theme);
  Object.assign(payloadV2.settings, payload.settings);
  
  return payloadV2;
}

// see https://github.com/arsenikstiger/Reactive-Resume-LinkedIn-Builder
const MigrateLinkedInToV2 = (payload) => {
  const payloadV2 = { ...initialState };

  Object.assign(payloadV2.data.profile, {
    "photo": payload.userProfile.photo,
    "firstName": payload.userProfile.fullName,
    // "lastName": payload.userProfile.FullName,
    "subtitle": payload.userProfile.title
  });

  Object.assign(payloadV2.data.objective, {
    "body": payload.userProfile.description
  });

  Object.assign(payloadV2.data.work.items, payload.experiences.map(e => ({
    "id": uuidv4(),
    "title": `${e.company}, ${e.location.province}`,
    "role": e.title,
    "start": `${new Date(e.startDate).toLocaleString('default', { month: 'short' })} ${new Date(e.startDate).getFullYear()}`,
    "end": checkDate(e.endDate) ? `${new Date(e.endDate).toLocaleString('default', { month: 'short' })} ${new Date(e.endDate).getFullYear()}` : "Today",
    "description": e.description,
    "enable": true
  })));

  Object.assign(payloadV2.data.education.items, payload.education.map(e => ({
    "id": uuidv4(),
    "name": `${e.schoolName}`,
    "major": e.degreeName,
    // "grade": e.degreeName,
    "start": `${new Date(e.startDate).toLocaleString('default', { month: 'short' })} ${new Date(e.startDate).getFullYear()}`,
    "end": checkDate(e.endDate) ? `${new Date(e.endDate).toLocaleString('default', { month: 'short' })} ${new Date(e.endDate).getFullYear()}` : "Today",
    "description": "",
    "enable": true
  })));

  // For skills, we take only the first five skills ordered by endorsement count
  Object.assign(payloadV2.data.skills.items, payload.skills.sort((s1, s2) => s2.endorsementCount - s1.endorsementCount).slice(0, 5).map(e => ({
    "id": uuidv4(),
    "skill": e.skillName
  })));
  
  return payloadV2;
}

const reducer = (state, { type, payload }) => {
  let items;
  let importedDataType;
  const newState = JSON.parse(JSON.stringify(state));

  switch (type) {
    case 'migrate_section':
      return set({ ...newState }, `data.${payload.key}`, payload.value);
    case 'add_item':
      items = get({ ...newState }, `data.${payload.key}.items`, []);
      items.push(payload.value);
      return set({ ...newState }, `data.${payload.key}.items`, items);
    case 'delete_item':
      items = get({ ...newState }, `data.${payload.key}.items`, []);
      remove(items, x => x.id === payload.value.id);
      return set({ ...newState }, `data.${payload.key}.items`, items);
    case 'move_item_up':
      items = get({ ...newState }, `data.${payload.key}.items`, []);
      move(items, payload.value, -1);
      return set({ ...newState }, `data.${payload.key}.items`, items);
    case 'move_item_down':
      items = get({ ...newState }, `data.${payload.key}.items`, []);
      move(items, payload.value, 1);
      return set({ ...newState }, `data.${payload.key}.items`, items);
    case 'on_input':
      return set({ ...newState }, payload.key, payload.value);
    case 'save_data':
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    case 'import_data':
      if (payload === null) return initialState;

      // gets payload type for migration needs
      importedDataType = checkImportedDataType(payload);

      if (importedDataType === 'unknown') return initialState;

      if (importedDataType === 'v1') payload = MigrateV1ToV2(payload);

      if (importedDataType === 'linkedin') payload = MigrateLinkedInToV2(payload);

      for (const section of Object.keys(initialState.data)) {
        if (!(section in payload.data)) {
          payload.data[section] = initialState.data[section];
        }
      }

      return {
        ...newState,
        ...payload,
      };
    case 'load_demo_data':
      return {
        ...newState,
        ...demoData,
      };
    case 'reset':
      return initialState;
    default:
      return newState;
  }
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const AppProvider = StateProvider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;
