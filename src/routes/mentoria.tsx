import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Check, ArrowRight, Crown } from "lucide-react";
import mentoria from "@/assets/mentoria.jpg";
import textureGold from "@/assets/texture-gold.jpg";
import { SectionHeader } from "@/components/SectionHeader";
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
  return (
    <div className="overflow-hidden">
      <section className="relative isolate py-24 lg:py-32">
        <img src={mentoria} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 to-background" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-gold"><GraduationCap className="h-3 w-3" /> Mentoria</div>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.92]">
            Posicionamento <br /><span className="italic text-gradient-gold">de palco.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            "Você não é POBRE, você só tem MAU posicionamento." Mentoria sem firula, com método e direção, para quem quer transformar presença em palco e palco em resultado.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-card/40 p-8 md:p-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-gold">
              Quadro Exclusivo
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Você não é pobre, <br />
              <span className="italic text-gradient-gold">você só tem mau gosto!</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              O quadro que conquistou a internet e virou pilar da mentoria. Karlos Edward analisa moda, estilo e posicionamento de forma direta, ácida e transformadora. Descubra como a sua imagem fala antes de você abrir a boca.
            </p>
            <div className="mt-8">
              <a href="https://www.instagram.com/eusoumaximus/reel/DZ2G18aJQ2q/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-foreground hover:bg-gold/10">
                Assistir ao Reel no Instagram <ArrowRight className="h-4 w-4 text-gold" />
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl ring-1 ring-gold/30 shadow-luxe bg-white">
            <iframe
              src="https://www.instagram.com/p/DZ2G18aJQ2q/embed"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
            ></iframe>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-10 lg:py-24">
        {[
          { title: "Pílula", level: "1 sessão estratégica", price: "Sob consulta", desc: "Diagnóstico rápido de posicionamento e plano de ação imediato.", items: ["Diagnóstico de marca pessoal", "Plano de 30 dias", "1h ao vivo com Max"] },
          { title: "Imersão", level: "4 semanas", price: "Vagas limitadas", desc: "Mergulho profundo em palco, câmera, narrativa e parcerias.", items: ["4 sessões 1:1", "Roteiro de palco e câmera", "Pitch de parceria pronto", "Suporte WhatsApp"], featured: true },
          { title: "Trono", level: "Programa anual VIP", price: "Convite", desc: "Acompanhamento contínuo + acesso a eventos fechados Maximus.", items: ["Acompanhamento mensal", "Acesso a Maximus Night", "Curadoria de parcerias", "Posicionamento de marca completo"] },
        ].map((p) => (
          <div key={p.title} className={`relative flex flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur ${p.featured ? "border-gold/60 shadow-glow-gold" : "border-gold/15 bg-card/60"}`}>
            {p.featured && (
              <>
                <img src={textureGold} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background/95" />
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[oklch(0.12_0.012_30)]"><Crown className="h-3 w-3" /> Mais escolhida</div>
              </>
            )}
            <div className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.level}</div>
            <h3 className="mt-3 font-display text-3xl font-bold">{p.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground">{p.desc}</div>
            <div className="mt-6 font-display text-2xl text-gradient-gold">{p.price}</div>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.items.map((i) => (
                <li key={i} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {i}</li>
              ))}
            </ul>
            <Link to="/contato" className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${p.featured ? "gradient-gold text-[oklch(0.12_0.012_30)]" : "border border-gold/40 hover:bg-gold/10"}`}>
              Aplicar agora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 text-center lg:px-10">
        <SectionHeader align="center" eyebrow="Para quem" title={<>Feita pra quem <span className="italic text-gradient-gold">já decidiu crescer.</span></>} description="Apresentadores, criadores de conteúdo, empreendedores e profissionais que querem ocupar palco e construir uma marca pessoal premium." />
      </section>
    </div>
  );
}