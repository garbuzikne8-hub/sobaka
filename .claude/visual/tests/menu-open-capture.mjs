import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const outputPath = path.join(root, ".claude/visual/snapshots/current/menu-open.png");
const baselinePath = path.join(root, ".claude/visual/snapshots/baseline/menu-open.png");

async function captureMenuOpen() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 838 } });
  const fileUrl = `file://${path.join(root, "index.html")}`;
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.click(".hero-screen__menu");
  await page.waitForTimeout(240);
  await page.screenshot({
    path: outputPath,
    clip: { x: 0, y: 0, width: 1440, height: 838 }
  });
  await browser.close();
}

await captureMenuOpen();
console.log(`SNAPSHOT=${outputPath}`);
console.log(fs.existsSync(baselinePath) ? `BASELINE_EXISTS=${baselinePath}` : "BASELINE_EXISTS=NO");
