import { externalLinks } from '../lib/constants';

// Shown once, under the hero call to action.
export const heroTrust = [
  { id: 'warranty', label: '1-year warranty' },
  { id: 'reviews', label: '40,000+ 5-star reviews' },
];

// Brand promises in the proof section; deliberately different from heroTrust.
export const promises = [
  { id: 'returns', title: 'Free US returns', detail: 'Not the right fit? Send it back.' },
  { id: 'support', title: 'Lifetime support', detail: 'Help for as long as you drive.' },
  { id: 'updates', title: 'Free firmware updates', detail: 'New features over the air.' },
];

// Reviews shown in the homepage review carousel: { id, title, body, productId, sample? }.
// Only the first entry is a real customer review. Entries with `sample: true` are written by us to
// demonstrate the layout; the page tags them "Sample review". Replace them with real customer
// reviews before launch and never remove the sample flag from text a customer didn't write.
export const reviews = [
  {
    id: 'dual-free-card',
    title: 'Clear footage, easy setup, and solid performance — worth the price',
    body:
      'Setup was simple, and I love that it comes with a FREE 128GB card — most other brands make you buy that separately. The 5G Wi-Fi feature is a game-changer. I can transfer videos to my phone super fast (under a minute for short clips), and the ROVE app is clean and responsive. The 3-inch IPS screen is bright and easy to navigate.',
    productId: 'r2-4k-dual',
  },
  {
    id: 'sample-dual-pro-night',
    title: 'Plates stay readable at night',
    body:
      'The front camera picks up number plates after dark that my old dash cam turned into a blur. Clips copy to my phone over Wi-Fi in seconds, and the rear camera was easy to route along the headliner.',
    productId: 'r2-4k-dual-pro',
    sample: true,
  },
  {
    id: 'sample-r3-rideshare',
    title: 'The cabin camera is why I bought it',
    body:
      'I drive rideshare in the evenings, and having the road, the cabin and the rear recorded at once gives me peace of mind. The touchscreen makes it quick to check the angles before a shift.',
    productId: 'r3',
    sample: true,
  },
  {
    id: 'sample-r2-4k-summer',
    title: 'Small, sharp and no battery worries',
    body:
      'It sits neatly behind the mirror and records clear 4K footage. Our car bakes in the sun all summer, so I liked that it runs on a supercapacitor instead of a lithium battery.',
    productId: 'r2-4k',
    sample: true,
  },
  {
    id: 'sample-dual-parking',
    title: 'Parking mode caught a door ding',
    body:
      'I added the hardwire kit for parking mode, and it recorded someone opening their door into mine in a car park. The locked clip was easy to find in the app and share with my insurer.',
    productId: 'r2-4k-dual',
    sample: true,
  },
];

export const quickAnswers = [
  {
    q: 'Does a dash cam record over old footage?',
    a: 'Yes, oldest clips go first — but impact clips are locked and never overwritten.',
    url: `${externalLinks.blog}/dash-cam-loop-recording-g-sensor-locked-videos`,
  },
  {
    q: 'What makes a dash cam good at night?',
    a: 'A Sony STARVIS sensor. Every ROVE camera has one, so plates stay readable after dark.',
    url: `${externalLinks.blog}/best-dash-cam-for-night-driving`,
  },
  {
    q: 'Supercapacitor or battery — which is better?',
    a: 'A supercapacitor. It handles a hot car far better, and every ROVE camera uses one.',
    url: `${externalLinks.blog}/supercapacitor-vs-battery-dash-cam`,
  },
  {
    q: 'Which dash cam is best for Uber and Lyft?',
    a: 'The ROVE R3 — it records the road, the cabin and the rear at the same time.',
    url: `${externalLinks.blog}/best-dash-cam-for-uber-lyft-drivers`,
  },
];
