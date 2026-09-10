export default function Header() {
  return (
    <header className="border-b border-ink/10">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 py-5 flex items-baseline justify-between gap-4">
        <span className="font-display text-lg tracking-tight">
          Thinking Without Words
        </span>
        <nav className="hidden md:flex gap-5 lg:gap-6 font-body text-sm text-inkfaint">
          <a href="#lab" className="hover:text-ink transition-colors">
            Try it
          </a>
          <a href="#frontier" className="hover:text-ink transition-colors">
            The frontier
          </a>
          <a href="#architecture" className="hover:text-ink transition-colors">
            The mechanism
          </a>
          <a href="#summary" className="hover:text-ink transition-colors">
            Summary
          </a>
        </nav>
      </div>
    </header>
  );
}
