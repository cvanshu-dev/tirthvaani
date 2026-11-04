import {
  createMenuAction,
  deleteMenuItemAction,
  moveMenuItemAction,
  saveMenuItemAction,
} from "@/app/admin/(panel)/menus/actions";
import { requirePermission } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata = {
  title: "Navigation menus",
  robots: { index: false, follow: false },
};
export default async function MenusPage() {
  await requirePermission("menus:manage");
  const db = getPrisma();
  if (!db)
    return (
      <p className="admin-empty-state">
        Connect the database to manage navigation menus.
      </p>
    );
  const menus = await db.menu.findMany({
    include: {
      items: {
        include: { children: { orderBy: { position: "asc" } } },
        orderBy: { position: "asc" },
      },
    },
    orderBy: { location: "asc" },
  });
  const allMenuItems = await db.menuItem.findMany({
    orderBy: [{ menuId: "asc" }, { position: "asc" }],
  });
  const availableLocations = ["header", "footer"].filter(
    (location) => !menus.some((menu) => menu.location === location),
  );
  return (
    <div>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">WEBSITE</p>
          <h1>Navigation</h1>
          <p>Set link labels, destinations, dropdowns and order.</p>
        </div>
      </div>
      {availableLocations.length > 0 && (
        <form
          action={createMenuAction}
          className="admin-panel admin-create-menu"
        >
          <input
            name="name"
            className="admin-input"
            required
            maxLength={100}
            placeholder="Menu name"
          />
          <select name="location" className="admin-input">
            {availableLocations.map((location) => (
              <option value={location} key={location}>
                {location} location
              </option>
            ))}
          </select>
          <button className="admin-secondary-button" type="submit">
            Create menu
          </button>
        </form>
      )}
      {menus.map((menu) => (
        <section className="admin-panel admin-menu-panel" key={menu.id}>
          <div className="admin-panel-heading">
            <div>
              <p className="admin-kicker">{menu.location.toUpperCase()} MENU</p>
              <h2>{menu.name}</h2>
            </div>
          </div>
          <div className="admin-menu-items">
            {menu.items.map((item) => (
              <div className="admin-menu-row-wrap" key={item.id}>
                <form action={saveMenuItemAction} className="admin-menu-row">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="menuId" value={menu.id} />
                  <label>
                    <span>Label</span>
                    <input
                      className="admin-input"
                      name="label"
                      defaultValue={item.label}
                      required
                      maxLength={100}
                    />
                  </label>
                  <label>
                    <span>Destination</span>
                    <input
                      className="admin-input"
                      name="href"
                      defaultValue={item.href}
                      required
                      maxLength={500}
                    />
                  </label>
                  <label>
                    <span>Parent</span>
                    <select
                      className="admin-input"
                      name="parentId"
                      defaultValue={item.parentId ?? ""}
                    >
                      <option value="">Top level</option>
                      {allMenuItems
                        .filter(
                          (candidate) =>
                            candidate.menuId === menu.id &&
                            candidate.parentId === null &&
                            candidate.id !== item.id,
                        )
                        .map((candidate) => (
                          <option value={candidate.id} key={candidate.id}>
                            {candidate.label}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label>
                    <span>Target</span>
                    <select
                      className="admin-input"
                      name="target"
                      defaultValue={item.target}
                    >
                      <option value="_self">Same tab</option>
                      <option value="_blank">New tab</option>
                    </select>
                  </label>
                  <label className="admin-menu-enabled">
                    <input
                      type="checkbox"
                      name="enabled"
                      defaultChecked={item.enabled}
                    />{" "}
                    Enabled
                  </label>
                  <button className="admin-secondary-button" type="submit">
                    Save
                  </button>
                </form>
                <div className="admin-menu-row-actions">
                  <form action={moveMenuItemAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      aria-label={`Move ${item.label} up`}
                      className="admin-icon-action"
                    >
                      ↑
                    </button>
                  </form>
                  <form action={moveMenuItemAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      aria-label={`Move ${item.label} down`}
                      className="admin-icon-action"
                    >
                      ↓
                    </button>
                  </form>
                  <form action={deleteMenuItemAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="admin-delete-text" type="submit">
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <form action={saveMenuItemAction} className="admin-menu-add">
            <input type="hidden" name="menuId" value={menu.id} />
            <label>
              <span>New item label</span>
              <input
                className="admin-input"
                name="label"
                required
                maxLength={100}
              />
            </label>
            <label>
              <span>Destination</span>
              <input
                className="admin-input"
                name="href"
                required
                maxLength={500}
                placeholder="/about or https://example.com"
              />
            </label>
            <label>
              <span>Parent item</span>
              <select className="admin-input" name="parentId">
                <option value="">Top level</option>
                {allMenuItems
                  .filter(
                    (item) => item.menuId === menu.id && item.parentId === null,
                  )
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </label>
            <input type="hidden" name="target" value="_self" />
            <button className="admin-primary-button" type="submit">
              Add menu item
            </button>
          </form>
          {menu.items.length === 0 && (
            <p className="admin-empty-state">No links in this menu yet.</p>
          )}
        </section>
      ))}
      {menus.length === 0 && (
        <p className="admin-empty-state">
          No menus found. Run the seed command to create a starting header and
          footer menu.
        </p>
      )}
    </div>
  );
}
