# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 5000
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./

RUN npm install
RUN npm install -g serve
RUN npm run-script build
RUN npm run docs:build
USER node
# Production CMD
CMD [ "serve", "-s", "build" ]
# Comment out Production CMD and uncomment following for development
#CMD [ "npm", "build" ]

