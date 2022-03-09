## v3.0.0-beta.1 (2022-03-09)

### New feature:

- **client/landing**: add testimonials section to landing page([`6f02048`](https://github.com/AmruthPillai/Reactive-Resume/commit/6f02048ebd29b2a5b53aa291e0cdd10df93d032f)) (by Amruth Pillai)
- **client**: add language selector, language detector and privacy/tos pages([`a131bb3`](https://github.com/AmruthPillai/Reactive-Resume/commit/a131bb36525bf85eaee5cdb65542289cdfcff36e)) (by Amruth Pillai)

### Bugs fixed:

- **pnpm**: install deps to update pnpm-lock.yaml([`54fd97b`](https://github.com/AmruthPillai/Reactive-Resume/commit/54fd97b5ecce629456a0dd1848981658136bbaa9)) (by Amruth Pillai)
- **mail.service**: use sendgrid api instead of nodemailer for better deliverability([`9df1219`](https://github.com/AmruthPillai/Reactive-Resume/commit/9df12194bf465d2f9c040c642036e05edef8d945)) (by Amruth Pillai)
- **printer.service**: add --disable-dev-shm-usage flag to chromium headless playwright browser([`e96b090`](https://github.com/AmruthPillai/Reactive-Resume/commit/e96b09090485fefc044dfc8e3daa9f52e123d946)) (by Amruth Pillai)
- **playwright**: use playwright docker image due to runtime error([`2696a54`](https://github.com/AmruthPillai/Reactive-Resume/commit/2696a54d176dd8821be97881447e075c05f9e8fb)) (by Amruth Pillai)
- **databasemodule**: make ssl optional, pass ca cert as base64 env([`c738f31`](https://github.com/AmruthPillai/Reactive-Resume/commit/c738f311dabdbe77770bb3c33959ac121d60019e)) (by Amruth Pillai)
- **i18n**: load locales from file system, instead of http-backend([`a4983ac`](https://github.com/AmruthPillai/Reactive-Resume/commit/a4983ac6bc35efee5b10de0768203dec9110b866)) (by Amruth Pillai)

### Performance improves:

- **app**: working docker build stage, with github actions ci to push image([`5104ea6`](https://github.com/AmruthPillai/Reactive-Resume/commit/5104ea6438d5e37d6c591949d6b3861cef4295b7)) (by Amruth Pillai)
