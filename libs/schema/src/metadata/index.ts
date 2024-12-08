import { z } from "zod";

export const defaultLayout = [
  [
    ["profiles", "summary", "experience", "education", "projects", "volunteer", "references"],
    ["skills", "interests", "certifications", "awards", "publications", "languages"],
  ],
];
export type PortfolioLayoutType = 'stack' | 'grid' | 'masonry' | 'fullwidth';


// Define the layout types
export const portfolioLayoutConfigSchema = z.object({
  spacing: z.number().default(4),
  columns: z.number().min(1).max(4).default(1),
  maxWidth: z.string().default('1200px'),
});

export const portfolioNavigationSchema = z.object({
  style: z.enum(['fixed', 'sticky', 'floating']).default('fixed'),
  transparent: z.boolean().default(false),
  showOnScroll: z.boolean().default(true),
});
export const portfolioLayoutSchema = z.object({
  type: z.enum(['stack', 'grid', 'masonry', 'fullwidth']).default('stack'),
  sections: z.array(z.string()),
  config: portfolioLayoutConfigSchema,
});
// Schema
export const metadataSchema = z.object({
  template: z.string().default("rhyhorn"),
  layout: z.array(z.array(z.array(z.string()))).default(defaultLayout), // pages -> columns -> sections
  css: z.object({
    value: z.string().default(".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}"),
    visible: z.boolean().default(false),
  }),
  page: z.object({
    margin: z.number().default(18),
    format: z.enum(["a4", "letter"]).default("a4"),
    options: z.object({
      breakLine: z.boolean().default(true),
      pageNumbers: z.boolean().default(true),
    }),
  }),
  theme: z.object({
    background: z.string().default("#ffffff"),
    text: z.string().default("#000000"),
    primary: z.string().default("#dc2626"),
  }),
  typography: z.object({
    font: z.object({
      family: z.string().default("IBM Plex Serif"),
      subset: z.string().default("latin"),
      variants: z.array(z.string()).default(["regular"]),
      size: z.number().default(14),
    }),
    lineHeight: z.number().default(1.5),
    hideIcons: z.boolean().default(false),
    underlineLinks: z.boolean().default(true),
  }),
  notes: z.string().default(""),
});

// Type
export type Metadata = z.infer<typeof metadataSchema>;

// Defaults
export const defaultMetadata: Metadata = {
  template: "rhyhorn",
  layout: defaultLayout,
  css: {
    value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
    visible: false,
  },
  page: {
    margin: 18,
    format: "a4",
    options: {
      breakLine: true,
      pageNumbers: true,
    },
  },
  theme: {
    background: "#ffffff",
    text: "#000000",
    primary: "#dc2626",
  },
  typography: {
    font: {
      family: "IBM Plex Serif",
      subset: "latin",
      variants: ["regular", "italic", "600"],
      size: 14,
    },
    lineHeight: 1.5,
    hideIcons: false,
    underlineLinks: true,
  },
  notes: "",
};


// Extend the existing metadata schema for portfolios


// Portfolio specific metadata
export const portfolioMetadataSchema = metadataSchema.extend({
  layout: portfolioLayoutSchema,
  navigation: portfolioNavigationSchema,
});

// Export types
export type PortfolioLayoutConfig = z.infer<typeof portfolioLayoutConfigSchema>;
export type PortfolioLayout = z.infer<typeof portfolioLayoutSchema>;
export type PortfolioNavigation = z.infer<typeof portfolioNavigationSchema>;
export type PortfolioMetadata = z.infer<typeof portfolioMetadataSchema>;