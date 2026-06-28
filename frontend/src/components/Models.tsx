import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MODELS = [
  { name: 'GPT-4o', provider: 'OpenAI', tag: '128k ctx' },
  { name: 'GPT-4o mini', provider: 'OpenAI', tag: 'low cost' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', tag: '200k ctx' },
  { name: 'Claude 3 Haiku', provider: 'Anthropic', tag: 'fast' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', tag: '1M ctx' },
  { name: 'DeepSeek V3', provider: 'DeepSeek', tag: 'reasoning' },
  { name: 'DeepSeek Coder', provider: 'DeepSeek', tag: 'code' },
  { name: 'Qwen 2.5 72B', provider: 'Alibaba', tag: 'open' },
  { name: 'Grok-2', provider: 'xAI', tag: 'realtime' },
];

export default function Models() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.model-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="models" ref={sectionRef} className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold text-foreground tracking-tight mb-4">One gateway, every model</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Route across frontier and open models without changing a line of your code.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODELS.map((model, i) => (
            <div key={i} className="model-card flex items-center justify-between gap-4 bg-card p-5 rounded-xl border border-border hover:border-muted-foreground/30 transition-colors">
              <div>
                <div className="text-base font-semibold text-foreground">{model.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{model.provider}</div>
              </div>
              <span className="shrink-0 text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1">{model.tag}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">+ dozens more across every supported provider, added continuously.</p>
      </div>
    </section>
  );
}
