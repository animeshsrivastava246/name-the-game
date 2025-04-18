import { ThemeProvider } from "@emotion/react";
import "./globals.css";
import { Inter } from "next/font/google";
import theme from "./muiTheme";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</body>
		</html>
	);
}
