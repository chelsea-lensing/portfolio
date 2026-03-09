import type { Metadata } from "next";
import { Poiret_One, Public_Sans } from "next/font/google";
import "./globals.css";

const poiretOne = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret-one",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-public-sans-src",
});

export const metadata: Metadata = {
  title: "Chelsea Lensing — Senior Product Designer",
  description:
    "Senior Product Designer at Patagonia with over a decade of experience across apparel and digital product design.",
  metadataBase: new URL("https://portfolio-xi-nine-44.vercel.app"),
  openGraph: {
    images: [{ url: "/about-professional.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poiretOne.variable} ${publicSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
