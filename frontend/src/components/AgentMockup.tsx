import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, RotateCcw, Cpu, Terminal, Sliders, BarChart3, Database } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const DEMO_LOGS = [
  "[System] Initializing connection to OpenCloud cluster...",
  "[System] Cloning source repository: github:nazxf/opencloud...",
  "[System] Reading configuration profile: opencloud.yaml...",
  "[Builder] Pulling base image: node:20-alpine (cached)...",
  "[Builder] Running target: npm ci (installing dependencies)...",
  "[Builder] Running target: npm run build (compiling assets)...",
  "[Builder] Build succeeded: 51 modules processed in 1.84 seconds.",
  "[Gateway] Generating SSL certificate for: opencloud.nazxf.io...",
  "[Gateway] Registering route: /api/v1 -> cluster-backend",
  "[Gateway] Applying rate-limit policy: 500 requests/minute",
  "[Gateway] Spawning intelligent edge routing with 200ms latency fallback...",
  "[Success] Deployment completed. Site is live at: https://opencloud.nazxf.io"
];

export default function AgentMockup() {
  const containerRef = useRef(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<'console' | 'config' | 'analytics'>('console');
  const [activeProject, setActiveProject] = useState<'mysite' | 'backend'>('mysite');
  
  // Simulation logs state
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationIndex, setSimulationIndex] = useState(0);

  // Scroll to bottom of logs on update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Log simulation timer
  useEffect(() => {
    let interval: any;
    if (isSimulating && simulationIndex < DEMO_LOGS.length) {
      interval = setInterval(() => {
        setLogs(prev => [...prev, DEMO_LOGS[simulationIndex]]);
        setSimulationIndex(prev => prev + 1);
      }, 700 + Math.random() * 600); // realistic variance in speeds
    } else if (simulationIndex >= DEMO_LOGS.length) {
      setIsSimulating(false);
    }
    return () => clearInterval(interval);
  }, [isSimulating, simulationIndex]);

  const handleStartSimulation = () => {
    setLogs([]);
    setSimulationIndex(0);
    setIsSimulating(true);
  };

  const handleResetSimulation = () => {
    setLogs([]);
    setSimulationIndex(0);
    setIsSimulating(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(containerRef.current, 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="px-4 md:px-12 pb-24 flex justify-center perspective-[1000px]">
      <div 
        ref={containerRef} 
        className="w-full max-w-5xl rounded-xl border border-border shadow-2xl bg-[#1d1915]/80 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row transform transition-transform duration-500 hover:scale-[1.005]"
      >
        {/* Sidebar */}
        <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-border bg-[#161310]/60 p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* Top dots */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>

            {/* Project Selection */}
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Projects</p>
            <div className="space-y-1 mb-6">
              <button 
                onClick={() => { setActiveProject('mysite'); handleResetSimulation(); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${activeProject === 'mysite' ? 'bg-[#e28c51]/10 text-[#e28c51] border border-[#e28c51]/20' : 'text-[#a19d98] hover:text-foreground hover:bg-white/5 border border-transparent'}`}
              >
                <Database className="w-3.5 h-3.5" />
                opencloud-frontend
              </button>
              <button 
                onClick={() => { setActiveProject('backend'); handleResetSimulation(); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${activeProject === 'backend' ? 'bg-[#e28c51]/10 text-[#e28c51] border border-[#e28c51]/20' : 'text-[#a19d98] hover:text-foreground hover:bg-white/5 border border-transparent'}`}
              >
                <Cpu className="w-3.5 h-3.5" />
                opencloud-backend
              </button>
            </div>

            {/* Tab Navigation */}
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Dashboard</p>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('console')}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'console' ? 'bg-white/5 text-foreground' : 'text-[#a19d98] hover:text-foreground hover:bg-white/5'}`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Live Console
              </button>
              <button 
                onClick={() => setActiveTab('config')}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'config' ? 'bg-white/5 text-foreground' : 'text-[#a19d98] hover:text-foreground hover:bg-white/5'}`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Routing Config
              </button>
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'analytics' ? 'bg-white/5 text-foreground' : 'text-[#a19d98] hover:text-foreground hover:bg-white/5'}`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </button>
            </div>
          </div>
          
          {/* Status Panel */}
          <div className="pt-4 border-t border-border mt-4 hidden md:block">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Gateway Cluster: Normal
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 flex flex-col h-[460px] bg-[#161310]/30">
          {/* Header Panel */}
          <div className="border-b border-border p-4 flex items-center justify-between">
            <span className="font-mono text-xs text-foreground flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {activeProject === 'mysite' ? 'projects/opencloud-frontend' : 'projects/opencloud-backend'}
            </span>
            
            {activeTab === 'console' && (
              <div className="flex items-center gap-2">
                {logs.length > 0 && !isSimulating && (
                  <button 
                    onClick={handleResetSimulation}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#a19d98] border border-border hover:border-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
                <button 
                  onClick={handleStartSimulation}
                  disabled={isSimulating}
                  className="flex items-center gap-1 px-3 py-1 text-[11px] font-semibold bg-primary text-primary-foreground disabled:opacity-50 rounded-md transition-opacity cursor-pointer"
                >
                  <Play className="w-3 h-3" /> {isSimulating ? 'Deploying...' : 'Deploy'}
                </button>
              </div>
            )}
          </div>

          {/* Body Panels */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-foreground">
            
            {/* Live Console Tab */}
            {activeTab === 'console' && (
              <div ref={logContainerRef} className="h-full overflow-y-auto space-y-2 select-text leading-relaxed">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground select-none">
                    <Terminal className="w-8 h-8 opacity-20 mb-2.5" />
                    <p>Click "Deploy" in the top right to start a build simulation.</p>
                    <p className="text-[10px] mt-1 opacity-70">Logs will stream in real-time mapping the gateway deployment steps.</p>
                  </div>
                ) : (
                  logs.map((log, i) => {
                    const isSuccess = log.includes('[Success]');
                    const isError = log.includes('[Error]');
                    const isSystem = log.includes('[System]');
                    const isBuilder = log.includes('[Builder]');
                    
                    let colorClass = 'text-[#a19d98]';
                    if (isSuccess) colorClass = 'text-green-400 font-bold';
                    else if (isError) colorClass = 'text-red-400';
                    else if (isSystem) colorClass = 'text-primary/95';
                    else if (isBuilder) colorClass = 'text-blue-400';

                    return (
                      <div key={i} className={colorClass}>
                        {log}
                      </div>
                    );
                  })
                )}
                {isSimulating && (
                  <div className="text-primary/70 animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    Running...
                  </div>
                )}
              </div>
            )}

            {/* Routing Config Tab */}
            {activeTab === 'config' && (
              <div className="h-full space-y-4">
                <p className="text-muted-foreground text-[11px] select-none border-b border-border/30 pb-2">Active routing rules for fallbacks, timeouts, and multi-model failover thresholds.</p>
                <pre className="text-emerald-400/90 leading-loose text-left select-all bg-black/30 p-4 rounded-lg border border-border/30 overflow-x-auto">
                  <code>{`{
  "project_name": "${activeProject === 'mysite' ? 'opencloud-frontend' : 'opencloud-backend'}",
  "env": "production",
  "routing": {
    "primary": "gpt-4o",
    "fallback_chain": ["claude-3-5-sonnet", "deepseek-coder"],
    "automatic_retry_attempts": 3,
    "latency_failover_ms": 350
  },
  "security": {
    "ssl_enforce": true,
    "ddos_threshold_qps": 800
  }
}`}</code>
                </pre>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="h-full space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-border/40 p-3.5 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Average Latency</div>
                    <div className="text-xl font-semibold text-primary mt-1">42 ms</div>
                    <div className="text-[9px] text-green-400 mt-0.5">&darr; 8.4% improvement</div>
                  </div>
                  <div className="bg-white/5 border border-border/40 p-3.5 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Success Rate</div>
                    <div className="text-xl font-semibold text-emerald-400 mt-1">99.98%</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">SLA target: 99.9%</div>
                  </div>
                  <div className="bg-white/5 border border-border/40 p-3.5 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Total Requests</div>
                    <div className="text-xl font-semibold text-foreground mt-1">1,248,390</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">Past 24 hours</div>
                  </div>
                  <div className="bg-white/5 border border-border/40 p-3.5 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Routing Cost Saved</div>
                    <div className="text-xl font-semibold text-foreground mt-1">$489.15</div>
                    <div className="text-[9px] text-green-400 mt-0.5">Estimated via model mapping</div>
                  </div>
                </div>

                {/* Progress bar visual metrics */}
                <div className="space-y-3">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold border-b border-border/30 pb-1.5">Model Load Distribution</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#a19d98] mb-1">
                        <span>GPT-4o (OpenAI)</span>
                        <span>55%</span>
                      </div>
                      <div className="w-full bg-[#161310]/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#a19d98] mb-1">
                        <span>Claude 3.5 Sonnet (Anthropic)</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-[#161310]/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500/80 h-full rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-[#a19d98] mb-1">
                        <span>DeepSeek Coder (DeepSeek)</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-[#161310]/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500/80 h-full rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
