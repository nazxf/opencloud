// Native <details>/<summary> accordion: keyboard- and screen-reader-accessible, zero JS.
const FAQS = [
  {
    q: 'What is OpenCloud?',
    a: 'OpenCloud is a multi-model AI gateway: one stable API in front of every provider, with routing, fallback, access control, and traffic analytics in a single layer.',
  },
  {
    q: 'Which providers are supported?',
    a: 'OpenAI, Anthropic, Google, DeepSeek, Qwen, xAI and more — plus popular tools and agents. New providers are added regularly.',
  },
  {
    q: 'How does fallback routing work?',
    a: 'You declare a primary model and a fallback chain. If the primary errors or exceeds your latency threshold, OpenCloud retries down the chain automatically.',
  },
  {
    q: 'Is my data secure?',
    a: 'Traffic is encrypted in transit, SSL is enforced by default, and you control access with per-key policies and rate limits.',
  },
  {
    q: 'How am I billed?',
    a: 'Start free on Hobby. Paid plans bill monthly with no lock-in, and smart routing can cut spend by mapping each request to the most cost-effective model.',
  },
  {
    q: 'Can I bring my own API keys?',
    a: 'Yes. Use OpenCloud-managed credentials or plug in your own provider keys per project.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 md:px-12 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-sans font-semibold text-foreground tracking-tight mb-4">Frequently asked questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to know about routing through OpenCloud.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-card border border-border rounded-xl px-6">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none marker:content-none text-base font-medium text-foreground">
                {faq.q}
                <span className="shrink-0 text-2xl leading-none text-primary transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
