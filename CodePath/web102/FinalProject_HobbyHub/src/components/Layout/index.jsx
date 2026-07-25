import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
  className,
  contentClassName,
  footer = "HobbyHub",
}) {
  return (
    <div
      className={cn(
        "min-h-svh bg-background text-foreground",
        "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--muted),transparent_45%)_0%,var(--background)_18rem)]",
        className
      )}
    >
      <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Navbar />

        <main className={cn("flex-1 py-6 sm:py-8", contentClassName)}>
          {children}
        </main>

        {footer && (
          <footer className="border-t py-5 text-center text-xs text-muted-foreground">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
