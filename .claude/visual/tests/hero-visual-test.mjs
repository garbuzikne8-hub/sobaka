import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = process.cwd();
const baselinePath = path.join(root, ".claude/visual/snapshots/baseline/hero-screen.png");
const currentPath = path.join(root, ".claude/visual/snapshots/current/hero-screen.png");
const diffPath = path.join(root, ".claude/visual/snapshots/diff/hero-screen-diff.png");
const thresholdPercent = 0.5;

async function captureCurrent() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 838 } });
  const fileUrl = `file://${path.join(root, "index.html")}`;
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.screenshot({
    path: currentPath,
    clip: { x: 0, y: 0, width: 1440, height: 838 }
  });
  await browser.close();
}

function compareImages() {
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  if (baseline.width !== current.width || baseline.height !== current.height) {
    throw new Error(
      `Dimension mismatch: baseline ${baseline.width}x${baseline.height}, current ${current.width}x${current.height}`
    );
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const mismatched = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    baseline.width,
    baseline.height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const total = baseline.width * baseline.height;
  const percent = (mismatched / total) * 100;

  console.log(`MISMATCH_PIXELS=${mismatched}`);
  console.log(`TOTAL_PIXELS=${total}`);
  console.log(`MISMATCH_PERCENT=${percent.toFixed(4)}`);
  console.log(percent <= thresholdPercent ? "RESULT=PASS" : "RESULT=FAIL");

  if (percent > thresholdPercent) {
    console.log("NEXT_STEP=DEVTOOLS_DIAGNOSIS");
    console.log("DIAG_CMD=npm run mcp:chrome-devtools");
    console.log("DIAG_FOCUS=computed-styles,box-model,transforms,fonts,layout-shift");
  }

  process.exitCode = percent <= thresholdPercent ? 0 : 1;
}

await captureCurrent();
compareImages();
