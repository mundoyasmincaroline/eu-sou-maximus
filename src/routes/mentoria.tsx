import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Check, ArrowRight, Crown, Play } from "lucide-react";
import texturecrimson from "@/assets/texture-crimson.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoModal } from "@/components/VideoModal";
import { AgencyTeaser } from "@/components/AgencyTeaser";
import { useCmsContent } from "@/lib/cmsContent";
export const Route = createFileRoute("/mentoria")({
  head: () => ({
    meta: [
      { title: "Mentoria MAXIMUS — Marca pessoal, palco e posicionamento" },
      { name: "description", content: "Mentoria de marca pessoal, presença de palco e posicionamento com Karlos Edward (MAXIMUS) para apresentadores, criadores e empreendedores." },
      { property: "og:title", content: "Mentoria MAXIMUS" },
      { property: "og:description", content: "Posicionamento, palco e marca pessoal de alto nível." },
    ],
  }),
  component: Mentoria,
});

function Mentoria() {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const cms = useCmsContent();

  return (
    <div className="overflow-hidden">
      <section className="relative isolate py-24 lg:py-32">
        <img src={cms.mentoria.heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 to-background" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-crimson"><GraduationCap className="h-3 w-3" /> Mentoria</div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.92]">
            {cms.mentoria.heroTitle.split(" ").slice(0, 1).join(" ")} <br /><span className="italic text-gradient-crimson">{cms.mentoria.heroTitle.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {cms.mentoria.heroDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-crimson/20 bg-card/40 p-8 md:p-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-crimson">
              Quadro Exclusivo
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              {cms.mentoria.featureTitle.split(",")[0]}, <br />
              <span className="italic text-gradient-crimson">{cms.mentoria.featureTitle.split(",").slice(1).join(",") || cms.mentoria.featureTitle}</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {cms.mentoria.featureDescription}
            </p>
            <div className="mt-8">
              <a href="https://www.instagram.com/eusoumaximus/reel/DZ2G18aJQ2q/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-crimson/40 px-6 py-3 text-sm font-semibold text-foreground hover:bg-crimson/10">
                Assistir ao Reel no Instagram <ArrowRight className="h-4 w-4 text-crimson" />
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl ring-1 ring-crimson/30 shadow-luxe cursor-pointer group" onClick={() => setActiveEmbed(cms.mentoria.featureEmbedId)}>
            <img src={cms.mentoria.featureImage} alt="Você não é pobre, você só tem mau gosto" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="grid h-16 w-16 place-items-center rounded-full gradient-crimson text-[oklch(0.12_0.012_30)] shadow-glow-crimson transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 fill-current ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <VideoModal
        isOpen={!!activeEmbed}
        onClose={() => setActiveEmbed(null)}
        embedId={activeEmbed}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-10 lg:py-24">
        {cms.mentoria.plans.map((p) => (
          <div key={p.id} className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur ${p.featured ? "border-crimson/60 shadow-glow-crimson" : "border-crimson/15 bg-card/60"}`}>
            {p.featured && (
              <>
                <img src={texturecrimson} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background/95" />
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full gradient-crimson px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[oklch(0.12_0.012_30)]"><Crown className="h-3 w-3" /> Mais escolhida</div>
              </>
            )}
            <div className="text-[11px] uppercase tracking-[0.3em] text-crimson">{p.level}</div>
            <h3 className="mt-3 font-display text-3xl font-bold">{p.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground">{p.description}</div>
            <div className="mt-6 font-display text-2xl text-gradient-crimson">{p.price}</div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.items.map((i) => (
                <li key={i} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson" /> {i}</li>
              ))}
            </ul>
            <Link to="/contato" className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${p.featured ? "gradient-crimson text-[oklch(0.12_0.012_30)]" : "border border-crimson/40 hover:bg-crimson/10"}`}>
              Aplicar agora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </section>

      <div className="bg-card/40 border-y border-crimson/15 pb-8">
        <AgencyTeaser content={cms.home} />
      </div>

      <section className="mx-auto max-w-5xl px-5 pb-24 pt-24 text-center lg:px-10">
        <SectionHeader align="center" eyebrow="Para quem" title={<>Feita pra quem <span className="italic text-gradient-crimson">já decidiu crescer.</span></>} description={cms.mentoria.audienceDescription} />
      </section>
    </div>
  );
}
