import { PackageOpen } from "lucide-react"

import { Badge } from "@/components/ui/badge"

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a className="flex items-center gap-3" href="#" aria-label="Carry Index home">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-black/10">
            <PackageOpen className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight">Carry Index</span>
            <span className="block text-xs text-muted-foreground">Everyday carry directory</span>
          </span>
        </a>
        <Badge variant="outline" className="bg-background/60 px-3 py-1 backdrop-blur">
          Curated directory
        </Badge>
      </div>
    </header>
  )
}

export default Header
