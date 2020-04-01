import Onyx, { Image as OnyxPreview } from './onyx';
import Pikachu, { Image as PikachuPreview } from './pikachu';
import Gengar, { Image as GengarPreview } from './gengar';
import Castform, { Image as CastformPreview } from './castform';
import Glalie, { Image as GlaliePreview } from './glalie';

export default [
  {
    key: 'onyx',
    name: 'Onyx',
    component: Onyx,
    preview: OnyxPreview,
  },
  {
    key: 'pikachu',
    name: 'Pikachu',
    component: Pikachu,
    preview: PikachuPreview,
  },
  {
    key: 'gengar',
    name: 'Gengar',
    component: Gengar,
    preview: GengarPreview,
  },
  {
    key: 'castform',
    name: 'Castform',
    component: Castform,
    preview: CastformPreview,
  },
  {
    key: 'glalie',
    name: 'Glalie',
    component: Glalie,
    preview: GlaliePreview,
  },
];
