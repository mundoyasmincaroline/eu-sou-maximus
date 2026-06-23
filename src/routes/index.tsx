import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mic, Sparkles, Calendar, GraduationCap, Users, Play, Instagram, MessageCircle, Star, Quote } from "lucide-react";
import eventCountry from "@/assets/event-country.jpg";
import mentoria from "@/assets/mentoria.jpg";
import textureGold from "@/assets/texture-gold.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/site";
import { useCmsContentState } from "@/lib/cmsContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAXIMUS · Karlos Edward — Apresentador & Influenciador" },
      { name: "description", content: "Site oficial de Karlos Edward, o MAXIMUS. Apresentador do programa Me Chama Que Eu Vou, host do Maximus Experience Country, mentor e influenciador." },
      { property: "og:title", content: "MAXIMUS · Karlos Edward" },
      { property: "og:description", content: "Apresentador, influenciador, host de eventos e mentor." },
    ],
  }),
  component: Home,
});

function Home() {
  const { content: cms, isLoading } = useCmsContentState();
  return (
    <div className="overflow-hidden">
      <Hero content={cms.home} isLoading={isLoading} />
      <Marquee />
      <AboutSection content={cms.home} />
      <Pillars />
      <ProgramTeaser content={cms} />
      <EventsTeaser content={cms.home} />
      <MentoriaTeaser content={cms.home} />
      <Testimonials items={cms.testimonials} />
      <CTASection content={cms.home} />
    </div>
  );
}

function Hero({ content, isLoading }: { content: ReturnType<typeof useCmsContentState>["content"]["home"]; isLoading: boolean }) {
  return (
    <section className="relative isolate min-h-[92vh] flex flex-col justify-center overflow-hidden bg-background">
      {!isLoading && <img src={content.heroBackgroundImage} alt="" width={1920} height={1080} className="absolute inset-0 -z-30 h-full w-full object-cover object-center opacity-100" />}

      {content.heroYoutubeId && !isLoading && (
        <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden bg-background">
          <iframe
            title="Hero video background"
            src={`https://www.youtube.com/embed/${content.heroYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${content.heroYoutubeId}&playsinline=1&start=${content.heroYoutubeStartTime || 0}&end=${content.heroYoutubeEndTime || 15}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
            className="absolute left-1/2 top-1/2 aspect-video h-auto min-h-full w-auto min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-95"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 noise" />

      <div className="mx-auto w-full max-w-4xl text-center px-5 py-24 lg:px-10 lg:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-gold backdrop-blur">
          <Sparkles className="h-3 w-3" /> {content.heroEyebrow}
        </div>
        <h1 className="mt-8 font-display text-[clamp(4rem,10vw,8.5rem)] font-black leading-[0.9] tracking-tight">
          <span className="block text-gradient-gold">{content.heroTitle}</span>
          <span className="mt-4 block text-3xl font-normal italic text-muted-foreground md:text-4xl">{content.heroSubtitle}</span>
        </h1>
        <div className="mt-14 flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/contato"
            className="group inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4.5 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-gold transition-transform hover:scale-[1.03]"
          >
            Fechar parceria
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/40 px-8 py-4.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-gold/10"
          >
            <MessageCircle className="h-4 w-4 text-gold" />
            WhatsApp direto
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ content }: { content: ReturnType<typeof useCmsContentState>["content"]["home"] }) {
  const [quote, ...rest] = content.heroDescription.split("\n");
  
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Apresentador · Host · Influenciador"
            title={<>Prazer, <span className="text-gradient-gold italic">MAXIMUS.</span></>}
          />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            <span className="text-gold">"{quote}"</span><br /><br />
            {rest.join(" ")}
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gold/15 pt-8">
            {[...content.stats].slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl">{s.value}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative mx-auto w-full max-w-md lg:mr-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxe ring-1 ring-gold/30">
            <img src={content.heroPortraitImage} alt="MAXIMUS" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">Apresentador e Mentor</div>
              <div className="mt-1 font-display text-2xl font-bold">Karlos Edward</div>
            </div>
          </div>
          <div className="absolute -left-4 -top-4 -z-10 hidden h-32 w-32 rounded-full gradient-gold opacity-40 blur-3xl lg:block" />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["MAXIMUS EXPERIENCE COUNTRY", "ME CHAMA QUE EU VOU", "MENTORIAS", "NETWORKING", "PARCERIAS DE MARCA", "EVENTOS PREMIUM"];
  return (
    <div className="relative border-y border-gold/15 bg-[oklch(0.09_0.012_30)] py-5">
      <div className="flex animate-[shimmer_30s_linear_infinite] gap-12 overflow-hidden whitespace-nowrap">
        <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] gap-12">
          {[...items, ...items, ...items].map((t, i) => (
            <span key={i} className="font-display text-sm uppercase tracking-[0.4em] text-muted-foreground">
              ✦ {t}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function Pillars() {
  const items = [
    { icon: Mic, title: "O Programa", text: "Me Chama Que Eu Vou — episódios autorais com convidados que movimentam o Brasil.", to: "/programa" },
    { icon: Calendar, title: "Eventos", text: "Maximus Experience Country e outras experiências pensadas para conexão real.", to: "/eventos" },
    { icon: GraduationCap, title: "Mentorias", text: "Posicionamento, palco e marca pessoal para apresentadores e empreendedores.", to: "/mentoria" },
    { icon: Users, title: "Networking", text: "Encontros fechados que abrem portas com quem decide.", to: "/contato" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <SectionHeader
        eyebrow="O Universo MAXIMUS"
        title={<>Quatro frentes, <span className="text-gradient-gold italic">um só palco</span>.</>}
        description="Cada projeto carrega a mesma assinatura: presença country-luxe, energia de palco e entrega de resultado para marcas, eventos e mentorados."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <Link
            key={it.title}
            to={it.to}
            className="group relative overflow-hidden rounded-2xl border border-gold/15 bg-card/60 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-glow-gold"
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundImage: "radial-gradient(circle at top right, oklch(0.78 0.13 82 / 0.15), transparent 60%)" }} />
            <it.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-2xl font-bold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Acessar <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

type SiteContent = ReturnType<typeof useCmsContentState>["content"];

function ProgramTeaser({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <img src={content.program.heroImage} alt="" width={1600} height={1200} className="h-full w-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-gold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> No ar agora
          </div>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[1.02] md:text-6xl">
            {content.home.programTitle.split(" ").slice(0, 2).join(" ")} <br />
            <span className="italic text-gradient-gold">{content.home.programTitle.split(" ").slice(2).join(" ") || content.home.programTitle}</span>
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            {content.home.programDescription}
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/programa" className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-gold">
              <Play className="h-4 w-4" /> Ver episódios
            </Link>
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-foreground hover:bg-gold/10">
              Quero ser convidado
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.program.episodes.slice(0, 4).map((episode) => (
            <div key={episode.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-gold/20">
              <img src={episode.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[9px] uppercase tracking-[0.3em] text-gold">Episódio · {episode.number}</div>
                <div className="font-display text-sm font-semibold">{episode.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsTeaser({ content }: { content: SiteContent["home"] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-luxe">
        <img src={eventCountry} alt="Maximus Experience Country" width={1600} height={1200} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="relative grid gap-8 p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Próximo evento</div>
            <h3 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              {content.eventsTitle.split(" ").slice(0, 1).join(" ")} <br /><span className="text-gradient-gold italic">{content.eventsTitle.split(" ").slice(1).join(" ")}</span>
            </h3>
            <p className="mt-5 max-w-md text-muted-foreground">
              {content.eventsDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground/80">
              <span className="rounded-full border border-gold/30 px-4 py-1.5">🤠 Música ao vivo</span>
              <span className="rounded-full border border-gold/30 px-4 py-1.5">✨ Networking premium</span>
              <span className="rounded-full border border-gold/30 px-4 py-1.5">🎤 Brincadeiras</span>
            </div>
            <Link to="/eventos" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-sm font-semibold text-[oklch(0.12_0.012_30)]">
              Quero participar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function MentoriaTeaser({ content }: { content: SiteContent["home"] }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
      <div className="relative aspect-[5/6] overflow-hidden rounded-3xl ring-1 ring-gold/20">
        <img src={mentoria} alt="Mentoria MAXIMUS" width={1600} height={1200} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
      </div>
      <div className="flex flex-col justify-center">
        <SectionHeader
          eyebrow="Mentorias & Marca Pessoal"
          title={<>{content.mentoriaTitle.split(",")[0]}, <br /><span className="italic text-gradient-gold">{content.mentoriaTitle.split(",").slice(1).join(",") || content.mentoriaTitle}</span></>}
          description={content.mentoriaDescription}
        />
        <ul className="mt-8 space-y-3 text-sm text-foreground/85">
          {content.mentoriaBullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Star className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/mentoria" className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-gold/10">
            Conhecer mentoria <ArrowRight className="h-4 w-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ items }: { items: SiteContent["testimonials"] }) {
  return (
    <section className="border-y border-gold/15 bg-[oklch(0.09_0.012_30)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeader
          align="center"
          eyebrow="Quem já viveu MAXIMUS"
          title={<>Não é hype. <span className="text-gradient-gold italic">É entrega.</span></>}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-gold/15 bg-card/60 p-7 backdrop-blur">
              <Quote className="h-7 w-7 text-gold" />
              <blockquote className="mt-5 font-display text-lg leading-snug text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— {t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ content }: { content: SiteContent["home"] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-luxe">
        <img src={textureGold} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        <div className="relative grid gap-10 p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <h3 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              {content.ctaTitle.split(" ").slice(0, 2).join(" ")} <span className="text-gradient-gold italic">{content.ctaTitle.split(" ").slice(2).join(" ")}</span>
            </h3>
            <p className="mt-5 max-w-md text-muted-foreground">
              {content.ctaDescription}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 lg:items-end">
            <Link to="/contato" className="inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-gold">
              Iniciar contato profissional <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold">
              <Instagram className="h-4 w-4" /> @eusoumaximus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
