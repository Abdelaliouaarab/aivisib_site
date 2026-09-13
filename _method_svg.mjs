// Remplace la rangée de boutons par un vrai diagramme SVG animé (flux question → 4 moteurs × 3 passages → analyse → statistiques → rapport) : node _method_svg.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8").replace(/\r\n/g, "\n");
const a = h.indexOf('<div class="mflow" role="tablist">'), b = h.indexOf('<div class="mpanel">');
if (a < 0 || b < 0) throw new Error("mflow/mpanel introuvables");

// géométrie
const N = { q: { x: 10, y: 150, w: 150, h: 80 }, an: { x: 480, y: 150, w: 150, h: 80 }, st: { x: 710, y: 150, w: 150, h: 80 }, rp: { x: 940, y: 150, w: 150, h: 80 } };
const ENG = [["ChatGPT", 30], ["Gemini", 120], ["Perplexity", 210], ["Claude", 300]].map(([n, y]) => ({ n, x: 240, y, w: 150, h: 56 }));
const cur = (x1, y1, x2, y2, off = 0) => `M${x1},${y1 + off} C${(x1 + x2) / 2},${y1 + off} ${(x1 + x2) / 2},${y2 + off} ${x2},${y2 + off}`;
let paths = "", dots = "", k = 0;
const qx = N.q.x + N.q.w, qy = N.q.y + N.q.h / 2;
for (const e of ENG) for (const off of [-8, 0, 8]) { const d = cur(qx, qy, e.x, e.y + e.h / 2, off); paths += `<path d="${d}" class="ml"/>`; dots += `<circle r="3.2" class="md"><animateMotion dur="${(2.2 + (k % 5) * 0.25).toFixed(2)}s" begin="${((k * 0.37) % 2.5).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`; k++; }
for (const e of ENG) { const d = cur(e.x + e.w, e.y + e.h / 2, N.an.x, N.an.y + N.an.h / 2); paths += `<path d="${d}" class="ml"/>`; dots += `<circle r="3.2" class="md"><animateMotion dur="2s" begin="${((k * 0.41) % 2).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></circle>`; k++; }
for (const [p1, p2] of [[N.an, N.st], [N.st, N.rp]]) { const d = `M${p1.x + p1.w},${p1.y + p1.h / 2} L${p2.x},${p2.y + p2.h / 2}`; paths += `<path d="${d}" class="ml thick"/>`; dots += `<circle r="4" class="md"><animateMotion dur="1.6s" repeatCount="indefinite" path="${d}"/></circle>`; }
const node = (n, o, key, sub, extra = "") => `<g class="mnode${n === 1 ? " on" : ""}" data-n="${n}" onclick="mdSel(${n})" role="tab" tabindex="0"><rect x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}" rx="16"/><text x="${o.x + 14}" y="${o.y + 30}" class="mt1" data-i="${key}"></text><text x="${o.x + 14}" y="${o.y + 54}" class="mt2" data-i="${sub}"></text>${extra}</g>`;
const eng = ENG.map((e) => `<g class="meng2"><rect x="${e.x}" y="${e.y}" width="${e.w}" height="${e.h}" rx="12"/><text x="${e.x + 14}" y="${e.y + 34}" class="mt1s">${e.n}</text></g>`).join("");
const svg = `<div class="mflow"><svg viewBox="0 0 1100 380" xmlns="http://www.w3.org/2000/svg" aria-label="AIVisib measurement pipeline">
  <g class="mlines">${paths}</g>
  ${node(1, N.q, "dg1l", "dg1s")}
  <g class="mnode" data-n="2" onclick="mdSel(2)" role="tab" tabindex="0"><rect x="228" y="16" width="174" height="356" rx="20" class="mgroup"/><text x="240" y="366" class="mt2 mgl" data-i="dg2s"></text>${eng}</g>
  ${node(3, N.an, "dg3l", "dg3s")}
  ${node(4, N.st, "dg4l", "dg4s", `<text x="${N.st.x + N.st.w - 14}" y="${N.st.y - 10}" class="mtag" text-anchor="end">65 % ± 12</text>`)}
  ${node(5, N.rp, "dg5l", "dg5s")}
  <text x="205" y="120" class="mx3" text-anchor="middle">× 3</text>
  <g class="mdots">${dots}</g>
</svg></div>
    `;
h = h.slice(0, a) + svg + h.slice(b);
h = h.replace("</style>", `
/* ===== diagramme SVG ===== */
.mflow{overflow-x:auto;padding:4px 0 8px}
.mflow svg{width:100%;min-width:760px;display:block;direction:ltr}
.ml{fill:none;stroke:var(--line);stroke-width:1.4}
.ml.thick{stroke-width:2.2}
.md{fill:var(--acid-ink)}
.mnode rect{fill:var(--ink2);stroke:var(--line);stroke-width:1.2;transition:.18s;cursor:pointer}
.mnode:hover rect{stroke:var(--cream)}
.mnode.on rect{fill:var(--acid);stroke:var(--acid)}
.mnode.on .mgroup{fill:rgba(204,255,46,.18)}
.mnode text{cursor:pointer;pointer-events:none}
.mt1{font:700 17px 'Space Grotesk',system-ui,sans-serif;fill:var(--cream);letter-spacing:-.01em}
.mt1s{font:600 15px 'Space Grotesk',system-ui,sans-serif;fill:var(--cream)}
.mt2{font:500 11.5px 'JetBrains Mono',monospace;fill:var(--dim)}
.mnode.on .mt1,.mnode.on .mt2{fill:#0A0A0B}
.mgroup{fill:var(--panel);stroke:var(--line);stroke-dasharray:4 4}
.meng2 rect{fill:var(--ink2);stroke:var(--line)}
.mnode.on .meng2 rect{fill:var(--acid);stroke:var(--acid)}
.mnode.on .mt1s{fill:#0A0A0B}
.mtag,.mx3{font:700 12px 'JetBrains Mono',monospace;fill:var(--acid-ink)}
body.rtl .mt1,body.rtl .mt2,body.rtl .mgl{font-family:'Cairo',sans-serif}
</style>`);
writeFileSync("index.html", h);
console.log("svg ✓", h.length);
