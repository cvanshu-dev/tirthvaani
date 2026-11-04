import {
  createRoleAction,
  createUserAction,
  saveRolePermissionsAction,
  setUserActiveAction,
} from "@/app/admin/(panel)/users/actions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Users and roles",
  robots: { index: false, follow: false },
};
export default async function UsersPage() {
  await requirePermission("users:manage");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage access.
      </p>
    );
  const [users, roles, permissions] = await Promise.all([
    db.user.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    db.role.findMany({
      include: { permissions: true, _count: { select: { users: true } } },
      orderBy: { name: "asc" },
    }),
    db.permission.findMany({ orderBy: { key: "asc" } }),
  ]);
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">ADMINISTRATION</p>
          <h1>Users & permissions</h1>
          <p>Manage sign-in access and assign server-enforced capabilities.</p>
        </div>
      </div>
      <div className="admin-user-grid">
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">ACCESS</p>
              <h2>Create user</h2>
            </div>
          </div>
          <form action={createUserAction} className="admin-taxonomy-form">
            <label className="admin-field">
              <span>Name</span>
              <input
                className="admin-input"
                name="name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label className="admin-field">
              <span>Email</span>
              <input
                className="admin-input"
                name="email"
                type="email"
                required
                maxLength={254}
              />
            </label>
            <label className="admin-field">
              <span>Role</span>
              <select className="admin-input" name="roleId" required>
                {roles.map((role) => (
                  <option value={role.id} key={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Temporary password (14 characters minimum)</span>
              <input
                className="admin-input"
                name="password"
                type="password"
                required
                minLength={14}
                maxLength={256}
                autoComplete="new-password"
              />
            </label>
            <button className="admin-primary-button" type="submit">
              Create user
            </button>
          </form>
          <div className="admin-taxonomy-list">
            {users.map((user) => (
              <div className="admin-user-row" key={user.id}>
                <span>
                  <strong>{user.name}</strong>
                  <small>
                    {user.email} · {user.role.name} ·{" "}
                    {user.active ? "Active" : "Disabled"}
                  </small>
                </span>
                <form action={setUserActiveAction}>
                  <input type="hidden" name="id" value={user.id} />
                  <input
                    type="hidden"
                    name="active"
                    value={user.active ? "false" : "true"}
                  />
                  <button className="admin-delete-text" type="submit">
                    {user.active ? "Disable" : "Enable"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-editor-card">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">ROLE DESIGN</p>
              <h2>Roles & permissions</h2>
            </div>
          </div>
          <form action={createRoleAction} className="admin-taxonomy-form">
            <label className="admin-field">
              <span>Role name</span>
              <input
                className="admin-input"
                name="name"
                required
                maxLength={80}
              />
            </label>
            <label className="admin-field">
              <span>Role key</span>
              <input
                className="admin-input"
                name="key"
                required
                pattern="[A-Za-z][A-Za-z0-9_]{1,39}"
                placeholder="CONTENT_REVIEWER"
              />
            </label>
            <label className="admin-field">
              <span>Description</span>
              <input
                className="admin-input"
                name="description"
                maxLength={200}
              />
            </label>
            <button className="admin-primary-button" type="submit">
              Create role
            </button>
          </form>
          <div className="admin-role-list">
            {roles.map((role) => (
              <form
                className="admin-role-card"
                action={saveRolePermissionsAction}
                key={role.id}
              >
                <input type="hidden" name="roleId" value={role.id} />
                <header>
                  <strong>{role.name}</strong>
                  <small>
                    {role.key} · {role._count.users} users
                  </small>
                </header>
                {role.key === "SUPER_ADMIN" ? (
                  <p className="admin-help-text">
                    Super Admin has full access.
                  </p>
                ) : (
                  <>
                    <div className="admin-permission-grid">
                      {permissions.map((permission) => (
                        <label key={permission.id}>
                          <input
                            type="checkbox"
                            name="permissionIds"
                            value={permission.id}
                            defaultChecked={role.permissions.some(
                              (entry) => entry.permissionId === permission.id,
                            )}
                          />
                          <span>{permission.key}</span>
                        </label>
                      ))}
                    </div>
                    <button className="admin-secondary-button" type="submit">
                      Save permissions
                    </button>
                  </>
                )}
              </form>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
