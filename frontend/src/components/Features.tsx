import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const boxes = gsap.utils.toArray('.bento-box');
    boxes.forEach((box) => {
      gsap.fromTo(box as Element,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: box as Element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="features" ref={sectionRef} className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold text-foreground tracking-tight mb-4">Everything you need to scale</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Build, deploy, and scale your applications with our comprehensive suite of developer tools.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-box col-span-1 md:col-span-2 bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Globe className="w-8 h-8 text-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-semibold text-foreground mb-3 relative z-10">Global Edge Network</h3>
            <p className="text-muted-foreground leading-relaxed max-w-lg relative z-10">Deploy your code to 35+ regions instantly. Our edge network ensures single-digit millisecond latency for your users worldwide.</p>
          </div>
          <div className="bento-box col-span-1 bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-8 h-8 text-amber-500 mb-6 relative z-10" />
            <h3 className="text-2xl font-semibold text-foreground mb-3 relative z-10">Instant Builds</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10">Zero-config deployments. Push to Git and see your changes live in seconds.</p>
          </div>
          <div className="bento-box col-span-1 bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Shield className="w-8 h-8 text-green-500 mb-6 relative z-10" />
            <h3 className="text-2xl font-semibold text-foreground mb-3 relative z-10">Enterprise Security</h3>
            <p className="text-muted-foreground leading-relaxed relative z-10">Built-in DDoS protection, automatic SSL, and strict firewall rules by default.</p>
          </div>
          <div className="bento-box col-span-1 md:col-span-2 bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <Cpu className="w-8 h-8 text-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-semibold text-foreground mb-3 relative z-10">AI Auto-scaling</h3>
            <p className="text-muted-foreground leading-relaxed max-w-lg relative z-10">Our proprietary AI agent monitors your traffic and automatically provisions or terminates containers to ensure perfect efficiency.</p>
            <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
