import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plug, GitBranch, Activity, Gauge } from 'lucide-react';

const STEPS = [
  { icon: Plug, title: 'Connect', text: 'Point your app at a single OpenCloud endpoint — no per-provider SDKs.' },
  { icon: GitBranch, title: 'Route', text: 'Declare a primary model and a fallback chain in one config block.' },
  { icon: Activity, title: 'Observe', text: 'Watch latency, cost, and success rate stream in real time.' },
  { icon: Gauge, title: 'Scale', text: 'Automatic failover and rate-limit policies hold the line under load.' },
];

export default function Flow() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.flow-step',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="flow" ref={sectionRef} className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold text-foreground tracking-tight mb-4">From request to response in one layer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Four steps to put every model behind one resilient gateway.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flow-step bg-card p-7 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 mb-5">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs font-semibold text-primary/70 mb-1 uppercase tracking-wider">Step {i + 1}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
