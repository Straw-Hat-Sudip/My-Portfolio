import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/animation/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sudippatra.dev"),
  title: "Sudip Patra | Full Stack MERN Developer & AI Builder",
  description:
    "Award-caliber portfolio of Sudip Patra — Full Stack MERN Developer building intelligent web applications, Google Gemini AI pipelines, and Razorpay e-commerce platforms.",
  keywords: [
    "Sudip Patra",
    "Full Stack MERN Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Google Gemini API",
    "Razorpay",
    "Singur",
    "India",
  ],
  authors: [{ name: "Sudip Patra", url: "https://github.com/Straw-Hat-Sudip" }],
  openGraph: {
    title: "Sudip Patra | Full Stack MERN Developer & AI Builder",
    description:
      "Award-caliber developer portfolio of Sudip Patra — Full-Stack MERN Developer building intelligent web applications, Gemini AI integrations, and real-world software architectures.",
    images: [
      {
        url: "/images/sudip-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sudip Patra",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#030303] text-[#f8fafc] font-sans overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
