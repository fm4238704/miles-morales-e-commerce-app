import Image from 'next/image'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice, products } from '@/lib/products'

type Props = {
  onShop: () => void
  onOpenProduct: (id: string) => void
}

export function HeroView({ onShop, onOpenProduct }: Props) {
  const featured = products[0]

  return (
    <section
      aria-labelledby="hero-title"
      className="grid min-h-0 w-full flex-1 grid-rows-[auto_1fr_auto] gap-4 animate-in fade-in duration-500 md:grid-cols-[1.05fr_1fr] md:grid-rows-[1fr_auto] md:gap-8"
    >
      <div className="flex flex-col justify-center gap-4 md:gap-6">
        <p className="flex w-fit items-center gap-2 rounded-full border border-glitch/40 bg-glitch/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-glitch">
          <Zap className="size-3" aria-hidden />
          Earth-1610 drop is live
        </p>
        <h1
          id="hero-title"
          className="text-balance text-4xl font-bold leading-[0.95] tracking-tighter sm:text-5xl lg:text-7xl"
        >
          Take your <span className="glitch-text text-primary">leap</span> of faith.
        </h1>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Gear inspired by Miles Morales — Brooklyn street style, spray paint, and a little bit of venom
          spark. Limited run, built for kids who swing their own way.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onShop} className="h-11 px-5 text-sm hover:bg-primary/90">
            Shop the drop
            <ArrowRight data-icon="inline-end" aria-hidden />
          </Button>
          <dl className="flex gap-5 font-mono text-xs">
            <div>
              <dt className="text-muted-foreground">Units</dt>
              <dd className="font-bold">0,042</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ships</dt>
              <dd className="font-bold">48h</dd>
            </div>
          </dl>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenProduct(featured.id)}
        className="group relative min-h-0 overflow-hidden rounded-2xl border bg-card/40 text-left focus-visible:outline-2 focus-visible:outline-primary md:row-span-2"
        aria-label={`View ${featured.name}, ${formatPrice(featured.price)}`}
      >
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-glitch/15" />
        <Image
          src={featured.image}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4 mix-blend-lighten [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_62%)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] uppercase tracking-widest backdrop-blur">
          Featured
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
          <span>
            <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {featured.tagline}
            </span>
            <span className="text-lg font-bold">{featured.name}</span>
          </span>
          <span className="rounded-full bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">
            {formatPrice(featured.price)}
          </span>
        </span>
      </button>

      <ul className="grid grid-cols-3 gap-2 md:gap-3" aria-label="More from the drop">
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => onOpenProduct(product.id)}
              className="group flex w-full items-center gap-2 rounded-xl border bg-card/60 p-2 text-left transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-background md:size-12">
                <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block truncate text-xs font-semibold">{product.name}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{formatPrice(product.price)}</span>
              </span>
              <span className="sr-only sm:hidden">
                {product.name}, {formatPrice(product.price)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
