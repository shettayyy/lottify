import express, { Express } from 'express';

import initializeMiddlewares from '@/middleware';

const app: Express = express();

////////////////////////////////////////
// Middlewares
////////////////////////////////////////
initializeMiddlewares(app);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

export { app };
