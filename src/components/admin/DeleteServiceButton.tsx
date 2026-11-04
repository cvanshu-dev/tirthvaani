"use client";

import { deleteServiceAction } from "@/app/admin/(panel)/services/actions";

export function DeleteServiceButton({ id }: { id: string }) {
  return (
    <form
      action={deleteServiceAction}
      onSubmit={(event) => {
        if (!window.confirm("Permanently delete this service?"))
          event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="admin-danger-button" type="submit">
        Delete service
      </button>
    </form>
  );
}
