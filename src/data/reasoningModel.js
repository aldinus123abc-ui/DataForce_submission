// Every number in REPORTED is a published figure (Pathway, "Reasoning at a
// Fraction of the Compute", Aug 11 2026 — ARC-AGI-1, pass@2). Nothing else in
// this file is measured data: the two curve functions below are illustrative
// interpolations, shaped only to pass exactly through these two endpoints at
// EFFORT_MAX. They exist so a slider has something smooth to move along —
// treat the shape between the endpoints as a teaching device, not a result.

export const REPORTED = {
  latent: {
    label: "BDH-CQ",
    costPerTask: 0.0007,
    accuracy: 29.5,
    source: "Pathway, ARC-AGI-1 pass@2, Aug 2026",
  },
  cot: {
    label: "GPT-5.6 Luna (Low)",
    costPerTask: 0.0077, // ≈ 11× BDH-CQ's cost, as reported
    accuracy: 34.2,
    source: "ARC Prize leaderboard, reported Aug 2026",
  },
};

export const EFFORT_MIN = 1;
export const EFFORT_MAX = 20;

function normalized(effort) {
  return effort / EFFORT_MAX;
}

// Chain-of-thought: cost grows ~linearly with how much you write, because
// every extra token both costs to generate and gets re-read on the next step.
export function cotCost(effort) {
  const t = normalized(effort);
  return +(REPORTED.cot.costPerTask * t).toFixed(5);
}

// Latent recurrent reasoning: cost grows sub-linearly, because each extra
// iteration re-uses the same fixed-size state instead of an ever-longer trace.
export function latentCost(effort) {
  const t = normalized(effort);
  return +(REPORTED.latent.costPerTask * Math.sqrt(t)).toFixed(5);
}

// Both accuracy curves saturate (diminishing returns from extra effort),
// normalized so effort = EFFORT_MAX reproduces the reported endpoint exactly.
function saturating(effort, k, maxAtEnd) {
  const raw = (steps) => 1 - Math.exp(-steps / k);
  return +((maxAtEnd * raw(effort)) / raw(EFFORT_MAX)).toFixed(1);
}

export function cotAccuracy(effort) {
  return saturating(effort, 8, REPORTED.cot.accuracy);
}

export function latentAccuracy(effort) {
  return saturating(effort, 6, REPORTED.latent.accuracy);
}

export function tokenChip(step) {
  const script = [
    "read grid",
    "compare cells",
    "guess rule",
    "check example 2",
    "revise rule",
    "check example 3",
    "note exception",
    "re-check color map",
    "test on held-out cell",
    "restate rule",
    "apply to query",
    "verify shape",
    "verify count",
    "second-guess step 4",
    "recheck symmetry",
    "confirm border case",
    "tidy reasoning",
    "final check",
    "write answer grid",
    "done",
  ];
  return script[(step - 1) % script.length];
}
