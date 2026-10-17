import { useId } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const inputId = useId();

  return (
    <div className="mb-6 flex max-w-xl gap-2">
      <div className="flex-1">
        <label htmlFor={inputId} className="sr-only">
          Search apps and news
        </label>
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search apps and news"
          className="h-11 w-full rounded-lg border border-muted bg-surface px-3 text-fg"
        />
      </div>
      {value !== "" && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="h-11 rounded-lg border border-muted bg-surface px-4 font-semibold text-fg"
        >
          Clear
        </button>
      )}
    </div>
  );
}