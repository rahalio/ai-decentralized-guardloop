/**
 * Remediations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/remediations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type RemediationCase = components["schemas"]["RemediationCase"];
export type RemediationCaseListData = components["schemas"]["RemediationCaseListData"];
export type RemediationStatus = components["schemas"]["RemediationStatus"];
export type RemediationCaseCreateRequest = components["schemas"]["RemediationCaseCreateRequest"];
export type RemediationCaseUpdateRequest = components["schemas"]["RemediationCaseUpdateRequest"];
export type Remediation = operations["listRemediations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenRemediationRequestInput = NonNullable<operations["openRemediation"]["requestBody"]>["content"]["application/json"];
export type UpdateRemediationRequestInput = NonNullable<operations["updateRemediation"]["requestBody"]>["content"]["application/json"];
export type UpdateRemediationRequest = UpdateRemediationRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRemediationsParams = NonNullable<operations["listRemediations"]["parameters"]["query"]>;
export type GetRemediationParams = operations["getRemediation"]["parameters"]["path"];
export type UpdateRemediationParams = operations["updateRemediation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRemediationsResponse = operations["listRemediations"]["responses"]["200"]["content"]["application/json"];
export type OpenRemediationResponse = operations["openRemediation"]["responses"]["201"]["content"]["application/json"];
export type GetRemediationResponse = operations["getRemediation"]["responses"]["200"]["content"]["application/json"];
export type UpdateRemediationResponse = operations["updateRemediation"]["responses"]["200"]["content"]["application/json"];


