import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-crimson/60" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-crimson">{eyebrow}</span>
          <span className="h-px w-8 bg-crimson/60" />
        </div>
      )}
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}
