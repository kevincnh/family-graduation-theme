import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight, Heart, Download, GraduationCap, Star } from "lucide-react";

const CLASS_YEAR = "2025";
const SCHOOL = "Westbrook Academy";
const STUDIO = "Lumière Portrait Studio";

type Category = "All" | "Cap & Gown" | "Senior Portraits" | "Candid" | "With Family";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  name: string;
  degree: string;
  category: Category;
  span: "normal" | "tall";
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618355776464-8666794d2520?w=800&h=1100&fit=crop&auto=format",
    alt: "Woman in blue academic dress",
    caption: "Her Chapter Begins",
    name: "Sophia Reeves",
    degree: "Bachelor of Arts · Literature",
    category: "Cap & Gown",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1616701318247-e87eb43e79e3?w=800&h=700&fit=crop&auto=format",
    alt: "Smiling girl wearing academic dress",
    caption: "Pure Achievement",
    name: "Aaliyah Monroe",
    degree: "Bachelor of Science · Biology",
    category: "Senior Portraits",
    span: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1633061273472-7c62356c7329?w=800&h=1000&fit=crop&auto=format",
    alt: "A woman in a graduation cap and gown",
    caption: "Dreams Fulfilled",
    name: "Mei-Lin Zhang",
    degree: "Master of Engineering",
    category: "Cap & Gown",
    span: "tall",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1576997355598-a5a9def46291?w=800&h=700&fit=crop&auto=format",
    alt: "Woman in black mortar board",
    caption: "The World Awaits",
    name: "Naomi Osei",
    degree: "Bachelor of Commerce",
    category: "Senior Portraits",
    span: "normal",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559144975-22228b3bb1d3?w=800&h=1100&fit=crop&auto=format",
    alt: "Woman in black graduation gown",
    caption: "Class of 2025",
    name: "Elena Vasquez",
    degree: "Doctor of Medicine",
    category: "Cap & Gown",
    span: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1704452607333-f0e189d7e2cc?w=800&h=900&fit=crop&auto=format",
    alt: "A woman in a graduation cap and gown",
    caption: "A New Dawn",
    name: "Isabelle Fontaine",
    degree: "Bachelor of Fine Arts",
    category: "Cap & Gown",
    span: "normal",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1519070994522-88c6b756330e?w=800&h=700&fit=crop&auto=format",
    alt: "Person wearing red graduation dress",
    caption: "Radiant & Ready",
    name: "Amara Williams",
    degree: "Bachelor of Psychology",
    category: "Candid",
    span: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1623461482500-2cef002337b0?w=800&h=1100&fit=crop&auto=format",
    alt: "Woman holding graduation cap in the air",
    caption: "Toss It High",
    name: "Chloe Bennett",
    degree: "Bachelor of Communications",
    category: "Candid",
    span: "tall",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1528980917907-8df7f48f6f2a?w=800&h=700&fit=crop&auto=format",
    alt: "Woman wearing academic uniform",
    caption: "Standing Tall",
    name: "Fatima Al-Rashid",
    degree: "Master of Architecture",
    category: "Senior Portraits",
    span: "normal",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1738949539465-02956d5cb2d7?w=800&h=1000&fit=crop&auto=format",
    alt: "Man in a suit sitting on a chair",
    caption: "Distinguished Graduate",
    name: "James Okafor",
    degree: "Juris Doctor · Law",
    category: "Senior Portraits",
    span: "normal",
  },
];

const CATEGORIES: Category[] = ["All", "Cap & Gown", "Senior Portraits", "Candid", "With Family"];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered =
    activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory);

  const currentIndex = openPhoto ? filtered.findIndex((p) => p.id === openPhoto.id) : -1;

  const navigate = (dir: 1 | -1) => {
    if (currentIndex === -1) return;
    const next = (currentIndex + dir + filtered.length) % filtered.length;
    setOpenPhoto(filtered[next]);
  };

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      {/* Hero */}
      <header className="relative pt-20 pb-14 px-8 text-center overflow-hidden">
        {/* Background shimmer */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #D4A843 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div className="relative z-10 flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-primary/50" />
          <span className="flex items-center gap-2 text-primary text-xs tracking-[0.4em] uppercase font-bold">
            <GraduationCap size={13} />
            {SCHOOL}
          </span>
          <div className="h-px w-16 bg-primary/50" />
        </div>

        <div className="relative z-10">
          <p
            className="text-primary text-sm tracking-[0.3em] uppercase font-bold mb-3"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}
          >
            Class of
          </p>
          <h1
            className="text-8xl md:text-[10rem] font-black leading-none tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}
          >
            {CLASS_YEAR}
          </h1>
          <p
            className="mt-4 text-muted-foreground text-base italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "The future belongs to those who believe in the beauty of their dreams."
          </p>
        </div>

        {/* Metadata row */}
        <div className="relative z-10 mt-10 flex items-center justify-center gap-6 text-xs tracking-[0.25em] uppercase text-muted-foreground">
          <span className="flex items-center gap-2">
            <Star size={10} className="text-primary" />
            {photos.length} Portraits
          </span>
          <span className="w-px h-3 bg-border" />
          <span>{STUDIO}</span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-2">
            <Star size={10} className="text-primary" />
            {liked.size > 0 ? `${liked.size} Favourited` : "Honour Roll"}
          </span>
        </div>

        {/* Bottom border with gold tint */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </header>

      {/* Filter tabs */}
      <nav className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-8 flex gap-0 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative flex-shrink-0 px-5 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-200 ${
                activeCategory === cat
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
              )}
            </button>
          ))}
          <span className="ml-auto flex-shrink-0 self-center text-xs text-muted-foreground tracking-widest pr-2">
            {filtered.length} shown
          </span>
        </div>
      </nav>

      {/* Gallery */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "260px",
          }}
        >
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden bg-muted"
              style={{ gridRow: photo.span === "tall" ? "span 2" : "span 1" }}
              onClick={() => setOpenPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gold vignette on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,16,30,0.85) 0%, rgba(8,16,30,0.2) 50%, transparent 100%)",
                }}
              />

              {/* Corner accent on hover */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Like button */}
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-background/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(photo.id);
                }}
                aria-label="Favourite"
              >
                <Heart
                  size={14}
                  className={liked.has(photo.id) ? "fill-primary text-primary" : "text-foreground"}
                />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p
                  className="text-primary text-xs tracking-[0.25em] uppercase font-bold mb-1"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {photo.category}
                </p>
                <p
                  className="text-foreground text-xl font-black leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {photo.name}
                </p>
                <p className="text-foreground/60 text-xs mt-1 tracking-wide">{photo.degree}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-muted-foreground tracking-widest text-sm uppercase">
            No portraits in this category
          </p>
        )}
      </main>

      {/* Honour Roll strip */}
      <section className="border-t border-border py-14 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-primary text-xs tracking-[0.4em] uppercase font-bold">Honour Roll</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p
              className="text-muted-foreground italic text-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Celebrating every graduate of {CLASS_YEAR}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Graduates", value: photos.length, suffix: "" },
              { label: "Faculties", value: 6, suffix: "" },
              { label: "Distinction", value: 84, suffix: "%" },
              { label: "Favourited", value: liked.size, suffix: "" },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="py-6 border border-border">
                <p
                  className="text-4xl font-black text-primary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {value}{suffix}
                </p>
                <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-primary/30" />
          <GraduationCap size={16} className="text-primary" />
          <div className="h-px w-12 bg-primary/30" />
        </div>
        <p
          className="text-foreground text-base font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {SCHOOL} · Class of {CLASS_YEAR}
        </p>
        <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mt-1">
          {STUDIO} · Graduation Portrait Collection
        </p>
      </footer>

      {/* Lightbox */}
      <Dialog.Root open={!!openPhoto} onOpenChange={(o) => !o && setOpenPhoto(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            aria-describedby={undefined}
          >
            {openPhoto && (
              <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-card border border-border shadow-2xl overflow-hidden">
                {/* Gold top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                  <div>
                    <p className="text-primary text-xs tracking-[0.25em] uppercase font-bold mb-1">
                      {openPhoto.category}
                    </p>
                    <Dialog.Title
                      className="text-xl font-black leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {openPhoto.name}
                    </Dialog.Title>
                    <p className="text-muted-foreground text-xs tracking-wide mt-0.5">
                      {openPhoto.degree}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleLike(openPhoto.id)}
                      className="p-2.5 hover:bg-muted rounded transition-colors"
                      aria-label="Favourite"
                    >
                      <Heart
                        size={16}
                        className={
                          liked.has(openPhoto.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                    <a
                      href={openPhoto.src}
                      download
                      className="p-2.5 hover:bg-muted rounded transition-colors text-muted-foreground"
                      aria-label="Download"
                    >
                      <Download size={16} />
                    </a>
                    <Dialog.Close className="p-2.5 hover:bg-muted rounded transition-colors text-muted-foreground ml-1">
                      <X size={16} />
                    </Dialog.Close>
                  </div>
                </div>

                {/* Image */}
                <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center">
                  <img
                    src={openPhoto.src}
                    alt={openPhoto.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                  {filtered.length > 1 && (
                    <>
                      <button
                        onClick={() => navigate(-1)}
                        className="absolute left-4 p-2.5 bg-card/90 hover:bg-card text-foreground border border-border rounded shadow-lg transition-all"
                        aria-label="Previous"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => navigate(1)}
                        className="absolute right-4 p-2.5 bg-card/90 hover:bg-card text-foreground border border-border rounded shadow-lg transition-all"
                        aria-label="Next"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom bar */}
                <div className="flex items-center justify-between px-6 py-3 border-t border-border flex-shrink-0">
                  <span className="text-primary text-xs tracking-[0.3em] uppercase font-bold">
                    {SCHOOL} · {CLASS_YEAR}
                  </span>
                  <span className="text-muted-foreground text-xs tracking-widest">
                    {currentIndex + 1} / {filtered.length}
                  </span>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
