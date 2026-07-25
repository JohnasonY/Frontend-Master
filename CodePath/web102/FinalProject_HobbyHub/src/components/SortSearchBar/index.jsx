import { SearchIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "upvotes", label: "Top" },
];

export default function SortSearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  className,
}) {
  const hasSearch = searchQuery.trim().length > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-md border bg-card p-3 shadow-xs sm:flex-row sm:items-center",
        className
      )}
    >
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search posts</span>
        <SearchIcon
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search posts"
          className="pr-9 pl-8"
        />
        {hasSearch && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <XIcon className="size-3.5" aria-hidden="true" />
          </Button>
        )}
      </label>

      <label className="relative sm:w-40">
        <span className="sr-only">Sort posts</span>
        <SlidersHorizontalIcon
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className={cn(
            "h-9 w-full appearance-none rounded-md border border-input bg-background px-8 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          )}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
