---
title: Deployment
---

# Deployment

You've built the source code successfully and now you're on your way to deploying the app. There are some methods setup to deploy a version of the app without even having to build the source, so we'll run through all the steps here:

## Docker

If you are a fan of Docker as I am, you'd be happy to know that the app can be set up and running within seconds thanks to having set up both environments of Docker.

If you would like to run the **development server** through Docker, which also supports hot-reloads, just run:

```
npm run docker:dev
OR
docker-compose -f docker-compose-dev.yml up -d --build
```

If you would like to run the **production version of the app**, powered by NGINX, just run:

```
npm run docker
OR
docker-compose up -d --build
```

You can also alternatively pull the image from [Docker Hub](https://hub.docker.com/r/amruthpillai/reactive-resume) where the latest image is always built from source control.

```
docker pull amruthpillai/reactive-resume
```

## Deploying to Heroku

Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps — we're the fastest way to go from idea to URL, bypassing all those infrastructure headaches.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/AmruthPillai/Reactive-Resume)

## Deploying to Netlify

Used by more than 800,000 web developers and businesses, the Netlify platform provides modern build workflows, serverless functions and a global Application Delivery Network to deliver the most performant, secure and scalable websites and applications.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AmruthPillai/Reactive-Resume)

## Deploy to Synology NAS

**NAS Hosted** has written a great tutorial on how to deploy the app on Synology NAS,  
read more about it here: [Host your own Resume Builder on Synology using Docker](https://nashosted.com/host-your-own-resume-builder-on-synology-using-docker/)

## Deploy to Shared Hosting/VPS

Here, you're kinda on your own as there are no one-click buttons to help you through, but it's a simple process. Once you've built the app, you can copy the contents of the `build` folder to your `public_html` folder and you will have the app running on your designated domain or IP address.

Here is a great tutorial on how to set up a web server on your machine by DigitalOcean:  
[How To Install Nginx on Ubuntu 18.04 ](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
