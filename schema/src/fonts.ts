export enum FontCategory {
  'display' = 'display',
  'handwriting' = 'handwriting',
  'monospace' = 'monospace',
  'sans-serif' = 'sans-serif',
  'serif' = 'serif',
}

export type Font = {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: FontCategory;
  kind: string;
};
