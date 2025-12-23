import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";


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
  icons: {
    icon: "/images/Core_Icon.png",
    shortcut: "/images/Core_Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="max-w-full overflow-x-hidden overscroll-x-none">
      <body
        className={`${montserratRegular.variable} ${montserratBold.variable} bg-[#030303] text-white antialiased overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
