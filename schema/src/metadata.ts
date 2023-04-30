import { z } from 'zod';

export const CustomCSSSchema = z.object({
  value: z.string(),
  visible: z.boolean()
});
export type CustomCSS = z.infer<typeof CustomCSSSchema>;

export const PageConfigSchema = z.object({
  format: z.enum(['A4', 'Letter'])
});
export type PageConfig = z.infer<typeof PageConfigSchema>;

export const ThemeConfigSchema = z.object({
  text: z.string(),
  primary: z.string(),
  background: z.string()
});
export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;

export const TypeCategorySchema = z.enum(['heading', 'body']);
export type TypeCategory = z.infer<typeof TypeCategorySchema>;
export const TypePropertySchema = z.enum(['family', 'size'])
export type TypeProperty = z.infer<typeof TypePropertySchema>;

export const TypographySchema = z.object({
  family: z.record(TypeCategorySchema, z.string()),
  size: z.record(TypeCategorySchema, z.number())
});
export type Typography = z.infer<typeof TypographySchema>;

export const DateConfigSchema = z.object({
  format: z.string()
});
export type DateConfig = z.infer<typeof DateConfigSchema>;

export const MetadataSchema = z.object({
  css: CustomCSSSchema,
  locale: z.string(),
  date: DateConfigSchema,
  layout: z.array(z.array(z.array(z.string()))), // page.column.section
  template: z.string(),
  theme: ThemeConfigSchema,
  page: PageConfigSchema.optional(),
  typography: TypographySchema
});
export type Metadata = z.infer<typeof MetadataSchema>;
