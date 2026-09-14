'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';

const NAV = [
  { href: '/', label: 'CRO / MRM' },
  { href: '/owner', label: 'Pricing owner' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/policies', label: 'Policies' },
  { href: '/identify', label: 'Identify' },
  { href: '/assess', label: 'Assess' },
  { href: '/promotion', label: 'Promotion' },
  { href: '/monitoring', label: 'Monitoring' },
  { href: '/sandbox', label: 'Sandbox' },
  { href: '/remediations', label: 'Remediations' },
  { href: '/explanations', label: 'Explanations' },
  { href: '/exports', label: 'Exports' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { signedIn, signOut } = useAuth();
  const isLogin = pathname === '/login';

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-slate-700/80 px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-wide text-brand">
          Guardloop
        </Link>
        {signedIn ? (
          <button
            type="button"
            className="text-sm text-steel transition-colors hover:text-ink"
            onClick={signOut}
          >
            Sign out
          </button>
        ) : (
          <Link href="/login" className="text-sm text-steel transition-colors hover:text-ink">
            Sign in
          </Link>
        )}
      </header>
      <div className="flex">
        <nav className="min-h-[calc(100vh-65px)] w-52 shrink-0 border-r border-slate-700/80 px-3 py-6">
          {NAV.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 block px-3 py-2 text-sm transition-colors duration-loop ${
                  active
                    ? 'bg-slate-900 text-ink'
                    : 'text-steel hover:text-ink'
                }`}
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="loop-watermark min-w-0 flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
