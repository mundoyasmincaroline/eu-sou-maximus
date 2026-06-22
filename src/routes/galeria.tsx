import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { INSTAGRAM_URL } from "@/lib/site";
import { Instagram, Play } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import { useCmsContent } from "@/lib/cmsContent";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria MAXIMUS — Fotos, palco e bastidores" },
      { name: "description", content: "Galeria oficial com fotos de Karlos Edward (MAXIMUS): palco, eventos, bastidores do Me Chama Que Eu Vou e moda." },
      { property: "og:title", content: "Galeria MAXIMUS" },
      { property: "og:description", content: "Fotos, palco e bastidores." },
    ],
  }),
  component: Galeria,
});

function Galeria() {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);
  const cms = useCmsContent();

  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeader eyebrow="Galeria" title={<>{cms.gallery.title.split(" e ")[0]} e <span className="italic text-gradient-gold">{cms.gallery.title.split(" e ").slice(1).join(" e ") || "presença."}</span></>} description={cms.gallery.description} />
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold hover:bg-gold/10">
          <Instagram className="h-4 w-4 text-gold" /> @eusoumaximus
        </a>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {cms.gallery.items.map((post, i) => {
            const className = `block group relative overflow-hidden cursor-pointer rounded-2xl ring-1 ring-gold/15 bg-card/60 ${i % 5 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-[4/5]"}`;
            
            return (
              <div
                key={post.id}
                className={className}
                onClick={() => post.embedId ? setActiveEmbed(post.embedId) : window.open(post.link, "_blank")}
              >
                <img src={post.image} alt={post.alt || `Post do Instagram ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                  {post.embedId ? (
                    <span className="text-xs text-white uppercase tracking-wider font-semibold inline-flex items-center gap-2">
                      <Play className="w-4 h-4 fill-white" /> Assistir Vídeo
                    </span>
                  ) : (
                    <span className="text-xs text-white uppercase tracking-wider font-semibold inline-flex items-center gap-2">
                      <Instagram className="w-4 h-4" /> Ver no Instagram
                    </span>
                  )}
                </div>
                {post.embedId && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="grid h-12 w-12 place-items-center rounded-full gradient-gold text-[oklch(0.12_0.012_30)] shadow-glow-gold">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      
      <VideoModal
        isOpen={!!activeEmbed}
        onClose={() => setActiveEmbed(null)}
        embedId={activeEmbed}
      />
    </div>
  );
}