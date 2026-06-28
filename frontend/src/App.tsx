import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AgentMockup from './components/AgentMockup';
import Features from './components/Features';
import Flow from './components/Flow';
import Models from './components/Models';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CookieConsent from './components/CookieConsent';

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

          <div id="demo" className="pt-24">
            <AgentMockup />
          </div>
          <Features />
          <Flow />
          <Models />
          <Pricing onOpenAuth={() => setIsAuthModalOpen(true)} />
          <FAQ />
        </main>
        <Footer />

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <CookieConsent />
      </div>
    </div>
  )
}

export default App;
