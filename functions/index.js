const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const cors = require('cors')({ origin: 'https://rxresume-staging.web.app' });

const BASE_URL = 'https:/rxresu.me/r/';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.printSinglePageResume = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).send('Forbidden!');
  }

  if (!req.query.id) {
    return res.status(400).send('Bad Request!');
  }

  async function run() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL + req.query.id);
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
    return pdf;
  }

  return cors(req, res, async () => {
    const pdf = await run();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length,
    });
    return res.send(pdf);
  });
});

exports.printMultiPageResume = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).send('Forbidden!');
  }

  if (!req.query.id) {
    return res.status(400).send('Bad Request!');
  }

  async function run() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL + req.query.id);
    await timeout(5000);
    await page.emulateMediaType('print');
    const pdf = await page.pdf({
      printBackground: true,
      width: `21cm`,
    });
    await browser.close();
    return pdf;
  }

  return cors(req, res, async () => {
    const pdf = await run();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length,
    });
    return res.send(pdf);
  });
});
