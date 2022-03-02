<img src="https://i.imgur.com/pc8Ingg.png" alt="Reactive Resume" width="256px" height="256px" />

# Reactive Resume

### [Go to App](https://rxresu.me/) | [Sample Resume](https://google.com/)

Reactive Resume is a free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this app, you can create multiple resumes, share them with recruiters through a unique link and print as PDF, all for free, no advertisements, without losing the integrity and privacy of your data.

You have complete control over what goes into your resume, how it looks, what colors, what templates, even the layout in which sections placed. Want a dark mode resume? It’s as easy as editing 3 values and you’re done. You don’t need to wait to see your changes either. Everything you type, everything you change, appears immediately on your resume and gets updated in real time.

## Features

- Free, forever
- No Advertising
- No Tracking (no 🍪s too)
- Sync your data across devices
- Accessible in multiple languages
- Import data from [LinkedIn](https://www.linkedin.com/), [JSON Resume](https://jsonresume.org/)
- Manage multiple resumes with one account
- Open Source (with large community support)
- Send your resume to others with a unique sharable link
- Pick any font from [Google Fonts](https://fonts.google.com/) to use on your resume
- Choose from 6 vibrant templates and more coming soon
- Export your resume to JSON or PDF format with just one click
- Create an account using your email, or just Sign in with Google
- Mix and match colors to any degree, even a dark mode resume?
- Add sections, add pages and change layouts the way you want to
- Tailor-made Backend and Database, isolated from Google, Amazon etc.
- **Oh, and did I mention that it's free?**

## Build from Source

1. Clone the repository locally, or use GitHub Codespaces or CodeSandbox

```
git clone https://github.com/AmruthPillai/Reactive-Resume.git
cd Reactive-Resume
```

2. I prefer to use `npm`, but you can use anything to install dependencies (`pnpm`/`yarn`)

```
npm install
```

3. Copy the .env.example files to .env in multiple locations and fill it with values according to your setup

```
cp .env.example .env
cp apps/client/.env.example apps/client/.env
cp apps/server/.env.example apps/server/.env
```

4. Use Docker Compose to create a PostgreSQL instance and a `reactive_resume` database, or feel free to use your own and modify the variables used in `.env`

```
docker-compose up -d
```

5. Run the project and start building!

```
npm start
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

## License

Reactive Resume is packaged and distributed using the [MIT License](https://choosealicense.com/licenses/mit/) which allows for commercial use, distribution, modification and private use provided that all copies of the software contain the same license and copyright.

_By the community, for the community._  
A passion project by [Amruth Pillai](https://amruthpillai.com/)
