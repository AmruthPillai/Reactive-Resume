import clsx, { ClassValue } from 'clsx';
import { RgbColor } from 'react-colorful';
import { ThemeConfig, Typography } from 'schema';
import { twMerge } from 'tailwind-merge';

import { hexColorPattern } from '@/config/colors';

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateTypographyStyles = ({ family, size }: Typography): string => `
  font-size: ${size.body}px !important;
  font-family: ${family.body} !important;

  p, li, svg { font-size: ${size.body}px !important; line-height: ${size.body * 1.5}px !important; }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold !important;
    font-family: ${family.heading} !important;
  }

  h1 { font-size: ${size.heading}px !important; line-height: ${size.heading}px !important; }
  h2 { font-size: ${size.heading / 1.5}px !important; line-height: ${size.heading / 1.5}px !important; }
  h3 { font-size: ${size.heading / 2}px !important; line-height: ${size.heading / 2}px !important; }
  h4 { font-size: ${size.heading / 2.5}px !important; line-height: ${size.heading / 2.5}px !important; }
  h5 { font-size: ${size.heading / 3}px !important; line-height: ${size.heading / 3}px !important; }
  h6 { font-size: ${size.heading / 3.5}px !important; line-height: ${size.heading / 3.5}px !important; }
`;

export const generateThemeStyles = ({ text, background, primary }: ThemeConfig): string => `
  --text-color: ${text} !important;
  --primary-color: ${primary} !important;
  --background-color: ${background} !important;

  color: var(--text-color);
  background-color: var(--background-color);

  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  p,
  a {
    color: var(--text-color);
  }

  svg {
    color: var(--primary-color);
  }
`;

export const hexToRgb = (hex: string): RgbColor | null => {
  const result = hexColorPattern.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getContrastColor = (color: string): 'dark' | 'light' => {
  const rgb = hexToRgb(color);

  if (rgb) {
    const { r, g, b } = rgb;

    if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  return 'light';
};
