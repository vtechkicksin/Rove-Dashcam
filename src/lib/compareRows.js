import { COVERAGE, products, specLabels } from '../data/products';

// Every comparable row, in display order.
const allRows = [
  { key: 'bestFor', label: 'Best for', value: (p) => p.bestFor },
  { key: 'coverage', label: 'Records', value: (p) => COVERAGE[p.channels] },
  ...Object.entries(specLabels).map(([key, label]) => ({ key, label, value: (p) => p.specs[key] })),
];

const sameOnEveryModel = (row) => new Set(products.map((p) => row.value(p) ?? '—')).size === 1;

// Rows identical on every ROVE camera move out of the table into the "Every ROVE dash cam
// includes" strip, so each table row is a real difference. Derived from the data, so a new
// model that differs brings its row back into the table automatically.
export const sharedRows = allRows.filter(sameOnEveryModel);
export const differingRows = allRows.filter((row) => !sameOnEveryModel(row));
