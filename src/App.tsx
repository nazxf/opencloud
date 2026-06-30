'use client';

import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AuthModal from './components/AuthModal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
      <div aria-hidden className="site-noise" />
      <div className="relative z-10">
        <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
        <main>
          <section className="first-screen" aria-label="OpenModel overview">
            <div aria-hidden className="diagonal-field" />
            <div className="first-screen-frame">
              <Hero onOpenAuth={() => setIsAuthModalOpen(true)} />
              <LogoMarquee />
            </div>
          </section>
        </main>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </div>
  )
}

export default App;
