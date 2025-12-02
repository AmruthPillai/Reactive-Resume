# Reactive Resume Architecture

## Overview

Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing resumes. The application follows a modern monorepo architecture using Nx, with separate applications for the client, server, and artboard renderer.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   API Server    │    │  Artboard       │
│   (React)       │◄──►│   (NestJS)      │    │  Renderer       │
│                 │    │                 │    │  (React)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Database      │
                    │   (PostgreSQL)  │
                    └─────────────────┘
```

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand, React Router
- **Backend**: NestJS, TypeScript, Prisma ORM, JWT Authentication
- **Database**: PostgreSQL with Prisma migrations
- **Storage**: MinIO (S3-compatible object storage)
- **PDF Generation**: Puppeteer with headless Chrome
- **Build System**: Nx monorepo with Vite
- **Package Manager**: Bun
- **Testing**: Vitest, Jest (server)

## Application Structure

### Monorepo Layout

```
reactive-resume/
├── apps/
│   ├── client/          # React SPA
│   ├── server/          # NestJS API server
│   └── artboard/        # Resume template renderer
├── libs/                # Shared libraries
│   ├── schema/          # Zod validation schemas
│   ├── dto/             # Data transfer objects
│   ├── utils/           # Utility functions
│   ├── parser/          # Import/export parsers
│   ├── ui/              # Shared UI components
│   └── hooks/           # Custom React hooks
├── tools/               # Development tools
│   ├── prisma/          # Database schema & migrations
│   └── compose/         # Docker Compose configurations
└── docs/                # Documentation
```

## Core Libraries

### Schema Library (`libs/schema`)

Centralized Zod schemas for data validation:

- **Basics**: Personal information, contact details, photo
- **Sections**: Resume sections (experience, education, skills, etc.)
- **Metadata**: Layout, theme, typography settings
- **Factory Pattern**: Reusable schema generators for sections

### DTO Library (`libs/dto`)

NestJS-compatible data transfer objects:

- **Auth**: Login, register, password reset DTOs
- **Resume**: Create, update, import/export DTOs
- **User**: User management DTOs
- **Validation**: Zod integration with NestJS

### Utils Library (`libs/utils`)

Utility functions organized by namespace:

- **Array**: Array manipulation helpers
- **Date**: Date parsing and formatting
- **Object**: Deep object operations
- **String**: String processing utilities
- **Error**: Centralized error messages enum

### Parser Library (`libs/parser`)

Import/export functionality:

- **JSON Resume**: Standard JSON Resume format support
- **LinkedIn**: LinkedIn data export parsing
- **Reactive Resume V3**: Legacy format migration

## Applications

### Client Application (`apps/client`)

**Framework**: React 18 with TypeScript
**State Management**: Zustand with immer and zundo middleware
**Routing**: React Router v6
**UI**: Tailwind CSS with custom component library

#### Key Features:
- **Resume Builder**: Drag-and-drop interface for resume creation
- **Template System**: 12+ customizable templates
- **Import/Export**: Multiple format support
- **Authentication**: OAuth integration (GitHub, Google, OpenID)
- **Real-time Preview**: Live resume rendering

#### State Architecture:
```
Zustand Store
├── resume: ResumeData        # Main resume data
├── metadata: Metadata        # Layout, theme, settings
├── auth: AuthState          # User authentication
└── ui: UIState              # Interface state
```

### Server Application (`apps/server`)

**Framework**: NestJS with TypeScript
**Database**: Prisma ORM with PostgreSQL
**Authentication**: JWT with refresh tokens
**Storage**: MinIO S3-compatible storage
**PDF Generation**: Puppeteer with Browserless

#### API Structure:
```
/api/v1/
├── auth/           # Authentication endpoints
├── user/           # User management
├── resume/         # Resume CRUD operations
├── storage/        # File upload/download
├── printer/        # PDF generation
└── health/         # System health checks
```

#### Service Architecture:
```
AuthService (Facade)
├── AuthenticationService    # Login validation
├── RegistrationService      # User registration
├── PasswordService          # Password management
├── EmailVerificationService # Email verification
├── TwoFactorService         # 2FA management
├── TokenService             # JWT operations
└── OAuthProvidersService    # OAuth configuration
```

### Artboard Application (`apps/artboard`)

**Framework**: React with TypeScript
**Purpose**: Server-side resume rendering for PDF generation
**Templates**: Shared template components with client

## Data Flow

### Resume Creation Flow

1. **Client**: User creates resume via drag-and-drop interface
2. **Validation**: Data validated using Zod schemas
3. **Storage**: Resume data stored in PostgreSQL
4. **Preview**: Artboard renders preview using shared templates
5. **Export**: PDF generated using Puppeteer and MinIO storage

### Authentication Flow

1. **Login**: Client sends credentials to `/api/v1/auth/login`
2. **Validation**: Server validates credentials against database
3. **Tokens**: JWT access/refresh tokens generated
4. **Response**: Tokens returned with user data
5. **Refresh**: Automatic token refresh on expiration

## Database Schema

### Core Tables

```sql
-- Users with authentication
users (
  id: String (CUID)
  email: String (unique)
  username: String (unique)
  name: String
  locale: String
  provider: Provider (email/github/google/openid)
  emailVerified: Boolean
  createdAt: DateTime
  updatedAt: DateTime
)

-- User secrets (encrypted)
secrets (
  userId: String (FK → users.id)
  password: String (bcrypt hash)
  refreshToken: String?
  resetToken: String?
  verificationToken: String?
  twoFactorSecret: String?
  twoFactorBackupCodes: String[]?
  lastSignedIn: DateTime?
)

-- Resume data
resumes (
  id: String (CUID)
  userId: String (FK → users.id)
  title: String
  slug: String (unique per user)
  visibility: Visibility (public/private)
  data: Json (validated ResumeData)
  locked: Boolean
  createdAt: DateTime
  updatedAt: DateTime
)

-- Analytics
statistics (
  resumeId: String (FK → resumes.id)
  views: Int
  downloads: Int
)
```

## Storage Architecture

### MinIO Object Storage

```
bucket/
├── {userId}/
│   ├── pictures/     # Profile pictures (JPEG)
│   ├── previews/     # Resume previews (JPEG)
│   └── resumes/      # PDF exports
```

### File Naming Convention

- **Images**: `{userId}/pictures/{filename}.jpg`
- **Previews**: `{userId}/previews/{resumeId}.jpg`
- **PDFs**: `{userId}/resumes/{resumeId}.pdf`

## Deployment Architecture

### Development Environment

```yaml
# Docker Compose (development)
services:
  postgres:    # Database
  minio:       # Object storage
  chrome:      # PDF generation
  redis:       # Caching (optional)
  app:         # Application server
```

### Production Environment

```
Load Balancer (nginx/traefik)
├── API Server (NestJS)
├── Client SPA (static files)
├── MinIO (storage)
└── PostgreSQL (database)
```

### Environment Variables

**Required**:
- `DATABASE_URL`: PostgreSQL connection string
- `ACCESS_TOKEN_SECRET`: JWT access token secret
- `REFRESH_TOKEN_SECRET`: JWT refresh token secret
- `STORAGE_*`: MinIO configuration

**Optional**:
- `GITHUB_CLIENT_ID`: OAuth GitHub integration
- `GOOGLE_CLIENT_ID`: OAuth Google integration
- `SMTP_*`: Email configuration

## Security Considerations

### Authentication
- JWT tokens with short expiration (15 minutes)
- Refresh tokens for session management
- Two-factor authentication support
- OAuth integration with multiple providers

### Data Protection
- Passwords hashed with bcrypt (salt rounds: 10)
- Sensitive data encrypted at rest
- HTTPS required in production
- CORS configuration for API access

### API Security
- Input validation with Zod schemas
- Rate limiting (recommended)
- SQL injection prevention via Prisma ORM
- XSS protection with content sanitization

## Performance Optimizations

### Frontend
- Code splitting with dynamic imports
- Image optimization and lazy loading
- Zustand for efficient state management
- React.memo for component optimization

### Backend
- Database query optimization with Prisma
- Redis caching for frequently accessed data
- PDF generation with headless Chrome
- File storage with CDN delivery

### Database
- Indexed queries for common operations
- Connection pooling with Prisma
- Migration system for schema updates
- Soft deletes for data integrity

## Development Workflow

### Local Development
1. Clone repository
2. Install dependencies: `bun install`
3. Start database: `docker-compose up -d`
4. Generate Prisma client: `bun run prisma:generate`
5. Run migrations: `bun run prisma:migrate`
6. Start development servers: `bun run dev`

### Testing Strategy
- **Unit Tests**: Individual functions and services
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Full user workflows (planned)

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Conventional commits for versioning

## Future Enhancements

### Planned Features
- Real-time collaboration
- Advanced template customization
- AI-powered resume suggestions
- Mobile application
- Advanced analytics dashboard

### Scalability Improvements
- Microservices architecture
- GraphQL API
- Redis caching layer
- CDN integration
- Horizontal scaling support
