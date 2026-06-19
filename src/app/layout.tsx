import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "F Renish | AI/ML Engineer Portfolio",
  description:
    "Portfolio of F Renish — Aspiring AI/ML Engineer, Full Stack Developer, and Computer Science Engineering student. Building intelligent systems with AI, Machine Learning, and modern web technologies.",
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
    "F Renish",
  ],
  authors: [{ name: "F Renish" }],
  openGraph: {
    title: "F Renish | AI/ML Engineer Portfolio",
    description:
      "Aspiring AI/ML Engineer building intelligent systems with cutting-edge technology.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
