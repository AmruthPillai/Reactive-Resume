FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

COPY ./package*.json .

RUN npm config set unsafe-perm true

RUN npm ci

RUN npm install sharp --ignore-scripts=false

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 3100

CMD [ "npm", "start" ]