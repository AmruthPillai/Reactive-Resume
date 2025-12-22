# Contributing to Reactive Resume

## Getting the project set up locally

There are a number of Docker Compose examples that are suitable for a wide variety of deployment strategies depending on your use-case. All the examples can be found in the `tools/compose` folder.

To run the development environment of the application locally on your computer, please follow these steps:

#### Requirements

- Docker (with Docker Compose)
- Node.js 20 or higher (with pnpm)

### 1. Fork and Clone the Repository

```sh
git clone https://github.com/{your-github-username}/Reactive-Resume.git
cd Reactive-Resume
```

### 2. Install dependencies

```sh
pnpm install
```

### 3. Copy .env.example to .env

```sh
cp .env.example .env
```

Please have a brief look over the environment variables and change them if necessary, for example, change the ports if you have a conflicting service running on your machine already.

### 4. Fire up all the required services through Docker Compose

```sh
docker compose -f tools/compose/development.yml --env-file .env -p reactive-resume up -d
```

It should take just under half a minute for all the services to be booted up correctly. You can check the status of all services by running `docker compose -p reactive-resume ps`

### 5. Run the development server

```sh
pnpm prisma:migrate:dev
pnpm dev
```

If everything went well, the frontend should be running on `http://localhost:5173` and the backend api should be accessible through `http://localhost:3000`. There is a proxy present to also route all requests to `http://localhost:5173/api` directly to the API. If you need to change the `PORT` environment variable for the server, please make sure to update the `apps/client/proxy.conf.json` file as well with the new endpoint.

You can also visit `http://localhost:3000/api/health`, the health check endpoint of the server to check if the server is running correctly, and it is able to connect to all it's dependent services. The output of the health check endpoint should look like this:

```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "storage": { "status": "up" },
    "browser": { "status": "up", "version": "Chrome/119.0.6045.9" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "storage": { "status": "up" },
    "browser": { "status": "up", "version": "Chrome/119.0.6045.9" }
  }
}
```

---

## Pushing changes to the app

Firstly, ensure that there is a GitHub Issue created for the feature or bugfix you are working on. If it does not exist, create an issue and assign it to yourself.

Once you are happy with the changes you've made locally, commit it to your repository. Note that the project makes use of Conventional Commits, so commit messages would have to be in a specific format for it to be accepted. For example, a commit message to fix the translation on the homepage could look like:

```
git commit -m "fix(homepage): fix typo on homepage in the faq section"
```

It helps to be as descriptive as possible in commit messages so that users can be aware of the changes made by you.

Then, you can run the basic checks, as to make sure the CI has the most chance of being successful:

```
pnpm run lint

pnpm run test

pnpm run build
```

Finally, create a pull request to merge the changes on your forked repository to the original repository hosted on AmruthPillai/Reactive-Resume. I can take a look at the changes you've made when I have the time and have it merged onto the app.
