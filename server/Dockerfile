FROM node:lts-alpine AS base

WORKDIR /app

RUN apk add --no-cache g++ git make curl python3 libc6-compat \
  && corepack enable && corepack prepare pnpm@latest --activate

FROM base AS dependencies

COPY package.json pnpm-*.yaml ./
COPY ./schema/package.json ./schema/package.json
COPY ./server/package.json ./server/package.json

RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/schema/node_modules ./schema/node_modules
COPY --from=dependencies /app/server/node_modules ./server/node_modules

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm exec turbo --filter server build

FROM mcr.microsoft.com/playwright:v1.36.2-focal as production

WORKDIR /app

RUN apt-get update \
  && apt-get install -y curl build-essential \
  && corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json /app/pnpm-*.yaml ./
COPY --from=builder /app/server/package.json ./server/package.json

RUN pnpm dlx playwright install --with-deps chromium
RUN pnpm install --filter server --prod --frozen-lockfile --workspace-root

COPY --from=builder /app/server/dist ./server/dist

VOLUME /app/server/dist/assets/exports
VOLUME /app/server/dist/assets/uploads

EXPOSE 3100

ENV PORT 3100

CMD [ "pnpm", "run", "--filter", "server", "start" ]