import { createFileRoute } from "@tanstack/react-router";
import heroStage from "@/assets/hero-stage.jpg";
import eventCountry from "@/assets/event-country.jpg";
import mentoria from "@/assets/mentoria.jpg";
import programBg from "@/assets/program-bg.jpg";
import textureGold from "@/assets/texture-gold.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { INSTAGRAM_URL } from "@/lib/site";
import { Instagram } from "lucide-react";

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

const POSTS = [
  { img: heroStage, embedId: "DZ02LcLJKlR", link: "https://www.instagram.com/p/DZ02LcLJKlR/" }, // Episodio 1
  { img: mentoria, embedId: "DZ2G18aJQ2q", link: "https://www.instagram.com/eusoumaximus/reel/DZ2G18aJQ2q/" }, // Moda
  { img: eventCountry, embedId: null, link: INSTAGRAM_URL },
  { img: programBg, embedId: null, link: INSTAGRAM_URL },
  { img: textureGold, embedId: null, link: INSTAGRAM_URL },
  { img: heroStage, embedId: null, link: INSTAGRAM_URL },
  { img: eventCountry, embedId: null, link: INSTAGRAM_URL },
  { img: mentoria, embedId: null, link: INSTAGRAM_URL },
];

function Galeria() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeader eyebrow="Galeria" title={<>Palco, câmera e <span className="italic text-gradient-gold">presença.</span></>} description="Uma curadoria de momentos do programa, eventos e ensaios. Clique nas imagens para conferir no Instagram." />
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold hover:bg-gold/10">
          <Instagram className="h-4 w-4 text-gold" /> @eusoumaximus
        </a>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {POSTS.map((post, i) => {
            const className = `block relative overflow-hidden rounded-2xl ring-1 ring-gold/15 bg-card/60 ${i % 5 === 0 ? "row-span-2 aspect-[3/5]" : "aspect-[4/5]"}`;
            
            if (post.embedId) {
              return (
                <div key={i} className={className}>
                  <iframe
                    src={`https://www.instagram.com/p/${post.embedId}/embed`}
                    className="absolute inset-0 w-full h-full bg-white"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                  ></iframe>
                </div>
              );
            }

            return (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className={`${className} group`}
              >
                <img src={post.img} alt={`Post do Instagram ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-4">
                  <span className="text-xs text-white uppercase tracking-wider font-semibold inline-flex items-center gap-2"><Instagram className="w-4 h-4" /> Ver no Instagram</span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}