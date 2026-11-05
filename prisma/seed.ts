import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be set before seeding the CMS database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const permissionDescriptions: Record<string, string> = {
  "dashboard:read": "View the CMS dashboard",
  "posts:read": "View editorial content",
  "posts:write": "Create and edit editorial drafts",
  "posts:publish": "Publish and schedule editorial content",
  "pages:read": "View website pages and assignments",
  "pages:write": "Create and edit website pages and sections",
  "services:read": "View services",
  "services:write": "Create and edit services",
  "seo:manage": "Manage technical and editorial SEO settings",
  "media:manage": "Upload and manage media assets",
  "menus:manage": "Manage navigation menus",
  "settings:manage": "Manage global website settings",
  "users:manage": "Manage users, roles and permissions",
  "activity:read": "View activity logs",
};

const rolePermissions: Record<string, string[]> = {
  SUPER_ADMIN: Object.keys(permissionDescriptions),
  ADMIN: Object.keys(permissionDescriptions).filter(
    (permission) => permission !== "users:manage",
  ),
  EDITOR: [
    "dashboard:read",
    "posts:read",
    "posts:write",
    "posts:publish",
    "pages:read",
    "pages:write",
    "services:read",
    "services:write",
    "media:manage",
    "seo:manage",
    "activity:read",
  ],
  AUTHOR: ["dashboard:read", "posts:read", "posts:write"],
  SEO_MANAGER: [
    "dashboard:read",
    "posts:read",
    "pages:read",
    "services:read",
    "seo:manage",
  ],
};

const roleNames: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  AUTHOR: "Author",
  SEO_MANAGER: "SEO Manager",
};

const pages = [
  ["Home", ""],
  ["About", "about"],

 
 
  ["Travel Assistance", "travel-assistance"],
  ["Journal", "journal"],
  ["Contact", "contact"],
  ["Pitru Rituals", "pitru-rituals"],
  ["Dev Rituals", "dev-rituals"],
] as const;

const pitruArticleExcerpt =
  "A thoughtful guide to Pitru Karya in Varanasi: understand Pind Daan, Shraddha, Tarpanam, family traditions, and how to prepare for an ancestral observance in Kashi.";

const pitruArticleBody = `## Pitru Karya in Kashi: a guide to remembrance

For many Hindu families, Pitru Karya is a way to remember ancestors and express gratitude for the generations before them. Varanasi, also known as Kashi, has been an important place of pilgrimage for centuries. Families come to the city to perform ancestral observances by the Ganga and to seek guidance from a priest familiar with their tradition.

The customs followed can vary by region, family, community, and the occasion. This guide offers general context; it is not a substitute for the guidance of your family priest or a knowledgeable Vedic purohit.

## Why do families perform Pitru Karya in Varanasi?

Kashi holds a special place in many religious traditions as a city of pilgrimage and liberation. The river, the ghats, and the presence of long-standing centres of learning create a setting in which many families choose to honour their ancestors. Some devotees believe that rites performed here carry particular spiritual significance. Beliefs and practices differ, so families may approach the observance in different ways.

The most important first step is to understand what your own family tradition calls for. A priest can help you identify the appropriate rite, explain its sequence, and make space for the details that matter to your family.

## Common ancestral observances

### Pind Daan

Pind Daan is an offering made as part of ancestral rites. The materials, mantras, and sequence may differ according to the custom being followed. Families often ask the purohit to explain each step before the ceremony begins.

### Shraddha

Shraddha refers to rites performed with reverence for departed family members. It may be observed on a particular date or occasion according to family practice, regional custom, and guidance from a priest.

### Tarpanam

Tarpanam is an offering made with water and prayers. The people remembered and the manner of offering depend on the family tradition and the specific observance.

Other rites, including Tripindi Shraddh or Narayan Bali, may be recommended in particular circumstances. These ceremonies are not interchangeable. Discuss your situation with a trusted priest before deciding which observance is suitable.

## How to prepare for a ceremony

Before travelling, gather the details your purohit may need: the names of the family members being remembered, your family’s customary practices, and any dates or instructions already given by your elders or priest. If you are unsure about a detail, say so; do not guess.

Ask in advance what the ceremony includes, how long it is expected to take, what materials are provided, and whether family members should bring anything. Confirm the meeting point and the complete cost before you travel. Wear clothing appropriate for the ritual and allow enough time to reach the ghat without rushing.

## What to expect on the day

Your purohit should explain the sequence and guide you through the prayers and offerings. Some parts may be performed by the family, while the priest recites mantras and gives instructions. The exact ceremony depends on the rite selected and the traditions being observed.

You can ask questions before the ritual begins. If a custom is unfamiliar, request a plain explanation. A respectful ceremony should give your family enough time to understand what is happening and participate as appropriate.

## Questions to ask your purohit

- Which rite is appropriate for our family and why?
- What information should we bring for the sankalpa?
- What is included in the ceremony and what is the full cost?
- How long should we plan to be at the ghat?
- Are there any preparations or materials we need to arrange ourselves?

## A personal observance, guided with care

Pitru Karya is deeply personal. Families may follow different customs, and no single description can represent every tradition. Take time to speak with your family, understand the observance being arranged, and choose a purohit who answers your questions clearly.

If you are planning ancestral rites in Kashi, [speak with TirthVaani](/contact?interest=pitru-karya) for help understanding the arrangements and finding guidance for your family’s tradition.`;

const originalPitruArticleBody = `## A place of remembrance

Varanasi, or Kashi, has long been a place where families gather to honour their ancestors. The rites and customs followed can differ by family and region.

## Understanding the observance

Pind Daan, Shraddha and Tarpanam are among the ancestral observances people come to Kashi to perform. A trusted priest can explain the steps, materials and customary timing for your family.

## Preparing for your visit

Before travelling, discuss your family tradition and the observance you have in mind with your purohit. Ask what is included, how long the ceremony may take, and what you should bring.`;

async function seedRoles() {
  const permissionRecords = await Promise.all(
    Object.entries(permissionDescriptions).map(([key, description]) =>
      prisma.permission.upsert({
        where: { key },
        update: { description },
        create: { key, description },
      }),
    ),
  );

  for (const [key, name] of Object.entries(roleNames)) {
    const existing = await prisma.role.findUnique({ where: { key } });
    const role =
      existing ??
      (await prisma.role.create({ data: { key, name, system: true } }));
    if (!existing) {
      const permissions = new Set(rolePermissions[key]);
      await prisma.rolePermission.createMany({
        data: permissionRecords
          .filter((permission) => permissions.has(permission.key))
          .map((permission) => ({
            roleId: role.id,
            permissionId: permission.id,
          })),
      });
    }
  }
}

async function seedPages() {
  for (const [title, slug] of pages) {
    await prisma.page.upsert({
      where: { slug },
      update: {},
      create: { title, slug, status: "PUBLISHED" },
    });
  }
}

async function seedMenus() {
  const mainMenu = await prisma.menu.upsert({
    where: { location: "header" },
    update: {},
    create: { name: "Header navigation", location: "header" },
  });

  if ((await prisma.menuItem.count({ where: { menuId: mainMenu.id } })) === 0) {
    await prisma.menuItem.createMany({
      data: [
        {
          label: "Our story",
          href: "/about",
          position: 0,
          menuId: mainMenu.id,
        },
        {
          label: "Rituals",
          href: "/pitru-rituals",
          position: 1,
          menuId: mainMenu.id,
        },
        {
          label: "Sacred places",
          href: "/destinations",
          position: 2,
          menuId: mainMenu.id,
        },
        {
          label: "Travel",
          href: "/travel-assistance",
          position: 3,
          menuId: mainMenu.id,
        },
        {
          label: "Journal",
          href: "/journal",
          position: 4,
          menuId: mainMenu.id,
        },
        {
          label: "Contact",
          href: "/contact",
          position: 5,
          menuId: mainMenu.id,
        },
      ],
    });
  }

  const footerMenu = await prisma.menu.upsert({
    where: { location: "footer" },
    update: {},
    create: { name: "Footer navigation", location: "footer" },
  });
  if (
    (await prisma.menuItem.count({ where: { menuId: footerMenu.id } })) === 0
  ) {
    await prisma.menuItem.createMany({
      data: [
        {
          label: "Rituals",
          href: "/services",
          position: 0,
          menuId: footerMenu.id,
        },
        {
          label: "Destinations",
          href: "/destinations",
          position: 1,
          menuId: footerMenu.id,
        },
        {
          label: "Journal",
          href: "/journal",
          position: 2,
          menuId: footerMenu.id,
        },
        {
          label: "Contact",
          href: "/contact",
          position: 3,
          menuId: footerMenu.id,
        },
      ],
    });
  }

  await prisma.globalSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      data: {
        siteName: "TirthVaani",
        tagline: "Where Sacred Journeys Find Their Meaning.",
        defaultSeoTitle:
          "TirthVaani — Where Sacred Journeys Find Their Meaning",
        maintenanceMode: false,
      },
    },
  });
}

async function seedSuperAdmin() {
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    console.warn(
      "Admin bootstrap skipped. Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD to create the first Super Admin.",
    );
    return;
  }

  if (password.length < 14) {
    throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be at least 14 characters.");
  }

  const role = await prisma.role.findUniqueOrThrow({
    where: { key: "SUPER_ADMIN" },
  });
  const name = process.env.ADMIN_BOOTSTRAP_NAME?.trim() || "Site Administrator";
  const passwordHash = await hashPassword(password);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.info(`Admin bootstrap skipped; ${email} already exists.`);
    return;
  }
  await prisma.user.create({
    data: { name, email, passwordHash, roleId: role.id },
  });
}

async function seedPitruReferencePost() {
  const page = await prisma.page.findUnique({
    where: { slug: "pitru-rituals" },
  });
  const category = await prisma.category.upsert({
    where: { slug: "pitru-rituals" },
    update: { name: "Pitru Rituals" },
    create: {
      name: "Pitru Rituals",
      slug: "pitru-rituals",
      description: "Ancestral rites, Pind Daan, Shraddha and Tarpanam.",
    },
  });
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const author = email
    ? await prisma.user.findUnique({ where: { email } })
    : null;

  if (!page || !author) {
    console.info(
      "Pitru reference article skipped; seed the page and bootstrap administrator first.",
    );
    return;
  }

  const media = await prisma.mediaAsset.upsert({
    where: { key: "external/pitru-karyas-varanasi-reference" },
    update: {
      url: "https://www.tirthpurohit.org/public/upload/1774603598_WhatsApp-Image-2021-05-18-at-21.54.47-300x400.jpeg",
      alt: "Traditional Pitru Karya observance in Varanasi",
      caption: "Pitrukaryas in Varanasi",
    },
    create: {
      key: "external/pitru-karyas-varanasi-reference",
      url: "https://www.tirthpurohit.org/public/upload/1774603598_WhatsApp-Image-2021-05-18-at-21.54.47-300x400.jpeg",
      filename: "pitru-karyas-varanasi-reference.jpeg",
      mimeType: "image/jpeg",
      kind: "IMAGE",
      bytes: BigInt(0),
      width: 300,
      height: 400,
      alt: "Traditional Pitru Karya observance in Varanasi",
      caption: "Pitrukaryas in Varanasi",
      folder: "/reference",
    },
  });

  const postData = {
    title: "Pitrukaryas in Varanasi",
    slug: "pitrukaryas-in-varanasi",
    excerpt: pitruArticleExcerpt,
    content: { format: "plain-text-v1", text: pitruArticleBody },
    status: "PUBLISHED",
    featured: true,
    publishedAt: new Date(),
    readingMinutes: 7,
    authorId: author.id,
    featuredMediaId: media.id,
  } satisfies Prisma.PostUncheckedCreateInput;
  const existingPost = await prisma.post.findUnique({
    where: { slug: postData.slug },
  });
  const existingText =
    existingPost?.content &&
    typeof existingPost.content === "object" &&
    !Array.isArray(existingPost.content) &&
    "text" in existingPost.content
      ? String(existingPost.content.text)
      : "";
  const post = !existingPost
    ? await prisma.post.create({ data: postData })
    : existingText === originalPitruArticleBody
      ? await prisma.post.update({
          where: { id: existingPost.id },
          data: {
            excerpt: postData.excerpt,
            content: postData.content,
            readingMinutes: postData.readingMinutes,
          },
        })
      : existingPost;

  await prisma.postCategory.upsert({
    where: { postId_categoryId: { postId: post.id, categoryId: category.id } },
    update: {},
    create: { postId: post.id, categoryId: category.id },
  });
  await prisma.contentAssignment.upsert({
    where: {
      pageId_postId_slot: {
        pageId: page.id,
        postId: post.id,
        slot: "after-hero",
      },
    },
    update: { visible: true, position: 0 },
    create: {
      pageId: page.id,
      postId: post.id,
      slot: "after-hero",
      visible: true,
      position: 0,
    },
  });
}

async function main() {
  await seedRoles();
  await seedPages();
  await seedMenus();
  await seedSuperAdmin();
  await seedPitruReferencePost();
  console.info("TirthVaani CMS roles, page records and settings are ready.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
