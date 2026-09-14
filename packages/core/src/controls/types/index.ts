/**
 * Controls Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/controls.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ControlTest = components["schemas"]["ControlTest"];
export type ControlTestListData = components["schemas"]["ControlTestListData"];
export type LineOfDefence = components["schemas"]["LineOfDefence"];
export type PromotionDecision = components["schemas"]["PromotionDecision"];
export type PromotionGate = components["schemas"]["PromotionGate"];
export type PromotionGateListData = components["schemas"]["PromotionGateListData"];
export type SandboxEvidence = components["schemas"]["SandboxEvidence"];
export type SandboxEvidenceListData = components["schemas"]["SandboxEvidenceListData"];
export type ControlTestCreateRequest = components["schemas"]["ControlTestCreateRequest"];
export type PromotionGateEvaluateRequest = components["schemas"]["PromotionGateEvaluateRequest"];
export type SandboxEvidenceCreateRequest = components["schemas"]["SandboxEvidenceCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateControlTestRequestInput = NonNullable<operations["createControlTest"]["requestBody"]>["content"]["application/json"];
export type EvaluatePromotionGateRequestInput = NonNullable<operations["evaluatePromotionGate"]["requestBody"]>["content"]["application/json"];
export type CreateSandboxEvidenceRequestInput = NonNullable<operations["createSandboxEvidence"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListControlTestsParams = NonNullable<operations["listControlTests"]["parameters"]["query"]>;
export type CreateControlTestParams = operations["createControlTest"]["parameters"]["path"];
export type GetControlTestParams = operations["getControlTest"]["parameters"]["path"];
export type ListPromotionGatesParams = NonNullable<operations["listPromotionGates"]["parameters"]["query"]>;
export type EvaluatePromotionGateParams = operations["evaluatePromotionGate"]["parameters"]["path"];
export type ListSandboxEvidenceParams = NonNullable<operations["listSandboxEvidence"]["parameters"]["query"]>;
export type CreateSandboxEvidenceParams = operations["createSandboxEvidence"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListControlTestsResponse = operations["listControlTests"]["responses"]["200"]["content"]["application/json"];
export type CreateControlTestResponse = operations["createControlTest"]["responses"]["201"]["content"]["application/json"];
export type GetControlTestResponse = operations["getControlTest"]["responses"]["200"]["content"]["application/json"];
export type ListPromotionGatesResponse = operations["listPromotionGates"]["responses"]["200"]["content"]["application/json"];
export type EvaluatePromotionGateResponse = operations["evaluatePromotionGate"]["responses"]["200"]["content"]["application/json"];
export type ListSandboxEvidenceResponse = operations["listSandboxEvidence"]["responses"]["200"]["content"]["application/json"];
export type CreateSandboxEvidenceResponse = operations["createSandboxEvidence"]["responses"]["201"]["content"]["application/json"];


