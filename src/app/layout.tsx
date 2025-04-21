import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { Inter } from "next/font/google";
import theme from "./muiTheme";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
  const metadata = {
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
  };

	return (
		<html lang="en">
			<Head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<meta property="og:title" content={metadata.openGraph.title} />
				<meta property="og:description" content={metadata.openGraph.description} />
				<meta property="og:url" content={metadata.openGraph.url} />
				<meta property="og:site_name" content={metadata.openGraph.siteName} />
				<meta property="og:type" content={metadata.openGraph.type} />
				<meta name="twitter:card" content={metadata.twitter.card} />
				<meta name="twitter:title" content={metadata.twitter.title} />
				<meta name="twitter:description" content={metadata.twitter.description} />
			</Head>
			<body className={inter.className}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</body>
		</html>
	);
}
