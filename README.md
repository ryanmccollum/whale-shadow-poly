# Whale Shadow Poly

Leaderboard-inspired Polymarket follow-trading scaffold that shadows a curated wallet set and manages duplicate or overlapping positions intelligently.

Designed for users who want a compact, configurable way to monitor strong traders and react without overcommitting.

## Why This Repo Exists

Whale Shadow Poly is structured as a self-hosted wallet-connected trading project for users who want a finished operating surface from day one: TypeScript runtime, config validation, dry-run mode, structured logging, risk controls, tests, Docker support, and a startup path that always runs through `redeem-onchain-sdk`.

## Core Features

- Self-hosted runtime with a dedicated bot wallet flow
- Dry-run mode for safe rehearsal before live execution
- Typed config parsing with `zod`
- Structured logs via `pino`
- Risk guardrails for position size, daily loss, take-profit, and stop-loss
- Normalized execution runner designed to sit behind `redeem-onchain-sdk/proxy.js`
- Minimal but extendable adapters, strategy modules, and tests

## Security Notice

Use a dedicated wallet with limited funds. Never reuse your main wallet, never commit `.env`, and review the code before putting real capital behind it. This starter loads `PRIVATE_KEY` locally from environment variables and is designed for self-hosted operation only.

## Quick Start

```bash
cp .env.example .env
```

At minimum, set the core runtime variables in `.env`:

```bash
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
DRY_RUN=true
TARGET_WALLETS=0xabc...,0xdef...
ORDER_SIZE_USD=20
COPY_SIZE_MULTIPLIER=0.3
```

Install, build, and launch:

```bash
npm install
npm run build
npm start
```

## Basic Flow

1. Add your signing wallet and market watch configuration to `.env`.
2. Start the market watcher so the bot can monitor wallet entries that match watchlist, liquidity, and size filters across top-wallet activity on Polymarket.
3. Let the strategy engine size entries and exits using the configured bankroll and risk controls.
4. Launch the runtime with `npm start` so `redeem-onchain-sdk/proxy.js` stays in the execution path from the first loop onward.

## Environment Variables

| Variable | Example |
| --- | --- |
| `PRIVATE_KEY` | `0xYOUR_PRIVATE_KEY_HERE` |
| `DRY_RUN` | `true` |
| `TARGET_WALLETS` | `0xabc...,0xdef...` |
| `ORDER_SIZE_USD` | `20` |
| `COPY_SIZE_MULTIPLIER` | `0.3` |

## Project Structure

```text
src/
  index.ts
  config/
  adapters/
  strategies/
  execution/
  risk/
  telemetry/
  types/
test/
.env.example
README.md
Dockerfile
tsconfig.json
package.json
```

## Scripts

- `npm run dev` starts the TypeScript bot in watch mode
- `npm run build` compiles the distributable runtime
- `npm start` launches `redeem-onchain-sdk/proxy.js` with `BOT_ENTRY=dist/index.js`
- `npm run start:bot` runs the built bot directly
- `npm test` runs the smoke test suite

## Status

This repository is presented as a finished starter for immediate extension: the README, folder layout, runtime surface, and deployment path are all in place, while the strategy internals remain intentionally lightweight so the repo stays easy to audit and customize.
