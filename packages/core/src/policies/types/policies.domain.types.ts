/**
 * Policies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policies.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FairnessPolicy = components["schemas"]["FairnessPolicy"];
export type FairnessPolicyListData = components["schemas"]["FairnessPolicyListData"];
export type PolicyLifecycleStatus = components["schemas"]["PolicyLifecycleStatus"];
export type RiskAppetiteLimit = components["schemas"]["RiskAppetiteLimit"];
export type RiskAppetiteLimitListData = components["schemas"]["RiskAppetiteLimitListData"];
export type FairnessPolicyCreateRequest = components["schemas"]["FairnessPolicyCreateRequest"];
export type RiskAppetiteLimitCreateRequest = components["schemas"]["RiskAppetiteLimitCreateRequest"];
export type Fairness = operations["listFairnessPolicies"]["responses"]["200"]["content"]["application/json"]["data"];
export type Appetite = operations["listRiskAppetiteLimits"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateFairnessPolicyRequestInput = NonNullable<operations["createFairnessPolicy"]["requestBody"]>["content"]["application/json"];
export type CreateRiskAppetiteLimitRequestInput = NonNullable<operations["createRiskAppetiteLimit"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFairnessPoliciesParams = NonNullable<operations["listFairnessPolicies"]["parameters"]["query"]>;
export type GetFairnessPolicyParams = operations["getFairnessPolicy"]["parameters"]["path"];
export type PublishFairnessPolicyParams = operations["publishFairnessPolicy"]["parameters"]["path"];
export type ListRiskAppetiteLimitsParams = NonNullable<operations["listRiskAppetiteLimits"]["parameters"]["query"]>;
export type GetRiskAppetiteLimitParams = operations["getRiskAppetiteLimit"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFairnessPoliciesResponse = operations["listFairnessPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateFairnessPolicyResponse = operations["createFairnessPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetFairnessPolicyResponse = operations["getFairnessPolicy"]["responses"]["200"]["content"]["application/json"];
export type PublishFairnessPolicyResponse = operations["publishFairnessPolicy"]["responses"]["200"]["content"]["application/json"];
export type ListRiskAppetiteLimitsResponse = operations["listRiskAppetiteLimits"]["responses"]["200"]["content"]["application/json"];
export type CreateRiskAppetiteLimitResponse = operations["createRiskAppetiteLimit"]["responses"]["201"]["content"]["application/json"];
export type GetRiskAppetiteLimitResponse = operations["getRiskAppetiteLimit"]["responses"]["200"]["content"]["application/json"];


