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

export const featuredReview = {
  title: 'Clear footage, easy setup, and solid performance — worth the price',
  body:
    'Setup was simple, and I love that it comes with a FREE 128GB card — most other brands make you buy that separately. The 5G Wi-Fi feature is a game-changer. I can transfer videos to my phone super fast (under a minute for short clips), and the ROVE app is clean and responsive. The 3-inch IPS screen is bright and easy to navigate.',
  productId: 'r2-4k-dual',
};

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
