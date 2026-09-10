import Step from "./Step.jsx";
import Term, { Analogy } from "./Term.jsx";

// This section exists to support ONE claim: BDH-CQ reasons by iterating a
// fixed-size internal state instead of writing a chain-of-thought. Every
// step below earns its place by explaining a term the claim depends on.
// Everything else about BDH (Hebbian learning, scale-free structure,
// axiomatic AI, generalization theory, Sudoku benchmarks...) is real and
// interesting, but it's a different lesson — cut so this one stays legible.
export default function ArchitectureDeepDive() {
  return (
    <section
      id="architecture"
      className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-14 border-t border-ink/10"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-inkfaint mb-3">
        The mechanism behind the slider
      </p>
      <h2 className="font-display text-3xl lg:text-4xl mb-4">
        What's actually iterating in that 6×6 grid
      </h2>
      <p className="font-body text-ink/70 max-w-prose mb-10">
        Three terms, in the order you need them to understand the lab above.
        Not a tour of BDH — just enough to know what "iterating a fixed-size
        state" really means.
      </p>

      <div>
        <Step n={1} title="State: a scratchpad that never grows">
          <p>
            Every reasoning model carries two kinds of numbers: fixed{" "}
            <Term>parameters</Term> learned once during training, and a{" "}
            <Term>state</Term> that changes while it answers you. In
            chain-of-thought, that state <em>is</em> the growing transcript —
            every new token gets appended and re-read. In BDH-CQ, the state
            is a fixed-size block of numbers that gets overwritten, not
            extended. The grid in the lab above is a stand-in for that block:
            always the same 6×6, at every effort level.
          </p>
          <Analogy>
            Chain-of-thought is a notepad you keep adding pages to. BDH-CQ's
            state is a single whiteboard — same size always, just erased and
            rewritten.
          </Analogy>
        </Step>

        <Step n={2} title="Recurrent: the same rule, run again on its own output">
          <p>
            <Term>Recurrent</Term> means the model takes the state, applies
            one fixed update rule to it, and feeds the result back in as the
            new state — then does it again. Each pass refines the same block
            of numbers a little more; nothing is written down as a sentence
            in between. This loop is exactly what the "reasoning effort"
            slider controls: more effort means more passes over the same
            fixed-size state, not more text.
          </p>
          <Analogy>
            Kneading dough: each fold uses the same motion on the same lump —
            you don't get a bigger lump, you get a better-worked one.
          </Analogy>
        </Step>

        <Step n={3} title="Decode: the answer only appears at the end">
          <p>
            After the last iteration, BDH-CQ runs one final step that reads
            the state and <Term>decodes</Term> it into an answer. Everything
            before that point stays internal — there's no partial transcript
            to inspect mid-run, which is the direct cause of the
            interpretability limitation stated below: you can't read a
            latent run the way you can read a chain-of-thought transcript.
          </p>
        </Step>
      </div>

      <p className="font-mono text-[11px] text-inkfaint mt-2">
        Source: Kosowski et al., "The Dragon Hatchling," arXiv:2509.26507,
        Section 1.
      </p>
    </section>
  );
}
