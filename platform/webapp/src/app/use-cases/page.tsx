'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RmfLoopStepper } from '@/components/rmf-loop-stepper';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_USE_CASES } from '@/lib/demo-data';

export default function UseCasesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div>
      <ScreenHeader
        kicker="AI use case inventory"
        title="Register customer-impact scope and learning cadence"
      />
      {DEMO_USE_CASES.length === 0 ? (
        <p className="text-steel">Register the first in-scope AI use case.</p>
      ) : (
        <div className="overflow-x-auto border border-slate-700" style={{ borderRadius: 'var(--radius-md)' }}>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-900 font-display text-xs uppercase tracking-wider text-steel">
              <tr>
                <th className="px-4 py-3">Use case</th>
                <th className="px-4 py-3">Impact</th>
                <th className="px-4 py-3">Interval</th>
                <th className="px-4 py-3">Policies</th>
                <th className="px-4 py-3">Loop</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_USE_CASES.map((uc) => {
                const open = expanded === uc.useCaseId;
                return (
                  <tr key={uc.useCaseId} className="border-t border-slate-700/80">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-left font-display text-ink hover:text-brand"
                        onClick={() => setExpanded(open ? null : uc.useCaseId)}
                      >
                        {uc.name}
                      </button>
                      <p className="mt-1 font-mono text-xs text-steel">{uc.useCaseId}</p>
                      {open ? (
                        <div className="mt-3 max-w-md">
                          <p className="text-xs text-steel">Owner {uc.owner}</p>
                          <div className="mt-2">
                            <RmfLoopStepper current={uc.loopStage} intervalDays={uc.learningIntervalDays} />
                          </div>
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <span className={uc.customerImpacting ? 'text-coral' : 'text-steel'}>
                        {uc.customerImpacting ? 'Customer' : 'Internal'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{uc.learningIntervalDays}d</td>
                    <td className="px-4 py-3 font-mono text-xs text-steel">
                      {uc.boundFairnessPolicyId}
                      <br />
                      {uc.boundAppetiteId}
                    </td>
                    <td className="px-4 py-3 capitalize text-steel">{uc.loopStage}</td>
                    <td className="px-4 py-3">
                      {uc.expandRequested ? (
                        <button
                          type="button"
                          className="text-amber hover:underline"
                          onClick={() => {
                            setToast(
                              'Expand to customer blocked until Identify refreshed (BR-11).',
                            );
                          }}
                        >
                          Expand to customer
                        </button>
                      ) : (
                        <Link href="/policies" className="text-brand hover:underline">
                          Bind policy
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {toast ? (
        <p className="mt-4 text-sm text-amber" role="status">
          {toast}
        </p>
      ) : null}
    </div>
  );
}
