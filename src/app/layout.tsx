// src/app/layout.tsx
"use client";

import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import { Inter } from "next/font/google";
import theme from "./muiTheme";
// import { metadata } from "./metadata"   // only if you need it in code

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
