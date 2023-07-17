import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, error_logger } from './shared/logger';
import { Server } from 'http';

const { port, database_url } = config;
let server: Server;
process.on('uncaughtException', err => {
  error_logger.error('uncaught detected', err);
  process.exit(1);
});

async function justGo() {
  try {
    await mongoose.connect(database_url as string);
    logger.info('\nDatabase is Connected successfully\n');
    app.listen(port, () => {
      logger.info(`University Application is listening on port ${port}\n`);
    });
  } catch (error) {
    error_logger.error('Failed to connect database', error);
  }

  process.on('unhandledRejection', err => {
    console.log(
      'unhandled rejection detected! we are closing the server........'
    );
    if (server) {
      server.close(() => {
        error_logger.error('unhandled rejection', err);
      });
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}

justGo();

process.on('SIGTERM', () => {
  logger.info('SIGTERM Received');
  if (server) {
    server.close();
  }
});
