'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/screen-header';
import {
  DEMO_ALERTS,
  DEMO_PROMOTION_GATES,
  DEMO_USE_CASES,
} from '@/lib/demo-data';

export default function OwnerHomePage() {
  const pricing = DEMO_USE_CASES.find((u) => u.useCaseId === 'uc_prop_pricing_v3')!;
  const gate = DEMO_PROMOTION_GATES.find((g) => g.useCaseId === pricing.useCaseId);
  const openAlerts = DEMO_ALERTS.filter(
    (a) => a.useCaseId === pricing.useCaseId && !a.acknowledged,
  );

  return (
    <div>
      <ScreenHeader
        kicker="Pricing owner"
        title="Promote with residual risk visible — monitor before conduct scale"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/promotion"
          className="border border-slate-700 bg-slate-900 p-5 transition-colors hover:border-appetite/50"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <p className="font-display text-xs uppercase tracking-widest text-steel">
            Promotion shortcut
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">{pricing.name}</h2>
          <p
            className={`mt-3 text-sm ${
              gate?.decision === 'block' ? 'text-coral' : 'text-amber'
            }`}
          >
            Gate: {gate?.decision ?? 'pending'} — {gate?.reason}
          </p>
        </Link>
        <Link
          href="/monitoring"
          className="border border-slate-700 bg-slate-900 p-5 transition-colors hover:border-amber/50"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <p className="font-display text-xs uppercase tracking-widest text-steel">
            Monitoring shortcut
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink">
            {openAlerts.length} open alert{openAlerts.length === 1 ? '' : 's'}
          </h2>
          <p className="mt-3 text-sm text-steel">
            Includes driver-shift on unstructured local-event features.
          </p>
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/assess" className="text-brand hover:underline">
          Complete assess (tech + conduct)
        </Link>
        <Link href="/sandbox" className="text-steel hover:underline">
          Sandbox challenge
        </Link>
        <Link href="/identify" className="text-steel hover:underline">
          Re-identify on expand
        </Link>
      </div>
    </div>
  );
}
