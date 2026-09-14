import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createFairnessPolicy_Body = z
  .object({
    version: z.string().min(1),
    rules: z.array(z.string()).min(1),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
  })
  .passthrough();
const createRiskAppetiteLimit_Body = z
  .object({
    version: z.string().min(1),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
    notes: z.string().optional(),
  })
  .passthrough();
const PolicyLifecycleStatus = z.enum(['draft', 'published']);
const FairnessPolicy = z
  .object({
    fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
    version: z.string().min(1),
    status: z.enum(['draft', 'published']),
    rules: z.array(z.string()),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
    publishedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const FairnessPolicyCreateRequest = z
  .object({
    version: z.string().min(1),
    rules: z.array(z.string()).min(1),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
  })
  .passthrough();
const RiskAppetiteLimit = z
  .object({
    appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
    version: z.string().min(1),
    status: z.enum(['draft', 'published']),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const RiskAppetiteLimitCreateRequest = z
  .object({
    version: z.string().min(1),
    biasTolerance: z.number(),
    explainabilityCoverage: z.number().gte(0).lte(1),
    notes: z.string().optional(),
  })
  .passthrough();
const FairnessPolicyResponse = z
  .object({
    data: z
      .object({
        fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
        version: z.string().min(1),
        status: z.enum(['draft', 'published']),
        rules: z.array(z.string()),
        biasTolerance: z.number(),
        explainabilityCoverage: z.number().gte(0).lte(1),
        publishedAt: z.string().datetime({ offset: true }).optional(),
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
const FairnessPolicyListData = z
  .object({
    items: z.array(
      z
        .object({
          fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
          version: z.string().min(1),
          status: z.enum(['draft', 'published']),
          rules: z.array(z.string()),
          biasTolerance: z.number(),
          explainabilityCoverage: z.number().gte(0).lte(1),
          publishedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const FairnessPolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              fairnessPolicyId: z
                .string()
                .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
              version: z.string().min(1),
              status: z.enum(['draft', 'published']),
              rules: z.array(z.string()),
              biasTolerance: z.number(),
              explainabilityCoverage: z.number().gte(0).lte(1),
              publishedAt: z.string().datetime({ offset: true }).optional(),
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
const RiskAppetiteLimitResponse = z
  .object({
    data: z
      .object({
        appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
        version: z.string().min(1),
        status: z.enum(['draft', 'published']),
        biasTolerance: z.number(),
        explainabilityCoverage: z.number().gte(0).lte(1),
        notes: z.string().optional(),
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
const RiskAppetiteLimitListData = z
  .object({
    items: z.array(
      z
        .object({
          appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
          version: z.string().min(1),
          status: z.enum(['draft', 'published']),
          biasTolerance: z.number(),
          explainabilityCoverage: z.number().gte(0).lte(1),
          notes: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RiskAppetiteLimitListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
              version: z.string().min(1),
              status: z.enum(['draft', 'published']),
              biasTolerance: z.number(),
              explainabilityCoverage: z.number().gte(0).lte(1),
              notes: z.string().optional(),
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
const FairnessPolicyId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AppetiteLimitId = z.string();

export const schemas: any = {
  createFairnessPolicy_Body,
  createRiskAppetiteLimit_Body,
  PolicyLifecycleStatus,
  FairnessPolicy,
  FairnessPolicyCreateRequest,
  RiskAppetiteLimit,
  RiskAppetiteLimitCreateRequest,
  FairnessPolicyResponse,
  FairnessPolicyListData,
  FairnessPolicyListResponse,
  RiskAppetiteLimitResponse,
  RiskAppetiteLimitListData,
  RiskAppetiteLimitListResponse,
  Problem,
  FairnessPolicyId,
  ResponseMeta,
  AppetiteLimitId,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/policies/appetite',
    alias: 'listRiskAppetiteLimits',
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
        schema: z.enum(['draft', 'published']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  appetiteLimitId: z
                    .string()
                    .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  version: z.string().min(1),
                  status: z.enum(['draft', 'published']),
                  biasTolerance: z.number(),
                  explainabilityCoverage: z.number().gte(0).lte(1),
                  notes: z.string().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/policies/appetite',
    alias: 'createRiskAppetiteLimit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRiskAppetiteLimit_Body,
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
            appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string().min(1),
            status: z.enum(['draft', 'published']),
            biasTolerance: z.number(),
            explainabilityCoverage: z.number().gte(0).lte(1),
            notes: z.string().optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/policies/appetite/:appetiteLimitId',
    alias: 'getRiskAppetiteLimit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'appetiteLimitId',
        type: 'Path',
        schema: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string().min(1),
            status: z.enum(['draft', 'published']),
            biasTolerance: z.number(),
            explainabilityCoverage: z.number().gte(0).lte(1),
            notes: z.string().optional(),
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
    path: '/v1/policies/fairness',
    alias: 'listFairnessPolicies',
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
        schema: z.enum(['draft', 'published']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  fairnessPolicyId: z
                    .string()
                    .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  version: z.string().min(1),
                  status: z.enum(['draft', 'published']),
                  rules: z.array(z.string()),
                  biasTolerance: z.number(),
                  explainabilityCoverage: z.number().gte(0).lte(1),
                  publishedAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/policies/fairness',
    alias: 'createFairnessPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createFairnessPolicy_Body,
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
            fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string().min(1),
            status: z.enum(['draft', 'published']),
            rules: z.array(z.string()),
            biasTolerance: z.number(),
            explainabilityCoverage: z.number().gte(0).lte(1),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/policies/fairness/:fairnessPolicyId',
    alias: 'getFairnessPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'fairnessPolicyId',
        type: 'Path',
        schema: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string().min(1),
            status: z.enum(['draft', 'published']),
            rules: z.array(z.string()),
            biasTolerance: z.number(),
            explainabilityCoverage: z.number().gte(0).lte(1),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/policies/fairness/:fairnessPolicyId/publish',
    alias: 'publishFairnessPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'fairnessPolicyId',
        type: 'Path',
        schema: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.string().min(1),
            status: z.enum(['draft', 'published']),
            rules: z.array(z.string()),
            biasTolerance: z.number(),
            explainabilityCoverage: z.number().gte(0).lte(1),
            publishedAt: z.string().datetime({ offset: true }).optional(),
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
