import { Theme, Typography } from '@reactive-resume/schema';

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

export const generateThemeStyles = ({ text, background, primary }: Theme): string => `
  color: ${text};
  background-color: ${background};
  --primary-color: ${primary};

  svg {
    color: var(--primary-color);
  }
`;

export const hexToRgb = (hex: string): { red: number; green: number; blue: number } => {
  const result = hexColorPattern.exec(hex);

  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
};

export const getContrastColor = (color: string): 'dark' | 'light' => {
  const rgb = hexToRgb(color);

  if (rgb) {
    const { red, green, blue } = rgb;

    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
      return 'dark';
    } else {
      return 'light';
    }
  }
};
