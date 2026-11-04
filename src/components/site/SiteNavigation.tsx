import { Navigation, type NavigationLink } from "@/components/site";
import { getSiteConfig } from "@/lib/site-config";

const navigationItems: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Ritual Services",
    href: "/services",
    children: [
      { label: "Pitru Karyas in Varanasi", href: "/pitru-rituals" },
      { label: "Dev Karyas in Varanasi", href: "/dev-rituals" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export async function SiteNavigation() {
  const settings = await getSiteConfig();
  return (
    <Navigation
      items={navigationItems}
      brandName={settings.siteName}
      logoUrl={settings.logoUrl}
    />
  );
}
