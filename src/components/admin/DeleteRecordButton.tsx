"use client";
import type { ComponentProps } from "react";
export function DeleteRecordButton({
  action,
  id,
  label,
  confirmation,
}: {
  action: NonNullable<ComponentProps<"form">["action"]>;
  id: string;
  label: string;
  confirmation: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmation)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="admin-danger-button" type="submit">
        {label}
      </button>
    </form>
  );
}
