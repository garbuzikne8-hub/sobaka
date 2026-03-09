# Chrome DevTools MCP + Visual Pixel Perfect

This project is configured to use `chrome-devtools-mcp` as a diagnostic step when visual diff fails.

## What Is Configured

- npm package installed: `chrome-devtools-mcp`
- global Codex MCP config updated: `~/.codex/config.toml`
- visual skill updated: `/Users/admin/.codex/skills/visual-pixel-perfect/SKILL.md`
  - `chrome-devtools` added to allowed tools
  - new mandatory phase after compare failure: DevTools diagnosis

## Daily Flow

1. Run visual test:
   - `npm run visual:hero`
2. If result is `FAIL`, run DevTools diagnosis:
   - open the same page in Chrome DevTools MCP
   - inspect computed styles, box model, transforms, stacking context
   - verify fonts/assets loaded, no layout shift, correct scale/zoom
3. Apply CSS/layout fixes only.
4. Re-run visual test until pass.

## Helpful Commands

- Start SCSS watch:
  - `npm run dev`
- Run hero visual comparison:
  - `npm run visual:hero`
- Start Chrome DevTools MCP manually:
  - `npm run mcp:chrome-devtools`

