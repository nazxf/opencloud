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
    <section ref={containerRef} className="relative flex flex-col items-center justify-center pt-40 pb-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--primary) 0, var(--primary) 1px, transparent 1px, transparent 40px)' }}></div>
      
      <div className="relative z-10 max-w-4xl">
        <p className="hero-text text-muted-foreground font-medium mb-6 tracking-wide text-xs md:text-sm uppercase animate-float-slow">For teams operating real scale traffic.</p>
        <h1 className="hero-text text-5xl md:text-7xl font-sans font-semibold tracking-tight text-foreground mb-6 leading-tight">
          Operate your <br className="hidden md:block"/> full-stack applications with <span className="text-primary font-serif italic font-normal tracking-normal">precision</span>
        </h1>
        <p className="hero-text text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          OpenCloud is a multi-model gateway that gives applications one stable API while provider routing, fallback logic, access control, and traffic visibility stay in one layer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onOpenAuth}
            className="hero-btn px-6 py-3 text-base font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Open console</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
          <button className="hero-btn px-6 py-3 text-base font-medium bg-card text-foreground border border-border rounded-full hover:bg-accent transition-colors w-full sm:w-auto cursor-pointer">
            Read docs
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {['One API surface', 'Provider routing', 'Model mapping', 'Traffic visibility'].map((text, i) => (
            <div key={i} className="hero-pill px-4 py-1.5 text-sm text-primary border border-primary/20 bg-primary/10 rounded-full backdrop-blur-sm animate-badge-glow-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-badge-shimmer-sweep" style={{ animationDelay: `${i * 0.2}s` }}></div>
              <span className="relative z-10">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
