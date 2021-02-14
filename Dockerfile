FROM node:alpine as builder
WORKDIR /app

RUN apk update \
    && apk add --no-cache \
        g++ \
        yasm \
        make \
        automake \
        autoconf \
        libtool \
        vips-dev

COPY package*.json ./
RUN npm ci

ARG FIREBASE_APIKEY
ARG FIREBASE_APPID
ARG FIREBASE_AUTHDOMAIN
ARG FIREBASE_DATABASEURL
ARG FIREBASE_MEASUREMENTID
ARG FIREBASE_MESSAGINGSENDERID
ARG FIREBASE_PROJECTID
ARG FIREBASE_STORAGEBUCKET

COPY . ./
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/public/ /usr/share/nginx/html
COPY server.conf /etc/nginx/conf.d/default.conf
