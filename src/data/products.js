// Prices, availability and images come from the store's public Shopify product feed.
// Spec values come from the comparison table on rovedashcam.com.
const CDN = 'https://cdn.shopify.com/s/files/1/2287/2433/files';

// Technical channel count; always shown after the coverage name, never instead of it.
export const CHANNELS = {
  1: '1-channel',
  2: '2-channel',
  3: '3-channel',
};

// What each channel count records, in shopper terms. This is the primary label everywhere.
export const COVERAGE = {
  1: 'Road ahead',
  2: 'Front + rear',
  3: 'Front, cabin + rear',
};

export const products = [
  {
    id: 'r2-4k',
    bestFor: 'Everyday commuting on a budget',
    headline: 'Sharp 4K. Simple price.',
    benefits: ['4K Ultra HD video', 'Built-in Wi-Fi & GPS', 'Heat-safe supercapacitor'],
    addOns: ['hardwire-kit', 'ultimate-sd', 'cpl-filter'],
    name: 'ROVE R2-4K',
    handle: 'rove-r2-4k-car-dashcam',
    tagline: 'A dash cam made for all',
    summary:
      'Compact, reliable, and crystal-clear — the everyday companion for capturing every moment on the road with confidence.',
    price: 119.99,
    compareAtPrice: null,
    available: true,
    channels: 1,
    label: 'Best value',
    accent: '#3b82f6',
    images: [
      `${CDN}/91AtC7jFIZL._AC_SL1500.jpg`,
      `${CDN}/B074JT3698.PT02.jpg`,
      `${CDN}/B074JT3698.PT01.jpg`,
      `${CDN}/B074JT3698.PT03.jpg`,
      `${CDN}/04_1fbb3d27-dafa-42a9-9063-dc59bb8f0efa.jpg`,
    ],
    highlights: [
      '4K Ultra HD 2160p recording',
      'Built-in Wi-Fi & GPS',
      'Sony STARVIS sensor',
      'Heat-resistant supercapacitor',
      'OTA firmware updates via app',
      '24-hour parking mode',
    ],
    specs: {
      sensor: 'Sony STARVIS',
      resolution: '2160p @ 30fps',
      wifi: 'Dual band 5GHz & 2.4GHz',
      download: 'Up to 6 MB/s',
      storage: 'Up to 512GB (microSD not included)',
      display: '2.4" IPS screen',
      gps: 'Built-in',
      power: 'Supercapacitor',
      parking: '24-hour (hardwire kit required)',
    },
  },
  {
    id: 'r2-4k-pro',
    bestFor: 'A wider view of the road ahead',
    headline: '4K with a wider view.',
    benefits: ['4K at 30fps', '150° wide angle', 'Built-in GPS & 5GHz Wi-Fi'],
    addOns: ['hardwire-kit', 'ultimate-sd', 'cpl-filter'],
    name: 'ROVE R2-4K PRO',
    handle: 'new-rove-r2-4k-pro-dash-cam-4k-ultra-hd-2160p-dash-board-camera-built-in-wifi-gps',
    tagline: 'Next-generation features',
    summary:
      'A road-safety essential delivering crystal-clear 2160p video, advanced night vision and a 150° wide angle for peace of mind on every drive.',
    price: 159.99,
    compareAtPrice: null,
    available: false,
    channels: 1,
    label: null,
    accent: '#8b5cf6',
    images: [
      `${CDN}/SV-V2-3.jpg`,
      `${CDN}/B0BZRKRBHP.PT01.jpg`,
      `${CDN}/B0BZRKRBHP.PT02.jpg`,
      `${CDN}/91JaudVW4KL._AC_SL1500.jpg`,
      `${CDN}/Package-Content_6eca18e9-041f-484b-9687-afeac5a0e75a.jpg`,
    ],
    highlights: [
      'Ultra-HD 2160p @ 30fps',
      'Built-in GPS & 5GHz Wi-Fi',
      'Advanced night vision with WDR',
      '150° wide angle lens',
      'OTA firmware updates via app',
      '24-hour parking mode',
    ],
    specs: {
      sensor: 'Sony STARVIS',
      resolution: '2160p @ 30fps',
      wifi: 'Dual band 5GHz & 2.4GHz',
      download: 'Up to 8 MB/s',
      storage: 'Up to 512GB (microSD not included)',
      display: '2.4" IPS screen',
      gps: 'Built-in',
      power: 'Supercapacitor',
      parking: '24-hour (hardwire kit required)',
    },
  },
  {
    id: 'r2-4k-dual',
    bestFor: 'Front and rear protection at the best value',
    headline: 'Front and rear, fully covered.',
    benefits: ['Front + rear recording', 'Free 128GB card', '20 MB/s Wi-Fi downloads'],
    addOns: ['hardwire-kit', 'cpl-filter', 'r2d-9m-cable'],
    name: 'ROVE R2-4K DUAL',
    handle:
      'rove-r2-4k-dual-dash-cam-front-and-rear-starvis-2-sensor-free-128gb-card-included-5g-wifi-up-to-20mb-s-fastest-download-speed-with-app-4k-2160p-fhd-dash-camera-for-cars-3-ips-24h-parking-mode',
    tagline: 'The most value-packed 4K dual dash cam',
    summary:
      'Front and rear coverage with a STARVIS 2 sensor, fast 5GHz Wi-Fi transfers and a free 128GB ROVE PRO card in the box.',
    price: 199.99,
    compareAtPrice: null,
    available: true,
    channels: 2,
    label: 'Our pick',
    accent: '#22c55e',
    images: [
      `${CDN}/ROVE_R2-4K_DUAL_Upscaled_Dash_Cam_Front_Rear.jpg`,
      `${CDN}/B0D6J5B98H.PT01.jpg`,
      `${CDN}/B0D6J5B98H.PT02.jpg`,
      `${CDN}/B0D6J5B98H.PT03.jpg`,
      `${CDN}/05-WiFi.png`,
    ],
    highlights: [
      '4K (upscaled) front + 1080p rear',
      'FREE 128GB ROVE PRO microSD',
      'Sony STARVIS 2 sensor',
      'Up to 20 MB/s Wi-Fi downloads',
      'Bright 3" IPS screen',
      '24-hour parking mode',
    ],
    specs: {
      sensor: 'Sony STARVIS 2',
      resolution: '2160p (upscaled) + 1080p @ 30fps',
      wifi: 'Dual band 5GHz & 2.4GHz',
      download: 'Up to 20 MB/s',
      storage: 'Up to 1TB (FREE 128GB card included)',
      display: '3" IPS screen',
      gps: null,
      power: 'Supercapacitor',
      parking: '24-hour (hardwire kit required)',
    },
  },
  {
    id: 'r2-4k-dual-pro',
    bestFor: 'The most detail, front and rear',
    headline: 'True 4K front. 2K rear.',
    benefits: ['True 4K front + 2K rear', 'Night-ready STARVIS 2', 'Free 128GB card + CPL filter'],
    addOns: ['hardwire-kit', 'industrial-sd', 'r2-suction-mount'],
    name: 'ROVE R2-4K DUAL PRO',
    handle: 'rove-r2-4k-dual-pro-dash-cam',
    tagline: 'License plates and the smallest details, captured like never before',
    summary:
      'Our flagship. True 4K front and 2K rear from dual Sony STARVIS 2 sensors, Wi-Fi 6 transfers and quad-mode GPS — with a free 128GB card and CPL filter.',
    price: 349.99,
    compareAtPrice: null,
    available: true,
    channels: 2,
    label: 'Flagship',
    accent: '#f97316',
    images: [
      `${CDN}/R2-4K_DUAL_PRO_Dash_Cam.png`,
      `${CDN}/R2DP_-_Image_2.jpg`,
      `${CDN}/R2DP_-_Image_3.jpg`,
      `${CDN}/04_67435c3f-94af-495f-b3f3-392ae9b4a4d4.jpg`,
      `${CDN}/R2DP_-_Image_5.jpg`,
    ],
    highlights: [
      'True 4K front + 2K rear',
      'Dual STARVIS 2 (IMX678 + IMX675)',
      'Wi-Fi 6 — up to 30 MB/s',
      'Quad-mode GPS',
      'FREE 128GB card + CPL filter',
      '24-hour parking mode',
    ],
    specs: {
      sensor: 'Dual Sony STARVIS 2 (IMX678 + IMX675)',
      resolution: '2160p + 1440p @ 30fps',
      wifi: 'Wi-Fi 6, dual band 5GHz & 2.4GHz',
      download: 'Up to 30 MB/s',
      storage: 'Up to 1TB (FREE 128GB card + CPL filter)',
      display: '3" IPS screen',
      gps: 'Quad-mode',
      power: 'Supercapacitor',
      parking: '24-hour (hardwire kit required)',
    },
  },
  {
    id: 'r3',
    bestFor: 'Rideshare drivers and families',
    headline: 'Road, cabin and rear. One camera.',
    benefits: ['Front, cabin + rear', '3" touchscreen', 'Built-in GPS'],
    addOns: ['hardwire-kit', 'ultimate-sd', 'r3-mount-bundle'],
    name: 'ROVE R3',
    handle: 'rove-r3-dash-cam-3-channel-built-in-wifi-gps-1440p-1080p-1080p-front-cabin-rear',
    tagline: 'Stay ahead of every detail, night and day',
    summary:
      'Triple-lens coverage — front, cabin and rear — controlled from a 3" touchscreen. Built for rideshare drivers and families who want every angle.',
    price: 399.99,
    compareAtPrice: null,
    available: true,
    channels: 3,
    label: 'Rideshare ready',
    accent: '#ef4444',
    images: [
      `${CDN}/1._ROVE_R3_-_Main_Image.jpg`,
      `${CDN}/3._Triple_Channel_Resolution.jpg`,
      `${CDN}/2._Features.jpg`,
      `${CDN}/4._WiFi.jpg`,
      `${CDN}/5._Package_Content.jpg`,
    ],
    highlights: [
      'Front + cabin + rear recording',
      '3" IPS touchscreen',
      'Dual-band 5GHz Wi-Fi',
      'Built-in GPS',
      'Enhanced night vision',
      '24-hour parking monitor',
    ],
    specs: {
      sensor: 'Sony STARVIS',
      resolution: '1440p + 1080p + 1080p @ 30fps',
      wifi: 'Dual band 5GHz & 2.4GHz',
      download: 'Up to 30 MB/s',
      storage: 'Up to 512GB (microSD not included)',
      display: '3" IPS touchscreen',
      gps: 'Built-in',
      power: 'Supercapacitor',
      parking: '24-hour (hardwire kit required)',
    },
  },
];

export const specLabels = {
  sensor: 'Image sensor',
  resolution: 'Resolution',
  wifi: 'Wi-Fi',
  download: 'Download speed',
  storage: 'Storage',
  display: 'Display',
  gps: 'GPS',
  power: 'Power',
  parking: 'Parking mode',
};

// Specs grouped for the product page, with a plain-language label first and the
// technical value underneath. `hint` explains why the row matters.
export const specGroups = [
  {
    title: 'Video',
    rows: [
      { key: 'resolution', label: 'Video sharpness', hint: 'Higher resolution keeps plates and signs readable.' },
      { key: 'sensor', label: 'Night vision sensor', hint: 'Sony STARVIS sensors capture more light after dark.' },
      { key: 'display', label: 'Screen' },
    ],
  },
  {
    title: 'Phone and location',
    rows: [
      { key: 'download', label: 'Phone transfer speed', hint: 'How fast clips copy to the free ROVE app.' },
      { key: 'wifi', label: 'Wi-Fi' },
      { key: 'gps', label: 'GPS', hint: 'Stamps your speed and location on the footage.' },
    ],
  },
  {
    title: 'Power and parking',
    rows: [
      { key: 'power', label: 'Power source', hint: 'A supercapacitor copes with a hot car better than a battery.' },
      { key: 'parking', label: 'Parking mode', hint: 'Needs the ROVE hardwire kit.' },
      { key: 'storage', label: 'Memory card' },
    ],
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);
