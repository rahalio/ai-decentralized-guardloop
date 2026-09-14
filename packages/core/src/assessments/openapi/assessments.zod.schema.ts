import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createRiskIdentification_Body = z
  .object({
    scope: z.enum(['use_case', 'org_wide']),
    triggers: z.array(z.string()).min(1),
    findings: z.array(z.string()).min(1),
    owner: z.string().optional(),
  })
  .passthrough();
const createRiskAssessment_Body = z
  .object({
    identificationId: z
      .string()
      .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    technicalFindings: z.array(z.string()).min(1),
    conductFindings: z.array(z.string()).min(1),
    residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['draft', 'complete']).optional(),
  })
  .passthrough();
const IdentificationScope = z.enum(['use_case', 'org_wide']);
const IdentificationStatus = z.enum(['open', 'closed']);
const ResidualRisk = z.enum(['low', 'medium', 'high', 'critical']);
const AssessmentStatus = z.enum(['draft', 'complete']);
const RiskIdentification = z
  .object({
    identificationId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    scope: z.enum(['use_case', 'org_wide']),
    triggers: z.array(z.string()),
    findings: z.array(z.string()),
    owner: z.string().optional(),
    status: z.enum(['open', 'closed']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const RiskIdentificationCreateRequest = z
  .object({
    scope: z.enum(['use_case', 'org_wide']),
    triggers: z.array(z.string()).min(1),
    findings: z.array(z.string()).min(1),
    owner: z.string().optional(),
  })
  .passthrough();
const RiskAssessment = z
  .object({
    assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    identificationId: z
      .string()
      .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    technicalFindings: z.array(z.string()),
    conductFindings: z.array(z.string()),
    residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['draft', 'complete']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const RiskAssessmentCreateRequest = z
  .object({
    identificationId: z
      .string()
      .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    technicalFindings: z.array(z.string()).min(1),
    conductFindings: z.array(z.string()).min(1),
    residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['draft', 'complete']).optional(),
  })
  .passthrough();
const RiskIdentificationResponse = z
  .object({
    data: z
      .object({
        identificationId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
        scope: z.enum(['use_case', 'org_wide']),
        triggers: z.array(z.string()),
        findings: z.array(z.string()),
        owner: z.string().optional(),
        status: z.enum(['open', 'closed']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const RiskIdentificationListData = z
  .object({
    items: z.array(
      z
        .object({
          identificationId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
          scope: z.enum(['use_case', 'org_wide']),
          triggers: z.array(z.string()),
          findings: z.array(z.string()),
          owner: z.string().optional(),
          status: z.enum(['open', 'closed']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RiskIdentificationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              identificationId: z
                .string()
                .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
              scope: z.enum(['use_case', 'org_wide']),
              triggers: z.array(z.string()),
              findings: z.array(z.string()),
              owner: z.string().optional(),
              status: z.enum(['open', 'closed']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const RiskAssessmentResponse = z
  .object({
    data: z
      .object({
        assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
        useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
        identificationId: z
          .string()
          .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        technicalFindings: z.array(z.string()),
        conductFindings: z.array(z.string()),
        residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
        status: z.enum(['draft', 'complete']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
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
const RiskAssessmentListData = z
  .object({
    items: z.array(
      z
        .object({
          assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
          useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
          identificationId: z
            .string()
            .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          technicalFindings: z.array(z.string()),
          conductFindings: z.array(z.string()),
          residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
          status: z.enum(['draft', 'complete']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RiskAssessmentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
              useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
              identificationId: z
                .string()
                .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              technicalFindings: z.array(z.string()),
              conductFindings: z.array(z.string()),
              residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
              status: z.enum(['draft', 'complete']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
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
const IdentificationId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AssessmentId = z.string();

export const schemas: any = {
  createRiskIdentification_Body,
  createRiskAssessment_Body,
  IdentificationScope,
  IdentificationStatus,
  ResidualRisk,
  AssessmentStatus,
  RiskIdentification,
  RiskIdentificationCreateRequest,
  RiskAssessment,
  RiskAssessmentCreateRequest,
  RiskIdentificationResponse,
  RiskIdentificationListData,
  RiskIdentificationListResponse,
  RiskAssessmentResponse,
  RiskAssessmentListData,
  RiskAssessmentListResponse,
  UseCaseId,
  Problem,
  IdentificationId,
  ResponseMeta,
  AssessmentId,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/use-cases/:useCaseId/assessments',
    alias: 'listRiskAssessments',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
        schema: z.enum(['draft', 'complete']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  assessmentId: z
                    .string()
                    .regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  identificationId: z
                    .string()
                    .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  technicalFindings: z.array(z.string()),
                  conductFindings: z.array(z.string()),
                  residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
                  status: z.enum(['draft', 'complete']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/use-cases/:useCaseId/assessments',
    alias: 'createRiskAssessment',
    description: `Requires both technicalFindings and conductFindings — accuracy alone is insufficient (BR-5).`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRiskAssessment_Body,
      },
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            identificationId: z
              .string()
              .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            technicalFindings: z.array(z.string()),
            conductFindings: z.array(z.string()),
            residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['draft', 'complete']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/use-cases/:useCaseId/assessments/:assessmentId',
    alias: 'getRiskAssessment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'assessmentId',
        type: 'Path',
        schema: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            assessmentId: z.string().regex(/^ras_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            identificationId: z
              .string()
              .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            technicalFindings: z.array(z.string()),
            conductFindings: z.array(z.string()),
            residualRisk: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['draft', 'complete']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/use-cases/:useCaseId/identifications',
    alias: 'listRiskIdentifications',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
        schema: z.enum(['open', 'closed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  identificationId: z
                    .string()
                    .regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
                  useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  scope: z.enum(['use_case', 'org_wide']),
                  triggers: z.array(z.string()),
                  findings: z.array(z.string()),
                  owner: z.string().optional(),
                  status: z.enum(['open', 'closed']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/use-cases/:useCaseId/identifications',
    alias: 'createRiskIdentification',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRiskIdentification_Body,
      },
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            identificationId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            scope: z.enum(['use_case', 'org_wide']),
            triggers: z.array(z.string()),
            findings: z.array(z.string()),
            owner: z.string().optional(),
            status: z.enum(['open', 'closed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/use-cases/:useCaseId/identifications/:identificationId',
    alias: 'getRiskIdentification',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'identificationId',
        type: 'Path',
        schema: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            identificationId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            scope: z.enum(['use_case', 'org_wide']),
            triggers: z.array(z.string()),
            findings: z.array(z.string()),
            owner: z.string().optional(),
            status: z.enum(['open', 'closed']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
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
