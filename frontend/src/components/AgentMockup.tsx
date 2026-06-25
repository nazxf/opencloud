import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function AgentMockup() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(containerRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    tl.fromTo('.chat-msg-1', 
      { x: -20, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    tl.fromTo('.chat-msg-2', 
      { x: 20, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      "+=0.5" 
    );
    tl.fromTo('.code-block',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      "+=0.3"
    );
  }, []);

  return (
    <div className="px-4 md:px-12 pb-24 flex justify-center perspective-[1000px]">
      <div ref={containerRef} className="w-full max-w-5xl rounded-lg border border-gray-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] bg-background-100 overflow-hidden flex flex-col md:flex-row transform transition-transform duration-500 hover:scale-[1.01]">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-background-200 p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-xs font-mono text-gray-800 uppercase tracking-wider mb-2">Projects</p>
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-sm font-medium text-gray-1000 bg-gray-200 rounded-sm">mysite-production</div>
            <div className="px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-sm cursor-pointer transition-colors">api-backend</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-[500px]">
          <div className="border-b border-gray-200 p-4 flex items-center gap-2">
            <span className="font-mono text-sm text-gray-900 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              AI Assistant Active
            </span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="chat-msg-1 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs shrink-0">U</div>
              <div className="flex-1 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-1000 leading-relaxed">I need a landing page for my new coffee shop. Make it look modern and deploy it.</p>
              </div>
            </div>
            <div className="chat-msg-2 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-xs text-white shrink-0">AI</div>
              <div className="flex-1 p-4 border border-gray-200 rounded-md shadow-sm bg-background-100">
                <p className="text-sm text-gray-1000 mb-3 leading-relaxed">I've generated the React code and provisioned a new container for your coffee shop site.</p>
                <div className="code-block bg-[#111] rounded-md p-4 shadow-inner border border-gray-800 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-300 leading-loose">
                    <code>
<span className="text-blue-400">[System]</span> Provisioning container...<br/>
<span className="text-blue-400">[System]</span> Setting up Nginx...<br/>
<span className="text-blue-400">[System]</span> Deploying Vite build...<br/>
<span className="text-green-400 font-bold">[Success]</span> Live at: <span className="text-blue-300 underline decoration-blue-500/30 underline-offset-4 cursor-pointer">https://coffee-shop.opencloud.app</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
