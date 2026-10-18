import { usePortal } from "../../context/portalContext";
import { CompanySwitcher } from "./CompanySwitcher";
import { DemoUserPicker } from "./DemoUserPicker";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    const { company } = usePortal();

    return (
        <header className="border-b border-t-4 border-b-line border-t-accent bg-surface">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-8">
                <div className="flex items-center gap-3">
                    <span className="rounded-md dark:bg-white dark:p-1">
                        <img
                            src={company.logo}
                            alt={`Finchglow ${company.name}`}
                            className="h-8 w-auto"
                        />
                    </span>
                    <p className="text-xl font-medium text-fg">Group Portal</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
                    <CompanySwitcher />
                    <DemoUserPicker />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}