import { PageProps } from '@/utils/template';

import Castform from './Castform/Castform';
import Gengar from './Gengar/Gengar';
import Glalie from './Glalie/Glalie';
import Kakuna from './Kakuna/Kakuna';
import Onyx from './Onyx/Onyx';
import Pikachu from './Pikachu/Pikachu';

export type TemplateMeta = {
  id: string;
  name: string;
  preview: string;
  component: React.FC<PageProps>;
};

const templateMap: Record<string, TemplateMeta> = {
  kakuna: {
    id: 'kakuna',
    name: 'Kakuna',
    preview: require('./Kakuna/preview.jpg'),
    component: Kakuna,
  },
  onyx: {
    id: 'onyx',
    name: 'Onyx',
    preview: require('./Onyx/preview.jpg'),
    component: Onyx,
  },
  pikachu: {
    id: 'pikachu',
    name: 'Pikachu',
    preview: require('./Pikachu/preview.jpg'),
    component: Pikachu,
  },
  gengar: {
    id: 'gengar',
    name: 'Gengar',
    preview: require('./Gengar/preview.jpg'),
    component: Gengar,
  },
  castform: {
    id: 'castform',
    name: 'Castform',
    preview: require('./Castform/preview.jpg'),
    component: Castform,
  },
  glalie: {
    id: 'glalie',
    name: 'Glalie',
    preview: require('./Glalie/preview.jpg'),
    component: Glalie,
  },
};

export default templateMap;
