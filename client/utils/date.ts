import { DateRange } from '@reactive-resume/schema';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import { i18n } from 'next-i18next';

export const dateFormatOptions: string[] = [
  'MMMM DD, YYYY',
  'DD MMMM YYYY',
  'DD.MM.YYYY',
  'DD/MM/YYYY',
  'MM.DD.YYYY',
  'MM/DD/YYYY',
  'YYYY.MM.DD',
  'YYYY/MM/DD',
  'MMMM YYYY',
  'MMM YYYY',
  'MM/YYYY',
  'YYYY',
];

export const getRelativeTime = (timestamp: dayjs.ConfigType): string => dayjs(timestamp).toNow(true);

export const formatDateString = (date: string | DateRange, formatStr: string): string | null => {
  const presentString = i18n?.t('common.date.present') ?? '';

  if (isEmpty(date)) return null;

  // If `date` is a string
  if (isString(date)) {
    if (!dayjs(date).isValid()) return null;

    return dayjs(date).format(formatStr);
  }

  // If `date` is a DateRange
  if (isEmpty(date.start)) return null;

  if (!dayjs(date.start).isValid()) return null;

  if (!isEmpty(date.end) && dayjs(date.end).isValid()) {
    return `${dayjs(date.start).format(formatStr)} - ${dayjs(date.end).format(formatStr)}`;
  }

  return `${dayjs(date.start).format(formatStr)} - ${presentString}`;
};
