import type { Metadata } from 'next';
import '@fontsource/geist-sans';
import '@fontsource/geist-mono';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'OpenCloud | Multi-Model AI Gateway & Routing Platform',
  description:
    'OpenCloud is a unified, multi-model AI gateway that gives your applications a single stable API surface while managing provider routing, fallback logic, access controls, and traffic analytics.',
  keywords: [
    'AI gateway',
    'multi-model api',
    'openai routing',
    'deepseek proxy',
    'gemini gateway',
    'deployment platform',
    'opencloud',
  ],
  authors: [{ name: 'OpenCloud' }],
  robots: 'index, follow',
  metadataBase: new URL('https://opencloud.app'),
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'OpenCloud',
    url: '/',
    title: 'OpenCloud | Multi-Model AI Gateway & Routing Platform',
    description:
      'Unified AI gateway providing one stable API for multi-model routing, fallback logic, access control, and traffic visibility.',
    images: [
      {
        url: '/logo.png',
        alt: 'OpenCloud - Multi-Model AI Gateway',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenCloud | Multi-Model AI Gateway & Routing Platform',
    description:
      'Unified AI gateway providing one stable API for multi-model routing, fallback logic, access control, and traffic visibility.',
    images: [
      {
        url: '/logo.png',
        alt: 'OpenCloud - Multi-Model AI Gateway',
      },
    ],
  },
};

export const viewport = {
  themeColor: '#161310',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpenCloud',
  url: 'https://opencloud.app/',
  logo: 'https://opencloud.app/logo.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
