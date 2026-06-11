import type { Metadata } from 'next'
import { Inter, Rajdhani } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ui/ChatWidget'
import { ParticleBackground } from '@/components/ui/ParticleBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const BASE_URL = 'https://msgko.net'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'MSG Knight Online — Eğitim Videoları',
    template: '%s | MSG Knight Online',
  },
  description:
    'Asas ve Okçu karakterler için en güncel, kapsamlı Knight Online eğitim videoları. PK taktikleri, farm rotaları, skill kombo rehberleri.',
  keywords: [
    'Knight Online',
    'Asas eğitim',
    'Okçu eğitim',
    'PK taktikleri',
    'farm rotaları',
    'skill kombo',
    'KO rehber',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: BASE_URL,
    siteName: 'MSG Knight Online',
    title: 'MSG Knight Online — Eğitim Videoları',
    description:
      'Asas ve Okçu karakterler için en güncel, kapsamlı Knight Online eğitim videoları.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSG Knight Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSG Knight Online — Eğitim Videoları',
    description:
      'Asas ve Okçu karakterler için en güncel, kapsamlı Knight Online eğitim videoları.',
    images: ['/og-image.png'],
  },
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
  alternates: {
    canonical: BASE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MSG Knight Online',
  url: BASE_URL,
  description:
    'Asas ve Okçu karakterler için en güncel, kapsamlı Knight Online eğitim videoları.',
  publisher: {
    '@type': 'Organization',
    name: 'MSG Knight Online',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
    },
    sameAs: [
      'https://www.youtube.com/@musaagll',
      'https://www.instagram.com/msgclip/',
    ],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/ara?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${rajdhani.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#07070B] text-white antialiased">
        <ParticleBackground />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
