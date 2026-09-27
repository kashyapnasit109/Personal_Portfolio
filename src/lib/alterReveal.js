/*
  Alter-ego reveal.

  Hover  — the pointer paints another life of the portrait into the photograph through a liquid
           trail that heals back to the real photo in ~1.4s.
  Click  — switch lives (racer ⇄ photographer), with a camera-shutter flash.
  Double-click — the full transformation: a portal opens from the click point and swallows the
           whole frame. Ahead of its edge reality bends (a shockwave ring), the edge itself burns
           with ice-blue light and gold sparks, and the other world settles in from a slight zoom.
           While transformed, a click dissolves one life into the other from the click point;
           another double-click closes the portal back to the photograph.

  Two WebGL layers (under the name / over it) read one soft mask. Canvas 2D fallback without WebGL.
*/

// ?alterfreeze keeps trails from healing (used for screenshots on slow software renderers)
const LIFE = typeof location !== 'undefined' && location.search.includes('alterfreeze') ? 1e9 : 1400;
const MASK_SCALE = 0.5;
const IN_MS = 1500;
const OUT_MS = 1100;
const SWAP_MS = 1200;

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function loadImage(src) {
  return new Promise((res) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });
}

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main(){ vUv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5); gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uHero;
uniform sampler2D uAlt;
uniform sampler2D uMask;
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform vec4 uCover;
uniform float uTime;
uniform float uFlash;
uniform float uTop;
uniform vec3 uGlow;
uniform vec4 uWave;   // centre xy, radius, strength
uniform vec4 uZoom;   // centre xy, zoom, -
uniform vec4 uSwap;   // centre xy, radius, active

vec2 cov(vec2 px){ return clamp((px - uCover.xy) / uCover.zw, 0.0, 1.0); }
vec2 zcov(vec2 px){ return cov(uZoom.xy + (px - uZoom.xy) / uZoom.z); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 h2(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return -1.0 + 2.0 * fract(sin(p) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(h2(i), f), dot(h2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(h2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(h2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){ float s = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; } return s; }

vec4 altAt(sampler2D t, vec2 px, vec2 dir, float ca){
  vec4 a = texture2D(t, zcov(px));
  a.r = texture2D(t, zcov(px + dir * ca)).r;
  a.b = texture2D(t, zcov(px - dir * ca)).b;
  return a;
}

void main(){
  vec2 px = vUv * uRes;
  float m = texture2D(uMask, vUv).r;

  // shockwave ring running ahead of a transformation edge
  vec2 wv = px - uWave.xy;
  float wd = length(wv) - uWave.z;
  float ring = uWave.w * exp(-pow(wd / 90.0, 2.0));
  if (m < 0.004 && ring < 0.01) { gl_FragColor = vec4(0.0); return; }

  vec2 d = 3.0 / uRes;
  vec2 grad = vec2(texture2D(uMask, vUv + vec2(d.x, 0.0)).r - texture2D(uMask, vUv - vec2(d.x, 0.0)).r,
                   texture2D(uMask, vUv + vec2(0.0, d.y)).r - texture2D(uMask, vUv - vec2(0.0, d.y)).r);
  float n = fbm(px * 0.0065 + vec2(uTime * 0.07, -uTime * 0.05)) + 0.35 * fbm(px * 0.021 - vec2(uTime * 0.11, 0.0));
  float th = 0.5 + n * 0.6;
  float k = smoothstep(th - 0.13, th + 0.13, m);
  float band = exp(-pow((m - th) / 0.11, 2.0)) * smoothstep(0.0, 0.16, m);
  vec2 dir = normalize(grad + 1e-6);
  vec2 wdir = normalize(wv + 1e-6);
  vec2 off = dir * (22.0 * band + 8.0 * k * (1.0 - k)) + wdir * ring * 26.0 * sin(wd * 0.06);
  float ca = 4.0 * band + 1.0 * k * (1.0 - k) + ring * 5.0;

  vec4 h = texture2D(uHero, cov(px + off * 0.6));
  vec4 a = altAt(uAlt, px - off, dir, ca);

  // one life dissolving into the other, from the click point, along a noisy front
  float sb = 0.0;
  if (uSwap.w > 0.5) {
    float front = uSwap.z - length(px - uSwap.xy) - n * 160.0;
    float s = smoothstep(-40.0, 40.0, front);
    sb = exp(-pow(front / 55.0, 2.0));
    vec4 p = altAt(uPrev, px - off - dir * sb * 18.0, normalize(px - uSwap.xy + 1e-6), sb * 6.0);
    a = mix(p, a, s);
  }

  vec4 col = mix(h, a, k);
  float g = hash(px + fract(uTime) * 91.0) - 0.5;
  col.rgb += g * 0.04 * k;
  col.rgb = mix(col.rgb, vec3(1.0, 0.972, 0.93), uFlash * k * 0.9);

  float edge = band + sb * k;
  float alpha = col.a * max(max(k, band), ring * 0.9);
  vec3 rgb = col.rgb * alpha;
  // gold sparks riding the edges
  float spark = step(0.991, hash(floor(px / 2.0) + floor(uTime * 22.0))) * clamp(edge + ring * 0.6, 0.0, 1.0);
  if (uTop < 0.5) {
    rgb += uGlow * (band * 0.34 + sb * 0.28 * k + ring * 0.22) + vec3(1.0) * pow(band, 6.0) * 0.06;
    rgb += vec3(1.0, 0.86, 0.6) * spark * 0.9;
  } else {
    rgb += uGlow * (band * 0.12 + sb * 0.18 * k) * col.a;
    rgb += vec3(1.0, 0.86, 0.6) * spark * 0.6 * col.a * k;
  }
  gl_FragColor = vec4(rgb, alpha);
}`;

function makeGL(canvas) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: 'high-performance' });
  if (!gl) return null;
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = {};
  ['uHero', 'uAlt', 'uMask', 'uPrev', 'uRes', 'uCover', 'uTime', 'uFlash', 'uTop', 'uGlow', 'uWave', 'uZoom', 'uSwap']
    .forEach((n) => { u[n] = gl.getUniformLocation(prog, n); });
  gl.uniform1i(u.uHero, 0);
  gl.uniform1i(u.uAlt, 1);
  gl.uniform1i(u.uMask, 2);
  gl.uniform1i(u.uPrev, 3);
  const tex = (source) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    if (source) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    return t;
  };
  const maskTex = tex(null);
  return { gl, u, tex, maskTex, hero: null, alts: [] };
}

export function startReveal({ root, canvasA, canvasB, layout, hero, modes, onChange, onFull }) {
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);
  const mask = document.createElement('canvas');
  const mctx = mask.getContext('2d');
  let W = 0;
  let H = 0;
  let cover = { s: 1, ox: 0, oy: 0 };
  let mode = 0;
  let prevMode = 0;
  let points = [];
  let pointer = null;
  let pulse = 0;
  let flash = 0;
  let raf = null;
  let alive = true;
  let dirty = false;
  let touched = false;
  const t0 = performance.now();

  // the full transformation: a portal that grows from a point (dir 1) or closes into one (dir -1)
  let portal = null; // { x, y, dir, start, dur, r }
  let full = false;
  let swap = null; // { x, y, start }
  let wave = { x: 0, y: 0, r: 0, a: 0 };
  let zoom = { x: 0, y: 0, z: 1 };

  let A = null;
  let B = null;
  try {
    A = makeGL(canvasA);
    B = A && makeGL(canvasB);
  } catch { A = null; B = null; }
  const gl2d = !(A && B);
  const ctxA = gl2d ? canvasA.getContext('2d') : null;
  const ctxB = gl2d ? canvasB.getContext('2d') : null;
  const imgs = modes.map(() => ({ bg: null, cut: null }));

  const diag = () => Math.hypot(W, H);

  const resize = () => {
    const b = root.getBoundingClientRect();
    W = b.width;
    H = b.height;
    [canvasA, canvasB].forEach((c) => { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); });
    mask.width = Math.max(1, Math.round(W * MASK_SCALE));
    mask.height = Math.max(1, Math.round(H * MASK_SCALE));
    mctx.setTransform(MASK_SCALE, 0, 0, MASK_SCALE, 0, 0);
    if (gl2d) [ctxA, ctxB].forEach((c) => c.setTransform(dpr, 0, 0, dpr, 0, 0));
    const s = Math.max(W / layout.W, H / layout.H);
    cover = { s, ox: (W - layout.W * s) * layout.pos[0], oy: (H - layout.H * s) * layout.pos[1] };
    dirty = true;
    kick();
  };

  const grey = (v) => { if (gl2d) return `rgba(255,255,255,${v})`; const q = Math.round(255 * v); return `rgb(${q},${q},${q})`; };

  const step = (now) => {
    // portal radius, shockwave and zoom-settle
    wave.a = 0;
    if (portal) {
      const t = Math.min(1, (now - portal.start) / portal.dur);
      const e = easeInOut(t);
      const R = diag() * 1.25;
      portal.r = portal.dir > 0 ? e * R : (1 - e) * R;
      wave = { x: portal.x, y: portal.y, r: portal.r + (portal.dir > 0 ? 70 : -40), a: Math.sin(Math.PI * t) * 0.95 };
      if (portal.dir > 0) {
        const zt = Math.min(1, (now - portal.start) / (portal.dur + 700));
        zoom = { x: portal.x, y: portal.y, z: 1 + 0.09 * (1 - easeOutExpo(zt)) };
      }
      if (t >= 1 && portal.dir > 0 && now - portal.start > portal.dur + 700) { portal = { ...portal, done: true }; }
      if (t >= 1 && portal.dir < 0) { portal = null; zoom.z = 1; }
    }
    if (swap && now - swap.start > SWAP_MS) swap = null;
  };

  const drawMask = (now) => {
    mctx.globalCompositeOperation = 'source-over';
    mctx.clearRect(0, 0, W, H);
    mctx.globalCompositeOperation = gl2d ? 'source-over' : 'lighten';
    const draw = (p) => {
      const age = Math.min(1, (now - p.t) / LIFE);
      const k = 1 - age * age * age;
      if (k <= 0) return;
      const wob = 1 + 0.07 * Math.sin(now / 260 + p.seed) + pulse;
      const r = p.r * (0.45 + 0.55 * k) * wob;
      const g = mctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, grey(k));
      g.addColorStop(0.35, grey(k * 0.97));
      g.addColorStop(1, grey(0));
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      mctx.fill();
    };
    points.forEach(draw);
    if (pointer) draw({ ...pointer, t: now - 120, seed: 0 });
    if (portal && portal.r > 1) {
      if (portal.done) {
        mctx.fillStyle = grey(1);
        mctx.fillRect(0, 0, W, H);
      } else {
        const g = mctx.createRadialGradient(portal.x, portal.y, 0, portal.x, portal.y, portal.r);
        g.addColorStop(0, grey(1));
        g.addColorStop(0.82, grey(1));
        g.addColorStop(1, grey(0));
        mctx.fillStyle = g;
        mctx.beginPath();
        mctx.arc(portal.x, portal.y, portal.r, 0, Math.PI * 2);
        mctx.fill();
      }
    }
  };

  const renderGL = (R, now, top) => {
    const { gl, u } = R;
    const alt = R.alts[mode];
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (!R.hero || !alt) return;
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, R.hero);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, alt);
    gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, R.alts[prevMode] || alt);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, R.maskTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
    gl.uniform2f(u.uRes, W, H);
    gl.uniform4f(u.uCover, cover.ox, cover.oy, layout.W * cover.s, layout.H * cover.s);
    gl.uniform1f(u.uTime, (now - t0) / 1000);
    gl.uniform1f(u.uFlash, flash);
    gl.uniform1f(u.uTop, top ? 1 : 0);
    gl.uniform3f(u.uGlow, 157 / 255, 184 / 255, 1);
    gl.uniform4f(u.uWave, wave.x, wave.y, wave.r, wave.a);
    gl.uniform4f(u.uZoom, zoom.x, zoom.y, zoom.z, 0);
    if (swap) {
      const t = Math.min(1, (now - swap.start) / SWAP_MS);
      gl.uniform4f(u.uSwap, swap.x, swap.y, easeInOut(t) * (diag() * 1.3 + 200) - 100, 1);
    } else gl.uniform4f(u.uSwap, 0, 0, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const render2D = () => {
    const { bg, cut } = imgs[mode];
    const put = (ctx, im) => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      if (im) {
        const z = zoom.z;
        const w = layout.W * cover.s * z;
        const h = layout.H * cover.s * z;
        ctx.drawImage(im, zoom.x + (cover.ox - zoom.x) * z, zoom.y + (cover.oy - zoom.y) * z, w, h);
      }
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(mask, 0, 0, W, H);
      if (flash > 0.02) {
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = `rgba(255,246,232,${flash * 0.85})`;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = 'source-over';
    };
    put(ctxA, bg);
    put(ctxB, cut);
  };

  const frame = (now) => {
    raf = null;
    if (!alive) return;
    points = points.filter((p) => now - p.t < LIFE);
    pulse *= 0.9;
    flash *= 0.86;
    step(now);
    const animating = (portal && !portal.done) || swap || zoom.z > 1.0005;
    const active = points.length || pointer || animating || flash > 0.02;
    if (!active && !dirty) return;
    dirty = !!active;
    drawMask(now);
    if (gl2d) render2D();
    else { renderGL(A, now, false); renderGL(B, now, true); }
    kick();
  };

  function kick() {
    if (!raf && alive) raf = requestAnimationFrame(frame);
  }

  let last = null;
  const radius = () => Math.min(230, Math.max(130, W * 0.135));
  const addTrail = (x, y) => {
    const now = performance.now();
    if (last) {
      const d = Math.hypot(x - last.x, y - last.y);
      const st = 16;
      for (let i = st; i < d; i += st) {
        const t = i / d;
        points.push({ x: last.x + (x - last.x) * t, y: last.y + (y - last.y) * t, r: radius() * 0.84, t: now, seed: Math.random() * 6.28 });
      }
    }
    last = { x, y };
    if (points.length > 280) points.splice(0, points.length - 280);
  };

  const demo = () => {
    if (touched || !alive || !layout.face) return;
    const fx = cover.ox + layout.face[0] * cover.s;
    const fy = cover.oy + layout.face[1] * cover.s;
    const R = radius();
    const start = performance.now();
    const dur = 1700;
    const tick = (now) => {
      if (touched || !alive) return;
      const t = Math.min(1, (now - start) / dur);
      const e = easeInOut(t);
      const x = fx - R * 1.3 + e * R * 2.6;
      const y = fy - R * 0.35 + Math.sin(e * Math.PI) * R * 0.55;
      pointer = { x, y, r: radius() };
      addTrail(x, y);
      kick();
      if (t < 1) requestAnimationFrame(tick);
      else { pointer = null; last = null; kick(); }
    };
    requestAnimationFrame(tick);
  };

  const transformIn = (x, y) => {
    touched = true;
    full = true;
    portal = { x, y, dir: 1, start: performance.now(), dur: IN_MS, r: 0 };
    flash = 0.25;
    onFull?.(true);
    kick();
  };
  const transformOut = (x, y) => {
    full = false;
    portal = { x, y, dir: -1, start: performance.now(), dur: OUT_MS, r: diag() * 1.25 };
    zoom = { x, y, z: 1 };
    onFull?.(false);
    kick();
  };

  const api = {
    move(x, y) { touched = true; pointer = { x, y, r: radius() }; addTrail(x, y); kick(); },
    leave() { pointer = null; last = null; kick(); },
    setMode(m, x = W / 2, y = H / 2) {
      touched = true;
      if (m === mode) return;
      prevMode = mode;
      mode = m;
      if (full && !gl2d) swap = { x, y, start: performance.now() };
      else { flash = 1; pulse = 0.35; }
      onChange?.(m);
      kick();
    },
    get mode() { return mode; },
    toggleFull(x, y) { if (full) transformOut(x, y); else transformIn(x, y); },
    get full() { return full; },
    demo,
    get webgl() { return !gl2d; },
    resize,
    destroy() {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      [A, B].forEach((R) => R?.gl.getExtension('WEBGL_lose_context')?.loseContext());
    },
  };

  resize();
  window.addEventListener('resize', resize);
  if (gl2d) {
    modes.forEach((m, i) => {
      loadImage(m.bg).then((im) => { imgs[i].bg = im; kick(); });
      loadImage(m.cut).then((im) => { imgs[i].cut = im; kick(); });
    });
  } else {
    loadImage(hero.bg).then((im) => { if (im && alive) A.hero = A.tex(im); });
    loadImage(hero.cut).then((im) => { if (im && alive) B.hero = B.tex(im); });
    modes.forEach((m, i) => {
      loadImage(m.bg).then((im) => { if (im && alive) A.alts[i] = A.tex(im); });
      loadImage(m.cut).then((im) => { if (im && alive) B.alts[i] = B.tex(im); });
    });
  }
  return api;
}
