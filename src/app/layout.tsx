import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { StoreProvider } from '@/providers/storeProvider'
import { ThemeProvider } from '@/providers/themeProvider'
import React from 'react'
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A modern blog application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <StoreProvider>
            {children}

            <ThemeSwitcher />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
