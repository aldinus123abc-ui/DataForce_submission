export default function ArchitectureNotes() {
  return (
    <section id="summary" className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-10">
      <p className="font-mono text-xs uppercase tracking-wide text-inkfaint mb-3">
        Putting it together
      </p>
      <h2 className="font-display text-2xl lg:text-3xl mb-6">Where this lives in BDH vs. BDH-CQ</h2>

      <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-10">
        <div className="rounded-lg border border-ink/10 bg-paper2/50 p-5">
          <h3 className="font-display text-lg mb-2">Plain BDH</h3>
          <p className="font-body text-sm text-ink/75 leading-relaxed">
            At every token, BDH updates its fixed-size state by one pass of
            its recurrent rule. That's simply how BDH predicts the next
            token — it doesn't decide to spend extra effort on a harder
            query; it runs the same fixed number of passes every time.
          </p>
        </div>
        <div className="rounded-lg border border-latent-line/25 bg-latent-soft/30 p-5">
          <h3 className="font-display text-lg mb-2 text-latent-line">
            BDH-CQ, on top of it
          </h3>
          <p className="font-body text-sm text-ink/75 leading-relaxed">
            BDH-CQ adds a controllable outer loop for tasks like ARC-AGI: it
            first runs the given demonstration examples through the state,
            then iterates that same state on the new query several times
            before decoding an answer. That outer loop — how many times to
            iterate — is exactly what the slider above was simulating.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-signal/30 bg-signal/5 p-5">
        <h3 className="font-display text-lg mb-3 text-signal">
          One misconception, one limitation
        </h3>
        <ul className="font-body text-sm text-ink/80 leading-relaxed space-y-3 list-disc pl-5">
          <li>
            <strong>Misconception — "silent reasoning is just better."</strong>{" "}
            It isn't, at least not yet: BDH-CQ is roughly 11× cheaper per
            task, but it scored <em>lower</em> than the chain-of-thought
            system it's compared against (29.5% vs. 34.2%). The result is a
            new point on the cost–accuracy frontier, not a new accuracy
            record.
          </li>
          <li>
            <strong>Limitation — you can't read a latent reasoning run like a transcript.</strong>{" "}
            Because the state is never decoded until the final step, there's
            no partial, human-legible account of <em>why</em> the model
            reached its answer along the way — unlike a chain-of-thought
            trace, which at least attempts to show its work. The 6×6 grid in
            the lab above is a stand-in for a real high-dimensional state,
            not a decoded explanation of it.
          </li>
        </ul>
      </div>
    </section>
  );
}
