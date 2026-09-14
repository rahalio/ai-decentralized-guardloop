'use client';

import type { LoopStage } from '@/lib/demo-data';

const STEPS: { id: LoopStage; label: string; short: string }[] = [
  { id: 'identify', label: 'Identify', short: 'I' },
  { id: 'assess', label: 'Assess', short: 'A' },
  { id: 'control', label: 'Control', short: 'C' },
  { id: 'monitor', label: 'Monitor', short: 'M' },
];

const ORDER: LoopStage[] = ['identify', 'assess', 'control', 'monitor'];

export function RmfLoopStepper({
  current,
  freshnessDays,
  intervalDays,
}: {
  current: LoopStage;
  freshnessDays?: number;
  intervalDays?: number;
}) {
  const currentIdx = ORDER.indexOf(current);
  const stale =
    typeof freshnessDays === 'number' &&
    typeof intervalDays === 'number' &&
    freshnessDays > intervalDays;

  return (
    <div className="motion-loop">
      <ol className="flex flex-wrap items-center gap-2">
        {STEPS.map((step, idx) => {
          const active = step.id === current;
          const done = idx < currentIdx;
          return (
            <li key={step.id} className="flex items-center gap-2">
              <span
                className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center border px-2 font-mono text-sm transition-colors duration-loop ${
                  active
                    ? 'border-appetite bg-appetite-dim/40 text-appetite'
                    : done
                      ? 'border-slate-700 bg-slate-900 text-steel'
                      : 'border-slate-700/60 text-steel/70'
                }`}
                style={{ borderRadius: 'var(--radius-sm)' }}
                title={step.label}
              >
                {step.short}
              </span>
              <span
                className={`hidden text-sm sm:inline ${
                  active ? 'text-ink' : 'text-steel'
                }`}
              >
                {step.label}
              </span>
              {idx < STEPS.length - 1 ? (
                <span className="mx-1 hidden h-px w-6 bg-slate-700 sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>
      {typeof freshnessDays === 'number' ? (
        <p
          className={`mt-2 text-xs ${stale ? 'text-amber' : 'text-steel'}`}
        >
          Loop freshness {freshnessDays}d
          {intervalDays ? ` / ${intervalDays}d interval` : ''}
          {stale ? ' — stale' : ''}
        </p>
      ) : null}
    </div>
  );
}
