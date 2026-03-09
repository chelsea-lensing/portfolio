import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Used Integration — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
