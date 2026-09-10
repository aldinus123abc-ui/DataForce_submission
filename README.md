# Thinking Without Words: Interactive Learning of Recurrent Latent-Space Reasoning

Thinking Without Words is a focused, interactive lesson on **recurrent
latent-space reasoning** — the mechanism behind Pathway's BDH-CQ — versus
**chain-of-thought** reasoning. It runs live, client-side simulations right
in your browser: drag a single "reasoning effort" slider and watch two
contrasting strategies respond in real time — a growing chain-of-thought
transcript versus a fixed-size latent grid that only re-settles.

[![arxiv badge](https://img.shields.io/badge/arXiv-2509.26507-red)](https://arxiv.org/abs/2509.26507)
<!-- [![License](http://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)]() -->

## Live Demo

Try the Explainer :(https://data-force-submission.vercel.app)

## The one claim

> BDH-CQ reasons by iterating a fixed-size internal state instead of writing
> out a chain-of-thought — which is why it can be far cheaper per task, at a
> real accuracy cost, not a free win.

Every section on the page exists to support that one sentence. Nothing else
about BDH — Hebbian learning, scale-free network structure, axiomatic AI,
generalization theory, Sudoku benchmarks — appears here. It's all real and
interesting, but it belongs to a different lesson; pulling it in would
dilute the one this page teaches.

## What the reader does

1. Reads the one precise claim, with the two real published numbers, in the
   first ten seconds (`Hero.jsx`).
2. Gets the "paper vs. mental math" analogy in plain words (`AnalogyPanel.jsx`).
3. **Manipulates a real variable** — a single "reasoning effort" slider —
   and watches two contrasting simulations respond live. The lab opens
   already mid-run at effort 10, not a blank canvas with a Run button
   (`ReasoningLab.jsx`).
4. Reads the same effort level as **a position on a cost–accuracy chart**,
   which also plots the two real, published ARC-AGI-1 results as fixed
   reference points ("ground truth") right next to the illustrative curve —
   truth beside estimate, not just estimate (`CostAccuracyChart.jsx`).
5. Gets exactly the three terms needed to understand what's iterating in
   that grid — state, recurrent, decode — no more (`ArchitectureDeepDive.jsx`).
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

## Sources / Research

The lesson is built on top of the following published work:

- Kosowski, Uznański, Chorowski, Stamirowska, Bartoszkiewicz — **"The Dragon
  Hatchling: The Missing Link between the Transformer and Models of the
  Brain,"** [arXiv:2509.26507](https://arxiv.org/abs/2509.26507) (2025).
- Pathway — **"Reasoning at a Fraction of the Compute"**
  ([pathway.com/research/introducing-bdh-cq](https://pathway.com/research/introducing-bdh-cq),
  Aug 11 2026).

Only two numbers in the whole app are real measurements (see
`src/data/reasoningModel.js`): BDH-CQ's reported 29.5% / $0.0007 per task,
and the compared system's 34.2% / ~$0.0077 per task, both from Pathway's
August 2026 ARC-AGI-1 result. Every curve and every intermediate slider
value is a clearly-labeled illustrative interpolation between those two
points — real per-step scaling data for intermediate reasoning effort has
not been published.

## How to run locally

#### Prerequisites

- Node.js v18 or higher
- NPM v9 or higher

#### Steps

```bash
git clone [https://github.com/aldinus123abc-ui/DataForce_submission]
cd bdh-lesson
npm install
npm run dev
```

Then, on your web browser, access http://localhost:5173.

`npm run build` produces a static production build in `dist/`.

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

## Credits

This Explainer was created by L Sushanta Singha, Nishant Singh, Gourish Kurmi and Ram Kishor Yadav at the National Institute of Technology, Silchar.

## License

The software is available under the MIT License.




