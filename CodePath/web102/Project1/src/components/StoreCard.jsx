import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function StoreCard({ store }) {
  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`h-40 overflow-hidden p-4 ${
          store.imageBackground ?? "bg-zinc-950"
        }`}
      >
        <img
          src={store.image}
          alt={`${store.name} store`}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="gap-3 pt-5">
        <div>
          <CardTitle className="text-xl">{store.name}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {store.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {store.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardFooter className="mt-5 border-t bg-muted/30 py-4">
        <Button asChild className="w-full">
          <a href={store.website} target="_blank" rel="noreferrer">
            Visit store
            <ArrowUpRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default StoreCard
