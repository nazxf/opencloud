import { useState, useEffect } from 'react';
import { Hexagon, Monitor, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-primary text-primary-foreground text-sm font-medium py-1.5 px-4 text-center z-[100] relative">
        OpenCloud Pro 50% OFF &ndash; Limited Time Only!
      </div>
      
      <div className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out pointer-events-none ${isScrolled ? 'top-6 px-4' : 'top-[36px] px-0'}`}>
        <nav className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out w-full bg-[#161310]/95 backdrop-blur-md overflow-hidden
          ${isScrolled 
            ? 'max-w-5xl rounded-full border border-border shadow-2xl py-3 px-6' 
            : 'max-w-full rounded-none border-b border-border py-4 px-6 md:px-12'
          }`}
        >
          <div className="flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-foreground" />
            <span className="font-serif font-medium text-foreground tracking-tight text-xl">OpenModel</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">Features</a>
            <a href="#providers" className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">Providers</a>
            <a href="#flow" className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">Flow</a>
            <a href="#faq" className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">FAQ</a>
            <a href="#models" className="text-[#a19d98] hover:text-foreground text-[13px] font-medium transition-colors">Models</a>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-4 mr-2">
              <span className="text-[#a19d98] text-[13px] font-medium cursor-pointer hover:text-foreground transition-colors">EN</span>
              <Monitor className="w-4 h-4 text-[#a19d98] cursor-pointer hover:text-foreground transition-colors" />
            </div>
            <button className="hidden md:flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-foreground border border-border rounded-full hover:bg-white/5 transition-colors">
              Docs <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
              Console <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
