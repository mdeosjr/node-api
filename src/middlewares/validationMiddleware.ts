import type { Context, Next } from 'koa';
import { z } from 'zod';
import { AppError, STATUS_CODE } from '../errors/AppError';

/**
 * Middleware para validar o corpo da requisição usando Zod
 *
 * @param schema Schema Zod para validação
 */
export const validateBody = (schema: z.ZodType) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      // Validar o corpo da requisição
      const data = ctx.request.body;
      ctx.request.body = await schema.parseAsync(data);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Formatar mensagens de erro do Zod
        const messages = errorMessages(error.errors);

        throw new AppError(messages, STATUS_CODE.BAD_REQUEST);
      }
      throw error;
    }
  };
};

/**
 * Middleware para validar parâmetros da URL usando Zod
 *
 * @param schema Schema Zod para validação
 */
export const validateParams = (schema: z.ZodType) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      // Validar os parâmetros da URL
      ctx.params = await schema.parseAsync(ctx.params);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = errorMessages(error.errors);

        throw new AppError(messages, STATUS_CODE.BAD_REQUEST);
      }
      throw error;
    }
  };
};

/**
 * Middleware para validar parâmetros de consulta usando Zod
 *
 * @param schema Schema Zod para validação
 */
export const validateQuery = (schema: z.ZodType) => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      // Validar os parâmetros de consulta
      ctx.query = await schema.parseAsync(ctx.query);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = errorMessages(error.errors);

        throw new AppError(messages, STATUS_CODE.BAD_REQUEST);
      }
      throw error;
    }
  };
};

const errorMessages = (errors: z.ZodIssue[]) => {
  return errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('; ');
};
