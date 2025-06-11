import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'AI-Enhanced Interactive Periodic Table | HayHuntDB.Online',
  description: 'Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations. Perfect for chemistry education and research.',
  keywords: [
    'periodic table',
    'chemistry',
    'elements',
    'AI chemistry',
    'IUPAC',
    'education',
    'interactive',
    'chemical properties',
    'atomic data',
    'HayHuntDB'
  ],
  authors: [{ name: 'HayHuntDB.Online', url: 'https://hayhuntdb.online' }],
  creator: 'HayHuntDB.Online',
  publisher: 'HayHuntDB.Online',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hayhuntdb.online',
    title: 'AI-Enhanced Interactive Periodic Table',
    description: 'Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations.',
    siteName: 'HayHuntDB.Online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI-Enhanced Interactive Periodic Table',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Enhanced Interactive Periodic Table',
    description: 'Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations.',
    images: ['/og-image.png'],
    creator: '@hayhuntdb',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'education',
  classification: 'Chemistry Education Tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AI-Enhanced Interactive Periodic Table",
              "description": "Professional interactive periodic table with AI-powered insights, compliant with IUPAC 2016 recommendations.",
              "url": "https://hayhuntdb.online",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "HayHuntDB.Online",
                "url": "https://hayhuntdb.online"
              }
            })
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <header className="sr-only">
            <h1>AI-Enhanced Interactive Periodic Table by HayHuntDB.Online</h1>
          </header>
          <main>
            {children}
          </main>
          <footer className="sr-only">
            <p>Powered by HayHuntDB.Online - Advanced Chemical Database Solutions</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}