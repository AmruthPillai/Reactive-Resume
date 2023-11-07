import { PageProps } from '@/utils/template';

import Castform from './Castform/Castform';
import Gengar from './Gengar/Gengar';
import Glalie from './Glalie/Glalie';
import Kakuna from './Kakuna/Kakuna';
import Leafish from './Leafish/Leafish';
import Onyx from './Onyx/Onyx';
import Pikachu from './Pikachu/Pikachu';
import { TEMPLATES } from './templateHelper';

export type TemplateMeta = {
  id: string;
  name: string;
  preview: string;
  component: React.FC<PageProps>;
};

const templateMap: Record<string, TemplateMeta> = {
  kakuna: {
    id: TEMPLATES.KAKUNA.toLowerCase(),
    name: TEMPLATES.KAKUNA,
    preview: '/images/templates/kakuna.jpg',
    component: Kakuna,
  },
  onyx: {
    id: TEMPLATES.ONYX.toLowerCase(),
    name: TEMPLATES.ONYX,
    preview: '/images/templates/onyx.jpg',
    component: Onyx,
  },
  pikachu: {
    id: TEMPLATES.PIKACHU.toLowerCase(),
    name: TEMPLATES.PIKACHU,
    preview: '/images/templates/pikachu.jpg',
    component: Pikachu,
  },
  gengar: {
    id: TEMPLATES.GENGAR.toLowerCase(),
    name: TEMPLATES.GENGAR,
    preview: '/images/templates/gengar.jpg',
    component: Gengar,
  },
  castform: {
    id: TEMPLATES.CASTFORM.toLowerCase(),
    name: TEMPLATES.CASTFORM,
    preview: '/images/templates/castform.jpg',
    component: Castform,
  },
  glalie: {
    id: TEMPLATES.GLALIE.toLowerCase(),
    name: TEMPLATES.GLALIE,
    preview: '/images/templates/glalie.jpg',
    component: Glalie,
  },
  leafish: {
    id: TEMPLATES.LEAFISH.toLowerCase(),
    name: TEMPLATES.LEAFISH,
    preview: '/images/templates/leafish.jpg',
    component: Leafish,
  },
};

export default templateMap;
