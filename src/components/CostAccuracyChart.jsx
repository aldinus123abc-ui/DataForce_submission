import {
  REPORTED,
  EFFORT_MIN,
  EFFORT_MAX,
  cotCost,
  cotAccuracy,
  latentCost,
  latentAccuracy,
} from "../data/reasoningModel.js";
import { BG_FAMILIES, BG_SINGLES, PRE_BDH_FRONTIER } from "../data/frontierBackground.js";

const W = 1000;
const H = 620;
const PAD_L = 68;
const PAD_R = 28;
const PAD_T = 30;
const PAD_B = 56;

const COST_MIN = 0.0003;
const COST_MAX = 10;
const ACC_MIN = 0;
const ACC_MAX = 100;

// The three tiers the reference chart labels "Low / Medium / High" are just
// three points read off the same continuous BDH-CQ curve from
// reasoningModel.js — effort = EFFORT_MAX reproduces the published endpoint
// (29.5% @ $0.0007) exactly; Low/Medium are earlier points on that same
// illustrative curve, not separate measurements.
const LOW_EFFORT = Math.round(EFFORT_MAX * 0.35);
const MED_EFFORT = Math.round(EFFORT_MAX * 0.75);
const HIGH_EFFORT = EFFORT_MAX;

function xScale(cost) {
  const lo = Math.log10(COST_MIN);
  const hi = Math.log10(COST_MAX);
  const v = (Math.log10(Math.max(cost, COST_MIN)) - lo) / (hi - lo);
  return PAD_L + v * (W - PAD_L - PAD_R);
}

function yScale(acc) {
  const v = (acc - ACC_MIN) / (ACC_MAX - ACC_MIN);
  return H - PAD_B - v * (H - PAD_T - PAD_B);
}

function buildPath(points) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.cost).toFixed(1)},${yScale(p.acc).toFixed(1)}`)
    .join(" ");
}

function buildCurvePath(costFn, accFn) {
  const pts = [];
  for (let e = EFFORT_MIN; e <= EFFORT_MAX; e++) {
    pts.push({ cost: costFn(e), acc: accFn(e) });
  }
  return buildPath(pts);
}

const costTicks = [0.0005, 0.001, 0.01, 0.1, 1, 10];
const accTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function fmtCost(c) {
  if (c < 0.001) return `$${c.toFixed(4)}`;
  if (c < 0.01) return `$${c.toFixed(3)}`;
  if (c < 1) return `$${c.toFixed(2)}`;
  return `$${c}`;
}

export default function CostAccuracyChart({ effort }) {
  // Assemble the full "Pre-BDH-CQ Pareto frontier", splicing in the one
  // real published anchor (GPT-5.6 Luna, Low) between the illustrative
  // reconstruction points on either side of it.
  const frontierPoints = [
    PRE_BDH_FRONTIER[0],
    PRE_BDH_FRONTIER[1],
    {
      cost: REPORTED.cot.costPerTask,
      acc: REPORTED.cot.accuracy,
      label: REPORTED.cot.label,
      value: `${REPORTED.cot.accuracy}% @ ${fmtCost(REPORTED.cot.costPerTask)}`,
      footnote: 3,
      reported: true,
    },
    ...PRE_BDH_FRONTIER.slice(2),
  ];
  const frontierPath = buildPath(frontierPoints);

  const cotPath = buildCurvePath(cotCost, cotAccuracy);
  const latentPath = buildCurvePath(latentCost, latentAccuracy);

  const cotNow = { x: xScale(cotCost(effort)), y: yScale(cotAccuracy(effort)) };
  const latentNow = { x: xScale(latentCost(effort)), y: yScale(latentAccuracy(effort)) };

  const bdhLow = { cost: latentCost(LOW_EFFORT), acc: latentAccuracy(LOW_EFFORT) };
  const bdhMed = { cost: latentCost(MED_EFFORT), acc: latentAccuracy(MED_EFFORT) };
  const bdhHigh = { cost: latentCost(HIGH_EFFORT), acc: latentAccuracy(HIGH_EFFORT) };
  const bdhPath = buildPath([bdhLow, bdhMed, bdhHigh]);

  return (
    <section id="frontier" className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-10">
      <h2 className="font-display text-2xl lg:text-3xl mb-2">ARC-AGI-1 Efficiency Frontier</h2>
      <p className="font-body text-ink/70 max-w-prose mb-6">
        The purple points are BDH-CQ's Low / Medium / High tiers — three
        readings off the same illustrative curve from the dial above, with
        High reproducing the published endpoint exactly. The ring marker
        tracks your slider live. Everything in gray is a rough,
        hand-placed reconstruction of a busy leaderboard chart for visual
        context, not a set of separately measured results.
      </p>

      <div className="border border-ink/10 bg-paper2/50 rounded-lg p-3 sm:p-4 lg:p-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="ARC-AGI-1 cost versus accuracy efficiency frontier"
        >
          {/* gridlines */}
          {costTicks.map((c) => (
            <g key={c}>
              <line x1={xScale(c)} x2={xScale(c)} y1={PAD_T} y2={H - PAD_B} stroke="#21201b" strokeOpacity="0.08" />
              <text
                x={xScale(c)}
                y={H - PAD_B + 18}
                textAnchor="middle"
                className="font-mono"
                fontSize="10"
                fill="#6B6459"
              >
                {fmtCost(c)}
              </text>
            </g>
          ))}
          {accTicks.map((a) => (
            <g key={a}>
              <line x1={PAD_L} x2={W - PAD_R} y1={yScale(a)} y2={yScale(a)} stroke="#21201b" strokeOpacity="0.08" />
              <text
                x={PAD_L - 10}
                y={yScale(a) + 3}
                textAnchor="end"
                className="font-mono"
                fontSize="10"
                fill="#6B6459"
              >
                {a}%
              </text>
            </g>
          ))}

          <text
            x={(PAD_L + (W - PAD_R)) / 2}
            y={H - 12}
            textAnchor="middle"
            fontSize="11"
            fill="#6B6459"
            className="font-mono"
          >
            cost per task (USD; log scale)
          </text>
          <text
            x={20}
            y={(PAD_T + (H - PAD_B)) / 2}
            textAnchor="middle"
            fontSize="11"
            fill="#6B6459"
            className="font-mono"
            transform={`rotate(-90 20 ${(PAD_T + (H - PAD_B)) / 2})`}
          >
            ARC-AGI-1 score (pass@2)
          </text>

          {/* faint background model "families" — illustrative set-dressing only */}
          {BG_FAMILIES.map((fam) => (
            <g key={fam.key} opacity="0.35">
              <path d={buildPath(fam.points)} fill="none" stroke="#21201b" strokeOpacity="0.25" strokeWidth="1" />
              {fam.points.map((p, i) => (
                <g key={i}>
                  <circle cx={xScale(p.cost)} cy={yScale(p.acc)} r="2.6" fill="#8b8578" />
                  {p.label && (
                    <text
                      x={xScale(p.cost) + 6}
                      y={yScale(p.acc) - 4}
                      fontSize="8.5"
                      fill="#8b8578"
                      className="font-mono"
                    >
                      {p.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          ))}
          {BG_SINGLES.map((p, i) => (
            <g key={i} opacity="0.35">
              <circle cx={xScale(p.cost)} cy={yScale(p.acc)} r="2.6" fill="#8b8578" />
              <text x={xScale(p.cost) + 6} y={yScale(p.acc) - 4} fontSize="8.5" fill="#8b8578" className="font-mono">
                {p.label}
              </text>
            </g>
          ))}

          {/* Pre-BDH-CQ Pareto frontier: dotted line through the strongest
              prior cost/accuracy trade-offs, one of which (GPT-5.6 Luna,
              Low) is a real published figure. */}
          <path d={frontierPath} fill="none" stroke="#4A463D" strokeOpacity="0.75" strokeWidth="1.5" strokeDasharray="2 4" />
          {frontierPoints
            .filter((p) => p.label)
            .map((p, i) => (
              <g key={i}>
                <circle cx={xScale(p.cost)} cy={yScale(p.acc)} r="4.5" fill="#4A463D" />
                <text
                  x={xScale(p.cost) + (p.dx ?? 8)}
                  y={yScale(p.acc) + (p.dy ?? -8)}
                  fontSize="10.5"
                  fontWeight="600"
                  fill="#2c2a24"
                  className="font-mono"
                >
                  {p.label}
                  {p.footnote && <tspan fontSize="7" baselineShift="super">{p.footnote}</tspan>}
                </text>
                {p.value && (
                  <text
                    x={xScale(p.cost) + (p.dx ?? 8)}
                    y={yScale(p.acc) + (p.dy ?? -8) + 16}
                    fontSize="9"
                    fill="#4A463D"
                    className="font-mono"
                  >
                    {p.value}
                  </text>
                )}
              </g>
            ))}

          {/* subdued chain-of-thought curve, still driven by the slider */}
          <path d={cotPath} fill="none" stroke="#2E6E7E" strokeWidth="1.5" opacity="0.3" />
          <circle cx={cotNow.x} cy={cotNow.y} r="4" fill="#EFE9DC" stroke="#2E6E7E" strokeWidth="2" opacity="0.55" />

          {/* BDH-CQ: the highlighted purple curve, tiers, and live marker */}
          <path d={bdhPath} fill="none" stroke="#6E3FC2" strokeWidth="2.5" />
          <path d={latentPath} fill="none" stroke="#6E3FC2" strokeWidth="1" strokeOpacity="0.25" />

          <circle cx={xScale(bdhLow.cost)} cy={yScale(bdhLow.acc)} r="6" fill="#EFE9DC" stroke="#6E3FC2" strokeWidth="2.5" />
          <text x={xScale(bdhLow.cost) - 10} y={yScale(bdhLow.acc) + 20} fontSize="11" fontWeight="600" fill="#4F2C97" className="font-mono">
            Low
          </text>

          <circle cx={xScale(bdhMed.cost)} cy={yScale(bdhMed.acc)} r="6" fill="#EFE9DC" stroke="#6E3FC2" strokeWidth="2.5" />
          <text x={xScale(bdhMed.cost) + 10} y={yScale(bdhMed.acc) + 22} fontSize="11" fontWeight="600" fill="#4F2C97" className="font-mono">
            Medium
          </text>

          <circle cx={xScale(bdhHigh.cost)} cy={yScale(bdhHigh.acc)} r="6.5" fill="#EFE9DC" stroke="#6E3FC2" strokeWidth="3" />
          <text x={xScale(bdhHigh.cost) - 14} y={yScale(bdhHigh.acc) - 30} fontSize="13" fontWeight="700" fill="#4F2C97" className="font-display">
            BDH-CQ (High)
          </text>
          <text x={xScale(bdhHigh.cost) - 14} y={yScale(bdhHigh.acc) - 14} fontSize="10.5" fill="#4F2C97" className="font-mono">
            {`${REPORTED.latent.accuracy}%  @  ${fmtCost(REPORTED.latent.costPerTask)}`}
            <tspan fontSize="7" baselineShift="super">1</tspan>
            {"  cost per task"}
          </text>

          {/* live dial position — the interactive element not present in a static leaderboard chart */}
          <circle cx={latentNow.x} cy={latentNow.y} r="9" fill="none" stroke="#6E3FC2" strokeWidth="1.5" strokeDasharray="3 3">
            <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={latentNow.x} cy={latentNow.y} r="4" fill="#6E3FC2" />

          {/* legend */}
          <g transform={`translate(${W - 322}, ${H - 190})`}>
            <rect x="0" y="0" width="300" height="112" fill="#EFE9DC" stroke="#21201b" strokeOpacity="0.15" rx="6" />
            <line x1="14" y1="24" x2="44" y2="24" stroke="#4A463D" strokeWidth="1.5" strokeDasharray="2 4" />
            <text x="52" y="28" fontSize="10.5" fill="#2c2a24" className="font-mono">Pre-BDH-CQ Pareto frontier</text>

            <circle cx="29" cy="48" r="5" fill="#EFE9DC" stroke="#6E3FC2" strokeWidth="2" />
            <text x="52" y="52" fontSize="10.5" fill="#2c2a24" className="font-mono">BDH-CQ tier (Low / Medium / High)</text>

            <circle cx="29" cy="72" r="5" fill="#4A463D" />
            <text x="52" y="76" fontSize="10.5" fill="#2c2a24" className="font-mono">Reference model (illustrative)</text>

            <circle cx="29" cy="96" r="4" fill="#6E3FC2" />
            <circle cx="29" cy="96" r="7" fill="none" stroke="#6E3FC2" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="52" y="100" fontSize="10.5" fill="#2c2a24" className="font-mono">current dial position (live)</text>
          </g>
        </svg>
      </div>

      <ol className="mt-4 space-y-1 font-mono text-[11px] text-ink/60 list-decimal list-inside">
        <li>BDH-CQ tier costs are estimated from measured inference compute, assuming $3 per H200 GPU-hour.</li>
        <li>Comparison-model scores and costs beyond BDH-CQ and GPT-5.6 Luna (Low) are illustrative reconstructions, hand-placed to reproduce the shape of a crowded leaderboard chart — not measured results.</li>
        <li>GPT-5.6 Luna (Low) is the one published reference point in this chart besides BDH-CQ; its Medium/High/XHigh/Max tiers shown here are illustrative continuations of that curve.</li>
      </ol>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono text-xs text-ink/70">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-bdh-line inline-block" />
          BDH-CQ, current dial position
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-cot-line inline-block opacity-60" />
          chain-of-thought, current dial position
        </span>
      </div>
    </section>
  );
}
