# TirthVaani CMS setup

## Database and first administrator

1. Create a PostgreSQL database (managed PostgreSQL is recommended for production).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, the bootstrap administrator credentials, and `NEXT_PUBLIC_SITE_URL`.
3. Run `npm run db:deploy` in production, then `npm run db:seed` once. For local schema development, run `npm run db:migrate`.
4. Sign in at `/admin/login`. The seeded Super Admin can create users and configure roles under Users & permissions.

Use encrypted database backups and verify restores regularly. Keep database credentials and the cron secret in the hosting provider's secret manager; do not commit `.env`.

## Scheduled publishing

Configure the hosting platform's scheduler to send a `POST` request to `/api/cms/publish-scheduled` at least once per minute with `Authorization: Bearer $CMS_CRON_SECRET`. The route publishes due posts, services, and pages. Without an external scheduler, scheduled content remains scheduled.

## Media storage

Set all `S3_*` variables for an S3-compatible object-storage bucket. Configure the bucket/CDN to serve `S3_PUBLIC_URL`, allow the site's origin for uploads only if required by your provider, and keep write credentials server-side. Image uploads are validated and converted to WebP. Videos and PDFs are size-limited. Do not use ephemeral serverless local storage for uploads.

## CMS content

Post and page content is stored as validated JSON/plain text with a restricted Markdown renderer. Arbitrary HTML and executable scripts are not rendered. The page builder uses predefined section components. Add a new section type by implementing a renderer and a validated configuration before exposing it in the builder.

Redirects are checked by `src/proxy.ts` for public GET/HEAD requests and cached per process for five seconds. The database connection used by the proxy needs to be low latency.

The current implementation provides authoring for posts, categories/tags, pages and reusable sections, services, media uploads (when object storage is configured), navigation, FAQs, testimonials, SEO basics, redirects, global settings, users/roles, revision snapshots, and audit activity. It still lacks revision restoration, draft preview tokens, bulk editing/import-export, and arbitrary page-builder blocks; those need to be completed before treating the CMS as a full WordPress/Sanity replacement.
