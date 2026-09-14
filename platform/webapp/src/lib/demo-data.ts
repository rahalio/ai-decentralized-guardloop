export type LoopStage = 'identify' | 'assess' | 'control' | 'monitor';

export type UseCaseRow = {
  useCaseId: string;
  name: string;
  owner: string;
  customerImpacting: boolean;
  learningIntervalDays: number;
  boundFairnessPolicyId: string;
  boundAppetiteId: string;
  loopStage: LoopStage;
  residualRiskPct: number;
  status: 'in_appetite' | 'approaching' | 'breach';
  expandRequested?: boolean;
};

export type FairnessPolicyRow = {
  policyId: string;
  version: string;
  name: string;
  status: 'draft' | 'published' | 'archived';
  maxCohortDisparity: number;
  protectedAttributes: string[];
  publishedAt: string;
};

export type AppetiteLimitRow = {
  appetiteId: string;
  version: string;
  name: string;
  biasTolerancePct: number;
  explainabilityCoveragePct: number;
  residualRiskCapPct: number;
  status: 'active' | 'superseded';
};

export type IdentificationRow = {
  id: string;
  useCaseId: string;
  title: string;
  trigger: 'interval' | 'feature_change' | 'poc_expand' | 'staffing';
  severity: 'low' | 'medium' | 'high';
  owner: string;
  orgWide?: boolean;
  staleDays?: number;
  loggedAt: string;
};

export type AssessmentRow = {
  id: string;
  useCaseId: string;
  technicalScore: number;
  conductScore: number;
  biasMetric: number;
  accuracyOnly: boolean;
  residualRiskPct: number;
  sandboxComments: number;
  status: 'in_progress' | 'complete' | 'blocked';
  completedAt?: string;
};

export type ControlTestRow = {
  testId: string;
  useCaseId: string;
  cohort: string;
  disparity: number;
  threshold: number;
  passed: boolean;
  policyVersion: string;
};

export type PromotionGateRow = {
  gateId: string;
  useCaseId: string;
  decision: 'allow' | 'block' | 'pending';
  reason: string;
  policyVersion: string;
  appetiteVersion: string;
  decidedAt?: string;
};

export type MonitorAlertRow = {
  alertId: string;
  useCaseId: string;
  kind: 'driver_shift' | 'fairness' | 'drift' | 'stale_loop';
  title: string;
  severity: 'amber' | 'coral';
  acknowledged: boolean;
  raisedAt: string;
  driverFeature?: string;
  driverSharePct?: number;
};

export type RemediationRow = {
  caseId: string;
  useCaseId: string;
  title: string;
  owner: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'board_escalated' | 'closed';
  linkedAlertId?: string;
  boardReportable: boolean;
};

export type ExplanationPackRow = {
  packId: string;
  decisionRef: string;
  useCaseId: string;
  policyVersion: string;
  featureSummary: string;
  piiMinimised: boolean;
  coveragePct: number;
  generatedAt: string;
};

export type AuditExportRow = {
  exportId: string;
  periodLabel: string;
  from: string;
  to: string;
  loopComplete: boolean;
  remediationOpen: number;
  stages: { stage: LoopStage; evidenceCount: number; knownWhen: string }[];
};

export const DEMO_USE_CASES: UseCaseRow[] = [
  {
    useCaseId: 'uc_prop_pricing_v3',
    name: 'Property insurance AI pricing',
    owner: 'Pricing DS — Marina Cole',
    customerImpacting: true,
    learningIntervalDays: 14,
    boundFairnessPolicyId: 'fp_fair_pricing_02',
    boundAppetiteId: 'ap_pricing_bias_01',
    loopStage: 'monitor',
    residualRiskPct: 68,
    status: 'breach',
  },
  {
    useCaseId: 'uc_prop_pricing_poc',
    name: 'Property pricing PoC (internal advice)',
    owner: 'Actuarial — Tom Reid',
    customerImpacting: false,
    learningIntervalDays: 30,
    boundFairnessPolicyId: 'fp_fair_pricing_01',
    boundAppetiteId: 'ap_pricing_bias_01',
    loopStage: 'assess',
    residualRiskPct: 41,
    status: 'in_appetite',
    expandRequested: true,
  },
  {
    useCaseId: 'uc_claims_triage',
    name: 'Claims triage ranking',
    owner: 'Claims Ops — Aisha Khan',
    customerImpacting: true,
    learningIntervalDays: 21,
    boundFairnessPolicyId: 'fp_fair_pricing_02',
    boundAppetiteId: 'ap_pricing_bias_01',
    loopStage: 'control',
    residualRiskPct: 52,
    status: 'approaching',
  },
];

export const DEMO_FAIRNESS_POLICIES: FairnessPolicyRow[] = [
  {
    policyId: 'fp_fair_pricing_02',
    version: 'fp-2.1.0',
    name: 'Customer pricing cohort fairness',
    status: 'published',
    maxCohortDisparity: 0.05,
    protectedAttributes: ['postcode_decile', 'age_band', 'tenure'],
    publishedAt: '2026-08-01T10:00:00Z',
  },
  {
    policyId: 'fp_fair_pricing_01',
    version: 'fp-1.4.2',
    name: 'Internal advice fairness (legacy)',
    status: 'archived',
    maxCohortDisparity: 0.08,
    protectedAttributes: ['postcode_decile'],
    publishedAt: '2025-11-12T09:00:00Z',
  },
];

export const DEMO_APPETITE: AppetiteLimitRow[] = [
  {
    appetiteId: 'ap_pricing_bias_01',
    version: 'ap-1.3.0',
    name: 'AI pricing residual risk appetite',
    biasTolerancePct: 5,
    explainabilityCoveragePct: 90,
    residualRiskCapPct: 55,
    status: 'active',
  },
];

export const DEMO_IDENTIFICATIONS: IdentificationRow[] = [
  {
    id: 'id_carnival_feature',
    useCaseId: 'uc_prop_pricing_v3',
    title: 'Unstructured local-event features may encode carnival/flood one-offs',
    trigger: 'feature_change',
    severity: 'high',
    owner: 'MRM — J. Okonkwo',
    loggedAt: '2026-09-10T08:30:00Z',
  },
  {
    id: 'id_poc_expand',
    useCaseId: 'uc_prop_pricing_poc',
    title: 'PoC expand to customer quotes — force re-Identify',
    trigger: 'poc_expand',
    severity: 'high',
    owner: 'Conduct — L. Berg',
    loggedAt: '2026-09-12T14:00:00Z',
  },
  {
    id: 'id_fallback_staff',
    useCaseId: 'uc_prop_pricing_v3',
    title: 'Manual underwriting fallback capacity below weekend load',
    trigger: 'staffing',
    severity: 'medium',
    owner: 'Ops risk',
    orgWide: true,
    staleDays: 18,
    loggedAt: '2026-08-28T11:00:00Z',
  },
  {
    id: 'id_interval_refresh',
    useCaseId: 'uc_claims_triage',
    title: 'Scheduled Identify refresh for continuous learner',
    trigger: 'interval',
    severity: 'low',
    owner: 'MRM',
    loggedAt: '2026-09-13T06:00:00Z',
  },
];

export const DEMO_ASSESSMENTS: AssessmentRow[] = [
  {
    id: 'as_pricing_v3',
    useCaseId: 'uc_prop_pricing_v3',
    technicalScore: 0.82,
    conductScore: 0.54,
    biasMetric: 0.071,
    accuracyOnly: false,
    residualRiskPct: 68,
    sandboxComments: 3,
    status: 'complete',
    completedAt: '2026-09-11T16:20:00Z',
  },
  {
    id: 'as_poc',
    useCaseId: 'uc_prop_pricing_poc',
    technicalScore: 0.88,
    conductScore: 0.0,
    biasMetric: 0.02,
    accuracyOnly: true,
    residualRiskPct: 41,
    sandboxComments: 1,
    status: 'blocked',
  },
  {
    id: 'as_claims',
    useCaseId: 'uc_claims_triage',
    technicalScore: 0.79,
    conductScore: 0.71,
    biasMetric: 0.048,
    accuracyOnly: false,
    residualRiskPct: 52,
    sandboxComments: 2,
    status: 'complete',
    completedAt: '2026-09-09T12:00:00Z',
  },
];

export const DEMO_CONTROL_TESTS: ControlTestRow[] = [
  {
    testId: 'ct_heldout_postcode',
    useCaseId: 'uc_prop_pricing_v3',
    cohort: 'postcode_decile_1_vs_10',
    disparity: 0.081,
    threshold: 0.05,
    passed: false,
    policyVersion: 'fp-2.1.0',
  },
  {
    testId: 'ct_heldout_age',
    useCaseId: 'uc_prop_pricing_v3',
    cohort: 'age_band_25_34_vs_65_plus',
    disparity: 0.032,
    threshold: 0.05,
    passed: true,
    policyVersion: 'fp-2.1.0',
  },
  {
    testId: 'ct_claims_tenure',
    useCaseId: 'uc_claims_triage',
    cohort: 'tenure_new_vs_loyal',
    disparity: 0.044,
    threshold: 0.05,
    passed: true,
    policyVersion: 'fp-2.1.0',
  },
];

export const DEMO_PROMOTION_GATES: PromotionGateRow[] = [
  {
    gateId: 'pg_pricing_v3_block',
    useCaseId: 'uc_prop_pricing_v3',
    decision: 'block',
    reason: 'Held-out postcode cohort disparity 8.1% exceeds appetite 5%',
    policyVersion: 'fp-2.1.0',
    appetiteVersion: 'ap-1.3.0',
    decidedAt: '2026-09-11T17:05:00Z',
  },
  {
    gateId: 'pg_claims_pending',
    useCaseId: 'uc_claims_triage',
    decision: 'pending',
    reason: 'Awaiting 2LOD sandbox challenge sign-off',
    policyVersion: 'fp-2.1.0',
    appetiteVersion: 'ap-1.3.0',
  },
];

export const DEMO_ALERTS: MonitorAlertRow[] = [
  {
    alertId: 'al_driver_shift_1',
    useCaseId: 'uc_prop_pricing_v3',
    kind: 'driver_shift',
    title: 'Non-causal local-event text dominating pricing drivers',
    severity: 'coral',
    acknowledged: false,
    raisedAt: '2026-09-14T05:40:00Z',
    driverFeature: 'local_event_text_embed',
    driverSharePct: 34,
  },
  {
    alertId: 'al_fairness_1',
    useCaseId: 'uc_prop_pricing_v3',
    kind: 'fairness',
    title: 'Live cohort fairness approaching breach on postcode decile',
    severity: 'amber',
    acknowledged: false,
    raisedAt: '2026-09-13T22:10:00Z',
  },
  {
    alertId: 'al_stale_1',
    useCaseId: 'uc_claims_triage',
    kind: 'stale_loop',
    title: 'Identify interval overdue by 3 days',
    severity: 'amber',
    acknowledged: true,
    raisedAt: '2026-09-12T09:00:00Z',
  },
];

export const DEMO_REMEDIATIONS: RemediationRow[] = [
  {
    caseId: 'rm_postcode_fairness',
    useCaseId: 'uc_prop_pricing_v3',
    title: 'Remediate postcode cohort disparity before next promote',
    owner: 'Marina Cole',
    dueDate: '2026-09-28',
    status: 'board_escalated',
    linkedAlertId: 'al_fairness_1',
    boardReportable: true,
  },
  {
    caseId: 'rm_driver_shift',
    useCaseId: 'uc_prop_pricing_v3',
    title: 'Exclude carnival/flood one-off features from live drivers',
    owner: 'Tom Reid',
    dueDate: '2026-09-21',
    status: 'in_progress',
    linkedAlertId: 'al_driver_shift_1',
    boardReportable: true,
  },
  {
    caseId: 'rm_fallback',
    useCaseId: 'uc_prop_pricing_v3',
    title: 'Restore weekend manual underwriting capacity',
    owner: 'Ops risk',
    dueDate: '2026-10-05',
    status: 'open',
    boardReportable: false,
  },
];

export const DEMO_EXPLANATIONS: ExplanationPackRow[] = [
  {
    packId: 'xp_quote_88421',
    decisionRef: 'quote_88421',
    useCaseId: 'uc_prop_pricing_v3',
    policyVersion: 'fp-2.1.0',
    featureSummary:
      'Premium driven by rebuild cost, claims history, and flood zone; local-event text contribution flagged for review.',
    piiMinimised: true,
    coveragePct: 86,
    generatedAt: '2026-09-13T18:22:00Z',
  },
  {
    packId: 'xp_quote_88102',
    decisionRef: 'quote_88102',
    useCaseId: 'uc_prop_pricing_v3',
    policyVersion: 'fp-2.1.0',
    featureSummary:
      'Significant automated decision pack for customer channel — no raw PII in export.',
    piiMinimised: true,
    coveragePct: 92,
    generatedAt: '2026-09-10T11:05:00Z',
  },
];

export const DEMO_EXPORTS: AuditExportRow[] = [
  {
    exportId: 'ex_board_sep_2026',
    periodLabel: 'Sep 2026 board pack',
    from: '2026-09-01',
    to: '2026-09-14',
    loopComplete: false,
    remediationOpen: 3,
    stages: [
      { stage: 'identify', evidenceCount: 4, knownWhen: '2026-09-13T06:00:00Z' },
      { stage: 'assess', evidenceCount: 3, knownWhen: '2026-09-11T16:20:00Z' },
      { stage: 'control', evidenceCount: 3, knownWhen: '2026-09-11T17:05:00Z' },
      { stage: 'monitor', evidenceCount: 3, knownWhen: '2026-09-14T05:40:00Z' },
    ],
  },
];

export const DEMO_SANDBOX_COMMENTS = [
  {
    id: 'sb_1lod',
    line: '1LOD' as const,
    author: 'Marina Cole',
    body: 'Held-out cohort re-run after removing carnival embeddings — disparity still 6.2%.',
    at: '2026-09-11T10:15:00Z',
  },
  {
    id: 'sb_2lod',
    line: '2LOD' as const,
    author: 'J. Okonkwo (MRM)',
    body: 'Challenge: accuracy-only narrative insufficient; require conduct outcome proxy before promote.',
    at: '2026-09-11T12:40:00Z',
  },
  {
    id: 'sb_3lod',
    line: '3LOD' as const,
    author: 'Internal Audit',
    body: 'Evidence pack incomplete for board — attach Known-When export window.',
    at: '2026-09-11T15:05:00Z',
  },
];

export function useCaseName(id: string): string {
  return DEMO_USE_CASES.find((u) => u.useCaseId === id)?.name ?? id;
}
