import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedId?: string | null;
  youtubeId?: string | null;
}

export function VideoModal({ isOpen, onClose, embedId, youtubeId }: VideoModalProps) {
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

  if (!isOpen || (!embedId && !youtubeId)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-card/50 text-muted-foreground hover:text-white hover:bg-card transition-colors z-50 ring-1 ring-white/10"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="relative w-full max-w-4xl aspect-video md:max-h-[85vh] bg-card rounded-2xl overflow-hidden shadow-2xl ring-1 ring-crimson/30">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0`}
            className="absolute inset-0 w-full h-full bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : embedId ? (
          <div className="absolute inset-0 flex justify-center">
            <iframe
              src={`https://www.instagram.com/p/${embedId}/embed`}
              className="w-full max-w-md h-full bg-white"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
            ></iframe>
          </div>
        ) : null}
      </div>
    </div>
  );
}
