import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade In Integration — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
