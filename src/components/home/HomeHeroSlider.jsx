import { useEffect, useState } from "react";

const P = (path) =>
  `https://images.pexels.com/photos/${path}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const SLIDES = [
  { id: 1, src: P("65882/chocolate-dark-coffee-confiserie-65882") },
  { id: 2, src: P("1377452/pexels-photo-1377452") },
  { id: 3, src: P("3776947/pexels-photo-3776947") },
];

export default function HomeHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  return (
    <div
      className="relative w-full max-w-[1600px] mx-auto px-0 sm:px-4 md:px-6 lg:px-10 overflow-hidden"
      style={{ height: "min(520px, 56vw)" }}
    >
      <div className="relative h-full w-full">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              i === currentSlide ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.src}
              alt={`Slide ${slide.id}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/75 hover:bg-white flex items-center justify-center text-[#a05a4a] text-2xl shadow-md z-10 transition-all"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/75 hover:bg-white flex items-center justify-center text-[#a05a4a] text-2xl shadow-md z-10 transition-all"
        aria-label="Next"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 h-4 flex items-center gap-2 px-2 overflow-hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`appearance-none block shrink-0 rounded-full border-0 outline-none transition-all duration-250 p-0 leading-none cursor-pointer ${
              i === currentSlide ? "w-3 h-3 bg-white scale-110" : "w-2.5 h-2.5 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
