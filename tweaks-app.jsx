// tweaks-app.jsx — Sanjeevan Fitness tweak controls
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C8102E",
  "gold": "#F0B429",
  "mood": "Midnight Navy",
  "displayFont": "Bebas Neue",
  "textFont": "Barlow",
  "headSpacing": 2,
  "headline": "Elevate Your Fitness",
  "heroDarken": 0.12,
  "video": true,
  "grid": true,
  "slash": true,
  "ghost": true,
  "btnShape": "Angled",
  "marquee": true,
  "marqueeSpeed": 18,
  "reveal": true,
  "watermark": true,
  "svcCols": "3 columns"
}/*EDITMODE-END*/;

// ---- presets ----
const ACCENTS = {
  "#C8102E": { rgb: "200,16,46",  bright: "#E8152F" }, // crimson
  "#2A6FDB": { rgb: "42,111,219", bright: "#3F86F2" }, // electric blue
  "#1F9D57": { rgb: "31,157,87",  bright: "#28BA68" }, // emerald
  "#7A4DE0": { rgb: "122,77,224", bright: "#9266F2" }, // violet
  "#E8632A": { rgb: "232,99,42",  bright: "#FF7A3D" }, // orange
};
const MOODS = {
  "Midnight Navy": { base: "#060D20", deep: "#0D1B3E", mid: "#162449", dbRgb: "6,13,32",   navyRgb: "13,27,62" },
  "Pure Black":    { base: "#000000", deep: "#0a0a0a", mid: "#161616", dbRgb: "0,0,0",     navyRgb: "14,14,14" },
  "Charcoal":      { base: "#121417", deep: "#1A1D22", mid: "#23272E", dbRgb: "18,20,23",  navyRgb: "26,29,34" },
  "Deep Maroon":   { base: "#170306", deep: "#26060C", mid: "#330810", dbRgb: "23,3,6",    navyRgb: "38,6,12" },
};
const TEXTFONTS = {
  "Barlow":   { cond: "'Barlow Condensed',sans-serif", body: "'Barlow',sans-serif" },
  "Saira":    { cond: "'Saira Condensed',sans-serif",  body: "'Saira',sans-serif" },
  "Rajdhani": { cond: "'Rajdhani',sans-serif",         body: "'Rajdhani',sans-serif" },
};
const SHAPES = {
  "Angled":  { clip: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", r: "0" },
  "Square":  { clip: "none", r: "0" },
  "Rounded": { clip: "none", r: "10px" },
};
const HEADLINES = {
  "Elevate Your Fitness":  ["Elevate", "Your", "Fitness"],
  "Train Like A Champion": ["Train Like", "A", "Champion"],
  "Stronger Every Day":    ["Stronger", "Every", "Day"],
  "Zero Excuses":          ["Zero", "Excuses", "Only Results"],
};

function applyTweaks(t) {
  const s = document.documentElement.style;
  const body = document.body;

  // accent
  const acc = ACCENTS[t.accent] || ACCENTS["#C8102E"];
  s.setProperty("--crimson", t.accent);
  s.setProperty("--crimson-rgb", acc.rgb);
  s.setProperty("--bright-red", acc.bright);
  // gold
  s.setProperty("--gold", t.gold);
  // mood
  const m = MOODS[t.mood] || MOODS["Midnight Navy"];
  s.setProperty("--dark-base", m.base);
  s.setProperty("--navy-deep", m.deep);
  s.setProperty("--navy-mid", m.mid);
  s.setProperty("--db-rgb", m.dbRgb);
  s.setProperty("--navy-rgb", m.navyRgb);
  // fonts
  s.setProperty("--display", "'" + t.displayFont + "',sans-serif");
  const tf = TEXTFONTS[t.textFont] || TEXTFONTS["Barlow"];
  s.setProperty("--cond", tf.cond);
  s.setProperty("--body", tf.body);
  s.setProperty("--head-spacing", t.headSpacing + "px");
  // hero
  s.setProperty("--hero-darken", String(t.heroDarken));
  // button shape
  const sh = SHAPES[t.btnShape] || SHAPES["Angled"];
  s.setProperty("--btn-clip", sh.clip);
  s.setProperty("--btn-radius", sh.r);
  // marquee + grid
  s.setProperty("--marquee-dur", t.marqueeSpeed + "s");
  s.setProperty("--svc-cols", t.svcCols === "2 columns" ? "repeat(2,1fr)" : "repeat(3,1fr)");

  // toggles
  body.classList.toggle("no-video", !t.video);
  body.classList.toggle("no-grid", !t.grid);
  body.classList.toggle("no-slash", !t.slash);
  body.classList.toggle("no-ghost", !t.ghost);
  body.classList.toggle("no-marquee", !t.marquee);
  body.classList.toggle("no-watermark", !t.watermark);
  body.classList.toggle("no-reveal", !t.reveal);

  // video play/pause
  const v = document.querySelector(".hero-video");
  if (v) { if (t.video) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else { v.pause(); } }

  // headline swap
  const hl = HEADLINES[t.headline];
  if (hl) {
    const a = document.getElementById("hl1"), b = document.getElementById("hl2"), c = document.getElementById("hl3");
    if (a) a.textContent = hl[0];
    if (b) b.textContent = hl[1];
    if (c) c.textContent = hl[2];
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand color" />
      <TweakColor label="Accent" value={t.accent}
        options={["#C8102E", "#2A6FDB", "#1F9D57", "#7A4DE0", "#E8632A"]}
        onChange={(v) => setTweak("accent", v)} />
      <TweakColor label="Trust badge" value={t.gold}
        options={["#F0B429", "#E8C547", "#D6DAE2", "#FF9D2E"]}
        onChange={(v) => setTweak("gold", v)} />
      <TweakSelect label="Background" value={t.mood}
        options={["Midnight Navy", "Pure Black", "Charcoal", "Deep Maroon"]}
        onChange={(v) => setTweak("mood", v)} />

      <TweakSection label="Typography" />
      <TweakSelect label="Display font" value={t.displayFont}
        options={["Bebas Neue", "Anton", "Oswald", "Teko"]}
        onChange={(v) => setTweak("displayFont", v)} />
      <TweakSelect label="Text font" value={t.textFont}
        options={["Barlow", "Saira", "Rajdhani"]}
        onChange={(v) => setTweak("textFont", v)} />
      <TweakSlider label="Heading spacing" value={t.headSpacing} min={0} max={8} step={0.5} unit="px"
        onChange={(v) => setTweak("headSpacing", v)} />

      <TweakSection label="Hero" />
      <TweakSelect label="Headline" value={t.headline}
        options={["Elevate Your Fitness", "Train Like A Champion", "Stronger Every Day", "Zero Excuses"]}
        onChange={(v) => setTweak("headline", v)} />
      <TweakSlider label="Overlay darkness" value={t.heroDarken} min={0} max={0.75} step={0.01}
        onChange={(v) => setTweak("heroDarken", v)} />
      <TweakToggle label="Background video" value={t.video} onChange={(v) => setTweak("video", v)} />
      <TweakToggle label="Grid lines" value={t.grid} onChange={(v) => setTweak("grid", v)} />
      <TweakToggle label="Diagonal slash" value={t.slash} onChange={(v) => setTweak("slash", v)} />
      <TweakToggle label="Ghost letters" value={t.ghost} onChange={(v) => setTweak("ghost", v)} />

      <TweakSection label="Shape & motion" />
      <TweakRadio label="Button shape" value={t.btnShape}
        options={["Angled", "Square", "Rounded"]}
        onChange={(v) => setTweak("btnShape", v)} />
      <TweakToggle label="Marquee band" value={t.marquee} onChange={(v) => setTweak("marquee", v)} />
      <TweakSlider label="Marquee speed" value={t.marqueeSpeed} min={6} max={40} unit="s"
        onChange={(v) => setTweak("marqueeSpeed", v)} />
      <TweakToggle label="Scroll animations" value={t.reveal} onChange={(v) => setTweak("reveal", v)} />
      <TweakToggle label="Section watermarks" value={t.watermark} onChange={(v) => setTweak("watermark", v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Services grid" value={t.svcCols}
        options={["3 columns", "2 columns"]}
        onChange={(v) => setTweak("svcCols", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweak-root")).render(<App />);
