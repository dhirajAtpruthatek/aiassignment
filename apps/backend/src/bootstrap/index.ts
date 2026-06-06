import databases from '../infra/db/index.js';
import { logger } from '../infra/logger/index.js';
import { JobBootstrap } from '../jobs/index.js';
import ShutdownManager from './shutdown.js';

/**
 * Bootstrap the application (dependencies)
 * ------------------------------------------
 * Call your extra services or setup here to be initialized first
 * @implements 1. DB connection.
 * @async
 */
export async function bootstrapApp() {
  logger.info('Bootstrapping service...');

  // Database connection with graceful shutdown

  await databases.mongo.connect();
  const shutdownManager = new ShutdownManager(logger);
  shutdownManager.register('mongodb', () => databases.mongo.disconnect());

  await JobBootstrap();

  logger.info('All dependencies initialized');
}
