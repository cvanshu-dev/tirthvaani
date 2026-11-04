import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteNavigation } from "@/components/site/SiteNavigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getSiteConfig } from "@/lib/site-config";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteConfig();
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com",
    ),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultSeoDescription,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: settings.defaultSocialImage
      ? { images: [settings.defaultSocialImage] }
      : undefined,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteConfig();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tirthvaani.com",
    description: settings.defaultSeoDescription,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
          },
        }
      : {}),
  };
  return (
    <html lang="en">
      <body
        style={
          {
            fontFamily: settings.fontFamily,
            "--site-primary": settings.primaryColor,
            "--site-accent": settings.accentColor,
          } as React.CSSProperties
        }
      >
        <SiteNavigation />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  );
}
