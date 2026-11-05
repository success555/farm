import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/lib/cart-context';
import StoreShell from '@/components/StoreShell';

export const metadata: Metadata = {
  title: 'Doutare Agro Farm Limited | High-Yield Plantain Suckers & Wholesale Agro Produce',
  description:
    'Commercial agriculture in Ayakoromo, Burutu LGA, Delta State. Buy bio-treated plantain suckers, yellow garri, fresh/smoked catfish, maize, and poultry wholesale.',
  keywords: [
    'Plantain suckers Delta State',
    'Ayakoromo farm Burutu',
    'Yellow Garri wholesale Nigeria',
    'Catfish fingerlings Delta',
    'Doutare Agro Farm Limited',
    'Commercial farming Nigeria',
  ],
};

const DEFAULT_CLERK_KEY = 'pk_test_dXAta2FuZ2Fyb28tMTA5MS5jbGVyay5hY2NvdW50cy5kZXYk';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder')
      ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      : DEFAULT_CLERK_KEY;

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <html lang="en" className="scroll-smooth">
        <body className="font-sans antialiased text-gray-900 bg-slate-50">
          <CartProvider>
            <StoreShell>{children}</StoreShell>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
