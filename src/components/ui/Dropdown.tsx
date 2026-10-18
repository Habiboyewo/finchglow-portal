import { useId, useRef, useState, type KeyboardEvent } from "react";

export interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onSelect: (id: string) => void;
  dashed?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onSelect,
  dashed = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const current = options.find((o) => o.id === value) ?? options[0];

  // Close the list and put focus back on the button
  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Move focus to the next or previous option, wrapping round at the ends
  const moveFocus = (step: number) => {
    const items = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLButtonElement>("li button") ??
        [],
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      index === -1
        ? step > 0
          ? 0
          : items.length - 1
        : (index + step + items.length) % items.length;
    items[next].focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (open) moveFocus(1);
      else setOpen(true);
    } else if (event.key === "ArrowUp" && open) {
      event.preventDefault();
      moveFocus(-1);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        // Close when focus leaves the whole dropdown
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`flex h-11 items-center gap-2 rounded-lg border bg-surface px-3 font-semibold text-fg ${
          dashed ? "border-dashed border-muted" : "border-muted"
        }`}
      >
        <span>
          {label}: {current.label}
        </span>
        <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul
          id={listId}
          // Keeps focus where it is when the mouse is pressed on an option
          onMouseDown={(event) => event.preventDefault()}
          className="absolute left-0 z-40 mt-1 w-max min-w-full rounded-lg border border-line bg-surface p-1 shadow-lg"
        >
          {options.map((option) => {
            const selected = option.id === value;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  aria-current={selected ? "true" : undefined}
                  onClick={() => {
                    onSelect(option.id);
                    close();
                  }}
                  className={`flex min-h-11 w-full items-center justify-between gap-4 rounded-md px-3 text-left hover:bg-bg ${
                    selected ? "font-bold text-accent" : "text-fg"
                  }`}
                >
                  <span>{option.label}</span>
                  {selected && <span aria-hidden="true">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}