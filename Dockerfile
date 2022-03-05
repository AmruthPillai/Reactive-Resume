FROM node AS builder

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml ./

ENV HUSKY 0

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM mcr.microsoft.com/playwright:focal AS production

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/dist ./dist

ENV HUSKY 0

RUN pnpm install --frozen-lockfile --prod

# Expose App
EXPOSE 3000

# Export Server
EXPOSE 3100

CMD [ "pnpm", "start" ]