/**
 * Monitoring Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/monitoring.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AlertKind = components["schemas"]["AlertKind"];
export type AlertSeverity = components["schemas"]["AlertSeverity"];
export type AlertStatus = components["schemas"]["AlertStatus"];
export type MonitorAlert = components["schemas"]["MonitorAlert"];
export type MonitorAlertListData = components["schemas"]["MonitorAlertListData"];
export type MonitorAlertRaiseRequest = components["schemas"]["MonitorAlertRaiseRequest"];
export type Alert = operations["listMonitorAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RaiseMonitorAlertRequestInput = NonNullable<operations["raiseMonitorAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMonitorAlertsParams = NonNullable<operations["listMonitorAlerts"]["parameters"]["query"]>;
export type GetMonitorAlertParams = operations["getMonitorAlert"]["parameters"]["path"];
export type AcknowledgeMonitorAlertParams = operations["acknowledgeMonitorAlert"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMonitorAlertsResponse = operations["listMonitorAlerts"]["responses"]["200"]["content"]["application/json"];
export type RaiseMonitorAlertResponse = operations["raiseMonitorAlert"]["responses"]["201"]["content"]["application/json"];
export type GetMonitorAlertResponse = operations["getMonitorAlert"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeMonitorAlertResponse = operations["acknowledgeMonitorAlert"]["responses"]["200"]["content"]["application/json"];


