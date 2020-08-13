<img src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/develop/static/images/logo.png" width="256px" />

## A free and open source resume builder.

[![Crowdin](https://badges.crowdin.net/reactive-resume/localized.svg)](https://crowdin.com/project/reactive-resume) 
[![GitHub](https://img.shields.io/github/license/AmruthPillai/Reactive-Resume)](https://github.com/AmruthPillai/Reactive-Resume/blob/develop/LICENSE)

### [Go to App](https://rxresu.me/)

### What is this app all about?

Reactive Resume is a free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this app, you can create multiple resumes, share them with recruiters through a unique link and print as PDF, all for free, no advertisements, without losing the integrity and privacy of your data.

You have complete control over what goes into your resume, how it looks, what colors, what templates, even the layout in which sections placed. Want a dark mode resume? It’s as easy as editing 3 values and you’re done. You don’t need to wait to see your changes either. Everything you type, everything you change, appears immediately on your resume and gets updated in real time.

### Features

- Manage multiple resumes with one account
- Sync your data across devices
- Sign in with Google, or sign in anonymously just to test the app
- Send your resume to others with a unique sharable link
- Choose from 6 vibrant templates and more coming soon
- Structure sections and change layouts the way you want to
- Rename sections according to your language/industry
- Mix and match colors to any degree, even a dark mode resume?
- Pick from a variety of crisp and clear fonts
- Easy to translate to your own language
- Import your existing [JSON Resume](https://jsonresume.org/) in one click
- No advertisements, no data sharing, no marketing emails
- **Everything is free, and there’s no catch!**

### Screenshots

<img src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/develop/static/images/screenshots/screen-1.png" width="400px" />
&nbsp;
<img src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/develop/static/images/screenshots/screen-3.png" width="400px" />
&nbsp;
<img src="https://raw.githubusercontent.com/AmruthPillai/Reactive-Resume/develop/static/images/screenshots/screen-5.png" width="400px" />

### Translation

To translate the app, just fork the repository, go to `src/i18n/locales` and duplicate the `en.json` file to a new file `your-lang-code.json` and translate all of the strings inside. It's a simple process that would take just a few minutes, and by contributing, your name could also be added down below as a contributor.

For those of you familiar with the Crowdin Platform, you could do that too and just head to http://crowdin.com/project/reactive-resume/ to translate the app over there. They have a great interface that helps you navigate through various strings and manage translations.

##### Languages Currently Supported

- Arabic (عربى) (by [Ahmad Khatab](https://github.com/A7madXatab))
- Danish (Dansk) (by [RazziaDK](https://crowdin.com/profile/RazziaDK))
- Dutch (Nederlands) (by [Imad Youssoufi](https://github.com/2imad))
- English
- Finnish (Suomalainen) (by Ari Pikkarainen)
- French (Français) (by [MeisterLLD](https://github.com/MeisterLLD))
- German (Deutsche) (by [Kryptand](https://crowdin.com/profile/Kryptand))
- Japanese (日本人) (by [a-thug](https://crowdin.com/profile/a-thug))
- Kannada (ಕನ್ನಡ)
- Norwegian (Norsk) (by [rubjo](https://github.com/rubjo))
- Portuguese (Brazilian) (by [Felipe CG](https://github.com/felcg))
- Spanish (Español) (by [jrgonzalezrios](https://github.com/jrgonzalezrios))
- Turkish (Türkçe) (by [Emirhan Avcı](https://github.com/AtlasFontaine))

### Building from Source

Want to run your own instance of Reactive Resume? You are very much free to do so. The requirements to build from source are:
- NodeJS/NPM
- A Firebase Project

1. First, clone this project repository
```
git clone https://github.com/AmruthPillai/Reactive-Resume.git
cd Reactive-Resume
```

2. Run npm install to install dependencies for the project
```
npm install
```

3. Create a `.env` file and fill it with your Firebase credentials
```
FIREBASE_APIKEY=""
FIREBASE_APPID=""
FIREBASE_AUTHDOMAIN=""
FIREBASE_DATABASEURL=""
FIREBASE_MEASUREMENTID=""
FIREBASE_MESSAGINGSENDERID=""
FIREBASE_PROJECTID=""
FIREBASE_STORAGEBUCKET=""
```

4. Run `npm run start` to run the development server or `npm run build` to build the production app.

And that's it! 🎉

### Donation

I try to do what I can, but if you found the app helpful, or you're in a better position than the others who depend on this project for their first job, please consider donating as little as $5 to help keep the project alive :)

#### https://www.buymeacoffee.com/AmruthPillai

##### Contributors who have donated to Reactive Resume:

- Leon Yuan ([@LeonY1](https://github.com/LeonY1))
- Benjamin Benni ([@Sensaze](https://twitter.com/Sensaze))
- Anonymous Donor
- Kathy Reid ([@KathyReid](https://github.com/KathyReid))

### Appreciation

Thank you to everyone who made this project possible, including the many users who voiced their opinions, created issues and PRs to the original Reactive Resume project, and helped me along the way to make this a reality.

---

![The Great Gatsby](https://camo.githubusercontent.com/a615c7e1ef9a850f5427cdc153186763305bb853/68747470733a2f2f692e696d6775722e636f6d2f4472386a3569762e676966)

###### Made with Love by [Amruth Pillai](https://amruthpillai.com/)
