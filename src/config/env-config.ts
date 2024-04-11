import 'dotenv/config';

import { cleanEnv, host, num, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num(),
  COMMON_RATE_LIMIT_WINDOW_MS: num(),
});
