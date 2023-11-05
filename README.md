![Reactive Resume](https://res.cloudinary.com/amruth-pillai/image/upload/v1699180255/reactive-resume/readme/banner_zvieca.png)

![App Version](https://img.shields.io/github/package-json/version/AmruthPillai/Reactive-Resume/v4?label=version)
[![Docker Pulls](https://img.shields.io/docker/pulls/amruthpillai/reactive-resume)](https://hub.docker.com/repository/docker/amruthpillai/reactive-resume)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/AmruthPillai)](https://github.com/sponsors/AmruthPillai)

# Reactive Resume

A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.

### [Go to App](https://rxresu.me/) | [Docs](https://docs.rxresu.me/)

## Description

Reactive Resume is a free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume. With zero user tracking or advertising, your privacy is a top priority. The platform is extremely user-friendly and can be self-hosted in less than 30 seconds if you wish to own your data completely.

It's available in multiple languages and comes packed with features such as real-time editing, dozens of templates, drag-and-drop customisation, and integration with OpenAI for enhancing your writing.

You can share a personalised link of your resume to potential employers, track its views or downloads, and customise your page layout by dragging-and-dropping sections. The platform also supports various font options and provides dozens of templates to choose from. And yes, there's even a dark mode for a more comfortable viewing experience.

Start creating your standout resume with Reactive Resume today!

## Screenshots

TODO: Add screenshots of major sections of the app

## Features

- **Free, forever** and open-source
- No telemetry, user tracking or advertising
- You can self-host the application in less then 30 seconds
- **Available in 5+ languages**, and counting ([help add your language here](https://translate.rxresu.me/))
- Use your email address (or a throw-away address, no problem) to create an account
- You can also sign in with your GitHub or Google account, and even set up two-factor authentication for extra security
- Create as many resumes as you like under a single account, optimising each resume for every job application based on it's description for a higher ATS score
- **Bring your own OpenAI API key** and unlock features such as improving your writing, fixing spelling and grammar or changing the tone of your text in one-click
- Create single page resumes or a resume that spans multiple pages easily
- Mix-and-match your resume and make it yours by picking any colour
- Customise your page layout as you like just by dragging-and-dropping sections
- **Dozens of templates** to choose from, ranging from professional to modern to swanky
- Supports printing resumes in A4 or Letter page formats
- Create your resume with any font hosted by [Google Fonts](https://fonts.google.com/), and a special inclusion of [Computer Modern](https://tug.org/FontCatalogue/computermodern/) to make your resumes look like they're made in LaTeX
- **Share a personalised link of your resume** to companies or recruiters for them to get the latest updates and as a bonus, you can track how many times your resume has been viewed or downloaded since it's creation
- Built with state-of-the-art (at the moment) and dependable technologies with the simplest and most human-readable code on all of GitHub
- **MIT License**, so do what you like with the code as long as you credit the original author
- And finally yes, there's a dark mode too 🌓

## Built With

- Postgres (primary database)
- DigitalOcean (infrastructure)
- Prisma ORM, which frees you to switch to any other relational database with a few minor changes in the code
- Redis (for caching, session storage and resume statistics)
- Minio (for object storage: to store avatars, resume PDFs and previews)
- Browserless (for headless chrome, to print PDFs and generate previews)
- Optional: An SMTP Server (to send password recovery emails)
- Optional: Sentry (for error tracing and performance monitoring)
- Optional: GitHub/Google OAuth Token (for quickly authenticating users)

## Star History

<a href="https://star-history.com/#AmruthPillai/Reactive-Resume&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=AmruthPillai/Reactive-Resume&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=AmruthPillai/Reactive-Resume&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=AmruthPillai/Reactive-Resume&type=Date" />
  </picture>
</a>

## Frequently Asked Questions

<details>
  <summary><strong>Who are you, and why did you build Reactive Resume?</strong></summary>
  
  I'm Amruth Pillai, just another run-off-the-mill developer working at Elara Digital GmbH in Berlin, Germany. I'm married to my beautiful and insanely supportive wife who has helped me in more ways than one in seeing this project to it's fruition. I am originally from Bengaluru, India where I was a developer at Postman (the API testing tool) for a short while. My hobbies include eating, living and breathing code.

Back in my university days, I designed a really cool dark mode resume (link on my website) using Figma and I had a line of friends and strangers asking me to design their resume for them.

While I could have charged everyone a hefty sum and retired even before I began, I decided to build the first version of Reactive Resume in 2019. Since then, it's gone through multiple iterations as I've learned a lot of better coding practices over the years.

At the time of writing, Reactive Resume is probably one of the only handful of resume builders out there available to the world for free and without an annoying paywall at the end. While being free is often associated with software that's not of good quality, I strive to prove them wrong and build a product that people love using and are benefitted by it.

My dream has always been to build something that at least a handful people use on a daily basis, and I'm extremely proud to say that Reactive Resume, over it's years of development, has **helped over half a million people build their resume**, and I hope it only increases from here and reaches more people who are in need of a good resume to kickstart their career but can't afford to pay for one.

</details>

<details>
  <summary><strong>How much does it cost to run Reactive Resume?</strong></summary>

It's not much honestly. DigitalOcean has graciously sponsored their infrastructure to allow me to host Reactive Resume on their platform. There's a small fee I pay to dependent services, to send emails for example, and the most of it goes to managing the domain and other related apps (documentation).

I've spent countless hours and sleepless nights building the application though, and I honestly do not expect anything in return but to hear from you on how the app has helped you with your career.

But if you do feel like supporting the developer and the future development of Reactive Resume, please donate (_only if you have some extra money lying around_) to me on my [GitHub Sponsors page](https://github.com/sponsors/AmruthPillai/). You can choose to donate one-time or sponsor a recurring donation.

</details>

<details>
  <summary><strong>Other than donating, how can I support you?</strong></summary>

**If you speak a language other than English**, sign up to be a translator on Crowdin, our translation management service. You can help translate the product to your language and share it among your community. Even if the language is already translated, it helps to sign up as you would be notified when there are new phrases to be translated.

**If you work in the media, are an influencer or have lots of friends**, share the app with your circles and let them know so it can reach the people who need it the most. I’m also [open for interviews](mailto:hello@amruthpillai.com), although that’s wishful thinking. If you do mention Reactive Resume on your blog, let me know so that I can link back to you here.

**If you found a bug or have an idea for a feature**, raise an issue on GitHub or shoot me a message and let me know what you’d like to see. I can’t promise that it’ll be done soon, but juggling work, life and open-source, I’ll definitely get to it when I can.

</details>

<details>
  <summary><strong>How does the OpenAI Integration work? How can I trust you with my API key?</strong></summary>

You should **absolutely not** trust me with your OpenAI API key.

OpenAI has been a game-changer for all of us. I cannot tell you how much ChatGPT has helped me in my everyday work and with the development of Reactive Resume. It only makes sense that you leverage what AI has to offer and let it help you build the perfect resume.

While most applications out there charge you a fee to use their AI services (rightfully so, because it isn’t cheap), you can choose to enter your own OpenAI API key on the Settings page (under OpenAI Integration). The key is stored in your browser’s local storage, which means that if you uninstall your browser, or even clear your data, the key is gone with it. All requests made to OpenAI are also sent directly to their service and does not hit the app servers at all.

The policy behind “Bring your own Key” (BYOK) is [still being discussed](https://community.openai.com/t/openais-bring-your-own-key-policy/14538/46) and probably might change over a period of time, but while it’s available, I would keep the feature on the app.

You are free to turn off all AI features (and not be aware of it’s existence) simply by not adding a key in the Settings page and still make use of all of the useful features that Reactive Resume has to offer. I would even suggest you to take the extra step of using ChatGPT to write your content, and simply copy it over to Reactive Resume.

</details>

## License

Reactive Resume is packaged and distributed using the [MIT License](/LICENSE.md) which allows for commercial use, distribution, modification and private use provided that all copies of the software contain the same license and copyright.

By the community, for the community.
A passion project by Amruth Pillai
