import { usePortal } from "../../context/portalContext";

// Demo tool only: stands in for a real sign-in so the portal can be
// shown as different employees. Delete this when SSO is added.
export function DemoUserPicker() {
  const { user, users, selectUser } = usePortal();

  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <label htmlFor="demo-user">Demo user</label>
      <select
        id="demo-user"
        value={user.id}
        onChange={(event) => selectUser(event.target.value)}
        className="h-11 rounded-lg border border-dashed border-muted bg-surface px-3 text-fg"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
}