import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getSiteConfig } from "@/lib/site-config";

const fallbackLinks = [
  ["Rituals", "/services"],
  ["Destinations", "/destinations"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

export async function SiteFooter() {
  await connection();
  const db = getPrisma();
  const [menu, settings] = await Promise.all([
    db
      ? db.menu.findUnique({
          where: { location: "footer" },
          include: {
            items: { where: { enabled: true }, orderBy: { position: "asc" } },
          },
        })
      : null,
    getSiteConfig(),
  ]);
  const links = menu?.items.length
    ? menu.items.map(({ label, href, target }) => ({ label, href, target }))
    : fallbackLinks.map(([label, href]) => ({ label, href, target: "_self" }));
  const whatsAppDigits = settings.whatsapp.replace(/\D/g, "");
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Link className="brand footer-brand" href="/">
              {settings.logoUrl ? (
                <Image
                  src={settings.logoUrl}
                  alt={settings.siteName}
                  width={160}
                  height={48}
                  unoptimized
                  className="site-logo"
                />
              ) : (
                settings.siteName
              )}
              <small>{settings.tagline.toUpperCase()}</small>
            </Link>
          </div>
          <div className="site-footer-contact">
            <p>{settings.address}</p>
            {settings.phone && (
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            )}
            {settings.googleMapsUrl && (
              <a href={settings.googleMapsUrl} target="_blank" rel="noreferrer">
                Find us on the map ↗
              </a>
            )}
          </div>
          <div className="footer-links">
            {links.map(({ label, href, target }) => (
              <Link href={href} target={target} key={href}>
                {label}
              </Link>
            ))}
            {[
              ["Instagram", settings.socialInstagram],
              ["Facebook", settings.socialFacebook],
              ["YouTube", settings.socialYoutube],
              ["X", settings.socialX],
            ]
              .filter(([, href]) => href)
              .map(([label, href]) => (
                <a href={href} target="_blank" rel="noreferrer" key={href}>
                  {label}
                </a>
              ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {settings.siteName}
          </span>
          <span>{settings.copyright}</span>
        </div>
      </footer>
      {whatsAppDigits && (
        <a
          className="whatsapp"
          href={`https://wa.me/${whatsAppDigits}`}
          aria-label="Contact us on WhatsApp"
          target="_blank"
          rel="noreferrer"
        >
          ↗
        </a>
      )}
    </>
  );
}
