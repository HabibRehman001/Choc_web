import { useEffect, useMemo, useState } from "react";
import { fetchImagesByTag } from "../../utils/imageApi";

const FALLBACK_SLIDES = [
  {
    id: 1,
    title: "Crafted For Cocoa Lovers",
    subtitle: "Premium dark chocolate, refined for gifting.",
    tone: "linear-gradient(145deg, #2c1810 0%, #3e2723 52%, #5a3a33 100%)",
  },
  {
    id: 2,
    title: "Luxury Dessert Moments",
    subtitle: "Elegant sweets designed for memorable occasions.",
    tone: "linear-gradient(145deg, #26130c 0%, #4a312b 56%, #6b473e 100%)",
  },
  {
    id: 3,
    title: "Signature Chocolate Collection",
    subtitle: "Hand-finished treats with artisanal detail.",
    tone: "linear-gradient(145deg, #1f120d 0%, #3e2723 50%, #5f3e35 100%)",
  },
];

export default function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiSlides, setApiSlides] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await fetchImagesByTag("hero", 3);

        const slides = images.map((image, index) => ({
          id: image.id,
          title: image.altText || `Luxury Chocolate ${index + 1}`,
          subtitle: image.originalName || "Hand-finished dessert collection",
          imageUrl: image.url,
        }));

        setApiSlides(slides);
      } catch (error) {
        console.error("Failed to load hero images", error);
      }
    };

    fetchImages();
  }, []);

  const slides = useMemo(() => (apiSlides.length > 0 ? apiSlides : FALLBACK_SLIDES), [apiSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (currentSlide > slides.length - 1) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="relative w-full max-w-[1600px] mx-auto px-0 sm:px-4 md:px-6 lg:px-10 overflow-hidden"
      style={{ height: "min(520px, 56vw)" }}
    >
      <div className="relative h-full w-full rounded-none sm:rounded-2xl overflow-hidden border-y sm:border border-[#d4af374d] shadow-[0_20px_55px_rgba(12,6,4,0.45)]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              i === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="w-full h-full relative" style={{ background: slide.tone }}>
              {slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(212,175,55,0.28),transparent_35%)]" />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,10,7,0.82),rgba(20,10,7,0.2))]" />

              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 max-w-[700px] text-[#f5e6ca] gap-3">
                <p className="uppercase tracking-[0.2em] text-[0.65rem] sm:text-[0.72rem] text-[#d4af37]">
                  Luxury Dessert House
                </p>
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl leading-tight">{slide.title}</h1>
                <p className="text-sm sm:text-base text-[#f5e6cae0]">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#d4af3773] bg-[#2c1810b5] hover:bg-[#3e2723f0] flex items-center justify-center text-[#f5e6ca] text-2xl shadow-md z-10 transition-all"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#d4af3773] bg-[#2c1810b5] hover:bg-[#3e2723f0] flex items-center justify-center text-[#f5e6ca] text-2xl shadow-md z-10 transition-all"
        aria-label="Next"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 h-4 flex items-center gap-2 px-2 overflow-hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`appearance-none block shrink-0 rounded-full border-0 outline-none transition-all duration-250 p-0 leading-none cursor-pointer ${
              i === currentSlide ? "w-3 h-3 bg-[#d4af37] scale-110" : "w-2.5 h-2.5 bg-[#f5e6ca80]"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
