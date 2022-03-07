FROM node:16-alpine as dependencies

RUN apk add --no-cache g++ curl make python3 \
  && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY package.json pnpm-*.yaml ./
COPY ./schema/package.json ./schema/package.json
COPY ./server/package.json ./server/package.json

RUN pnpm install --frozen-lockfile

FROM node:16-alpine as builder

RUN apk add --no-cache g++ curl make python3 \
  && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/schema/node_modules ./schema/node_modules
COPY --from=dependencies /app/server/node_modules ./server/node_modules

RUN cp .env ./server/.env

RUN pnpm run build:schema
RUN pnpm run build:server

FROM mcr.microsoft.com/playwright:focal as production

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY --from=builder /app/pnpm-*.yaml .
COPY --from=builder /app/package.json .
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package.json ./server/package.json

RUN pnpm install -F server --frozen-lockfile --prod

EXPOSE 3100

CMD [ "pnpm", "run", "start:server" ]