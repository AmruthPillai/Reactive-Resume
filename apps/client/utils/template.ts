import { ListItem, Location, PhotoFilters } from '@reactive-resume/schema';
import clsx from 'clsx';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';

export type PageProps = {
  page: number;
};

export const formatLocation = (location: Location): string => {
  const locationArr = [location.address, location.city, location.region, location.postalCode, location.country];
  const filteredLocationArr = locationArr.filter((x) => !isEmpty(x));

  return filteredLocationArr.join(', ');
};

export const addHttp = (url: string) => {
  if (url.search(/^http[s]?:\/\//) == -1) {
    url = 'http://' + url;
  }

  return url;
};

export const isValidUrl = (string: string): boolean => {
  let url: URL;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

type Separator = ', ' | ' / ' | ' | ';

export const parseListItemPath = (item: ListItem, path: string | string[], separator: Separator = ', '): string => {
  if (isArray(path)) {
    const value = path.map((_path) => get(item, _path));

    return value.join(separator);
  } else {
    const value = get(item, path);

    return value;
  }
};

export const getPhotoClassNames = (filters: PhotoFilters) =>
  clsx({
    'object-cover': true,
    grayscale: filters.grayscale,
    '!border-[4px] !border-solid': filters.border,
    'rounded-lg': filters.shape === 'rounded-square',
    'rounded-full': filters.shape === 'circle',
  });
