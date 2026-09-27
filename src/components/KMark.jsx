/*
  The "k" mark — Kashyap's signature k inside a tilted orbit.
  K_PATH is the italic k outline from Instrument Serif (font units, y up, 1000 upm),
  so it can be stroked, drawn, filled or used as a mask at any size.
*/
export const K_PATH =
  'M318 -9Q267 -9 235 74L180 219Q170 243 155 243Q140 243 129 218Q119 196 107.5 158.5Q96 121 86 77L71 11Q68 0 57 0H18Q4 0 7 13L153 640Q157 657 153.0 664.5Q149 672 135 673L105 676Q90 678 92 689Q94 698 106 700Q149 707 175.0 716.0Q201 725 215 737Q223 743 229 743Q242 743 239 728L146 332Q145 325 149.0 324.0Q153 323 156 329L189 388Q261 516 351 516Q385 516 405.0 498.0Q425 480 425 449Q425 400 377.5 351.0Q330 302 253 271Q229 262 239 239L297 91Q307 66 317.0 55.5Q327 45 342 45Q365 45 377.0 73.5Q389 102 398 173Q400 186 410 186Q421 186 420 166Q415 82 388.5 36.5Q362 -9 318 -9ZM165 288Q161 279 164.5 274.5Q168 270 177 272Q260 293 311.0 341.0Q362 389 362 447Q362 485 333 485Q299 485 254.0 432.5Q209 380 165 288Z';

// glyph geometry in font units
export const K_BOX = { cx: 215.5, cy: 367, h: 752, stem: { x: 113, y: 330, w: 65 } };

/* Transform that places the glyph with its centre at (x, y) at `s` px per font unit. */
export const kTransform = (x, y, s, ax = K_BOX.cx, ay = K_BOX.cy) => `translate(${x} ${y}) scale(${s} ${-s}) translate(${-ax} ${-ay})`;

export default function KMark({ size = 30, className = '', ring = true, strokeOnly = false, title }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : 'true'}>
      {ring && <ellipse data-k-ring cx="32" cy="32" rx="26" ry="10" fill="none" stroke="currentColor" strokeWidth="2.4" transform="rotate(-28 32 32)" />}
      <path
        data-k-glyph
        d={K_PATH}
        transform={kTransform(31.7, 30.6, 0.034)}
        fill={strokeOnly ? 'none' : 'currentColor'}
        stroke={strokeOnly ? 'currentColor' : 'none'}
        strokeWidth={strokeOnly ? 40 : 0}
      />
    </svg>
  );
}
