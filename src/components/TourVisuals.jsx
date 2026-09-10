// A library of small, original SVG diagrams used by the guided tour
// (GuidedTourPopover.jsx). None of these reproduce a figure from any
// paper or site — they're simplified, hand-drawn restatements of a
// single idea per slide, built from the theme's own color tokens so
// they sit visually inside the rest of the page.

const INK = "#211F1B";
const INKFAINT = "#6B6459";
const PAPER = "#EFE9DC";
const COT = "#2E6E7E";
const COT_LINE = "#1F4E5A";
const LATENT = "#B8722E";
const LATENT_LINE = "#8A5320";
const BDH = "#6E3FC2";
const BDH_LINE = "#4F2C97";
const SIGNAL = "#8B3A3A";

function Frame({ children }) {
  return (
    <svg viewBox="0 0 160 90" className="w-full h-full" role="img" aria-hidden="true">
      {children}
    </svg>
  );
}

function PixelGrid({ x, y, cell = 10, cols, rows, colors, gap = 2 }) {
  return (
    <>
      {colors.map((fill, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return (
          <rect
            key={i}
            x={x + c * (cell + gap)}
            y={y + r * (cell + gap)}
            width={cell}
            height={cell}
            rx={1.5}
            fill={fill}
          />
        );
      })}
    </>
  );
}

/* ---------- Architecture basics (existing 3 steps) ---------- */

export function PostTransformerIcon() {
  const cells = Array.from({ length: 16 }, () => `${INKFAINT}33`);
  return (
    <Frame>
      <PixelGrid x={10} y={16} cell={11} cols={4} rows={4} colors={cells} />
      <line x1="8" y1="14" x2="66" y2="72" stroke={SIGNAL} strokeWidth="3" />
      <line x1="66" y1="14" x2="8" y2="72" stroke={SIGNAL} strokeWidth="3" />
      <text x="37" y="85" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        attention grid
      </text>
      <rect x="102" y="23" width="42" height="42" rx="5" fill={LATENT} />
      <text x="123" y="85" fontSize="7" fill={LATENT_LINE} textAnchor="middle" fontFamily="monospace">
        fixed state
      </text>
      <path d="M72 44 H98" stroke={INK} strokeWidth="2" markerEnd="url(#arrow1)" />
      <defs>
        <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={INK} />
        </marker>
      </defs>
    </Frame>
  );
}

export function StateIcon() {
  return (
    <Frame>
      <g opacity="0.35">
        <rect x="8" y="18" width="16" height="16" rx="2" fill={INKFAINT} />
        <rect x="27" y="18" width="16" height="16" rx="2" fill={INKFAINT} />
        <rect x="46" y="18" width="16" height="16" rx="2" fill={INKFAINT} />
        <rect x="65" y="18" width="16" height="16" rx="2" fill={INKFAINT} />
        <text x="45" y="46" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
          notepad keeps growing
        </text>
      </g>
      <rect x="112" y="14" width="36" height="36" rx="4" fill={LATENT} stroke={LATENT_LINE} strokeWidth="1.5" />
      <text x="130" y="64" fontSize="7" fill={LATENT_LINE} textAnchor="middle" fontFamily="monospace">
        same 6×6, always
      </text>
    </Frame>
  );
}

export function RecurrentIcon() {
  return (
    <Frame>
      <rect x="60" y="30" width="40" height="30" rx="4" fill={LATENT} opacity="0.85" />
      <text x="80" y="49" fontSize="8" fill={PAPER} textAnchor="middle" fontFamily="monospace">
        state
      </text>
      <path
        d="M100 34 C130 20, 130 70, 100 56"
        fill="none"
        stroke={LATENT_LINE}
        strokeWidth="2.5"
        markerEnd="url(#loop1)"
      />
      <defs>
        <marker id="loop1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={LATENT_LINE} />
        </marker>
      </defs>
      <text x="80" y="78" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        same rule, run again
      </text>
    </Frame>
  );
}

export function DecodeIcon() {
  return (
    <Frame>
      <rect x="18" y="24" width="34" height="34" rx="4" fill={LATENT} opacity="0.85" />
      <text x="35" y="45" fontSize="7" fill={PAPER} textAnchor="middle" fontFamily="monospace">
        state
      </text>
      <path d="M56 41 H92" stroke={INK} strokeWidth="2" markerEnd="url(#arrow2)" strokeDasharray="0" />
      <defs>
        <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={INK} />
        </marker>
      </defs>
      <rect x="96" y="28" width="46" height="26" rx="4" fill="none" stroke={INK} strokeWidth="1.5" />
      <text x="119" y="45" fontSize="7" fill={INK} textAnchor="middle" fontFamily="monospace">
        answer
      </text>
      <text x="80" y="76" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        one decode, at the very end
      </text>
    </Frame>
  );
}

/* ---------- Section: The Equations of Reasoning ---------- */

export function EquationsIntroIcon() {
  return (
    <Frame>
      <circle cx="30" cy="30" r="7" fill={BDH} />
      <circle cx="60" cy="20" r="5" fill={BDH} opacity="0.8" />
      <circle cx="55" cy="55" r="6" fill={BDH} opacity="0.8" />
      <circle cx="85" cy="40" r="5" fill={BDH} opacity="0.7" />
      <line x1="30" y1="30" x2="60" y2="20" stroke={BDH_LINE} strokeWidth="1.5" />
      <line x1="30" y1="30" x2="55" y2="55" stroke={BDH_LINE} strokeWidth="1.5" />
      <line x1="55" y1="55" x2="85" y2="40" stroke={BDH_LINE} strokeWidth="1.5" />
      <text x="118" y="30" fontSize="18" fill={BDH_LINE} fontFamily="serif" fontStyle="italic">
        Σ
      </text>
      <text x="110" y="50" fontSize="14" fill={BDH_LINE} fontFamily="serif" fontStyle="italic">
        Δw
      </text>
      <text x="60" y="80" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        a compact per-round ruleset
      </text>
    </Frame>
  );
}

export function SparsePositiveIcon() {
  const colors = [
    "#00000010", BDH, "#00000010", "#00000010",
    "#00000010", "#00000010", BDH, "#00000010",
    BDH, "#00000010", "#00000010", "#00000010",
    "#00000010", "#00000010", "#00000010", BDH,
  ];
  return (
    <Frame>
      <PixelGrid x={22} y={16} cell={12} cols={4} rows={4} colors={colors} gap={2} />
      <text x="60" y="80" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        mostly zero, never negative
      </text>
    </Frame>
  );
}

export function HebbianIcon() {
  return (
    <Frame>
      <circle cx="30" cy="45" r="12" fill={BDH_LINE} />
      <circle cx="120" cy="45" r="12" fill={BDH_LINE} />
      <line x1="42" y1="45" x2="108" y2="45" stroke={BDH} strokeWidth="5" strokeLinecap="round" />
      <text x="30" y="49" fontSize="7" fill={PAPER} textAnchor="middle" fontFamily="monospace">A</text>
      <text x="120" y="49" fontSize="7" fill={PAPER} textAnchor="middle" fontFamily="monospace">B</text>
      <text x="75" y="72" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        fire together → wire together
      </text>
    </Frame>
  );
}

export function SpikeIcon() {
  return (
    <Frame>
      <line x1="10" y1="60" x2="150" y2="60" stroke={INKFAINT} strokeWidth="1" strokeDasharray="3,3" />
      <text x="152" y="30" fontSize="6" fill={SIGNAL} textAnchor="end" fontFamily="monospace">threshold</text>
      <line x1="10" y1="30" x2="150" y2="30" stroke={SIGNAL} strokeWidth="1" strokeDasharray="3,3" />
      <path
        d="M10 60 L30 58 L38 20 L42 60 L60 55 L68 20 L72 60 L100 58 L108 20 L112 60 L140 57"
        fill="none"
        stroke={BDH_LINE}
        strokeWidth="2"
      />
    </Frame>
  );
}

export function LocalityIcon() {
  return (
    <Frame>
      <g opacity="0.25">
        {Array.from({ length: 25 }, (_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          return <rect key={i} x={10 + c * 10} y={10 + r * 10} width="8" height="8" fill={INKFAINT} />;
        })}
      </g>
      <circle cx="70" cy="45" r="16" fill="none" stroke={BDH_LINE} strokeWidth="2" strokeDasharray="3,2" />
      <circle cx="70" cy="45" r="4" fill={BDH} />
      <circle cx="58" cy="35" r="3" fill={BDH} opacity="0.7" />
      <circle cx="82" cy="35" r="3" fill={BDH} opacity="0.7" />
      <circle cx="58" cy="55" r="3" fill={BDH} opacity="0.7" />
      <circle cx="82" cy="55" r="3" fill={BDH} opacity="0.7" />
      <line x1="70" y1="45" x2="58" y2="35" stroke={BDH_LINE} strokeWidth="1" />
      <line x1="70" y1="45" x2="82" y2="35" stroke={BDH_LINE} strokeWidth="1" />
      <line x1="70" y1="45" x2="58" y2="55" stroke={BDH_LINE} strokeWidth="1" />
      <line x1="70" y1="45" x2="82" y2="55" stroke={BDH_LINE} strokeWidth="1" />
      <text x="120" y="47" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        only neighbors matter
      </text>
    </Frame>
  );
}

export function WorkingMemoryIcon() {
  const colors = [
    BDH, "#00000015", BDH, "#00000015",
    "#00000015", BDH, "#00000015", "#00000015",
    BDH, "#00000015", BDH, "#00000015",
  ];
  return (
    <Frame>
      <PixelGrid x={14} y={20} cell={11} cols={4} rows={3} colors={colors} gap={2} />
      <text x="105" y="30" fontSize="7" fill={INKFAINT} fontFamily="monospace">memory =</text>
      <text x="105" y="42" fontSize="7" fill={INKFAINT} fontFamily="monospace">which synapses</text>
      <text x="105" y="54" fontSize="7" fill={INKFAINT} fontFamily="monospace">stay strong</text>
    </Frame>
  );
}

export function GpuIcon() {
  return (
    <Frame>
      <rect x="16" y="18" width="50" height="50" rx="4" fill="none" stroke={BDH_LINE} strokeWidth="2" />
      <text x="41" y="46" fontSize="7" fill={BDH_LINE} textAnchor="middle" fontFamily="monospace">graph</text>
      <text x="41" y="56" fontSize="7" fill={BDH_LINE} textAnchor="middle" fontFamily="monospace">dynamics</text>
      <path d="M70 43 H92" stroke={INK} strokeWidth="2" markerEnd="url(#arrow3)" />
      <defs>
        <marker id="arrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={INK} />
        </marker>
      </defs>
      <rect x="96" y="14" width="50" height="58" rx="4" fill={BDH} opacity="0.85" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={100} y1={22 + i * 10} x2={142} y2={22 + i * 10} stroke={PAPER} strokeWidth="2" />
      ))}
    </Frame>
  );
}

export function ScaleFreeIcon() {
  const spokes = [
    [40, 15], [15, 45], [40, 75], [65, 60], [70, 25], [95, 40],
  ];
  return (
    <Frame>
      <circle cx="45" cy="45" r="9" fill={BDH_LINE} />
      {spokes.map(([x, y], i) => (
        <g key={i}>
          <line x1="45" y1="45" x2={x} y2={y} stroke={BDH} strokeWidth="1.25" />
          <circle cx={x} cy={y} r="3" fill={BDH} />
        </g>
      ))}
      <circle cx="120" cy="55" r="4" fill={BDH} />
      <line x1="120" y1="55" x2="140" y2="45" stroke={BDH} strokeWidth="1" />
      <circle cx="140" cy="45" r="2" fill={BDH} opacity="0.7" />
      <text x="80" y="86" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        a few hubs, many followers
      </text>
    </Frame>
  );
}

export function MonosemanticIcon() {
  return (
    <Frame>
      <circle cx="80" cy="45" r="10" fill={BDH} />
      <text x="80" y="48" fontSize="7" fill={PAPER} textAnchor="middle" fontFamily="monospace">n</text>
      {[
        [24, 18, "dog"],
        [24, 45, "puppy"],
        [24, 72, "canine"],
      ].map(([x, y, label], i) => (
        <g key={i}>
          <line x1={x + 18} y1={y} x2={70} y2={45} stroke={BDH_LINE} strokeWidth="1" strokeDasharray="2,2" />
          <rect x={x - 16} y={y - 8} width="34" height="16" rx="8" fill="none" stroke={BDH_LINE} strokeWidth="1" />
          <text x={x} y={y + 3} fontSize="6" fill={BDH_LINE} textAnchor="middle" fontFamily="monospace">
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ---------- Section: Evaluating Mathematical & Abstract Reasoning ---------- */

export function ArcGridIcon() {
  const inColors = [LATENT, PAPER, LATENT, PAPER, LATENT, PAPER, LATENT, PAPER, LATENT];
  const outColors = [PAPER, LATENT, PAPER, LATENT, PAPER, LATENT, PAPER, LATENT, PAPER];
  return (
    <Frame>
      <PixelGrid x={10} y={20} cell={14} cols={3} rows={3} colors={inColors} gap={2} />
      <path d="M62 45 H86" stroke={INK} strokeWidth="2" markerEnd="url(#arrow4)" />
      <defs>
        <marker id="arrow4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={INK} />
        </marker>
      </defs>
      <PixelGrid x={92} y={20} cell={14} cols={3} rows={3} colors={outColors} gap={2} />
      <text x="80" y="82" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        infer the rule, apply it once
      </text>
    </Frame>
  );
}

export function PassTwoIcon() {
  return (
    <Frame>
      <rect x="14" y="20" width="50" height="24" rx="4" fill="none" stroke={SIGNAL} strokeWidth="1.5" />
      <text x="39" y="36" fontSize="7" fill={SIGNAL} textAnchor="middle" fontFamily="monospace">attempt 1</text>
      <rect x="14" y="50" width="50" height="24" rx="4" fill={LATENT} opacity="0.85" />
      <text x="39" y="66" fontSize="7" fill={PAPER} textAnchor="middle" fontFamily="monospace">attempt 2</text>
      <path d="M70 62 H100" stroke={INK} strokeWidth="2" markerEnd="url(#arrow5)" />
      <defs>
        <marker id="arrow5" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={INK} />
        </marker>
      </defs>
      <circle cx="122" cy="62" r="14" fill="none" stroke={LATENT_LINE} strokeWidth="2" />
      <path d="M115 62 L120 68 L130 55" fill="none" stroke={LATENT_LINE} strokeWidth="2.5" />
    </Frame>
  );
}

export function CostClockIcon() {
  return (
    <Frame>
      <circle cx="45" cy="45" r="26" fill="none" stroke={LATENT_LINE} strokeWidth="2.5" />
      <line x1="45" y1="45" x2="45" y2="28" stroke={LATENT_LINE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="45" y1="45" x2="58" y2="50" stroke={LATENT_LINE} strokeWidth="2.5" strokeLinecap="round" />
      <text x="112" y="52" fontSize="20" fill={LATENT_LINE} textAnchor="middle" fontFamily="serif">
        $
      </text>
      <text x="80" y="80" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        measured, not estimated
      </text>
    </Frame>
  );
}

export function ConceptArcIcon() {
  const positions = [
    [28, 20], [50, 15], [72, 22], [30, 42], [55, 40], [78, 45],
    [26, 65], [50, 68], [74, 65], [95, 30], [100, 55], [15, 45],
  ];
  return (
    <Frame>
      {positions.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="14" height="14" rx="3" fill={BDH} opacity={0.4 + (i % 4) * 0.15} />
      ))}
      <text x="120" y="45" fontSize="7" fill={INKFAINT} fontFamily="monospace">16</text>
      <text x="120" y="56" fontSize="6" fill={INKFAINT} fontFamily="monospace">concept</text>
      <text x="120" y="65" fontSize="6" fill={INKFAINT} fontFamily="monospace">families</text>
    </Frame>
  );
}

export function SudokuIcon() {
  const nums = ["5", "3", "", "6", "", "", "", "9", "8"];
  return (
    <Frame>
      <g transform="translate(40,12)">
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 3 }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 22}
              y={r * 22}
              width="22"
              height="22"
              fill="none"
              stroke={INK}
              strokeWidth={r % 3 === 0 || c % 3 === 0 ? 1.5 : 0.5}
            />
          ))
        )}
        {nums.map((n, i) =>
          n ? (
            <text
              key={i}
              x={(i % 3) * 22 + 11}
              y={Math.floor(i / 3) * 22 + 15}
              fontSize="11"
              fill={LATENT_LINE}
              textAnchor="middle"
              fontFamily="monospace"
            >
              {n}
            </text>
          ) : null
        )}
      </g>
    </Frame>
  );
}

export function InductiveIcon() {
  return (
    <Frame>
      <text x="10" y="20" fontSize="7" fill={SIGNAL} fontFamily="monospace">transductive</text>
      <path d="M10 30 H70" stroke={SIGNAL} strokeWidth="2" />
      <rect x="30" y="24" width="20" height="12" rx="2" fill={SIGNAL} opacity="0.25" />
      <text x="40" y="33" fontSize="5.5" fill={SIGNAL} textAnchor="middle" fontFamily="monospace">peeks</text>
      <path d="M70 30 H90" stroke={SIGNAL} strokeWidth="2" markerEnd="url(#arrow6)" />
      <text x="10" y="60" fontSize="7" fill={LATENT_LINE} fontFamily="monospace">BDH-CQ: inductive</text>
      <path d="M10 70 H90" stroke={LATENT_LINE} strokeWidth="2" markerEnd="url(#arrow7)" />
      <defs>
        <marker id="arrow6" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={SIGNAL} />
        </marker>
        <marker id="arrow7" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={LATENT_LINE} />
        </marker>
      </defs>
    </Frame>
  );
}

export function BabilongIcon() {
  const marks = [22, 61, 108];
  return (
    <Frame>
      <rect x="10" y="38" width="140" height="14" rx="3" fill={`${INKFAINT}22`} />
      {marks.map((x, i) => (
        <rect key={i} x={x} y={38} width="10" height="14" rx="2" fill={BDH} />
      ))}
      <text x="80" y="66" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">
        a few facts in a long haystack
      </text>
    </Frame>
  );
}

export function PendingIcon() {
  return (
    <Frame>
      <circle cx="45" cy="45" r="24" fill="none" stroke={INKFAINT} strokeWidth="2" strokeDasharray="4,3" />
      <text x="45" y="52" fontSize="20" fill={INKFAINT} textAnchor="middle" fontFamily="serif">
        ?
      </text>
      <text x="112" y="38" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">pending</text>
      <text x="112" y="50" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">independent</text>
      <text x="112" y="62" fontSize="7" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">validation</text>
    </Frame>
  );
}

export function RoadmapIcon() {
  return (
    <Frame>
      <path d="M12 65 Q50 20 148 30" fill="none" stroke={INKFAINT} strokeWidth="2" strokeDasharray="4,3" />
      <circle cx="12" cy="65" r="5" fill={LATENT_LINE} />
      <text x="12" y="80" fontSize="6.5" fill={INKFAINT} textAnchor="middle" fontFamily="monospace">ARC-AGI-1</text>
      <circle cx="148" cy="30" r="6" fill="none" stroke={SIGNAL} strokeWidth="2" strokeDasharray="2,2" />
      <text x="148" y="18" fontSize="6.5" fill={SIGNAL} textAnchor="middle" fontFamily="monospace">ARC-AGI-2</text>
    </Frame>
  );
}
