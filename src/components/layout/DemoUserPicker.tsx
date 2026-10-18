import { usePortal } from "../../context/portalContext";
import { Dropdown } from "../ui/Dropdown";

// Demo tool only: stands in for a real sign-in so the portal can be
// shown as different employees. Delete this when SSO is added.
export function DemoUserPicker() {
  const { user, users, selectUser } = usePortal();

  return (
    <Dropdown
      label="Demo user"
      dashed
      value={user.id}
      options={users.map((u) => ({ id: u.id, label: u.name }))}
      onSelect={selectUser}
    />
  );
}