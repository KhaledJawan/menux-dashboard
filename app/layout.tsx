import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Menux Admin",
  description: "Menux restaurant dashboard and menu management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
