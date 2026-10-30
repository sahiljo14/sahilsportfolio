// The single-cycle datapath exactly as the repository's units define it:
// program_counter, pc_adder, instruction_memory, control_unit, register_file,
// imm_gen, alu_control, alu, data_memory and the write-back select.
export function RiscvDatapath() {
  return (
    <svg
      viewBox="0 0 880 380"
      role="img"
      aria-labelledby="rv-title"
      className="diagram"
    >
      <title id="rv-title">
        Single-cycle RISC-V datapath: program counter and PC plus 4 adder,
        instruction memory, control unit, register file, immediate generator,
        ALU source select, ALU control, ALU, data memory and write-back select
        feeding the register file.
      </title>
      <defs>
        <marker id="rv-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 8 4 0 8z" className="d-head" />
        </marker>
      </defs>
      <g className="d-wire" markerEnd="url(#rv-arrow)">
        <path d="M100 190 H136" />
        <path d="M70 160 V70 H112" />
        <path d="M190 70 H214 V24 H20 V190 H40" />
        <path d="M250 170 H272 V58 H300" />
        <path d="M250 180 H300" />
        <path d="M250 200 H272 V312 H300" />
        <path d="M420 172 H516" />
        <path d="M420 214 H452" />
        <path d="M420 312 H440 V236 H452" />
        <path d="M472 225 H516" />
        <path d="M420 58 H470" />
        <path d="M540 84 V144" />
        <path d="M592 190 H640" />
        <path d="M430 214 V260 H624 V214 H640" />
        <path d="M612 190 V122 H774 V170 H784" />
        <path d="M750 200 H784" />
        <path d="M804 210 H840 V356 H286 V230 H300" />
      </g>
      <g className="d-box">
        <rect x="40" y="160" width="60" height="60" rx="6" />
        <rect x="112" y="48" width="78" height="44" rx="6" />
        <rect x="136" y="140" width="114" height="100" rx="6" />
        <rect x="300" y="30" width="120" height="56" rx="6" />
        <rect x="300" y="140" width="120" height="110" rx="6" />
        <rect x="300" y="290" width="120" height="44" rx="6" />
        <path d="M452 196 L472 206 V244 L452 254 Z" />
        <rect x="470" y="40" width="110" height="44" rx="6" />
        <path d="M516 140 L592 160 V220 L516 240 V200 L530 190 L516 180 Z" className="d-accent" />
        <rect x="640" y="140" width="110" height="110" rx="6" />
        <path d="M784 160 L804 170 V220 L784 230 Z" />
      </g>
      <g className="d-label">
        <text x="70" y="195" textAnchor="middle">PC</text>
        <text x="151" y="75" textAnchor="middle">PC + 4</text>
        <text x="193" y="186" textAnchor="middle">Instruction</text>
        <text x="193" y="206" textAnchor="middle">memory</text>
        <text x="360" y="63" textAnchor="middle">Control</text>
        <text x="360" y="190" textAnchor="middle">Register</text>
        <text x="360" y="210" textAnchor="middle">file (x0–x31)</text>
        <text x="360" y="317" textAnchor="middle">Imm gen</text>
        <text x="525" y="67" textAnchor="middle">ALU control</text>
        <text x="556" y="195" textAnchor="middle">ALU</text>
        <text x="695" y="190" textAnchor="middle">Data</text>
        <text x="695" y="210" textAnchor="middle">memory</text>
        <text x="560" y="374" textAnchor="middle" className="d-note">write-back to rd</text>
      </g>
    </svg>
  );
}
