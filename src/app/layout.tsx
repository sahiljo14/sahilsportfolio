import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile, site, socialImage } from "@/data/profile";
import "./globals.css";
import { themeColors, themeInitScript } from "@/lib/theme";

const grotesk = localFont({
  src: "../assets/schibsted-grotesk-latin.woff2",
  variable: "--font-grotesk",
  display: "swap",
  weight: "400 900",
});
const serif = localFont({
  src: "../assets/source-serif-4-latin.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${site.url}/`),
  title: { default: site.title, template: "%s — Sahil Joshi" },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  authors: [{ name: profile.name, url: profile.github }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/`,
    siteName: "Sahil Joshi",
    title: site.title,
    description: site.description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [socialImage.url],
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: themeColors.light,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    alumniOf: "MIT World Peace University",
    worksFor: {
      "@type": "Organization",
      name: "Kramiva Technologies Pvt Ltd",
      url: profile.kramiva,
    },
    sameAs: [profile.github],
    image: `${site.url}/images/sahil-portrait.webp`,
  };
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable}`}
      data-theme="system"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
