import { z } from "zod";

import { metadataSchema } from ".";

// Layout Types
export const portfolioLayoutTypeSchema = z.enum(["stack", "grid", "masonry", "fullwidth"]);
export type PortfolioLayoutType = z.infer<typeof portfolioLayoutTypeSchema>;

// Portfolio Layout Config
export const portfolioLayoutConfigSchema = z.object({
  columns: z.number().min(1).max(4).default(3),
  spacing: z.number().min(0).max(32).default(16),
  maxWidth: z.string().default("1200px"),
});

export const portfolioNavigationSchema = z.object({
  style: z.enum(["fixed", "sticky", "floating"]).default("fixed"),
  transparent: z.boolean().default(false),
  showOnScroll: z.boolean().default(true),
});

// Portfolio Layout
export const portfolioLayoutSchema = z.object({
  type: portfolioLayoutTypeSchema.default("stack"),
  sections: z.array(z.string()),
  config: portfolioLayoutConfigSchema,
});

// Portfolio Metadata Schema
export const portfolioMetaSchema = z.object({
  template: z.string().default("minimal"),
  layout: portfolioLayoutSchema,
  css: z.object({
    value: z.string().default(""),
    visible: z.boolean().default(false),
  }),
  theme: z.object({
    background: z.string().default("#ffffff"),
    text: z.string().default("#000000"),
    primary: z.string().default("#0066cc"),
  }),
  typography: z.object({
    font: z.object({
      family: z.string().default("Inter"),
      subset: z.string().default("latin"),
      variants: z.array(z.string()).default(["regular"]),
      size: z.number().default(16),
    }),
    lineHeight: z.number().default(1.6),
    hideIcons: z.boolean().default(false),
    underlineLinks: z.boolean().default(true),
  }),
  page: z.object({
    margin: z.number().default(18),
    format: z.enum(["a4", "letter"]).default("a4"),
    options: z.object({
      breakLine: z.boolean().default(true),
      pageNumbers: z.boolean().default(false),
    }),
  }),
  notes: z.string().default(""),
});

// Portfolio specific metadata
export const portfolioMetadataSchema = metadataSchema.extend({
  layout: portfolioLayoutSchema,
  navigation: portfolioNavigationSchema,
});

// Types
export type PortfolioMetadata = z.infer<typeof portfolioMetadataSchema>;
export type PortfolioLayoutConfig = z.infer<typeof portfolioLayoutConfigSchema>;
export type PortfolioLayout = z.infer<typeof portfolioLayoutSchema>;
export type PortfolioNavigation = z.infer<typeof portfolioNavigationSchema>;

// Default Portfolio Metadata
export const defaultPortfolioMetadata: PortfolioMetadata = {
  template: "minimal",
  navigation: {
    style: "fixed",
    transparent: true,
    showOnScroll: true,
  },
  layout: {
    type: "stack",
    sections: [],
    config: {
      columns: 3,
      spacing: 16,
      maxWidth: "1200px",
    },
  },
  css: {
    value: "",
    visible: false,
  },
  theme: {
    background: "#ffffff",
    text: "#000000",
    primary: "#0066cc",
  },
  typography: {
    font: {
      family: "Inter",
      subset: "latin",
      variants: ["regular"],
      size: 16,
    },
    lineHeight: 1.6,
    hideIcons: false,
    underlineLinks: true,
  },
  page: {
    margin: 18,
    format: "a4",
    options: {
      breakLine: true,
      pageNumbers: false,
    },
  },
  notes: "",
};
