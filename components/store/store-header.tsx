import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

export type View = 'home' | 'product' | 'checkout'

const steps: { id: View; label: string }[] = [
  { id: 'home', label: 'Drop' },
  { id: 'product', label: 'Gear' },
  { id: 'checkout', label: 'Checkout' },
]

type Props = {
  view: View
  onNavigate: (view: View) => void
  cartCount: number
  canCheckout: boolean
}

export function StoreHeader({ view, onNavigate, cartCount, canCheckout }: Props) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 rounded-md font-mono text-sm font-bold tracking-tight focus-visible:outline-2"
        aria-label="SPDR/42 home"
      >
        <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="7.5" />
          </svg>
        </span>
        <span>
          SPDR<span className="text-primary">/42</span>
        </span>
      </button>

      <nav aria-label="Store steps">
        <ol className="flex items-center gap-1 rounded-full border bg-card/60 p-1 backdrop-blur">
          {steps.map((step, index) => {
            const disabled = step.id === 'checkout' && !canCheckout
            const active = view === step.id
            return (
              <li key={step.id}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-current={active ? 'step' : undefined}
                  onClick={() => onNavigate(step.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                    active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="hidden sm:inline">0{index + 1}</span>
                  {step.label}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="relative flex size-9 items-center justify-center rounded-full border bg-card/60" aria-live="polite">
        <ShoppingBag className="size-4" aria-hidden />
        <span className="sr-only">{cartCount} items in bag</span>
        {cartCount > 0 && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-glitch font-mono text-[10px] font-bold text-background"
          >
            {cartCount}
          </span>
        )}
      </div>
    </header>
  )
}
