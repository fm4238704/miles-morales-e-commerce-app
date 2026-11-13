'use client'

import { useState } from 'react'
import { products, type Product } from '@/lib/products'
import { StoreHeader, type View } from './store-header'
import { HeroView } from './hero-view'
import { ProductView } from './product-view'
import { CheckoutView } from './checkout-view'

export type CartLine = { product: Product; size: string; quantity: number }

export function Store() {
  const [view, setView] = useState<View>('home')
  const [productId, setProductId] = useState(products[0].id)
  const [cartLine, setCartLine] = useState<CartLine | null>(null)

  const product = products.find((p) => p.id === productId) ?? products[0]

  const openProduct = (id: string) => {
    setProductId(id)
    setView('product')
  }

  const buyNow = (line: CartLine) => {
    setCartLine(line)
    setView('checkout')
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background halftone">
      <div aria-hidden className="pointer-events-none absolute inset-0 web-lines" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-[28rem] rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-glitch/10 blur-3xl"
      />

      <StoreHeader
        view={view}
        onNavigate={setView}
        cartCount={cartLine?.quantity ?? 0}
        canCheckout={cartLine !== null}
      />

      <main className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 px-4 pb-4 md:px-8 md:pb-6">
        {view === 'home' && <HeroView onShop={() => setView('product')} onOpenProduct={openProduct} />}
        {view === 'product' && (
          <ProductView
            key={product.id}
            product={product}
            onSelectProduct={setProductId}
            onBuyNow={buyNow}
          />
        )}
        {view === 'checkout' && cartLine && (
          <CheckoutView
            line={cartLine}
            onBack={() => setView('product')}
            onDone={() => {
              setCartLine(null)
              setView('home')
            }}
          />
        )}
      </main>
    </div>
  )
}
