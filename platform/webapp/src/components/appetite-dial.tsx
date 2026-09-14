export function AppetiteDial({
  residualRiskPct,
  capPct,
  label,
}: {
  residualRiskPct: number;
  capPct: number;
  label?: string;
}) {
  const over = residualRiskPct > capPct;
  const approaching = !over && residualRiskPct >= capPct * 0.85;
  const tone = over ? 'coral' : approaching ? 'amber' : 'appetite';
  const pct = Math.min(100, Math.max(0, residualRiskPct));

  return (
    <div
      className="border border-slate-700 bg-slate-900 p-4"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <p className="font-display text-xs uppercase tracking-[0.16em] text-steel">
        {label ?? 'Residual risk vs appetite'}
      </p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p
          className={`font-display text-4xl tabular-nums ${
            tone === 'coral'
              ? 'text-coral'
              : tone === 'amber'
                ? 'text-amber'
                : 'text-appetite'
          }`}
        >
          {residualRiskPct}%
        </p>
        <p className="pb-1 font-mono text-xs text-steel">cap {capPct}%</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden bg-slate-950" style={{ borderRadius: 'var(--radius-sm)' }}>
        <div
          className={`h-full transition-all duration-loop ${
            tone === 'coral'
              ? 'bg-coral'
              : tone === 'amber'
                ? 'bg-amber'
                : 'bg-appetite'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-steel">
        {over
          ? 'Outside appetite — promote blocked'
          : approaching
            ? 'Approaching limit'
            : 'Within appetite'}
      </p>
    </div>
  );
}
