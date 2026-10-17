import { CompanySwitcher } from "./CompanySwitcher";
import { DemoUserPicker } from "./DemoUserPicker";

export function Header() {
  return (
    <header className="border-b border-t-4 border-b-line border-t-accent bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-8">
        <p className="text-xl font-bold text-accent">
          Finchglow <span className="font-medium text-fg">Group Portal</span>
        </p>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <CompanySwitcher />
          <DemoUserPicker />
        </div>
      </div>
    </header>
  );
}