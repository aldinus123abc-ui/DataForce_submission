export default function AnalogyPanel() {
  return (
    <section className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-start">
        <h2 className="font-display text-2xl lg:text-3xl leading-tight lg:sticky lg:top-6">
          The analogy: doing long division on paper vs. in your head
        </h2>
        <div className="font-body text-ink/80 leading-relaxed space-y-4 max-w-prose">
          <p>
            Give someone a hard division problem. One way to solve it is to
            write out every step on paper — bring down a digit, subtract,
            carry the remainder, repeat — and read the paper to get the
            answer. That paper trail costs something: time, ink, space. The
            longer the problem, the more paper you fill.
          </p>
          <p>
            The other way is to hold the whole working state in your head and
            just update it, silently, step by step, until you're confident,
            then say the answer out loud. No paper trail exists to inspect
            afterward — but you also never had to write anything down.
          </p>
          <p>
            Chain-of-thought reasoning in language models is the first
            approach: every reasoning step is a chunk of generated text,
            fed back in as input to the next step. That's why longer
            reasoning traces cost more —{" "}
            <strong>the trace itself is the extra compute.</strong>{" "}
            <strong>Recurrent latent-space reasoning</strong>, the mechanism
            behind BDH-CQ, is the second approach: it updates a fixed-size
            block of numbers — its internal state — over and over, and only
            decodes an answer at the end.
          </p>
        </div>
      </div>
    </section>
  );
}
