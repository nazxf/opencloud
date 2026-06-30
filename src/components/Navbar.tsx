import { useState, useEffect } from 'react';
import { ArrowUpRight, Box, Menu, X } from 'lucide-react';
import AnnouncementBanner from './AnnouncementBanner';

interface NavbarProps {
  onOpenAuth: () => void;
}

const NAV_LINKS = [
  { label: 'Providers', href: '#providers' },
];

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: glow the nav link whose section sits in the upper-middle of the viewport.
  useEffect(() => {
    const els = NAV_LINKS
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
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
      <AnnouncementBanner />
      
      <div className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-[top] duration-300 ease-out pointer-events-none ${isScrolled ? 'top-5' : 'top-8'}`}>
        <nav className={`pointer-events-auto grid w-full grid-cols-[1fr_auto_1fr] items-center relative backdrop-blur-xl border border-border transition-[max-width,padding,background-color,box-shadow,border-radius,border-color] duration-300 ease-out
          ${isScrolled
            ? 'max-w-5xl rounded-full bg-background/75 px-5 py-3 shadow-2xl'
            : 'max-w-[1216px] rounded-none border-y-transparent bg-background/55 px-4 py-[27px] md:px-4'
          }`}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <Box className="h-7 w-7 text-foreground" strokeWidth={2.6} />
            <span className="font-serif text-[23px] font-semibold leading-none tracking-[-0.045em] text-foreground">OpenModel</span>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-[30px] md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeId === href.slice(1);
              return (
                <a key={href} href={href} className={`group relative text-[12px] font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {label}
                  <span className={`pointer-events-none absolute left-1/2 -bottom-[18px] h-px w-7 -translate-x-1/2 rounded-full bg-foreground transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`} />
                </a>
              );
            })}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden items-center justify-end gap-3 md:flex">
            <a href="https://github.com/nazxf/opencloud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-border bg-black/35 px-4 py-2 text-[12px] font-semibold text-foreground transition-colors hover:bg-white/5">
              Docs <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12px] font-semibold text-background transition-opacity hover:opacity-90 cursor-pointer"
            >
              Console <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center justify-end gap-3 md:hidden">
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
