# --- Base Image ---
FROM node:bullseye-slim AS base
WORKDIR /app

ARG NX_CLOUD_ACCESS_TOKEN

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN apt update && apt install -y build-essential --no-install-recommends

# --- Build Image ---
FROM base AS build

ENV PUPPETEER_SKIP_DOWNLOAD true
ENV NX_CLOUD_ACCESS_TOKEN=$NX_CLOUD_ACCESS_TOKEN

COPY .npmrc package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate

RUN pnpm build

# --- Release Image ---
FROM base AS release

RUN apt update && apt install -y dumb-init --no-install-recommends

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/.npmrc /app/package.json /app/pnpm-lock.yaml ./

ENV PUPPETEER_SKIP_DOWNLOAD true

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm add --global husky
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Copy Prisma Generated Client
COPY --chown=node:node --from=build ./app/node_modules/.pnpm/@prisma+client* ./node_modules/.pnpm/
COPY --chown=node:node --from=build ./app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copy Prisma Schema & Migrations
COPY --chown=node:node --from=build ./app/tools/prisma ./tools/prisma

ENV NODE_ENV production

CMD [ "dumb-init", "pnpm", "start" ]
