import { externalLinks } from '../lib/constants';

export const trustPoints = [
  { id: 'shipping', title: 'Free US shipping', detail: 'Delivered in 1–3 days' },
  { id: 'returns', title: 'Free US returns', detail: 'Hassle-free' },
  { id: 'reviews', title: '40,000+ 5-star reviews', detail: 'From real drivers' },
  { id: 'warranty', title: '1-year warranty', detail: '+ lifetime support' },
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
    a: 'Yes. Loop recording saves short clips and overwrites the oldest ones when the card is full. Clips locked by the G-sensor during an impact are protected from being overwritten.',
    url: `${externalLinks.blog}/dash-cam-loop-recording-g-sensor-locked-videos`,
  },
  {
    q: 'How do I connect my ROVE dash cam to my phone?',
    a: 'Install the free ROVE Dash Cam app from the App Store or Google Play and create your account first, then join the camera’s built-in Wi-Fi from the app to view, download and share footage.',
    url: `${externalLinks.blog}/connect-rove-dash-cam-to-phone-app`,
  },
  {
    q: 'Supercapacitor or battery — which is better?',
    a: 'A supercapacitor is the safer, longer-lasting choice, especially in hot climates. Every ROVE dash cam uses one instead of a lithium battery.',
    url: `${externalLinks.blog}/supercapacitor-vs-battery-dash-cam`,
  },
  {
    q: 'What makes a dash cam good at night?',
    a: 'A Sony STARVIS or STARVIS 2 sensor paired with a wide-aperture lens. These capture far more light, so plates and signs stay readable after dark.',
    url: `${externalLinks.blog}/best-dash-cam-for-night-driving`,
  },
  {
    q: 'Which dash cam is best for Uber and Lyft?',
    a: 'One that records three views at once — the road ahead, the cabin and the rear. The 3-channel ROVE R3 covers all three from one unit.',
    url: `${externalLinks.blog}/best-dash-cam-for-uber-lyft-drivers`,
  },
];

const BLOG_CDN = 'https://cdn.shopify.com/s/files/1/2287/2433/files';

export const blogPosts = [
  {
    title: 'Loop Recording, G-Sensor and Locked Videos: How Your Dash Cam Saves Footage',
    date: '2026-11-02',
    readTime: '8 min read',
    image: `${BLOG_CDN}/loop-recording-pictorial-guide.webp`,
    url: `${externalLinks.blog}/dash-cam-loop-recording-g-sensor-locked-videos`,
  },
  {
    title: 'How to Connect Your ROVE Dash Cam to Your Phone',
    date: '2026-10-27',
    readTime: '7 min read',
    image: `${BLOG_CDN}/rove-app-settings.webp`,
    url: `${externalLinks.blog}/connect-rove-dash-cam-to-phone-app`,
  },
  {
    title: 'Best Dash Cam for Uber and Lyft Drivers',
    date: '2026-10-23',
    readTime: '9 min read',
    image: `${BLOG_CDN}/how_to_save_and_share_rideshare_clip.webp`,
    url: `${externalLinks.blog}/best-dash-cam-for-uber-lyft-drivers`,
  },
  {
    title: 'Supercapacitor vs Battery Dash Cams: Which Is Safer in a Hot Car?',
    date: '2026-10-15',
    readTime: '5 min read',
    image: `${BLOG_CDN}/how-a-dash-cam-supercapacitor-works.webp`,
    url: `${externalLinks.blog}/supercapacitor-vs-battery-dash-cam`,
  },
];
