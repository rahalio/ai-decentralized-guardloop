import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerAiUseCase_Body = z
  .object({
    name: z.string().min(1),
    customerImpacting: z.boolean(),
    sector: z.enum(['insurance', 'banking', 'other']).optional(),
    learningCadenceDays: z.number().int().gte(1).optional(),
  })
  .passthrough();
const updateAiUseCase_Body = z
  .object({
    name: z.string().min(1),
    customerImpacting: z.boolean(),
    sector: z.enum(['insurance', 'banking', 'other']),
    learningCadenceDays: z.number().int().gte(1),
    status: z.enum(['draft', 'active', 'expanding', 'retired']),
  })
  .partial()
  .passthrough();
const bindFairnessPolicy_Body = z
  .object({
    fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
    appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
  })
  .passthrough();
const UseCaseSector = z.enum(['insurance', 'banking', 'other']);
const UseCaseStatus = z.enum(['draft', 'active', 'expanding', 'retired']);
const AiUseCase = z
  .object({
    useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1),
    customerImpacting: z.boolean(),
    sector: z.enum(['insurance', 'banking', 'other']).optional(),
    status: z.enum(['draft', 'active', 'expanding', 'retired']),
    learningCadenceDays: z.number().int().gte(1).optional(),
    boundFairnessPolicyId: z
      .string()
      .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    boundAppetiteLimitId: z
      .string()
      .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AiUseCaseCreateRequest = z
  .object({
    name: z.string().min(1),
    customerImpacting: z.boolean(),
    sector: z.enum(['insurance', 'banking', 'other']).optional(),
    learningCadenceDays: z.number().int().gte(1).optional(),
  })
  .passthrough();
const AiUseCaseUpdateRequest = z
  .object({
    name: z.string().min(1),
    customerImpacting: z.boolean(),
    sector: z.enum(['insurance', 'banking', 'other']),
    learningCadenceDays: z.number().int().gte(1),
    status: z.enum(['draft', 'active', 'expanding', 'retired']),
  })
  .partial()
  .passthrough();
const BindFairnessPolicyRequest = z
  .object({
    fairnessPolicyId: z.string().regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/),
    appetiteLimitId: z.string().regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/),
  })
  .passthrough();
const AiUseCaseResponse = z
  .object({
    data: z
      .object({
        useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1),
        customerImpacting: z.boolean(),
        sector: z.enum(['insurance', 'banking', 'other']).optional(),
        status: z.enum(['draft', 'active', 'expanding', 'retired']),
        learningCadenceDays: z.number().int().gte(1).optional(),
        boundFairnessPolicyId: z
          .string()
          .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        boundAppetiteLimitId: z
          .string()
          .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
const AiUseCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1),
          customerImpacting: z.boolean(),
          sector: z.enum(['insurance', 'banking', 'other']).optional(),
          status: z.enum(['draft', 'active', 'expanding', 'retired']),
          learningCadenceDays: z.number().int().gte(1).optional(),
          boundFairnessPolicyId: z
            .string()
            .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          boundAppetiteLimitId: z
            .string()
            .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AiUseCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1),
              customerImpacting: z.boolean(),
              sector: z.enum(['insurance', 'banking', 'other']).optional(),
              status: z.enum(['draft', 'active', 'expanding', 'retired']),
              learningCadenceDays: z.number().int().gte(1).optional(),
              boundFairnessPolicyId: z
                .string()
                .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              boundAppetiteLimitId: z
                .string()
                .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
const UseCaseId = z.string();
const FairnessPolicyId = z.string();
const AppetiteLimitId = z.string();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  registerAiUseCase_Body,
  updateAiUseCase_Body,
  bindFairnessPolicy_Body,
  UseCaseSector,
  UseCaseStatus,
  AiUseCase,
  AiUseCaseCreateRequest,
  AiUseCaseUpdateRequest,
  BindFairnessPolicyRequest,
  AiUseCaseResponse,
  AiUseCaseListData,
  AiUseCaseListResponse,
  Problem,
  UseCaseId,
  FairnessPolicyId,
  AppetiteLimitId,
  ResponseMeta,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/use-cases',
    alias: 'listAiUseCases',
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
        schema: z.enum(['draft', 'active', 'expanding', 'retired']).optional(),
      },
      {
        name: 'customerImpacting',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1),
                  customerImpacting: z.boolean(),
                  sector: z.enum(['insurance', 'banking', 'other']).optional(),
                  status: z.enum(['draft', 'active', 'expanding', 'retired']),
                  learningCadenceDays: z.number().int().gte(1).optional(),
                  boundFairnessPolicyId: z
                    .string()
                    .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  boundAppetiteLimitId: z
                    .string()
                    .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  lastIdentifyAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/use-cases',
    alias: 'registerAiUseCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerAiUseCase_Body,
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
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            customerImpacting: z.boolean(),
            sector: z.enum(['insurance', 'banking', 'other']).optional(),
            status: z.enum(['draft', 'active', 'expanding', 'retired']),
            learningCadenceDays: z.number().int().gte(1).optional(),
            boundFairnessPolicyId: z
              .string()
              .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            boundAppetiteLimitId: z
              .string()
              .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'get',
    path: '/v1/use-cases/:useCaseId',
    alias: 'getAiUseCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'useCaseId',
        type: 'Path',
        schema: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            customerImpacting: z.boolean(),
            sector: z.enum(['insurance', 'banking', 'other']).optional(),
            status: z.enum(['draft', 'active', 'expanding', 'retired']),
            learningCadenceDays: z.number().int().gte(1).optional(),
            boundFairnessPolicyId: z
              .string()
              .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            boundAppetiteLimitId: z
              .string()
              .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/use-cases/:useCaseId',
    alias: 'updateAiUseCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateAiUseCase_Body,
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
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            customerImpacting: z.boolean(),
            sector: z.enum(['insurance', 'banking', 'other']).optional(),
            status: z.enum(['draft', 'active', 'expanding', 'retired']),
            learningCadenceDays: z.number().int().gte(1).optional(),
            boundFairnessPolicyId: z
              .string()
              .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            boundAppetiteLimitId: z
              .string()
              .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/use-cases/:useCaseId/bind-policy',
    alias: 'bindFairnessPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: bindFairnessPolicy_Body,
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
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            customerImpacting: z.boolean(),
            sector: z.enum(['insurance', 'banking', 'other']).optional(),
            status: z.enum(['draft', 'active', 'expanding', 'retired']),
            learningCadenceDays: z.number().int().gte(1).optional(),
            boundFairnessPolicyId: z
              .string()
              .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            boundAppetiteLimitId: z
              .string()
              .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/use-cases/:useCaseId/expand-to-customer',
    alias: 'expandUseCaseToCustomer',
    description: `Forces re-Identify gate before customer impact (BR-11).`,
    requestFormat: 'json',
    parameters: [
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
            useCaseId: z.string().regex(/^usc_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1),
            customerImpacting: z.boolean(),
            sector: z.enum(['insurance', 'banking', 'other']).optional(),
            status: z.enum(['draft', 'active', 'expanding', 'retired']),
            learningCadenceDays: z.number().int().gte(1).optional(),
            boundFairnessPolicyId: z
              .string()
              .regex(/^fpol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            boundAppetiteLimitId: z
              .string()
              .regex(/^apl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            lastIdentifyAt: z.string().datetime({ offset: true }).optional(),
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
