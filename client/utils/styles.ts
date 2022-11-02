import { ThemeConfig, Typography } from '@reactive-resume/schema';
import { RgbColor } from 'react-colorful';

import { hexColorPattern } from '@/config/colors';

export const generateTypographyStyles = ({ family, size }: Typography): string => `
  font-size: ${size.body}px;
  font-family: ${family.body};

  svg { font-size: ${size.body}px; }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    font-family: ${family.heading};
  }

  h1 { font-size: ${size.heading}px; line-height: ${size.heading}px; }
  h2 { font-size: ${size.heading / 1.5}px; line-height: ${size.heading / 1.5}px; }
  h3 { font-size: ${size.heading / 2}px; line-height: ${size.heading / 2}px; }
  h4 { font-size: ${size.heading / 2.5}px; line-height: ${size.heading / 2.5}px; }
  h5 { font-size: ${size.heading / 3}px; line-height: ${size.heading / 3}px; }
  h6 { font-size: ${size.heading / 3.5}px; line-height: ${size.heading / 3.5}px; }
`;

export const generateThemeStyles = ({ text, background, primary }: ThemeConfig): string => `
  color: ${text};
  background-color: ${background};
  --primary-color: ${primary};

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
