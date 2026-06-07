import StoreCard from "@/components/StoreCard"

function StoreGrid({ stores }) {
  return (
    <section aria-labelledby="store-directory">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            The directory
          </p>
          <h2 id="store-directory" className="text-3xl font-bold tracking-tight">
            Places worth browsing
          </h2>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">
          {stores.length} stores collected
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  )
}

export default StoreGrid
