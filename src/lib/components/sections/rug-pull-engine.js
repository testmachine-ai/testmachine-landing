// @ts-nocheck
// Auto-extracted from rug-pull-widget.html — do not edit manually
export function initRugPullWidget(canvas, statsModal, modalCloseBtn) {
  'use strict';



// ── KDE Distribution Data ──
const KDE_X = [0.0,0.005,0.01,0.015,0.02,0.025,0.03,0.035,0.04,0.045,0.05,0.055,0.06,0.065,0.07,0.075,0.08,0.085,0.09,0.095,0.1,0.105,0.11,0.115,0.12,0.125,0.13,0.135,0.14,0.145,0.15,0.155,0.16,0.165,0.17,0.175,0.18,0.185,0.19,0.195,0.2,0.205,0.21,0.215,0.22,0.225,0.23,0.235,0.24,0.245,0.25,0.255,0.26,0.265,0.27,0.275,0.28,0.285,0.29,0.295,0.3,0.305,0.31,0.315,0.32,0.325,0.33,0.335,0.34,0.345,0.35,0.355,0.36,0.365,0.37,0.375,0.38,0.385,0.39,0.395,0.4,0.405,0.41,0.415,0.42,0.425,0.43,0.435,0.44,0.445,0.45,0.455,0.46,0.465,0.47,0.475,0.48,0.485,0.49,0.495,0.5,0.505,0.51,0.515,0.52,0.525,0.53,0.535,0.54,0.545,0.55,0.555,0.56,0.565,0.57,0.575,0.58,0.585,0.59,0.595,0.6,0.605,0.61,0.615,0.62,0.625,0.63,0.635,0.64,0.645,0.65,0.655,0.66,0.665,0.67,0.675,0.68,0.685,0.69,0.695,0.7,0.705,0.71,0.715,0.72,0.725,0.73,0.735,0.74,0.745,0.75,0.755,0.76,0.765,0.77,0.775,0.78,0.785,0.79,0.795,0.8,0.805,0.81,0.815,0.82,0.825,0.83,0.835,0.84,0.845,0.85,0.855,0.86,0.865,0.87,0.875,0.88,0.885,0.89,0.895,0.9,0.905,0.91,0.915,0.92,0.925,0.93,0.935,0.94,0.945,0.95,0.955,0.96,0.965,0.97,0.975,0.98,0.985,0.99,0.995,1.0];
const RUG_KDE = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.0001,.0003,.001,.0031,.0087,.0218,.0491,.0988,.178,.2868,.4136,.5338,.6163,.6368,.5888,.4872,.3607,.2389,.1417,.0751,.0357,.0152,.0058,.002,.0006,.0002,.0002,.0005,.0014,.0035,.0078,.0158,.0287,.0466,.0676,.0879,.1022,.1063,.0989,.0824,.0614,.041,.0244,.0131,.0062,.0027,.001,.0003,.0001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.0001,.0002,.0007,.0018,.0045,.0099,.0193,.0338,.0529,.0743,.0932,.1047,.1052,.0946,.0761,.0548,.0353,.0204,.0105,.0048,.002,.0007,.0002,.0001,0,0,.0001,.0002,.0009,.0029,.0083,.0217,.0507,.1063,.1996,.3369,.5126,.7068,.892,1.0464,1.167,1.2716,1.3878,1.5414,1.7595,2.0995,2.6902,3.7527,5.5569,8.2917,11.8794,15.8373,19.3181,21.3834,21.4038,19.358,15.8367,11.7548,7.9602,4.9663,2.906,1.651,.973,.6566,.5431,.5286,.547,.5566,.5348,.4761,.3889,.2901,.197,.1215,.0679,.0343,.0157,.0065,.0024,.0008,.0002,.0001,0,0,0,0];
const CLEAN_KDE = [.0834,.1832,.3623,.6448,1.0324,1.487,1.9271,2.248,2.3626,2.2406,1.9228,1.5009,1.0763,.7228,.471,.3153,.2322,.197,.1913,.2023,.2199,.2343,.2391,.2342,.2284,.2366,.2732,.3457,.4496,.568,.6767,.7533,.7855,.7751,.7338,.6751,.6076,.5336,.4523,.3655,.2787,.2013,.1447,.125,.1718,.3457,.7604,1.5965,3.0778,5.3847,8.5071,12.1027,15.4795,17.785,18.3549,17.0323,14.2483,10.8084,7.5248,4.9224,3.151,2.0847,1.4896,1.1537,.9405,.7831,.6551,.5455,.4465,.3531,.2644,.1844,.1181,.069,.0365,.0174,.0075,.0029,.001,.0003,.0001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.0001,.0003,.001,.0031,.0082,.0199,.0429,.0829,.1433,.2217,.3069,.3801,.4214,.4181,.3716,.2967,.2145,.1444,.0976,.0769,.0789,.0979,.13,.1754,.2394,.3284,.4434,.5719,.687,.7563,.7571,.6884,.5723,.4421,.3265,.2393,.1794,.1375,.1047,.0763,.0517,.0323,.0193,.0128,.0128,.0191,.0319,.0502,.072,.0933,.1098,.1191,.1215,.1206,.1201,.1214,.1231,.1221,.1166,.1082,.1014,.1012,.1114,.1333,.1685,.2207,.2966,.4018,.5338,.6762,.7998,.8722,.871,.7949,.6635,.5078,.3577,.2328,.1405,.0787,.0409,.0196,.0087,.0035,.0013,.0004,.0001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ── Design Constants (oklch palette — same as tutorial) ──
const BG = '#1b1b28';  // oklch(0.13 0.005 260)
const COL = {
  fg:      '#e8e8ec',
  muted:   '#9898a0',
  dim:     '#606068',
  accent:  '#4ecdc4',
  danger:  '#ef4444',
  safe:    '#22c55e',
  raised:  '#222232',
  border:  '#3a3a4a',
  borderS: '#2e2e3e',
};
const ACT0_DUR = 0; // no preamble — integrated into Act 1
const TOTAL = 145;
const ACTS = [
  { s: 0,  e: 28 },  // Act 1: token launch + brand + dancing dist + narrative + "measure everything"
  { s: 28, e: 46 },  // Act 2: Signal 1 — code analysis (18s)
  { s: 46, e: 62 },  // Act 3: Signal 2 — creator history (16s)
  { s: 62, e: 80 },  // Act 4: Signals 3+ — remaining evidence + callout (18s)
  { s: 80, e: 90 },  // Act 5: verdict (10s)
  { s: 90, e: 106 }, // Act 6: the rug pull happens (16s)
  { s: 106, e: 122 }, // Act 7: proof (16s)
  { s: 122, e: 145 }, // Act 8: branding close (23s)
];

// ── Canvas Setup (bounded, DPR-aware) ──
// canvas passed as parameter
const ctx = canvas.getContext('2d');
let W, H, dpr;
let _graphCache = null; // declared early so resize() can clear it

function resize() {
  dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  W = rect.width;
  H = rect.height;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  _graphCache = null;
}
let _destroyed = false;
window.addEventListener('resize', resize);
resize();

// ── Mobile detection & font scaling ──
const isMobile = () => W < 500;
const mf = (sz) => isMobile() ? sz * 0.72 : sz;

// ── Scale factor for compact layout (~75%) ──
const S = 0.75;

// ── Easing & Math ──
function easeIO(t) { return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }
function easeO(t) { return 1 - Math.pow(1 - t, 3); }
function easeI(t) { return t * t * t; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function prog(t, s, d) { return clamp((t - s) / d, 0, 1); }
function fi(t, s, d) { return easeO(prog(t, s, d)); }
function fo(t, s, d) { return 1 - easeI(prog(t, s, d)); }
function actA(t, act, fiDur, foDur) {
  fiDur = fiDur || 1.0;
  foDur = foDur || 1.0;
  return Math.min(fi(t, act.s, fiDur), t < act.e - foDur ? 1 : fo(t, act.e - foDur, foDur));
}

// ── Font Helper ──
function font(sz, fam, wt) {
  ctx.font = `${wt || 400} ${sz}px ${fam || 'Manrope'}, sans-serif`;
}

// ── Typography: Label ──
function drawLabel(text, x, y, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const sz = H * 0.022;
  font(sz, 'JetBrains Mono', 500);
  ctx.fillStyle = COL.accent;
  ctx.letterSpacing = '0.12em';
  const m = ctx.measureText(text.toUpperCase());
  const px = H * 0.01, py = H * 0.01;
  const boxH = sz + py * 2;
  const boxY = y - boxH / 2;
  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - px, boxY, m.width + px*2, boxH, 3);
  ctx.stroke();
  ctx.textBaseline = 'middle';
  ctx.fillText(text.toUpperCase(), x, boxY + boxH / 2 + sz * 0.08);
  ctx.textBaseline = 'alphabetic';
  ctx.letterSpacing = '0px';
  ctx.restore();
}

// ── Distribution Stages ──
function gauss(x, mu, sig) {
  const d = (x - mu) / sig;
  return Math.exp(-0.5 * d * d) / (sig * 2.5066);
}
function mkDist(stage) {
  const raw = KDE_X.map((x, i) => {
    if (stage === 0) return 1.0; // Uniform prior — "we know nothing"
    if (stage === 1) return gauss(x, 0.65, 0.13) + gauss(x, 0.18, 0.05) * 0.2;
    if (stage === 2) return gauss(x, 0.82, 0.06) + gauss(x, 0.10, 0.03) * 0.06;
    if (stage === 3) return gauss(x, 0.94, 0.022);
    return RUG_KDE[i] * 0.85 + CLEAN_KDE[i] * 0.15;
  });
  // Normalize: area under curve = 1 (trapezoidal)
  const dx = 1.0 / (raw.length - 1);
  let area = 0;
  for (let i = 0; i < raw.length - 1; i++) area += (raw[i] + raw[i+1]) * 0.5 * dx;
  if (area > 0) for (let i = 0; i < raw.length; i++) raw[i] /= area;
  return raw;
}
const dStages = [0,1,2,3,4].map(mkDist);
function iDist(a, b, t) { return dStages[a].map((v, i) => lerp(v, dStages[b][i], t)); }

// Continuous interpolation across fractional stages
function iDistCont(stage) {
  const a = Math.floor(stage);
  const b = Math.min(a + 1, 4);
  const frac = stage - a;
  return iDist(a, b, frac);
}

// ── Card ──
function drawCard(x, y, w, h, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha * 0.85;
  ctx.fillStyle = COL.raised;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.fill();
  // Teal left accent bar
  ctx.globalAlpha = alpha * 0.6;
  ctx.fillStyle = COL.accent;
  ctx.beginPath();
  ctx.roundRect(x, y, 3, h, [6, 0, 0, 6]);
  ctx.fill();
  // Subtle teal border
  ctx.globalAlpha = alpha * 0.15;
  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 6);
  ctx.stroke();
  ctx.restore();
}

// ── Deployer Network (rich topology) ──
// Seeded pseudo-random for deterministic layout
function seededRand(seed) { let s = seed; return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; }; }

function mkGraph(cx, cy, r) {
  const rng = seededRand(42);
  const nodes = [];
  const edges = [];

  // Central deployer wallet (the suspect)
  nodes.push({ x: cx, y: cy, type: 'deployer', alive: false, size: 1.6, label: 'DEPLOYER' });

  // Cluster 1: tokens launched (inner ring) — mostly dead
  const c1Count = 16;
  for (let i = 0; i < c1Count; i++) {
    const a = (i / c1Count) * Math.PI * 2 - Math.PI * 0.3;
    const d = r * (0.32 + rng() * 0.12);
    const alive = i === 3 || i === 11; // only 2 survived
    nodes.push({ x: cx + Math.cos(a)*d, y: cy + Math.sin(a)*d, type: 'token', alive, size: 0.6 + rng()*0.3 });
    edges.push({ from: 0, to: nodes.length - 1 });
  }

  // Cluster 1b: outer tokens (second ring, even more dead)
  const c1bStart = nodes.length;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.2;
    const d = r * (0.55 + rng() * 0.10);
    nodes.push({ x: cx + Math.cos(a)*d, y: cy + Math.sin(a)*d, type: 'token', alive: false, size: 0.4 + rng()*0.2 });
    // Connected to nearby inner ring token
    edges.push({ from: 1 + (i * 2) % c1Count, to: nodes.length - 1 });
  }

  // Cluster 2: mixer / intermediary wallets (upper-left, more extensive)
  const mixCx = cx - r * 0.65, mixCy = cy - r * 0.50;
  const mixStart = nodes.length;
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const d = r * (0.10 + rng() * 0.08);
    nodes.push({ x: mixCx + Math.cos(a)*d, y: mixCy + Math.sin(a)*d, type: 'mixer', alive: false, size: 0.45 + rng()*0.2 });
  }
  // Chain + loop the mixers
  for (let i = 0; i < 6; i++) edges.push({ from: mixStart + i, to: mixStart + i + 1 });
  edges.push({ from: mixStart + 6, to: mixStart }); // loop
  edges.push({ from: mixStart + 3, to: mixStart }); // shortcut
  // Connect deployer to mixers
  edges.push({ from: 0, to: mixStart });
  edges.push({ from: 0, to: mixStart + 4 });
  // Laundering paths from mixers to tokens
  edges.push({ from: mixStart + 2, to: 3 });
  edges.push({ from: mixStart + 5, to: 7 });
  edges.push({ from: mixStart + 6, to: 12 });

  // Cluster 3: liquidity drain wallets (lower-right, bigger)
  const drainCx = cx + r * 0.70, drainCy = cy + r * 0.45;
  const drainStart = nodes.length;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI * 0.3;
    const d = r * (0.10 + rng() * 0.10);
    nodes.push({ x: drainCx + Math.cos(a)*d, y: drainCy + Math.sin(a)*d, type: 'drain', alive: false, size: 0.35 + rng()*0.3 });
    if (i > 0) edges.push({ from: drainStart, to: drainStart + i });
  }
  // Cross-links within drain cluster
  edges.push({ from: drainStart + 1, to: drainStart + 4 });
  edges.push({ from: drainStart + 3, to: drainStart + 6 });
  // Connect dead tokens to drain cluster
  edges.push({ from: 2, to: drainStart });
  edges.push({ from: 5, to: drainStart });
  edges.push({ from: 8, to: drainStart + 2 });
  edges.push({ from: 11, to: drainStart + 4 });
  edges.push({ from: 14, to: drainStart + 6 });
  edges.push({ from: c1bStart + 2, to: drainStart + 3 });

  // Cluster 4: exchange wallets (far right)
  const exCx = cx + r * 1.0, exCy = cy - r * 0.15;
  const exStart = nodes.length;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const d = r * (0.06 + rng() * 0.04);
    nodes.push({ x: exCx + Math.cos(a)*d, y: exCy + Math.sin(a)*d, type: 'exchange', alive: true, size: 0.5 + rng()*0.2 });
    if (i > 0) edges.push({ from: exStart, to: exStart + i });
  }
  edges.push({ from: drainStart, to: exStart });
  edges.push({ from: drainStart + 5, to: exStart + 2 });

  // Cluster 5: funding source wallets (upper-right, new)
  const fundCx = cx + r * 0.5, fundCy = cy - r * 0.65;
  const fundStart = nodes.length;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.5;
    const d = r * 0.08;
    nodes.push({ x: fundCx + Math.cos(a)*d, y: fundCy + Math.sin(a)*d, type: 'funding', alive: true, size: 0.5 });
    if (i > 0) edges.push({ from: fundStart, to: fundStart + i });
  }
  edges.push({ from: fundStart, to: 0 }); // funded deployer
  edges.push({ from: fundStart + 2, to: mixStart + 1 }); // also funded mixers

  // More cross-links for realistic complexity
  edges.push({ from: 1, to: 6 });
  edges.push({ from: 4, to: 10 });
  edges.push({ from: 9, to: 15 });
  edges.push({ from: mixStart + 1, to: drainStart + 1 });
  edges.push({ from: c1bStart, to: mixStart + 3 });
  edges.push({ from: c1bStart + 4, to: drainStart + 7 });
  edges.push({ from: 13, to: exStart + 3 });

  return { nodes, edges };
}

// Cache the graph (deterministic)
function getGraph(cx, cy, r) {
  if (!_graphCache) _graphCache = mkGraph(cx, cy, r);
  return _graphCache;
}

// ── Distribution Drawing ──
function drawDist(data, cx, cy, cw, ch, alpha, color, rainbow) {
  if (!data) return;
  const mx = Math.max(...data);
  if (mx <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;

  // Adaptive y-axis: scale so current distribution fills ~80% of chart height
  // Area stays normalized (=1), but viewport adapts to show shape dramatically
  const adaptiveMax = mx * 1.25; // 80% fill (1/1.25 = 0.8)

  // Build closed fill path (curve top + baseline)
  ctx.beginPath();
  ctx.moveTo(cx, cy + ch);
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(cx + (i/(data.length-1))*cw, cy + ch - (data[i]/adaptiveMax)*ch);
  }
  ctx.lineTo(cx + cw, cy + ch);
  ctx.closePath();

  if (rainbow) {
    const hg = ctx.createLinearGradient(cx, 0, cx + cw, 0);
    hg.addColorStop(0, 'rgba(34, 197, 94, 0.45)');
    hg.addColorStop(0.35, 'rgba(34, 197, 94, 0.3)');
    hg.addColorStop(0.5, 'rgba(234, 179, 8, 0.35)');
    hg.addColorStop(0.7, 'rgba(239, 68, 68, 0.35)');
    hg.addColorStop(1, 'rgba(239, 68, 68, 0.5)');
    ctx.fillStyle = hg;
    ctx.fill();
  } else {
    const g = ctx.createLinearGradient(cx, cy, cx, cy + ch);
    g.addColorStop(0, color + '4d');
    g.addColorStop(1, color + '08');
    ctx.fillStyle = g;
    ctx.fill();
  }

  // Stroke only the curve (not the sides or baseline)
  ctx.beginPath();
  for (let i = 0; i < data.length; i++) {
    const px = cx + (i/(data.length-1))*cw;
    const py = cy + ch - (data[i]/adaptiveMax)*ch;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  if (rainbow) {
    const sg = ctx.createLinearGradient(cx, 0, cx + cw, 0);
    sg.addColorStop(0, COL.safe);
    sg.addColorStop(0.5, '#eab308');
    sg.addColorStop(1, COL.danger);
    ctx.strokeStyle = sg;
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
  }
  ctx.stroke();

  // Explicit x-axis line
  ctx.strokeStyle = COL.dim;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy + ch);
  ctx.lineTo(cx + cw, cy + ch);
  ctx.stroke();

  ctx.restore();
}

// Smooth KDE arrays with Gaussian kernel for less pointy peaks
function smoothKDE(arr, sigma) {
  const n = arr.length;
  const radius = Math.ceil(sigma * 3);
  const kernel = [];
  let kSum = 0;
  for (let i = -radius; i <= radius; i++) {
    const v = Math.exp(-0.5 * (i / sigma) ** 2);
    kernel.push(v);
    kSum += v;
  }
  kernel.forEach((_, i, a) => a[i] /= kSum);
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = 0; k < kernel.length; k++) {
      const j = i + k - radius;
      if (j >= 0 && j < n) s += arr[j] * kernel[k];
    }
    out[i] = s;
  }
  return out;
}
// Apply smoothing — 2 passes of sigma=3 rounds off pointy peaks nicely
{
  let r = RUG_KDE, c = CLEAN_KDE;
  for (let pass = 0; pass < 2; pass++) {
    r = smoothKDE(r, 3);
    c = smoothKDE(c, 3);
  }
  for (let i = 0; i < r.length; i++) { RUG_KDE[i] = r[i]; CLEAN_KDE[i] = c[i]; }
}

function drawKDE(data, cx, cy, cw, ch, mx, alpha, color, reveal) {
  if (!data) return;
  const ri = Math.floor(reveal * (data.length - 1));
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(cx, cy + ch);
  for (let i = 0; i <= ri; i++) {
    ctx.lineTo(cx + (i/(data.length-1))*cw, cy + ch - (data[i]/mx)*ch*0.85);
  }
  ctx.lineTo(cx + (ri/(data.length-1))*cw, cy + ch);
  ctx.closePath();
  const g = ctx.createLinearGradient(cx, cy, cx, cy + ch);
  g.addColorStop(0, color + '59');
  g.addColorStop(1, color + '08');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.beginPath();
  for (let i = 0; i <= ri; i++) {
    const px = cx + (i/(data.length-1))*cw;
    const py = cy + ch - (data[i]/mx)*ch*0.85;
    if (i === 0) { ctx.moveTo(px, py); }
    else if (i < ri) {
      const nx = cx + ((i+1)/(data.length-1))*cw;
      const ny = cy + ch - (data[Math.min(i+1,ri)]/mx)*ch*0.85;
      ctx.quadraticCurveTo(px, py, (px+nx)/2, (py+ny)/2);
    } else { ctx.lineTo(px, py); }
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawXAxis(cx, cy, cw, ch, alpha, hero) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = COL.dim;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy + ch);
  ctx.lineTo(cx + cw, cy + ch);
  ctx.stroke();
  ctx.textAlign = 'center';
  if (hero) {
    font(H * 0.022, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    ctx.fillText('Probability of rug pull', cx + cw / 2, cy + ch + H * 0.030);
    font(H * 0.028, 'Manrope', 600);
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.safe;
    ctx.fillText('SAFE', cx + cw * 0.01, cy + ch + H * 0.058);
    ctx.textAlign = 'right';
    ctx.fillStyle = COL.danger;
    ctx.fillText('RUG PULL', cx + cw * 0.99, cy + ch + H * 0.058);
  } else {
    font(H * 0.026, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.accent;
    ctx.fillText('Risk', cx + cw / 2, cy + ch + H * 0.05);
    font(H * 0.022, 'Manrope', 600);
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.safe;
    ctx.fillText('SAFE', cx + cw * 0.01, cy + ch + H * 0.05);
    ctx.textAlign = 'right';
    ctx.fillStyle = COL.danger;
    ctx.fillText('HIGH RISK', cx + cw * 0.99, cy + ch + H * 0.05);
  }
  ctx.restore();
}

// ── Coin Icon (half-moon token) ──
function drawCoinIcon(cx, cy, r, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // Outer coin ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Subtle inner glow
  ctx.globalAlpha = alpha * 0.08;
  const glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
  glow.addColorStop(0, COL.accent);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fill();

  // Crescent moon — full circle then punch out an offset circle
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(cx - r * 0.08, cy, r * 0.62, 0, Math.PI * 2);
  ctx.fillStyle = COL.accent;
  ctx.fill();
  // Punch-out (bg-colored circle offset right)
  ctx.beginPath();
  ctx.arc(cx + r * 0.25, cy, r * 0.50, 0, Math.PI * 2);
  ctx.fillStyle = BG;
  ctx.fill();

  // Small star dots (3 tiny stars near the crescent)
  ctx.fillStyle = COL.accent;
  const stars = [
    { dx: 0.35, dy: -0.35, s: 0.04 },
    { dx: 0.45, dy: -0.10, s: 0.03 },
    { dx: 0.38, dy:  0.25, s: 0.035 },
  ];
  stars.forEach(st => {
    ctx.globalAlpha = alpha * 0.9;
    ctx.beginPath();
    ctx.arc(cx + r * st.dx, cy + r * st.dy, r * st.s, 0, Math.PI * 2);
    ctx.fill();
  });

  // Spring coil — "pump" icon, reads cleanly at small scale
  ctx.globalAlpha = alpha * 0.85;
  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = r * 0.07;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const sx = cx + r * 0.05;
  const sTop = cy - r * 0.38;
  const sBot = cy + r * 0.38;
  const sAmp = r * 0.22; // horizontal amplitude of coils
  const coils = 4;
  ctx.beginPath();
  ctx.moveTo(sx, sBot);
  for (let i = 0; i <= coils * 20; i++) {
    const t = i / (coils * 20);
    const y = sBot + (sTop - sBot) * t;
    const x = sx + Math.sin(t * coils * Math.PI * 2) * sAmp;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Small endcap lines (flat bars at top and bottom)
  ctx.beginPath();
  ctx.moveTo(sx - sAmp * 0.7, sBot);
  ctx.lineTo(sx + sAmp * 0.7, sBot);
  ctx.moveTo(sx - sAmp * 0.7, sTop);
  ctx.lineTo(sx + sAmp * 0.7, sTop);
  ctx.stroke();

  // Inner ring detail
  ctx.globalAlpha = alpha * 0.2;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
}

// ── Persistent bottom curve (Acts 2-4) ──
// Tracks a continuous stage that updates incrementally
let persistStage = 0; // will be computed each frame
let danceRiskPct = 50; // risk % during Act 1 dancing distribution

function drawPersistentCurve(t) {
  // Curve appears starting at end of Act 1 phase 2, persists through Act 4
  // During Act 1 phase 2: full size in center (handled by Act 1)
  // Transition: shrink and move to bottom as Act 2 starts
  // Acts 2-4: small curve at bottom, updating with evidence

  // Start as soon as Act 1 distribution is in mini position
  if (t < 23 || t >= ACTS[5].s) return;

  // Fade in — seamless takeover from Act 1 distribution (overlap for smooth cross-fade)
  const curveFadeIn = easeIO(clamp((t - 23) / 2.0, 0, 1));

  // Already in mini position
  const transT = 1;

  // Full size params (Act 1 curve position)
  const fullCx = W*0.12, fullCy = H*0.28, fullCw = W*0.76, fullCh = H*0.30;
  // Keep same size as intro, just shift down below content
  const miniCx = W*0.12, miniCy = H*0.52, miniCw = W*0.76, miniCh = H*0.32;

  const cx = lerp(fullCx, miniCx, transT);
  const cy = lerp(fullCy, miniCy, transT);
  const cw = lerp(fullCw, miniCw, transT);
  const ch = lerp(fullCh, miniCh, transT);

  // Compute current stage based on time
  // Act 2 (10-28): stage 0 → 1, incrementally per finding
  // Stage progression — distribution ONLY shifts when each bullet point is drawn
  // Act 2 findings appear at lt = 2.0, 4.2, 6.4 (lt = t - ACTS[1].s - 6.0)
  // Act 3 findings appear at lt = 4, 5, 7 (lt = t - ACTS[2].s - 6.0)
  // Act 4 findings appear at lt = 1.5, 3.5, 5.5 (lt = t - ACTS[3].s - 6.0)
  let stage = 0;
  if (t >= ACTS[1].s && t < ACTS[2].s) {
    const lt = t - ACTS[1].s - 6.0;
    // Each finding shifts stage by 0.33 — synced with findings at 2.0, 4.2, 6.4
    const f1 = easeIO(clamp((lt - 2.0) / 1.0, 0, 1));
    const f2 = easeIO(clamp((lt - 4.2) / 1.0, 0, 1));
    const f3 = easeIO(clamp((lt - 6.4) / 1.0, 0, 1));
    stage = (f1 * 0.33 + f2 * 0.33 + f3 * 0.34);
  } else if (t >= ACTS[2].s && t < ACTS[3].s) {
    const lt = t - ACTS[2].s - 6.0;
    // Act 3 findings at lt = 4, 5, 7
    const f1 = easeIO(clamp((lt - 4) / 1.0, 0, 1));
    const f2 = easeIO(clamp((lt - 5) / 1.0, 0, 1));
    const f3 = easeIO(clamp((lt - 7) / 1.0, 0, 1));
    stage = 1 + (f1 * 0.33 + f2 * 0.33 + f3 * 0.34);
  } else if (t >= ACTS[3].s) {
    const lt = t - ACTS[3].s - 6.0;
    // Act 4 findings at lt = 1.5, 3.5, 5.5
    const f1 = easeIO(clamp((lt - 1.5) / 2.0, 0, 1));
    const f2 = easeIO(clamp((lt - 3.5) / 2.0, 0, 1));
    const f3 = easeIO(clamp((lt - 5.5) / 2.5, 0, 1));
    stage = 2 + (f1 * 0.33 + f2 * 0.33 + f3 * 0.34);
    if (stage > 3) stage = 3;
  }
  persistStage = stage;

  const data = iDistCont(stage);

  // Fade alpha: fade in after intro card, persist through Act 5, fade out before Act 6
  const fadeOut = t >= ACTS[5].s - 2 ? 1 - easeIO(clamp((t - (ACTS[5].s - 2)) / 2, 0, 1)) : 1;
  const alpha = curveFadeIn * fadeOut * 0.85;

  if (alpha < 0.001) return;

  // Turn red when bezier arrow lands in Signals 3+ act (t ≈ 57.5)
  // Turn red when bezier arrow lands (content lt≈10, raw lt0≈16, t≈61)
  const redShift = easeIO(clamp((t - (ACTS[3].s + 16)) / 1.0, 0, 1));
  // Must output hex color — drawDist appends hex alpha codes
  const rr = Math.round(lerp(0x4e, 0xef, redShift));
  const rg = Math.round(lerp(0xcd, 0x44, redShift));
  const rb = Math.round(lerp(0xc4, 0x44, redShift));
  const curveColor = '#' + rr.toString(16).padStart(2,'0') + rg.toString(16).padStart(2,'0') + rb.toString(16).padStart(2,'0');

  drawXAxis(cx, cy, cw, ch, alpha * 0.7, false);
  drawDist(data, cx, cy, cw, ch, alpha, curveColor);

  // ── Y-axis with scale labels ──
  const distMax = Math.max(...data);
  const adaptiveMax = distMax > 0 ? distMax * 1.25 : 1;
  ctx.save();
  ctx.globalAlpha = alpha * 0.45;
  ctx.strokeStyle = COL.muted;
  ctx.lineWidth = 1;
  // Vertical line
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + ch);
  ctx.stroke();
  // Tick marks and labels
  const nTicks = 4;
  ctx.textAlign = 'right';
  font(H * 0.013, 'JetBrains Mono', 400);
  ctx.fillStyle = COL.muted;
  for (let i = 0; i <= nTicks; i++) {
    const frac = i / nTicks;
    const ty = cy + ch - frac * ch;
    const val = (frac * adaptiveMax).toFixed(1);
    ctx.beginPath();
    ctx.moveTo(cx - 4, ty);
    ctx.lineTo(cx, ty);
    ctx.stroke();
    ctx.globalAlpha = alpha * 0.35;
    ctx.fillText(val, cx - 7, ty + H * 0.004);
  }
  // Rotated axis label — matches Act 1 style (teal, prominent)
  ctx.globalAlpha = alpha * 0.9;
  ctx.fillStyle = COL.accent;
  font(H * 0.020, 'JetBrains Mono', 400);
  ctx.textAlign = 'center';
  ctx.translate(cx - H * 0.045, cy + ch / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Probability of Rug Pull', 0, 0);
  ctx.restore();

}

// ── Risk Score overlay — drawn last so it's in front of everything ──
function drawRiskScoreOverlay(t) {
  // Visible from Act 1 phase 2 through Act 5 — slides with distribution, never disappears
  if (t < 11.0 || t >= ACTS[5].s) return;

  // Position: slides from full to mini at t=11
  const fullCx = W*0.12, fullCy = H*0.28, fullCw = W*0.76, fullCh = H*0.30;
  const miniCx = W*0.12, miniCy = H*0.52, miniCw = W*0.76, miniCh = H*0.32;
  const slideT = t > 22.0 ? easeIO(clamp((t - 22.0) / 1.5, 0, 1)) : 0;
  const cx = lerp(fullCx, miniCx, slideT);
  const cy = lerp(fullCy, miniCy, slideT);
  const cw = lerp(fullCw, miniCw, slideT);
  const ch = lerp(fullCh, miniCh, slideT);

  const fadeIn = fi(t, 11.0, 1.0);
  const fadeOut = t >= ACTS[5].s - 2 ? 1 - easeIO(clamp((t - (ACTS[5].s - 2)) / 2, 0, 1)) : 1;
  const alpha = fadeIn * fadeOut;

  // In Act 1 dancing phase use danceRiskPct; after persistent curve takes over use persistStage
  let riskPct;
  if (t < 24.5) {
    riskPct = danceRiskPct; // tracks the dancing distribution's mean
  } else {
    const stage = persistStage;
    const data = iDistCont(stage);
    let sumVal = 0, sumWeight = 0;
    data.forEach((v, i) => { sumVal += KDE_X[i] * v; sumWeight += v; });
    riskPct = sumWeight > 0 ? Math.round(sumVal / sumWeight * 100) : 50;
  }

  const scoreAlpha = alpha;
  if (scoreAlpha < 0.01) return;

  ctx.save();

  // Color interpolation: green → yellow → red
  const riskT = clamp(riskPct / 100, 0, 1);
  const rG = Math.round(34 + (239 - 34) * riskT);
  const gG = Math.round(197 - (197 - 68) * riskT);
  const bG = Math.round(94 - (94 - 68) * riskT);
  const riskColor = `rgb(${rG},${gG},${bG})`;

  // Dashed mean marker line
  const meanFrac = riskPct / 100;
  const meanX = cx + meanFrac * cw;
  ctx.globalAlpha = scoreAlpha * 0.5;
  ctx.setLineDash([H * 0.008, H * 0.006]);
  ctx.strokeStyle = riskColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(meanX, cy);
  ctx.lineTo(meanX, cy + ch);
  ctx.stroke();
  ctx.setLineDash([]);

  // Compact centered overlay box
  const boxW = cw * 0.20;
  const boxH = ch * 0.58;
  const boxX = cx + (cw - boxW) / 2;
  // Center between the uniform PDF line (cy + ch*0.2) and the x-axis (cy + ch)
  const uniformLineY = cy + ch * 0.2;
  const xAxisY = cy + ch;
  const boxY = (uniformLineY + xAxisY) / 2 - boxH / 2;
  const boxR = H * 0.008;

  ctx.globalAlpha = scoreAlpha * 0.95;
  ctx.fillStyle = 'rgba(14, 17, 23, 0.92)';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
  ctx.fill();

  ctx.globalAlpha = scoreAlpha * 0.3;
  ctx.strokeStyle = riskColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
  ctx.stroke();

  // "RISK" label — prominent
  const centerX = boxX + boxW / 2;
  ctx.textAlign = 'center';
  font(H * 0.036, 'JetBrains Mono', 900);
  ctx.fillStyle = riskColor;
  ctx.globalAlpha = scoreAlpha * 0.9;
  ctx.fillText('RISK', centerX, boxY + boxH * 0.38);

  // Percentage
  ctx.globalAlpha = scoreAlpha;
  font(H * 0.052, 'JetBrains Mono', 800);
  ctx.fillStyle = riskColor;
  ctx.fillText(riskPct + '%', centerX, boxY + boxH * 0.68);

  ctx.restore();
}

// ══════════════════════════════════════════════
// ACT RENDERING (scaled for widget)
// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
// ACT 0: "How likely is this a rug pull?" — animated risk distribution intro
// ══════════════════════════════════════════════
function drawAct0(t) {
  const lt = t;
  const cx = W*0.12, cy = H*0.28, cw = W*0.76, ch = H*0.38;
  const fadeOut = lt > ACT0_DUR - 1.5 ? fo(lt, ACT0_DUR - 1.5, 1.2) : 1;

  // Title
  const titleA = fi(lt, 0.2, 0.8) * fadeOut;
  if (titleA > 0.001) {
    ctx.save();
    ctx.globalAlpha = titleA;
    ctx.textAlign = 'center';
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.fillText('Is this a rug pull?', W/2, H*0.10);
    ctx.restore();
  }

  // Axes — fade in
  const axA = fi(lt, 0.3, 0.8) * fadeOut;
  if (axA > 0.001) {
    ctx.save();
    // X-axis line
    ctx.globalAlpha = axA * 0.5;
    ctx.strokeStyle = COL.dim;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy + ch);
    ctx.lineTo(cx + cw, cy + ch);
    ctx.stroke();

    // X-axis labels
    ctx.globalAlpha = axA * 0.8;
    ctx.textAlign = 'center';
    font(H * 0.026, 'JetBrains Mono', 500);
    ctx.fillStyle = COL.accent;
    ctx.fillText('Risk', cx + cw/2, cy + ch + H*0.05);

    ctx.globalAlpha = axA * 0.4;
    font(H * 0.018, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'left';
    ctx.fillText('Safe', cx, cy + ch + H*0.05);
    ctx.textAlign = 'right';
    ctx.fillText('Rug Pull', cx + cw, cy + ch + H*0.05);

    // Y-axis label
    ctx.save();
    ctx.globalAlpha = axA * 0.8;
    ctx.translate(cx - H*0.04, cy + ch/2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    font(H * 0.026, 'JetBrains Mono', 500);
    ctx.fillStyle = COL.accent;
    ctx.fillText('Probability', 0, 0);
    ctx.restore();

    ctx.restore();
  }

  // Animated distribution — shifts around showing different risk profiles, then flattens
  const curveA = fi(lt, 0.6, 0.8) * fadeOut;
  if (curveA > 0.001) {
    // Phase 1 (0.6–6s): curve dances between different centers/widths
    // Phase 2 (6–8.5s): settles to uniform (flat)
    const flattenT = easeIO(clamp((lt - 6.0) / 2.0, 0, 1));

    // Oscillating center and width for the dancing phase
    // Use multiple sine waves for organic movement
    const center = 0.3 + 0.35 * Math.sin(lt * 1.8) + 0.1 * Math.sin(lt * 3.1 + 1);
    const sigma = 0.08 + 0.06 * Math.sin(lt * 2.3 + 0.5);

    const pts = 100;
    ctx.save();

    // Draw filled curve
    ctx.globalAlpha = curveA * 0.7;
    ctx.beginPath();
    ctx.moveTo(cx, cy + ch);
    for (let i = 0; i <= pts; i++) {
      const frac = i / pts;
      const x = cx + frac * cw;
      // Interpolate between gaussian and flat
      const gauss = Math.exp(-Math.pow((frac - center) / sigma, 2));
      const flat = 0.15; // low flat line
      const val = lerp(gauss, flat, flattenT);
      const y = cy + ch - val * ch * 0.85;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(cx + cw, cy + ch);
    ctx.closePath();
    const gr = ctx.createLinearGradient(cx, cy, cx, cy + ch);
    gr.addColorStop(0, COL.accent + '40');
    gr.addColorStop(1, COL.accent + '08');
    ctx.fillStyle = gr;
    ctx.fill();

    // Stroke curve top
    ctx.beginPath();
    for (let i = 0; i <= pts; i++) {
      const frac = i / pts;
      const x = cx + frac * cw;
      const gauss = Math.exp(-Math.pow((frac - center) / sigma, 2));
      const flat = 0.15;
      const val = lerp(gauss, flat, flattenT);
      const y = cy + ch - val * ch * 0.85;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = COL.accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  // Explanatory text — changes with phases
  // Phase 1: "Every token has a different risk profile."
  const exp1A = fi(lt, 1.2, 0.8) * (lt > 5.5 ? fo(lt, 5.5, 0.8) : 1);
  if (exp1A > 0.001) {
    ctx.save();
    ctx.globalAlpha = exp1A * 0.6;
    ctx.textAlign = 'center';
    font(H * 0.026, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    ctx.fillText('Every token has a different risk profile.', W/2, H*0.78);
    ctx.restore();
  }

  // Phase 2: "But for a new token, we start with nothing."
  const exp2A = fi(lt, 6.2, 0.8) * fadeOut;
  if (exp2A > 0.001) {
    ctx.save();
    ctx.globalAlpha = exp2A * 0.6;
    ctx.textAlign = 'center';
    font(H * 0.026, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    // Split to highlight $MOONPUMP
    const _fp1 = 'For '; const _fp2 = '$MOONPUMP'; const _fp3 = ', we start with nothing.';
    const _fp1w = ctx.measureText(_fp1).width;
    font(H * 0.026, 'JetBrains Mono', 700);
    const _fp2w = ctx.measureText(_fp2).width;
    font(H * 0.026, 'JetBrains Mono', 400);
    const _fp3w = ctx.measureText(_fp3).width;
    const _fpsx = W/2 - (_fp1w + _fp2w + _fp3w)/2;
    ctx.textAlign = 'left';
    ctx.fillText(_fp1, _fpsx, H*0.78);
    ctx.fillStyle = COL.accent;
    font(H * 0.026, 'JetBrains Mono', 700);
    ctx.fillText(_fp2, _fpsx + _fp1w, H*0.78);
    ctx.fillStyle = COL.muted;
    font(H * 0.026, 'JetBrains Mono', 400);
    ctx.fillText(_fp3, _fpsx + _fp1w + _fp2w, H*0.78);
    ctx.restore();
  }
}

function drawAct1(t) {
  // Phase 1: Token launch (0–3.5s) — BIGGER with coin icon
  const a1 = fi(t, 0.3, 0.8) * (t > 3.0 ? fo(t, 3.0, 0.6) : 1);
  if (a1 > 0.001) {
    ctx.save(); ctx.textAlign = 'center';
    // Coin icon + text — vertically centered between top and nav dots (H*0.95)
    drawCoinIcon(W/2, H*0.28, H*0.055, a1);

    // Line 1: "A new token called" — light, elegant, smaller
    ctx.globalAlpha = a1 * 0.7;
    font(H * 0.038, 'Manrope', 300);
    ctx.letterSpacing = '0.08em';
    ctx.fillStyle = COL.muted;
    ctx.fillText('A NEW TOKEN CALLED', W/2, H*0.44);
    ctx.letterSpacing = '0px';

    // Line 2: "$MOONPUMP" — mono, big, teal, the star of the show
    ctx.globalAlpha = a1;
    font(H * 0.10, 'JetBrains Mono', 600);
    ctx.letterSpacing = '0.02em';
    ctx.fillStyle = COL.accent;
    ctx.fillText('$MOONPUMP', W/2, H*0.56);
    ctx.letterSpacing = '0px';

    // Line 3: "just launched!" — big, bold, white
    ctx.globalAlpha = a1;
    font(H * 0.08, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.fillText('just launched!', W/2, H*0.68);
    ctx.restore();
  }

  // ── Phase 2a: The question — text only, no chart yet (3.5–8s) ──

  // "Is this token a rug pull?" — FULL SCREEN, massive, dead center
  const ta = fi(t, 3.5, 1.0) * (t > 5.5 ? fo(t, 5.5, 1.0) : 1);
  if (ta > 0.001) {
    ctx.save(); ctx.textAlign = 'center'; ctx.globalAlpha = ta;
    if (isMobile()) {
      font(H * 0.080, 'Manrope', 900);
      ctx.fillStyle = COL.fg;
      ctx.fillText('Is this token', W/2, H*0.42);
      ctx.fillText('a rug pull?', W/2, H*0.52);
    } else {
      font(H * 0.10, 'Manrope', 900);
      ctx.fillStyle = COL.fg;
      ctx.fillText('Is this token', W/2, H*0.40);
      ctx.fillText('a rug pull?', W/2, H*0.53);
    }
    ctx.restore();
  }

  // "TestMachine can estimate the probability." — arrives AFTER question fades
  const ta2 = fi(t, 6.5, 1.0) * (t > 9.0 ? fo(t, 9.0, 1.0) : 1);
  if (ta2 > 0.001) {
    ctx.save(); ctx.textAlign = 'center'; ctx.globalAlpha = ta2;

    // Logo above the text — big brand moment
    if (_tealLogo) {
      const lsz = H * 0.28;
      ctx.drawImage(_tealLogo, W/2 - lsz/2, H * 0.12, lsz, lsz);
    }

    ctx.fillStyle = COL.fg;
    if (isMobile()) {
      font(H * 0.065, 'Manrope', 900);
      ctx.fillText('TestMachine can estimate', W/2, H*0.44);
      ctx.fillText('the risk.', W/2, H*0.54);
    } else {
      font(H * 0.09, 'Manrope', 900);
      ctx.fillText('TestMachine can estimate', W/2, H*0.44);
      ctx.fillText('the risk.', W/2, H*0.56);
    }
    ctx.restore();
  }

  // ── Phase 2b: Distribution drops in (10.5s+) — after brand scene fully fades ──
  const aa = fi(t, 10.5, 1.0); // stays visible through Phase 3 — persistent curve takes over

  // The distribution moves through deliberate positions, narrated:
  // 8–10.5s: peaked LEFT (safe) → "Probably safe."
  // 10.5–13s: peaked RIGHT (danger) → "Probably a rug pull."
  // 13–15s: flattens → "But for $MOONPUMP — we don't know yet."
  // 15–18s: flat → "No history. No signal. No evidence."

  // "This is what a safe token looks like." — green, clean fade-in
  const safeTxt = fi(t, 11.0, 0.8) * (t > 13.0 ? fo(t, 13.0, 0.6) : 1);
  if (safeTxt > 0.001) {
    ctx.save(); ctx.textAlign = 'center'; ctx.globalAlpha = safeTxt;
    font(H * 0.048, 'Manrope', 800);
    ctx.fillStyle = COL.safe;
    ctx.fillText('This is what a safe token looks like.', W/2, H*0.10);
    ctx.restore();
  }

  // "This is what a rug pulled token looks like." — red, clean fade-in
  const dangerTxt = fi(t, 13.5, 0.8) * (t > 15.5 ? fo(t, 15.5, 0.6) : 1);
  if (dangerTxt > 0.001) {
    ctx.save(); ctx.textAlign = 'center'; ctx.globalAlpha = dangerTxt;
    font(H * 0.048, 'Manrope', 800);
    ctx.fillStyle = COL.danger;
    ctx.fillText('This is what a rug pulled token looks like.', W/2, H*0.10);
    ctx.restore();
  }

  // "But for $MOONPUMP — we don't know yet." — as curve flattens
  const tb = fi(t, 16.0, 1.0) * (t > 19.0 ? fo(t, 19.0, 0.8) : 1);
  if (tb > 0.001) {
    ctx.save(); ctx.globalAlpha = tb;
    const _fsz = H * 0.048;
    const _pre = 'But for ';
    const _tk = '$MOONPUMP';
    const _post = ' — we don\'t know yet.';
    font(_fsz, 'Manrope', 800);
    const _preW = ctx.measureText(_pre).width;
    font(_fsz, 'JetBrains Mono', 800);
    const _tkW = ctx.measureText(_tk).width;
    font(_fsz, 'Manrope', 800);
    const _postW = ctx.measureText(_post).width;
    const _totalW = _preW + _tkW + _postW;
    const _sx = W/2 - _totalW/2;
    ctx.textAlign = 'left';
    ctx.fillStyle = COL.fg;
    ctx.fillText(_pre, _sx, H*0.10);
    ctx.fillStyle = COL.accent;
    font(_fsz, 'JetBrains Mono', 800);
    ctx.fillText(_tk, _sx + _preW, H*0.10);
    ctx.fillStyle = COL.fg;
    font(_fsz, 'Manrope', 800);
    ctx.fillText(_post, _sx + _preW + _tkW, H*0.10);
    ctx.restore();
  }

  // "No history. No signal. No evidence." — enters AFTER "But for $MOONPUMP" fades
  const tb2 = fi(t, 20.0, 0.8) * (t > 21.5 ? fo(t, 21.5, 0.8) : 1);
  if (tb2 > 0.001) {
    ctx.save(); ctx.textAlign = 'center'; ctx.globalAlpha = tb2;
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.fillText('No history. No signal. No evidence.', W/2, H*0.10);
    ctx.restore();
  }

  // Show the flat/wide prior distribution — slides down during Phase 3, persists until persistent curve fully takes over
  const distAlpha = Math.min(fi(t, 10.5, 1.0), t > 25 ? fo(t, 25, 2.0) : 1); // appears after brand scene fades, cross-fades with persistent curve
  if (distAlpha > 0.001) {
    const slideT = t > 22.0 ? easeIO(clamp((t - 22.0) / 1.5, 0, 1)) : 0;
    const cx2 = W*0.12, cy2 = lerp(H*0.28, H*0.52, slideT), cw2 = W*0.76, ch2 = lerp(H*0.30, H*0.32, slideT);
    drawXAxis(cx2, cy2, cw2, ch2, distAlpha, false);

    // Deliberate distribution positions synced with narrative:
    // 10.5–13s: peaked at 0.2 (safe side) — "Probably safe."
    // 13–15.5s: peaked at 0.85 (danger side) — "Probably a rug pull."
    // 15.5–17.5s: transition to flat — "We don't know yet."
    // 17.5+: flat uniform — "No evidence."

    let center, sigma, flattenT;
    if (t < 13) {
      // Safe position — peak left
      const moveIn = easeIO(clamp((t - 10.5) / 1.0, 0, 1));
      center = lerp(0.5, 0.2, moveIn);
      sigma = lerp(0.2, 0.10, moveIn);
      flattenT = 0;
    } else if (t < 15.5) {
      // Danger position — sweep right
      const moveRight = easeIO(clamp((t - 13) / 1.2, 0, 1));
      center = lerp(0.2, 0.85, moveRight);
      sigma = 0.10;
      flattenT = 0;
    } else {
      // Flatten to uniform
      const flatProg = easeIO(clamp((t - 15.5) / 2.0, 0, 1));
      center = lerp(0.85, 0.5, flatProg);
      sigma = lerp(0.10, 0.3, flatProg);
      flattenT = flatProg;
    }

    if (flattenT >= 0.99) {
      drawDist(dStages[0], cx2, cy2, cw2, ch2, distAlpha, COL.accent);
      danceRiskPct = 50;
    } else {
      // Color shifts with position: green when left, teal in middle, red when right
      const riskFrac = clamp(center, 0, 1);
      const danceDist = KDE_X.map(x => {
        const gauss = Math.exp(-Math.pow((x - center) / sigma, 2));
        const flat = 1.0;
        return lerp(gauss, flat, flattenT);
      });
      // Color: interpolate green → teal → red based on center position
      let distColor;
      if (riskFrac < 0.4) {
        distColor = COL.safe;
      } else if (riskFrac > 0.7) {
        distColor = COL.danger;
      } else {
        distColor = COL.accent;
      }
      drawDist(danceDist, cx2, cy2, cw2, ch2, distAlpha, flattenT > 0.5 ? COL.accent : distColor);
      // Update risk score
      let sumV = 0, sumW = 0;
      danceDist.forEach((v, i) => { sumV += KDE_X[i] * v; sumW += v; });
      danceRiskPct = sumW > 0 ? Math.round(sumV / sumW * 100) : 50;
    }

    // Vertical "Probability" axis — only in Act 1
    ctx.save();
    ctx.globalAlpha = distAlpha * 0.5;
    // Vertical line
    ctx.strokeStyle = COL.muted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx2, cy2);
    ctx.lineTo(cx2, cy2 + ch2);
    ctx.stroke();
    // Small tick marks
    for (let i = 0; i <= 4; i++) {
      const ty = cy2 + (i / 4) * ch2;
      ctx.beginPath();
      ctx.moveTo(cx2 - 4, ty);
      ctx.lineTo(cx2, ty);
      ctx.stroke();
    }
    // Rotated label — always teal, prominent
    // Fade axis labels out as distribution slides (they'd look odd moving)
    const axisAlpha = distAlpha * (1 - slideT);
    ctx.globalAlpha = axisAlpha * 0.9;
    font(H * 0.026, 'JetBrains Mono', 400);
    ctx.textAlign = 'center';
    ctx.translate(cx2 - H * 0.04, cy2 + ch2 / 2);
    ctx.rotate(-Math.PI / 2);
    const txt1 = 'Probability of ';
    const txt2 = 'Rug Pull';
    const tw1 = ctx.measureText(txt1).width;
    const tw2 = ctx.measureText(txt2).width;
    const totalTW = tw1 + tw2;
    ctx.textAlign = 'left';
    const startTX = -totalTW / 2;
    ctx.fillStyle = COL.accent;
    ctx.globalAlpha = axisAlpha * 0.9;
    ctx.fillText(txt1, startTX, 0);
    ctx.fillStyle = COL.accent;
    ctx.globalAlpha = axisAlpha * 0.95;
    font(H * 0.026, 'JetBrains Mono', 700);
    ctx.fillText(txt2, startTX + tw1, 0);
    ctx.restore();
  }

  // Lines 4 & 5 removed — "No history. No signal. No evidence." says it all

  // Phase 3: "But what do we measure?" above the slid-down distribution
  const wmIn = fi(t, 22.5, 1.0);
  const wmOut = t > 27.5 ? fo(t, 27.5, 0.5) : 1;
  const wmA = wmIn * wmOut;
  if (wmA > 0.001) {
    ctx.save();
    ctx.textAlign = 'center';

    // "But what do we measure?" — above the distribution
    const q1Out = t > 24.5 ? 1 - easeIO(clamp((t - 24.5) / 0.8, 0, 1)) : 1;
    const q1A = wmIn * q1Out;
    if (q1A > 0.001) {
      ctx.globalAlpha = q1A;
      font(H * 0.060, 'Manrope', 800);
      ctx.fillStyle = COL.fg;
      ctx.fillText('What should we measure?', W / 2, H * 0.10);
    }

    // Hero: "TestMachine measures" + "Everything." — vertically centered between top and distribution (H*0.52)
    const heroIn = fi(t, 25.0, 0.8);
    const heroA = heroIn * wmOut;
    if (heroA > 0.001) {
      // "Everything." — massive, white, centered between top and distribution
      ctx.globalAlpha = heroA;
      font(H * 0.08, 'Manrope', 900);
      ctx.fillStyle = COL.fg;
      ctx.fillText("Let's Measure Everything.", W / 2, H * 0.30);
    }

    ctx.restore();
  }
}

// Pending intro card — drawn last in frame to cover everything
let _pendingIntro = null;

function drawSignalIntro(lt, aa, title, subtitle) {
  const introIn = easeIO(clamp((lt - 0.1) / 0.8, 0, 1));
  const introOut = lt > 5.5 ? 1 - easeIO(clamp((lt - 5.5) / 1.0, 0, 1)) : 1;
  const introA = introIn * introOut * aa;
  if (introA < 0.01) return;
  // Store for deferred rendering
  _pendingIntro = { alpha: introA, lt, title, subtitle };
}

function drawPendingIntro() {
  if (!_pendingIntro) return;
  const { alpha, lt, title, subtitle } = _pendingIntro;
  _pendingIntro = null;

  ctx.save();

  // Phase 1: White flash slam (0–0.3s)
  const flashProg = clamp(lt / 0.3, 0, 1);
  const flashA = flashProg < 1 ? (1 - flashProg) * alpha : 0;

  // Background covers only top portion — distribution stays visible below
  const introBgH = H * 0.48;
  const bgLum = flashA * 0.95;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgb(${Math.round(bgLum * 255)},${Math.round(bgLum * 255)},${Math.round(bgLum * 255)})`;
  ctx.fillRect(0, 0, W, introBgH);
  // Dark bg below to clean up any text artifacts, but let distribution show through
  ctx.fillStyle = BG;
  ctx.fillRect(0, introBgH, W, H * 0.04);

  // Scanline effect during transition
  if (flashA > 0.05) {
    ctx.globalAlpha = flashA * 0.15;
    for (let y = 0; y < introBgH; y += 4) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, y, W, 2);
    }
  }

  // Horizontal accent line that sweeps across
  const sweepProg = easeIO(clamp((lt - 0.1) / 0.5, 0, 1));
  if (sweepProg > 0 && sweepProg < 1) {
    ctx.globalAlpha = alpha * (1 - sweepProg) * 0.8;
    ctx.fillStyle = COL.accent;
    const lineY = H * 0.22;
    ctx.fillRect(0, lineY - 1, W * sweepProg, 2);
  }

  // Title — big, centered, punches in with slight scale
  const titleIn = easeIO(clamp((lt - 0.2) / 0.5, 0, 1));
  if (titleIn > 0) {
    const titleScale = lerp(1.15, 1.0, titleIn);
    ctx.save();
    ctx.translate(W / 2, H * 0.22);
    ctx.scale(titleScale, titleScale);
    ctx.globalAlpha = alpha * titleIn;
    ctx.textAlign = 'center';
    font(H * 0.075, 'Manrope', 800);
    ctx.fillStyle = COL.accent;
    ctx.fillText(title, 0, 0);
    ctx.restore();
  }

  // Thin accent rule under title
  const ruleIn = easeIO(clamp((lt - 0.5) / 0.4, 0, 1));
  if (ruleIn > 0) {
    ctx.globalAlpha = alpha * ruleIn * 0.6;
    ctx.fillStyle = COL.accent;
    const ruleW = W * 0.25 * ruleIn;
    ctx.fillRect(W / 2 - ruleW / 2, H * 0.26, ruleW, 2);
  }

  // Subtitle — fades in after title settles
  const subIn = easeIO(clamp((lt - 0.8) / 0.6, 0, 1));
  if (subIn > 0) {
    ctx.globalAlpha = alpha * subIn * 0.85;
    ctx.textAlign = 'center';
    font(H * 0.036, 'Manrope', 500);
    ctx.fillStyle = COL.fg;
    const _drawSubLine = (line, y) => {
      const tk = '$MOONPUMP';
      const idx = line.indexOf(tk);
      if (idx < 0) { ctx.fillText(line, W / 2, y); return; }
      const before = line.slice(0, idx);
      const after = line.slice(idx + tk.length);
      font(H * 0.036, 'Manrope', 500);
      const bW = ctx.measureText(before).width;
      font(H * 0.036, 'JetBrains Mono', 700);
      const tW = ctx.measureText(tk).width;
      font(H * 0.036, 'Manrope', 500);
      const aW = ctx.measureText(after).width;
      const totalW = bW + tW + aW;
      const startX = W / 2 - totalW / 2;
      ctx.textAlign = 'left';
      ctx.fillStyle = COL.fg;
      font(H * 0.036, 'Manrope', 500);
      ctx.fillText(before, startX, y);
      ctx.fillStyle = COL.accent;
      font(H * 0.036, 'JetBrains Mono', 700);
      ctx.fillText(tk, startX + bW, y);
      ctx.fillStyle = COL.fg;
      font(H * 0.036, 'Manrope', 500);
      ctx.fillText(after, startX + bW + tW, y);
      ctx.textAlign = 'center';
    };
    if (Array.isArray(subtitle)) {
      subtitle.forEach((line, i) => _drawSubLine(line, H * 0.32 + i * H * 0.045));
    } else {
      _drawSubLine(subtitle, H * 0.32);
    }
  }

  ctx.restore();
}

function drawAct2(t) {
  const lt0 = t - ACTS[1].s;
  const aa = actA(t, ACTS[1]);

  // Content starts after intro fades (intro drawn at frame level)
  const lt = lt0 - 6.0;
  const ta = fi(lt, 0.2, 0.8) * aa;
  if (ta > 0.001) {
    // Signal label removed — Step intros handle this now
    ctx.save(); ctx.globalAlpha = ta;
    const _afsz = mf(H * 0.055);
    ctx.textAlign = 'left';
    if (isMobile()) {
      // Line 1: "TestMachine analyzes the $MOONPUMP"
      const _a1 = 'TestMachine analyzes the ';
      const _a2 = "$MOONPUMP";
      font(_afsz, 'Manrope', 800);
      const _a1w = ctx.measureText(_a1).width;
      ctx.fillStyle = COL.fg;
      ctx.fillText(_a1, W*0.05, H*0.13);
      ctx.fillStyle = COL.accent;
      font(_afsz, 'JetBrains Mono', 800);
      ctx.fillText(_a2, W*0.05 + _a1w, H*0.13);
      // Line 2
      font(_afsz, 'Manrope', 800);
      ctx.fillStyle = COL.fg;
      ctx.fillText('smart contract.', W*0.05, H*0.18);
    } else {
      const _a1 = 'TestMachine analyzes the ';
      const _a2 = "$MOONPUMP";
      const _a3 = ' smart contract.';
      font(_afsz, 'Manrope', 800);
      const _a1w = ctx.measureText(_a1).width;
      font(_afsz, 'JetBrains Mono', 800);
      const _a2w = ctx.measureText(_a2).width;
      ctx.fillStyle = COL.fg;
      font(_afsz, 'Manrope', 800);
      ctx.fillText(_a1, W*0.05, H*0.15);
      ctx.fillStyle = COL.accent;
      font(_afsz, 'JetBrains Mono', 800);
      ctx.fillText(_a2, W*0.05 + _a1w, H*0.15);
      ctx.fillStyle = COL.fg;
      font(_afsz, 'Manrope', 800);
      ctx.fillText(_a3, W*0.05 + _a1w + _a2w, H*0.15);
    }
    ctx.restore();
  }

  const findings = [
    'Contract owner can freeze all trading',
    'Hidden 25% tax on every sell',
    'Unlimited new tokens can be minted',
  ];

  const cardA = fi(lt, 1.5, 1.0) * aa;
  const cardX = W * 0.05, cardY = H * 0.21, cardW = W * 0.90, itemH = H * 0.075;
  const cardH = findings.length * itemH + H * 0.025;
  const braceX = cardX + W * 0.45; // where the brace starts

  if (cardA > 0.001) drawCard(cardX, cardY, cardW, cardH, cardA);

  findings.forEach((f, i) => {
    const fs = 2.0 + i * 2.2;
    const fa = fi(lt, fs, 0.8) * aa;
    if (fa > 0.001) {
      const fy = cardY + H * 0.012 + i * itemH;
      ctx.save();
      ctx.globalAlpha = fa;
      ctx.beginPath();
      ctx.arc(cardX + W * 0.03, fy + itemH * 0.45, H * 0.006, 0, Math.PI * 2);
      ctx.fillStyle = COL.danger;
      ctx.fill();
      font(mf(H * 0.028), 'JetBrains Mono', 500);
      ctx.fillStyle = COL.fg;
      ctx.textAlign = 'left';
      ctx.fillText(f, cardX + W * 0.055, fy + itemH * 0.55);
      ctx.restore();
    }
  });

  // Curly brace + summary text inside the card (right side)
  const sa = fi(lt, 9, 0.8) * aa;
  if (sa > 0.001) {
    ctx.save(); ctx.globalAlpha = sa;

    // Draw curly brace vertically centered in card
    const cardMid = cardY + cardH / 2;
    const brHalf = cardH * 0.42; // half-height of brace
    const brTop = cardMid - brHalf;
    const brBot = cardMid + brHalf;
    const brW = W * 0.025;

    ctx.strokeStyle = COL.danger;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Top arm
    ctx.moveTo(braceX, brTop);
    ctx.quadraticCurveTo(braceX + brW * 0.4, brTop, braceX + brW * 0.5, brTop + brHalf * 0.4);
    ctx.quadraticCurveTo(braceX + brW * 0.6, cardMid - H*0.005, braceX + brW, cardMid);
    // Bottom arm
    ctx.moveTo(braceX + brW, cardMid);
    ctx.quadraticCurveTo(braceX + brW * 0.6, cardMid + H*0.005, braceX + brW * 0.5, cardMid + brHalf * 0.6);
    ctx.quadraticCurveTo(braceX + brW * 0.4, brBot, braceX, brBot);
    ctx.stroke();

    // Summary text to the right of the brace, vertically centered
    const txtX = braceX + brW + W * 0.02;
    font(H * 0.030, 'Manrope', 600);
    ctx.fillStyle = COL.danger;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('3 red flags found in the contract.', txtX, cardMid);
    ctx.textBaseline = 'alphabetic';

    ctx.restore();
  }

  // (Arrow + "shift the risk estimate" annotation removed — animation makes it clear)
}

function drawAct3(t) {
  const lt0 = t - ACTS[2].s;
  const aa = actA(t, ACTS[2]);

  // Content starts after intro (intro drawn at frame level)
  const lt = lt0 - 6.0;
  const ta = fi(lt, 0.2, 0.8) * aa;
  if (ta > 0.001) {
    // Signal label removed — Step intros handle this now
    ctx.save(); ctx.globalAlpha = ta;
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'left';
    ctx.fillText('Who deployed this contract on-chain?', W*0.05, H*0.15);
    ctx.restore();
  }

  // Network visualization (rich graph)
  const ncx = W * 0.28, ncy = H * 0.45;
  const nr = Math.min(W, H) * 0.30;
  const graph = getGraph(ncx, ncy, nr);
  const { nodes: gNodes, edges: gEdges } = graph;

  // Draw edges (animate in waves) + fund flow particles
  gEdges.forEach((e, i) => {
    const es = 0.8 + i * 0.05;
    const ea = fi(lt, es, 0.4) * aa;
    if (ea > 0.001) {
      const nA = gNodes[e.from], nB = gNodes[e.to];
      const bothDead = !nA.alive && !nB.alive;
      const hasMixer = nA.type === 'mixer' || nB.type === 'mixer';
      const hasDrain = nA.type === 'drain' || nB.type === 'drain';
      const hasFunding = nA.type === 'funding' || nB.type === 'funding';
      const col = hasFunding ? '#60a5fa' : hasMixer ? '#a78bfa' : hasDrain ? COL.danger : bothDead ? COL.danger : (nA.alive && nB.alive ? COL.safe : COL.dim);
      ctx.save();
      ctx.globalAlpha = ea * 0.15;
      ctx.beginPath();
      ctx.moveTo(nA.x, nA.y);
      ctx.lineTo(nB.x, nB.y);
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Animated flow particles along edge
      if (lt > es + 1.5) {
        const speed = 0.4 + (i % 5) * 0.15;
        const p = ((lt * speed + i * 0.37) % 1);
        const px = lerp(nA.x, nB.x, p);
        const py = lerp(nA.y, nB.y, p);
        ctx.globalAlpha = ea * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      }
      ctx.restore();
    }
  });

  // Draw nodes
  gNodes.forEach((n, i) => {
    const ns = 0.8 + i * 0.1;
    const na = fi(lt, ns, 0.4) * aa;
    if (na > 0.001) {
      ctx.save();
      const baseR = H * 0.009 * n.size;
      let col, glowCol;

      if (i === 0) {
        // Central deployer — accent with pulsing glow
        col = COL.accent;
        glowCol = COL.accent;
        const pulse = 0.12 + 0.06 * Math.sin(lt * 2);
        ctx.globalAlpha = na * pulse;
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowCol;
        ctx.fill();
      } else if (n.type === 'mixer') {
        col = '#a78bfa'; // purple for mixers
      } else if (n.type === 'drain') {
        col = COL.danger;
      } else if (n.type === 'exchange') {
        col = COL.muted;
      } else if (n.type === 'funding') {
        col = '#60a5fa'; // blue for funding sources
      } else {
        col = n.alive ? COL.safe : COL.danger;
      }

      // Node dot
      ctx.globalAlpha = na * 0.85;
      ctx.beginPath();
      ctx.arc(n.x, n.y, baseR, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();

      // Subtle outline for deployer
      if (i === 0) {
        ctx.globalAlpha = na * 0.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }
  });

  // Cluster labels (subtle)
  const lblA = fi(lt, 3.0, 0.8) * aa;
  if (lblA > 0.001) {
    ctx.save();
    ctx.globalAlpha = lblA * 0.4;
    font(H * 0.020, 'JetBrains Mono', 400);
    ctx.fillStyle = '#a78bfa';
    ctx.textAlign = 'center';
    ctx.fillText('mixers', ncx - nr*0.65, ncy - nr*0.50 - H*0.025);
    ctx.fillStyle = COL.danger;
    ctx.fillText('drain', ncx + nr*0.70, ncy + nr*0.45 + H*0.035);
    ctx.fillStyle = COL.muted;
    ctx.fillText('CEX', ncx + nr*1.0, ncy - nr*0.15 - H*0.02);
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('funding', ncx + nr*0.5, ncy - nr*0.65 - H*0.02);
    ctx.restore();
  }

  // Stats card
  const cardA3 = fi(lt, 3.5, 1.0) * aa;
  const _act3CardX = isMobile() ? W*0.05 : W*0.52;
  const _act3CardY = isMobile() ? H*0.55 : H*0.21;
  const _act3CardW = isMobile() ? W*0.90 : W*0.44;
  const _act3CardH = isMobile() ? H*0.28 : H*0.28;
  if (cardA3 > 0.001) drawCard(_act3CardX, _act3CardY, _act3CardW, _act3CardH, cardA3);

  const sx = isMobile() ? _act3CardX + W*0.04 : W * 0.56;

  const _s1Y = isMobile() ? _act3CardY + H*0.06 : H*0.28;
  const _s2Y = isMobile() ? _act3CardY + H*0.14 : H*0.36;
  const _s3Y = isMobile() ? _act3CardY + H*0.21 : H*0.43;

  const s1 = fi(lt, 4, 0.8) * aa;
  if (s1 > 0.001) {
    ctx.save(); ctx.globalAlpha = s1;
    font(mf(H * 0.030), 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted; ctx.textAlign = 'left';
    ctx.fillText('WALLET HISTORY', sx, _s1Y);
    ctx.restore();
  }

  const s2 = fi(lt, 5, 0.8) * aa;
  if (s2 > 0.001) {
    ctx.save(); ctx.textAlign = 'left';

    // "23 tokens launched" — white, medium
    ctx.globalAlpha = s2;
    font(mf(H * 0.038), 'Manrope', 600);
    ctx.fillStyle = COL.fg;
    ctx.fillText('23 tokens launched.', sx, _s2Y - H*0.02);

    // "21 rugged." — red, same size, bold
    const s2b = fi(lt, 6, 0.8) * aa;
    ctx.globalAlpha = s2b;
    font(mf(H * 0.038), 'Manrope', 800);
    ctx.fillStyle = COL.danger;
    ctx.fillText('21 rugged.', sx, _s2Y + H*0.04);

    ctx.restore();
  }

  const s3 = fi(lt, 7, 0.8) * aa;
  if (s3 > 0.001) {
    ctx.save(); ctx.globalAlpha = s3 * 0.7;
    font(mf(H * 0.026), 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted; ctx.textAlign = 'left';
    ctx.fillText('Pattern: launch → pump → drain. Repeat.', sx, _s3Y + H*0.02);
    ctx.restore();
  }

  // No standalone distribution — persistent curve handles it
}

function drawAct4(t) {
  const lt0 = t - ACTS[3].s;
  const aa = actA(t, ACTS[3]);

  // Content starts after intro (intro drawn at frame level)
  const lt = lt0 - 6.0;
  const ta = fi(lt, 0.2, 0.8) * aa;
  if (ta > 0.001) {
    // Signal label removed — Step intros handle this now
    ctx.save(); ctx.globalAlpha = ta;
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'left';
    // Highlight $MOONPUMP
    const _pre = 'The ';
    const _tok = '$MOONPUMP';
    const _post = ' token age. Creator wallets. Liquidity locks.';
    font(H * 0.055, 'Manrope', 800);
    const _preW = ctx.measureText(_pre).width;
    ctx.fillStyle = COL.fg;
    ctx.fillText(_pre, W*0.05, H*0.15);
    font(H * 0.055, 'JetBrains Mono', 800);
    const _tokW = ctx.measureText(_tok).width;
    ctx.fillStyle = COL.accent;
    ctx.fillText(_tok, W*0.05 + _preW, H*0.15);
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.fillText(_post, W*0.05 + _preW + _tokW, H*0.15);
    ctx.restore();
  }

  const findings4 = [
    '$MOONPUMP is 14 hours old',
    'Creator holds 90% of liquidity',
    'Nothing is locked or protected',
  ];

  const card4A = fi(lt, 1.0, 1.0) * aa;
  const card4X = W * 0.05, card4Y = H * 0.21, card4W = W * 0.90, item4H = H * 0.075;
  const card4H = findings4.length * item4H + H * 0.025;
  const brace4X = card4X + W * 0.45;

  if (card4A > 0.001) drawCard(card4X, card4Y, card4W, card4H, card4A);

  findings4.forEach((f, i) => {
    const fs = 1.5 + i * 2.0;
    const fa = fi(lt, fs, 0.8) * aa;
    if (fa > 0.001) {
      const fy = card4Y + H * 0.012 + i * item4H;
      ctx.save();
      ctx.globalAlpha = fa;
      ctx.beginPath();
      ctx.arc(card4X + W * 0.03, fy + item4H * 0.45, H * 0.006, 0, Math.PI * 2);
      ctx.fillStyle = COL.danger;
      ctx.fill();
      font(mf(H * 0.028), 'JetBrains Mono', 500);
      ctx.fillStyle = COL.fg;
      ctx.textAlign = 'left';
      ctx.fillText(f, card4X + W * 0.055, fy + item4H * 0.55);
      ctx.restore();
    }
  });

  // Curly brace + summary (matching Signal 1 style)
  const sa4 = fi(lt, 8, 0.8) * aa;
  if (sa4 > 0.001) {
    ctx.save(); ctx.globalAlpha = sa4;

    const card4Mid = card4Y + card4H / 2;
    const br4Half = card4H * 0.42;
    const br4Top = card4Mid - br4Half;
    const br4Bot = card4Mid + br4Half;
    const br4W = W * 0.025;

    ctx.strokeStyle = COL.danger;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(brace4X, br4Top);
    ctx.quadraticCurveTo(brace4X + br4W * 0.4, br4Top, brace4X + br4W * 0.5, br4Top + br4Half * 0.4);
    ctx.quadraticCurveTo(brace4X + br4W * 0.6, card4Mid - H*0.005, brace4X + br4W, card4Mid);
    ctx.moveTo(brace4X + br4W, card4Mid);
    ctx.quadraticCurveTo(brace4X + br4W * 0.6, card4Mid + H*0.005, brace4X + br4W * 0.5, card4Mid + br4Half * 0.6);
    ctx.quadraticCurveTo(brace4X + br4W * 0.4, br4Bot, brace4X, br4Bot);
    ctx.stroke();

    const txt4X = brace4X + br4W + W * 0.02;
    font(H * 0.030, 'Manrope', 600);
    ctx.fillStyle = COL.danger;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Classic rug pull signature.', txt4X, card4Mid);
    ctx.textBaseline = 'alphabetic';

    ctx.restore();
  }

  // "The data is clear." — bezier curve from brace summary → persistent curve peak
  // No standalone distribution here — persistent curve handles it
  {
    const dcx = W*0.12, dcy = H*0.52, dcw = W*0.76, dch = H*0.32;
    const data = iDistCont(persistStage);
    const showsA = fi(lt, 8.0, 1.0) * aa;
    if (showsA > 0.001) {
      ctx.save(); ctx.globalAlpha = showsA;

      // Key points
      const braceEndX = card4X + W * 0.45 + W * 0.025 + W * 0.02; // right of brace + summary text
      const braceMidY = card4Y + card4H / 2;

      // Curve peak (stage 3 = far right, ~92% along x-axis)
      const peakFrac = 0.92;
      const peakX = dcx + peakFrac * dcw;
      const peakDataI = Math.round(peakFrac * (data.length - 1));
      const peakMax = Math.max(...data) * 1.25;
      const peakY = dcy + dch - (data[peakDataI] / peakMax) * dch;

      // Single smooth arc: from right of "Terrible risk profile" text,
      // sweeping right and curving down to land on top of the distribution peak.
      // "And it shows." floats as a label near the midpoint of the arc.

      const pathProg = clamp((lt - 8.0) / 2.0, 0, 1);

      // Start: below the summary text, dropping straight down
      const ax = braceMidY < dcy ? braceEndX + W * 0.05 : braceEndX + W * 0.05;
      const ay = braceMidY + H * 0.02;

      // End: left side of peak, arriving horizontally from the left
      const ex = peakX - H * 0.02;
      const ey = peakY;

      // Control points for a cubic bezier:
      // cp1: go straight DOWN from start (vertical exit)
      // cp2: approach end from LEFT (horizontal entry)
      const cp1x = ax;
      const cp1y = ay + H * 0.25;
      const cp2x = ex - W * 0.15;
      const cp2y = ey;

      // Text interrupts the bezier at t=0.5
      // Measure text width to create a gap in the line
      font(H * 0.034, 'Manrope', 700);
      const labelText = 'The data is clear.';
      const labelW = ctx.measureText(labelText).width;
      const labelPad = W * 0.015; // padding on each side of text

      // Sample bezier at t=0.5 for label position
      const lblT = 0.50;
      const lu = 1 - lblT;
      const lblBx = lu*lu*lu*ax + 3*lu*lu*lblT*cp1x + 3*lu*lblT*lblT*cp2x + lblT*lblT*lblT*ex;
      const lblBy = lu*lu*lu*ay + 3*lu*lu*lblT*cp1y + 3*lu*lblT*lblT*cp2y + lblT*lblT*lblT*ey;

      // Find the t-values where the bezier enters/exits the text region
      // We'll use the text's horizontal span to determine the gap
      // But since the curve goes down then right, we use arc-length approximation:
      // gap from t=0.42 to t=0.58 roughly covers the text width
      const gapStart = 0.36;
      const gapEnd = 0.56;

      ctx.strokeStyle = COL.danger;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      const steps = 80;
      const maxStep = Math.floor(easeIO(pathProg) * steps);

      if (pathProg > 0.01 && maxStep > 1) {
        // Segment 1: start to gap
        const gapStartStep = Math.floor(gapStart * steps);
        const seg1End = Math.min(maxStep, gapStartStep);
        if (seg1End > 1) {
          ctx.beginPath();
          for (let i = 0; i <= seg1End; i++) {
            const tt = i / steps;
            const u = 1 - tt;
            const bx = u*u*u*ax + 3*u*u*tt*cp1x + 3*u*tt*tt*cp2x + tt*tt*tt*ex;
            const by = u*u*u*ay + 3*u*u*tt*cp1y + 3*u*tt*tt*cp2y + tt*tt*tt*ey;
            if (i === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
          }
          ctx.stroke();
        }

        // Segment 2: after gap to current position
        const gapEndStep = Math.ceil(gapEnd * steps);
        if (maxStep > gapEndStep) {
          ctx.beginPath();
          for (let i = gapEndStep; i <= maxStep; i++) {
            const tt = i / steps;
            const u = 1 - tt;
            const bx = u*u*u*ax + 3*u*u*tt*cp1x + 3*u*tt*tt*cp2x + tt*tt*tt*ex;
            const by = u*u*u*ay + 3*u*u*tt*cp1y + 3*u*tt*tt*cp2y + tt*tt*tt*ey;
            if (i === gapEndStep) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
          }
          ctx.stroke();
        }

        // Arrowhead when line reaches the end
        if (pathProg > 0.92) {
          const tdx = ex - cp2x;
          const tdy = ey - cp2y;
          const tlen = Math.sqrt(tdx*tdx + tdy*tdy);
          const ux = tdx / tlen;
          const uy = tdy / tlen;
          const px = -uy;
          const py = ux;
          const ah = H * 0.020;
          const ahW = H * 0.007;

          ctx.setLineDash([]);
          ctx.fillStyle = COL.danger;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex - ux*ah + px*ahW, ey - uy*ah + py*ahW);
          ctx.lineTo(ex - ux*ah - px*ahW, ey - uy*ah - py*ahW);
          ctx.closePath();
          ctx.fill();
        }
      }

      ctx.setLineDash([]);

      // "And it shows." text — appears when line reaches the gap
      if (pathProg > 0.38) {
        const txtA = easeIO(clamp((pathProg - 0.38) / 0.08, 0, 1));
        ctx.globalAlpha = showsA * txtA;
        font(H * 0.034, 'Manrope', 700);
        ctx.fillStyle = COL.danger;
        ctx.textAlign = 'center';
        ctx.fillText(labelText, lblBx, lblBy - H * 0.008);
        ctx.globalAlpha = showsA;
      }
      ctx.restore();
    }
  }
}

function drawAct5(t) {
  const lt = t - ACTS[4].s;
  const aa = actA(t, ACTS[4]);

  // Title — centered on upper portion
  const ta = fi(lt, 0.2, 0.8) * aa;
  if (ta > 0.001) {
    ctx.save(); ctx.globalAlpha = ta;
    font(H * 0.060, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'center';
    ctx.fillText('The evidence is clear.', W/2, H*0.10);
    ctx.restore();
  }

  // ── Verdict — clean, cinematic, typography-driven ──
  const va = fi(lt, 2.0, 1.5) * aa;
  if (va > 0.001) {
    ctx.save();
    ctx.textAlign = 'center';

    // No box. No border. Just type and light on dark.
    // The drama comes from scale and negative space.

    // Thin horizontal rule — red, appears first
    const ruleW = W * 0.40;
    const ruleY = H * 0.22;
    ctx.globalAlpha = va * 0.5;
    ctx.fillStyle = COL.danger;
    ctx.fillRect(W/2 - ruleW/2, ruleY, ruleW, 1.5);

    // "TESTMACHINE FLAGS" — small, letterspaced, red, above the rule
    ctx.globalAlpha = va * 0.95;
    font(H * 0.032, 'JetBrains Mono', 800);
    ctx.fillStyle = COL.danger;
    ctx.letterSpacing = '4px';
    ctx.fillText('TESTMACHINE FLAGS', W/2, ruleY - H * 0.020);
    ctx.letterSpacing = '0px';

    // "$MOONPUMP" — MASSIVE, white, the focal point
    ctx.globalAlpha = va;
    font(H * 0.11, 'JetBrains Mono', 800);
    ctx.fillStyle = COL.fg;
    ctx.fillText('$MOONPUMP', W/2, H * 0.36);

    // "as a rug pull." — elegant, red, spaced below
    ctx.globalAlpha = va * 0.8;
    font(H * 0.038, 'Manrope', 500);
    ctx.fillStyle = COL.danger;
    ctx.fillText('as a rug pull risk.', W/2, H * 0.43);

    // Subtle red ambient glow behind the token name — no box, just atmosphere
    const glowPulse = 0.7 + 0.3 * Math.sin(lt * 2.5);
    ctx.globalAlpha = va * 0.04 * glowPulse;
    const grd = ctx.createRadialGradient(W/2, H * 0.34, 0, W/2, H * 0.34, W * 0.35);
    grd.addColorStop(0, COL.danger);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, H * 0.15, W, H * 0.35);

    // Bottom rule — mirrors the top
    ctx.globalAlpha = va * 0.3;
    ctx.fillStyle = COL.danger;
    ctx.fillRect(W/2 - ruleW/2, H * 0.46, ruleW, 1);

    ctx.restore();
  }

  // Distribution handled by drawPersistentCurve (turns red via redShift)
}

// ══════════════════════════════════════════════
// ACT 6: THE RUG PULL — Candlestick chart + crash animation
// ══════════════════════════════════════════════
function drawActRugPull(t) {
  const lt = t - ACTS[5].s;
  const aa = actA(t, ACTS[5]);

  // Title
  const ta = fi(lt, 0.3, 0.8) * aa;
  if (ta > 0.001) {
    ctx.save(); ctx.globalAlpha = ta;
    font(H * 0.055, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'center';
    ctx.fillText('And then it happens.', W/2, H*0.10);
    ctx.restore();
  }

  // Candlestick chart
  const chartX = W * 0.10, chartY = H * 0.15;
  const chartW = W * 0.80, chartH = H * 0.50;

  // Generate realistic candlestick data using seeded PRNG
  // Mimics real rug pull: slow accumulation → pump → sudden crash
  const _sr = (s) => { let x = s; return () => { x ^= x<<13; x ^= x>>17; x ^= x<<5; return ((x>>>0)/4294967296); }; };
  const rng = _sr(31415);
  const rn = () => rng();       // 0..1
  const rns = () => rn()*2 - 1; // -1..1

  const candles = [];
  // vol = [{o,h,l,c,v}] — v is relative volume (0-1)
  // Phase 1: Accumulation (12 candles) — low price, tight range, mixed green/red
  let price = 0.06;
  for (let i = 0; i < 12; i++) {
    const vol = 0.008 + rn() * 0.015;
    const dir = rn() > 0.45 ? 1 : -1; // slight green bias
    const move = vol * (0.5 + rn());
    const o = price;
    const c = price + dir * move;
    const h = Math.max(o,c) + rn() * vol * 1.2;
    const l = Math.min(o,c) - rn() * vol * 1.0;
    price = c + rns() * 0.003; // slight drift
    candles.push({ o, h, l, c, v: 0.15 + rn()*0.25 });
  }
  // Phase 2: Early pump (10 candles) — price starts climbing, bigger candles, more green
  for (let i = 0; i < 10; i++) {
    const t_ = i / 10;
    const vol = 0.015 + t_ * 0.04 + rn() * 0.02;
    const dir = rn() > 0.30 ? 1 : -1; // 70% green
    const move = vol * (0.6 + rn() * 0.8);
    const o = price;
    const c = price + dir * move;
    const drift = 0.008 + t_ * 0.015; // upward drift
    const h = Math.max(o,c) + rn() * vol * 1.5;
    const l = Math.min(o,c) - rn() * vol * 0.8;
    price = c + drift;
    candles.push({ o, h, l, c, v: 0.3 + t_*0.3 + rn()*0.2 });
  }
  // Phase 3: Parabolic pump (8 candles) — explosive green, huge wicks, high volume
  for (let i = 0; i < 8; i++) {
    const t_ = i / 8;
    const vol = 0.04 + t_ * 0.08 + rn() * 0.03;
    const dir = rn() > 0.25 ? 1 : -1; // 75% green, some big red
    const move = vol * (0.8 + rn() * 1.2);
    const o = price;
    const c = price + dir * move;
    const drift = 0.02 + t_ * 0.04;
    const h = Math.max(o,c) + rn() * vol * 2.0;
    const l = Math.min(o,c) - rn() * vol * 0.6;
    price = c + drift;
    candles.push({ o, h, l, c, v: 0.6 + t_*0.35 + rn()*0.15 });
  }
  const pumpEnd = candles.length; // 30
  const peakPrice = price;
  // Phase 4: Rug pull (2 candles) — brutal vertical collapse
  const crashLevels = [0.12, 0.01];
  for (let i = 0; i < 2; i++) {
    const o = price;
    const target = peakPrice * crashLevels[i];
    const c = target + rns() * 0.005;
    const h = o + rn() * 0.01; // almost no upper wick
    const l = Math.min(c, target * 0.7);
    price = c;
    candles.push({ o, h, l, c, v: 1.0 - i*0.1 });
  }

  // Normalize all candles to 0-1 range
  let maxP = 0, minP = Infinity;
  candles.forEach(c => { maxP = Math.max(maxP, c.h); minP = Math.min(minP, c.l); });
  const pRange = maxP - minP || 1;
  candles.forEach(c => {
    c.o = (c.o - minP) / pRange;
    c.h = (c.h - minP) / pRange;
    c.l = (c.l - minP) / pRange;
    c.c = (c.c - minP) / pRange;
  });

  const totalCandles = candles.length; // 34
  // Animate: accumulation 0-3s, early pump 3-5.5s, parabolic 5.5-7s, crash 7-9s
  const candleAlpha = (i) => {
    if (i < 12) {
      return fi(lt, 1.0 + (i / 12) * 2.0, 0.25) * aa;
    } else if (i < 22) {
      return fi(lt, 3.0 + ((i-12) / 10) * 2.5, 0.25) * aa;
    } else if (i < 30) {
      return fi(lt, 5.5 + ((i-22) / 8) * 1.5, 0.2) * aa;
    } else {
      const ci = i - 30;
      return fi(lt, 7.0 + ci * 0.5, 0.15) * aa;
    }
  };

  // Draw axes
  const axA = fi(lt, 0.5, 0.8) * aa;
  if (axA > 0.001) {
    ctx.save(); ctx.globalAlpha = axA * 0.4;
    ctx.strokeStyle = COL.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY);
    ctx.lineTo(chartX, chartY + chartH);
    ctx.lineTo(chartX + chartW, chartY + chartH);
    ctx.stroke();

    // Price labels on right side (TradingView style)
    const _priceH = chartH * 0.85; // price area without volume
    font(H * 0.020, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'left';
    for (let i = 0; i <= 4; i++) {
      const y = chartY + _priceH - (i / 4) * _priceH;
      ctx.globalAlpha = axA * 0.4;
      ctx.fillText('$' + (i * 0.25).toFixed(2), chartX + chartW + H*0.01, y + H*0.006);
      ctx.globalAlpha = axA * 0.08;
      ctx.beginPath();
      ctx.setLineDash([2, 3]);
      ctx.moveTo(chartX, y);
      ctx.lineTo(chartX + chartW, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Volume label
    ctx.globalAlpha = axA * 0.3;
    font(H * 0.014, 'JetBrains Mono', 400);
    ctx.textAlign = 'left';
    ctx.fillText('Vol', chartX + H*0.005, chartY + chartH - chartH*0.13);

    // $MOONPUMP branding with coin icon in top-left of chart
    ctx.globalAlpha = axA * 0.5;
    drawCoinIcon(chartX + H*0.035, chartY + H*0.03, H*0.025, 1);
    font(H * 0.024, 'JetBrains Mono', 500);
    ctx.fillStyle = COL.accent;
    ctx.textAlign = 'left';
    ctx.fillText('$MOONPUMP', chartX + H*0.065, chartY + H*0.04);
    ctx.restore();
  }

  // Draw volume bars (bottom 15% of chart area)
  const volH = chartH * 0.15;
  const volY = chartY + chartH; // sits right below price chart
  const candleGap = chartW / totalCandles;
  const candleW = candleGap * 0.65;

  candles.forEach((c, i) => {
    const ca = candleAlpha(i);
    if (ca < 0.001) return;
    const cx = chartX + i * candleGap + candleGap / 2;
    const isGreen = c.c >= c.o;
    const isCrash = i >= pumpEnd;
    const barH = c.v * volH;

    ctx.save();
    ctx.globalAlpha = ca * 0.35;
    ctx.fillStyle = isCrash ? COL.danger : (isGreen ? COL.safe : COL.danger);
    ctx.fillRect(cx - candleW/2, volY - barH, candleW, barH);
    ctx.restore();
  });

  // Draw candles (price area = chartH minus volH)
  const priceH = chartH - volH;

  candles.forEach((c, i) => {
    const ca = candleAlpha(i);
    if (ca < 0.001) return;

    const cx = chartX + i * candleGap + candleGap / 2;
    const isGreen = c.c >= c.o;
    const isCrash = i >= pumpEnd;
    const col = isCrash ? COL.danger : (isGreen ? COL.safe : COL.danger);

    ctx.save();
    ctx.globalAlpha = ca;

    // Wick
    const wickTop = chartY + priceH - c.h * priceH;
    const wickBot = chartY + priceH - c.l * priceH;
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx, wickTop);
    ctx.lineTo(cx, wickBot);
    ctx.stroke();

    // Body
    const bodyTop = chartY + priceH - Math.max(c.o, c.c) * priceH;
    const bodyBot = chartY + priceH - Math.min(c.o, c.c) * priceH;
    const bodyH = Math.max(bodyBot - bodyTop, 1.5);

    ctx.globalAlpha = ca * (isCrash ? 0.95 : 0.85);
    if (isGreen) {
      // Green candles: filled body
      ctx.fillStyle = col;
      ctx.fillRect(cx - candleW/2, bodyTop, candleW, bodyH);
    } else {
      // Red candles: filled body (TradingView style)
      ctx.fillStyle = col;
      ctx.fillRect(cx - candleW/2, bodyTop, candleW, bodyH);
    }

    ctx.restore();
  });

  // TestMachine prediction line — appears during pump, well before crash
  const tmCallCandle = 20; // early pump phase, ~10 candles before rug
  const tmCallA = fi(lt, 5.5, 1.0) * aa;
  if (tmCallA > 0.001) {
    ctx.save();
    const callX = chartX + tmCallCandle * candleGap + candleGap / 2;

    // Glowing vertical teal line (solid, not dashed)
    ctx.globalAlpha = tmCallA * 0.12;
    ctx.strokeStyle = COL.accent;
    ctx.lineWidth = H * 0.02;
    ctx.beginPath();
    ctx.moveTo(callX, chartY);
    ctx.lineTo(callX, chartY + chartH);
    ctx.stroke();
    // Core line
    ctx.globalAlpha = tmCallA * 0.7;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(callX, chartY);
    ctx.lineTo(callX, chartY + chartH);
    ctx.stroke();

    // ── Prominent badge above chart ──
    const badgeText = '⚑ TESTMACHINE FLAGGED';
    font(H * 0.024, 'JetBrains Mono', 700);
    const badgeTW = ctx.measureText(badgeText).width;
    const badgePx = H * 0.018, badgePy = H * 0.010;
    const badgeW = badgeTW + badgePx * 2;
    const badgeH = H * 0.024 + badgePy * 2;
    const badgeX = callX - badgeW / 2;
    const badgeY = chartY + H * 0.02;

    // Badge background with teal fill
    ctx.globalAlpha = tmCallA * 0.85;
    ctx.fillStyle = COL.accent;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
    ctx.fill();

    // Badge text (dark on teal)
    ctx.fillStyle = '#111118';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, callX, badgeY + badgeH / 2);
    ctx.textBaseline = 'alphabetic';

    // Connector: small triangle pointing down from badge to line
    ctx.fillStyle = COL.accent;
    ctx.beginPath();
    ctx.moveTo(callX, badgeY + badgeH);
    ctx.lineTo(callX - H * 0.01, badgeY + badgeH);
    ctx.lineTo(callX, badgeY + badgeH + H * 0.012);
    ctx.lineTo(callX + H * 0.01, badgeY + badgeH);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // "RUG PULLED" crash callout box — mirrors the TestMachine flag box style
  const crashA = fi(lt, 9.5, 0.8) * aa;
  if (crashA > 0.001) {
    ctx.save();

    // Vertical crash line
    const crashX = chartX + pumpEnd * candleGap;
    ctx.globalAlpha = crashA * 0.3;
    ctx.strokeStyle = COL.danger;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(crashX, chartY);
    ctx.lineTo(crashX, chartY + chartH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Full-width callout box — same style as TestMachine flag box, red color
    const rugAmber = COL.danger;
    const rugBg = '#1a0a0a';
    const boxW = isMobile() ? W * 0.90 : W * 0.72;
    const boxH = H * 0.22;
    const boxX = W/2 - boxW/2;
    const boxY = H * 0.60;
    const boxR = 6;

    // Dark background with amber border
    ctx.globalAlpha = crashA * 0.95;
    ctx.fillStyle = rugBg;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
    ctx.fill();
    ctx.strokeStyle = rugAmber;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Subtle amber glow on border
    ctx.globalAlpha = crashA * 0.15;
    ctx.shadowColor = rugAmber;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = rugAmber;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Warning icon — identical layout to flag box
    const iconSize = boxH * 0.55;
    const iconX = boxX + boxW * 0.08;
    const iconCY = boxY + boxH * 0.50;

    // Triangle outline
    ctx.globalAlpha = crashA * 0.9;
    ctx.strokeStyle = rugAmber;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(iconX, iconCY - iconSize * 0.5);
    ctx.lineTo(iconX - iconSize * 0.45, iconCY + iconSize * 0.4);
    ctx.lineTo(iconX + iconSize * 0.45, iconCY + iconSize * 0.4);
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = crashA * 0.12;
    ctx.fillStyle = rugAmber;
    ctx.fill();

    // Exclamation mark — bold, lower (matches flag box)
    ctx.globalAlpha = crashA * 0.95;
    ctx.fillStyle = rugAmber;
    const exclX = iconX;
    const exclTop = iconCY - iconSize * 0.08;
    const exclBot = iconCY + iconSize * 0.22;
    ctx.beginPath();
    ctx.roundRect(exclX - 3, exclTop, 6, exclBot - exclTop - iconSize * 0.14, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(exclX, exclBot, 4, 0, Math.PI * 2);
    ctx.fill();

    // Text shifted right (same layout as flag box)
    const textX = boxX + boxW * 0.55;
    ctx.globalAlpha = crashA;
    ctx.fillStyle = rugAmber;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    if (isMobile()) {
      font(H * 0.042, 'JetBrains Mono', 800);
      ctx.fillText('$MOONPUMP', textX, boxY + boxH * 0.38);
      font(H * 0.042, 'Manrope', 800);
      ctx.fillText('RUGGED', textX, boxY + boxH * 0.58);
      ctx.globalAlpha = crashA * 0.7;
      font(H * 0.032, 'Manrope', 600);
      ctx.fillText('-99% in 2 blocks', textX, boxY + boxH * 0.78);
    } else {
      font(H * 0.042, 'JetBrains Mono', 800);
      const _rmp = '$MOONPUMP ';
      const _rr = 'RUGGED';
      const _rmpw = ctx.measureText(_rmp).width;
      font(H * 0.042, 'Manrope', 800);
      const _rrw = ctx.measureText(_rr).width;
      const _rtot = _rmpw + _rrw;
      ctx.textAlign = 'left';
      const _rsx = textX - _rtot/2;
      font(H * 0.042, 'JetBrains Mono', 800);
      ctx.fillText(_rmp, _rsx, boxY + boxH * 0.42);
      font(H * 0.042, 'Manrope', 800);
      ctx.fillText(_rr, _rsx + _rmpw, boxY + boxH * 0.42);
      ctx.textAlign = 'center';
      ctx.globalAlpha = crashA * 0.8;
      font(H * 0.036, 'Manrope', 600);
      ctx.fillText('-99% in 2 blocks', textX, boxY + boxH * 0.68);
    }
    ctx.letterSpacing = '0px';

    // Thin amber line accent inside box
    ctx.globalAlpha = crashA * 0.3;
    ctx.fillStyle = rugAmber;
    const lineW = boxW * 0.5;
    ctx.fillRect(textX - lineW/2, boxY + boxH * 0.85, lineW, 1);

    ctx.restore();
  }

  // Dramatic callout: "TestMachine flagged this 14 hours before the rug."
  // Rendered BELOW the amber RUGGED box
  const predA = fi(lt, 11, 1.0) * aa;
  if (predA > 0.001) {
    ctx.save(); ctx.globalAlpha = predA;
    ctx.textAlign = 'center';

    // Position below the amber box (boxY H*0.60 + boxH H*0.22 = H*0.82)
    const predY = H * 0.87;

    font(H * 0.032, 'Manrope', 700);
    ctx.fillStyle = COL.fg;
    ctx.fillText('TestMachine flagged this', W/2, predY);

    font(H * 0.032, 'Manrope', 800);
    ctx.fillStyle = COL.danger;
    ctx.fillText('14 hours before the rug.', W/2, predY + H * 0.045);

    ctx.restore();
  }
}

function drawAct7(t) {
  const lt = t - ACTS[6].s;
  const aa = actA(t, ACTS[6], 1.2, 1.5);

  const ta = fi(lt, 0.3, 1.0) * aa;
  if (ta > 0.001) {
    ctx.save(); ctx.globalAlpha = ta;
    font(H*0.058, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'center';
    ctx.fillText("That was one token.", W/2, H*0.10);
    ctx.restore();
  }

  // Bold teal statement
  const tb = fi(lt, 1.5, 0.8) * aa;
  if (tb > 0.001) {
    ctx.save(); ctx.globalAlpha = tb;
    font(H*0.050, 'Manrope', 700);
    ctx.fillStyle = COL.accent;
    ctx.textAlign = 'center';
    ctx.fillText("We've analyzed millions.", W/2, H*0.22);
    ctx.restore();
  }

  // LARGE KDE chart — pushed down
  const cx2 = W*0.08, cy2 = H*0.28, cw2 = W*0.84, ch2 = H*0.32;
  const mxV = Math.max(Math.max(...CLEAN_KDE), Math.max(...RUG_KDE));
  const rv = easeIO(prog(lt, 2.0, 3));

  const axa = fi(lt, 1.0, 1.0) * aa;
  if (axa > 0.001) drawXAxis(cx2, cy2, cw2, ch2, axa);

  const ga = fi(lt, 2.0, 0.6) * aa;
  if (ga > 0.001) {
    drawKDE(CLEAN_KDE, cx2, cy2, cw2, ch2, mxV, ga, COL.safe, rv);
  }

  const ra = fi(lt, 2.5, 0.6) * aa;
  if (ra > 0.001) {
    drawKDE(RUG_KDE, cx2, cy2, cw2, ch2, mxV, ra, COL.danger, rv);
  }

  // Labels with arrows pointing to peaks (after both curves revealed)
  const lblA = fi(lt, 4.0, 1.0) * aa;
  if (lblA > 0.001) {
    ctx.save(); ctx.globalAlpha = lblA;

    const cleanPeakI = CLEAN_KDE.indexOf(Math.max(...CLEAN_KDE));
    const cleanPeakX = cx2 + (cleanPeakI / (CLEAN_KDE.length - 1)) * cw2;
    const cleanPeakY = cy2 + ch2 - (CLEAN_KDE[cleanPeakI] / mxV) * ch2 * 0.88;

    const rugPeakI = RUG_KDE.indexOf(Math.max(...RUG_KDE));
    const rugPeakX = cx2 + (rugPeakI / (RUG_KDE.length - 1)) * cw2;
    const rugPeakY = cy2 + ch2 - (RUG_KDE[rugPeakI] / mxV) * ch2 * 0.88;

    const ah = H * 0.008;

    // "Safe tokens" label + arrow — green, prominent
    const safeLblY = cy2 + ch2 + H * 0.05;
    font(H * 0.034, 'Manrope', 700);
    ctx.fillStyle = COL.safe;
    ctx.textAlign = 'center';
    ctx.fillText('Safe tokens', cleanPeakX, safeLblY + H * 0.03);
    ctx.strokeStyle = COL.safe;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cleanPeakX, safeLblY);
    ctx.lineTo(cleanPeakX, cleanPeakY + H * 0.015);
    ctx.stroke();
    ctx.fillStyle = COL.safe;
    ctx.beginPath();
    ctx.moveTo(cleanPeakX, cleanPeakY + H * 0.015);
    ctx.lineTo(cleanPeakX - ah, cleanPeakY + H * 0.015 + ah * 1.5);
    ctx.lineTo(cleanPeakX + ah, cleanPeakY + H * 0.015 + ah * 1.5);
    ctx.closePath();
    ctx.fill();

    // "Rug pulls" label + arrow — red, prominent
    const rugLblY = cy2 + ch2 + H * 0.05;
    font(H * 0.034, 'Manrope', 700);
    ctx.fillStyle = COL.danger;
    ctx.fillText('Rug pulls', rugPeakX, rugLblY + H * 0.03);
    ctx.strokeStyle = COL.danger;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rugPeakX, rugLblY);
    ctx.lineTo(rugPeakX, rugPeakY + H * 0.015);
    ctx.stroke();
    ctx.fillStyle = COL.danger;
    ctx.beginPath();
    ctx.moveTo(rugPeakX, rugPeakY + H * 0.015);
    ctx.lineTo(rugPeakX - ah, rugPeakY + H * 0.015 + ah * 1.5);
    ctx.lineTo(rugPeakX + ah, rugPeakY + H * 0.015 + ah * 1.5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Decision boundary
  const tha = fi(lt, 5, 1.0) * aa;
  if (tha > 0.001) {
    ctx.save(); ctx.globalAlpha = tha * 0.6;
    const tx = cx2 + 0.75 * cw2;
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = COL.muted;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tx, cy2 + ch2*0.05);
    ctx.lineTo(tx, cy2 + ch2);
    ctx.stroke();
    ctx.setLineDash([]);
    // Vertical label along left side of dashed line
    ctx.globalAlpha = tha;
    font(H*0.022, 'Manrope', 600);
    ctx.fillStyle = COL.muted;
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(tx - H*0.018, cy2 + ch2/2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Optimal Decision Boundary', 0, 0);
    ctx.restore();
    ctx.restore();
  }

  // Everything fades out, then 96.2% takes over the screen
  const fadeEverything = easeIO(clamp((lt - 8) / 1.5, 0, 1));
  if (fadeEverything > 0.01) {
    ctx.save();
    ctx.globalAlpha = fadeEverything * 0.98;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // Big 96.2%
  const numIn = fi(lt, 9.5, 1.0) * aa;
  if (numIn > 0.001) {
    ctx.save();
    ctx.globalAlpha = numIn;
    ctx.textAlign = 'center';
    font(H * 0.22, 'JetBrains Mono', 800);
    ctx.fillStyle = COL.accent;
    ctx.fillText('96.2%', W / 2, H * 0.40);

    ctx.globalAlpha = numIn * 0.7;
    font(H * 0.030, 'Manrope', 600);
    ctx.letterSpacing = '5px';
    ctx.fillStyle = COL.muted;
    ctx.fillText('ACCURACY', W / 2, H * 0.48);
    ctx.letterSpacing = '0px';
    ctx.restore();
  }

  // "We saw it coming. Pretty much every time."
  const tagIn = fi(lt, 11.5, 1.0) * aa;
  if (tagIn > 0.001) {
    ctx.save();
    ctx.globalAlpha = tagIn;
    ctx.textAlign = 'center';
    font(H * 0.042, 'Manrope', 700);
    ctx.fillStyle = COL.fg;
    ctx.fillText('96.2% of the time, we get it right every time.', W / 2, H * 0.62);
    ctx.restore();
  }

}

// Preload logo and create teal-tinted version
const _logo = new Image();
_logo.src = 'assets/logo-icon-white.webp';
let _tealLogo = null;
_logo.onload = () => {
  const oc = document.createElement('canvas');
  oc.width = _logo.naturalWidth;
  oc.height = _logo.naturalHeight;
  const octx = oc.getContext('2d');
  octx.drawImage(_logo, 0, 0);
  octx.globalCompositeOperation = 'source-atop';
  octx.fillStyle = '#4ecdc4'; // COL.accent
  octx.fillRect(0, 0, oc.width, oc.height);
  _tealLogo = oc;
};

function drawAct8(t) {
  const lt = t - ACTS[7].s;
  const aa = fi(t, ACTS[7].s, 1.5); // no fadeout — holds until loop restarts

  // ═══ Phase 0: Social proof numbers — MICHAEL BAY STYLE (0–8s) ═══
  // Each stat owns the screen solo, opaque bg, count-up, then exits cleanly
  const stats = [
    { final: 2300000, prefix: '', suffix: '+', label: 'TOKENS ANALYZED', fmt: v => (v/1e6).toFixed(1) + 'M' },
    { final: 47000, prefix: '', suffix: '+', label: 'RUG PULLS FLAGGED', fmt: v => v >= 1000 ? Math.round(v/1000) + ',' + String(v % 1000).padStart(3, '0') : String(v) },
    { final: 890, prefix: '$', suffix: 'M+', label: 'IN LOSSES PREVENTED', fmt: v => String(Math.round(v)) },
  ];

  stats.forEach((s, i) => {
    const hitT = 0.5 + i * 2.5;  // each stat owns 2.5s
    const slamIn = easeIO(clamp((lt - hitT) / 0.2, 0, 1));
    const holdEnd = hitT + 2.0;
    const slamOut = lt > holdEnd ? 1 - easeIO(clamp((lt - holdEnd) / 0.4, 0, 1)) : 1;
    const sa = slamIn * slamOut * aa;
    if (sa < 0.01) return;

    const countProg = easeIO(clamp((lt - hitT) / 1.5, 0, 1));
    const currentVal = Math.round(s.final * countProg);
    const numStr = s.prefix + s.fmt(currentVal) + s.suffix;

    // Opaque background — full screen darken
    ctx.save();
    ctx.globalAlpha = sa * 0.92;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // Impact flash
    const flashA = slamIn < 1 ? (1 - slamIn) * 0.4 : 0;
    if (flashA > 0.01) {
      ctx.globalAlpha = flashA;
      const flashR = H * 0.35;
      const fg = ctx.createRadialGradient(W/2, H*0.42, 0, W/2, H*0.42, flashR);
      fg.addColorStop(0, COL.accent + '30');
      fg.addColorStop(1, COL.accent + '00');
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, W, H);
    }

    // Scale punch — starts at 1.2x, settles to 1.0
    const punch = slamIn < 1 ? lerp(1.3, 1.0, slamIn) : 1.0;
    ctx.translate(W/2, H * 0.42);
    ctx.scale(punch, punch);

    // Number
    ctx.globalAlpha = sa;
    ctx.textAlign = 'center';
    font(H * 0.15, 'JetBrains Mono', 800);
    ctx.fillStyle = COL.accent;
    ctx.fillText(numStr, 0, 0);

    // Label
    ctx.globalAlpha = sa * 0.7;
    font(H * 0.030, 'Manrope', 600);
    ctx.letterSpacing = '4px';
    ctx.fillStyle = COL.muted;
    ctx.fillText(s.label, 0, H * 0.07);
    ctx.letterSpacing = '0px';

    ctx.restore();
  });

  // ═══ Phase 1: "Signals You Can Trust" hero text ═══
  const heroIn = fi(lt, 8.0, 1.0);
  const heroA = heroIn * aa; // stays visible — brand appears below
  if (heroA > 0.001) {
    ctx.save();
    ctx.textAlign = 'center';

    // Animated stylized mini KDE distributions above the text
    const miniW = W * 0.40, miniH = H * 0.12;
    const miniX = W/2 - miniW/2, miniY = H * 0.06;
    
    // Looping draw animation: 3-second cycle
    const cycle = (lt % 1.5) / 1.5;
    const drawProg = easeIO(clamp(cycle / 0.6, 0, 1)); // draw over first 60%
    const fadeProg = cycle > 0.7 ? easeIO((cycle - 0.7) / 0.3) : 0; // fade over last 30%
    const miniAlpha = heroA * 0.85 * (1 - fadeProg);

    if (miniAlpha > 0.01) {
      const mxV = Math.max(Math.max(...CLEAN_KDE), Math.max(...RUG_KDE));
      const totalPts = CLEAN_KDE.length;
      const drawSteps = Math.floor(drawProg * totalPts);

      // Helper to draw a mini KDE
      const drawMiniKDE = (kdeData, color, opacity) => {
        if (drawSteps < 2) return;
        ctx.globalAlpha = miniAlpha * opacity;
        // Fill
        ctx.beginPath();
        ctx.moveTo(miniX, miniY + miniH);
        for (let i = 0; i <= drawSteps && i < totalPts; i++) {
          const x = miniX + (i / (totalPts - 1)) * miniW;
          const y = miniY + miniH - (kdeData[i] / mxV) * miniH * 0.88;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(miniX + (drawSteps / (totalPts - 1)) * miniW, miniY + miniH);
        ctx.closePath();
        const gr = ctx.createLinearGradient(miniX, miniY, miniX, miniY + miniH);
        gr.addColorStop(0, color + '60');
        gr.addColorStop(1, color + '10');
        ctx.fillStyle = gr;
        ctx.fill();
        // Stroke
        ctx.beginPath();
        for (let i = 0; i <= drawSteps && i < totalPts; i++) {
          const x = miniX + (i / (totalPts - 1)) * miniW;
          const y = miniY + miniH - (kdeData[i] / mxV) * miniH * 0.88;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      };

      drawMiniKDE(CLEAN_KDE, COL.safe, 0.9);
      drawMiniKDE(RUG_KDE, COL.danger, 0.95);
    }

    // Big bold hero
    ctx.globalAlpha = heroA;
    const _heroFsz = isMobile() ? H * 0.08 : H * 0.12;
    font(_heroFsz, 'Manrope', 900);
    ctx.fillStyle = COL.fg;
    ctx.fillText('Risk Signals', W/2, H * 0.38);

    // "You Can Trust" in teal
    font(_heroFsz, 'Manrope', 900);
    ctx.fillStyle = COL.accent;
    ctx.fillText('You Can Trust.', W/2, H * 0.52);

    // Subtle underline sweep
    const sweepW = easeIO(clamp((lt - 8.8) / 1.0, 0, 1)) * W * 0.5;
    ctx.globalAlpha = heroA * 0.5;
    ctx.strokeStyle = COL.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W/2 - sweepW/2, H * 0.56);
    ctx.lineTo(W/2 + sweepW/2, H * 0.56);
    ctx.stroke();

    // "Data-driven. Evidence-based. Every time."
    const subA = fi(lt, 9.2, 0.8);
    ctx.globalAlpha = subA * 0.6;
    font(H * 0.032, 'JetBrains Mono', 400);
    ctx.fillStyle = COL.muted;
    ctx.letterSpacing = '0.06em';
    ctx.fillText('Data-driven. Evidence-based. Updated every block.', W/2, H * 0.60);
    ctx.letterSpacing = '0px';

    ctx.restore();
  }

  // ═══ Phase 2: Logo + TestMachine + CTA — appears BELOW the teal line ═══
  const d = 11; // after hero settles

  // Logo icon — teal tinted, small, inline
  const a0 = fi(lt, d, 1.0);
  if (a0 > 0.001 && _tealLogo) {
    ctx.save();
    ctx.globalAlpha = a0;
    const logoSize = H * 0.12;
    ctx.drawImage(_tealLogo, W/2 - logoSize/2, H*0.65, logoSize, logoSize);
    ctx.restore();
  }

  // "TestMachine" — right below logo
  const a1 = fi(lt, d + 0.6, 1.0);
  if (a1 > 0.001) {
    ctx.save();
    ctx.globalAlpha = a1;
    font(H*0.045, 'Manrope', 800);
    ctx.fillStyle = COL.fg;
    ctx.textAlign = 'center';
    ctx.fillText('TestMachine', W/2, H*0.80);
    ctx.restore();
  }

  // CTA Button removed — too busy
  _ctaBounds = null;
}

// ══════════════════════════════════════════════
// SCENE CONTROLS (circle dots)
// ══════════════════════════════════════════════
const ACT_LABELS = ['Launch', 'Code', 'Creator', 'Evidence', 'Verdict', 'Rug Pull', 'Proof', 'Close'];
let dotPositions = []; // cached for hit testing

function getActiveAct(t) {
  for (let i = ACTS.length - 1; i >= 0; i--) {
    if (t >= ACTS[i].s) return i;
  }
  return 0;
}

function drawSceneControls(t) {
  const active = getActiveAct(t);
  const dotR = H * 0.008;
  const gap = W * 0.08;
  const totalW = (ACTS.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const cy = H * 0.95;

  dotPositions = [];

  for (let i = 0; i < ACTS.length; i++) {
    const cx = startX + i * gap;
    dotPositions.push({ x: cx, y: cy, r: dotR * 2.5 }); // larger hit area

    const isActive = i === active;

    // Connecting line between dots
    if (i < ACTS.length - 1) {
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = COL.dim;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx + dotR + 4, cy);
      ctx.lineTo(startX + (i + 1) * gap - dotR - 4, cy);
      ctx.stroke();
      ctx.restore();
    }

    // Dot
    ctx.save();
    if (isActive) {
      // Glow
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = COL.accent;
      ctx.fill();
      // Filled dot
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = COL.accent;
      ctx.fill();
    } else {
      // Hollow dot
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.strokeStyle = COL.muted;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }
}

// ── CTA button bounds ──
let _ctaBounds = null;
let _persistCTA = null;
// ── Stats area bounds ──
let _statsBounds = null;

// ── Modal handling (pauses animation) ──
// statsModal passed as parameter
let _modalOpen = false;
let _pausedAt = null; // the animation time when we paused

modalCloseBtn.addEventListener('click', () => {
  statsModal.style.display = 'none';
  if (_modalOpen && _pausedAt !== null) {
    // Resume: adjust t0 so animation continues from where it paused
    t0 = performance.now() - _pausedAt * 1000;
  }
  _modalOpen = false;
});
statsModal.addEventListener('click', (e) => {
  if (e.target === statsModal) {
    statsModal.style.display = 'none';
    if (_modalOpen && _pausedAt !== null) {
      t0 = performance.now() - _pausedAt * 1000;
    }
    _modalOpen = false;
  }
});

// ── Click handling ──
let userTimeOffset = null; // when user clicks, we override the clock

canvas.style.cursor = 'default';
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  // CTA button
  if (_ctaBounds && _ctaBounds.active && mx >= _ctaBounds.x && mx <= _ctaBounds.x + _ctaBounds.w && my >= _ctaBounds.y && my <= _ctaBounds.y + _ctaBounds.h) {
    window.open('https://app.testmachine.ai', '_blank');
    return;
  }

  // Persistent CTA
  if (_persistCTA && _persistCTA.active && mx >= _persistCTA.x && mx <= _persistCTA.x + _persistCTA.w && my >= _persistCTA.y && my <= _persistCTA.y + _persistCTA.h) {
    window.open('https://app.testmachine.ai', '_blank');
    return;
  }

  // Nav dots — check FIRST so they always win
  for (let i = 0; i < dotPositions.length; i++) {
    const d = dotPositions[i];
    const dx = mx - d.x, dy = my - d.y;
    if (dx * dx + dy * dy < d.r * d.r) {
      const now = performance.now();
      t0 = now - (ACTS[i].s + ACT0_DUR) * 1000;
      return;
    }
  }

  // Stats area → open modal
  if (_statsBounds && _statsBounds.active && mx >= _statsBounds.x && mx <= _statsBounds.x + _statsBounds.w && my >= _statsBounds.y && my <= _statsBounds.y + _statsBounds.h) {
    _pausedAt = (performance.now() - t0) / 1000;
    _modalOpen = true;
    statsModal.style.display = 'flex';
    return;
  }
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  let hover = false;
  // CTA button
  if (_ctaBounds && _ctaBounds.active && mx >= _ctaBounds.x && mx <= _ctaBounds.x + _ctaBounds.w && my >= _ctaBounds.y && my <= _ctaBounds.y + _ctaBounds.h) {
    hover = true;
  }
  // Persistent CTA
  if (_persistCTA && _persistCTA.active && mx >= _persistCTA.x && mx <= _persistCTA.x + _persistCTA.w && my >= _persistCTA.y && my <= _persistCTA.y + _persistCTA.h) {
    hover = true;
  }
  // Stats area
  if (_statsBounds && _statsBounds.active && mx >= _statsBounds.x && mx <= _statsBounds.x + _statsBounds.w && my >= _statsBounds.y && my <= _statsBounds.y + _statsBounds.h) {
    hover = true;
  }
  for (let i = 0; i < dotPositions.length; i++) {
    const d = dotPositions[i];
    const dx = mx - d.x, dy = my - d.y;
    if (dx * dx + dy * dy < d.r * d.r) { hover = true; break; }
  }
  canvas.style.cursor = hover ? 'pointer' : 'default';
});

// ══════════════════════════════════════════════
// MAIN LOOP
// ══════════════════════════════════════════════
let t0 = null;

// Debug: seek to time via hash e.g. #t=90
window._seekTime = null;
window.seekTo = function(sec) { window._seekTime = sec; };
function frame(ts) {
  if (!t0) t0 = ts;
  // Freeze animation while modal is open
  if (_modalOpen) { requestAnimationFrame(frame); return; }
  let t;
  if (window._seekTime !== null) {
    t = window._seekTime;
  } else {
    t = ((ts - t0) / 1000) % TOTAL;
  }
  // Check hash for seek
  if (location.hash.startsWith('#t=')) {
    const ht = parseFloat(location.hash.slice(3));
    if (!isNaN(ht)) { window._seekTime = ht; t = ht; }
  }
  try {

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  // Subtle vignette
  const vg = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*0.3, W/2, H/2, Math.max(W,H)*0.6);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Act 0: preamble (first ACT0_DUR seconds)
  if (t < ACT0_DUR) { drawAct0(t); }

  // All remaining acts use shifted time (t - ACT0_DUR) so their internal timing is unchanged
  const ta = t - ACT0_DUR;
  if (ta >= 0 && ta < ACTS[0].e)                          drawAct1(ta);
  if (ta >= ACTS[1].s - 0.3 && ta < ACTS[1].e) drawAct2(ta);
  if (ta >= ACTS[2].s - 0.3 && ta < ACTS[2].e) drawAct3(ta);
  if (ta >= ACTS[3].s - 0.3 && ta < ACTS[3].e) drawAct4(ta);
  if (ta >= ACTS[4].s - 0.3 && ta < ACTS[4].e) drawAct5(ta);
  if (ta >= ACTS[5].s - 0.3 && ta < ACTS[5].e) drawActRugPull(ta);
  if (ta >= ACTS[6].s - 0.3 && ta < ACTS[6].e) drawAct7(ta);
  if (ta >= ACTS[7].s - 0.3 && ta <= TOTAL - ACT0_DUR)    drawAct8(ta);

  // Persistent curve at bottom during Acts 2-4
  if (ta >= 0) drawPersistentCurve(ta);

  // Scene navigation dots
  drawSceneControls(ta >= 0 ? ta : 0);

  // (Removed persistent $MOONPUMP token indicator — bottom-right)

  // Risk score overlay — on top of everything
  if (ta >= 0) drawRiskScoreOverlay(ta);

  // Persistent CTA from Act 3 onward
  if (ta >= ACTS[2].s + 2 && ta < ACTS[7].s + 10) {
    const ctaPersistA = Math.min(fi(ta, ACTS[2].s + 2, 1.5), ta > ACTS[7].s + 8 ? fo(ta, ACTS[7].s + 8, 2) : 1) * 0.85;
    if (ctaPersistA > 0.01) {
      ctx.save();
      // Button background
      font(H * 0.022, 'Manrope', 700);
      const ctaText = 'Launch App →';
      const tw = ctx.measureText(ctaText).width;
      const btnPx = H * 0.020, btnPy = H * 0.010;
      const btnW = tw + btnPx * 2;
      const btnH = H * 0.022 + btnPy * 2;
      const btnX = W * 0.97 - btnW;
      const btnY = H * 0.02;
      // Filled teal button
      ctx.globalAlpha = ctaPersistA;
      ctx.fillStyle = COL.accent;
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, H * 0.006);
      ctx.fill();
      // White text
      ctx.fillStyle = '#0e1117';
      ctx.textAlign = 'center';
      ctx.fillText(ctaText, btnX + btnW / 2, btnY + btnH / 2 + H * 0.007);
      _persistCTA = { x: btnX, y: btnY, w: btnW, h: btnH, active: true };
      ctx.restore();
    }
  } else {
    _persistCTA = null;
  }

  // Persistent teal logo watermark — bottom left
  if (_tealLogo) {
    ctx.save();
    const wmSize = H * 0.08;
    ctx.globalAlpha = 0.4;
    ctx.drawImage(_tealLogo, W * 0.008, H * 0.98 - wmSize, wmSize, wmSize);
    ctx.restore();
  }

  // Signal intro cards — drawn absolutely last, on top of everything
  _pendingIntro = null; // reset before acts set it
  // Re-check acts to see if any set an intro
  // Half-screen intro cards — cover top 48%, distribution stays visible below
  if (ta >= ACTS[1].s && ta < ACTS[1].s + 6.5) drawSignalIntro(ta - ACTS[1].s, actA(ta, ACTS[1]), 'Step 1: Smart Contract Analysis', ["We read the $MOONPUMP code, hunting for", 'hidden permissions, kill switches, and theft mechanisms.']);
  if (ta >= ACTS[2].s && ta < ACTS[2].s + 6.5) drawSignalIntro(ta - ACTS[2].s, actA(ta, ACTS[2]), 'Step 2: Creator History', ["Who built $MOONPUMP? What else have they launched?", 'Past behavior predicts future intent.']);
  if (ta >= ACTS[3].s && ta < ACTS[3].s + 6.5) drawSignalIntro(ta - ACTS[3].s, actA(ta, ACTS[3]), 'Step 3: On-Chain Forensics', ["The $MOONPUMP token age. Liquidity locks. Ownership.", 'The full picture, from every angle.']);
  drawPendingIntro();

  } catch(e) {
    console.error('FRAME ERROR at t=' + t.toFixed(2) + ':', e.message, e.stack);
  }
  if (!_destroyed) requestAnimationFrame(frame);
}


  // Start animation
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(frame));
  } else {
    requestAnimationFrame(frame);
  }
  
  // Return cleanup function
  return function cleanup() {
    window.removeEventListener('resize', resize);
    _destroyed = true;
  };

}
