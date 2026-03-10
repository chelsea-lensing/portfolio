import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happypillar Native App — Chelsea Lensing",
  openGraph: {
    images: [{ url: "/images/case-studies/happypillar/Happypillar_hero.jpg" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
