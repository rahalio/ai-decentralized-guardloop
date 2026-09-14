import { DEMO_SANDBOX_COMMENTS } from '@/lib/demo-data';

const LINE_TONE: Record<(typeof DEMO_SANDBOX_COMMENTS)[number]['line'], string> = {
  '1LOD': 'text-appetite',
  '2LOD': 'text-amber',
  '3LOD': 'text-brand',
};

export function ThreeLodSandboxPane() {
  return (
    <div
      className="border border-slate-700 bg-slate-900 p-4"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <p className="font-display text-xs uppercase tracking-[0.16em] text-steel">
        3LoD sandbox challenge
      </p>
      <p className="mt-1 text-sm text-steel">
        Role-appropriate challenge evidence before production promote.
      </p>
      <ul className="mt-4 space-y-3">
        {DEMO_SANDBOX_COMMENTS.map((c) => (
          <li
            key={c.id}
            className="border border-slate-700/70 px-3 py-3"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-xs ${LINE_TONE[c.line]}`}>
                {c.line} · {c.author}
              </span>
              <time className="text-xs text-steel">
                {new Date(c.at).toLocaleString()}
              </time>
            </div>
            <p className="mt-2 text-sm text-ink">{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
