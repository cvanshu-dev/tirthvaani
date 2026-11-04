"use client";

import {
  deleteMediaAction,
  uploadMediaAction,
} from "@/app/admin/(panel)/media/actions";

export function DeleteMediaButton({ id }: { id: string }) {
  return (
    <form
      action={deleteMediaAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Delete this media asset? It may be used by published content.",
          )
        )
          event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="admin-delete-text" type="submit">
        Delete file
      </button>
    </form>
  );
}

export function ReplaceMediaForm({ id, kind }: { id: string; kind: string }) {
  const accept =
    kind === "IMAGE"
      ? "image/jpeg,image/png,image/webp,image/avif"
      : kind === "VIDEO"
        ? "video/mp4,video/webm"
        : "application/pdf";
  return (
    <form
      action={uploadMediaAction}
      className="admin-replace-media"
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Replace this asset? Existing content references will continue using it.",
          )
        )
          event.preventDefault();
      }}
    >
      <input type="hidden" name="replaceId" value={id} />
      <label className="admin-secondary-button">
        Replace file
        <input
          type="file"
          name="file"
          accept={accept}
          required
          onChange={(event) => event.currentTarget.form?.requestSubmit()}
        />
      </label>
    </form>
  );
}

export function CopyMediaUrl({ url }: { url: string }) {
  return (
    <button
      className="admin-icon-action"
      type="button"
      onClick={() => navigator.clipboard.writeText(url).catch(() => {})}
    >
      Copy URL
    </button>
  );
}
