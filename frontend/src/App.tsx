import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AgentMockup from './components/AgentMockup';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background-100 selection:bg-tertiary selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <div className="pt-24">
          <AgentMockup />
        </div>
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default App;
