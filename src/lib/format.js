const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const formatPrice = (value) => currency.format(value);

export const discountPercent = (price, compareAtPrice) =>
  compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

// Shopify's CDN resizes on the fly via the `width` query param.
export const cdnImage = (url, width) => `${url}${url.includes('?') ? '&' : '?'}width=${width}`;

export const cdnSrcSet = (url, widths = [320, 480, 640, 960]) =>
  widths.map((w) => `${cdnImage(url, w)} ${w}w`).join(', ');

export const cn = (...classes) => classes.filter(Boolean).join(' ');
