import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NameTheGame",
  description: "A community to identify games from photos or description.",
  metadataBase: new URL("https://name-the-game.vercel.app/"),
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
};