import type { Context, Next } from 'koa';
import logger from '../config/logger';
import { AppError, STATUS_CODE } from '../errors/AppError';

export const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof AppError) {
      logger.warn(
        {
          error: err.message,
          statusCode: err.statusCode,
          path: ctx.path,
          method: ctx.method,
          requestId: ctx.request.headers['x-request-id'] || 'unknown',
        },
        `AppError: ${err.message}`
      );

      ctx.status = err.statusCode;
      ctx.body = {
        error: err.message,
      };
      return;
    }

    // Handle unexpected errors
    const error = err as Error;
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        path: ctx.path,
        method: ctx.method,
        requestId: ctx.request.headers['x-request-id'] || 'unknown',
      },
      `Unexpected error: ${error.message}`
    );

    ctx.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = {
      error: 'Internal server error',
    };
  }
};
