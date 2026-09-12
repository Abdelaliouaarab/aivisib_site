// Restructure index.html (v3) : hero + audit intégré, rapport réel, mesures réelles, objections, footer, nettoyage : node _restructure_v3.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8");
const cut = (from, to, repl) => { const a = h.indexOf(from), b = h.indexOf(to, a + 1); if (a < 0 || b < 0) throw new Error("marqueur manquant : " + (a < 0 ? from : to)); h = h.slice(0, a) + repl + h.slice(b); };
if (h.includes('id="mesures"')) { console.log("déjà restructuré"); process.exit(0); }

// 1) HERO + strip + audit → hero avec audit intégré
const auditForm = h.slice(h.indexOf('<div class="af-row">'), h.indexOf('<div class="auditresult"')).replace(/<div class="au-trust">[\s\S]*?<\/div>\n/, "");
cut("<!-- HERO -->", "<!-- DASHBOARD PREVIEW -->", `<!-- HERO -->
<section class="hero" id="hero"><div class="wrap"><div class="hgrid">
  <div>
    <div class="kicker"><s></s><span data-i="kick"></span></div>
    <h1 data-i="h1v3"></h1>
    <p class="sub" data-i="subv3"></p>
    <div class="pills"><span data-i="pill1"></span><span data-i="pill2"></span><span data-i="pill3"></span></div>
    <div class="btns"><a href="#audit" class="cta big" data-i="cta1"></a><a href="#realreport" class="cta out" data-i="cta2"></a></div>
    <div class="tstrip"><span data-i="ts1"></span><span data-i="ts2"></span><span data-i="ts3"></span><span data-i="ts4"></span><span data-i="ts5"></span></div>
  </div>
  <div class="auditbox" id="audit">
    <div class="au-head"><div class="kicker"><s></s><span data-i="au_k"></span></div><h2 data-i="au_t"></h2><p data-i="au_p"></p></div>
    ${auditForm.trim()}
    <div class="auditresult" id="auditResult" style="display:none"></div>
  </div>
</div></div></section>

`);

// 2) maquette dashboard → capture réelle du rapport
cut("<!-- DASHBOARD PREVIEW -->", "<!-- HOW -->", `<!-- REAL REPORT (capture réelle) -->
<section class="s" id="realreport" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="rd_k"></span></div><h2 data-i="rd_t"></h2><p data-i="rd_p"></p></div>
  <div class="shot rv"><img src="/brand/screens/report_boursobank.png" alt="AIVisib — rapport BoursoBank" loading="lazy" width="1440" height="2000"></div>
</div></section>

`);

// 3) section « race » (déjà fusionnée dans le bloc 2 car elle était entre DASHBOARD et HOW)

// 4) HOW : retirer les maquettes fictives (Orvia, Muscat)
h = h.replace(/<div class="hwm">[\s\S]*?<\/div>\n    <\/div>/g, "</div>");

// 5) REPORT PREVIEW + REAL REPORT (fictif) → mesures réelles
const card = (i) => `    <div class="mcard rv"><div class="mq">“<span data-i="m${i}q"></span>”</div><div class="mv" data-i="m${i}v"></div><p class="mi" data-i="m${i}i"></p><div class="mm"><span><span data-i="m_meas"></span> <span data-i="m${i}d"></span></span><span>ChatGPT · Gemini</span><span><span data-i="m_asked"></span> <span data-i="m${i}l"></span></span></div></div>`;
cut("<!-- REPORT PREVIEW", "<!-- BENTO -->", `<!-- MESURES RÉELLES -->
<section class="s" id="mesures" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span>ChatGPT · Gemini · 07–11/09/2026</span></div><h2 data-i="m_t"></h2><p data-i="m_p"></p></div>
  <div class="mcards">
${[1, 2, 3, 4, 5, 6, 7, 8].map(card).join("\n")}
  </div>
  <a class="faqall" href="https://www.linkedin.com/company/146271305" target="_blank" rel="noopener" data-i="m_all"></a>
</div></section>

`);

// 6) BENTO : numéros propres, plus de maquettes fictives
h = h.replace(/<span class="n">(\d\d) \/ [^<]+<\/span>/g, '<span class="n">$1</span>');
{ const a = h.indexOf('<section class="s" id="feat">'), b = h.indexOf("</section>", a); let sec = h.slice(a, b); sec = sec.replace(/\n      <div class="fx">[\s\S]*?<\/div><\/div>/g, "</div>").replace(/\n      <div class="flags">[\s\S]*?<\/div><\/div>/g, "</div>"); h = h.slice(0, a) + sec + h.slice(b); }

// 7) OBJECTIONS avant la FAQ
cut("<!-- FAQ -->", '<section class="s" id="faq">', `<!-- OBJECTIONS -->
<section class="s" id="objections" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="q_k"></span></div><h2 data-i="ob_t"></h2></div>
  <div class="faq rv">
${[1, 2, 3, 4, 5, 6].map((i) => `    <details${i === 1 ? " open" : ""}><summary data-i="ob${i}q"></summary><p data-i="ob${i}a"></p></details>`).join("\n")}
  </div>
</div></section>

<!-- FAQ -->
`);

// 8) footer
cut("<footer>", "</footer>", `<footer><div class="wrap">
  <div class="ftg">
    <div class="ftc"><a class="logo" href="/" aria-label="AIVisib"><i>◈</i>AIVisib</a><p data-i="f_company"></p></div>
    <div class="ftl">
      <a href="/methodologie" data-i="fl_meth"></a><a href="/agences" data-i="fl_ag"></a><a href="/comparatif" data-i="fl_cmp"></a><a href="/faq" data-i="fl_faq"></a><a href="#mesures" data-i="fl_meas"></a><a href="https://www.linkedin.com/company/146271305" target="_blank" rel="noopener" data-i="fl_li"></a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a>
    </div>
  </div>
  <div class="ft"><div>© 2026 AIVisib — Norstrol LLC</div><div><a href="mailto:hello@aivisib.com">hello@aivisib.com</a></div></div>
</div>`);

// 9) head : descriptions sans « Spanish », hreflang
h = h.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="AIVisib measures whether ChatGPT, Gemini, Perplexity and Claude recommend your brand — every week, in English, French and Arabic, with the margin of error shown. Built for brands and agencies in the Gulf, Morocco and France. From $29/month.">');
h = h.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Does ChatGPT name you or your rival? Weekly measurement on 4 AI engines, in English, French and Arabic, with the margin of error shown.">');
h = h.replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="Does ChatGPT name you or your rival? Weekly measurement on 4 AI engines, in English, French and Arabic.">');
h = h.replace(/"description":"AIVisib tracks[^"]*"/, '"description":"AIVisib measures whether ChatGPT, Gemini, Perplexity and Claude recommend a brand, per engine and per language (English, French, Arabic), with a confidence interval, a weekly report and an action plan."');
h = h.replace('<link rel="canonical" href="https://aivisib.com/">', '<link rel="canonical" href="https://aivisib.com/">\n<link rel="alternate" hreflang="en" href="https://aivisib.com/?lang=en"><link rel="alternate" hreflang="fr" href="https://aivisib.com/?lang=fr"><link rel="alternate" hreflang="ar" href="https://aivisib.com/?lang=ar"><link rel="alternate" hreflang="x-default" href="https://aivisib.com/">');
h = h.replace(/<!-- Favicon -->\n<link rel="icon" href="\/favicon.svg" type="image\/svg\+xml">\n<link rel="apple-touch-icon" href="\/favicon.svg">\n/, "");

// 10) JS : plus de chat simulé
h = h.replace("  idx=0; runDemo();\n", "");

// 11) CSS additions
h = h.replace("</style>", `
/* ===== v3 ===== */
.hgrid{align-items:start}
.hgrid .auditbox{max-width:none;margin:0}
.au-head h2{font-size:22px;letter-spacing:-.02em;margin:4px 0 8px}
.au-head p{color:var(--dim);font-size:14px;margin-bottom:16px}
.au-head .kicker{margin-bottom:10px}
.pills{display:flex;gap:8px;flex-wrap:wrap;margin:-12px 0 24px}
.pills span{font:600 12.5px 'JetBrains Mono',monospace;padding:6px 12px;border-radius:99px;background:var(--ink2);border:1px solid var(--line);color:var(--cream)}
body.rtl .pills span{font-family:'Cairo',sans-serif}
.tstrip{margin-top:26px;display:flex;flex-wrap:wrap;gap:8px 18px;font:500 13px 'JetBrains Mono',monospace;color:var(--dim)}
.tstrip span::before{content:"✓ ";color:var(--acid-ink);font-weight:700}
body.rtl .tstrip{font-family:'Cairo',sans-serif}
.shot{border:1px solid var(--line);border-radius:20px;overflow:hidden;box-shadow:var(--shadow-dash);max-height:760px;position:relative;background:var(--panel)}
.shot img{width:100%;height:auto;display:block}
.shot::after{content:"";position:absolute;left:0;right:0;bottom:0;height:140px;background:linear-gradient(transparent,var(--ink));pointer-events:none}
.mcards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:820px){.mcards{grid-template-columns:1fr}}
.mcard{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:22px 24px}
.mq{font-family:'Instrument Serif',serif;font-style:italic;font-size:21px;line-height:1.3;margin-bottom:10px;color:var(--cream)}
body.rtl .mq{font-family:'Cairo',sans-serif;font-style:normal;font-weight:700;font-size:18px}
.mv{font-weight:700;font-size:16px;color:var(--acid-ink);margin-bottom:8px}
.mi{color:var(--dim);font-size:14.5px;line-height:1.55}
.mm{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:14px;font:500 12px 'JetBrains Mono',monospace;color:var(--dim)}
body.rtl .mm{font-family:'Cairo',sans-serif}
.ftg{display:grid;grid-template-columns:1.2fr 2fr;gap:28px;padding:34px 0 22px;border-bottom:1px solid var(--line);margin-bottom:16px}
@media(max-width:820px){.ftg{grid-template-columns:1fr}}
.ftc p{color:var(--dim);font-size:13.5px;margin-top:12px;max-width:380px}
.ftl{display:flex;flex-wrap:wrap;gap:10px 22px;align-content:start;justify-content:flex-end;font-size:14px}
@media(max-width:820px){.ftl{justify-content:flex-start}}
.ftl a{color:var(--dim)}.ftl a:hover{color:var(--cream)}
</style>`);

writeFileSync("index.html", h);
console.log("restructuré ✓", h.length);
