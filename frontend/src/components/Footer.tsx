export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="OpenCloud Logo" className="w-6 h-6 rounded-sm object-cover grayscale invert" />
            <span className="font-sans font-semibold text-foreground text-lg">OpenCloud</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Building the future of deployment with deeply integrated AI agents. Fast, secure, and incredibly smart.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Legal</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground"> 2026 OpenCloud Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
