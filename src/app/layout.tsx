import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from '@privy-io/react-auth';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Legalo - Your Pocket Rights Navigator",
  description: "Provides easily accessible and understandable legal rights information and actionable guidance for everyday situations within a Farcaster frame.",
  openGraph: {
    title: "Legalo - Your Pocket Rights Navigator",
    description: "Get instant access to legal rights information and dispute resolution templates",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legalo - Your Pocket Rights Navigator",
    description: "Get instant access to legal rights information and dispute resolution templates",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            appearance: {
              theme: 'light',
              accentColor: '#4F46E5',
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}
        >
          {children}
        </PrivyProvider>
        <Analytics />
      </body>
    </html>
  );
}
