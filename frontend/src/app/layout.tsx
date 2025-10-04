// 1. Import a known font (e.g., Inter) from next/font/google
import { Inter } from 'next/font/google';

// 2. Configure the font
const inter = Inter({ subsets: ['latin'] });

// 3. Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 4. Apply the font className to the body tag */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}