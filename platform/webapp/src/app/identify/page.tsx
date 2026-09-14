'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_IDENTIFICATIONS, useCaseName } from '@/lib/demo-data';

const SEVERITY: Record<string, string> = {
  high: 'text-coral',
  medium: 'text-amber',
  low: 'text-appetite',
};

export default function IdentifyPage() {
  return (
    <div>
      <ScreenHeader
        kicker="Identify workspace"
        title="Continuous and event-driven risk identification"
      />
      <p className="mb-6 max-w-2xl text-sm text-steel">
        Capture use-case and org-wide AI risks — carnival/non-causal hazards for pricing,
        fallback capacity, PoC expand triggers.
      </p>
      <ul className="space-y-3">
        {DEMO_IDENTIFICATIONS.map((row) => {
          const stale = typeof row.staleDays === 'number' && row.staleDays > 14;
          return (
            <li
              key={row.id}
              className={`border bg-slate-900 px-4 py-3 ${
                stale ? 'border-amber/50' : 'border-slate-700'
              }`}
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-steel">
                    {row.id} · {useCaseName(row.useCaseId)}
                    {row.orgWide ? ' · org-wide' : ''}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-ink">{row.title}</h3>
                  <p className="mt-2 text-sm text-steel">
                    Trigger <span className="text-ink">{row.trigger.replace('_', ' ')}</span> ·
                    owner {row.owner}
                  </p>
                </div>
                <span className={`text-xs uppercase tracking-wider ${SEVERITY[row.severity]}`}>
                  {row.severity}
                  {stale ? ' · stale' : ''}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex gap-4 text-sm">
        <Link href="/assess" className="text-brand hover:underline">
          Push to Assess
        </Link>
        <Link href="/use-cases" className="text-steel hover:underline">
          Inventory
        </Link>
      </div>
    </div>
  );
}
