import { logger } from "../telemetry/logger.js";
import { env } from "../config/env.js";

export async function connectWallet() {
  logger.info(
    {
      repo: "whale-shadow-poly",
      privateKeyLoaded: Boolean(env.PRIVATE_KEY),
    },
    "Wallet configuration loaded",
  );

  return {
    privateKey: env.PRIVATE_KEY,
    addressHint: env.PRIVATE_KEY.slice(0, 10),
  };
}
