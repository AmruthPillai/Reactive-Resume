# Deployment

This is a guide on how to build the source from scratch, along with setting up Firebase and related cloud functions to be able to export PDFs just like the original deployment of [rxresu.me](http://rxresu.me/).

### Requirements

- A Firebase project
- Works on both Linux, macOS and Windows
- Requires Node.js & NPM installed on the machine

### Setting up Firebase

1. Create a new Firebase project by visiting [Firebase Console](https://console.firebase.google.com/) and clicking on `Add Project`

![Screenshot 2021-03-13 at 10 19 10 AM](https://user-images.githubusercontent.com/1134738/111019495-97a73800-83e5-11eb-9eb1-6da100d839ba.png)

2. Disable Google Analytics, or keep it enabled as per your requirements. Most people wouldn't need it.

![Screenshot 2021-03-13 at 10 19 23 AM](https://user-images.githubusercontent.com/1134738/111019521-bc9bab00-83e5-11eb-9365-e521577e7a90.png)

3. Wait until Project is created, then click on Continue

![Screenshot 2021-03-13 at 10 21 30 AM](https://user-images.githubusercontent.com/1134738/111019543-e5bc3b80-83e5-11eb-923f-fc4fb2c6d84f.png)

4. Navigate to Realtime Database, and click on `Create Database`

![Screenshot 2021-03-13 at 10 28 57 AM](https://user-images.githubusercontent.com/1134738/111019691-f02b0500-83e6-11eb-9112-c3123273d035.png)

5. Select any location that's nearby to you, and most importantly, create the database in `Test Mode` and click on Enable

![Screenshot 2021-03-13 at 10 30 01 AM](https://user-images.githubusercontent.com/1134738/111019724-16e93b80-83e7-11eb-9713-06a7adf0c5d4.png)

6. Go back to Project Overview and click on `Web` and skip through every other step by clicking `Next`.

![Screenshot 2021-03-13 at 10 27 34 AM](https://user-images.githubusercontent.com/1134738/111019839-b4446f80-83e7-11eb-9fe2-183b06f6f829.png)

7. Copy configuration variables of your project, or keep this page open as you will need it later

![ezgif com-gif-maker](https://user-images.githubusercontent.com/1134738/111019829-9d9e1880-83e7-11eb-8ccc-573db1039b10.gif)

### Cloning the Repository

1. Run this command on your machine's terminal or Command Prompt

```
git clone git@github.com:AmruthPillai/Reactive-Resume.git
```

<img width="550" alt="Screenshot 2021-03-13 at 10 38 16 AM" src="https://user-images.githubusercontent.com/1134738/111019919-3df43d00-83e8-11eb-8d6b-d9fe0cc74a3a.png">

2. Copy the file `.env.example` to `.env` and start editing the file

```
cp .env.example .env
```

<img width="317" alt="Screenshot 2021-03-13 at 10 50 21 AM" src="https://user-images.githubusercontent.com/1134738/111020166-ed7ddf00-83e9-11eb-9cbb-a8732243bbd5.png">

3. Copy configuration variables from last step to the .env file, it's fine to have `FIREBASE_MEASUREMENTID` empty if you had Google Analytics disabled.

<img width="696" alt="Screenshot 2021-03-13 at 10 51 53 AM" src="https://user-images.githubusercontent.com/1134738/111020217-3c2b7900-83ea-11eb-801d-d8719cf23608.png">

4. Run `npm install` on the terminal/command prompt

5. After that's done, run `npm run build` and allow some time for the process to build
