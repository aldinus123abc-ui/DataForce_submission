// Reference scatter for the "ARC-AGI-1 Efficiency Frontier" chart.
//
// Only two points in this whole file are the published numbers from
// reasoningModel.js: BDH-CQ's reported endpoint and GPT-5.6 Luna (Low).
// Everything else here — every other model name, dot, and connecting
// line — is a rough, hand-placed reconstruction meant to reproduce the
// *look* of a crowded leaderboard plot (a faint fan of model families
// trailing off toward the top right). Treat positions as approximate
// set-dressing, not as a citation for any real model's cost or score.

// Faint background "families": loosely-related model lineages, drawn as
// thin light lines with small dots, the way a busy leaderboard chart
// tends to fan out from bottom-left to top-right.
export const BG_FAMILIES = [
  {
    key: "gpt5",
    points: [
      { cost: 0.006, acc: 17, label: "GPT-5 Nano" },
      { cost: 0.02, acc: 32, label: "GPT-5.4 Nano" },
      { cost: 0.09, acc: 47, label: "GPT-5 Mini" },
      { cost: 0.18, acc: 61, label: "GPT-5" },
      { cost: 0.19, acc: 63, label: "GPT-5.4 Mini" },
    ],
  },
  {
    key: "o-series",
    points: [
      { cost: 0.03, acc: 22 },
      { cost: 0.22, acc: 56, label: "o4-mini" },
      { cost: 0.2, acc: 58, label: "o3" },
      { cost: 0.27, acc: 38, label: "o3-mini" },
      { cost: 1.6, acc: 43, label: "o3-Pro" },
    ],
  },
  {
    key: "claude",
    points: [
      { cost: 0.02, acc: 15 },
      { cost: 0.17, acc: 40, label: "Claude Haiku 4.5" },
      { cost: 0.25, acc: 33, label: "Claude 3.7" },
      { cost: 0.28, acc: 42, label: "Claude Sonnet 4" },
      { cost: 0.55, acc: 38, label: "Claude Opus 4" },
      { cost: 0.55, acc: 79, label: "Opus 4.5" },
    ],
  },
  {
    key: "gemini",
    points: [
      { cost: 0.02, acc: 12 },
      { cost: 0.35, acc: 40, label: "Gemini 2.5 Pro" },
      { cost: 0.35, acc: 97, label: "Gemini 3.1 Pro" },
    ],
  },
];

// A few unaffiliated faint dots that just sit on their own in the image.
export const BG_SINGLES = [
  { cost: 0.004, acc: 4, label: "GPT-4.1" },
  { cost: 0.11, acc: 80, label: "Inkling Small" },
  { cost: 0.45, acc: 91, label: "GPT-5.6 Terra" },
  { cost: 0.55, acc: 33, label: "HRM" },
  { cost: 0.6, acc: 43, label: "TRM" },
];

// The darker "Pre-BDH-CQ Pareto frontier": the chain of best-known
// cost/accuracy trade-offs before BDH-CQ, drawn as a dotted line with
// solid dark dots. GPT-5.6 Luna (Low) is the one published anchor in
// this list (see reasoningModel.js); the rest of the Luna effort tiers
// and the two flagship points are illustrative continuations of that
// same curve, not separately measured figures.
export const PRE_BDH_FRONTIER = [
  { cost: 0.00065, acc: 2, anchor: false }, // unlabeled tail near the origin
  { cost: 0.0025, acc: 11.0, label: "Qwen3 235B", value: "11.0% @ $0.0025", footnote: 2 },
  // GPT-5.6 Luna (Low) is injected from REPORTED.cot at render time.
  { cost: 0.013, acc: 56, label: "Medium" },
  { cost: 0.03, acc: 76, label: "High" },
  { cost: 0.055, acc: 87.5, label: "XHigh" },
  { cost: 0.065, acc: 88, label: "GPT-5.6 Luna (Max)", footnote: 3, dx: 14, dy: -22 },
  { cost: 0.35, acc: 97, label: "Gemini 3.1 Pro" },
  { cost: 0.6, acc: 98, label: "Claude Opus 5 (Max)" },
];
