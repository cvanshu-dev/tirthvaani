import { Navigation, type NavigationLink } from "@/components/site";

const navigationItems: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Rituals",
    href: "/services",
    children: [
      { label: "Pitru Karyas", href: "/pitru-rituals" },
      { label: "Dev Karyas", href: "/dev-rituals" },
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Varanasi", href: "/destinations/varanasi" },
      { label: "Gaya", href: "/destinations/gaya" },
      { label: "Prayagraj", href: "/destinations/prayagraj" },
    ],
  },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export async function SiteNavigation() {
  return (
    <Navigation
      items={navigationItems}
      brandName="TirthVaani"
      logoUrl={undefined}
    />
  );
}