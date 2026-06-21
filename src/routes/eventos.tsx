import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Music, Users, ArrowRight, Sparkles } from "lucide-react";
import eventCountry from "@/assets/event-country.jpg";
import heroStage from "@/assets/hero-stage.jpg";
import programBg from "@/assets/program-bg.jpg";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos MAXIMUS — Maximus Experience Country & mais" },
      { name: "description", content: "Eventos apresentados e produzidos por MAXIMUS, incluindo o Maximus Experience Country: música ao vivo, networking e brincadeiras." },
      { property: "og:title", content: "Eventos MAXIMUS" },
      { property: "og:description", content: "Maximus Experience Country e outras experiências premium." },
    ],
  }),
  component: Eventos,
});

const EVENTS = [
  { name: "Maximus Experience Country", date: "Sábado · 25 Julho", time: "Início 18h · The Chris", img: eventCountry, tag: "Festival", desc: "Festival de caldo, música ao vivo, brincadeiras e networking. O maior evento autoral do Max." },
  { name: "Me Chama Que Eu Vou — Edição ao vivo", date: "Em breve", time: "Gravação aberta", img: programBg, tag: "Programa", desc: "Edição especial gravada com público presente e convidados surpresa." },
  { name: "Maximus Night", date: "Em breve", time: "Convite restrito", img: heroStage, tag: "Premium", desc: "Noite fechada de networking com marcas, criadores e parceiros." },
];

function Eventos() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden py-24 lg:py-32">
        <img src={eventCountry} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 to-background" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-gold"><Sparkles className="h-3 w-3" /> Agenda</div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95]">
            Eventos <span className="italic text-gradient-gold">MAXIMUS.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Experiências autorais e produções assinadas pelo Max. Onde o público vira convidado e a marca vira parte da história.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-20">
        <div className="space-y-8">
          {EVENTS.map((e, i) => (
            <article key={e.name} className="group relative grid overflow-hidden rounded-3xl border border-gold/15 bg-card/60 backdrop-blur md:grid-cols-2">
              <div className={`relative aspect-[16/10] overflow-hidden md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
                <img src={e.img} alt={e.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">{e.tag}</div>
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{e.name}</h2>
                <p className="text-muted-foreground">{e.desc}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> {e.date}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {e.time}</div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link to="/contato" className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.012_30)]">
                    Quero participar <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold hover:bg-gold/10">
                    Patrocinar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <SectionHeader eyebrow="O que vive em um evento MAXIMUS" align="center" title={<>Cada detalhe pensado para <span className="italic text-gradient-gold">marcar.</span></>} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { icon: Music, t: "Música ao vivo", d: "Curadoria country-luxe que dita o tom da noite." },
            { icon: Users, t: "Networking real", d: "Encontros mediados entre marcas, criadores e decisores." },
            { icon: Sparkles, t: "Experiência premium", d: "Cenografia, iluminação e brincadeiras que viram conteúdo." },
          ].map((it) => (
            <div key={it.t} className="rounded-2xl border border-gold/15 bg-card/60 p-7 backdrop-blur">
              <it.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl font-bold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}