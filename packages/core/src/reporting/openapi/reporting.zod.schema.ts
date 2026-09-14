import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAuditExport_Body = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    useCaseIds: z
      .array(z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const AuditExportStatus = z.enum(['queued', 'running', 'done', 'failed']);
const AuditExport = z
  .object({
    reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    useCaseIds: z.array(z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)),
    status: z.enum(['queued', 'running', 'done', 'failed']),
    downloadUrl: z.string().url().optional(),
    summary: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuditExportCreateRequest = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    useCaseIds: z
      .array(z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const AuditExportResponse = z
  .object({
    data: z
      .object({
        reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        useCaseIds: z.array(z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)),
        status: z.enum(['queued', 'running', 'done', 'failed']),
        downloadUrl: z.string().url().optional(),
        summary: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AuditExportListData = z
  .object({
    items: z.array(
      z
        .object({
          reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          useCaseIds: z.array(z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)),
          status: z.enum(['queued', 'running', 'done', 'failed']),
          downloadUrl: z.string().url().optional(),
          summary: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AuditExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              useCaseIds: z.array(
                z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)
              ),
              status: z.enum(['queued', 'running', 'done', 'failed']),
              downloadUrl: z.string().url().optional(),
              summary: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ReportId = z.string();
const UseCaseId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createAuditExport_Body,
  AuditExportStatus,
  AuditExport,
  AuditExportCreateRequest,
  AuditExportResponse,
  AuditExportListData,
  AuditExportListResponse,
  Problem,
  ReportId,
  UseCaseId,
  ResponseMeta,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/reporting/exports',
    alias: 'listAuditExports',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().min(1).max(512).optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['queued', 'running', 'done', 'failed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  useCaseIds: z.array(
                    z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)
                  ),
                  status: z.enum(['queued', 'running', 'done', 'failed']),
                  downloadUrl: z.string().url().optional(),
                  summary: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/reporting/exports',
    alias: 'createAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAuditExport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            useCaseIds: z.array(
              z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            downloadUrl: z.string().url().optional(),
            summary: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/reporting/exports/:reportId',
    alias: 'getAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'reportId',
        type: 'Path',
        schema: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            reportId: z.string().regex(/^rpt_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            useCaseIds: z.array(
              z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)
            ),
            status: z.enum(['queued', 'running', 'done', 'failed']),
            downloadUrl: z.string().url().optional(),
            summary: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
