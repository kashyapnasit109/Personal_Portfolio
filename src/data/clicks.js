/* Photographs from the camera roll. Titles are descriptive; places named only where certain. */
const raw = [
  ['Fireworks over the towers', 'Night · celebration'],
  ['Blue hour, bowling alley', 'Neon · indoors'],
  ['A carousel of flowers', 'Installation · dancers'],
  ['Cabin glow', 'Somewhere above the clouds'],
  ['Lights, all of them', 'Concert · festival'],
  ['Window shopping (just the windows)', 'Retail · architecture'],
  ['The Psychology of Money, at altitude', 'Reading · in flight'],
  ['Duty free, full of duty', 'Airport'],
  ['A thousand tiny marks', 'Gallery · abstract'],
  ["St Paul's across the Thames", 'London'],
  ['Torn posters, loud colour', 'Gallery · collage'],
  ['Frida, and a man in bronze', 'Exhibition · street'],
  ['An alley that wanted a photo', 'Streets · brick'],
  ['Leadenhall Market', 'London · Victorian roof'],
  ['Glass, glass, a bit of colour', 'City · canopy'],
  ['The Gherkin', 'London · 30 St Mary Axe'],
  ['A ceiling made of light', 'Interior · copper'],
  ['The Corpus Clock', 'Cambridge · the time-eater'],
  ['Bridge of Sighs', 'Cambridge · the Cam'],
  ["King's Cross, looking up", 'London · steel lattice'],
  ['Chinatown lanterns', 'London · night'],
  ['A bridge between cliffs', 'Coast · quiet'],
  ['Heaven, framed in gold', 'Museum · painting'],
  ['A library with lamps like rain', 'Interior · books'],
  ['Big Ben and the Eye', 'London · Westminster'],
  ['The great hall', 'Museum · Victorian'],
  ["St Paul's, lit", 'London · blue hour'],
  ['Chrome orbs', 'Interior · reflection'],
  ['"Quiet, this is a working library."', 'Libraries · noted'],
  ['Red sculpture, grey city', 'City · public art'],
];


/* Batch two — added Semester 05. Same rule: places named only where certain. */
const more = [
  ['k01', 'Built in 1868, still showing off', 'Museum · steam', 'engines'],
  ['k02', 'Breakfast, properly lit', 'Food · pre-bite', 'food'],
  ['k03', 'Every object had an engineer', 'Museum · design', 'museum'],
  ['k04', 'Neon, checkerboard, zero regrets', 'Interiors · night out', 'night'],
  ['k05', 'Dessert got a portrait', 'Food · pre-bite', 'food'],
  ['k06', 'The original tiny car', 'Cars · a bubble on wheels', 'engines'],
  ['k07', 'A Victorian glass roof', 'Architecture · looking up', 'up'],
  ['k08', 'Spider-Man, mid-crawl', 'Exhibition · heroes', 'museum'],
  ['k09', 'A tower that spells its own name', 'City · riverside', 'up'],
  ['k10', 'Curry, before the demolition', 'Food · pre-bite', 'food'],
  ['k11', 'Met a captain. He was shy.', 'Exhibition · heroes', 'museum'],
  ['k12', 'A Boxster on a quiet street', 'Cars · spotted', 'engines'],
  ['k13', 'A balloon with a checkered past', 'Sky · slow travel', 'places'],
  ['k14', 'A 911, in the rain, as intended', 'Cars · spotted', 'engines'],
  ['k15', 'Red earth, green hills', 'Landscape · erosion', 'places'],
  ['k16', 'The buffet boss fight', 'Food · pre-bite', 'food'],
  ['m1', 'Denim vs. the mountains', 'Hills · overcast', 'me'],
  ['m2', 'Jacket on, valley below', 'Hills · green', 'me'],
  ['m3', 'Formal mode: rarely enabled', 'Indoors · occasion', 'me'],
  ['m4', 'Sunglasses, regardless of weather', 'Hills · overcast', 'me'],
  ['m5', 'Lake below, thoughts above', 'Golden hour · lakeside', 'me'],
  ['m6', 'A city lit up after dark', 'Night · viewpoint', 'me'],
];

const CATS_OLD = {1: 'night', 2: 'night', 3: 'museum', 4: 'places', 5: 'night', 6: 'places', 7: 'places', 8: 'places', 9: 'museum', 10: 'up', 11: 'museum', 12: 'museum', 13: 'places', 14: 'up', 15: 'up', 16: 'up', 17: 'up', 18: 'places', 19: 'places', 20: 'up', 21: 'night', 22: 'places', 23: 'museum', 24: 'places', 25: 'up', 26: 'museum', 27: 'up', 28: 'museum', 29: 'places', 30: 'places'};

export const clicks = [
  ...raw.map(([title, meta], i) => {
    const n = String(i + 1).padStart(2, '0');
    return { n, id: `c${n}`, title, meta, cat: CATS_OLD[i + 1], src: `/img/lens/c${n}.webp`, thumb: `/img/lens/t${n}.webp`, wide: [5, 9].includes(i + 1) };
  }),
  ...more.map(([id, title, meta, cat], j) => ({
    n: String(raw.length + j + 1).padStart(2, '0'),
    id,
    title,
    meta,
    cat,
    src: `/img/lens/${id}.webp`,
    thumb: id.startsWith('m') ? `/img/lens/mt${id.slice(1)}.webp` : `/img/lens/${id}t.webp`,
  })),
];

export const collections = [
  { id: 'all', label: 'Everything', note: 'The whole roll. Scroll responsibly.' },
  { id: 'engines', label: 'Things with engines', note: 'A steam engine, a bubble car and two Porsches. Priorities.' },
  { id: 'up', label: 'Looking up', note: 'Roofs, towers and ceilings — the part of a city most people walk under.' },
  { id: 'museum', label: 'Museums & heroes', note: 'Galleries, exhibitions and two superheroes who stood very still.' },
  { id: 'food', label: 'Photographed before eating', note: 'The camera eats first. House rule.' },
  { id: 'night', label: 'After dark', note: 'Fireworks, neon and lanterns.' },
  { id: 'places', label: 'Pages & places', note: 'Libraries, streets, a balloon and a book at 35,000 ft.' },
  { id: 'me', label: 'The photographer, occasionally', note: 'Someone else held the camera. I held the pose.' },
];

export const byId = (id) => clicks.find((c) => c.id === id);

