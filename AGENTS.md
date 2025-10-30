# Repository Guidelines

## Project Structure & Module Organization
- Nx monorepo managed with pnpm.
- apps/server – NestJS API (Prisma, auth, REST/OpenAPI).
- apps/client – React + Vite web app.
- apps/artboard – Rendering/preview app for resume templates.
- libs/* – Shared code: ui, utils, hooks, parser, dto, schema.
- tools/prisma – Prisma schema and migrations. tools/compose – Docker compose presets.

## Build, Test, and Development Commands
- Install: `pnpm install`
- Dev all apps: `pnpm dev` (runs Nx serve targets)
- Dev single app: `pnpm nx serve client` | `pnpm nx serve server` | `pnpm nx serve artboard`
- Build all: `pnpm build` • Build one: `pnpm nx build <project>`
- Start (prod server after build): `pnpm start`
- Lint/format: `pnpm lint` | `pnpm lint:fix` | `pnpm format` | `pnpm format:fix`
- Tests (Nx): `pnpm nx test server` (Jest), `pnpm nx test client` (Vitest)
- Run all tests: `pnpm nx run-many -t test` • Vitest only: `pnpm test`
- Database: `pnpm prisma:generate` • Dev migrations: `pnpm prisma:migrate:dev`
- i18n: `pnpm messages:extract`

## Coding Style & Naming Conventions
- TypeScript-first. Prefer type-only imports; enable `import type` when possible.
- Prettier (printWidth 100, Tailwind plugin). Use `pnpm format:fix` before commits.
- ESLint enforces: sorted imports, no unused imports, no console, Nx boundaries.
- Filenames: kebab-case (e.g., `resume-editor.tsx`). React components export in PascalCase.

## Testing Guidelines
- Frontend/libs: Vitest (`*.test.tsx?/ts`) near source or under `tests/` (e.g., `libs/utils/src/namespaces/tests/string.test.ts`).
- Server: Jest via Nx. Coverage config available via `--configuration=ci` (e.g., `pnpm nx test server --configuration=ci`).
- Prefer unit tests per lib; use integration tests in app layers.

## Commit & Pull Request Guidelines
- Use clear, conventional messages when possible: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- PRs must include: concise description, linked issue (if any), screenshots/GIFs for UI, and passing checks (`pnpm lint`, `pnpm nx run-many -t test,build`).

## Security & Configuration Tips
- Copy `.env.example` to `.env` and set secrets (DB, mail, OAuth). For local services, `docker compose -f compose.dev.yml up -d` or see `tools/compose/*`.
- Never commit secrets. Prefer environment variables over hard-coded config.

