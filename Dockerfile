FROM node AS build

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM mcr.microsoft.com/playwright:focal AS deploy

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/dist ./dist

RUN pnpm install --frozen-lockfile --prod

# Expose App
EXPOSE 3000

# Export Server
EXPOSE 3100

CMD [ "pnpm", "start" ]