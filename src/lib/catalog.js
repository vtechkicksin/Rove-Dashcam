import { products } from '../data/products';
import { accessories } from '../data/accessories';

const entries = [
  ...products.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.tagline,
    price: p.price,
    available: p.available,
    image: p.images[0],
    href: `/dash-cams/${p.id}`,
    type: 'Dash cam',
  })),
  ...accessories.map((a) => ({
    id: a.id,
    name: a.name,
    subtitle: a.detail,
    price: a.price,
    available: a.available,
    image: a.image,
    href: `/accessories?category=${a.category}`,
    type: 'Accessory',
  })),
];

export const catalog = new Map(entries.map((e) => [e.id, e]));
export const catalogList = entries;
