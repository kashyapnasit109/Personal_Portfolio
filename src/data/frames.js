/*
  Field of View — personal photographs, annotated the way a vision model would see them.
  `person` boxes come from segmentation masks of each photo (x0, y0, x1, y1 as fractions),
  adjusted by hand where a sculpture was segmented with the person. `marks` are hand-placed.
*/
export const frames = [
  {
    id: 'edinburgh',
    src: '/img/fov-edinburgh.webp',
    place: 'Edinburgh',
    detail: 'Grassmarket, under the castle rock',
    coord: '55.9486° N · 3.1999° W',
    person: [0.314, 0.4026, 0.616, 1.0],
    marks: [{ label: 'landmark · Edinburgh Castle', box: [0.3, 0.15, 0.78, 0.335] }],
    alt: 'Kashyap walking through the Grassmarket in a red scarf with Edinburgh Castle above',
  },
  {
    id: 'kelpies',
    src: '/img/fov-kelpies.webp',
    place: 'Falkirk',
    detail: 'Between The Kelpies',
    coord: '56.0192° N · 3.7552° W',
    person: [0.31, 0.33, 0.54, 1.0],
    marks: [{ label: 'landmark · The Kelpies', box: [0.0, 0.24, 0.28, 0.8] }],
    alt: 'Kashyap in a green varsity jacket walking between the two steel Kelpies horse-head sculptures',
  },
  {
    id: 'oxford',
    src: '/img/fov-oxford.webp',
    place: 'Oxford',
    detail: 'Christ Church, Tom Quad',
    coord: '51.7500° N · 1.2560° W',
    person: [0.3208, 0.4555, 0.6135, 1.0],
    marks: [{ label: 'landmark · Tom Tower', box: [0.43, 0.08, 0.65, 0.6] }],
    alt: 'Kashyap in a long black coat in Tom Quad, Christ Church, with Tom Tower behind',
  },
  {
    id: 'stpauls',
    src: '/img/fov-stpauls.webp',
    place: 'London',
    detail: "Millennium Bridge, facing St Paul's",
    coord: '51.5138° N · 0.0984° W',
    person: [0.3689, 0.4751, 0.6756, 1.0],
    marks: [{ label: "landmark · St Paul's Cathedral", box: [0.41, 0.273, 0.63, 0.513] }],
    alt: "Kashyap standing on the Millennium Bridge with St Paul's Cathedral behind",
  },
  {
    id: 'towerbridge',
    src: '/img/fov-towerbridge.webp',
    place: 'Thames',
    detail: 'South bank, by Tower Bridge',
    coord: '51.5055° N · 0.0754° W',
    person: [0.3278, 0.3175, 0.62, 0.9992],
    marks: [{ label: 'landmark · Tower Bridge', box: [0.14, 0.327, 0.66, 0.473] }],
    alt: 'Kashyap on the Thames embankment with Tower Bridge behind',
  },
  {
    id: 'london',
    src: '/img/fov-london.webp',
    place: 'The Shard',
    detail: 'Looking north over the City',
    coord: '51.5045° N · 0.0865° W',
    person: [0.0375, 0.1758, 0.4323, 1.0],
    marks: [{ label: "landmark · St Paul's", box: [0.545, 0.405, 0.665, 0.505] }],
    alt: 'Kashyap standing at the window of The Shard with the City of London below',
  },
  {
    id: 'canary',
    src: '/img/fov-canary.webp',
    place: 'Canary Wharf',
    detail: 'The whale made of plastic',
    coord: '51.5054° N · 0.0235° W',
    person: [0.265, 0.553, 0.385, 0.873],
    marks: [{ label: 'object · whale sculpture', box: [0.02, 0.21, 0.98, 0.72] }],
    alt: 'Kashyap standing in front of a huge whale sculpture made of blue plastic at Canary Wharf',
  },
  {
    id: 'windermere',
    src: '/img/fov-windermere.webp',
    place: 'Windermere',
    detail: 'On the lake, Lake District',
    coord: '54.38° N · 2.91° W',
    person: [0.349, 0.535, 0.74, 1.0],
    marks: [{ label: 'scene · lake + fells', box: [0.0, 0.63, 1.0, 0.75] }],
    alt: 'Kashyap in a tie-dye denim jacket on the deck of a lake boat under grey skies',
  },
  {
    id: 'seafront',
    src: '/img/fov-seafront.webp',
    place: 'Seafront',
    detail: 'Golden hour, England',
    coord: 'UK coast',
    person: [0.2271, 0.307, 0.7833, 1.0],
    marks: [{ label: 'object · street lamp', box: [0.72, 0.53, 0.83, 0.74] }],
    alt: 'Kashyap in a brown corduroy jacket and sunglasses on a seafront at sunset',
  },
];

export const trailImages = [
  '/img/trail-1.webp', '/img/trail-kelpies.webp', '/img/trail-7.webp', '/img/trail-stpauls.webp',
  '/img/trail-4.webp', '/img/trail-windermere.webp', '/img/trail-5.webp', '/img/trail-towerbridge.webp',
  '/img/trail-canary.webp', '/img/trail-3.webp',
];

/* Photos cycled inside the loader frame */
export const loaderFrames = [
  '/img/trail-kelpies.webp', '/img/trail-1.webp', '/img/trail-windermere.webp', '/img/trail-7.webp',
  '/img/trail-stpauls.webp', '/img/trail-4.webp', '/img/trail-towerbridge.webp', '/img/trail-5.webp',
  '/img/trail-canary.webp', '/img/trail-3.webp',
];
export const loaderPlaces = ['Falkirk', 'Edinburgh', 'Windermere', 'Oxford', 'London', 'Seafront', 'Thames', 'The Shard', 'Canary Wharf', 'England'];
