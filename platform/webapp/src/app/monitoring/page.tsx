'use client';

import Link from 'next/link';
import { DriverShiftAlert } from '@/components/driver-shift-alert';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_ALERTS, useCaseName } from '@/lib/demo-data';

export default function MonitoringPage() {
  const driver = DEMO_ALERTS.find((a) => a.kind === 'driver_shift');
  const others = DEMO_ALERTS.filter((a) => a.kind !== 'driver_shift');

  return (
    <div>
      <ScreenHeader
        kicker="Monitoring desk"
        title="Short-interval alerts for drift, fairness, and non-causal drivers"
      />
      {driver ? (
        <div className="mb-8">
          <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
            Feature-driver shift (insurance beachhead)
          </h2>
          <DriverShiftAlert alert={driver} />
          <div
            className="mt-4 border border-slate-700 bg-slate-900 p-4"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <p className="text-xs text-steel">Driver share vs baseline (demo)</p>
            <div className="mt-3 flex h-24 items-end gap-2">
              {[
                { label: 'rebuild', h: 40 },
                { label: 'claims', h: 55 },
                { label: 'flood', h: 35 },
                { label: 'local_event', h: 90, hot: true },
                { label: 'tenure', h: 28 },
              ].map((b) => (
                <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full ${b.hot ? 'bg-coral' : 'bg-appetite-dim'}`}
                    style={{ height: `${b.h}%`, borderRadius: 'var(--radius-sm)' }}
                  />
                  <span className="truncate font-mono text-[10px] text-steel">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
        Alert feed
      </h2>
      <ul className="space-y-3">
        {others.map((a) => (
          <li key={a.alertId}>
            <DriverShiftAlert alert={a} />
            <p className="mt-1 px-1 text-xs text-steel">{useCaseName(a.useCaseId)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/remediations" className="text-coral hover:underline">
          Open remediation
        </Link>
        <Link href="/assess" className="text-amber hover:underline">
          Force re-assess
        </Link>
      </div>
    </div>
  );
}
