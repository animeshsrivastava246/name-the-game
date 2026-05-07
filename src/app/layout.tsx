// app/layout.tsx
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://name-the-game.vercel.app"),
  title: "NameTheGame",
  description: "A community to identify games from photos or description.",
  openGraph: {
    title: "NameTheGame",
    description: "A community to identify games from photos or description.",
    url: "https://name-the-game.vercel.app/",
    siteName: "NameTheGame",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NameTheGame",
    description: "A community to identify games from photos or description.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
