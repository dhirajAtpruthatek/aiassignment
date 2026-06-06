import 'express';

declare module 'express-serve-static-core' {
  interface Response {
    success: (options?: {
      message?: string;
      data?: unknown;
      meta?: unknown;
      statusCode?: number;
    }) => void;
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
    }
  }
}

export {};
