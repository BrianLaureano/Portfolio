import { Gochi_Hand, Inter } from 'next/font/google';
import './globals.css';

const hand = Gochi_Hand({
  variable: '--font-hand',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Café Aurora — torra própria, pão fresco, gente boa',
  description:
    'Cafeteria de bairro com espresso de torra própria e padaria feita na hora. Veja o cardápio, encontre a casa e reserve seu evento.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${hand.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
