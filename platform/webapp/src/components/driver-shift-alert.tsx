import type { MonitorAlertRow } from '@/lib/demo-data';

export function DriverShiftAlert({ alert }: { alert: MonitorAlertRow }) {
  const isDriver = alert.kind === 'driver_shift';

  return (
    <article
      className={`motion-alert border px-4 py-3 ${
        alert.severity === 'coral'
          ? 'border-coral/40 bg-coral/10'
          : 'border-amber/40 bg-amber/10'
      }`}
      style={{ borderRadius: 'var(--radius-md)' }}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.16em] text-steel">
            {isDriver ? 'Driver shift' : alert.kind.replace('_', ' ')}
          </p>
          <h3 className="mt-1 font-display text-lg text-ink">{alert.title}</h3>
          {isDriver && alert.driverFeature ? (
            <p className="mt-2 font-mono text-sm text-steel">
              {alert.driverFeature}
              {typeof alert.driverSharePct === 'number'
                ? ` · ${alert.driverSharePct}% of drivers`
                : ''}
            </p>
          ) : null}
        </div>
        <span
          className={`shrink-0 text-xs uppercase tracking-wider ${
            alert.severity === 'coral' ? 'text-coral' : 'text-amber'
          }`}
        >
          {alert.acknowledged ? 'acked' : 'open'}
        </span>
      </div>
      <p className="mt-2 text-xs text-steel">
        Raised {new Date(alert.raisedAt).toLocaleString()}
      </p>
    </article>
  );
}
