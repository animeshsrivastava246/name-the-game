// app/layout.tsx
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Outfit, Cinzel } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata = {
  metadataBase: new URL("https://name-the-game.vercel.app"),
  title: "NameTheGame | Immersive Garden",
  description: "A community to identify games from photos or descriptions.",
  openGraph: {
    title: "NameTheGame | Immersive Garden",
    description: "A community to identify games from photos or descriptions.",
    url: "https://name-the-game.vercel.app/",
    siteName: "NameTheGame",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NameTheGame",
    description: "A community to identify games from photos or descriptions.",
  },
  icons: {
    icon: "/icon.png",
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
      <body className={`${outfit.variable} ${cinzel.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
