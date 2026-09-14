'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_APPETITE, DEMO_EXPLANATIONS, useCaseName } from '@/lib/demo-data';

export default function ExplanationsPage() {
  const coverageFloor = DEMO_APPETITE[0].explainabilityCoveragePct;

  return (
    <div>
      <ScreenHeader
        kicker="Explanation packs"
        title="GDPR-style artefacts without indiscriminate PII export"
      />
      <ul className="space-y-4">
        {DEMO_EXPLANATIONS.map((pack) => {
          const blocked = pack.coveragePct < coverageFloor;
          return (
            <li
              key={pack.packId}
              className="border border-slate-700 bg-slate-900 p-4"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-steel">
                    {pack.decisionRef} · {useCaseName(pack.useCaseId)}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-ink">{pack.packId}</h3>
                </div>
                <span className={blocked ? 'text-coral' : 'text-appetite'}>
                  {pack.coveragePct}% coverage
                  {blocked ? ' — blocked' : ''}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink">{pack.featureSummary}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-steel">
                <span className="font-mono">policy {pack.policyVersion}</span>
                <span>
                  PII minimised{' '}
                  <span className={pack.piiMinimised ? 'text-appetite' : 'text-coral'}>
                    {pack.piiMinimised ? 'yes' : 'no'}
                  </span>
                </span>
                <span>{new Date(pack.generatedAt).toLocaleString()}</span>
              </div>
              {blocked ? (
                <p className="mt-2 text-sm text-coral" role="status">
                  Insufficient explainability coverage vs appetite ({coverageFloor}%).
                </p>
              ) : (
                <button
                  type="button"
                  className="mt-3 border border-brand/40 px-3 py-1.5 text-sm text-brand"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  Release via firm channel
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
