import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Delicacy Property | Premium Real Estate in India',
  description: 'Explore the finest luxury residences across India. From sea-facing penthouses in Mumbai to heritage estates in Delhi, find your dream home with Delicacy Property.',
  openGraph: {
    title: 'Delicacy Property | Premium Real Estate in India',
    description: 'Explore the finest luxury residences across India. From sea-facing penthouses in Mumbai to heritage estates in Delhi, find your dream home with Delicacy Property.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delicacy Property | Premium Real Estate in India',
    description: 'Explore the finest luxury residences across India. From sea-facing penthouses in Mumbai to heritage estates in Delhi, find your dream home with Delicacy Property.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
