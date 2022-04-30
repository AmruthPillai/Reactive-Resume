export type Location = {
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
};

export type Profile = {
  id?: string;
  network: string;
  username: string;
  url?: string;
};

export type PhotoShape = 'square' | 'rounded-square' | 'circle';

export type PhotoFilters = {
  size: number;
  shape: PhotoShape;
  border: boolean;
  grayscale: boolean;
};

export type Photo = {
  url?: string;
  visible: boolean;
  filters: PhotoFilters;
};

export type Basics = {
  name: string;
  photo: Photo;
  email: string;
  phone: string;
  website: string;
  headline: string;
  birthdate: string;
  summary: string;
  location: Location;
  profiles: Profile[];
};
