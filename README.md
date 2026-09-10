🐉 Thinking Without Words: Inference-Time Scaling in BDH-CQ

DataForge 2026: Pathway Track Submission

Track: Explain the Frontier (NeurIPS 2026 Education Track format)

Concept: Inference-Time Scaling via Recurrent Latent-Space Reasoning

🎯 The Central Claim

A model can perform repeated latent computation to scale inference-time reasoning without producing a verbal chain of thought, achieving robust accuracy at a fraction of the computational cost.

👥 Intended Learner & Prerequisites

Target Audience: Intermediate Data Scientists and Machine Learning Engineers transitioning from standard LLM application to frontier model architectures.

Prerequisites: Familiarity with standard Transformer concepts (tokens, Key-Value cache), autoregressive generation (Chain-of-Thought), and a basic understanding of inference latency/costs.

🧠 Learning Objectives

After interacting with this explainer, the learner will be able to:

Differentiate between scaling inference via sequence generation (CoT) versus scaling via internal fixed-state iteration (Latent Computation).

Manipulate the "inference effort" variable to observe how BDH-CQ refines its internal state over time without generating new tokens.

Analyze the Cost-Accuracy Pareto frontier to understand the financial and latency advantages of the Dragon Hatchling architecture.

Identify the primary limitation of latent reasoning: the loss of human-readable trace interpretability.

🏗️ Architecture of the Explorable Artifact

The submission consists of an interactive web-based visualizer designed for instantaneous feedback.

Major Components & Their Roles

The Latent Workspace Visualizer: A dynamic 6x6 grid representing the fixed-size internal recurrent state (fast weights). It visually demonstrates how Hebbian updates refine state over multiple iterations.

The "Effort" Slider (Concept Variable): The core interactive component. It allows the learner to allocate test-time compute. Moving the slider dynamically switches the view between CoT token generation and BDH-CQ latent iterations.

Cost-Accuracy Pareto Graph: A live-updating plot charting the current effort level onto the published ARC-AGI-1 performance metrics.

Concept Summary (PDF): A self-contained, highly technical one-page briefing detailing the architectural mechanisms of BDH and BDH-CQ, generated in LaTeX for professional formatting.

🔍 Substrate Honesty: Live vs. Precomputed

To guarantee sub-second interaction feedback in a browser environment, this artifact relies on precomputed results and illustrative simulations.

Live Computation: The UI state, Pareto cost-accuracy interpolations, and slider logic are computed live in the client browser.

Precomputed Data: The actual ARC-AGI-1 data points (29.5% at $0.0007 vs 34.2% at $0.0077) are hard-referenced from Pathway's August 2026 technical report.

Simulated/Animated: The 6x6 grid visualization of the "equations of reasoning" is a deterministic illustrative animation designed to represent monosemantic synaptic updates. It does not run live model weights in the browser.

⚙️ Setup & Reproduction

To run the interactive artifact locally:

Clone the repository:

git clone https://github.com/yourusername/dataforge-bdh-cq.git
cd dataforge-bdh-cq


Install dependencies:

npm install


Start the development server:

npm run dev


Access the explainer: Open http://localhost:5173 in your browser.

Note: The Concept Summary PDF is pre-compiled and available in the root directory as Concept_Summary.pdf. The LaTeX source is available in the /latex folder.

📚 Primary Sources & References (2022-2026)

Kosowski, A. et al. (2025). "The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain." arXiv:2509.26507. (Used for structural architecture, Hebbian plasticity mechanisms, and Sudoku Extreme benchmarks).

Pathway Research (Aug 2026). "Reasoning at a Fraction of the Compute." Pathway Technical Report. (Primary source for BDH-CQ ARC-AGI-1 accuracy and cost parity benchmarks).

Snell, C. et al. (2024). "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters." arXiv:2408.03314. (Provides foundational context for the shift toward inference-time scaling strategies).

⚖️ Disclosures & Provenance

AI Assistance

Concept Summary Writing & LaTeX Formatting: AI tools (Gemini) were utilized to strictly edit, format, and synthesize the primary research notes into the constrained 500-950 word one-page LaTeX PDF format.

Code Generation: UI boilerplate and basic React component structures were scaffolded using AI assistants. The core interactive logic mapping the slider to the BDH-CQ architectural states was manually reviewed, defended, and finalized by the team.

Assets & Licenses

Source Code: Released under the MIT License.

Fonts: Noto Sans (OFL - Open Font License).

UI Framework: React & TailwindCSS (MIT License).

Data: Benchmark figures sourced directly from publicly available Pathway and ARC-AGI reports under fair use for educational purposes.# Thinking Without Words

A focused, interactive lesson on **recurrent latent-space reasoning**
(the mechanism behind Pathway's BDH-CQ) versus **chain-of-thought**
reasoning — built as a single-concept companion piece to the Transformer
Explainer, for readers who already know what a token/embedding is but have
never met a post-Transformer reasoning architecture.

## The one claim

> BDH-CQ reasons by iterating a fixed-size internal state instead of writing
> out a chain-of-thought — which is why it can be far cheaper per task, at a
> real accuracy cost, not a free win.

Every section on the page exists to support that one sentence. Nothing else
about BDH — Hebbian learning, scale-free network structure, axiomatic AI,
generalization theory, Sudoku benchmarks — appears here. It's all real and
interesting, but it belongs to a different lesson; pulling it in would dilute
the one this page teaches. (An earlier draft included two ~10-step deep
dives on that broader material — cut for that reason. See the note at the
top of `ArchitectureDeepDive.jsx` if you're deciding whether to add
something back in: it should earn its place by explaining a term the claim
above actually depends on.)

## What the reader does

1. Reads the one precise claim, with the two real published numbers, in the
   first ten seconds (`Hero.jsx`).
2. Gets the "paper vs. mental math" analogy in plain words (`AnalogyPanel.jsx`).
3. **Manipulates a real variable** — a single "reasoning effort" slider — and
   watches two contrasting simulations respond live (a growing chain-of-thought
   transcript vs. a fixed-size latent grid that only re-settles). The lab
   opens already mid-run at effort 10, not a blank canvas with a Run button
   (`ReasoningLab.jsx`).
4. Reads the same effort level as **a position on a cost–accuracy chart**,
   which also plots the two real, published ARC-AGI-1 results as fixed
   reference points ("ground truth") right next to the illustrative curve —
   truth beside estimate, not just estimate (`CostAccuracyChart.jsx`).
5. Gets exactly the three terms needed to understand what's iterating in that
   grid — state, recurrent, decode — no more (`ArchitectureDeepDive.jsx`).
6. Sees exactly where the mechanism sits inside BDH vs. BDH-CQ, plus one
   stated misconception and one stated limitation (`ArchitectureNotes.jsx`).

## Design constraints this build follows

- **One claim.** Every chart, control, and paragraph traces back to the
  sentence above. Cut: anything that only supports a broader "how BDH works"
  or "what is generalization" lesson.
- **Substrate, not animation.** The two simulation panels are a real (if
  simplified) model of the two computational strategies — deterministic
  functions of the slider, not a scripted sequence.
- **Visible state.** The chain-of-thought transcript and the 6×6 latent grid
  are both shrunk until every relevant variable (step count, cell values) is
  on screen at once.
- **Truth beside estimate.** The two reported ARC-AGI-1 results are plotted
  as fixed diamonds on the chart, never moved by the slider, right next to
  the illustrative curve the slider does move.
- **Catchy.** No blank canvas, no Run button — both panels are already
  mid-run at effort 10 when the page loads.
- **Fast feedback.** All curves are pure functions evaluated client-side;
  moving the slider updates both panels and the chart in the same frame.
- **Few controls.** One slider, mapped to one real variable (inference-time
  effort), reused by every panel that responds to it. No decorative controls.
- **Guide, then sandbox.** Hero → analogy → lab: the reader is told what to
  expect before they're handed the dial.
- **No hidden limits.** The lab and the chart both carry a visible caption
  stating that only the two endpoints are real measurements and every curve
  between them is an illustrative interpolation.

## Honesty about the data

Only two numbers in the whole app are real measurements (see `src/data/reasoningModel.js`):
BDH-CQ's reported 29.5% / $0.0007 per task, and the compared system's 34.2% /
~$0.0077 per task, both from Pathway's August 2026 ARC-AGI-1 result. Every
curve and every intermediate slider value is a clearly-labeled illustrative
interpolation between those two points — real per-step scaling data for
intermediate reasoning effort has not been published.

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static
production build in `dist/`.

## File map

```
src/
  data/reasoningModel.js       the only file with numbers — real anchors + curve shapes
  components/Header.jsx        title + section nav
  components/Hero.jsx          the one-sentence technical claim
  components/AnalogyPanel.jsx  plain-words analogy
  components/ReasoningLab.jsx  the interactive slider + two simulation panels
  components/CostAccuracyChart.jsx     hand-drawn SVG cost/accuracy frontier
  components/ArchitectureDeepDive.jsx  the 3 terms needed to read the lab (state, recurrent, decode)
  components/ArchitectureNotes.jsx     BDH vs BDH-CQ placement + misconception/limitation
  components/Footer.jsx        sources
  App.jsx                      wires shared slider state between Lab and Chart
```
