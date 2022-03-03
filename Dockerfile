FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 3100

CMD [ "npm", "start" ]