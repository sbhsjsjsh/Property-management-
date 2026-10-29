import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Delicacy Property | Luxury Residences in Mumbai',
  description: 'Discover Mumbai\'s most exclusive luxury real estate. Curated sea-facing penthouses, villas, and estates in Worli, Bandra, and beyond. Delicacy Property - The Standard in Mumbai Living.',
  openGraph: {
    title: 'Delicacy Property | Luxury Residences in Mumbai',
    description: 'Discover Mumbai\'s most exclusive luxury real estate. Curated sea-facing penthouses, villas, and estates in Worli, Bandra, and beyond. Delicacy Property - The Standard in Mumbai Living.',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delicacy Property | Luxury Residences in Mumbai',
    description: 'Discover Mumbai\'s most exclusive luxury real estate. Curated sea-facing penthouses, villas, and estates in Worli, Bandra, and beyond. Delicacy Property - The Standard in Mumbai Living.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
