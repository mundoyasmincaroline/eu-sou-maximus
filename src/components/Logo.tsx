import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative grid h-10 w-10 place-items-center rounded-full gradient-gold text-[oklch(0.12_0.012_30)] font-display font-black text-lg shadow-glow-gold">
        M
        <span className="absolute inset-0 rounded-full ring-1 ring-[oklch(0.95_0.1_85/0.5)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.22em] text-gradient-gold">
          MAXIMUS
        </span>
        <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Karlos Edward
        </span>
      </span>
    </Link>
  );
}