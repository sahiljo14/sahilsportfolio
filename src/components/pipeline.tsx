export function Pipeline({
  steps,
  label,
  caption,
}: {
  steps: { label: string; note: string }[];
  label: string;
  caption?: string;
}) {
  return (
    <figure className="pipeline">
      <ol aria-label={label} style={{ "--steps": steps.length } as React.CSSProperties}>
        {steps.map((step) => (
          <li key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
