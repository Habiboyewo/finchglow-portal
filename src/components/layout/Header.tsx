import { usePortal } from "../../context/portalContext";
import { CompanySwitcher } from "./CompanySwitcher";
import { DemoUserPicker } from "./DemoUserPicker";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { company } = usePortal();

  return (
    <header className="border-b border-t-4 border-b-line border-t-accent bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="rounded-md dark:bg-white dark:p-1">
            <img
              src={company.logo}
              alt={`Finchglow ${company.name}`}
              className="h-8 w-auto"
            />
          </span>
          <p className="whitespace-nowrap text-base font-medium text-fg sm:text-xl">
            Group Portal
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <CompanySwitcher />
          <DemoUserPicker />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}