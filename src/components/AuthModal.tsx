import { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, User, Hexagon } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  // Open: close on Escape, lock background scroll, trap focus inside the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialog) return;
      const f = dialog.querySelectorAll<HTMLElement>('a[href], button, input, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialog?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully simulated ${activeTab === 'signin' ? 'Sign In' : 'Sign Up'} with: ${email}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#161310]/80 backdrop-blur-md cursor-pointer transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-[#1d1915]/95 shadow-2xl p-8 backdrop-blur-xl animate-float-medium focus:outline-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 p-1.5 rounded-full text-[#a19d98] hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <Hexagon className="w-6 h-6 text-primary" />
          </div>
          <h3 id="auth-modal-title" className="font-serif text-2xl font-medium text-foreground">Welcome to OpenCloud</h3>
          <p className="text-xs text-muted-foreground mt-1">Operate your applications with precision</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-6">
          <button 
            type="button"
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors duration-300 ${activeTab === 'signin' ? 'border-primary text-primary' : 'border-transparent text-[#a19d98] hover:text-foreground'}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors duration-300 ${activeTab === 'signup' ? 'border-primary text-primary' : 'border-transparent text-[#a19d98] hover:text-foreground'}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="space-y-1.5">
              <label htmlFor="auth-name" className="text-xs font-semibold uppercase tracking-wider text-[#a19d98]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#a19d98]" />
                <input
                  id="auth-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#161310]/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="text-xs font-semibold uppercase tracking-wider text-[#a19d98]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#a19d98]" />
              <input
                id="auth-email"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#161310]/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="auth-password" className="text-xs font-semibold uppercase tracking-wider text-[#a19d98]">Password</label>
              {activeTab === 'signin' && (
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#a19d98]" />
              <input
                id="auth-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#161310]/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6 shadow-md"
          >
            {activeTab === 'signin' ? 'Sign In to Console' : 'Create Free Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#a19d98]">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
