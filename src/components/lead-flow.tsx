// Lead Finder's process, drawn around its one hard stop: a person. Everything
// here is already public in the case study; the tool itself stays private.
const zones = [
  {
    title: "The tool researches and drafts",
    from: 0,
    to: 4,
    guard: "Dry run by default.",
    detail: "New campaigns and the sending switch start in dry run. Someone has to turn it off on purpose.",
  },
  {
    title: "A person decides",
    from: 4,
    to: 5,
    guard: "No approval, no email.",
    detail: "Every prospect email waits in a queue.",
  },
  {
    title: "Then it sends",
    from: 5,
    to: 6,
    guard: "A reply stops it.",
    detail: "Follow-ups end as soon as one arrives.",
  },
];

export function LeadFlow({ steps }: { steps: { label: string; note: string }[] }) {
  return (
    <figure className="flow">
      <div className="flow-zones">
        {zones.map((zone) => (
          <section className="flow-zone" key={zone.title}>
            <h3>{zone.title}</h3>
            <ol>
              {steps.slice(zone.from, zone.to).map((step, i) => (
                <li key={step.label}>
                  <span className="flow-n">{zone.from + i + 1}</span>
                  <strong>{step.label}</strong>
                  <span>{step.note}</span>
                </li>
              ))}
            </ol>
            <p className="flow-guard">
              <strong>{zone.guard}</strong> {zone.detail}
            </p>
          </section>
        ))}
      </div>
      <figcaption>
        Diagram of the process, not a screenshot. The tool is internal, so it
        isn’t shown here.
      </figcaption>
    </figure>
  );
}
