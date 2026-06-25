const ROW1_BRANDS = [
  { name: 'MINIMAX', file: 'minimax.svg' },
  { name: 'KIMI', file: 'kimi.svg' },
  { name: 'OpenAI', file: 'openai.svg' },
  { name: 'MiMo', file: 'mimo.svg' },
  { name: 'Z.ai', file: 'zai.svg' },
  { name: 'Anthropic', file: 'anthropic.svg' },
  { name: 'Qwen', file: 'qwen.svg' },
  { name: 'DeepSeek', file: 'deepseek.svg' },
  { name: 'Gemini', file: 'gemini.svg' }
];

const ROW2_BRANDS = [
  { name: 'Grok', file: 'gork.svg' },
  { name: 'Mastra', file: 'mastra.svg' },
  { name: 'Obsidian', file: 'obsidian.svg' },
  { name: 'OOMOL', file: 'oomol.svg' },
  { name: 'Opencode', file: 'opencode.svg' },
  { name: 'Cherry Studio', file: 'cherry-studio.svg' },
  { name: 'CLACKYAI', file: 'clackyai.svg' },
  { name: 'Cline', file: 'cline.svg' }
];

export default function LogoMarquee() {
  return (
    <section id="providers" className="py-20 border-t border-b border-border bg-background overflow-hidden relative">
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-12">Compatible with leading AI providers and tools</p>
      
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex w-[200%] md:w-[150%]">
          <div className="flex w-1/2 animate-marquee items-center justify-around">
            {ROW1_BRANDS.map((brand, i) => (
              <img key={i} src={`/brands/${brand.file}`} alt={brand.name} className="h-8 md:h-11 opacity-60 hover:opacity-100 transition-opacity invert" />
            ))}
          </div>
          <div className="flex w-1/2 animate-marquee items-center justify-around">
            {ROW1_BRANDS.map((brand, i) => (
              <img key={`dup1-${i}`} src={`/brands/${brand.file}`} alt={brand.name} className="h-8 md:h-11 opacity-60 hover:opacity-100 transition-opacity invert" />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-[200%] md:w-[150%] ml-[-10%]">
          <div className="flex w-1/2 animate-marquee items-center justify-around" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {ROW2_BRANDS.map((brand, i) => (
              <img key={i} src={`/brands/${brand.file}`} alt={brand.name} className="h-8 md:h-11 opacity-60 hover:opacity-100 transition-opacity invert" />
            ))}
          </div>
          <div className="flex w-1/2 animate-marquee items-center justify-around" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
            {ROW2_BRANDS.map((brand, i) => (
              <img key={`dup2-${i}`} src={`/brands/${brand.file}`} alt={brand.name} className="h-8 md:h-11 opacity-60 hover:opacity-100 transition-opacity invert" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
