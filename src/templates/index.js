import Onyx, { Image as OnyxPreview } from './onyx';
import Pikachu, { Image as PikachuPreview } from './pikachu';
import Gengar, { Image as GengarPreview } from './gengar';
import Castform, { Image as CastformPreview } from './castform';

export default [
  {
    key: 'onyx',
    component: Onyx,
    preview: OnyxPreview,
  },
  {
    key: 'pikachu',
    component: Pikachu,
    preview: PikachuPreview,
  },
  {
    key: 'gengar',
    component: Gengar,
    preview: GengarPreview,
  },
  {
    key: 'castform',
    component: Castform,
    preview: CastformPreview,
  },
];
