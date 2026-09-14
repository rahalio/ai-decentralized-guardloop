export function ScreenHeader({
  title,
  kicker,
  brandMark,
}: {
  title: string;
  kicker?: string;
  brandMark?: boolean;
}) {
  return (
    <header className="mb-8">
      {brandMark ? (
        <p className="mb-3 font-display text-sm tracking-[0.2em] text-brand">
          Guardloop
        </p>
      ) : null}
      {kicker ? (
        <p className="mb-2 font-display text-xs uppercase tracking-[0.18em] text-steel">
          {kicker}
        </p>
      ) : null}
      <h1 className="font-display text-3xl tracking-wide text-ink">{title}</h1>
    </header>
  );
}
