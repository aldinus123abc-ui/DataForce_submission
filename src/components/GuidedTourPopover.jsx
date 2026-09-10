import { useEffect, useState } from "react";
import { STEPS } from "../data/guidedTourSteps.jsx";

// A self-contained floating guide. It doesn't read or write any state from
// the rest of the page — it only explains the architecture and how its
// reasoning claims are actually evaluated, in short slides. It always
// opens automatically when the page loads, sliding in from the right
// edge of the screen, so the reader is offered the tour rather than
// having to hunt for a button.

export default function GuidedTourPopover() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const total = STEPS.length;
  const last = step === total - 1;
  const current = STEPS[step];

  // Keyboard navigation while the tour is open.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, total - 1));
      if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, total]);

  function close() {
    setOpen(false);
  }

  function reopen() {
    setStep(0);
    setOpen(true);
  }

  const sectionSteps = STEPS.filter((s) => s.section === current.section);
  const sectionIndex = sectionSteps.indexOf(current);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-body">
      {open && (
        <div className="mb-3 w-[min(94vw,380px)] max-h-[82vh] flex flex-col rounded-lg border border-ink/15 bg-paper shadow-xl animate-slide-in-right">
          <div className="p-5 pb-3 flex-shrink-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-mono text-[10px] uppercase tracking-wide text-inkfaint">
                Guided tour &middot; {current.section}
              </p>
              <button
                onClick={close}
                aria-label="Close guided tour"
                className="text-ink/40 hover:text-ink text-sm leading-none -mt-0.5"
              >
                ✕
              </button>
            </div>

            <h3 className="font-display text-lg mb-3 leading-snug">
              {current.title}
            </h3>

            <div className="w-full h-20 sm:h-24 rounded-md bg-paper2/50 border border-ink/10 p-2 mb-3">
              {current.visual}
            </div>
          </div>

          <div className="px-5 overflow-y-auto flex-1">
            <div className="font-body text-sm text-ink/75 leading-relaxed space-y-2 pb-2">
              {current.body}
            </div>
          </div>

          <div className="p-5 pt-3 flex-shrink-0 border-t border-ink/10 mt-2">
            <div className="mb-3">
              <div className="flex justify-between font-mono text-[10px] text-inkfaint mb-1">
                <span>
                  {current.section} &middot; {sectionIndex + 1}/{sectionSteps.length}
                </span>
                <span>
                  step {step + 1} of {total}
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-ink/10 overflow-hidden">
                <div
                  className="h-full bg-latent-line transition-[width] duration-300"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                disabled={step === 0}
                className="px-3 py-1.5 rounded-full border border-ink/15 text-ink/70 hover:bg-ink/5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                Back
              </button>
              <button
                onClick={() => (last ? close() : setStep((s) => s + 1))}
                className="px-3 py-1.5 rounded-full bg-latent-line text-paper hover:opacity-90 transition-opacity"
              >
                {last ? "Done" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => (open ? close() : reopen())}
        className="flex items-center gap-2 rounded-full border border-ink/15 bg-paper shadow-lg px-4 py-2.5 font-mono text-xs text-ink/80 hover:bg-ink/5 transition-colors"
        aria-expanded={open}
      >
        <span
          className="w-4 h-4 rounded-full bg-latent-line text-paper flex items-center justify-center text-[10px] leading-none"
          aria-hidden="true"
        >
          i
        </span>
        {open ? "Close tour" : "Guided tour: architecture & reasoning"}
      </button>
    </div>
  );
}
