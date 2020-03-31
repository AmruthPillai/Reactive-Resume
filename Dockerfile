## base image
FROM node:13.12.0-buster-slim

## set working directory
WORKDIR /usr/src/app

## add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

## install and cache app dependencies
COPY package.json /usr/src/app/package.json

## create user "node" and give permissions
RUN chown -R node:node . && chmod -R 755 .
USER node

# install app dependencies
RUN npm install

## start app
CMD ["npm", "start"]