import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GeoRank Monster | AI Geo-Targeted Page Builder',
  description: 'Build hundreds of local SEO landing pages with AI — TurboTax-style wizard, silo architecture, and GHL lead forms.',
  keywords: ['local SEO', 'geo-targeted pages', 'page builder', 'lead generation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
