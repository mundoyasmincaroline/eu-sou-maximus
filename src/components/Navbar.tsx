import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { WHATSAPP_URL } from "@/lib/site";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/programa", label: "Me Chama Que Eu Vou" },
  { to: "/eventos", label: "Eventos" },
  { to: "/mentoria", label: "Mentoria" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[oklch(0.78_0.13_82/0.12)] bg-[oklch(0.1_0.012_30/0.7)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 py-3 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-gold data-[status=active]:text-gold"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full gradient-gold px-5 py-2.5 text-sm font-semibold text-[oklch(0.12_0.012_30)] shadow-glow-gold transition-transform hover:scale-[1.03] lg:inline-flex"
        >
          <MessageCircle className="h-4 w-4" />
          Fale com a equipe
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-[oklch(0.78_0.13_82/0.3)] p-2 text-gold lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[oklch(0.78_0.13_82/0.15)] bg-[oklch(0.1_0.012_30/0.95)] px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.012_30)]"
            >
              <MessageCircle className="h-4 w-4" />
              Fale com a equipe
            </a>
          </div>
        </div>
      )}
    </header>
  );
}