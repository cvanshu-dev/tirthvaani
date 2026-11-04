import "server-only";

import { getPrisma } from "@/lib/prisma";

export type SiteConfig = {
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  copyright: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  logoUrl: string;
  faviconUrl: string;
  defaultSocialImage: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
  socialX: string;
};

const defaults: SiteConfig = {
  siteName: "TirthVaani",
  tagline: "Where Sacred Journeys Find Their Meaning",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Varanasi · Gaya · Prayagraj",
  googleMapsUrl: "",
  copyright: "Created with care, for journeys that matter.",
  defaultSeoTitle: "TirthVaani — Where Sacred Journeys Find Their Meaning",
  defaultSeoDescription:
    "Thoughtful guidance for meaningful pilgrimages to Varanasi, Gaya and Prayagraj.",
  logoUrl: "",
  faviconUrl: "",
  defaultSocialImage: "",
  primaryColor: "#382f24",
  accentColor: "#a58b61",
  fontFamily: "Manrope",
  socialInstagram: "",
  socialFacebook: "",
  socialYoutube: "",
  socialX: "",
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const db = getPrisma();
  if (!db) return defaults;
  const record = await db.globalSettings.findUnique({
    where: { id: "global" },
  });
  const data = record?.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return defaults;
  const values = data as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [
      key,
      typeof values[key] === "string" ? values[key] : fallback,
    ]),
  ) as SiteConfig;
}
