# --- Base Image ---
FROM node:bullseye-slim AS base
WORKDIR /app

ARG NX_CLOUD_ACCESS_TOKEN

# --- Build Image ---
FROM base AS build

ENV NX_CLOUD_ACCESS_TOKEN=$NX_CLOUD_ACCESS_TOKEN

COPY .npmrc package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

# --- Release Image ---
FROM base AS release

RUN apt update && apt install -y dumb-init --no-install-recommends

COPY --chown=node:node --from=build /app/.npmrc /app/package.json /app/package-lock.json ./
RUN npm ci --production && npm cache clean --force

# Copy Build Output
COPY --chown=node:node --from=build /app/dist ./dist
# Copy Prisma Generated Client
COPY --chown=node:node --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client
# Copy Prisma Schema & Migrations
COPY --chown=node:node --from=build /app/tools/prisma ./tools/prisma

CMD [ "dumb-init", "node", "dist/apps/server/main" ]
