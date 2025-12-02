# Schema Library

This library contains Zod schemas that define the structure and validation rules for resume data in Reactive Resume.

## Overview

The schema library provides type-safe validation for all resume-related data structures using [Zod](https://zod.dev/). It includes schemas for:

- **Basics**: Personal information (name, email, location, etc.)
- **Sections**: Resume sections (experience, education, skills, etc.)
- **Metadata**: Layout and display settings
- **Shared**: Common types and utilities

## Key Concepts

### Schema Organization

Schemas are organized into logical modules:

- `basics/` - Personal and contact information
- `sections/` - Resume content sections
- `metadata/` - Layout and configuration
- `shared/` - Common types and validation rules

### Validation Patterns

All schemas follow consistent patterns:

```typescript
// Schema definition
export const exampleSchema = z.object({
  id: idSchema,
  visible: z.boolean().default(true),
  // ... other fields
});

// Type inference
export type Example = z.infer<typeof exampleSchema>;

// Default values
export const defaultExample: Example = {
  id: "",
  visible: true,
  // ... other defaults
};
```

### Section Schemas

Resume sections use a standardized structure:

```typescript
// Base item schema with common fields
export const itemSchema = z.object({
  id: idSchema,
  visible: z.boolean().default(true),
});

// Extended section schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});
```

## Usage

### Importing Schemas

```typescript
import { resumeDataSchema, defaultResumeData } from '@reactive-resume/schema';
import { experienceSchema, defaultExperience } from '@reactive-resume/schema';
```

### Validation

```typescript
// Validate resume data
const result = resumeDataSchema.safeParse(inputData);
if (result.success) {
  // Data is valid
  const resume: ResumeData = result.data;
} else {
  // Handle validation errors
  console.error(result.error.issues);
}
```

### Type Safety

```typescript
import type { ResumeData, Experience } from '@reactive-resume/schema';

// TypeScript will enforce schema compliance
const resume: ResumeData = { ... };
const experience: Experience = { ... };
```

## Schema Evolution

When adding new fields or modifying existing schemas:

1. **Update the schema** with proper validation rules
2. **Update default values** to maintain backward compatibility
3. **Update type exports** if new types are added
4. **Add migration logic** if existing data needs transformation
5. **Update tests** to cover new validation rules

## Best Practices

- Always use `.default()` for optional fields with sensible defaults
- Use `.min(1)` for required string fields
- Prefer unions of literals over free-form strings when possible
- Document schema changes in PR descriptions
- Test schema changes against existing resume data
