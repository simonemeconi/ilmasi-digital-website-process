#!/usr/bin/env node

/**
 * check-colors — Previews brand colors under ACSS unified lightness.
 *
 * Usage:
 *   node bin/check-colors.js "#32a2c1" "#DC3545"
 *   node bin/check-colors.js primary=#32a2c1 secondary=#1c1930
 *   node bin/check-colors.js --lightness 0.7 "#32a2c1"
 *
 * ACSS can unify the lightness of every brand color to a single value (0.65 by
 * default). Because OKLCH lightness tracks perceived brightness, this gives the
 * palette even visual weight: no color overpowers the others, and contrast
 * behaves predictably — text that reads on one brand color reads on all of them.
 *
 * The trade-off is that each source hex moves to the shared lightness. This
 * script shows exactly where each color lands, so the shift is a decision rather
 * than a surprise.
 *
 * No dependencies. Conversion is arithmetic, not estimation.
 */

// ---------------------------------------------------------------- conversion

function srgbToLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(channel) {
  const c = Math.min(1, Math.max(0, channel));
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
}

function hexToOklch(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(full.slice(i, i + 2), 16))
  );

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  return {
    L,
    C: Math.sqrt(a * a + bb * bb),
    H: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360,
  };
}

function oklchToLinearRgb({ L, C, H }) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
     4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function oklchToHex(color) {
  return (
    '#' +
    oklchToLinearRgb(color)
      .map((c) => linearToSrgb(c).toString(16).padStart(2, '0'))
      .join('')
  );
}

/** True when the OKLCH triple fits inside sRGB without clipping. */
function inSrgbGamut(color, tolerance = 0.0005) {
  return oklchToLinearRgb(color).every((c) => c >= -tolerance && c <= 1 + tolerance);
}

/**
 * Highest chroma that stays in sRGB at a given lightness and hue.
 *
 * Note: ACSS clips against a slightly wider gamut than sRGB, so this runs a
 * little conservative — it may report a chroma reduction marginally earlier
 * than ACSS actually applies one. Erring toward caution is deliberate.
 */
function maxChroma(L, H) {
  let lo = 0, hi = 0.5;
  for (let i = 0; i < 48; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgbGamut({ L, C: mid, H })) lo = mid;
    else hi = mid;
  }
  return lo;
}

// -------------------------------------------------------------- descriptions

/**
 * Neutral wording. Unifying lightness is the intended behaviour, not a defect —
 * these describe where a color lands, they do not pass judgement on it.
 */
const SHIFT_BANDS = [
  { max: 0.02, level: 'low',  text: 'lands essentially where it started' },
  { max: 0.05, level: 'low',  text: 'moves slightly' },
  { max: 0.10, level: 'mid',  text: 'moves enough to see side by side' },
  { max: Infinity, level: 'high', text: 'moves substantially — worth previewing with the client' },
];

const bandFor = (delta) => SHIFT_BANDS.find((b) => Math.abs(delta) <= b.max);

// -------------------------------------------------------------------- output

const COLOR = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, s) => (COLOR ? `\x1b[${code}m${s}\x1b[0m` : s);
const dim = (s) => paint('2', s);
const bold = (s) => paint('1', s);
const MARK = {
  low:  paint('32', '\u25cf'),
  mid:  paint('36', '\u25cf'),
  high: paint('33', '\u25cf'),
};

function analyze(hex, target) {
  const source = hexToOklch(hex);
  const ceiling = maxChroma(target, source.H);
  const resultC = Math.min(source.C, ceiling);

  return {
    hex,
    source,
    delta: target - source.L,
    clipped: resultC < source.C - 0.0005,
    result: { L: target, C: resultC, H: source.H },
    band: bandFor(target - source.L),
  };
}

function report(entries, target) {
  const lightnesses = entries.map((e) => e.analysis.source.L);
  const spread = Math.max(...lightnesses) - Math.min(...lightnesses);

  console.log(
    `\n${bold('Brand palette under unified lightness')} ${dim(`(target L ${target})`)}\n`
  );

  // The spread says more than any single color: it is the reason the option
  // exists. Widely scattered lightness is exactly what unification fixes.
  console.log(`${bold('Spread')}  ${spread.toFixed(3)} across ${entries.length} colors`);
  if (spread <= 0.10) {
    console.log(
      dim('  These colors already carry similar visual weight. Unifying changes little.\n')
    );
  } else if (spread <= 0.25) {
    console.log(
      dim('  Moderate variation in visual weight. Unifying evens out the palette.\n')
    );
  } else {
    console.log(
      dim('  Wide variation in visual weight — some colors dominate others. This is the\n' +
          '  case unification is built for: even weight, and contrast that holds across\n' +
          '  the whole palette instead of color by color.\n')
    );
  }

  for (const { label, analysis: a } of entries) {
    const name = label ? `${label} ` : '';
    console.log(`${MARK[a.band.level]} ${bold(name + a.hex)}  ${dim(a.band.text)}`);
    console.log(
      `  source  L ${a.source.L.toFixed(3)}  C ${a.source.C.toFixed(3)}  H ${a.source.H.toFixed(1)}`
    );
    console.log(
      `  unified L ${a.result.L.toFixed(3)}  C ${a.result.C.toFixed(3)}  H ${a.result.H.toFixed(1)}` +
        `   ${dim('\u2192')} ${bold(oklchToHex(a.result))}`
    );
    console.log(dim(`  lightness ${a.delta >= 0 ? '+' : ''}${a.delta.toFixed(3)}`));
    if (a.clipped) {
      console.log(
        dim(`  chroma capped at ${a.result.C.toFixed(3)} to stay in gamut at this lightness`)
      );
    }
    console.log();
  }

  const anchored = entries.filter((e) => Math.abs(e.analysis.delta) > 0.10);

  console.log(bold('Recommendation'));
  console.log(
    '  Keep "Unify brand lightness" ON. It is the default for good reason:\n' +
      '  even visual weight, and contrast ratios that hold across the palette.\n'
  );
  if (anchored.length) {
    const names = anchored.map((e) => e.label || e.analysis.hex).join(', ');
    console.log(
      `  Before locking it in, preview ${names} with the client.\n` +
        '  Turn the option OFF only if these exact values are contractual — a registered\n' +
        '  mark or a brand manual. The palette will be less even, and contrast will need\n' +
        '  checking per color, but the hexes stay true.\n'
    );
  }
}

// ---------------------------------------------------------------------- main

function parseArgs(argv) {
  const inputs = [];
  let target = 0.65;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--lightness' || arg === '-l') {
      target = parseFloat(argv[++i]);
      continue;
    }
    const [maybeLabel, maybeHex] = arg.includes('=') ? arg.split('=') : [null, arg];
    inputs.push({ label: maybeLabel, hex: maybeHex.trim() });
  }
  return { inputs, target };
}

function main() {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv.includes('--help') || argv.includes('-h')) {
    console.log(`
Previews brand colors under ACSS unified lightness.

  node bin/check-colors.js "#32a2c1" "#DC3545"
  node bin/check-colors.js primary=#32a2c1 secondary=#1c1930
  node bin/check-colors.js --lightness 0.7 "#32a2c1"

Options
  -l, --lightness <n>   Target lightness (default 0.65, matching ACSS)
  -h, --help            Show this message
`);
    process.exit(0);
  }

  const { inputs, target } = parseArgs(argv);

  if (!(target > 0 && target < 1)) {
    console.error('Target lightness must be between 0 and 1.');
    process.exit(1);
  }

  const entries = [];
  for (const { label, hex } of inputs) {
    if (!/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      console.error(`Not a hex color: ${hex}`);
      process.exit(1);
    }
    entries.push({
      label,
      analysis: analyze(hex.startsWith('#') ? hex : `#${hex}`, target),
    });
  }

  report(entries, target);
}

main();
