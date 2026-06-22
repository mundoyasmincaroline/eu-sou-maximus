import heroStage from "@/assets/hero-stage.jpg";
import eventCountry from "@/assets/event-country.jpg";
import mentoria from "@/assets/mentoria.jpg";
import programBg from "@/assets/program-bg.jpg";
import textureGold from "@/assets/texture-gold.jpg";
import { INSTAGRAM_URL } from "@/lib/site";
import { useEffect, useState } from "react";

export const CMS_STORAGE_KEY = "maximus-cms-content-v1";

export type CmsStat = { value: string; label: string };
export type CmsEpisode = { id: string; number: string; title: string; guest: string; duration: string; image: string; embedId: string; link: string };
export type CmsEvent = { id: string; name: string; date: string; time: string; image: string; tag: string; description: string };
export type CmsGalleryItem = { id: string; image: string; alt: string; embedId: string; link: string };
export type CmsPlan = { id: string; title: string; level: string; price: string; description: string; items: string[]; featured?: boolean };
export type CmsTestimonial = { quote: string; author: string };

export type CmsContent = {
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBackgroundImage: string;
    heroPortraitImage: string;
    stats: CmsStat[];
    programTitle: string;
    programDescription: string;
    eventsTitle: string;
    eventsDescription: string;
    mentoriaTitle: string;
    mentoriaDescription: string;
    mentoriaBullets: string[];
    ctaTitle: string;
    ctaDescription: string;
  };
  program: {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    episodes: CmsEpisode[];
  };
  events: {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    items: CmsEvent[];
  };
  gallery: {
    title: string;
    description: string;
    items: CmsGalleryItem[];
  };
  mentoria: {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    featureTitle: string;
    featureDescription: string;
    featureImage: string;
    featureEmbedId: string;
    plans: CmsPlan[];
    audienceDescription: string;
  };
  testimonials: CmsTestimonial[];
  contact: {
    title: string;
    description: string;
  };
  updatedAt?: string;
};

export const defaultCmsContent: CmsContent = {
  home: {
    heroEyebrow: "Apresentador · Influenciador · Host",
    heroTitle: "MAXIMUS",
    heroSubtitle: "por Karlos Edward",
    heroDescription: '"Agora que somos íntimos, me chama de Max."\nApresentador do Me Chama Que Eu Vou, criador do Maximus Experience Country e mentor de quem quer transformar presença em palco — e palco em resultado.',
    heroBackgroundImage: heroStage,
    heroPortraitImage: programBg,
    stats: [
      { value: "27.7K+", label: "Seguidores" },
      { value: "613+", label: "Publicações" },
      { value: "100%", label: "Brasil" },
    ],
    programTitle: "Me Chama Que Eu Vou.",
    programDescription: "O programa que virou marca registrada de Maximus. Bastidores, convidados, brincadeiras e conversas que mostram quem realmente move o Brasil — apresentado com a energia única que só o Max entrega.",
    eventsTitle: "Maximus Experience Country",
    eventsDescription: "Festival com música ao vivo, brincadeiras, networking e a alma country que virou a assinatura do Max. Uma noite para quem quer ser visto pelas pessoas certas.",
    mentoriaTitle: "Você não é POBRE, você só tem MAU posicionamento.",
    mentoriaDescription: "Sessões fechadas para apresentadores, criadores e empreendedores que querem ocupar palco, dominar câmera e construir uma marca pessoal que vende sem precisar pedir.",
    mentoriaBullets: ["Posicionamento de marca pessoal", "Presença de palco e câmera", "Conteúdo que converte parceria", "Networking estratégico de alto nível"],
    ctaTitle: "Pronto pra chamar o Max?",
    ctaDescription: "Conte rapidinho o que você precisa — parceria, evento, quadro no programa ou mentoria — e a equipe te leva direto ao WhatsApp do Maximus.",
  },
  program: {
    heroTitle: "Me Chama Que Eu Vou.",
    heroDescription: "Programa autoral de Karlos Edward — o MAXIMUS. Episódios com convidados, bastidores, brincadeiras e conversas com quem está movimentando cultura, marca e palco no Brasil.",
    heroImage: programBg,
    episodes: [
      { id: "ep-1", number: "01", title: "Episódio 1 - Circo do Dedé Santana", guest: "Pará de Minas", duration: "Instagram", image: programBg, embedId: "DZ02LcLJKlR", link: "https://www.instagram.com/p/DZ02LcLJKlR/" },
      { id: "ep-2", number: "02", title: "Bastidores do palco country", guest: "Influência & moda", duration: "28 min", image: heroStage, embedId: "", link: INSTAGRAM_URL },
      { id: "ep-3", number: "03", title: "Marcas que viraram cultura", guest: "Empreendedor do ano", duration: "41 min", image: programBg, embedId: "", link: INSTAGRAM_URL },
      { id: "ep-4", number: "04", title: "A noite mais comentada do ano", guest: "Artista revelação", duration: "26 min", image: heroStage, embedId: "", link: INSTAGRAM_URL },
      { id: "ep-5", number: "05", title: "Convidado surpresa & brincadeiras", guest: "Personalidade local", duration: "37 min", image: programBg, embedId: "", link: INSTAGRAM_URL },
      { id: "ep-6", number: "06", title: "Networking sem firula", guest: "Mentor de negócios", duration: "33 min", image: heroStage, embedId: "", link: INSTAGRAM_URL },
    ],
  },
  events: {
    heroTitle: "Eventos MAXIMUS.",
    heroDescription: "Experiências autorais e produções assinadas pelo Max. Onde o público vira convidado e a marca vira parte da história.",
    heroImage: eventCountry,
    items: [
      { id: "event-1", name: "Maximus Experience Country", date: "Sábado · 25 Julho", time: "Início 18h · The Chris", image: eventCountry, tag: "Festival", description: "Festival de caldo, música ao vivo, brincadeiras e networking. O maior evento autoral do Max." },
      { id: "event-2", name: "Me Chama Que Eu Vou — Edição ao vivo", date: "Em breve", time: "Gravação aberta", image: programBg, tag: "Programa", description: "Edição especial gravada com público presente e convidados surpresa." },
      { id: "event-3", name: "Maximus Night", date: "Em breve", time: "Convite restrito", image: heroStage, tag: "Premium", description: "Noite fechada de networking com marcas, criadores e parceiros." },
    ],
  },
  gallery: {
    title: "Palco, câmera e presença.",
    description: "Uma curadoria de momentos do programa, eventos e ensaios. Clique nas imagens para conferir no Instagram.",
    items: [
      { id: "gallery-1", image: heroStage, alt: "Post do Instagram 1", embedId: "DZ02LcLJKlR", link: "https://www.instagram.com/p/DZ02LcLJKlR/" },
      { id: "gallery-2", image: mentoria, alt: "Post do Instagram 2", embedId: "DZ2G18aJQ2q", link: "https://www.instagram.com/eusoumaximus/reel/DZ2G18aJQ2q/" },
      { id: "gallery-3", image: eventCountry, alt: "Evento Maximus", embedId: "", link: INSTAGRAM_URL },
      { id: "gallery-4", image: programBg, alt: "Programa Maximus", embedId: "", link: INSTAGRAM_URL },
      { id: "gallery-5", image: textureGold, alt: "Branding Maximus", embedId: "", link: INSTAGRAM_URL },
      { id: "gallery-6", image: heroStage, alt: "Palco Maximus", embedId: "", link: INSTAGRAM_URL },
      { id: "gallery-7", image: eventCountry, alt: "Experience Country", embedId: "", link: INSTAGRAM_URL },
      { id: "gallery-8", image: mentoria, alt: "Mentoria Maximus", embedId: "", link: INSTAGRAM_URL },
    ],
  },
  mentoria: {
    heroTitle: "Posicionamento de palco.",
    heroDescription: '"Você não é POBRE, você só tem MAU posicionamento." Mentoria sem firula, com método e direção, para quem quer transformar presença em palco e palco em resultado.',
    heroImage: mentoria,
    featureTitle: "Você não é pobre, você só tem mau gosto!",
    featureDescription: "O quadro que conquistou a internet e virou pilar da mentoria. Karlos Edward analisa moda, estilo e posicionamento de forma direta, ácida e transformadora. Descubra como a sua imagem fala antes de você abrir a boca.",
    featureImage: mentoria,
    featureEmbedId: "DZ2G18aJQ2q",
    plans: [
      { id: "plan-1", title: "Pílula", level: "1 sessão estratégica", price: "Sob consulta", description: "Diagnóstico rápido de posicionamento e plano de ação imediato.", items: ["Diagnóstico de marca pessoal", "Plano de 30 dias", "1h ao vivo com Max"] },
      { id: "plan-2", title: "Imersão", level: "4 semanas", price: "Vagas limitadas", description: "Mergulho profundo em palco, câmera, narrativa e parcerias.", items: ["4 sessões 1:1", "Roteiro de palco e câmera", "Pitch de parceria pronto", "Suporte WhatsApp"], featured: true },
      { id: "plan-3", title: "Trono", level: "Programa anual VIP", price: "Convite", description: "Acompanhamento contínuo + acesso a eventos fechados Maximus.", items: ["Acompanhamento mensal", "Acesso a Maximus Night", "Curadoria de parcerias", "Posicionamento de marca completo"] },
    ],
    audienceDescription: "Apresentadores, criadores de conteúdo, empreendedores e profissionais que querem ocupar palco e construir uma marca pessoal premium.",
  },
  testimonials: [
    { quote: "Maximus traz energia, profissionalismo e palco. Marca que entra com ele, sai vista.", author: "Parceiro de marca" },
    { quote: "O Maximus Experience Country virou ponto de encontro de quem decide na cidade.", author: "Convidada VIP" },
    { quote: "Mentoria que mudou minha forma de me posicionar. Direto e sem firula.", author: "Mentorada" },
  ],
  contact: {
    title: "Vamos conversar.",
    description: "Em 4 passos rápidos a sua mensagem chega direto no WhatsApp da equipe MAXIMUS.",
  },
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeContent<T>(base: T, patch: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(patch) ? patch : base) as T;
  if (!isPlainObject(base) || !isPlainObject(patch)) return (patch ?? base) as T;
  const next: Record<string, unknown> = { ...base };
  for (const key of Object.keys(base)) next[key] = mergeContent((base as Record<string, unknown>)[key], patch[key]);
  if (typeof patch.updatedAt === "string") next.updatedAt = patch.updatedAt;
  return next as T;
}

import { supabase } from "./supabase";

export async function loadCmsContent(): Promise<CmsContent> {
  if (typeof window === "undefined") return defaultCmsContent;
  try {
    const { data, error } = await supabase.from("site_settings").select("content").eq("id", 1).single();
    if (error || !data || !data.content) {
      console.warn("CMS Content not found in Supabase or error. Falling back to default.", error);
      return defaultCmsContent;
    }
    return mergeContent(defaultCmsContent, data.content);
  } catch (err) {
    console.error("Failed to load CMS from Supabase", err);
    return defaultCmsContent;
  }
}

export async function saveCmsContent(content: CmsContent) {
  if (typeof window === "undefined") return;
  const contentWithDate = { ...content, updatedAt: new Date().toISOString() };
  
  try {
    const { error } = await supabase.from("site_settings").upsert({ id: 1, content: contentWithDate });
    if (error) throw error;
    
    // Fallback local pra não quebrar outras abas na mesma sessão imediatamente
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(contentWithDate));
    window.dispatchEvent(new Event("maximus-cms-updated"));
  } catch (err) {
    console.error("Failed to save CMS to Supabase", err);
    alert("Erro ao salvar no banco de dados. Verifique a conexão.");
  }
}

export function resetCmsContent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CMS_STORAGE_KEY);
  window.dispatchEvent(new Event("maximus-cms-updated"));
}

export function useCmsContent() {
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchContent = async () => {
      setIsLoading(true);
      const data = await loadCmsContent();
      if (mounted) {
        setContent(data);
        setIsLoading(false);
      }
    };
    
    fetchContent();

    const syncLocal = () => {
      const stored = window.localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        setContent(mergeContent(defaultCmsContent, JSON.parse(stored)));
      }
    };

    window.addEventListener("maximus-cms-updated", syncLocal);
    
    // Escuta em tempo real as mudanças no Supabase
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' }, (payload) => {
        if (payload.new && payload.new.content) {
          setContent(mergeContent(defaultCmsContent, payload.new.content));
        }
      })
      .subscribe();

    return () => {
      mounted = false;
      window.removeEventListener("maximus-cms-updated", syncLocal);
      supabase.removeChannel(channel);
    };
  }, []);

  return content;
}