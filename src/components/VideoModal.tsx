import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedId: string | null;
}

export function VideoModal({ isOpen, onClose, embedId }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !embedId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-card/50 text-muted-foreground hover:text-white hover:bg-card transition-colors z-50 ring-1 ring-white/10"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="relative w-full max-w-md aspect-[4/5] md:aspect-[9/16] md:max-h-[85vh] bg-card rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gold/30">
        <iframe
          src={`https://www.instagram.com/p/${embedId}/embed`}
          className="absolute inset-0 w-full h-full bg-white"
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
        ></iframe>
      </div>
    </div>
  );
}
