# Utils Library

This library provides shared utility functions and constants used throughout the Reactive Resume application.

## Overview

The utils library is organized into namespaces for different types of utilities:

- **Array**: Array manipulation functions
- **Color**: Color conversion and manipulation
- **CSV**: CSV parsing and generation
- **Date**: Date formatting and manipulation
- **Error**: Error handling and messaging
- **Fonts**: Font utilities
- **Language**: Language and locale helpers
- **Number**: Number formatting and manipulation
- **Object**: Object utilities
- **Page**: Page layout utilities
- **Promise**: Promise utilities
- **String**: String manipulation functions
- **Style**: CSS and styling utilities
- **Template**: Template utilities
- **Types**: TypeScript type utilities

## Key Concepts

### Namespace Organization

Each namespace focuses on a specific domain:

```typescript
import { generateRandomName, isUrl } from '@reactive-resume/utils/string';
import { formatDate } from '@reactive-resume/utils/date';
import { cn } from '@reactive-resume/utils/style';
```

### Utility Patterns

Utilities follow consistent patterns:

- **Pure functions** with no side effects
- **Type-safe** with proper TypeScript annotations
- **Well-tested** with comprehensive test coverage
- **Documented** with clear JSDoc comments

### Common Utilities

#### String Utilities

```typescript
import {
  generateRandomName,  // Generate random user names
  isUrl,               // URL validation
  isEmptyString,       // Check for empty/whitespace strings
  getInitials,         // Extract initials from names
  extractUrl,          // Extract URLs from text
  processUsername      // Normalize usernames
} from '@reactive-resume/utils/string';
```

#### Style Utilities

```typescript
import { cn } from '@reactive-resume/utils/style';

// Combine CSS classes with Tailwind
const className = cn(
  'base-class',
  condition && 'conditional-class',
  variantClasses[variant]
);
```

#### Date Utilities

```typescript
import { formatDate, parseDate } from '@reactive-resume/utils/date';

// Format dates consistently
const formatted = formatDate(new Date(), 'YYYY-MM-DD');
```

## Usage Guidelines

### Importing Utilities

Always import from specific namespaces to keep bundle sizes optimized:

```typescript
// ✅ Good - tree-shakable imports
import { cn } from '@reactive-resume/utils/style';
import { isUrl } from '@reactive-resume/utils/string';

// ❌ Avoid - imports entire library
import * as utils from '@reactive-resume/utils';
```

### Error Handling

Use the ErrorMessage enum for consistent error handling:

```typescript
import { ErrorMessage } from '@reactive-resume/utils';

throw new BadRequestException(ErrorMessage.InvalidCredentials);
```

### Type Safety

Utilities are fully typed and work well with TypeScript:

```typescript
import type { DeepPartial } from '@reactive-resume/utils';

// Type-safe partial object updates
const update: DeepPartial<User> = { name: 'New Name' };
```

## Best Practices

### Adding New Utilities

When adding new utilities:

1. **Choose the right namespace** or create a new one if needed
2. **Write comprehensive tests** in the corresponding test file
3. **Add JSDoc comments** with examples
4. **Consider performance** implications
5. **Follow naming conventions** (camelCase for functions)

### Namespace Creation

Create new namespaces for related functionality:

```typescript
// libs/utils/src/namespaces/validation.ts
export function isValidEmail(email: string): boolean {
  // Implementation
}

export function isValidPassword(password: string): boolean {
  // Implementation
}
```

### Testing

Each utility should have corresponding tests:

```typescript
// libs/utils/src/namespaces/tests/validation.test.ts
describe('isValidEmail', () => {
  it('validates email addresses correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
  });
});
```

## Migration Guide

When updating utilities:

1. **Ensure backward compatibility** or provide migration path
2. **Update all usages** across the codebase
3. **Update tests** and documentation
4. **Consider breaking changes** in major version bumps
5. **Document changes** in changelog
