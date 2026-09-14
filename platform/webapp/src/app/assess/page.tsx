'use client';

import Link from 'next/link';
import { AppetiteDial } from '@/components/appetite-dial';
import { ScreenHeader } from '@/components/screen-header';
import {
  DEMO_APPETITE,
  DEMO_ASSESSMENTS,
  useCaseName,
} from '@/lib/demo-data';

export default function AssessPage() {
  const appetite = DEMO_APPETITE[0];

  return (
    <div>
      <ScreenHeader
        kicker="Assess workspace"
        title="Technical metrics plus customer/conduct outcomes"
      />
      <div className="mb-6 max-w-sm">
        <AppetiteDial
          residualRiskPct={DEMO_ASSESSMENTS[0].residualRiskPct}
          capPct={appetite.residualRiskCapPct}
        />
      </div>
      <ul className="space-y-4">
        {DEMO_ASSESSMENTS.map((a) => (
          <li
            key={a.id}
            className="border border-slate-700 bg-slate-900 p-4"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-steel">{a.id}</p>
                <h3 className="mt-1 font-display text-xl text-ink">
                  {useCaseName(a.useCaseId)}
                </h3>
              </div>
              <span
                className={
                  a.status === 'blocked'
                    ? 'text-coral'
                    : a.status === 'complete'
                      ? 'text-appetite'
                      : 'text-amber'
                }
              >
                {a.status.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Metric label="Technical" value={a.technicalScore.toFixed(2)} />
              <Metric
                label="Conduct"
                value={a.accuracyOnly ? 'blocked' : a.conductScore.toFixed(2)}
                warn={a.accuracyOnly}
              />
              <Metric
                label="Bias metric"
                value={a.biasMetric.toFixed(3)}
                warn={a.biasMetric > appetite.biasTolerancePct / 100}
              />
            </div>
            {a.accuracyOnly ? (
              <p className="mt-3 text-sm text-coral" role="status">
                Accuracy-only submission blocked — add conduct outcome proxies.
              </p>
            ) : (
              <p className="mt-3 text-sm text-steel">
                {a.sandboxComments} sandbox challenge comment
                {a.sandboxComments === 1 ? '' : 's'} from 2LOD/3LOD
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-4 text-sm">
        <Link href="/promotion" className="text-brand hover:underline">
          Advance to Control
        </Link>
        <Link href="/sandbox" className="text-steel hover:underline">
          Sandbox evidence
        </Link>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div
      className="border border-slate-700/70 px-3 py-2"
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      <p className="text-xs text-steel">{label}</p>
      <p className={`mt-1 font-mono text-lg ${warn ? 'text-coral' : 'text-ink'}`}>
        {value}
      </p>
    </div>
  );
}
