import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designing with AI — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/portfolio/Portfolio_Hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
