FROM node AS builder

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts --frozen-lockfile

COPY . .

RUN pnpm run build

FROM playwright/chromium

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/dist ./dist

RUN pnpm install --ignore-scripts --frozen-lockfile --prod

# Expose App
EXPOSE 3000

# Export Server
EXPOSE 3100

CMD [ "pnpm", "start" ]