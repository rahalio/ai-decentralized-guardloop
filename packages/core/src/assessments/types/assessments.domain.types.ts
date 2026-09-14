/**
 * Assessments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/assessments.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AssessmentStatus = components["schemas"]["AssessmentStatus"];
export type IdentificationScope = components["schemas"]["IdentificationScope"];
export type IdentificationStatus = components["schemas"]["IdentificationStatus"];
export type ResidualRisk = components["schemas"]["ResidualRisk"];
export type RiskAssessment = components["schemas"]["RiskAssessment"];
export type RiskAssessmentListData = components["schemas"]["RiskAssessmentListData"];
export type RiskIdentification = components["schemas"]["RiskIdentification"];
export type RiskIdentificationListData = components["schemas"]["RiskIdentificationListData"];
export type RiskAssessmentCreateRequest = components["schemas"]["RiskAssessmentCreateRequest"];
export type RiskIdentificationCreateRequest = components["schemas"]["RiskIdentificationCreateRequest"];
export type Identification = operations["listRiskIdentifications"]["responses"]["200"]["content"]["application/json"]["data"];
export type Assessment = operations["listRiskAssessments"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateRiskIdentificationRequestInput = NonNullable<operations["createRiskIdentification"]["requestBody"]>["content"]["application/json"];
export type CreateRiskAssessmentRequestInput = NonNullable<operations["createRiskAssessment"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRiskIdentificationsParams = NonNullable<operations["listRiskIdentifications"]["parameters"]["query"]>;
export type CreateRiskIdentificationParams = operations["createRiskIdentification"]["parameters"]["path"];
export type GetRiskIdentificationParams = operations["getRiskIdentification"]["parameters"]["path"];
export type ListRiskAssessmentsParams = NonNullable<operations["listRiskAssessments"]["parameters"]["query"]>;
export type CreateRiskAssessmentParams = operations["createRiskAssessment"]["parameters"]["path"];
export type GetRiskAssessmentParams = operations["getRiskAssessment"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRiskIdentificationsResponse = operations["listRiskIdentifications"]["responses"]["200"]["content"]["application/json"];
export type CreateRiskIdentificationResponse = operations["createRiskIdentification"]["responses"]["201"]["content"]["application/json"];
export type GetRiskIdentificationResponse = operations["getRiskIdentification"]["responses"]["200"]["content"]["application/json"];
export type ListRiskAssessmentsResponse = operations["listRiskAssessments"]["responses"]["200"]["content"]["application/json"];
export type CreateRiskAssessmentResponse = operations["createRiskAssessment"]["responses"]["201"]["content"]["application/json"];
export type GetRiskAssessmentResponse = operations["getRiskAssessment"]["responses"]["200"]["content"]["application/json"];


