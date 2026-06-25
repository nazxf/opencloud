import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PricingProps {
  onOpenAuth: () => void;
}

export default function Pricing({ onOpenAuth }: PricingProps) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.price-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold text-foreground tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Hobby */}
          <div className="price-card p-8 rounded-xl border border-border bg-card flex flex-col hover:border-muted-foreground/30 transition-colors">
            <h3 className="text-xl font-medium text-foreground mb-2">Hobby</h3>
            <div className="text-4xl font-semibold text-foreground mb-6">$0<span className="text-base text-muted-foreground font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['1 Project', '100 GB Bandwidth', 'Community Support', 'Shared Infrastructure'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground/70 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={onOpenAuth}
              className="w-full py-3 bg-card text-foreground border border-border rounded-full hover:bg-accent transition-colors font-medium cursor-pointer"
            >
              Deploy Now
            </button>
          </div>
          
          {/* Pro */}
          <div className="price-card p-8 rounded-xl border-2 border-primary bg-card flex flex-col relative transform md:-translate-y-4 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">Most Popular</div>
            <h3 className="text-xl font-medium text-foreground mb-2 mt-2">Pro</h3>
            <div className="text-4xl font-semibold text-foreground mb-6">$20<span className="text-base text-muted-foreground font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited Projects', '1 TB Bandwidth', 'Email Support', 'Dedicated CPU & RAM', 'Custom Domains'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={onOpenAuth}
              className="w-full py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity font-medium shadow-md cursor-pointer"
            >
              Start 14-Day Trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="price-card p-8 rounded-xl border border-border bg-card flex flex-col hover:border-muted-foreground/30 transition-colors">
            <h3 className="text-xl font-medium text-foreground mb-2">Enterprise</h3>
            <div className="text-4xl font-semibold text-foreground mb-6">Custom</div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited Everything', 'SLA 99.99%', 'Dedicated Account Manager', '24/7 Phone Support', 'On-premise option'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground/70 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={onOpenAuth}
              className="w-full py-3 bg-card text-[#a19d98] hover:text-foreground border border-border rounded-full hover:bg-white/5 transition-colors font-medium cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
