FROM mcr.microsoft.com/playwright:focal AS build

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM mcr.microsoft.com/playwright:focal AS deploy

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --from=build /app/dist ./dist

# Expose App
EXPOSE 3000

CMD [ "pnpm", "start" ]