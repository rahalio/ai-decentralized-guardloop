/**
 * Explanations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/explanations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExplanationPack = components["schemas"]["ExplanationPack"];
export type ExplanationPackListData = components["schemas"]["ExplanationPackListData"];
export type ExplanationPackStatus = components["schemas"]["ExplanationPackStatus"];
export type ExplanationPackCreateRequest = components["schemas"]["ExplanationPackCreateRequest"];
export type Explanation = operations["listExplanationPacks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateExplanationPackRequestInput = NonNullable<operations["createExplanationPack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListExplanationPacksParams = NonNullable<operations["listExplanationPacks"]["parameters"]["query"]>;
export type GetExplanationPackParams = operations["getExplanationPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListExplanationPacksResponse = operations["listExplanationPacks"]["responses"]["200"]["content"]["application/json"];
export type CreateExplanationPackResponse = operations["createExplanationPack"]["responses"]["201"]["content"]["application/json"];
export type GetExplanationPackResponse = operations["getExplanationPack"]["responses"]["200"]["content"]["application/json"];


