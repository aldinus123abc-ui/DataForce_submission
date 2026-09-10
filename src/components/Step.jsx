export default function Step({ n, title, children, tint = "ink" }) {
  const ring =
    tint === "latent"
      ? "border-latent-line text-latent-line"
      : tint === "cot"
      ? "border-cot-line text-cot-line"
      : "border-ink/30 text-ink/70";
  return (
    <div className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.25rem_1fr] gap-4 sm:gap-5 pb-8">
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 ${ring} flex items-center justify-center font-mono text-xs sm:text-sm`}
      >
        {n}
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg sm:text-xl mb-2">{title}</h3>
        <div className="font-body text-sm sm:text-base text-ink/80 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}
