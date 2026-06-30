import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  'Limited Event: DeepSeek V4 Flash is free now ->',
  'GLM-5.2 50% OFF - Limited Time Only!',
];

export default function AnnouncementBanner() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div className="relative z-[100] h-10 w-full bg-primary px-12 text-center text-[14px] font-bold leading-10 text-primary-foreground">
      <button
        onClick={() => go(-1)}
        aria-label="Previous announcement"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/70 transition-colors hover:bg-black/10 hover:text-primary-foreground cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <span className="underline decoration-primary-foreground/60 underline-offset-2" aria-live="polite">
        {SLIDES[index]}
      </span>

      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <span className="text-[11px] tabular-nums opacity-60">{index + 1}/{total}</span>
        <button
          onClick={() => go(1)}
          aria-label="Next announcement"
          className="rounded-full p-1 text-primary-foreground/70 transition-colors hover:bg-black/10 hover:text-primary-foreground cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
