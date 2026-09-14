'use client';

import Link from 'next/link';
import { CohortFairnessGate } from '@/components/cohort-fairness-gate';
import { ScreenHeader } from '@/components/screen-header';
import {
  DEMO_CONTROL_TESTS,
  DEMO_PROMOTION_GATES,
  useCaseName,
} from '@/lib/demo-data';

export default function PromotionPage() {
  return (
    <div>
      <ScreenHeader
        brandMark
        kicker="Promotion gates · Control"
        title="Held-out cohort fairness blocks promote when appetite breaches"
      />
      <div className="space-y-8">
        {DEMO_PROMOTION_GATES.map((gate) => {
          const tests = DEMO_CONTROL_TESTS.filter((t) => t.useCaseId === gate.useCaseId);
          return (
            <section key={gate.gateId}>
              <h2 className="mb-3 font-display text-xl text-ink">
                {useCaseName(gate.useCaseId)}
              </h2>
              <CohortFairnessGate tests={tests} gate={gate} />
              {gate.decision === 'block' ? (
                <p className="mt-3 text-sm text-coral">
                  Cannot override without appetite change.{' '}
                  <Link href="/remediations" className="underline underline-offset-2">
                    Open remediation
                  </Link>
                </p>
              ) : null}
            </section>
          );
        })}
      </div>
      <Link href="/sandbox" className="mt-6 inline-block text-sm text-steel hover:text-ink">
        Attach sandbox evidence pack
      </Link>
    </div>
  );
}
