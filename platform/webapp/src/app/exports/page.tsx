'use client';

import { KnownWhenExport } from '@/components/known-when-export';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_EXPORTS } from '@/lib/demo-data';

export default function ExportsPage() {
  const pack = DEMO_EXPORTS[0];

  return (
    <div>
      <ScreenHeader
        brandMark
        kicker="Audit & board export"
        title="What was known when about behaviour, controls, and appetite"
      />
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <label className="text-sm text-steel">
          Period
          <select
            className="mt-1 block border border-slate-700 bg-slate-900 px-3 py-2 text-ink"
            style={{ borderRadius: 'var(--radius-sm)' }}
            defaultValue={pack.periodLabel}
          >
            <option>{pack.periodLabel}</option>
            <option>Aug 2026 board pack</option>
          </select>
        </label>
      </div>
      <div className="max-w-2xl">
        <KnownWhenExport pack={pack} />
      </div>
    </div>
  );
}
