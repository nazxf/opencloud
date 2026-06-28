import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  onOpenAuth: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.hero-text', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-btn', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
    );
    gsap.fromTo('.hero-pill',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.8 }
    )
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative flex flex-col items-center px-4 pb-14 pt-[86px] text-center md:pt-[84px]">
      <div className="relative z-10 w-full max-w-[820px]">
        <p className="hero-text mb-4 text-[12px] font-medium tracking-[0.01em] md:text-[13px]">
          <span className="text-muted-foreground">For teams </span>
          <span className="text-primary">operating real model traffic.</span>
        </p>
        <h1 className="hero-text mx-auto mb-5 max-w-[900px] font-serif text-[46px] font-medium leading-[0.97] tracking-[-0.055em] text-foreground sm:text-[58px] md:text-[60px]">
          Operate your <br className="hidden sm:block" /> multi-model gateway with <span className="font-medium text-primary">clarity</span>
        </h1>
        <p className="hero-text mx-auto mb-5 max-w-[600px] text-[13px] leading-[1.55] text-muted-foreground md:text-[14px]">
          OpenModel is a multi-model gateway that gives applications one stable API while provider routing, fallback logic, access control, and traffic visibility stay in one layer.
        </p>
        <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button 
            onClick={onOpenAuth}
            className="hero-btn group relative w-full overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-[14px] font-semibold text-background shadow-sm transition-opacity hover:opacity-90 sm:w-auto cursor-pointer"
          >
            <span className="relative z-10">Open console</span>
            <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
          <a href="https://github.com/nazxf/opencloud" target="_blank" rel="noopener noreferrer" className="hero-btn w-full rounded-full border border-border bg-black/35 px-5 py-2.5 text-center text-[14px] font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto cursor-pointer">
            Read docs
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {['One API surface', 'Provider routing', 'Model mapping', 'Traffic visibility'].map((text, i) => (
            <div key={i} className="hero-pill rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground">
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
