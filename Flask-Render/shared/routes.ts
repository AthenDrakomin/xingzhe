import { z } from 'zod';
import { insertPromptSchema, prompts } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  prompts: {
    list: {
      method: 'GET' as const,
      path: '/api/prompts',
      responses: {
        200: z.array(z.custom<typeof prompts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/prompts/:id',
      responses: {
        200: z.custom<typeof prompts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/prompts',
      input: insertPromptSchema,
      responses: {
        201: z.custom<typeof prompts.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/prompts/:id',
      input: insertPromptSchema.partial(),
      responses: {
        200: z.custom<typeof prompts.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/prompts/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
