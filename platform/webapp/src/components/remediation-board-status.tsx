import type { RemediationRow } from '@/lib/demo-data';
import { useCaseName } from '@/lib/demo-data';

const STATUS_CLASS: Record<RemediationRow['status'], string> = {
  open: 'text-amber',
  in_progress: 'text-brand',
  board_escalated: 'text-coral',
  closed: 'text-appetite',
};

export function RemediationBoardStatus({ item }: { item: RemediationRow }) {
  return (
    <article
      className="border border-slate-700 bg-slate-900 px-4 py-3"
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {item.boardReportable ? (
            <p className="mb-1 font-display text-xs tracking-[0.18em] text-brand">
              Guardloop
            </p>
          ) : null}
          <h3 className="font-display text-lg text-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-steel">
            {useCaseName(item.useCaseId)} · owner {item.owner}
          </p>
        </div>
        <span
          className={`font-display text-xs uppercase tracking-wider ${STATUS_CLASS[item.status]}`}
        >
          {item.status.replace('_', ' ')}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-steel">
        <span>
          Due <span className="font-mono text-ink">{item.dueDate}</span>
        </span>
        <span>
          Board-reportable{' '}
          <span className={item.boardReportable ? 'text-appetite' : 'text-steel'}>
            {item.boardReportable ? 'yes' : 'no'}
          </span>
        </span>
        {item.linkedAlertId ? (
          <span className="font-mono">{item.linkedAlertId}</span>
        ) : null}
      </div>
    </article>
  );
}
