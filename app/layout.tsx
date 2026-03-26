import type {Metadata} from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'AHI Promociones | Financiación para Promotoras',
  description: 'Ayudamos a promotoras inmobiliarias a estructurar la financiación de sus proyectos para que las operaciones salgan adelante.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${space.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased bg-white text-[#0A192F] selection:bg-[#0A192F] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
