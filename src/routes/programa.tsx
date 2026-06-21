import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Mic, Calendar, ArrowRight } from "lucide-react";
import programBg from "@/assets/program-bg.jpg";
import heroStage from "@/assets/hero-stage.jpg";
import { SectionHeader } from "@/components/SectionHeader";

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

const EPISODES = [
  {
    n: "01",
    title: "Episódio 1 - Circo do Dedé Santana",
    guest: "Pará de Minas",
    duration: "Instagram",
    img: programBg,
    embedId: "DZ02LcLJKlR",
    link: "https://www.instagram.com/p/DZ02LcLJKlR/"
  },
  ...Array.from({ length: 5 }).map((_, i) => ({
    n: String(i + 2).padStart(2, "0"),
    title: ["Bastidores do palco country", "Marcas que viraram cultura", "A noite mais comentada do ano", "Convidado surpresa & brincadeiras", "Networking sem firula"][i],
    guest: ["Influência & moda", "Empreendedor do ano", "Artista revelação", "Personalidade local", "Mentor de negócios"][i],
    duration: ["28 min", "41 min", "26 min", "37 min", "33 min"][i],
    img: i % 2 ? heroStage : programBg,
    embedId: null,
    link: "#"
  }))
];

function Programa() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden py-24 lg:py-32">
        <img src={programBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-gold">
            <Mic className="h-3 w-3" /> O programa
          </div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95]">
            Me Chama <br /><span className="italic text-gradient-gold">Que Eu Vou.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Programa autoral de Karlos Edward — o MAXIMUS. Episódios com convidados, bastidores, brincadeiras e conversas com quem está movimentando cultura, marca e palco no Brasil.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-gold">
              Quero ser convidado <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold hover:bg-gold/10">
              Patrocinar um quadro
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <SectionHeader eyebrow="Episódios" title={<>Últimas <span className="italic text-gradient-gold">edições.</span></>} description="Uma seleção dos episódios em destaque. Em breve, integração direta com YouTube e Instagram." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EPISODES.map((e) => (
            <article key={e.n} className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow-gold">
              <div className="relative aspect-video overflow-hidden bg-card">
                {e.embedId ? (
                  <iframe
                    src={`https://www.instagram.com/p/${e.embedId}/embed`}
                    className="absolute inset-0 w-full h-full bg-white"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                  ></iframe>
                ) : (
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img src={e.img} alt={e.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold backdrop-blur pointer-events-none">
                      EP · {e.n}
                    </div>
                  </a>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold leading-snug">{e.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{e.guest}</span>
                  <span className="flex items-center gap-1 text-gold"><Calendar className="h-3 w-3" /> {e.duration}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}