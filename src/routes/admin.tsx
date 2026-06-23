import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect, type ChangeEvent, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { ArrowLeft, Camera, Check, Download, Eye, Image, Lock, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { CMS_STORAGE_KEY, defaultCmsContent, loadCmsContent, resetCmsContent, saveCmsContent, type CmsContent } from "@/lib/cmsContent";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin MAXIMUS — Atualização do site" },
      { name: "description", content: "Painel administrativo local para atualizar textos, fotos, episódios, eventos, mentorias e galeria do site MAXIMUS." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const ADMIN_EMAIL = "contatoeusoumaximus@gmail.com";
const ADMIN_PASSWORD_SHA256 = "c383f8002fb5d3448518471a4527097d458b7e4661e89259bcdc44ed07d1094b";
const ADMIN_SESSION_KEY = "maximus-admin-session-v1";

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => typeof window !== "undefined" && window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "ok");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event?: FormEvent) {
    event?.preventDefault();
    setError("");
    const passwordHash = await sha256(password);
    if (email.trim().toLowerCase() === ADMIN_EMAIL && passwordHash === ADMIN_PASSWORD_SHA256) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "ok");
      setAuthenticated(true);
      setPassword("");
      return;
    }
    setError("Acesso não autorizado.");
  }

  if (!authenticated) {
    return (
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center px-5 py-16 lg:px-10">
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-crimson/20 bg-card/70 p-7 shadow-luxe backdrop-blur md:p-9">
          <div className="grid h-14 w-14 place-items-center rounded-full gradient-crimson text-[oklch(0.12_0.012_30)] shadow-glow-crimson"><Lock className="h-6 w-6" /></div>
          <h1 className="mt-6 font-display text-4xl font-black leading-tight">Admin <span className="text-gradient-crimson italic">MAXIMUS</span></h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Acesse para atualizar fotos, textos, episódios, eventos, galeria, mentorias e depoimentos.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Field label="Email">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" autoComplete="email" />
            </Field>
            <Field label="Senha">
              <input value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input" type="password" autoComplete="current-password" />
            </Field>
            {error && <p className="rounded-xl border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-foreground">{error}</p>}
            <button type="button" onClick={() => void handleLogin()} className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-crimson px-6 py-3.5 text-sm font-bold text-[oklch(0.12_0.012_30)] shadow-glow-crimson">
              Entrar no painel <Lock className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    );
  }

  return <AdminEditor onLogout={() => { window.sessionStorage.removeItem(ADMIN_SESSION_KEY); setAuthenticated(false); }} />;
}

function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("home");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadCmsContent().then((data) => {
      setContent(data);
      setIsLoading(false);
    });
  }, []);

  const tabs = useMemo(() => [
    { id: "home", label: "Home" },
    { id: "program", label: "Programa" },
    { id: "events", label: "Eventos" },
    { id: "gallery", label: "Galeria" },
    { id: "mentoria", label: "Mentorias" },
    { id: "social", label: "Depoimentos" },
    { id: "backup", label: "Backup" },
  ], []);

  async function persist(next = content) {
    await saveCmsContent(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  function restoreDefaults() {
    resetCmsContent();
    setContent(defaultCmsContent);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-crimson animate-pulse">Carregando painel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-crimson/15 bg-[oklch(0.09_0.012_30)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground hover:text-crimson"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link>
            <h1 className="mt-5 font-display text-5xl font-black leading-tight md:text-6xl">Painel <span className="text-gradient-crimson italic">editorial.</span></h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">Atualize todo o conteúdo visual e textual. Fotos são otimizadas automaticamente para carregar rápido mantendo aparência premium.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-5 py-3 text-sm font-semibold hover:bg-crimson/10"><Eye className="h-4 w-4 text-crimson" /> Ver site</Link>
            <button onClick={() => persist()} className="inline-flex items-center gap-2 rounded-full gradient-crimson px-5 py-3 text-sm font-bold text-[oklch(0.12_0.012_30)] shadow-glow-crimson"><Save className="h-4 w-4" /> Salvar</button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-5 py-3 text-sm font-semibold hover:bg-crimson/10"><LogOut className="h-4 w-4 text-crimson" /> Sair</button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[260px_1fr] lg:px-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-crimson/15 bg-card/60 p-3 backdrop-blur">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActive(tab.id)} className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${active === tab.id ? "gradient-crimson text-[oklch(0.12_0.012_30)]" : "text-muted-foreground hover:bg-crimson/10 hover:text-foreground"}`}>{tab.label}</button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-crimson/15 bg-card/40 p-4 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-crimson">Online:</strong> As alterações são salvas automaticamente no banco de dados e refletidas em tempo real.
          </div>
        </aside>

        <main className="space-y-6">
          {saved && <div className="flex items-center gap-2 rounded-2xl border border-crimson/25 bg-crimson/10 px-5 py-3 text-sm text-foreground"><Check className="h-4 w-4 text-crimson" /> Alterações salvas.</div>}
          {active === "home" && <HomePanel content={content} setContent={setContent} />}
          {active === "program" && <ProgramPanel content={content} setContent={setContent} />}
          {active === "events" && <EventsPanel content={content} setContent={setContent} />}
          {active === "gallery" && <GalleryPanel content={content} setContent={setContent} />}
          {active === "mentoria" && <MentoriaPanel content={content} setContent={setContent} />}
          {active === "social" && <SocialPanel content={content} setContent={setContent} />}
          {active === "backup" && <BackupPanel content={content} setContent={setContent} onReset={restoreDefaults} onSave={persist} />}
        </main>
      </div>
    </div>
  );
}

type PanelProps = { content: CmsContent; setContent: Dispatch<SetStateAction<CmsContent>> };

function HomePanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Home / Branding principal & Biografia" description="Atualize a primeira impressão do site e a biografia (Quem Sou Eu).">
      <ImageInput label="Imagem hero principal" value={content.home.heroBackgroundImage} onChange={(image) => setContent((c) => ({ ...c, home: { ...c.home, heroBackgroundImage: image } }))} />
      <ImageInput label="Imagem vertical biografia (Quem Sou Eu)" value={content.home.heroPortraitImage} onChange={(image) => setContent((c) => ({ ...c, home: { ...c.home, heroPortraitImage: image } }))} />
      <Grid>
        <TextInput label="ID do YouTube para o Fundo (ex: BshWPt2MYxI)" value={content.home.heroYoutubeId || ""} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroYoutubeId: v } }))} />
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Tempo Início (segundos)" value={content.home.heroYoutubeStartTime || "0"} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroYoutubeStartTime: v } }))} />
          <TextInput label="Tempo Fim (segundos)" value={content.home.heroYoutubeEndTime || "15"} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroYoutubeEndTime: v } }))} />
        </div>
      </Grid>
      <Grid>
        <TextInput label="Eyebrow" value={content.home.heroEyebrow} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroEyebrow: v } }))} />
        <TextInput label="Título" value={content.home.heroTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroTitle: v } }))} />
        <TextInput label="Subtítulo" value={content.home.heroSubtitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroSubtitle: v } }))} />
        <TextArea label="Biografia / Texto Longo (Quem Sou Eu)" value={content.home.heroDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, heroDescription: v } }))} />
      </Grid>
      <Repeater title="Números de autoridade (Quem Sou Eu)" onAdd={() => setContent((c) => ({ ...c, home: { ...c.home, stats: [...c.home.stats, { value: "0+", label: "Novo dado" }] } }))}>
        {content.home.stats.map((stat, index) => (
          <RowCard key={index} onRemove={() => setContent((c) => ({ ...c, home: { ...c.home, stats: c.home.stats.filter((_, i) => i !== index) } }))}>
            <TextInput label="Valor" value={stat.value} onChange={(v) => setContent((c) => updateStat(c, index, "value", v))} />
            <TextInput label="Label" value={stat.label} onChange={(v) => setContent((c) => updateStat(c, index, "label", v))} />
          </RowCard>
        ))}
      </Repeater>
      <TextInput label="Título teaser programa" value={content.home.programTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, programTitle: v } }))} />
      <TextArea label="Descrição teaser programa" value={content.home.programDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, programDescription: v } }))} />
      <TextInput label="Título teaser eventos" value={content.home.eventsTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, eventsTitle: v } }))} />
      <TextArea label="Descrição teaser eventos" value={content.home.eventsDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, eventsDescription: v } }))} />
      <TextInput label="Título teaser mentoria" value={content.home.mentoriaTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, mentoriaTitle: v } }))} />
      <TextArea label="Descrição teaser mentoria" value={content.home.mentoriaDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, mentoriaDescription: v } }))} />
      <TextInput label="Título teaser agência" value={content.home.agencyTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, agencyTitle: v } }))} />
      <TextArea label="Descrição teaser agência" value={content.home.agencyDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, agencyDescription: v } }))} />
      <TextInput label="ID do Reels Instagram (Agência)" value={content.home.agencyInstagramId} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, agencyInstagramId: v } }))} />
      <ImageInput label="Imagem de capa (Agência)" value={content.home.agencyImage} onChange={(image) => setContent((c) => ({ ...c, home: { ...c.home, agencyImage: image } }))} />
      <TextInput label="Título CTA final" value={content.home.ctaTitle} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, ctaTitle: v } }))} />
      <TextArea label="Descrição CTA final" value={content.home.ctaDescription} onChange={(v) => setContent((c) => ({ ...c, home: { ...c.home, ctaDescription: v } }))} />
    </Panel>
  );
}

function ProgramPanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Programa Me Chama Que Eu Vou" description="Edite capa, texto e cards dos episódios. Use o código do post/reel do Instagram no campo Embed ID.">
      <ImageInput label="Imagem de capa" value={content.program.heroImage} onChange={(image) => setContent((c) => ({ ...c, program: { ...c.program, heroImage: image } }))} />
      <TextInput label="Título" value={content.program.heroTitle} onChange={(v) => setContent((c) => ({ ...c, program: { ...c.program, heroTitle: v } }))} />
      <TextArea label="Descrição" value={content.program.heroDescription} onChange={(v) => setContent((c) => ({ ...c, program: { ...c.program, heroDescription: v } }))} />
      <Repeater title="Episódios" onAdd={() => setContent((c) => ({ ...c, program: { ...c.program, episodes: [...c.program.episodes, { id: crypto.randomUUID(), number: String(c.program.episodes.length + 1).padStart(2, "0"), title: "Novo episódio", guest: "Convidado", duration: "Instagram", image: c.program.heroImage, embedId: "", youtubeId: "", link: "https://www.instagram.com/eusoumaximus/" }] } }))}>
        {content.program.episodes.map((episode, index) => (
          <RowCard key={episode.id} onRemove={() => setContent((c) => ({ ...c, program: { ...c.program, episodes: c.program.episodes.filter((_, i) => i !== index) } }))}>
            <ImageInput label="Capa" value={episode.image} onChange={(v) => setContent((c) => updateEpisode(c, index, "image", v))} compact />
            <Grid>
              <TextInput label="Número" value={episode.number} onChange={(v) => setContent((c) => updateEpisode(c, index, "number", v))} />
              <TextInput label="Título" value={episode.title} onChange={(v) => setContent((c) => updateEpisode(c, index, "title", v))} />
              <TextInput label="Convidado/local" value={episode.guest} onChange={(v) => setContent((c) => updateEpisode(c, index, "guest", v))} />
              <TextInput label="Duração/tag" value={episode.duration} onChange={(v) => setContent((c) => updateEpisode(c, index, "duration", v))} />
              <TextInput label="Embed ID Instagram" value={episode.embedId || ""} onChange={(v) => setContent((c) => updateEpisode(c, index, "embedId", v))} />
              <TextInput label="ID do YouTube (ex: BshWPt2MYxI)" value={episode.youtubeId || ""} onChange={(v) => setContent((c) => updateEpisode(c, index, "youtubeId", v))} />
              <TextInput label="Link externo" value={episode.link} onChange={(v) => setContent((c) => updateEpisode(c, index, "link", v))} />
            </Grid>
          </RowCard>
        ))}
      </Repeater>
    </Panel>
  );
}

function EventsPanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Eventos" description="Atualize eventos, datas, locais, fotos e descrições do Maximus Experience Country e demais agendas.">
      <ImageInput label="Imagem de capa da página" value={content.events.heroImage} onChange={(image) => setContent((c) => ({ ...c, events: { ...c.events, heroImage: image } }))} />
      <TextInput label="Título" value={content.events.heroTitle} onChange={(v) => setContent((c) => ({ ...c, events: { ...c.events, heroTitle: v } }))} />
      <TextArea label="Descrição" value={content.events.heroDescription} onChange={(v) => setContent((c) => ({ ...c, events: { ...c.events, heroDescription: v } }))} />
      <Repeater title="Cards de evento" onAdd={() => setContent((c) => ({ ...c, events: { ...c.events, items: [...c.events.items, { id: crypto.randomUUID(), name: "Novo evento", date: "Em breve", time: "Local a confirmar", image: c.events.heroImage, tag: "Evento", description: "Descrição do evento." }] } }))}>
        {content.events.items.map((event, index) => (
          <RowCard key={event.id} onRemove={() => setContent((c) => ({ ...c, events: { ...c.events, items: c.events.items.filter((_, i) => i !== index) } }))}>
            <ImageInput label="Foto" value={event.image} onChange={(v) => setContent((c) => updateEvent(c, index, "image", v))} compact />
            <Grid>
              <TextInput label="Nome" value={event.name} onChange={(v) => setContent((c) => updateEvent(c, index, "name", v))} />
              <TextInput label="Data" value={event.date} onChange={(v) => setContent((c) => updateEvent(c, index, "date", v))} />
              <TextInput label="Local/horário" value={event.time} onChange={(v) => setContent((c) => updateEvent(c, index, "time", v))} />
              <TextInput label="Tag" value={event.tag} onChange={(v) => setContent((c) => updateEvent(c, index, "tag", v))} />
              <TextArea label="Descrição" value={event.description} onChange={(v) => setContent((c) => updateEvent(c, index, "description", v))} />
            </Grid>
          </RowCard>
        ))}
      </Repeater>
    </Panel>
  );
}

function GalleryPanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Galeria" description="Suba fotos do Instagram, bastidores, eventos, ensaios e conteúdos de palco.">
      <TextInput label="Título" value={content.gallery.title} onChange={(v) => setContent((c) => ({ ...c, gallery: { ...c.gallery, title: v } }))} />
      <TextArea label="Descrição" value={content.gallery.description} onChange={(v) => setContent((c) => ({ ...c, gallery: { ...c.gallery, description: v } }))} />
      <Repeater title="Fotos" onAdd={() => setContent((c) => ({ ...c, gallery: { ...c.gallery, items: [...c.gallery.items, { id: crypto.randomUUID(), image: c.home.heroBackgroundImage, alt: "Foto MAXIMUS", embedId: "", youtubeId: "", link: "https://www.instagram.com/eusoumaximus/" }] } }))}>
        {content.gallery.items.map((item, index) => (
          <RowCard key={item.id} onRemove={() => setContent((c) => ({ ...c, gallery: { ...c.gallery, items: c.gallery.items.filter((_, i) => i !== index) } }))}>
            <ImageInput label="Imagem" value={item.image} onChange={(v) => setContent((c) => updateGallery(c, index, "image", v))} compact />
            <Grid>
              <TextInput label="Texto alternativo" value={item.alt} onChange={(v) => setContent((c) => updateGallery(c, index, "alt", v))} />
              <TextInput label="Embed ID Instagram" value={item.embedId || ""} onChange={(v) => setContent((c) => updateGallery(c, index, "embedId", v))} />
              <TextInput label="ID do YouTube" value={item.youtubeId || ""} onChange={(v) => setContent((c) => updateGallery(c, index, "youtubeId", v))} />
              <TextInput label="Link" value={item.link} onChange={(v) => setContent((c) => updateGallery(c, index, "link", v))} />
            </Grid>
          </RowCard>
        ))}
      </Repeater>
    </Panel>
  );
}

function MentoriaPanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Mentorias" description="Controle a página de posicionamento, quadro e planos comerciais.">
      <ImageInput label="Imagem hero" value={content.mentoria.heroImage} onChange={(image) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, heroImage: image } }))} />
      <TextInput label="Título hero" value={content.mentoria.heroTitle} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, heroTitle: v } }))} />
      <TextArea label="Descrição hero" value={content.mentoria.heroDescription} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, heroDescription: v } }))} />
      <ImageInput label="Imagem do quadro" value={content.mentoria.featureImage} onChange={(image) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, featureImage: image } }))} />
      <TextInput label="Título do quadro" value={content.mentoria.featureTitle} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, featureTitle: v } }))} />
      <TextArea label="Descrição do quadro" value={content.mentoria.featureDescription} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, featureDescription: v } }))} />
      <TextInput label="Embed ID do reel" value={content.mentoria.featureEmbedId} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, featureEmbedId: v } }))} />
      <Repeater title="Planos" onAdd={() => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, plans: [...c.mentoria.plans, { id: crypto.randomUUID(), title: "Novo plano", level: "Formato", price: "Sob consulta", description: "Descrição", items: ["Benefício 1"] }] } }))}>
        {content.mentoria.plans.map((plan, index) => (
          <RowCard key={plan.id} onRemove={() => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, plans: c.mentoria.plans.filter((_, i) => i !== index) } }))}>
            <Grid>
              <TextInput label="Título" value={plan.title} onChange={(v) => setContent((c) => updatePlan(c, index, "title", v))} />
              <TextInput label="Nível" value={plan.level} onChange={(v) => setContent((c) => updatePlan(c, index, "level", v))} />
              <TextInput label="Preço" value={plan.price} onChange={(v) => setContent((c) => updatePlan(c, index, "price", v))} />
              <TextArea label="Descrição" value={plan.description} onChange={(v) => setContent((c) => updatePlan(c, index, "description", v))} />
              <TextArea label="Itens (um por linha)" value={plan.items.join("\n")} onChange={(v) => setContent((c) => updatePlan(c, index, "items", v.split("\n").filter(Boolean)))} />
            </Grid>
          </RowCard>
        ))}
      </Repeater>
      <TextArea label="Descrição do público" value={content.mentoria.audienceDescription} onChange={(v) => setContent((c) => ({ ...c, mentoria: { ...c.mentoria, audienceDescription: v } }))} />
    </Panel>
  );
}

function SocialPanel({ content, setContent }: PanelProps) {
  return (
    <Panel title="Depoimentos" description="Atualize provas sociais exibidas na home.">
      <Repeater title="Depoimentos" onAdd={() => setContent((c) => ({ ...c, testimonials: [...c.testimonials, { quote: "Novo depoimento", author: "Autor" }] }))}>
        {content.testimonials.map((item, index) => (
          <RowCard key={index} onRemove={() => setContent((c) => ({ ...c, testimonials: c.testimonials.filter((_, i) => i !== index) }))}>
            <TextArea label="Depoimento" value={item.quote} onChange={(v) => setContent((c) => ({ ...c, testimonials: c.testimonials.map((t, i) => i === index ? { ...t, quote: v } : t) }))} />
            <TextInput label="Autor" value={item.author} onChange={(v) => setContent((c) => ({ ...c, testimonials: c.testimonials.map((t, i) => i === index ? { ...t, author: v } : t) }))} />
          </RowCard>
        ))}
      </Repeater>
    </Panel>
  );
}

function BackupPanel({ content, setContent, onReset, onSave }: PanelProps & { onReset: () => void; onSave: (next?: CmsContent) => void }) {
  const json = JSON.stringify(content, null, 2);
  function download() {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "maximus-site-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = JSON.parse(String(reader.result)) as CmsContent;
        setContent(next);
        onSave(next);
      } catch {
        alert("Arquivo inválido.");
      }
    };
    reader.readAsText(file);
  }
  return (
    <Panel title="Backup gratuito" description="Exporte o conteúdo para guardar ou importar em outro navegador. Isso evita depender de serviços pagos.">
      <div className="flex flex-wrap gap-3">
        <button onClick={download} className="inline-flex items-center gap-2 rounded-full gradient-crimson px-5 py-3 text-sm font-bold text-[oklch(0.12_0.012_30)]"><Download className="h-4 w-4" /> Baixar backup</button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-crimson/30 px-5 py-3 text-sm font-semibold hover:bg-crimson/10"><Upload className="h-4 w-4 text-crimson" /> Importar backup<input type="file" accept="application/json" className="hidden" onChange={importJson} /></label>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-full border border-crimson/40 px-5 py-3 text-sm font-semibold hover:bg-crimson/10"><RotateCcw className="h-4 w-4 text-crimson" /> Restaurar original</button>
      </div>
      <textarea value={json} readOnly rows={16} className="admin-input font-mono text-xs" />
      <p className="text-xs text-muted-foreground">Chave local: <code>{CMS_STORAGE_KEY}</code></p>
    </Panel>
  );
}

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="space-y-6 rounded-3xl border border-crimson/15 bg-card/50 p-6 shadow-luxe backdrop-blur md:p-8"><div><h2 className="font-display text-3xl font-bold">{title}</h2><p className="mt-2 text-sm text-muted-foreground">{description}</p></div>{children}</section>;
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>{children}</label>;
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><input value={value} onChange={(e) => onChange(e.target.value)} className="admin-input" /></Field>;
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <Field label={label}><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="admin-input resize-y" /></Field>;
}

async function optimizeImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
  const image = await new Promise<HTMLImageElement>((resolve) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.src = dataUrl;
  });
  const max = 1800;
  const scale = Math.min(1, max / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.88);
}

function ImageInput({ label, value, onChange, compact = false }: { label: string; value: string; onChange: (value: string) => void; compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const image = await optimizeImage(file);
    onChange(image);
    setBusy(false);
  }
  return (
    <Field label={label}>
      <div className={`grid gap-4 ${compact ? "md:grid-cols-[140px_1fr]" : "md:grid-cols-[220px_1fr]"}`}>
        <div className={`relative overflow-hidden rounded-2xl border border-crimson/20 bg-background/40 ${compact ? "aspect-square" : "aspect-video"}`}>
          {value ? <img src={value} alt={label} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-crimson"><Image className="h-8 w-8" /></div>}
        </div>
        <div className="space-y-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-crimson/30 px-5 py-3 text-sm font-semibold hover:bg-crimson/10"><Camera className="h-4 w-4 text-crimson" /> {busy ? "Otimizando..." : "Subir foto"}<input type="file" accept="image/*" className="hidden" onChange={handleFile} /></label>
          <input value={value.startsWith("data:") ? "Imagem enviada pelo painel" : value} onChange={(e) => onChange(e.target.value)} className="admin-input text-xs" placeholder="Ou cole uma URL de imagem" />
        </div>
      </div>
    </Field>
  );
}

function Repeater({ title, children, onAdd }: { title: string; children: ReactNode; onAdd: () => void }) {
  return <div className="space-y-4"><div className="flex items-center justify-between gap-4"><h3 className="font-display text-2xl font-bold">{title}</h3><button onClick={onAdd} className="inline-flex items-center gap-2 rounded-full border border-crimson/30 px-4 py-2 text-sm font-semibold hover:bg-crimson/10"><Plus className="h-4 w-4 text-crimson" /> Adicionar</button></div>{children}</div>;
}

function RowCard({ children, onRemove }: { children: ReactNode; onRemove: () => void }) {
  return <div className="relative space-y-4 rounded-2xl border border-crimson/15 bg-background/30 p-4"><button onClick={onRemove} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-crimson/30 text-crimson hover:bg-crimson/10" aria-label="Remover"><Trash2 className="h-4 w-4" /></button><div className="pr-12">{children}</div></div>;
}

function updateStat(content: CmsContent, index: number, key: "value" | "label", value: string): CmsContent {
  return { ...content, home: { ...content.home, stats: content.home.stats.map((item, i) => i === index ? { ...item, [key]: value } : item) } };
}
function updateEpisode(content: CmsContent, index: number, key: keyof CmsContent["program"]["episodes"][number], value: string): CmsContent {
  return { ...content, program: { ...content.program, episodes: content.program.episodes.map((item, i) => i === index ? { ...item, [key]: value } : item) } };
}
function updateEvent(content: CmsContent, index: number, key: keyof CmsContent["events"]["items"][number], value: string): CmsContent {
  return { ...content, events: { ...content.events, items: content.events.items.map((item, i) => i === index ? { ...item, [key]: value } : item) } };
}
function updateGallery(content: CmsContent, index: number, key: keyof CmsContent["gallery"]["items"][number], value: string): CmsContent {
  return { ...content, gallery: { ...content.gallery, items: content.gallery.items.map((item, i) => i === index ? { ...item, [key]: value } : item) } };
}
function updatePlan<K extends keyof CmsContent["mentoria"]["plans"][number]>(content: CmsContent, index: number, key: K, value: CmsContent["mentoria"]["plans"][number][K]): CmsContent {
  return { ...content, mentoria: { ...content.mentoria, plans: content.mentoria.plans.map((item, i) => i === index ? { ...item, [key]: value } : item) } };
}
