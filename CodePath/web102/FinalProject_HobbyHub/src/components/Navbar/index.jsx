import { HomeIcon, PlusIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const inkImages = [
  { src: "/images/blueInk.png" },
  { src: "/images/redInk.png" },
  { src: "/images/yellowInk.png" },
];

const randomInkImages = [...inkImages]
  .sort(() => Math.random() - 0.5)
  .map((inkImage) => ({
    ...inkImage,
    left: `${Math.random() * 12}px`,
    top: `${-22 + Math.random() * 64}px`,
    rotation: `${Math.random() * 50 - 25}deg`,
  }));

const navLinkClassName = ({ isActive }) =>
  cn(
    "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
    "text-muted-foreground hover:bg-muted hover:text-foreground",
    isActive && "bg-muted text-foreground"
  );

const newPostLinkClassName = () =>
  cn(
    "new-post-link inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
    "bg-muted text-foreground hover:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)]"
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
          <img
            src="/images/Splatoon_monochrome_logo.svg"
            alt=""
            className="h-9 w-auto shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">Splatoon Community Hub</span>
        </NavLink>

        <div className="hidden min-w-0 flex-1 justify-center gap-3 md:flex">
          {randomInkImages.map((inkImage) => (
            <span
              key={inkImage.src}
              className="relative h-16 w-16 shrink-0 overflow-visible"
              aria-hidden="true"
            >
              <img
                src={inkImage.src}
                alt=""
                className="pointer-events-none absolute size-11 object-contain"
                style={{
                  left: inkImage.left,
                  top: inkImage.top,
                  transform: `rotate(${inkImage.rotation})`,
                }}
              />
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <NavLink to="/" className={navLinkClassName}>
            <HomeIcon className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Feed</span>
          </NavLink>

          <NavLink to="/create" className={newPostLinkClassName}>
            <PlusIcon className="size-4" aria-hidden="true" />
            <span>New Post</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
