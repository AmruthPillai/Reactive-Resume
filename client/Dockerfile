FROM node:lts-alpine AS base

WORKDIR /app
RUN apk add --no-cache g++ git curl make python3 \
  && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

FROM base as dependencies

COPY package.json pnpm-*.yaml turbo.json ./
COPY ./schema/package.json ./schema/package.json
COPY ./client/package.json ./client/package.json

RUN pnpm install --frozen-lockfile

FROM base as builder

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/schema/node_modules ./schema/node_modules
COPY --from=dependencies /app/client/node_modules ./client/node_modules

RUN pnpm run build --filter client

FROM base as production

COPY --from=builder /app/package.json /app/pnpm-*.yaml /app/turbo.json ./
COPY --from=builder /app/client/package.json ./client/package.json

RUN pnpm install --filter client --prod --frozen-lockfile --workspace-root

COPY --from=builder /app/client/.next ./client/.next
COPY --from=builder /app/client/public ./client/public
COPY --from=builder /app/client/next.config.js ./client/next.config.js
COPY --from=builder /app/client/next-i18next.config.js ./client/next-i18next.config.js

EXPOSE 3000

ENV PORT 3000

HEALTHCHECK --interval=30s --timeout=20s --retries=3 --start-period=15s \
    CMD curl -fSs 127.0.0.1:3000 || exit 1

CMD [ "pnpm", "run", "start", "--filter", "client" ]