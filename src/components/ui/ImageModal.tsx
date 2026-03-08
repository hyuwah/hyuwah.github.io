import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageModal({
  src,
  alt,
  className = "",
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <div
        className={`relative overflow-hidden cursor-zoom-in ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
          <svg
            className="w-8 h-8 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Image caption */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white/80 text-sm">{alt}</p>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Escape key handler */}
      {isOpen && (
        <TeleportOrPortal>
          <EscapeKeyHandler onEscape={() => setIsOpen(false)} />
        </TeleportOrPortal>
      )}
    </>
  );
}

function EscapeKeyHandler({ onEscape }: { onEscape: () => void }) {
  if (typeof window === "undefined") return null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [onEscape]);

  return null;
}

function TeleportOrPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
