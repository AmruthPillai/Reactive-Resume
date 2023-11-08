import { PageProps } from '@/utils/template';

import Castform from './Castform/Castform';
import Gengar from './Gengar/Gengar';
import Glalie from './Glalie/Glalie';
import Kakuna from './Kakuna/Kakuna';
import Leafish from './Leafish/Leafish';
import Onyx from './Onyx/Onyx';
import Pikachu from './Pikachu/Pikachu';
import { TEMPLATES } from './templateHelper';
import { capitalize } from 'lodash';

export type TemplateMeta = {
  id: string;
  name: string;
  preview: string;
  component: React.FC<PageProps>;
};

const templateMap: Record<string, TemplateMeta> = {
  kakuna: {
    id: TEMPLATES.KAKUNA,
    name: capitalize(TEMPLATES.KAKUNA),
    preview: '/images/templates/kakuna.jpg',
    component: Kakuna,
  },
  onyx: {
    id: TEMPLATES.ONYX,
    name: capitalize(TEMPLATES.ONYX),
    preview: '/images/templates/onyx.jpg',
    component: Onyx,
  },
  pikachu: {
    id: TEMPLATES.PIKACHU,
    name: capitalize(TEMPLATES.PIKACHU),
    preview: '/images/templates/pikachu.jpg',
    component: Pikachu,
  },
  gengar: {
    id: TEMPLATES.GENGAR,
    name: capitalize(TEMPLATES.GENGAR),
    preview: '/images/templates/gengar.jpg',
    component: Gengar,
  },
  castform: {
    id: TEMPLATES.CASTFORM,
    name: capitalize(TEMPLATES.CASTFORM),
    preview: '/images/templates/castform.jpg',
    component: Castform,
  },
  glalie: {
    id: TEMPLATES.GLALIE,
    name: capitalize(TEMPLATES.GLALIE),
    preview: '/images/templates/glalie.jpg',
    component: Glalie,
  },
  leafish: {
    id: TEMPLATES.LEAFISH,
    name: capitalize(TEMPLATES.LEAFISH),
    preview: '/images/templates/leafish.jpg',
    component: Leafish,
  },
};

export default templateMap;
