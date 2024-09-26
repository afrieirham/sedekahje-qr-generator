/**
 * use this script to download qr code render in /qr/:id, make sure to run nextjs
 *
 */

import puppeteer from "puppeteer-core";
import slugify from "slugify";

import { institutions } from "./app/qr/[id]/data";

/**
 * this part should be use if you want to generate qr for 1 institution
 */

const masjid = institutions[0];

const browser = await puppeteer.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(`http://localhost:3000/qr/${masjid?.id}`, {
  waitUntil: "networkidle2",
});
await page.screenshot({
  path: `QR/qr-${slugify(String(masjid?.name), {
    lower: true,
    strict: true,
  })}.png`,
});
await browser.close();

/**
 * this part should be used only if you want to generate all photos
 */

// for await (const masjid of institutions) {
//   const browser = await puppeteer.launch({ channel: "chrome" });
//   const page = await browser.newPage();
//   await page.goto(`http://localhost:3000/qr/${masjid?.id}`, {
//     waitUntil: "networkidle2",
//   });
//   await page.screenshot({
//     path: `QR/qr-${slugify(String(masjid?.name), {
//       lower: true,
//       strict: true,
//     })}.png`,
//   });
//   await browser.close();
// }
