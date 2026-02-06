import { z } from 'zod';
import { insertSiteContentSchema, siteContent } from './schema';

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
  siteContent: {
    get: {
      method: 'GET' as const,
      path: '/api/site-content',
      responses: {
        200: z.custom<typeof siteContent.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/site-content',
      input: insertSiteContentSchema.partial(),
      responses: {
        200: z.custom<typeof siteContent.$inferSelect>(),
        400: errorSchemas.validation,
        401: z.object({ message: z.string() }), // Unauthorized
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

export type SiteContentInput = z.infer<typeof api.siteContent.update.input>;
export type SiteContentResponse = z.infer<typeof api.siteContent.get.responses[200]>;
