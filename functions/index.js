const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

const BASE_URL = 'https://rxresu.me/r/';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
