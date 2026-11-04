import { restorePostRevisionAction } from "@/app/admin/(panel)/posts/actions";

export function PostRevisionHistory({
  revisions,
}: {
  revisions: { id: string; createdAt: Date; note: string | null }[];
}) {
  return (
    <section className="admin-panel admin-revision-history">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-kicker">REVISION HISTORY</p>
          <h2>Earlier versions</h2>
        </div>
      </div>
      {revisions.length ? (
        <div className="admin-list">
          {revisions.map((revision) => (
            <div className="admin-list-row" key={revision.id}>
              <span>
                <strong>{revision.note || "Saved version"}</strong>
                <small>{revision.createdAt.toLocaleString()}</small>
              </span>
              <form action={restorePostRevisionAction}>
                <input type="hidden" name="revisionId" value={revision.id} />
                <button className="admin-secondary-button" type="submit">
                  Restore
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="admin-empty-state">
          Saved versions will appear here after the first edit.
        </p>
      )}
    </section>
  );
}
