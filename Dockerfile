ARG NX_CLOUD_ACCESS_TOKEN
ARG NX_PUBLIC_JOB_TABLE
ARG NX_PUBLIC_JOB_VIEW_1
ARG NX_PUBLIC_NOCODB_TOKEN
ARG NX_PUBLIC_TECH_STACK_TABLE
ARG NX_PUBLIC_TECH_STACK_VIEW_1

# --- Base Image ---
FROM node:lts-bullseye-slim AS base
ARG NX_CLOUD_ACCESS_TOKEN
ARG NX_PUBLIC_JOB_TABLE
ARG NX_PUBLIC_JOB_VIEW_1
ARG NX_PUBLIC_NOCODB_TOKEN
ARG NX_PUBLIC_TECH_STACK_TABLE
ARG NX_PUBLIC_TECH_STACK_VIEW_1

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm && corepack prepare pnpm --activate

WORKDIR /app

# --- Build Image ---
FROM base AS build
ARG NX_CLOUD_ACCESS_TOKEN
ARG NX_PUBLIC_JOB_TABLE
ARG NX_PUBLIC_JOB_VIEW_1
ARG NX_PUBLIC_NOCODB_TOKEN
ARG NX_PUBLIC_TECH_STACK_TABLE
ARG NX_PUBLIC_TECH_STACK_VIEW_1

COPY .npmrc package.json pnpm-lock.yaml ./
COPY ./tools/prisma /app/tools/prisma
RUN pnpm install --frozen-lockfile

COPY . .

ENV NX_CLOUD_ACCESS_TOKEN=$INIT_CWD
ENV NX_PUBLIC_JOB_TABLE $NX_PUBLIC_JOB_TABLE
ENV NX_PUBLIC_JOB_VIEW_1 $NX_PUBLIC_JOB_VIEW_1
ENV NX_PUBLIC_NOCODB_TOKEN $NX_PUBLIC_NOCODB_TOKEN
ENV NX_PUBLIC_TECH_STACK_TABLE $NX_PUBLIC_TECH_STACK_TABLE
ENV NX_PUBLIC_TECH_STACK_VIEW_1 $NX_PUBLIC_TECH_STACK_VIEW_1

RUN pnpm run build

# --- Release Image ---
FROM base AS release
ARG NX_CLOUD_ACCESS_TOKEN
ARG NX_PUBLIC_JOB_TABLE
ARG NX_PUBLIC_JOB_VIEW_1
ARG NX_PUBLIC_NOCODB_TOKEN
ARG NX_PUBLIC_TECH_STACK_TABLE
ARG NX_PUBLIC_TECH_STACK_VIEW_1

RUN apt update && apt install -y dumb-init --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node --from=build /app/.npmrc /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/tools/prisma ./tools/prisma
RUN pnpm run prisma:generate

ENV TZ=UTC
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD [ "dumb-init", "pnpm", "run", "start" ]
