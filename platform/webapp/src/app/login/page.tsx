'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const { signIn, signInWithDemoKey } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('cro@demo.local');
  const [password, setPassword] = useState('sandbox-cro-8');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 10%, rgba(59,168,160,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 0%, rgba(44,58,76,0.45), transparent 50%), linear-gradient(180deg, rgba(11,18,25,0.3) 0%, #0b1219 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-12 h-28 w-28 opacity-20"
        style={{
          background:
            'conic-gradient(from 0deg, #3BA8A0 0deg 90deg, #D9A441 90deg 180deg, #7A90A6 180deg 270deg, #E0574F 270deg 360deg)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 42%, black 43% 58%, transparent 59%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 42%, black 43% 58%, transparent 59%)',
        }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-end px-8 pb-20 pt-16">
        <p className="font-display text-5xl tracking-[0.14em] text-brand md:text-6xl">
          Guardloop
        </p>
        <h1 className="mt-8 font-display text-3xl text-ink md:text-4xl">
          Innovate inside a living risk loop
        </h1>
        <p className="mt-3 max-w-md text-steel">
          Continuous Identify–Assess–Control–Monitor for learning models — fairness
          and appetite as binding dials.
        </p>
        <form className="mt-10 flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="text-sm text-steel">
            Email
            <input
              className="mt-1 w-full border border-slate-700 bg-slate-900 px-3 py-2 text-ink"
              style={{ borderRadius: 'var(--radius-sm)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="text-sm text-steel">
            Password
            <input
              type="password"
              className="mt-1 w-full border border-slate-700 bg-slate-900 px-3 py-2 text-ink"
              style={{ borderRadius: 'var(--radius-sm)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="text-sm text-coral">{error}</p> : null}
          <button
            type="submit"
            className="mt-2 bg-ink px-5 py-3 font-display text-slate-950 transition-opacity hover:opacity-90"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            Enter the risk loop
          </button>
          <button
            type="button"
            className="text-left text-sm text-steel underline-offset-4 hover:text-ink hover:underline"
            onClick={() => {
              signInWithDemoKey();
              router.push('/');
            }}
          >
            Continue with demo API key
          </button>
        </form>
      </div>
    </div>
  );
}
