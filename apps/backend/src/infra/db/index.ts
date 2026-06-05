import { createMongooseDB } from "./transports/mongoose.db.js";
import { logger } from "../logger/index.js";

export const databases = {
  mongo: createMongooseDB({
    logger,
    uri: process.env.MONGODB_URI as string, // adjust based on your config
    dbName: "ai-assistant",
  }),
};

export type Databases = typeof databases;

export default databases;
