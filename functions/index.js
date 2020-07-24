const admin = require('firebase-admin');
const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

admin.initializeApp();

const BASE_URL = 'https://rxresu.me/r/';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

exports.deleteUser = functions.https.onCall((_, { auth }) => {
  if (!auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  return new Promise((resolve) => {
    const resumesRef = admin.database().ref('resumes');

    resumesRef.once('value', async (snapshot) => {
      const data = snapshot.val();

      const resumes = Object.keys(data).filter(
        (x) => data[x].user === auth.uid,
      );

      await asyncForEach(resumes, async (id) => {
        await admin.database().ref(`resumes/${id}`).remove();
      });

      resolve();
    });
  });
});

exports.printResume = functions.https.onCall(async ({ id, type }, { auth }) => {
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
