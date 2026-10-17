import { usePortal } from "../../context/portalContext";

const footerLinks = [
  "Help and IT support",
  "Accessibility",
  "Privacy",
  "Terms of use",
];

export function Footer() {
  const { user } = usePortal();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-5 sm:px-8">
        <div>
          <p className="font-bold text-accent">Finchglow Holdings</p>
          <p className="text-sm text-muted">
            Signed in as {user.name} ·{" "}
            <a href="#" className="font-medium text-accent underline">
              Sign out
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 sm:ml-auto">
          {footerLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="py-2 text-sm font-medium text-accent hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-5 text-xs text-muted sm:px-8">
        © 2026 Finchglow Holdings. For staff use only.
      </div>
    </footer>
  );
}