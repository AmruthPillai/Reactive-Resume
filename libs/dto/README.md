# DTO Library

This library contains Data Transfer Objects (DTOs) that define the API interfaces between the client and server in Reactive Resume.

## Overview

The DTO library provides type-safe interfaces for all API communications using [nestjs-zod](https://github.com/EndyKaufman/nestjs-zod) and Zod schemas. It includes DTOs for:

- **Auth**: Authentication and authorization
- **Resume**: Resume CRUD operations
- **User**: User management
- **Feature**: Feature flags
- **Statistics**: Usage analytics

## Key Concepts

### DTO Generation

DTOs are automatically generated from Zod schemas using nestjs-zod:

```typescript
import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

// Define schema
export const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

// Generate DTO class
export class LoginDto extends createZodDto(loginSchema) {}
```

### Validation Pipeline

DTOs automatically validate incoming requests:

```typescript
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // loginDto is guaranteed to be valid
  return this.authService.authenticate(loginDto);
}
```

### Error Handling

Invalid requests return detailed validation errors:

```json
{
  "statusCode": 400,
  "message": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "inclusive": true,
      "exact": false,
      "message": "String must contain at least 1 character(s)",
      "path": ["email"]
    }
  ],
  "error": "Bad Request"
}
```

## Usage

### Client Side

```typescript
import type { LoginDto, UserDto } from '@reactive-resume/dto';

// Use DTOs for type safety
const loginData: LoginDto = {
  identifier: 'user@example.com',
  password: 'password123'
};
```

### Server Side

```typescript
import { LoginDto, UserDto } from '@reactive-resume/dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserDto> {
    return this.authService.authenticate(loginDto);
  }
}
```

## DTO Categories

### Auth DTOs

- `LoginDto` - User authentication
- `RegisterDto` - User registration
- `ForgotPasswordDto` - Password reset initiation
- `ResetPasswordDto` - Password reset completion
- `UpdatePasswordDto` - Password change

### Resume DTOs

- `CreateResumeDto` - New resume creation
- `UpdateResumeDto` - Resume modifications
- `ImportResumeDto` - Resume import from external sources
- `ResumeDto` - Complete resume data

### User DTOs

- `UserDto` - User profile information
- `UpdateUserDto` - User profile updates

## Best Practices

### Schema Design

- Keep DTOs focused on single responsibilities
- Use descriptive field names
- Include validation rules appropriate for the context
- Document optional vs required fields

### Error Messages

- Provide clear, actionable error messages
- Use consistent error codes across similar DTOs
- Consider i18n for user-facing error messages

### Versioning

- DTO changes may break API compatibility
- Consider API versioning when making breaking changes
- Document breaking changes in release notes

## Migration Guide

When adding new DTOs or modifying existing ones:

1. **Update the schema** with new validation rules
2. **Regenerate DTO classes** from updated schemas
3. **Update API endpoints** to use new DTOs
4. **Update client code** to match new interfaces
5. **Add tests** for new validation scenarios
6. **Update documentation** with new fields/parameters
