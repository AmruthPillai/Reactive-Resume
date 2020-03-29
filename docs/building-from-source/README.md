---
title: Building from Source
---

# Building from Source

So, you would like to run the project on your local machine, or your own network server? You've come to the right place. It takes about 5-6 minutes to get the project running on your local, and this is how:

## Building the App

### 1. Install Node.js & NPM

You might have already setup Node.js on your system before, but in case you haven't, this is where you can download and install the required applications from: [nodejs.org ](https://nodejs.org/en/)

Verify whether you are able to run `node` and `npm` commands on your command line:

```
> node -v
v13.11.0

> npm -v
6.14.4
```

### 2. Clone the Repository

Download the repository as an archive from GitHub, or clone the repository from the command line depending on whether you require the latest updates or not.

```
wget https://github.com/AmruthPillai/Reactive-Resume/archive/master.zip
```

<p style="text-align: center">
  <strong>OR</strong>
</p>

```
git clone https://github.com/AmruthPillai/Reactive-Resume.git
cd Reactive-Resume
```

### 3. Install Project Dependencies

Install the dependencies required for the project to run. For a bird's eye view of all the dependencies it would install, you can check `package.json`.

```
npm install
```

### 4. Start the Development Server

You can run the project locally to check if everything is working alright, through this command:

```
npm start
```

### 5. Build Production App

This will produce a production version of the app and return a folder `build` which contains static files ready to be uploaded on the web. For more info on how to deploy, go to the Deployment page.

```
npm build
```

## Building the Documentation

### 1. Follow Steps 1 - 3 from [Building the App](#building-the-app)

The initial steps to build and install the documentation server is similar to how you would build the app, as both of them reside in a monorepo.

### 2. Start the Development Server

You can edit the documentation and run it locally using this command:

```
npm run docs:dev
```

### 3. Build Static Documentation

This will produce static files under the folder `docs/.vuepress/dist`. This folder can be uploaded anywhere such as Shared Hosting/Firebase/Netlify/Cloud etc.

```
npm run docs:build
```
