import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AgentMockup from './components/AgentMockup';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />
      <main>
        <Hero onOpenAuth={() => setIsAuthModalOpen(true)} />
        <LogoMarquee />
        <div className="pt-24">
          <AgentMockup />
        </div>
        <Features />
        <Pricing onOpenAuth={() => setIsAuthModalOpen(true)} />
      </main>
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}

export default App;
