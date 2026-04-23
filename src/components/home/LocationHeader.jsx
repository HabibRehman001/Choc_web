import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { fetchImagesByTag, getCycledImageUrl } from "../../utils/imageApi";

const CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Hyderabad",
  "Faisalabad",
  "Multan",
  "Quetta",
  "Peshawar",
  "Sialkot",
];

const COUNTRIES = [
  { code: "PKR", name: "Pakistan", flag: "🇵🇰" },
  { code: "USD", name: "United States", flag: "🇺🇸" },
  { code: "GBP", name: "United Kingdom", flag: "🇬🇧" },
  { code: "EUR", name: "Germany", flag: "🇩🇪" },
  { code: "CAD", name: "Canada", flag: "🇨🇦" },
  { code: "AED", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "AUD", name: "Australia", flag: "🇦🇺" },
  { code: "JPY", name: "Japan", flag: "🇯🇵" },
  { code: "INR", name: "India", flag: "🇮🇳" },
  { code: "SAR", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "TRY", name: "Turkey", flag: "🇹🇷" },
];

const NAV_ITEMS = [
  { label: "MAKE YOUR OWN HAMPER" },
  {
    label: "CHOCOLATES",
    dropdown: {
      title: "Chocolates",
      subcategories: ["Chocolate bars", "Chocolate barks", "Chocolate gift boxes", "Diabetic Friendly", "Dark", "Milk", "White", "Nutty"],
      images: [
        { label: "Chocolate bars", tone: "linear-gradient(145deg, #2c1810 0%, #4a312b 100%)" },
        { label: "Chocolate barks", tone: "linear-gradient(145deg, #3e2723 0%, #5a3a33 100%)" },
      ],
    },
  },
  {
    label: "GIFTING",
    dropdown: {
      title: "Gifting",
      subcategories: ["Gift boxes", "Hampers", "Custom gifting", "Corporate gifts", "Gift wrapping", "Seasonal specials"],
      images: [
        { label: "Gift boxes", tone: "linear-gradient(145deg, #35211b 0%, #6b473e 100%)" },
        { label: "Hampers", tone: "linear-gradient(145deg, #2b170f 0%, #5f3e35 100%)" },
      ],
    },
  },
  {
    label: "OCCASIONS",
    dropdown: {
      title: "Occasions",
      subcategories: ["Wedding", "New baby", "New home", "Birthday", "Just love", "Thank you", "Business gifts", "Congrats"],
      images: [
        { label: "Business gifts", tone: "linear-gradient(145deg, #2c1810 0%, #5a3a33 100%)" },
        { label: "Thank you", tone: "linear-gradient(145deg, #3e2723 0%, #6b473e 100%)" },
      ],
    },
  },
  {
    label: "CAKES",
    dropdown: {
      title: "Cakes",
      subcategories: ["Celebration cakes", "Mousse cakes", "Mini cakes", "Custom cakes", "Cheesecakes", "Tart cakes"],
      images: [
        { label: "Celebration cakes", tone: "linear-gradient(145deg, #2b160f 0%, #4a312b 100%)" },
        { label: "Mousse cakes", tone: "linear-gradient(145deg, #35211b 0%, #6e4a40 100%)" },
      ],
    },
  },
  {
    label: "MUNCHABLES",
    dropdown: {
      title: "Munchables",
      subcategories: ["Truffles", "Bonbons", "Chocolate clusters", "Pralines", "Fudge", "Brittle"],
      images: [
        { label: "Truffles", tone: "linear-gradient(145deg, #2c1810 0%, #573831 100%)" },
        { label: "Bonbons", tone: "linear-gradient(145deg, #3e2723 0%, #5f3e35 100%)" },
      ],
    },
  },
  {
    label: "ACCESSORIES",
    dropdown: {
      title: "Accessories",
      subcategories: ["Packaging", "Ribbons & bows", "Gift cards", "Boxes", "Bags", "Tissue paper"],
      images: [
        { label: "Packaging", tone: "linear-gradient(145deg, #2b170f 0%, #4f342d 100%)" },
        { label: "Gift cards", tone: "linear-gradient(145deg, #35211b 0%, #6b473e 100%)" },
      ],
    },
  },
];

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronDown = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export default function LocationHeader() {
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [pendingCity, setPendingCity] = useState("Hyderabad");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [navImages, setNavImages] = useState([]);
  const megaBarRef = useRef(null);
  const [megaPanelTop, setMegaPanelTop] = useState(0);

  const updateMegaPanelTop = useCallback(() => {
    const megaBar = megaBarRef.current;
    if (megaBar) {
      setMegaPanelTop(megaBar.getBoundingClientRect().bottom);
    }
  }, []);

  useLayoutEffect(() => {
    updateMegaPanelTop();
    window.addEventListener("resize", updateMegaPanelTop);
    window.addEventListener("scroll", updateMegaPanelTop, true);

    return () => {
      window.removeEventListener("resize", updateMegaPanelTop);
      window.removeEventListener("scroll", updateMegaPanelTop, true);
    };
  }, [updateMegaPanelTop, activeMenu]);

  useEffect(() => {
    const lock = mobileMenuOpen || modalOpen;
    if (!lock) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen, modalOpen]);

  useEffect(() => {
    const loadNavImages = async () => {
      try {
        const images = await fetchImagesByTag("nav", 12);
        setNavImages(images);
      } catch (error) {
        console.error("Failed to load nav images", error);
      }
    };

    loadNavImages();
  }, []);

  const openModal = () => {
    setPendingCity(selectedCity);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = () => {
    setSelectedCity(pendingCity);
    setModalOpen(false);
  };

  const handleCountryChange = (code) => {
    const country = COUNTRIES.find((item) => item.code === code);
    if (country) setSelectedCountry(country);
  };

  return (
    <div className="w-full min-w-0 text-[#f5e6ca]">
      <div className="sticky top-0 z-[220]">
        <header className="w-full bg-[#1f120d] border-b border-[#d4af374d] relative z-[200]">
          <div className="w-full px-3 sm:px-4 md:px-10 py-2.5 md:py-4 grid grid-cols-[auto_1fr_auto] items-center">
            <div className="flex items-center gap-2 relative">
              <button
                className="md:hidden text-[#f5e6ca] hover:text-[#d4af37] transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>

              <div className="hidden md:block relative">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="appearance-none bg-[#2c1810] border border-[#d4af3766] rounded-md pl-8 pr-7 py-1 text-sm font-semibold text-[#f5e6ca] cursor-pointer outline-none focus:border-[#d4af37]"
                  aria-label="Select country"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} - {country.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm">{selectedCountry.flag}</span>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#d4af37]">
                  <ChevronDown />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center h-full max-h-full overflow-hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
              <div className="rounded-full border border-[#d4af3773] bg-[#2c1810] px-4 py-1.5 md:px-5 md:py-2 shadow-[0_10px_24px_rgba(12,6,4,0.35)]">
                <p className="m-0 text-[0.68rem] md:text-[0.82rem] tracking-[0.26em] uppercase text-[#d4af37]">Olmec</p>
                <p className="m-0 text-[0.55rem] md:text-[0.65rem] tracking-[0.12em] uppercase text-[#f5e6ca]">Chocolate Atelier</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-4 justify-self-end">
              <button
                onClick={openModal}
                className="flex items-center gap-1.5 bg-[#2c1810] border border-[#d4af3766] rounded-xl px-2 md:px-3.5 py-1 md:py-2 cursor-pointer hover:bg-[#3e2723] hover:border-[#d4af37] transition-all text-left max-w-[138px] sm:max-w-none"
              >
                <span className="text-[#d4af37]">
                  <PinIcon />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="text-[0.6rem] text-[#f5e6ca99] uppercase tracking-widest hidden md:block">Change Location</span>
                  <span className="text-[0.72rem] md:text-sm font-bold text-[#f5e6ca] truncate">{selectedCity}</span>
                </span>
              </button>

              <div className="flex items-center gap-0.5 md:gap-1">
                <button className="relative p-1.5 text-[#f5e6ca] hover:text-[#d4af37] transition-colors hidden md:flex">
                  <SearchIcon />
                </button>
                <button className="relative p-1.5 text-[#f5e6ca] hover:text-[#d4af37] transition-colors hidden md:flex">
                  <HeartIcon />
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#d4af37] text-[#1a0f0b] text-[0.5rem] font-bold flex items-center justify-center">0</span>
                </button>
                <button className="relative p-1.5 text-[#f5e6ca] hover:text-[#d4af37] transition-colors hidden md:flex">
                  <UserIcon />
                </button>
                <button className="relative p-1.5 text-[#f5e6ca] hover:text-[#d4af37] transition-colors">
                  <CartIcon />
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#d4af37] text-[#1a0f0b] text-[0.5rem] font-bold flex items-center justify-center">0</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <nav
          ref={megaBarRef}
          className="hidden md:block w-full relative z-[190] bg-[#2c1810] border-b border-[#d4af3740] shadow-sm"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <ul className="w-full flex items-center justify-center list-none px-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative" onMouseEnter={() => setActiveMenu(item.dropdown ? item.label : null)}>
                <span
                  className={`flex items-center gap-1 px-4 py-4 text-[0.7rem] font-bold tracking-[0.08em] cursor-pointer whitespace-nowrap border-b-2 transition-all duration-200 ${
                    activeMenu === item.label
                      ? "text-[#d4af37] border-[#d4af37]"
                      : "text-[#f5e6ca] border-transparent hover:text-[#d4af37] hover:border-[#d4af37]"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <span className={`text-[#d4af37] transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}>
                      <ChevronDown />
                    </span>
                  )}
                </span>

                {item.dropdown && activeMenu === item.label && (
                  <div
                    className="fixed left-0 right-0 z-[180] bg-[#1f120d] border-t-2 border-[#d4af37] shadow-2xl animate-[panelDrop_0.18s_ease] max-h-[min(70vh,calc(100vh-6rem))] overflow-y-auto overscroll-contain"
                    style={{ top: megaPanelTop }}
                  >
                    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 md:py-9 flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
                      <div className="min-w-[200px]">
                        <p className="text-lg font-black text-[#f5e6ca] mb-5 tracking-tight">{item.dropdown.title}</p>
                        <ul className="flex flex-col gap-2.5">
                          {item.dropdown.subcategories.map((sub) => (
                            <li key={sub}>
                              <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="text-sm text-[#f5e6cabf] hover:text-[#d4af37] hover:pl-1.5 transition-all duration-150 inline-block no-underline"
                              >
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-5 flex-1 justify-end">
                        {item.dropdown.images.map((img, imageIndex) => {
                          const imageUrl = getCycledImageUrl(navImages, imageIndex);

                          return (
                            <div key={img.label} className="relative w-64 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0 border border-[#d4af3740]">
                              {imageUrl ? (
                                <img src={imageUrl} alt={img.label} className="w-full h-72 object-cover" loading="lazy" />
                              ) : (
                                <div className="w-full h-72" style={{ background: img.tone }} aria-hidden="true" />
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 flex flex-col gap-2">
                                <span className="text-[#f5e6ca] text-sm font-bold">{img.label}</span>
                                <button className="self-start text-[#f5e6ca] text-xs font-semibold border border-[#d4af3766] rounded-full px-3.5 py-1 bg-[#2c1810bf] hover:bg-[#3e2723] transition">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-[#1f120d] border-t border-[#d4af3740] flex items-center justify-around px-2 py-2 shadow-[0_-2px_12px_rgba(0,0,0,0.28)]">
        <button className="flex flex-col items-center gap-0.5 text-[#f5e6ca] relative">
          <CartIcon />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#d4af37] text-[#1a0f0b] text-[0.5rem] font-bold flex items-center justify-center">0</span>
          <span className="text-[0.6rem]">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-[#f5e6ca]">
          <SearchIcon />
          <span className="text-[0.6rem]">Search</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-[#f5e6ca] relative">
          <HeartIcon />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#d4af37] text-[#1a0f0b] text-[0.5rem] font-bold flex items-center justify-center">0</span>
          <span className="text-[0.6rem]">Wishlist</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-[#f5e6ca]">
          <UserIcon />
          <span className="text-[0.6rem]">Account</span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[300]">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileSubmenu(null);
            }}
          />

          <div className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-[#1f120d] flex flex-col shadow-2xl animate-[slideInLeft_0.25s_ease]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#d4af373d]">
              <span className="text-base font-bold text-[#f5e6ca]">Menu</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileSubmenu(null);
                }}
                className="text-[#f5e6ca] hover:text-[#d4af37] transition-colors"
              >
                <XIcon />
              </button>
            </div>

            {mobileSubmenu === null && (
              <ul className="flex flex-col flex-1 overflow-y-auto divide-y divide-[#f5e6ca1f]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.dropdown) setMobileSubmenu(item.label);
                        else setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold tracking-wider text-[#f5e6ca] hover:bg-[#2c1810] transition-colors text-left"
                    >
                      {item.label}
                      {item.dropdown && (
                        <span className="text-[#d4af37]">
                          <ChevronRight />
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {mobileSubmenu !== null && (() => {
              const item = NAV_ITEMS.find((n) => n.label === mobileSubmenu);
              if (!item?.dropdown) {
                return (
                  <div className="flex flex-col flex-1 p-5 text-sm text-[#f5e6ca]">
                    Nothing here.
                    <button type="button" className="mt-2 text-[#d4af37] font-semibold underline" onClick={() => setMobileSubmenu(null)}>
                      Go back
                    </button>
                  </div>
                );
              }

              return (
                <div className="flex flex-col flex-1 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setMobileSubmenu(null)}
                    className="flex items-center gap-2 px-5 py-3 text-sm text-[#f5e6ca] hover:text-[#d4af37] border-b border-[#f5e6ca1f] transition-colors"
                  >
                    <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Back
                  </button>

                  <p className="px-5 py-4 text-base font-black text-[#f5e6ca]">{item.dropdown.title}</p>
                  <ul className="flex flex-col divide-y divide-[#f5e6ca1f]">
                    {item.dropdown.subcategories.map((sub) => (
                      <li key={sub}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="block px-5 py-3.5 text-sm text-[#f5e6cabf] hover:text-[#d4af37] hover:bg-[#2c1810] transition-colors no-underline"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3 p-4">
                    {item.dropdown.images.map((img, imageIndex) => {
                      const imageUrl = getCycledImageUrl(navImages, imageIndex);

                      return (
                        <div key={img.label} className="relative flex-1 rounded-lg overflow-hidden border border-[#d4af3740]">
                          {imageUrl ? (
                            <img src={imageUrl} alt={img.label} className="w-full h-28 object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-28" style={{ background: img.tone }} aria-hidden="true" />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-[#f5e6ca] text-xs font-bold">{img.label}</p>
                            <button className="mt-1 text-[#f5e6ca] text-[0.6rem] border border-[#d4af3766] rounded-full px-2 py-0.5 bg-[#2c1810bf]">
                              Shop Now
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="border-t border-[#d4af373d] px-5 py-4">
              <div className="relative">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full appearance-none border border-[#d4af3766] rounded-md pl-8 pr-8 py-2 text-sm font-semibold text-[#f5e6ca] bg-[#2c1810] cursor-pointer outline-none focus:border-[#d4af37]"
                  aria-label="Select country"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} - {country.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm">{selectedCountry.flag}</span>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#d4af37]">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center backdrop-blur-md bg-[#1f120dbd] animate-[fadeIn_0.2s_ease]"
          onClick={closeModal}
        >
          <div
            className="bg-[#2c1810f2] border border-[#d4af3766] rounded-2xl p-8 md:p-10 w-full max-w-md mx-4 flex flex-col gap-5 shadow-2xl animate-[slideUp_0.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#f5e6ca] text-center">Select your delivery location</h2>
            <select
              className="w-full px-4 py-3.5 border border-[#d4af3766] rounded-xl text-[#f5e6ca] bg-[#3e2723] text-sm cursor-pointer outline-none focus:border-[#d4af37] appearance-none"
              value={pendingCity}
              onChange={(e) => setPendingCity(e.target.value)}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23d4af37' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              className="w-full py-3.5 bg-[#d4af37] hover:bg-[#b8922b] text-[#1a0f0b] font-bold text-sm tracking-widest rounded-xl transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
