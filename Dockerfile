# --- Base Image ---
FROM node:bullseye-slim AS base
WORKDIR /app

ARG NX_CLOUD_ACCESS_TOKEN

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# --- Build Image ---
FROM base AS build

ENV NX_CLOUD_ACCESS_TOKEN=$NX_CLOUD_ACCESS_TOKEN

COPY .npmrc package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# --- Release Image ---
FROM base AS release

RUN apt update && apt install -y dumb-init --no-install-recommends

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/.npmrc /app/package.json /app/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Copy Prisma Generated Client
COPY --chown=node:node --from=build /app/node_modules/.prisma ./node_modules/

# Copy Prisma Schema & Migrations
COPY --chown=node:node --from=build /app/tools/prisma ./tools/prisma

CMD [ "dumb-init", "pnpm", "start" ]
