import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-card/95 backdrop-blur-md border-t border-border px-4 md:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground text-center sm:text-left">
        By continuing to use this site, you agree to our terms and policies.{' '}
        <a href="#" className="text-primary hover:underline">Learn more</a>
      </p>
      <button
        onClick={accept}
        className="shrink-0 px-6 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity cursor-pointer"
      >
        Accept
      </button>
    </div>
  );
}
