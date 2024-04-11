import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';

import { env } from '@/config/env-config';

const rateLimiter = rateLimit({
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
