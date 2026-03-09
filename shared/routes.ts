import { z } from 'zod';
import { insertCreditAssessmentSchema, creditAssessments } from './schema';

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
  assessments: {
    list: {
      method: 'GET' as const,
      path: '/api/assessments' as const,
      responses: {
        200: z.array(z.custom<typeof creditAssessments.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/assessments/:id' as const,
      responses: {
        200: z.custom<typeof creditAssessments.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/assessments' as const,
      input: insertCreditAssessmentSchema,
      responses: {
        201: z.custom<typeof creditAssessments.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/assessments/:id' as const,
      input: insertCreditAssessmentSchema.partial(),
      responses: {
        200: z.custom<typeof creditAssessments.$inferSelect>(),
        400: errorSchemas.validation,
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

export type AssessmentInput = z.infer<typeof api.assessments.create.input>;
export type AssessmentResponse = z.infer<typeof api.assessments.create.responses[201]>;
export type AssessmentUpdateInput = z.infer<typeof api.assessments.update.input>;
export type AssessmentsListResponse = z.infer<typeof api.assessments.list.responses[200]>;
