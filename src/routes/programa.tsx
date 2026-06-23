import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Calendar, ArrowRight, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoModal } from "@/components/VideoModal";
import { useCmsContent } from "@/lib/cmsContent";

export const Route = createFileRoute("/programa")({
  head: () => ({
    meta: [
      { title: "Me Chama Que Eu Vou — Programa oficial de MAXIMUS" },
      { name: "description", content: "Página oficial do programa Me Chama Que Eu Vou, apresentado por Karlos Edward (MAXIMUS). Episódios, convidados e bastidores." },
      { property: "og:title", content: "Me Chama Que Eu Vou — MAXIMUS" },
      { property: "og:description", content: "Conheça os episódios e participe do programa." },
    ],
  }),
  component: Programa,
});

function Programa() {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const [activeYoutube, setActiveYoutube] = useState<string | null>(null);
  const cms = useCmsContent();

  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden py-24 lg:py-32">
        <img src={cms.program.heroImage} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-crimson">
            <Mic className="h-3 w-3" /> O programa
          </div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95]">
            {cms.program.heroTitle.split(" ").slice(0, 2).join(" ")} <br /><span className="italic text-gradient-crimson">{cms.program.heroTitle.split(" ").slice(2).join(" ") || cms.program.heroTitle}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {cms.program.heroDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full gradient-crimson px-7 py-3.5 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-crimson">
              Quero ser convidado <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-crimson/40 px-7 py-3.5 text-sm font-semibold hover:bg-crimson/10">
              Patrocinar um quadro
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <SectionHeader eyebrow="Episódios" title={<>Últimas <span className="italic text-gradient-crimson">edições.</span></>} description="Uma seleção dos episódios em destaque. Em breve, integração direta com YouTube e Instagram." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cms.program.episodes.map((e) => (
            <article key={e.id} className="group relative overflow-hidden rounded-2xl border border-crimson/15 bg-card/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-crimson/50 hover:shadow-glow-crimson">
              <div className="relative aspect-video overflow-hidden bg-card cursor-pointer group" onClick={() => e.youtubeId ? setActiveYoutube(e.youtubeId) : e.embedId ? setActiveEmbed(e.embedId) : window.open(e.link, "_blank")}>
                <img src={e.image} alt={e.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-crimson backdrop-blur pointer-events-none">
                  EP · {e.number}
                </div>
                {(e.embedId || e.youtubeId) && (
                  <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="grid h-16 w-16 place-items-center rounded-full gradient-crimson text-[oklch(0.12_0.012_30)] shadow-glow-crimson transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold leading-snug">{e.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{e.guest}</span>
                  <span className="flex items-center gap-1 text-crimson"><Calendar className="h-3 w-3" /> {e.duration}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      <VideoModal
        isOpen={!!activeEmbed || !!activeYoutube}
        onClose={() => { setActiveEmbed(null); setActiveYoutube(null); }}
        embedId={activeEmbed}
        youtubeId={activeYoutube}
      />
    </div>
  );
}
