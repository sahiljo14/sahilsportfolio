// The data path as the repository wires it: a device (or its simulator)
// publishes JSON over MQTT, a Node subscriber writes to PostgreSQL, Express
// serves the history and the React dashboard polls it. There is no WebSocket.
const row1 = [
  { x: 10, label: "Sensor", note: "or simulator" },
  { x: 235, label: "MQTT", note: "broker" },
  { x: 460, label: "Subscriber", note: "Node.js" },
];
const row2 = [
  { x: 460, label: "PostgreSQL", note: "every reading" },
  { x: 235, label: "REST API", note: "Express" },
  { x: 10, label: "Dashboard", note: "React" },
];

export function EnviroDiagram() {
  return (
    <svg
      viewBox="0 0 610 280"
      role="img"
      aria-labelledby="enviro-title"
      className="diagram"
    >
      <title id="enviro-title">
        EnviroSense data path: a sensor or its simulator publishes JSON to an
        MQTT broker, a Node.js subscriber writes each reading to PostgreSQL, an
        Express REST API serves the history, and a React dashboard polls it.
      </title>
      <defs>
        <marker id="env-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 8 4 0 8z" className="d-head" />
        </marker>
      </defs>
      <g className="d-wire" markerEnd="url(#env-arrow)">
        <path d="M150 60 H235" />
        <path d="M375 60 H460" />
        <path d="M530 100 V180" />
        <path d="M460 220 H375" />
        <path d="M235 220 H150" />
      </g>
      <g className="d-box">
        {[...row1.map((n) => ({ ...n, y: 20 })), ...row2.map((n) => ({ ...n, y: 180 }))].map((n) => (
          <rect key={n.label} x={n.x} y={n.y} width="140" height="80" rx="6" />
        ))}
      </g>
      <g className="d-label">
        {[...row1.map((n) => ({ ...n, y: 20 })), ...row2.map((n) => ({ ...n, y: 180 }))].map((n) => (
          <g key={n.label}>
            <text x={n.x + 70} y={n.y + 36} textAnchor="middle">{n.label}</text>
            <text x={n.x + 70} y={n.y + 59} textAnchor="middle" className="d-note">{n.note}</text>
          </g>
        ))}
        <text x="192" y="48" textAnchor="middle" className="d-note">JSON</text>
        <text x="544" y="146" className="d-note">writes</text>
        <text x="192" y="208" textAnchor="middle" className="d-note">polled</text>
      </g>
    </svg>
  );
}
