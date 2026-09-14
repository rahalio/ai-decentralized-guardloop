'use client';

import { useState } from 'react';
import type { ControlTestRow, PromotionGateRow } from '@/lib/demo-data';

export function CohortFairnessGate({
  tests,
  gate,
}: {
  tests: ControlTestRow[];
  gate: PromotionGateRow;
}) {
  const [flash, setFlash] = useState(false);
  const blocked = gate.decision === 'block' || tests.some((t) => !t.passed);

  return (
    <div
      className={`border border-slate-700 bg-slate-900 p-4 ${flash ? 'motion-block' : ''}`}
      style={{ borderRadius: 'var(--radius-md)' }}
      role="region"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.16em] text-steel">
            Cohort fairness gate
          </p>
          <p className="mt-1 font-mono text-xs text-steel">
            policy {gate.policyVersion} · appetite {gate.appetiteVersion}
          </p>
        </div>
        <span
          className={`font-display text-sm uppercase tracking-wider ${
            blocked ? 'text-coral' : gate.decision === 'allow' ? 'text-appetite' : 'text-amber'
          }`}
        >
          {blocked ? 'Block' : gate.decision}
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {tests.map((t) => (
          <li
            key={t.testId}
            className="flex items-center justify-between border border-slate-700/70 px-3 py-2 text-sm"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            <span className="font-mono text-xs text-ink">{t.cohort}</span>
            <span className={t.passed ? 'text-appetite' : 'text-coral'}>
              {(t.disparity * 100).toFixed(1)}% / {(t.threshold * 100).toFixed(0)}%
              {t.passed ? ' pass' : ' fail'}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-steel">{gate.reason}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="border border-appetite/50 px-3 py-2 text-sm text-appetite transition-colors hover:bg-appetite-dim/30"
          style={{ borderRadius: 'var(--radius-sm)' }}
          disabled={blocked}
          onClick={() => setFlash(false)}
        >
          Allow promote
        </button>
        <button
          type="button"
          className="border border-coral/50 px-3 py-2 text-sm text-coral transition-colors hover:bg-coral/10"
          style={{ borderRadius: 'var(--radius-sm)' }}
          onClick={() => {
            setFlash(true);
            window.setTimeout(() => setFlash(false), 200);
          }}
        >
          Block
        </button>
      </div>
    </div>
  );
}
