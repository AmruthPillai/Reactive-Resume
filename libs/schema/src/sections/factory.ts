import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

/**
 * Creates a standardized section schema with common fields and validation.
 * Reduces duplication across section schemas by providing a consistent base structure.
 *
 * @param fields - Additional fields specific to this section type
 * @param requiredField - Optional field that should be required (adds min(1) validation)
 * @returns A complete section schema with common fields plus the provided fields
 *
 * @example
 * ```typescript
 * const experienceSchema = createSectionSchema(
 *   {
 *     company: z.string(),
 *     position: z.string(),
 *     location: z.string(),
 *   },
 *   "company" // Make company required
 * );
 * ```
 */
export function createSectionSchema<T extends string>(
  fields: Record<T, z.ZodTypeAny>,
  requiredField?: T,
) {
  // Create base fields that all sections share
  const baseFields = {
    // Common fields present in all section items
    date: z.string(),
    summary: z.string(),
    url: urlSchema,

    // Spread additional fields specific to this section
    ...fields,
  };

  // If a required field is specified, make it required with min(1) validation
  if (requiredField && baseFields[requiredField]) {
    baseFields[requiredField] = baseFields[requiredField].min(1);
  }

  // Create the schema by extending itemSchema with all fields
  return itemSchema.extend(baseFields);
}

/**
 * Creates default values for a section schema.
 * Provides consistent defaults for common fields while allowing customization.
 *
 * @param defaults - Default values for section-specific fields
 * @returns Complete default object including common field defaults
 *
 * @example
 * ```typescript
 * const defaultExperience = createSectionDefaults({
 *   company: "",
 *   position: "",
 *   location: "",
 * });
 * ```
 */
export function createSectionDefaults<T extends Record<string, unknown>>(
  defaults: T,
) {
  return {
    ...defaultItem,
    date: "",
    summary: "",
    url: defaultUrl,
    ...defaults,
  };
}
