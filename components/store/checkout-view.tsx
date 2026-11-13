'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/products'
import type { CartLine } from './store'

type Props = {
  line: CartLine
  onBack: () => void
  onDone: () => void
}

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

const inputClass =
  'h-10 w-full rounded-lg border border-input bg-background/60 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25'

const labelClass = 'mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground'

export function CheckoutView({ line, onBack, onDone }: Props) {
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle')

  const subtotal = line.product.price * line.quantity
  const tax = Math.round(subtotal * 0.08875 * 100) / 100
  const total = subtotal + tax

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('processing')
    setTimeout(() => setStatus('success'), 1400)
  }

  if (status === 'success') {
    return (
      <section
        aria-live="polite"
        className="flex w-full flex-1 flex-col items-center justify-center gap-4 text-center animate-in fade-in zoom-in-95 duration-500"
      >
        <CheckCircle2 className="size-14 text-glitch" aria-hidden />
        <h1 className="text-balance text-4xl font-bold tracking-tighter md:text-6xl">
          You&apos;re <span className="glitch-text text-primary">in</span>.
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Order #SM-{Math.floor(total * 42) % 10000} confirmed — {line.quantity}× {line.product.name} is
          swinging your way. Total charged {formatPrice(total)}.
        </p>
        <Button size="lg" onClick={onDone} className="h-11 px-5 hover:bg-primary/90">
          Back to the drop
        </Button>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="checkout-title"
      className="grid min-h-0 w-full flex-1 grid-rows-[auto_1fr] gap-4 animate-in fade-in slide-in-from-right-4 duration-500 md:grid-cols-[1.2fr_1fr] md:grid-rows-1 md:gap-8"
    >
      <aside
        aria-label="Order summary"
        className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-3 backdrop-blur md:order-2 md:justify-center md:gap-5 md:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-background md:size-24">
            <Image src={line.product.image} alt="" fill sizes="96px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold md:text-lg">{line.product.name}</p>
            <p className="font-mono text-xs text-muted-foreground">
              Size {line.size} · Qty {line.quantity}
            </p>
          </div>
          <p className="font-mono text-sm font-bold md:hidden">{formatPrice(total)}</p>
        </div>
        <dl className="hidden flex-col gap-2 border-t pt-4 font-mono text-sm md:flex">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="text-glitch">Free</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Tax (NYC)</dt>
            <dd>{formatPrice(tax)}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd className="text-primary">{formatPrice(total)}</dd>
          </div>
        </dl>
      </aside>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-col justify-center gap-3 md:order-1 md:gap-4">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> Back
          </button>
          <p className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
            <Lock className="size-3" aria-hidden /> Demo checkout — no card is charged
          </p>
        </div>
        <h1 id="checkout-title" className="text-2xl font-bold tracking-tight md:text-4xl">
          Checkout
        </h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="miles@visions.academy" className={inputClass} />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="name" className={labelClass}>
              Name on card
            </label>
            <input id="name" name="name" required autoComplete="cc-name" placeholder="Miles Morales" className={inputClass} />
          </div>
          <div className="col-span-2">
            <label htmlFor="card" className={labelClass}>
              Card number
            </label>
            <div className="relative">
              <input
                id="card"
                name="card"
                required
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={card}
                onChange={(e) => setCard(formatCardNumber(e.target.value))}
                pattern="(\d{4} ){3}\d{4}"
                title="16-digit card number"
                className={`${inputClass} pr-10 font-mono`}
              />
              <CreditCard className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            </div>
          </div>
          <div>
            <label htmlFor="expiry" className={labelClass}>
              Expiry
            </label>
            <input
              id="expiry"
              name="expiry"
              required
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              pattern="(0[1-9]|1[0-2])/\d{2}"
              title="Expiry as MM/YY"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div>
            <label htmlFor="cvc" className={labelClass}>
              CVC
            </label>
            <input
              id="cvc"
              name="cvc"
              required
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              maxLength={4}
              pattern="\d{3,4}"
              title="3 or 4 digit security code"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className={labelClass}>
              Shipping address
            </label>
            <input id="address" name="address" required autoComplete="street-address" placeholder="1610 Brooklyn Ave, NY" className={inputClass} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={status === 'processing'}
          className="h-11 text-sm font-semibold hover:bg-primary/90"
        >
          {status === 'processing' ? (
            <>
              <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden /> Processing…
            </>
          ) : (
            <>Pay {formatPrice(total)}</>
          )}
        </Button>
      </form>
    </section>
  )
}
