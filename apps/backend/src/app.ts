import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { responseFormatter } from "./middlewares/response-formater/responseFormater.js";
import { requestIdMiddleware } from "./middlewares/response-formater/requestId.middleware.js";
import { requestLogger } from "./middlewares/response-formater/requestLogger.js";
import { globalErrorHandler } from "./middlewares/system/errorHandler.js";
import { NotFoundError } from "./utils/error-handling/CustomError.js";
import todoContainer from './services/todo/index.js'
import assessmentContainer from './services/assessment/index.js'
import assignmentContainer from './services/assignment/index.js'
import uploadContainer from './services/upload/index.js'
import path from "path";

export function createApp() {
  const app: Express = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(compression());
  app.use(morgan("dev"));

  app.use(requestIdMiddleware);
  app.use(requestLogger);
  app.use(responseFormatter);
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  
  // app.use("/health", healthRoutes);
  // custom routes

  // Main Route Mapping
  app.use("/test", todoContainer.init().routes.todoRoutes);
  app.use("/assessment", assessmentContainer.init().routes.assessmentRoutes);
  app.use("/assignment", assignmentContainer.init().routes.assignmentRoutes);
  app.use("/upload", uploadContainer.init().routes.uploadRoutes);

  app.use((req, res, next) => {
    next(NotFoundError(`Route ${req.originalUrl} not found`));
  });

  app.use(globalErrorHandler);

  return app;
}
