import { useState } from "react";
import { ArrowRight, Star, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoModal } from "@/components/VideoModal";
import { WHATSAPP_URL } from "@/lib/site";
import { type CmsContent } from "@/lib/cmsContent";

export function AgencyTeaser({ content }: { content: CmsContent["home"] }) {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
      <div className="flex flex-col justify-center lg:order-2">
        <SectionHeader
          eyebrow="Maximus Agência Digital"
          title={<>{content.agencyTitle.split(" ").slice(0, 3).join(" ")} <br /><span className="italic text-gradient-crimson">{content.agencyTitle.split(" ").slice(3).join(" ") || content.agencyTitle}</span></>}
          description={content.agencyDescription}
        />
        <ul className="mt-8 space-y-3 text-sm text-foreground/85">
          {content.agencyBullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Star className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full gradient-crimson px-7 py-3.5 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-crimson">
            Agendar Reunião <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      
      <div 
        className="mt-10 lg:mt-0 relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl ring-1 ring-crimson/30 shadow-luxe cursor-pointer group lg:order-1"
        onClick={() => setActiveEmbed(content.agencyInstagramId)}
      >
        <img src={content.agencyImage} alt="Agência Digital" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full gradient-crimson text-[oklch(0.12_0.012_30)] shadow-glow-crimson transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 fill-current ml-1" />
          </span>
        </div>
      </div>

      <VideoModal
        isOpen={!!activeEmbed}
        onClose={() => setActiveEmbed(null)}
        embedId={activeEmbed}
      />
    </section>
  );
}
