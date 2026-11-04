import { duplicatePostAction } from "@/app/admin/(panel)/posts/actions";

export function DuplicatePostButton({ id }: { id: string }) {
  return (
    <form action={duplicatePostAction}>
      <input type="hidden" name="id" value={id} />
      <button className="admin-secondary-button" type="submit">
        Duplicate post
      </button>
    </form>
  );
}
