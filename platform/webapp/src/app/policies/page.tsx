'use client';

import { ScreenHeader } from '@/components/screen-header';
import { DEMO_APPETITE, DEMO_FAIRNESS_POLICIES, DEMO_USE_CASES } from '@/lib/demo-data';

export default function PoliciesPage() {
  const active = DEMO_FAIRNESS_POLICIES.filter((p) => p.status === 'published');
  const appetite = DEMO_APPETITE[0];

  return (
    <div>
      <ScreenHeader
        kicker="Fairness & appetite"
        title="Version binding rules before promote"
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <section
          className="border border-slate-700 bg-slate-900 p-5"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-steel">
            Fairness policy editor
          </h2>
          {active.map((p) => (
            <div key={p.policyId} className="mt-4 space-y-3">
              <p className="font-display text-xl text-ink">{p.name}</p>
              <p className="font-mono text-xs text-brand">{p.version}</p>
              <label className="block text-sm text-steel">
                Max cohort disparity
                <input
                  readOnly
                  className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-ink"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                  value={p.maxCohortDisparity}
                />
              </label>
              <label className="block text-sm text-steel">
                Protected attributes
                <input
                  readOnly
                  className="mt-1 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-ink"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                  value={p.protectedAttributes.join(', ')}
                />
              </label>
              <p className="text-xs text-steel">
                Published {new Date(p.publishedAt).toLocaleDateString()} · demo read-only
              </p>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="font-display text-xs uppercase tracking-widest text-steel">
              Version history
            </h3>
            <ul className="mt-2 space-y-1">
              {DEMO_FAIRNESS_POLICIES.map((p) => (
                <li key={p.policyId} className="font-mono text-xs text-steel">
                  {p.version} — {p.status}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className="border border-slate-700 bg-slate-900 p-5"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <h2 className="font-display text-sm uppercase tracking-widest text-steel">
            Appetite components
          </h2>
          <p className="mt-4 font-display text-xl text-ink">{appetite.name}</p>
          <p className="font-mono text-xs text-brand">{appetite.version}</p>
          <dl className="mt-4 grid gap-3">
            {[
              ['Bias tolerance', `${appetite.biasTolerancePct}%`],
              ['Explainability coverage', `${appetite.explainabilityCoveragePct}%`],
              ['Residual risk cap', `${appetite.residualRiskCapPct}%`],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border border-slate-700/70 px-3 py-2"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <dt className="text-sm text-steel">{k}</dt>
                <dd className="font-mono text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 font-display text-xs uppercase tracking-widest text-steel">
            Model binding matrix
          </h3>
          <ul className="mt-2 space-y-2">
            {DEMO_USE_CASES.map((uc) => (
              <li key={uc.useCaseId} className="text-sm text-steel">
                <span className="text-ink">{uc.name}</span>
                <span className="ml-2 font-mono text-xs">
                  {uc.boundFairnessPolicyId} · {uc.boundAppetiteId}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
