export default function Hero() {
  return (
    <section className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 pt-14 pb-10">
      <p className="font-mono text-xs uppercase tracking-wide text-inkfaint mb-4">
        For readers who already know what a Transformer token is — this
        picks up from there.
      </p>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-3xl lg:max-w-4xl">
        A model can reason by writing it down, or by never saying a word.
      </h1>
      <p className="mt-6 max-w-prose lg:text-xl font-body text-lg text-ink/80 leading-relaxed">
        Pathway's <strong>BDH-CQ</strong>, a 150-million-parameter model built
        on the Dragon Hatchling (BDH) architecture, scored{" "}
        <span className="font-mono text-latent-line">29.5%</span> on the
        ARC-AGI-1 reasoning benchmark at{" "}
        <span className="font-mono text-latent-line">$0.0007</span> per task —
        about a tenth of the cost of a leading chain-of-thought reasoner,
        which scored <span className="font-mono text-cot-line">34.2%</span>{" "}
        at roughly <span className="font-mono text-cot-line">$0.0077</span>{" "}
        per task. This lesson is about the one architectural difference behind
        that gap: BDH-CQ never writes a reasoning trace. It reasons by
        iterating a fixed-size internal state, silently.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
        <span className="px-3 py-1 rounded-full bg-cot-soft text-cot-line border border-cot-line/20">
          reported: GPT-5.6 Luna (Low)
        </span>
        <span className="px-3 py-1 rounded-full bg-latent-soft text-latent-line border border-latent-line/20">
          reported: BDH-CQ
        </span>
      </div>
    </section>
  );
}
