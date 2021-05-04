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

/**
 * Tries to navigate the page to a given URL.
 *
 * @param {puppeteer.Page} page Page.
 * @param {string} url URL to navigate page to.
 * @param {puppeteer.PuppeteerLifeCycleEvent} waitUntil When to consider navigation succeeded.
 * @returns {Promise<string>} Returns null if no error occurred, otherwise returns the error message.
 */
const tryGotoPage = async (page, url, waitUntil) => {
  let httpResponse;

  try {
    httpResponse = await page.goto(url, {
      waitUntil,
    });
  } catch (error) {
    return `page.goto (waitUntil: "${waitUntil}") threw an error with message "${error.message}"`;
  }

  if (httpResponse === null) {
    return `page.goto (waitUntil: "${waitUntil}") returned a null response`;
  }

  if (!httpResponse.ok()) {
    return `page.goto (waitUntil: "${waitUntil}") returned a response with HTTP status ${httpResponse.status()} "${httpResponse.statusText()}"`;
  }

  return null;
};

/**
 * Creates a page and navigates to a given URL.
 *
 * @param {puppeteer.Browser} browser Browser.
 * @param {string} url URL to navigate to.
 * @returns {Promise<{page: puppeteer.Page, errors: string[]}>} Returns an object with the page if no error occurred, otherwise returns an object with the list of error messages.
 */
const gotoPage = async (browser, url) => {
  const errors = [];

  const waitUntilArray = ['networkidle0', 'networkidle2'];
  for (let index = 0; index < waitUntilArray.length; index++) {
    /* eslint-disable no-await-in-loop */
    const waitUntil = waitUntilArray[index];

    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    const error = await tryGotoPage(page, url, waitUntil);
    if (!error) {
      return { page, errors: null };
    }

    errors.push(error);
    await page.close();
  }

  return { page: null, errors };
};

const printResumeFunctionHandler = async ({ id, type }, { auth }) => {
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

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const url = BASE_URL + id;
    const { page, errors } = await gotoPage(browser, url);
    if (errors && errors.length > 0) {
      throw new Error(errors.join(' - '));
    }

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
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
};

exports.deleteUser = functions
  .runWith({ memory: '256MB' })
  .https.onCall(deleteUserFunctionHandler);

exports.printResume = functions
  .runWith({ memory: '1GB' })
  .https.onCall(printResumeFunctionHandler);
