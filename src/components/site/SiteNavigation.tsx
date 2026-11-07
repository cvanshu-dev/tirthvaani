import { Navigation, type NavigationLink } from "@/components/site";



const navigationItems: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },

  { label: "Pitru Karyas", href: "/pitru-rituals" },
  { label: "Dev Karyas", href: "/dev-rituals" },
  

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