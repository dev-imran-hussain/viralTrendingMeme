import { Metadata } from "next";

// SEO Fix: Contact page is "use client" so it can't export metadata.
// This layout provides the metadata for the /contact route.
export const metadata: Metadata = {
  title: "Contact Us | ViralTrendingMemes - Feedback & Support",
  description:
    "Have feedback, found a bug, or want to request content removal? Contact the ViralTrendingMemes team. We'd love to hear from you!",
  openGraph: {
    title: "Contact Us | ViralTrendingMemes",
    description:
      "Get in touch with the ViralTrendingMemes team for feedback, bug reports, or content removal requests.",
    url: "https://viraltrendingmemes.com/contact",
    siteName: "ViralTrendingMemes",
    type: "website",
  },
  alternates: {
    canonical: "https://viraltrendingmemes.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
