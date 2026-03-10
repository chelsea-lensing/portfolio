import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Navigation Redesign — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/navigation-redesign/Patagonia_Nav_Hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
