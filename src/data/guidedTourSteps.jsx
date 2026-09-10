import Term, { Analogy } from "../components/Term.jsx";
import {
  PostTransformerIcon,
  StateIcon,
  RecurrentIcon,
  DecodeIcon,
  EquationsIntroIcon,
  SparsePositiveIcon,
  HebbianIcon,
  SpikeIcon,
  LocalityIcon,
  WorkingMemoryIcon,
  GpuIcon,
  ScaleFreeIcon,
  MonosemanticIcon,
  ArcGridIcon,
  PassTwoIcon,
  CostClockIcon,
  ConceptArcIcon,
  SudokuIcon,
  InductiveIcon,
  BabilongIcon,
  PendingIcon,
  RoadmapIcon,
} from "../components/TourVisuals.jsx";

// Three sections. The first four steps are the original architecture
// tour (kept, now with visuals added). The next two sections are new:
// "The Equations of Reasoning" (how BDH's inference rule is formalized)
// and "Evaluating Mathematical and Abstract Reasoning" (how BDH-CQ's
// claims are actually measured). Content is grounded in Kosowski et al.,
// "The Dragon Hatchling," arXiv:2509.26507, and its reasoning follow-up,
// arXiv:2608.09888 ("BDH-CQ: In-Context Learning with Recurrent Latent
// Reasoning") — cited inline where a slide leans on it directly.

const ARCH = "Post-Transformer basics";
const EQUATIONS = "The equations of reasoning";
const EVAL = "Evaluating mathematical & abstract reasoning";

export const STEPS = [
  // ---------------- Post-Transformer basics (original 4) ----------------
  {
    section: ARCH,
    title: "What makes this \u201cpost-Transformer\u201d?",
    visual: <PostTransformerIcon />,
    body: (
      <p>
        A Transformer answers by running <Term>self-attention</Term> over
        every token it has seen so far — the context window. BDH (the
        Dragon Hatchling architecture behind BDH-CQ) drops that mechanism
        entirely. There's no growing attention matrix and no KV-cache to
        keep around. What replaces it is the three pieces in this tour.
      </p>
    ),
  },
  {
    section: ARCH,
    title: "1. State replaces the context window",
    visual: <StateIcon />,
    body: (
      <>
        <p>
          Instead of attending back over every past token, BDH keeps a
          single fixed-size <Term>state</Term> — a block of numbers that
          stays the same size no matter how long the task runs. Nothing
          ever gets appended to it the way tokens get appended to a
          Transformer's context.
        </p>
        <Analogy>A whiteboard, not a scroll that keeps unrolling.</Analogy>
      </>
    ),
  },
  {
    section: ARCH,
    title: "2. Local, Hebbian-style updates replace attention",
    visual: <RecurrentIcon />,
    body: (
      <>
        <p>
          Where a Transformer computes attention weights across the whole
          sequence, BDH updates its state with a <Term>recurrent</Term>,
          locally-connected rule inspired by Hebbian plasticity — neurons
          that fire together strengthen their own connection, without
          comparing themselves to every other token in a global attention
          pass.
        </p>
        <Analogy>
          Kneading dough with the same local motion each fold, instead of
          re-reading the whole recipe every time.
        </Analogy>
      </>
    ),
  },
  {
    section: ARCH,
    title: "3. Decode happens once, at the end",
    visual: <DecodeIcon />,
    body: (
      <p>
        A Transformer-based chain-of-thought model decodes a token after
        nearly every step, which is what makes its transcript readable.
        BDH-CQ <Term>decodes</Term> only once, after all its internal
        iterations — so there's no running commentary, and no partial
        transcript to inspect mid-run.
      </p>
    ),
  },

  // ---------------- The equations of reasoning ----------------
  {
    section: EQUATIONS,
    title: "A compact ruleset, not a mystery",
    visual: <EquationsIntroIcon />,
    body: (
      <>
        <p>
          BDH's inference isn't hand-waved — the paper formalizes it as a
          set of <Term>equations of reasoning</Term>: a compact,
          repeatable ruleset that says exactly how every neuron and
          synapse updates on each round. It combines two ingredients:
          Hebbian-style edge reweighting and integrate-and-fire
          thresholding, both covered next.
        </p>
        <p className="text-xs text-inkfaint">
          Source: Kosowski et al., arXiv:2509.26507.
        </p>
      </>
    ),
  },
  {
    section: EQUATIONS,
    title: "Sparse, positive activations",
    visual: <SparsePositiveIcon />,
    body: (
      <>
        <p>
          A typical neural network's activations are dense — most numbers
          are nonzero and can go negative. BDH's neurons instead stay{" "}
          <Term>sparse</Term> (most are exactly zero at any moment) and{" "}
          <Term>positive</Term> (never negative). That single constraint
          is doing a lot of the interpretability work you'll see a few
          slides from now.
        </p>
        <Analogy>
          Most keys on the board are untouched; the few that are pressed
          are pressed firmly, never "pressed backwards."
        </Analogy>
      </>
    ),
  },
  {
    section: EQUATIONS,
    title: "Hebbian edge reweighting",
    visual: <HebbianIcon />,
    body: (
      <p>
        The oldest idea in the equations is also the simplest:{" "}
        <Term>Hebbian learning</Term> — neurons that fire together wire
        together. Every round, the strength of the connection (the
        synapse) between two neurons shifts a little based on whether
        both of them were active at once. This happens continuously
        during inference, not only once during training.
      </p>
    ),
  },
  {
    section: EQUATIONS,
    title: "Integrate-and-fire thresholding",
    visual: <SpikeIcon />,
    body: (
      <>
        <p>
          Each BDH neuron behaves like a biological spiking neuron: it{" "}
          <Term>integrates</Term> incoming signal over time, and only{" "}
          <Term>fires</Term> a pulse once that accumulated signal crosses
          a threshold — then resets. This is what gives the model its
          "spiking" character, closer to cortical neurons than to a
          Transformer's continuous-valued units.
        </p>
        <Analogy>A dam that only releases water once it's full.</Analogy>
      </>
    ),
  },
  {
    section: EQUATIONS,
    title: "The constraint that changes everything: locality",
    visual: <LocalityIcon />,
    body: (
      <p>
        Self-attention needs a global view — every token compared against
        every other. The equations of reasoning are deliberately{" "}
        <Term>local</Term>: each update only reads a neuron's own
        activation and the handful of edges directly connected to it. No
        step ever needs the whole graph at once, which is exactly why
        BDH's memory stays fixed-size instead of growing with context.
      </p>
    ),
  },
  {
    section: EQUATIONS,
    title: "Working memory is synaptic, not textual",
    visual: <WorkingMemoryIcon />,
    body: (
      <p>
        Put the last two ideas together and you get BDH's definition of{" "}
        <Term>working memory</Term>: it's simply the current pattern of
        which synapses are potentiated (strengthened) right now — not a
        buffer of past tokens. The paper reports this pattern persisting
        on the order of hundreds of tokens before fading, similar in
        spirit to how short-term synaptic potentiation in the brain lasts
        on the order of minutes.
      </p>
    ),
  },
  {
    section: EQUATIONS,
    title: "Making the equations fast: BDH-GPU",
    visual: <GpuIcon />,
    body: (
      <p>
        Simulating literal neuron-and-synapse graph dynamics doesn't map
        cleanly onto GPU hardware. <Term>BDH-GPU</Term> is a variant that
        approximates the same equations of reasoning using a mean-field
        interaction and a low-rank factorization — turning the local
        graph updates into something close to a linear-attention
        computation, without changing the underlying local, Hebbian
        principles.
      </p>
    ),
  },
  {
    section: EQUATIONS,
    title: "Structure nobody designed in: scale-free graphs",
    visual: <ScaleFreeIcon />,
    body: (
      <>
        <p>
          Run those local update rules at scale, and the neuron
          interaction network organizes itself — unprompted — into a{" "}
          <Term>modular, scale-free</Term> graph: a small number of
          highly-connected "hub" neurons and a long tail of sparsely
          connected ones. That's the same heavy-tailed shape researchers
          observe in real biological neural wiring.
        </p>
        <Analogy>
          A few major airports with hundreds of routes, and many small
          regional airports with just one or two.
        </Analogy>
      </>
    ),
  },
  {
    section: EQUATIONS,
    title: "A side effect: monosemantic neurons",
    visual: <MonosemanticIcon />,
    body: (
      <p>
        Because activations are sparse and positive, individual BDH
        neurons tend to represent one identifiable concept —{" "}
        <Term>monosemantic</Term> — rather than a blurred mixture of many,
        which is the more common (and harder to interpret) case in dense
        networks. This shows up even in BDH models under 100M parameters,
        and it falls directly out of the equations above, rather than
        being separately trained in.
      </p>
    ),
  },

  // ---------------- Evaluating mathematical & abstract reasoning ----------------
  {
    section: EVAL,
    title: "Why ARC-AGI is the test",
    visual: <ArcGridIcon />,
    body: (
      <>
        <p>
          BDH-CQ's headline claim rests on the{" "}
          <Term>Abstraction and Reasoning Corpus (ARC-AGI)</Term>: each
          task gives only 2–3 example input/output grids and asks the
          model to infer the transformation rule and apply it exactly to
          a new, held-out grid. There's little to memorize — every task
          is built to be unlike anything seen in training.
        </p>
        <Analogy>
          An IQ-test analogy puzzle, not a trivia question with a
          memorizable answer.
        </Analogy>
      </>
    ),
  },
  {
    section: EVAL,
    title: "Two attempts, not one: pass@2",
    visual: <PassTwoIcon />,
    body: (
      <p>
        ARC-AGI's official scoring convention gives every model{" "}
        <Term>two attempts</Term> per task and counts it correct if
        either one matches — this is <Term>pass@2</Term>. BDH-CQ's
        reported 29.5% and GPT-5.6 Luna (Low)'s reported 34.2% (both
        already on the page above) are measured under this exact same
        rule, which is what makes the comparison fair.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "Cost is measured, not modeled",
    visual: <CostClockIcon />,
    body: (
      <p>
        The <Term>$0.0007-per-task</Term> figure isn't a theoretical
        FLOP estimate — it's computed from actual measured hardware time
        spent running the evaluation. That's what lets it be compared
        directly, in real dollars, against another system's per-task
        cost, rather than comparing two different kinds of estimate.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "ConceptARC: a behavioral breakdown",
    visual: <ConceptArcIcon />,
    body: (
      <p>
        A single pass-rate number hides which kinds of abstraction a
        model actually handles. The <Term>ConceptARC</Term> diagnostic
        splits tasks into 16 named concept families — things like
        symmetry, counting, and containment — so researchers can see
        which categories of reasoning BDH-CQ is strong or weak on,
        instead of one aggregate score.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "Sudoku-Extreme: a different kind of abstract reasoning",
    visual: <SudokuIcon />,
    body: (
      <>
        <p>
          On a separate benchmark of roughly 250,000 hard{" "}
          <Term>Sudoku-Extreme</Term> puzzles, a BDH model reportedly
          solved about 97.4% top-1 — with no chain-of-thought and no
          backtracking — while the leading chain-of-thought reasoning
          LLMs tested on the same set scored close to 0%. This is a
          distinct, separately-reported result, not part of the ARC-AGI
          number above.
        </p>
        <p className="text-xs text-inkfaint">
          Sudoku is a constraint-satisfaction puzzle: every row, column,
          and 3×3 block must contain each digit exactly once.
        </p>
      </>
    ),
  },
  {
    section: EVAL,
    title: "A fairness detail: inductive vs. transductive",
    visual: <InductiveIcon />,
    body: (
      <p>
        Some competing systems in this space are <Term>transductive</Term>
        : they see the actual demonstration pairs from the evaluation
        tasks and adjust their weights on them before being scored.
        BDH-CQ is evaluated <Term>inductively</Term> — purely at
        inference, with no backward pass or fine-tuning on the test tasks
        themselves. That's a stricter bar to clear, and worth keeping in
        mind when comparing scores across systems.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "BABILong: reasoning over a long, noisy context",
    visual: <BabilongIcon />,
    body: (
      <p>
        A different benchmark, <Term>BABILong</Term>, buries a handful of
        relevant facts inside a large amount of unrelated text and asks
        the model to retrieve and reason over just the relevant pieces.
        A 134M-parameter BDH model reportedly reached 95% accuracy at
        32K tokens of context, falling to 82% at 128K — a test of
        reasoning that has to survive a long, mostly-irrelevant context.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "What's still unverified",
    visual: <PendingIcon />,
    body: (
      <p>
        Not every number here carries the same weight. The BABILong
        long-context results are explicitly flagged as pending{" "}
        <Term>independent validation</Term> and contamination checks —
        worth remembering that "reported by the team that built it" and
        "independently confirmed" are two different claims, even when
        both are stated honestly.
      </p>
    ),
  },
  {
    section: EVAL,
    title: "Where the evaluation stops today",
    visual: <RoadmapIcon />,
    body: (
      <>
        <p>
          BDH-CQ's results are on <Term>ARC-AGI-1</Term>. ARC-AGI-2 — a
          harder successor benchmark with more compositional, multi-step
          tasks — is named as the next target, not something BDH-CQ has
          already been measured against. Worth keeping straight next
          time a headline says a model "solved ARC": ARC-AGI-1 and
          ARC-AGI-2 are different tests of very different difficulty.
        </p>
        <p className="text-xs text-inkfaint">
          Sources: Kosowski et al., arXiv:2509.26507; "BDH-CQ: In-Context
          Learning with Recurrent Latent Reasoning," arXiv:2608.09888.
        </p>
      </>
    ),
  },
];
