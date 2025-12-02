import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserratRegular = Montserrat({
  variable: "--font-montserrat-regular",
  subsets: ["latin"],
  weight: "400",
});

const montserratBold = Montserrat({
  variable: "--font-montserrat-bold",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Core Studio - Graphic Designer",
  description:
    "Portfolio e landing page per presentare servizi di branding, art direction ed editorial design di Gabrio Rinaldi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratRegular.variable} ${montserratBold.variable} bg-[#030303] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
