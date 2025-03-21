import { z } from 'zod';

export const idSchema = z.object({
  id: z.union([z.string().min(1), z.number().positive()]),
});

export const paginationSchema = z.object({
  page: z.coerce.number().positive().optional().default(1),
  limit: z.coerce.number().positive().max(100).optional().default(20),
});

export const exampleEntitySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').optional(),
  active: z.boolean().optional(),
});
