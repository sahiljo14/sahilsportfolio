// A top-down line drawing of a generic ATX board. Labels name the parts Sahil
// has swapped or added over the years; no real model is depicted.
// Leaders run horizontally, ordered top to bottom, so none cross.
const callouts = [
  { label: "AIO cooler", x: 302, y: 122 },
  { label: "RAM", x: 418, y: 156 },
  { label: "CPU", x: 318, y: 198 },
  { label: "SSD", x: 302, y: 251 },
  { label: "GPU", x: 372, y: 302 },
  { label: "Motherboard", x: 430, y: 424 },
];

export function BoardDrawing() {
  return (
    <figure className="board">
      <svg
        viewBox="0 0 640 460"
        role="img"
        aria-labelledby="board-title"
        className="board-svg"
      >
        <title id="board-title">
          Line drawing of a PC motherboard from above, labelled CPU, AIO
          cooler, RAM, GPU, SSD and motherboard.
        </title>
        <g className="board-ink" fill="none">
          <rect x="40" y="20" width="400" height="420" rx="6" />
          {/* I/O shield and VRM heatsinks */}
          <rect x="40" y="36" width="40" height="150" />
          <rect x="96" y="36" width="120" height="26" rx="3" />
          <rect x="96" y="70" width="26" height="110" rx="3" />
          {/* CPU socket under the cooler block */}
          <rect x="196" y="78" width="132" height="132" rx="4" />
          <circle cx="262" cy="144" r="46" className="board-accent" />
          <circle cx="262" cy="144" r="30" />
          {/* AIO tubes leave the board toward the radiator */}
          <path d="M248 99 C 248 60, 236 30, 236 0" className="board-accent" />
          <path d="M276 99 C 276 60, 288 30, 288 0" className="board-accent" />
          {/* DIMM slots */}
          {[372, 386, 400, 414].map((x) => (
            <rect key={x} x={x} y="52" width="8" height="196" rx="2" />
          ))}
          {/* M.2 slot */}
          <rect x="110" y="242" width="200" height="18" rx="2" />
          <circle cx="302" cy="251" r="3" />
          {/* PCIe x16 and GPU outline */}
          <rect x="80" y="292" width="300" height="12" rx="2" />
          <rect x="60" y="282" width="360" height="40" rx="4" className="board-dash" />
          <rect x="80" y="352" width="300" height="8" rx="2" />
          <rect x="80" y="392" width="160" height="8" rx="2" />
          {/* chipset */}
          <rect x="300" y="360" width="56" height="56" rx="3" />
        </g>
        <g className="board-labels">
          {callouts.map((c) => (
            <g key={c.label}>
              <path d={`M${c.x} ${c.y} H486`} />
              <circle cx={c.x} cy={c.y} r="3.5" />
              <text x="494" y={c.y + 5}>
                {c.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption>
        Illustration, not my actual board. The labelled parts are the ones
        I’ve swapped or added over the years.
      </figcaption>
    </figure>
  );
}
