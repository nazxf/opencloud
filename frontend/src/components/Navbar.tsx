import { useState, useEffect } from 'react';
import { Hexagon, Monitor, ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
}

const NAV_LINKS = [
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Providers', href: '#providers' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Drawer open: close on Escape and lock background scroll.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="w-full bg-primary text-primary-foreground text-sm font-medium py-1.5 px-4 text-center z-[100] relative">
        OpenCloud Pro 50% OFF &ndash; Limited Time Only!
      </div>
      
      <div className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out pointer-events-none ${isScrolled ? 'top-6 px-4' : 'top-[36px] px-0'}`}>
        <nav className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out w-full bg-[#161310]/95 backdrop-blur-md overflow-hidden relative
          ${isScrolled 
            ? 'max-w-5xl rounded-full border border-border shadow-2xl py-3 px-6' 
            : 'max-w-full rounded-none border-b border-border py-4 px-6 md:px-12'
          }`}
        >
          <div className="flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-foreground" />
            <span className="font-serif font-medium text-foreground tracking-tight text-xl">OpenCloud</span>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">{label}</a>
            ))}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-4 mr-2">
              <button type="button" aria-label="Language: English" className="text-[#a19d98] text-[13px] font-medium cursor-pointer hover:text-foreground transition-colors">EN</button>
              <button type="button" aria-label="Toggle theme" className="text-[#a19d98] cursor-pointer hover:text-foreground transition-colors">
                <Monitor className="w-4 h-4" />
              </button>
            </div>
            <a href="https://github.com/nazxf/opencloud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-foreground border border-border rounded-full hover:bg-white/5 transition-colors">
              Docs <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
            >
              Console <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-full cursor-pointer"
            >
              Console
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-1 rounded-full text-foreground hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 bg-[#161310]/95 backdrop-blur-lg flex flex-col justify-center px-8 transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}

          <div className="w-full border-t border-border my-4"></div>

          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-3 text-lg font-medium text-foreground border border-border rounded-full hover:bg-white/5 transition-colors"
          >
            Docs
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
            className="w-full py-3 text-lg font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
          >
            Console
          </button>
        </div>
      </div>
    </>
  );
}
