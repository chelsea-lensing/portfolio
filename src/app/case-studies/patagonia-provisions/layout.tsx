import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provisions Integration — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
