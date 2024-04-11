import { env } from '@/config/env-config';
import { httpServer } from '@/server';

const server = httpServer.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
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
