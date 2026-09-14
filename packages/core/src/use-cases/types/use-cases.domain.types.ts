/**
 * Use Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/use-cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AiUseCase = components["schemas"]["AiUseCase"];
export type AiUseCaseListData = components["schemas"]["AiUseCaseListData"];
export type UseCaseSector = components["schemas"]["UseCaseSector"];
export type UseCaseStatus = components["schemas"]["UseCaseStatus"];
export type AiUseCaseCreateRequest = components["schemas"]["AiUseCaseCreateRequest"];
export type AiUseCaseUpdateRequest = components["schemas"]["AiUseCaseUpdateRequest"];
export type BindFairnessPolicyRequest = components["schemas"]["BindFairnessPolicyRequest"];
export type UseCase = operations["listAiUseCases"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterAiUseCaseRequestInput = NonNullable<operations["registerAiUseCase"]["requestBody"]>["content"]["application/json"];
export type UpdateAiUseCaseRequestInput = NonNullable<operations["updateAiUseCase"]["requestBody"]>["content"]["application/json"];
export type UpdateAiUseCaseRequest = UpdateAiUseCaseRequestInput;
export type BindFairnessPolicyRequestInput = NonNullable<operations["bindFairnessPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAiUseCasesParams = NonNullable<operations["listAiUseCases"]["parameters"]["query"]>;
export type GetAiUseCaseParams = operations["getAiUseCase"]["parameters"]["path"];
export type UpdateAiUseCaseParams = operations["updateAiUseCase"]["parameters"]["path"];
export type BindFairnessPolicyParams = operations["bindFairnessPolicy"]["parameters"]["path"];
export type ExpandUseCaseToCustomerParams = operations["expandUseCaseToCustomer"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAiUseCasesResponse = operations["listAiUseCases"]["responses"]["200"]["content"]["application/json"];
export type RegisterAiUseCaseResponse = operations["registerAiUseCase"]["responses"]["201"]["content"]["application/json"];
export type GetAiUseCaseResponse = operations["getAiUseCase"]["responses"]["200"]["content"]["application/json"];
export type UpdateAiUseCaseResponse = operations["updateAiUseCase"]["responses"]["200"]["content"]["application/json"];
export type BindFairnessPolicyResponse = operations["bindFairnessPolicy"]["responses"]["200"]["content"]["application/json"];
export type ExpandUseCaseToCustomerResponse = operations["expandUseCaseToCustomer"]["responses"]["200"]["content"]["application/json"];


