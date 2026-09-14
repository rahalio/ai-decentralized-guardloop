import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const raiseMonitorAlert_Body = z
  .object({
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    detail: z.string().optional(),
  })
  .passthrough();
const AlertKind = z.enum(['drift', 'bias', 'driver_shift', 'conduct']);
const AlertSeverity = z.enum(['low', 'medium', 'high', 'critical']);
const AlertStatus = z.enum(['open', 'acknowledged', 'closed']);
const MonitorAlert = z
  .object({
    alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    detail: z.string().optional(),
    status: z.enum(['open', 'acknowledged', 'closed']),
    raisedAt: z.string().datetime({ offset: true }),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const MonitorAlertRaiseRequest = z
  .object({
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    detail: z.string().optional(),
  })
  .passthrough();
const MonitorAlertResponse = z
  .object({
    data: z
      .object({
        alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
        kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        detail: z.string().optional(),
        status: z.enum(['open', 'acknowledged', 'closed']),
        raisedAt: z.string().datetime({ offset: true }),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
const MonitorAlertListData = z
  .object({
    items: z.array(
      z
        .object({
          alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
          kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          detail: z.string().optional(),
          status: z.enum(['open', 'acknowledged', 'closed']),
          raisedAt: z.string().datetime({ offset: true }),
          acknowledgedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const MonitorAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
              kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
              severity: z.enum(['low', 'medium', 'high', 'critical']),
              detail: z.string().optional(),
              status: z.enum(['open', 'acknowledged', 'closed']),
              raisedAt: z.string().datetime({ offset: true }),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
const UseCaseId = z.string();
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
const AlertId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  raiseMonitorAlert_Body,
  AlertKind,
  AlertSeverity,
  AlertStatus,
  MonitorAlert,
  MonitorAlertRaiseRequest,
  MonitorAlertResponse,
  MonitorAlertListData,
  MonitorAlertListResponse,
  UseCaseId,
  Problem,
  AlertId,
  ResponseMeta,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/monitoring/alerts',
    alias: 'listMonitorAlerts',
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
        name: 'useCaseId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'acknowledged', 'closed']).optional(),
      },
      {
        name: 'kind',
        type: 'Query',
        schema: z.enum(['drift', 'bias', 'driver_shift', 'conduct']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
                  severity: z.enum(['low', 'medium', 'high', 'critical']),
                  detail: z.string().optional(),
                  status: z.enum(['open', 'acknowledged', 'closed']),
                  raisedAt: z.string().datetime({ offset: true }),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/monitoring/alerts',
    alias: 'raiseMonitorAlert',
    description: `Ingest path for monitoring pipelines; accepts API key or bearer.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: raiseMonitorAlert_Body,
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
            alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            detail: z.string().optional(),
            status: z.enum(['open', 'acknowledged', 'closed']),
            raisedAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/monitoring/alerts/:alertId',
    alias: 'getMonitorAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            detail: z.string().optional(),
            status: z.enum(['open', 'acknowledged', 'closed']),
            raisedAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/monitoring/alerts/:alertId/acknowledge',
    alias: 'acknowledgeMonitorAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            alertId: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum(['drift', 'bias', 'driver_shift', 'conduct']),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            detail: z.string().optional(),
            status: z.enum(['open', 'acknowledged', 'closed']),
            raisedAt: z.string().datetime({ offset: true }),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
