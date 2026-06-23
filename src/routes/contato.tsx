import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Check, MessageCircle, Sparkles, Handshake, Mic, Calendar, GraduationCap } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site";
import { useCmsContent } from "@/lib/cmsContent";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato MAXIMUS — Parcerias, eventos e quadro do programa" },
      { name: "description", content: "Funil de contato profissional com Max (MAXIMUS): parcerias de marca, quadro do programa Me Chama Que Eu Vou, presença em eventos e mentoria. Atendimento direto via WhatsApp." },
      { property: "og:title", content: "Contato MAXIMUS" },
      { property: "og:description", content: "Fale direto com a equipe de Maximus pelo WhatsApp." },
    ],
  }),
  component: Contato,
});

type Goal = "parceria" | "quadro" | "evento" | "mentoria";

const GOALS: { id: Goal; icon: typeof Handshake; title: string; desc: string }[] = [
  { id: "parceria", icon: Handshake, title: "Parceria de marca", desc: "Campanhas, conteúdo patrocinado e ativações com a marca MAXIMUS." },
  { id: "quadro", icon: Mic, title: "Quadro no programa", desc: "Participar do Me Chama Que Eu Vou como convidado ou patrocinador." },
  { id: "evento", icon: Calendar, title: "Presença em evento", desc: "Contratar Maximus como apresentador, host ou atração do seu evento." },
  { id: "mentoria", icon: GraduationCap, title: "Mentoria & networking", desc: "Aplicar para mentoria 1:1 ou para os encontros fechados Maximus." },
];

function Contato() {
  const cms = useCmsContent();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  const total = 4;
  const progress = ((step + 1) / total) * 100;

  const message = useMemo(() => {
    const g = GOALS.find((x) => x.id === goal)?.title ?? "";
    return [
      `Olá Maximus! Vim pelo site oficial.`,
      ``,
      `*Objetivo:* ${g}`,
      name && `*Nome:* ${name}`,
      company && `*Empresa/Projeto:* ${company}`,
      budget && `*Investimento previsto:* ${budget}`,
      date && `*Data/Janela:* ${date}`,
      details && `*Detalhes:* ${details}`,
    ].filter(Boolean).join("\n");
  }, [goal, name, company, budget, date, details]);

  const waLink = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  const canNext = () => {
    if (step === 0) return !!goal;
    if (step === 1) return name.trim().length > 1;
    if (step === 2) return details.trim().length > 5;
    return true;
  };

  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-crimson">
            <Sparkles className="h-3 w-3" /> Contato profissional
          </div>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] md:text-6xl">
            {cms.contact.title.split(" ").slice(0, 1).join(" ")} <span className="italic text-gradient-crimson">{cms.contact.title.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            {cms.contact.description}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-crimson/20 bg-card/60 backdrop-blur shadow-luxe">
          <div className="h-1.5 bg-[oklch(0.2_0.012_30)]">
            <div className="h-full gradient-crimson transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="p-7 md:p-10">
            <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Passo {step + 1} de {total}</span>
              {goal && step > 0 && <span className="text-crimson">{GOALS.find((g) => g.id === goal)?.title}</span>}
            </div>

            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold">O que você precisa?</h2>
                <p className="mt-2 text-sm text-muted-foreground">Escolha a opção que melhor descreve seu contato.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`group rounded-2xl border p-5 text-left transition-all ${goal === g.id ? "border-crimson/70 bg-crimson/10 shadow-glow-crimson" : "border-crimson/15 hover:border-crimson/40"}`}
                    >
                      <g.icon className="h-6 w-6 text-crimson" strokeWidth={1.5} />
                      <div className="mt-4 font-display text-lg font-bold">{g.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Quem está chamando?</h2>
                <Field label="Seu nome">
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-crimson/20 bg-background/40 px-4 py-3 text-sm outline-none focus:border-crimson/60" placeholder="Nome completo" />
                </Field>
                <Field label="Empresa, marca ou projeto (opcional)">
                  <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border border-crimson/20 bg-background/40 px-4 py-3 text-sm outline-none focus:border-crimson/60" placeholder="Ex: Marca XYZ" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl font-bold">Conta os detalhes.</h2>
                <Field label="O que você tem em mente?">
                  <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={5} className="w-full resize-none rounded-xl border border-crimson/20 bg-background/40 px-4 py-3 text-sm outline-none focus:border-crimson/60" placeholder="Descreva a proposta, formato, expectativas..." />
                </Field>
                {goal !== "mentoria" && (
                  <Field label="Data ou janela desejada">
                    <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-crimson/20 bg-background/40 px-4 py-3 text-sm outline-none focus:border-crimson/60" placeholder="Ex: Setembro/2026" />
                  </Field>
                )}
                <Field label="Investimento previsto (opcional)">
                  <div className="flex flex-wrap gap-2">
                    {["Até R$ 5 mil", "R$ 5–15 mil", "R$ 15–50 mil", "R$ 50 mil+"].map((b) => (
                      <button key={b} type="button" onClick={() => setBudget(b)} className={`rounded-full border px-4 py-2 text-xs ${budget === b ? "border-crimson/70 bg-crimson/15 text-crimson" : "border-crimson/20 text-muted-foreground hover:border-crimson/40"}`}>{b}</button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-full gradient-crimson text-[oklch(0.12_0.012_30)] shadow-glow-crimson"><Check className="h-7 w-7" /></div>
                <h2 className="mt-6 font-display text-3xl font-bold">Tudo certo, {name.split(" ")[0] || "amigo"}!</h2>
                <p className="mt-3 text-muted-foreground">Revise sua mensagem e envie direto pelo WhatsApp. A equipe Maximus responde em horário comercial.</p>
                <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-crimson/20 bg-background/60 p-5 text-sm leading-relaxed text-foreground/85">{message}</pre>
                <a href={waLink} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-crimson px-6 py-4 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-crimson">
                  <MessageCircle className="h-4 w-4" /> Enviar pelo WhatsApp
                </a>
              </div>
            )}

            {step < 3 && (
              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-crimson/20 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-crimson disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <button
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="inline-flex items-center gap-2 rounded-full gradient-crimson px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-crimson disabled:opacity-40 disabled:shadow-none"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          Prefere ir direto?{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-crimson hover:underline">
            Abrir conversa no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
