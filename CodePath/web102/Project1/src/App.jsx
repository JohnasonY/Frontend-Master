import Footer from "@/components/Footer"
import Header from "@/components/Header"
import StoreGrid from "@/components/StoreGrid"
import { Badge } from "@/components/ui/badge"
import { stores } from "@/data/stores"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.85_0.08_75/0.35),transparent_35%),radial-gradient(circle_at_left,oklch(0.8_0.05_250/0.2),transparent_30%)]" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <Badge variant="outline" className="mb-6 bg-background/60">
              Built for the everyday
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Find your next
              <span className="block text-muted-foreground">favorite carry.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A hand-picked directory of stores selling fidget sliders,
              floating sliders, fidget rings, fidget spinners and small toys you can carry everyday.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <StoreGrid stores={stores} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
