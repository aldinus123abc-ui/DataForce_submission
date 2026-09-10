import {
  EFFORT_MIN,
  EFFORT_MAX,
  cotCost,
  cotAccuracy,
  latentCost,
  latentAccuracy,
  tokenChip,
} from "../data/reasoningModel.js";

function LatentGrid({ effort }) {
  const size = 6;
  const cells = Array.from({ length: size * size }, (_, i) => {
    // Deterministic pseudo-noise so the grid visibly "settles" as effort
    // rises, while staying the same fixed 6x6 size regardless of effort.
    const seed = Math.sin(i * 12.9898 + effort * 3.51) * 43758.5453;
    const frac = seed - Math.floor(seed);
    const settle = Math.min(1, effort / EFFORT_MAX);
    const intensity = frac * (1 - settle * 0.6) + settle * 0.25;
    return intensity;
  });
  return (
    <div className="grid grid-cols-6 gap-1 w-36 sm:w-40 lg:w-44">
      {cells.map((v, i) => (
        <div
          key={i}
          className="aspect-square rounded-sm transition-colors duration-300"
          style={{ backgroundColor: `rgba(184, 114, 46, ${0.15 + v * 0.75})` }}
        />
      ))}
    </div>
  );
}

function Metric({ label, value, colorClass }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-wide text-inkfaint">
        {label}
      </div>
      <div className={`font-mono text-2xl ${colorClass}`}>{value}</div>
    </div>
  );
}

export default function ReasoningLab({ effort, setEffort }) {
  const tokens = Array.from({ length: effort }, (_, i) => tokenChip(i + 1));

  return (
    <section id="lab" className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-10">
      <h2 className="font-display text-2xl lg:text-3xl mb-2">Move the one dial</h2>
      <p className="font-body text-ink/70 max-w-prose mb-6">
        Both panels below are already mid-run at effort {effort} — nothing
        to press, just move the dial. It's the one concept variable: how much
        inference-time effort the model spends on a single query — generated
        tokens for chain-of-thought, iterations over latent state for
        BDH-CQ.
      </p>

      <div className="mb-8 bg-paper2/60 border border-ink/10 rounded-lg p-5">
        <div className="flex justify-between font-mono text-xs text-inkfaint mb-2">
          <span>less effort</span>
          <span>reasoning effort: {effort}</span>
          <span>more effort</span>
        </div>
        <input
          type="range"
          min={EFFORT_MIN}
          max={EFFORT_MAX}
          value={effort}
          onChange={(e) => setEffort(Number(e.target.value))}
          className="w-full accent-latent"
          aria-label="Reasoning effort"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
        {/* Chain of thought panel */}
        <div className="border border-cot-line/25 bg-cot-soft/40 rounded-lg p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-cot-line">
              Chain-of-thought
            </h3>
            <span className="font-mono text-[10px] uppercase text-cot-line/70">
              writes every step
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            <Metric
              label="est. cost / task"
              value={`$${cotCost(effort).toFixed(4)}`}
              colorClass="text-cot-line"
            />
            <Metric
              label="illustrative accuracy"
              value={`${cotAccuracy(effort)}%`}
              colorClass="text-cot-line"
            />
          </div>
          <div className="flex-1 min-h-[9rem] rounded-md bg-paper/70 border border-cot-line/15 p-3 overflow-y-auto">
            <ol className="space-y-1.5">
              {tokens.map((t, i) => (
                <li
                  key={i}
                  className="font-mono text-xs text-ink/70 border-l-2 border-cot-line/40 pl-2"
                >
                  {i + 1}. {t}
                </li>
              ))}
            </ol>
          </div>
          <p className="font-body text-xs text-ink/50 mt-3">
            The transcript grows with every unit of effort — that growth is
            the compute you're paying for.
          </p>
        </div>

        {/* Latent reasoning panel */}
        <div className="border border-latent-line/25 bg-latent-soft/40 rounded-lg p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-latent-line">
              Recurrent latent state
            </h3>
            <span className="font-mono text-[10px] uppercase text-latent-line/70">
              says nothing out loud
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            <Metric
              label="est. cost / task"
              value={`$${latentCost(effort).toFixed(4)}`}
              colorClass="text-latent-line"
            />
            <Metric
              label="illustrative accuracy"
              value={`${latentAccuracy(effort)}%`}
              colorClass="text-latent-line"
            />
          </div>
          <div className="flex-1 min-h-[9rem] rounded-md bg-paper/70 border border-latent-line/15 p-3 flex items-center justify-center">
            <LatentGrid effort={effort} />
          </div>
          <p className="font-body text-xs text-ink/50 mt-3">
            The grid is a fixed 6×6 state at every effort level — only its
            values are re-worked, iteration after iteration.
          </p>
        </div>
      </div>

      <p className="font-mono text-[11px] text-inkfaint mt-4">
        Accuracy and cost curves here are illustrative interpolations,
        calibrated only at the two reported endpoints (effort = {EFFORT_MAX}).
        Real per-step ARC-AGI-1 measurements at intermediate effort have not
        been published.
      </p>
    </section>
  );
}
