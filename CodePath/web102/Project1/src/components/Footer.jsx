import { PackageOpen } from "lucide-react"

function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex items-center gap-2 font-medium text-foreground">
          <PackageOpen className="size-4" />
          Carry Index
        </p>
        <p>Independent stores and useful gear, collected in one place.</p>
      </div>
    </footer>
  )
}

export default Footer
