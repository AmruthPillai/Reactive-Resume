import { Font } from 'schema';

import axios from './axios';

export const fetchFonts = () => axios.get<Font[]>('/fonts').then((res) => res.data);
