# Changelog

### What’s changed from v3 to v4?

**The entire app has been rebuilt and reimagined from the ground up.**

The **user interface** has been greatly streamlined to prioritise your content and resume. The design of templates has also undergone a major overhaul. Previously, we utilised TailwindCSS for creating templates, but now you can rely on CSS (styled-components) to build any design you prefer. With this change, I hope to offer a **much wider variety of templates** compared to the previous version.

When it comes to features, there are many to mention, but some highlights include the **ability to use your own OpenAI API key** (stored on your browser) and leverage GPTs to enhance your resume writing skills. With this, you can improve your writing, correct spelling and grammar, and even adjust the tone of the text to be more confident or casual.

When you make your resume publicly available, you are provided with a link that you can share with potential recruiters and employers. This change allows you to **track the number of views or downloads your resume has received**, so you can stay informed about when someone has checked out your resume.

When it comes to **security**, you now have the option to protect your account with **two-factor authentication**. This means that whenever you log in to Reactive Resume, you will also need to enter a one-time code generated on your phone. This additional step ensures that only you have access to your account.

From a **design** perspective, the motivation behind this is to ensure that Reactive Resume is taken more seriously and not perceived as just another subpar side-project, which is often associated with free software. My goal is to demonstrate that this is not the case, and that **free and open source software can be just as good**, if not better, than paid alternatives.

From a **self-hosting perspective**, it has never been simpler. Instead of running two separate services on your Docker (one for the client and one for the server) and struggling to establish communication between them, now you only need to pull a single image. Additionally, there are a few dependent services available on Docker (such as Postgres, Redis, Minio etc.) that you can also pull and have them all working together seamlessly.

I'm excited for you to try out the app, as I've spent months building it to perfection. If you enjoy the experience of building your resume using the app, please consider supporting by [becoming a GitHub Sponsor](https://github.com/sponsors/AmruthPillai).
