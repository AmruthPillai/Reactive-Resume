# Contributing to Reactive Resume

## Getting the project set up locally

There are a number of Docker Compose examples that are suitable for a wide variety of deployment strategies depending on your use-case. All the examples can be found in the `tools/compose` folder.

To run the development environment of the application locally on your computer, please follow these steps:

#### Requirements

- Docker (with Docker Compose)
- Node.js 22.13.1 or higher
- Bun package manager

**Installing Bun:**

If you don't have Bun installed, you can install it using one of the following methods:

```sh
# Using the official installer (recommended)
curl -fsSL https://bun.sh/install | bash

# Using npm
npm install -g bun

# Using Homebrew (macOS)
brew install bun
```

After installation, verify it's working:
```sh
bun --version
```

### 1. Fork and Clone the Repository

```sh
git clone https://github.com/{your-github-username}/Reactive-Resume.git
cd Reactive-Resume
```

### 2. Install dependencies

```sh
bun install
```

### 3. Set up environment variables

Copy the example environment file to create your own `.env` file:

```sh
cp .env.example .env
```

**Note:** If `.env.example` doesn't exist, you can create a `.env` file manually using the values from `tools/compose/development.yml` as a reference. The default values in `.env.example` are configured for local development and should work out of the box.

Please review the environment variables in `.env` and change them if necessary. For example:
- Change ports if you have conflicting services running on your machine
- Update `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` with secure random strings (you can generate them using `openssl rand -base64 32`)
- Adjust database credentials if needed

The default values are suitable for local development with Docker Compose.

### 4. Fire up all the required services through Docker Compose

```sh
docker compose -f tools/compose/development.yml --env-file .env -p reactive-resume up -d
```

It should take just under half a minute for all the services to be booted up correctly. You can check the status of all services by running `docker compose -p reactive-resume ps`

### 5. Run the development server

```sh
bun run prisma:migrate:dev
bun run dev
```

If everything went well, the frontend should be running on `http://localhost:5173` and the backend api should be accessible through `http://localhost:3000`. There is a proxy present to also route all requests to `http://localhost:5173/api` directly to the API. If you need to change the `PORT` environment variable for the server, please make sure to update the `apps/client/proxy.conf.json` file as well with the new endpoint.

**Verify the setup:**

Visit `http://localhost:3000/api/health` to check if the server is running correctly and can connect to all its dependent services. The health check endpoint should return a response like this:

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

If you encounter any issues, please refer to the [Troubleshooting](#troubleshooting) section below.

---

## Troubleshooting

### Docker Permission Issues

If you encounter permission errors when running Docker commands:

1. **Check Docker daemon status:**
   ```sh
   docker info
   ```

2. **Ensure Docker Desktop is running** (if using Docker Desktop on macOS/Windows)

3. **Verify Docker socket permissions** (Linux):
   ```sh
   sudo chmod 666 /var/run/docker.sock
   ```

### Port Conflicts

If you get errors about ports already being in use:

1. **Identify which process is using the port:**
   ```sh
   # macOS/Linux
   lsof -i :3000
   # or
   netstat -an | grep 3000
   ```

2. **Change the port in `.env`** and update `apps/client/proxy.conf.json` accordingly:
   ```sh
   PORT=3001  # Change to an available port
   ```

3. **Update Docker Compose ports** in `tools/compose/development.yml` if needed

### Bun Not Found

If you see `command not found: bun`:

1. **Install Bun using the official installer:**
   ```sh
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Or install using npm:**
   ```sh
   npm install -g bun
   ```

3. **Or install using Homebrew** (macOS):
   ```sh
   brew install bun
   ```

4. **Verify installation:**
   ```sh
   bun --version
   ```

5. **Restart your terminal** after installation to ensure Bun is in your PATH

### Node.js Version Mismatch

If you encounter errors related to Node.js version:

1. **Check your Node.js version:**
   ```sh
   node --version
   ```

2. **Ensure you have Node.js 22.13.1 or higher** (check `package.json` engines field)

3. **Use a version manager to switch versions:**
   ```sh
   # Using nvm
   nvm install 22.13.1
   nvm use 22.13.1
   
   # Using n
   n 22.13.1
   ```

### Database Connection Errors

If Prisma migrations fail or you see database connection errors:

1. **Verify Docker services are running:**
   ```sh
   docker compose -p reactive-resume ps
   ```

2. **Check that PostgreSQL container is healthy:**
   ```sh
   docker compose -p reactive-resume logs postgres
   ```

3. **Verify `DATABASE_URL` in `.env`** matches your Docker setup:
   ```sh
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
   ```

4. **Test database connection:**
   ```sh
   docker compose -p reactive-resume exec postgres psql -U postgres -d postgres -c "SELECT 1;"
   ```

### Prisma Migration Errors

If `bun run prisma:migrate:dev` fails:

1. **Ensure database is accessible** (see Database Connection Errors above)

2. **Check `DATABASE_URL` format** - it must start with `postgresql://`

3. **Reset the database** (⚠️ **WARNING**: This will delete all data):
   ```sh
   bunx prisma migrate reset
   ```

4. **Generate Prisma Client:**
   ```sh
   bun run prisma:generate
   ```

### Health Check Failures

If the health check endpoint shows services as "down":

1. **Check Docker service status:**
   ```sh
   docker compose -p reactive-resume ps
   ```

2. **View service logs:**
   ```sh
   # Check all services
   docker compose -p reactive-resume logs
   
   # Check specific service
   docker compose -p reactive-resume logs postgres
   docker compose -p reactive-resume logs minio
   docker compose -p reactive-resume logs chrome
   ```

3. **Restart services:**
   ```sh
   docker compose -p reactive-resume restart
   ```

4. **Verify environment variables** match Docker service configuration

5. **Check network connectivity** between containers (if using Docker networking)

---

## Pushing changes to the app

Firstly, ensure that there is a GitHub Issue created for the feature or bugfix you are working on. If it does not exist, create an issue and assign it to yourself.

Once you are happy with the changes you've made locally, commit it to your repository. Note that the project makes use of Conventional Commits, so commit messages would have to be in a specific format for it to be accepted. For example, a commit message to fix the translation on the homepage could look like:

```
git commit -m "fix(homepage): fix typo on homepage in the faq section"
```

It helps to be as descriptive as possible in commit messages so that users can be aware of the changes made by you.

Finally, create a pull request to merge the changes on your forked repository to the original repository hosted on AmruthPillai/Reactive-Resume. I can take a look at the changes you've made when I have the time and have it merged onto the app.
