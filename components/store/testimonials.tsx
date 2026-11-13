import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  { name: 'Ganke L.', handle: 'Brooklyn, NY', rating: 5, quote: 'The Leap Hi-Tops grip like web. Best kicks I own.' },
  { name: 'Gwen S.', handle: 'Queens, NY', rating: 5, quote: 'Hoodie is heavy, warm, and the print is unreal.' },
  { name: 'Rio M.', handle: 'Harlem, NY', rating: 4, quote: 'Spider-Sense Audio slaps. That bass light is fire.' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn('size-3', i < rating ? 'fill-glitch text-glitch' : 'text-muted-foreground/40')}
        />
      ))}
    </span>
  )
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="flex flex-col gap-2">
      <h2 id="testimonials-title" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        What the neighborhood says
      </h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li
            key={t.name}
            className={cn(
              'flex flex-col gap-1.5 rounded-xl border bg-card/60 p-3',
              i > 0 && 'hidden sm:flex',
              i > 1 && 'sm:hidden lg:flex',
            )}
          >
            <Stars rating={t.rating} />
            <blockquote className="line-clamp-2 text-xs leading-snug">{`"${t.quote}"`}</blockquote>
            <p className="font-mono text-[11px] text-muted-foreground">
              {t.name} · {t.handle}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
