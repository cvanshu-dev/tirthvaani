import Image from "next/image";
import {
  uploadMediaAction,
  updateMediaAction,
} from "@/app/admin/(panel)/media/actions";
import {
  CopyMediaUrl,
  DeleteMediaButton,
  ReplaceMediaForm,
} from "@/components/admin/MediaActions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { getObjectStorage } from "@/lib/storage";

export const metadata = {
  title: "Media library",
  robots: { index: false, follow: false },
};
function formatSize(bytes: bigint) {
  const value = Number(bytes);
  return value > 1024 * 1024
    ? `${(value / 1024 / 1024).toFixed(1)} MB`
    : `${(value / 1024).toFixed(0)} KB`;
}

export default async function MediaPage({
  searchParams,
}: PageProps<"/admin/media">) {
  await requirePermission("media:manage");
  const query = await searchParams;
  const search = typeof query.q === "string" ? query.q.trim() : "";
  const folder = typeof query.folder === "string" ? query.folder.trim() : "";
  const kind = typeof query.kind === "string" ? query.kind : "";
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">Connect the database to browse media.</p>
    );
  const storageReady = Boolean(getObjectStorage());
  const [media, folders, aggregate] = await Promise.all([
    db.mediaAsset.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { filename: { contains: search, mode: "insensitive" } },
                { alt: { contains: search, mode: "insensitive" } },
                { caption: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(folder ? { folder } : {}),
        ...(kind && ["IMAGE", "VIDEO", "DOCUMENT", "OTHER"].includes(kind)
          ? { kind: kind as "IMAGE" | "VIDEO" | "DOCUMENT" | "OTHER" }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    db.mediaAsset.findMany({
      distinct: ["folder"],
      select: { folder: true },
      orderBy: { folder: "asc" },
    }),
    db.mediaAsset.aggregate({ _count: true, _sum: { bytes: true } }),
  ]);
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">ASSETS</p>
          <h1>Media library</h1>
          <p>
            {aggregate._count} assets ·{" "}
            {formatSize(aggregate._sum.bytes ?? BigInt(0))} stored
          </p>
        </div>
      </div>
      {!storageReady && (
        <div className="admin-setup-notice">
          <h2>Configure object storage to upload files</h2>
          <p>
            Set S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID,
            S3_SECRET_ACCESS_KEY and S3_PUBLIC_URL. Use an S3 compatible bucket
            with a public delivery domain or CDN.
          </p>
        </div>
      )}
      <section className="admin-panel admin-editor-card admin-upload-card">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-kicker">UPLOAD</p>
            <h2>Upload an asset</h2>
          </div>
        </div>
        <form action={uploadMediaAction} className="admin-upload-form">
          <label className="admin-field">
            <span>Image (JPEG, PNG, WebP, AVIF), video (MP4, WebM) or PDF</span>
            <input
              type="file"
              name="file"
              required
              accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,application/pdf"
              disabled={!storageReady}
            />
          </label>
          <div className="admin-field-row">
            <label className="admin-field">
              <span>Alt text</span>
              <input
                className="admin-input"
                name="alt"
                maxLength={300}
                placeholder="Describe the image for screen readers"
              />
            </label>
            <label className="admin-field">
              <span>Folder</span>
              <input
                className="admin-input"
                name="folder"
                maxLength={120}
                defaultValue="/"
                placeholder="rituals/varanasi"
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Caption</span>
            <input className="admin-input" name="caption" maxLength={500} />
          </label>
          <button
            className="admin-primary-button"
            type="submit"
            disabled={!storageReady}
          >
            Upload and optimize
          </button>
          <p className="admin-help-text">
            Images are validated and converted to WebP (max 20 MB). Videos are
            limited to 100 MB; PDF documents to 25 MB.
          </p>
        </form>
      </section>
      <section className="admin-panel admin-media-library">
        <form className="admin-filter-bar">
          <label className="admin-search-field">
            <input
              name="q"
              defaultValue={search}
              placeholder="Search filename, alt text or caption"
            />
          </label>
          <select className="admin-input" name="kind" defaultValue={kind}>
            <option value="">All file types</option>
            <option value="IMAGE">Images</option>
            <option value="VIDEO">Videos</option>
            <option value="DOCUMENT">Documents</option>
          </select>
          <select className="admin-input" name="folder" defaultValue={folder}>
            <option value="">All folders</option>
            {folders.map((item) => (
              <option value={item.folder} key={item.folder}>
                {item.folder}
              </option>
            ))}
          </select>
          <button className="admin-secondary-button" type="submit">
            Filter
          </button>
        </form>
        <div className="admin-media-grid">
          {media.map((asset) => (
            <article className="admin-media-card" key={asset.id}>
              <div className="admin-media-preview">
                {asset.kind === "IMAGE" ? (
                  <Image
                    src={asset.url}
                    alt={asset.alt || asset.filename}
                    width={450}
                    height={300}
                    unoptimized
                  />
                ) : asset.kind === "VIDEO" ? (
                  <video src={asset.url} controls preload="metadata" />
                ) : (
                  <a href={asset.url} target="_blank" rel="noreferrer">
                    PDF document ↗
                  </a>
                )}
              </div>
              <div className="admin-media-meta">
                <strong>{asset.filename}</strong>
                <small>
                  {asset.kind} · {formatSize(asset.bytes)}
                  {asset.width && asset.height
                    ? ` · ${asset.width}×${asset.height}`
                    : ""}
                </small>
                <small>{asset.folder}</small>
              </div>
              <form action={updateMediaAction} className="admin-media-edit">
                <input type="hidden" name="id" value={asset.id} />
                <label>
                  <span>Filename</span>
                  <input
                    name="filename"
                    defaultValue={asset.filename}
                    required
                    maxLength={120}
                  />
                </label>
                <label>
                  <span>Alt text</span>
                  <input name="alt" defaultValue={asset.alt} maxLength={300} />
                </label>
                <label>
                  <span>Caption</span>
                  <input
                    name="caption"
                    defaultValue={asset.caption}
                    maxLength={500}
                  />
                </label>
                <label>
                  <span>Folder</span>
                  <input
                    name="folder"
                    defaultValue={asset.folder}
                    maxLength={120}
                  />
                </label>
                <button className="admin-secondary-button" type="submit">
                  Save details
                </button>
              </form>
              <div className="admin-media-actions">
                <CopyMediaUrl url={asset.url} />
                {storageReady && (
                  <ReplaceMediaForm id={asset.id} kind={asset.kind} />
                )}
                <DeleteMediaButton id={asset.id} />
              </div>
            </article>
          ))}
        </div>
        {media.length === 0 && (
          <p className="admin-empty-state">
            No media matches. Upload an asset when storage is configured.
          </p>
        )}
      </section>
    </div>
  );
}
