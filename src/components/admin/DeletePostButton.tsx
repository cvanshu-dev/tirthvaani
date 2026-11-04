"use client";

import { deletePostAction } from "@/app/admin/(panel)/posts/actions";

export function DeletePostButton({ id }: { id: string }) {
  return (
    <form
      action={deletePostAction}
      onSubmit={(event) => {
        if (
          !window.confirm(
            "Delete this post permanently? This also removes its page placements.",
          )
        )
          event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="admin-danger-button" type="submit">
        Delete post
      </button>
    </form>
  );
}
