# 🎒 Tech Stack

Here's a brief overview of the tech stack that's used to build Reactive Resume.

* [React](https://react.dev/) ([Vite](https://vitejs.dev/)), as the frontend
* [NestJS](https://nestjs.com/), as the backend
* [PostgreSQL](https://www.postgresql.org/), as the primary database
* [Prisma ORM](https://www.prisma.io/), as the interface between the server and the database
* [Minio](https://min.io/), an open-source S3 alternative to store objects
* [Browserless](https://www.browserless.io/), an open-source docker image that allows to run headless Chrome as a separate service

Some of the optional dependencies, which are not required when self-hosting your own version are:

* Any SMTP Server, to send password recovery emails
* [Sentry](https://sentry.io/), to track errors occurred on the server
* GitHub/Google OAuth, to quickly sign-up and authenticate users
* [Crowdin](https://crowdin.com/), to manage translations and collaborate with translators across the world to contribute new translation phrases to the project

There are several open-source libraries that we use. Without them, it would not have been possible to build Reactive Resume.

* [lingui](https://lingui.dev/)
* [dnd-kit](https://dndkit.com/)
* [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
* [react-zoom-pan-pinch](https://github.com/BetterTyped/react-zoom-pan-pinch)
* and so many others...
