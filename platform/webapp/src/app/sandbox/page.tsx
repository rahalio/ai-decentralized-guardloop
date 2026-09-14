'use client';

import Link from 'next/link';
import { ScreenHeader } from '@/components/screen-header';
import { ThreeLodSandboxPane } from '@/components/three-lod-sandbox-pane';

export default function SandboxPage() {
  return (
    <div>
      <ScreenHeader
        kicker="3LoD sandbox"
        title="Challenge before production — evidence for Control"
      />
      <div className="max-w-2xl">
        <ThreeLodSandboxPane />
      </div>
      <p className="mt-6 max-w-xl text-sm text-steel">
        First, second, and third lines share role-appropriate access to residual risk and
        cohort evidence. Comments attach to the promotion gate.
      </p>
      <Link href="/promotion" className="mt-4 inline-block text-sm text-brand hover:underline">
        Return to promotion gates
      </Link>
    </div>
  );
}
