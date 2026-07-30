import { HomeIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const navLinkClassName = ({ isActive }) =>
  cn(
    "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
    "text-muted-foreground hover:bg-muted hover:text-foreground",
    isActive && "bg-muted text-foreground"
  );

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <nav className="flex min-h-16 items-center justify-between gap-3">
        <NavLink
          to="/"
          className="inline-flex min-w-0 items-center gap-2 text-base font-semibold text-foreground"
          aria-label="HobbyHub home"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <SparklesIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate">Splatoon Hub</span>
        </NavLink>

        <div className="flex shrink-0 items-center gap-1">
          <NavLink to="/" className={navLinkClassName}>
            <HomeIcon className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink to="/create" className={navLinkClassName}>
            <PlusIcon className="size-4" aria-hidden="true" />
            <span>New Post</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
