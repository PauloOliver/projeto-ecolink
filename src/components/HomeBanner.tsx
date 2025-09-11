import { ArrowRight } from "lucide-react";

type HomeBannerProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  onCta?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  /** Deixe true se a navbar for fixed. Ajustei para ~72px (h-16 do Flowbite ~64px + folga) */
  offsetNavbar?: boolean;
};

export default function HomeBanner({
  title = "Connecting for a Sustainable Future",
  description = "Join our protecting environmental collaboration: reducing a positive impact on the planet.",
  ctaText = "Learn More",
  onCta,
  imageSrc = "https://sdmntprcentralus.oaiusercontent.com/files/00000000-6900-61f5-9f05-599bc43c0a4a/raw?se=2025-09-12T00%3A35%3A44Z&sp=r&sv=2024-08-04&sr=b&scid=3a7a0b0b-8f1c-587f-b09f-713e61f91f3e&skoid=e9d2f8b1-028a-4cff-8eb1-d0e66fbefcca&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-11T22%3A05%3A39Z&ske=2025-09-12T22%3A05%3A39Z&sks=b&skv=2024-08-04&sig=%2B39SSlKSDImb0pPEe7LqkIkrxDPkeeOtZtT44HeAuHw%3D",
  imageAlt = "Hands holding a small plant",
  offsetNavbar = true,
}: HomeBannerProps) {
  return (
    <section className={`w-full bg-[#f6efe3] ${offsetNavbar ? "pt-[72px]" : ""}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="
            grid lg:grid-cols-2
            rounded-3xl overflow-hidden
            border border-emerald-100
            bg-[#fcf7ee]
            shadow-[0_10px_30px_rgba(0,0,0,.06)]
          "
        >
          {/* Imagem (fica com a mesma altura do texto no desktop) */}
          <div className="relative h-56 sm:h-72 lg:h-[460px]">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-emerald-900">
              {title}
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-emerald-900/80">
              {description}
            </p>

            <div className="mt-6">
              <button
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-xl bg-[#cfe1c7] px-6 py-2.5 text-emerald-900 font-medium hover:bg-[#bdd6b3] focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
