'use client';

import Link from 'next/link';
import { AppetiteDial } from '@/components/appetite-dial';
import { DriverShiftAlert } from '@/components/driver-shift-alert';
import { RmfLoopStepper } from '@/components/rmf-loop-stepper';
import { ScreenHeader } from '@/components/screen-header';
import {
  DEMO_ALERTS,
  DEMO_APPETITE,
  DEMO_REMEDIATIONS,
  DEMO_USE_CASES,
} from '@/lib/demo-data';

export default function CroMrmHomePage() {
  const appetite = DEMO_APPETITE[0];
  const breaches = DEMO_USE_CASES.filter((u) => u.status === 'breach');
  const openAlerts = DEMO_ALERTS.filter((a) => !a.acknowledged);
  const boardRems = DEMO_REMEDIATIONS.filter((r) => r.boardReportable && r.status !== 'closed');

  return (
    <div>
      <ScreenHeader
        kicker="CRO / MRM home"
        title="Which learning models are inside appetite this week?"
      />
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <AppetiteDial
            residualRiskPct={DEMO_USE_CASES[0].residualRiskPct}
            capPct={appetite.residualRiskCapPct}
            label="Book residual risk (pricing beachhead)"
          />
          <div>
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
              Open loop stages
            </h2>
            <ul className="space-y-3">
              {DEMO_USE_CASES.map((uc) => (
                <li
                  key={uc.useCaseId}
                  className="border border-slate-700 bg-slate-900 px-4 py-3"
                  style={{ borderRadius: 'var(--radius-md)' }}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Link href="/use-cases" className="font-display text-lg text-ink hover:text-brand">
                      {uc.name}
                    </Link>
                    <span
                      className={
                        uc.status === 'breach'
                          ? 'text-coral'
                          : uc.status === 'approaching'
                            ? 'text-amber'
                            : 'text-appetite'
                      }
                    >
                      {uc.residualRiskPct}% residual
                    </span>
                  </div>
                  <RmfLoopStepper
                    current={uc.loopStage}
                    freshnessDays={uc.learningIntervalDays - (uc.status === 'breach' ? -4 : 2)}
                    intervalDays={uc.learningIntervalDays}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <aside className="space-y-6">
          <section>
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
              Breach alerts
            </h2>
            <div className="space-y-3">
              {openAlerts.slice(0, 2).map((a) => (
                <DriverShiftAlert key={a.alertId} alert={a} />
              ))}
            </div>
            <Link href="/monitoring" className="mt-3 inline-block text-sm text-amber">
              Open monitoring desk
            </Link>
          </section>
          <section>
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
              Org-wide AI risk
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Culture readiness', 'Fallback staffing', 'Explainability coverage'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-steel"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    {chip}
                  </span>
                ),
              )}
            </div>
          </section>
          <section>
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-steel">
              Remediations
            </h2>
            <p className="text-sm text-steel">
              {breaches.length} use case{breaches.length === 1 ? '' : 's'} outside appetite ·{' '}
              {boardRems.length} board-reportable programme
              {boardRems.length === 1 ? '' : 's'}.
            </p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              <Link href="/remediations" className="text-coral">
                Review remediations
              </Link>
              <Link href="/exports" className="text-brand">
                Export board pack
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
