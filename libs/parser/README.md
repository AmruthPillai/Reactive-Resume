# Parser Library

This library provides parsers for importing resume data from external sources into Reactive Resume format.

## Overview

The parser library supports multiple resume formats and sources:

- **JSON Resume**: Standard JSON resume format
- **Reactive Resume v3**: Legacy Reactive Resume format
- **LinkedIn**: LinkedIn profile data
- **Reactive Resume**: Current Reactive Resume format

## Key Concepts

### Parser Architecture

Each parser implements a consistent interface:

```typescript
export interface Parser<T = unknown> {
  validate(input: T): boolean;
  parse(input: T): ResumeData;
}
```

### Supported Formats

#### JSON Resume

Standard format used by many resume builders:

```json
{
  "basics": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "work": [
    {
      "company": "Acme Corp",
      "position": "Developer"
    }
  ]
}
```

#### LinkedIn Data

Parsed from LinkedIn profile exports:

```typescript
const linkedinData = {
  profile: { /* LinkedIn profile data */ },
  experience: [ /* work experience */ ],
  education: [ /* education history */ ]
};
```

#### Reactive Resume v3

Legacy format from older versions:

```typescript
const v3Data = {
  profile: { /* v3 profile structure */ },
  sections: [ /* v3 section format */ ]
};
```

## Usage

### Importing Resumes

```typescript
import { parseJsonResume, parseLinkedIn } from '@reactive-resume/parser';

// Parse JSON Resume format
const resumeData = parseJsonResume(jsonResumeInput);

// Parse LinkedIn data
const resumeData = parseLinkedIn(linkedinInput);
```

### Validation

```typescript
import { validateJsonResume } from '@reactive-resume/parser';

// Check if data is valid before parsing
if (validateJsonResume(input)) {
  const resume = parseJsonResume(input);
  // Safe to use resume data
}
```

## Parser Implementation

### Creating New Parsers

To add support for a new format:

1. **Create parser file** in appropriate directory
2. **Implement validation logic**
3. **Implement parsing logic**
4. **Add comprehensive tests**
5. **Export from main index**

```typescript
// libs/parser/src/new-format/index.ts
export function validateNewFormat(input: unknown): input is NewFormatData {
  // Validation logic
}

export function parseNewFormat(input: NewFormatData): ResumeData {
  // Parsing logic
  return {
    basics: transformBasics(input.basics),
    sections: transformSections(input.sections),
    metadata: createDefaultMetadata()
  };
}
```

### Data Transformation

Parsers transform external formats to Reactive Resume schema:

```typescript
function transformExperience(experience: ExternalExperience[]): Experience[] {
  return experience.map(exp => ({
    id: createId(),
    visible: true,
    company: exp.companyName,
    position: exp.jobTitle,
    location: exp.location,
    date: formatDateRange(exp.startDate, exp.endDate),
    summary: exp.description || '',
    url: { href: exp.companyWebsite || '', label: '' }
  }));
}
```

## Best Practices

### Error Handling

Parsers should handle malformed input gracefully:

```typescript
export function parseJsonResume(input: unknown): ResumeData {
  if (!validateJsonResume(input)) {
    throw new Error('Invalid JSON Resume format');
  }

  try {
    // Parsing logic
  } catch (error) {
    throw new Error(`Failed to parse JSON Resume: ${error.message}`);
  }
}
```

### Data Sanitization

Always sanitize input data:

```typescript
import { sanitize } from '@reactive-resume/utils';

function cleanDescription(description: string): string {
  return sanitize(description, {
    allowedTags: ['p', 'br', 'strong', 'em'],
    allowedAttributes: {}
  });
}
```

### Backward Compatibility

When updating parsers:

1. **Maintain backward compatibility** for existing formats
2. **Add version detection** for format changes
3. **Provide migration utilities** if needed
4. **Document format changes**

## Testing

Parsers require comprehensive testing:

```typescript
describe('parseJsonResume', () => {
  it('parses valid JSON Resume data', () => {
    const input = { /* valid JSON Resume */ };
    const result = parseJsonResume(input);

    expect(result.basics.name).toBe('John Doe');
    expect(result.sections.experience.items).toHaveLength(2);
  });

  it('throws on invalid data', () => {
    const input = { invalid: 'data' };
    expect(() => parseJsonResume(input)).toThrow();
  });
});
```

## Supported File Formats

- **JSON Resume**: `.json` files
- **LinkedIn**: `.zip` archives with profile data
- **Reactive Resume v3**: `.json` files
- **Reactive Resume**: `.json` files (current format)

## Migration Guide

When adding new parsers or updating existing ones:

1. **Test against real data** from the source format
2. **Handle edge cases** and malformed input
3. **Document format requirements** in README
4. **Add integration tests** with sample data
5. **Update import UI** to support new formats
