export type Product = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  image: string
  sizes: string[]
  specs: string[]
}

export const products: Product[] = [
  {
    id: 'leap-hi',
    name: 'Leap Hi-Top',
    tagline: 'Sneaker / Drop 042',
    description:
      'Built for rooftop sprints across Brooklyn. Grip-web outsole, red-lace lockdown and hand-sprayed graffiti panels — no two pairs glitch the same.',
    price: 189,
    image: '/images/sneaker.png',
    sizes: ['8', '9', '10', '11', '12'],
    specs: ['Grip-web outsole', 'Hand-sprayed', 'Venom-red laces'],
  },
  {
    id: 'brooklyn-hoodie',
    name: 'Brooklyn Web Hoodie',
    tagline: 'Hoodie / Drop 042',
    description:
      'Heavyweight 450gsm fleece with a web print that wraps the shoulders. Oversized fit, drip-sprayed cuffs, and deep pockets for your sketchbook.',
    price: 98,
    image: '/images/hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: ['450gsm fleece', 'Oversized fit', 'Spray-drip cuffs'],
  },
  {
    id: 'spider-sense',
    name: 'Spider-Sense Audio',
    tagline: 'Headphones / Drop 042',
    description:
      'Wireless over-ears tuned for late-night beats. Adaptive noise cancelling, 40-hour battery, and a cyan pulse light that syncs to the bass.',
    price: 249,
    image: '/images/headphones.png',
    sizes: ['One size'],
    specs: ['40h battery', 'Adaptive ANC', 'Bass-sync light'],
  },
]

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
