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
