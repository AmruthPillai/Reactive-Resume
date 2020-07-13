const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

const BASE_URL = 'https://rxresume-staging.web.app/r/';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.printSinglePageResume = functions.https.onCall(
  async ({ id }, { auth }) => {
    if (!id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with one arguments "id" containing the resume ID.',
      );
    }

    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      );
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL + id);
    await timeout(5000);
    await page.emulateMediaType('print');
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
    const pdf = await page.pdf({
      printBackground: true,
      width: `21cm`,
      height: `${height}px`,
      pageRanges: '1',
    });
    await browser.close();
    return Buffer.from(pdf).toString('base64');
  },
);

exports.printMultiPageResume = functions.https.onCall(
  async ({ id }, { auth }) => {
    if (!id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with one arguments "id" containing the resume ID.',
      );
    }

    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      );
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL + id);
    await timeout(5000);
    await page.emulateMediaType('print');
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    });
    await browser.close();
    return Buffer.from(pdf).toString('base64');
  },
);
