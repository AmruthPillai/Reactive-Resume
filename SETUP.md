# Reactive Resume - Local Development Setup

## Prerequisites
- Docker & Docker Compose
- Bun (recommended) or Node.js
- Git

## Quick Start

### 1. Start Required Services
```bash
# Start PostgreSQL, MinIO, and Chrome for PDF generation
docker-compose -f tools/compose/development.yml up -d
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Database
```bash
# Generate Prisma client
bun run prisma:generate

# Run database migrations (for local development)
bun run prisma:migrate:dev
```

### 4. Start Development Servers
```bash
# Start all applications (client, server, artboard)
bun run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api/v1
- **Artboard**: http://localhost:6173
- **MinIO Console**: http://localhost:9001
- **Adminer (DB)**: http://localhost:5555

## Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

Key environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PUBLIC_URL`: http://localhost:3000
- `STORAGE_URL`: http://localhost:9000/default
- `ACCESS_TOKEN_SECRET`: JWT access token secret
- `REFRESH_TOKEN_SECRET`: JWT refresh token secret

## Available Scripts

- `bun run dev` - Start development servers
- `bun run build` - Build all applications
- `bun run test` - Run test suite
- `bun run lint` - Run ESLint
- `bun run prisma:generate` - Generate Prisma client
- `bun run prisma:migrate:dev` - Run database migrations (development)
- `bun run prisma:migrate` - Deploy database migrations (production)

## Services Overview

- **PostgreSQL** (port 5432): Database
- **MinIO** (port 9000/9001): Object storage
- **Chrome** (port 8080): PDF generation
- **Adminer** (port 5555): Database management UI

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 5432, 9000, 9001, 5555, 8080 are available
2. **Database connection**: Ensure PostgreSQL is running and accessible
3. **Environment variables**: Check that `.env` file exists and has correct values

### Development Tips

- Use `bun run test` to run the comprehensive test suite
- Use `bun run lint` to check code quality
- Check `docs/ARCHITECTURE.md` for detailed system documentation
- All libraries have their own README files in the `libs/` directory

Happy coding! 🚀
