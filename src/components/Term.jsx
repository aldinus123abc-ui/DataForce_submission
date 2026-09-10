export default function Term({ children }) {
  return (
    <strong className="font-semibold text-ink border-b border-signal/40">
      {children}
    </strong>
  );
}

export function Analogy({ children }) {
  return (
    <p className="text-ink/60 text-sm italic border-l-2 border-ink/15 pl-3">
      {children}
    </p>
  );
}
