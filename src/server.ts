import express, { Express } from 'express';
import http from 'http';

import initializeMiddlewares from '@/middleware';

const app: Express = express();
const httpServer = http.createServer(app);

////////////////////////////////////////
// Middlewares
////////////////////////////////////////
initializeMiddlewares(app, httpServer);

export { app, httpServer };
