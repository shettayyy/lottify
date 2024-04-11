import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';

import errorHandler from './error-handler';
import rateLimiter from './rate-limiter';
import requestLogger from './request-logger';

export default function initializeMiddlewares(app: Application) {
  // Set the application to trust the reverse proxy
  app.set('trust proxy', true);

  // General middlewares
  app.use(helmet());
  app.use(rateLimiter);
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use(errorHandler);
}
