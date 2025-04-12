"use client";
import { ThemeProvider } from "@emotion/react";
// import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import theme from "./muiTheme";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "NameTheGame",
// 	description: "A community to identify games from photos or description.",
// 	metadataBase: new URL("https://name-the-game.vercel.app/"),
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={theme}>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ThemeProvider>
	);
}
