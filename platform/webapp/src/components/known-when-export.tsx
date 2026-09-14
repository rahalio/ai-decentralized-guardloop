import type { AuditExportRow } from '@/lib/demo-data';

export function KnownWhenExport({ pack }: { pack: AuditExportRow }) {
  return (
    <div
      className="border border-slate-700 bg-slate-900 p-5"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <p className="font-display text-sm tracking-[0.2em] text-brand">Guardloop</p>
      <h2 className="mt-2 font-display text-2xl text-ink">{pack.periodLabel}</h2>
      <p className="mt-1 font-mono text-xs text-steel">
        {pack.from} → {pack.to} · {pack.exportId}
      </p>
      <p className={`mt-3 text-sm ${pack.loopComplete ? 'text-appetite' : 'text-amber'}`}>
        {pack.loopComplete
          ? 'I–A–C–M evidence complete for period'
          : 'Incomplete loop stages flagged'}
        {' · '}
        {pack.remediationOpen} open remediation
        {pack.remediationOpen === 1 ? '' : 's'}
      </p>
      <ol className="mt-5 space-y-2">
        {pack.stages.map((s) => (
          <li
            key={s.stage}
            className="flex items-center justify-between border border-slate-700/70 px-3 py-2 text-sm"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            <span className="capitalize text-ink">{s.stage}</span>
            <span className="font-mono text-xs text-steel">
              {s.evidenceCount} artefacts · known {new Date(s.knownWhen).toLocaleString()}
            </span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="mt-5 bg-brand px-4 py-2 font-display text-sm text-slate-950"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        Download regulator pack
      </button>
    </div>
  );
}
