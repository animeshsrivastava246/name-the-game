"use client";
import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { Inter } from "next/font/google";
import theme from "./muiTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Name The Game",
	description: "Your daily dose of gaming trivia",
};

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
