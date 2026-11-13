'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, ShieldCheck, Star, Truck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatPrice, products, type Product } from '@/lib/products'
import type { CartLine } from './store'

type Props = {
  product: Product
  onSelectProduct: (id: string) => void
  onBuyNow: (line: CartLine) => void
}

export function ProductView({ product, onSelectProduct, onBuyNow }: Props) {
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '')
  const [quantity, setQuantity] = useState(1)
  const [showSizeError, setShowSizeError] = useState(false)

  const handleBuy = () => {
    if (!size) {
      setShowSizeError(true)
      return
    }
    onBuyNow({ product, size, quantity })
  }

  return (
    <section
      aria-labelledby="product-title"
      className="grid min-h-0 w-full flex-1 grid-rows-[minmax(0,1fr)_auto] gap-4 animate-in fade-in slide-in-from-right-4 duration-500 md:grid-cols-2 md:grid-rows-1 md:gap-8"
    >
      <div className="flex min-h-0 gap-3">
        <ul className="flex flex-col gap-2" aria-label="Choose product">
          {products.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelectProduct(p.id)}
                aria-pressed={p.id === product.id}
                aria-label={p.name}
                className={cn(
                  'relative block size-12 overflow-hidden rounded-lg border bg-card transition-colors md:size-16',
                  p.id === product.id ? 'border-primary ring-2 ring-primary/30' : 'opacity-60 hover:opacity-100',
                )}
              >
                <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border bg-card/40">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-glitch/15" />
          <Image
            src={product.image}
            alt={`${product.name} product photo`}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 80vw"
            className="object-contain p-4"
          />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-glitch backdrop-blur">
            <Zap className="size-3" aria-hidden /> Limited
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 md:gap-5">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{product.tagline}</p>
          <h1 id="product-title" className="text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            <p className="font-mono text-xl font-bold text-primary md:text-2xl">{formatPrice(product.price)}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-glitch text-glitch" aria-hidden />
              4.9 <span className="hidden sm:inline">· 1,610 reviews</span>
            </p>
          </div>
        </div>

        <p className="hidden max-w-md text-pretty text-sm leading-relaxed text-muted-foreground sm:block">
          {product.description}
        </p>

        <ul className="flex flex-wrap gap-2" aria-label="Highlights">
          {product.specs.map((spec) => (
            <li key={spec} className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              {spec}
            </li>
          ))}
        </ul>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 flex w-full justify-between font-mono text-xs uppercase tracking-widest">
            Size
            {showSizeError && !size && (
              <span role="alert" className="normal-case tracking-normal text-primary">
                Pick a size first
              </span>
            )}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={cn(
                  'h-9 min-w-11 rounded-lg border px-3 font-mono text-sm transition-colors',
                  size === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'bg-card/60 hover:border-foreground/40',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <div className="flex h-11 items-center rounded-lg border bg-card/60" role="group" aria-label="Quantity">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="grid h-full w-10 place-items-center disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <output className="w-6 text-center font-mono text-sm" aria-live="polite">
              {quantity}
            </output>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(5, q + 1))}
              disabled={quantity >= 5}
              className="grid h-full w-10 place-items-center disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
          <Button onClick={handleBuy} className="h-11 flex-1 text-sm font-semibold hover:bg-primary/90">
            Buy Now · {formatPrice(product.price * quantity)}
          </Button>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Truck className="size-3.5" aria-hidden /> Free 48h shipping
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" aria-hidden /> 30-day returns
          </li>
        </ul>
      </div>
    </section>
  )
}
