import type { Metadata } from 'next'
import "./globals.css";
 
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
  params: {lang}
}: Readonly<{
  children: React.ReactNode;
  params: {lang: string};
}>) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
