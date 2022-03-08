<img src="https://i.imgur.com/pc8Ingg.png" alt="Reactive Resume" width="256px" height="256px" />

# Reactive Resume

![Docker Pulls](https://img.shields.io/docker/pulls/amruthpillai/reactive-resume?style=flat-square)

## [Go to App](https://beta.rxresu.me/)

Reactive Resume is a free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this app, you can create multiple resumes, share them with recruiters through a unique link and print as PDF, all for free, no advertisements, without losing the integrity and privacy of your data.

You have complete control over what goes into your resume, how it looks, what colors, what templates, even the layout in which sections placed. Want a dark mode resume? It’s as easy as editing 3 values and you’re done. You don’t need to wait to see your changes either. Everything you type, everything you change, appears immediately on your resume and gets updated in real time.

## Features

- Free, forever
- No Advertising
- No Tracking (no 🍪s too)
- Sync your data across devices
- Import data from [LinkedIn](https://www.linkedin.com/), [JSON Resume](https://jsonresume.org/)
- Manage multiple resumes with one account
- Open Source (with large community support)
- Send your resume to others with a unique sharable link
- Accessible in multiple languages, [help translate here](https://translate.rxresu.me/)
- Pick any font from [Google Fonts](https://fonts.google.com/) to use on your resume
- Choose from 6 vibrant templates and more coming soon
- Export your resume to JSON or PDF format with just one click
- Create an account using your email, or just Sign in with Google
- Mix and match colors to any degree, even a dark mode resume?
- Add sections, add pages and change layouts the way you want to
- Tailor-made Backend and Database, isolated from Google, Amazon etc.
- **Oh, and did I mention that it's free?**

## Docker Setup

You can pull the prebuilt docker images right off the shelf from either [Docker Hub](https://hub.docker.com/repository/docker/amruthpillai/reactive-resume) or [GitHub Container Registry](https://ghcr.io/amruthpillai/reactive-resume). Keep in mind, you would also need a database for this to work as intended.

```sh
# Server
docker run -p 3100:3100 --env-file .env amruthpillai/reactive-resume:server-latest

# Client
docker run -p 3000:3000 --env-file .env amruthpillai/reactive-resume:client-latest
```

Or, to make your life easier there's a simple `docker-compose.yml` included to help you get set up for success.

```sh
docker compose up
```

## Build from Source

If you don't want to use Docker, I understand. There's an old-school way to build the app too. This project, and these instructions rely heavily on [pnpm](https://pnpm.io/) so you might want to have that installed on your system before you continue.

1. Clone the repository locally, or use GitHub Codespaces or CodeSandbox

```
git clone https://github.com/AmruthPillai/Reactive-Resume.git
cd Reactive-Resume
```

2. Install dependencies using `pnpm`, but feel free to use any other package manager that supports npm workspaces.

```
pnpm install
```

3. Copy the `.env.example` file to `.env` in the project root and fill it with values according to your setup. You can skip the SendGrid variables if you don't want to set up mail right away.

```
cp .env.example .env
```

1. Use Docker Compose to create a PostgreSQL instance and a `reactive_resume` database, or feel free to use your own and modify the variables used in `.env`

```
docker-compose up -d postgres
```

5. Run the project and start building!

```
pnpm dev
```

## Contributing

Please refer to the project's style and contribution guidelines for submitting pull requests.

In general, this project follows the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull Request** so that we can review your changes

NOTE: Be sure to merge the latest from `main` before making a pull request!

## Bugs? Feature Requests?

Use the [GitHub Issues](https://github.com/AmruthPillai/Reactive-Resume/issues/new/choose) platform to notify me about bugs or new features that you would like to see in Reactive Resume. Please check before creating new issues as there might already be one.

## Donations

Reactive Resume would be nothing without the folks who supported me and kept the project alive in the beginning, and your cotinued support is what keeps me going. If you found Reactive Resume to be useful, helpful or just insightful and appreciate the effort I took to make the project, please consider donating as little or as much as your can.

[☕️ Buy me a coffee](https://www.buymeacoffee.com/AmruthPillai)

## License

Reactive Resume is packaged and distributed using the [MIT License](https://choosealicense.com/licenses/mit/) which allows for commercial use, distribution, modification and private use provided that all copies of the software contain the same license and copyright.

_By the community, for the community._  
A passion project by [Amruth Pillai](https://amruthpillai.com/)
