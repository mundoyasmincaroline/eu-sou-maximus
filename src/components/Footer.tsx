import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[oklch(0.78_0.13_82/0.15)] bg-[oklch(0.09_0.012_30)]">
      <div className="divider-crimson" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2 space-y-5">
          <Logo />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Apresentador, influenciador e criador do programa <span className="text-crimson">Me Chama Que Eu Vou</span>.
            Parcerias, eventos, mentorias e participações em todo o Brasil.
          </p>
          <div className="flex gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.78_0.13_82/0.3)] text-crimson hover:bg-[oklch(0.78_0.13_82/0.1)]"><MessageCircle className="h-4 w-4" /></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.78_0.13_82/0.3)] text-crimson hover:bg-[oklch(0.78_0.13_82/0.1)]"><Instagram className="h-4 w-4" /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.78_0.13_82/0.3)] text-crimson hover:bg-[oklch(0.78_0.13_82/0.1)]"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.28em] text-crimson">Navegar</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/programa" className="hover:text-crimson">O Programa</Link></li>
            <li><Link to="/eventos" className="hover:text-crimson">Eventos</Link></li>
            <li><Link to="/mentoria" className="hover:text-crimson">Mentoria</Link></li>
            <li><Link to="/galeria" className="hover:text-crimson">Galeria</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.28em] text-crimson">Trabalhe Conosco</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/contato" className="hover:text-crimson">Parcerias de marca</Link></li>
            <li><Link to="/contato" className="hover:text-crimson">Quadro do programa</Link></li>
            <li><Link to="/contato" className="hover:text-crimson">Presença em eventos</Link></li>
            <li><Link to="/contato" className="hover:text-crimson">Mentorias & networking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[oklch(0.78_0.13_82/0.1)] px-5 py-6 text-center text-xs text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} MAXIMUS · Max. Todos os direitos reservados.
      </div>
    </footer>
  );
}
