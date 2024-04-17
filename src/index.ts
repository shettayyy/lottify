import express, { Express } from 'express';
import http from 'http';

import { env } from '@/config/env';
import initializeMiddlewares from '@/middleware';

const app: Express = express();
const httpServer = http.createServer(app);

const startServer = async () => {
  try {
    await initializeMiddlewares(app, httpServer);

    const server = httpServer.listen(3000, () => {
      const { NODE_ENV } = env;
      console.info(`Server (${NODE_ENV}) running on port 3000`);
    });

    // Graceful shutdown
    const onCloseSignal = () => {
      console.info('sigint received, shutting down');
      server.close(() => {
        console.info('server closed');
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);
  } catch (error) {
    console.error('Error initializing middlewares', error);
  }
};

startServer();
