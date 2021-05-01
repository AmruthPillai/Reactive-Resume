const admin = require('firebase-admin');
const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

admin.initializeApp();

const BASE_URL = 'https://rxresu.me/r/';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const deleteUserFunctionHandler = async (_, { auth }) => {
  if (!auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  try {
    const userId = auth.uid;
    const updates = {};

    const userResumesDataSnapshot = await admin
      .database()
      .ref('resumes')
      .orderByChild('user')
      .equalTo(userId)
      .once('value');
    const userResumes = userResumesDataSnapshot.val();
    if (userResumes) {
      Object.keys(userResumes).forEach(async (resumeId) => {
        updates[`resumes/${resumeId}`] = null;
      });
    }

    const userDataSnapshot = await admin
      .database()
      .ref(`users/${userId}`)
      .once('value');
    const user = userDataSnapshot.val();
    if (user) {
      updates[`users/${userId}`] = null;
    }

    if (Object.keys(updates).length > 0) {
      await admin.database().ref().update(updates);
    }

    return true;
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
};

exports.deleteUser = functions
  .runWith({ memory: '256MB' })
  .https.onCall(deleteUserFunctionHandler);

exports.printResume = functions
  .runWith({ memory: '1GB' })
  .https.onCall(async ({ id, type }, { auth }) => {
    if (!id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with argument "id" containing the resume ID.',
      );
    }

    if (!type) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with argument "type" containing the type of resume.',
      );
    }

    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(BASE_URL + id, {
      waitUntil: 'networkidle0',
    });
    await timeout(6000);
    await page.emulateMediaType('print');
    let pdf;

    if (type === 'single') {
      const height = await page.evaluate(() => {
        const { body } = document;
        const html = document.documentElement;

        const maxHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        );

        return maxHeight;
      });
      pdf = await page.pdf({
        printBackground: true,
        width: `21cm`,
        height: `${height}px`,
        pageRanges: '1',
      });
    } else {
      pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
      });
    }

    await browser.close();
    return Buffer.from(pdf).toString('base64');
  });
