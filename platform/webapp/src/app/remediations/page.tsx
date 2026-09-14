'use client';

import Link from 'next/link';
import { RemediationBoardStatus } from '@/components/remediation-board-status';
import { ScreenHeader } from '@/components/screen-header';
import { DEMO_REMEDIATIONS } from '@/lib/demo-data';

export default function RemediationsPage() {
  const open = DEMO_REMEDIATIONS.filter((r) => r.status !== 'closed');

  return (
    <div>
      <ScreenHeader
        brandMark
        kicker="Remediation programmes"
        title="Owned actions with board-reportable status"
      />
      {open.length === 0 ? (
        <p className="text-steel">No open remediations.</p>
      ) : (
        <ul className="space-y-3">
          {open.map((item) => (
            <li key={item.caseId}>
              <RemediationBoardStatus item={item} />
            </li>
          ))}
        </ul>
      )}
      <Link href="/exports" className="mt-6 inline-block text-sm text-brand hover:underline">
        Escalate to board pack
      </Link>
    </div>
  );
}
