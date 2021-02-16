FROM node:alpine as builder
WORKDIR /app

RUN apk add --update --no-cache \
    g++ \
    yasm \
    bash \
    make \
    automake \
    autoconf \
    libtool \
    zlib-dev \
    libpng-dev

RUN apk add --update --no-cache \
    --repository http://dl-3.alpinelinux.org/alpine/edge/community \
    --repository http://dl-3.alpinelinux.org/alpine/edge/main \
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
