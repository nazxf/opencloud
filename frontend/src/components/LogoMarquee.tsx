const ROW1_BRANDS = [
  { name: 'Qwen', file: 'qwen.svg' },
  { name: 'DeepSeek', file: 'deepseek.svg' },
  { name: 'Gemini', file: 'gemini.svg' },
  { name: 'MINIMAX', file: 'minimax.svg' },
  { name: 'KIMI', file: 'kimi.svg' },
  { name: 'OpenAI', file: 'openai.svg' },
  { name: 'MiMo', file: 'mimo.svg' },
  { name: 'Z.ai', file: 'zai.svg' }
];

const ROW2_BRANDS = [
  { name: 'Cherry Studio', file: 'cherry-studio.svg' },
  { name: 'CLACKYAI', file: 'clackyai.svg' },
  { name: 'Cline', file: 'cline.svg' },
  { name: 'Codex', file: 'codex.svg' },
  { name: 'Grok', file: 'grok.svg' },
  { name: 'Mastra', file: 'mastra.svg' },
  { name: 'Obsidian', file: 'obsidian.svg' }
];

type Brand = { name: string; file: string };

function Track({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const style = reverse ? { animationDirection: 'reverse', animationDuration: '42s' } : undefined;
  return (
    <div className="flex w-max shrink-0 animate-marquee" style={style}>
      {[0, 1].map((dup) => (
        <ul key={dup} className="flex shrink-0 items-center gap-14 pr-14 md:gap-[62px] md:pr-[62px]" aria-hidden={dup === 1}>
          {brands.map((brand, i) => (
            <li key={i}>
              <img
                src={`/brands/${brand.file}`}
                alt={brand.name}
                className="h-6 w-auto opacity-42 brightness-0 invert transition-opacity duration-300 hover:opacity-85 md:h-[28px]"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section id="providers" className="relative overflow-hidden px-0 pb-10 pt-9">
      <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60">Compatible with leading AI providers and tools</p>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-36 bg-gradient-to-r from-background to-transparent md:w-48"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-36 bg-gradient-to-l from-background to-transparent md:w-48"></div>

      <div className="flex flex-col gap-7">
        <Track brands={ROW1_BRANDS} />
        <Track brands={ROW2_BRANDS} reverse />
      </div>
    </section>
  );
}
