// Génère les guides (texte EN DUR, donc lisible par les robots des IA) à partir de _guides_src/*.md,
// avec le style / header / footer d'index.html : node _build_guides.mjs
// Une langue manquante retombe sur l'anglais.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>").replace(/`(.+?)`/g, "<code>$1</code>");

function md2html(md) {
  const lines = md.split("\n"); const out = []; let i = 0;
  let ul = [], ol = [];
  const flush = () => {
    if (ul.length) { out.push("<ul>" + ul.map((x) => `<li>${inline(x)}</li>`).join("") + "</ul>"); ul = []; }
    if (ol.length) { out.push("<ol>" + ol.map((x) => `<li>${inline(x)}</li>`).join("") + "</ol>"); ol = []; }
  };
  while (i < lines.length) {
    const l = lines[i];
    if (/^\|/.test(l)) {                       // tableau markdown, défilable en largeur sur mobile
      flush();
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
      const head = cells(rows[0]); const body = rows.slice(2).map(cells);
      out.push('<div class="gdtbl"><table><thead><tr>' + head.map((h) => `<th>${h}</th>`).join("") + "</tr></thead><tbody>"
        + body.map((r) => "<tr>" + r.map((c, j) => (j === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join("") + "</tr>").join("")
        + "</tbody></table></div>");
      continue;
    }
    if (/^\d+\. /.test(l)) { if (ul.length) flush(); ol.push(l.replace(/^\d+\. /, "")); i++; continue; }
    if (/^- /.test(l)) { if (ol.length) flush(); ul.push(l.replace(/^- /, "")); i++; continue; }
    flush();
    if (/^# /.test(l)) out.push(`<h1>${inline(l.slice(2))}</h1>`);
    else if (/^## /.test(l)) out.push(`<h2>${inline(l.slice(3))}</h2>`);
    else if (/^### /.test(l)) out.push(`<h3>${inline(l.slice(4))}</h3>`);
    else if (/^---\s*$/.test(l)) out.push("<hr>");
    else if (l.trim()) out.push(`<p>${inline(l)}</p>`);
    i++;
  }
  flush();
  return out.join("\n");
}

// clés de nav / pied de page lues dans l'objet T d'index.html (même source de vérité)
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_tech","ft_sample","ft_cmp3","ft_about","ft_privacy","ft_terms"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = {
  en: { n1: "How it works", n2: "Features", n3: "Pricing", n4: "Log in", n5: "Agencies", n6: "Methodology", n7: "FAQ", n_test: "Free test", v_back: "← Back to home" },
  fr: { n1: "Fonctionnement", n2: "Fonctionnalités", n3: "Tarifs", n4: "Connexion", n5: "Agences", n6: "Méthodologie", n7: "FAQ", n_test: "Test gratuit", v_back: "← Retour à l'accueil" },
  ar: { n1: "كيف يعمل", n2: "المميزات", n3: "الأسعار", n4: "تسجيل الدخول", n5: "الوكالات", n6: "المنهجية", n7: "الأسئلة الشائعة", n_test: "فحص مجاني", v_back: "← العودة إلى الرئيسية" },
};
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);

const GUIDES = [
  {
    src: "chatgpt_brand", file: "guide-chatgpt-brand.html", url: "https://aivisib.com/guide/chatgpt-recommends-your-brand",
    published: "2026-09-17",
    meta: {
      en: { t: "How to know whether ChatGPT recommends your brand — AIVisib", d: "The method, step by step: ask the questions your customers ask, in a neutral session, several times, and count. Why your own ChatGPT gives a false reading, and why a score without a margin of error means nothing." },
      fr: { t: "Comment savoir si ChatGPT recommande votre marque — AIVisib", d: "La méthode, étape par étape : poser les questions de vos clients, en session neutre, plusieurs fois, et compter. Pourquoi votre propre ChatGPT vous ment, et pourquoi un score sans marge d'erreur ne veut rien dire." },
    },
  },
  {
    src: "noise", file: "guide-signal-bruit.html", url: "https://aivisib.com/guide/real-change-or-noise",
    published: "2026-09-17",
    meta: {
      en: { t: "AI visibility scores: how to tell a real change from noise — AIVisib", d: "On 30 answers a 23% score really means 12–41%. How many answers you need, why we use the Wilson interval, why daily tracking is not more precise, and the five questions to ask any vendor." },
      fr: { t: "Score de visibilité IA : distinguer un vrai changement du bruit — AIVisib", d: "Sur 30 réponses, un score de 23 % veut dire 12–41 %. Combien de réponses il faut, pourquoi l'intervalle de Wilson, pourquoi le quotidien n'est pas plus précis, et cinq questions à poser à tout vendeur." },
    },
  },
  {
    src: "agency", file: "guide-agences.html", url: "https://aivisib.com/guide/ai-visibility-for-agencies",
    published: "2026-09-18",
    meta: {
      en: { t: "AI visibility for an agency: how to track ten clients — AIVisib", d: "One project per client, twenty to forty frozen questions, weekly measurement, a report that states its margin. The economics at $40 per client, what goes in the client report, the five mistakes, and when to say no." },
      fr: { t: "Visibilité IA en agence : suivre dix clients sans se noyer — AIVisib", d: "Un projet par client, vingt à quarante questions figées, mesure hebdomadaire, rapport avec sa marge. L'économie à 40 $ par client, le contenu du rapport, les cinq erreurs, et quand dire non." },
    },
  },
];

for (const g of GUIDES) {
  const L = {};
  for (const l of ["en", "fr", "ar"]) {
    const p = `_guides_src/${g.src}_${l}.md`;
    if (existsSync(p)) L[l] = md2html(readFileSync(p, "utf8"));
  }
  const langs = Object.keys(L);
  const def = langs.includes("fr") ? "fr" : langs[0];
  const META = {};
  for (const l of ["en", "fr", "ar"]) META[l] = g.meta[l] || g.meta[langs.includes("en") ? "en" : def];
  // données structurées : un article, lu par les moteurs
  const ld = {
    "@context": "https://schema.org", "@type": "Article",
    headline: g.meta.en ? g.meta.en.t.split(" — ")[0] : META[def].t,
    description: (g.meta.en || META[def]).d,
    inLanguage: langs, datePublished: g.published, dateModified: g.published,
    mainEntityOfPage: g.url,
    author: { "@type": "Organization", name: "AIVisib", url: "https://aivisib.com/" },
    publisher: { "@type": "Organization", name: "Norstrol LLC", url: "https://aivisib.com/" },
  };
  const html = `<!DOCTYPE html>
<html lang="${def}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${META[def].t}</title>
<meta name="description" content="${META[def].d}">
<link rel="canonical" href="${g.url}">
${langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${g.url}?lang=${l}">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${g.url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:type" content="article"><meta property="og:site_name" content="AIVisib"><meta property="og:url" content="${g.url}"><meta property="og:title" content="${META[def].t}"><meta property="og:description" content="${META[def].d}"><meta property="og:image" content="https://aivisib.com/og-image.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.gdw{max-width:760px;margin:0 auto;padding:54px 26px 90px}
.gdw h1{font-size:clamp(31px,4.4vw,50px);letter-spacing:-.03em;margin-bottom:22px;line-height:1.08}
.gdw h2{font-size:25px;margin:48px 0 14px;letter-spacing:-.02em}
.gdw h3{font-size:18px;margin:26px 0 6px;color:var(--cream)}
.gdw p,.gdw li{color:var(--dim);font-size:16.5px;line-height:1.72}
.gdw p{margin:0 0 14px}
.gdw ul,.gdw ol{margin:0 0 16px 22px}
body.rtl .gdw ul,body.rtl .gdw ol{margin:0 22px 16px 0}
.gdw li{margin-bottom:9px}
.gdw b{color:var(--cream)}
.gdw i{font-family:'Instrument Serif',serif;font-style:italic;font-size:17.5px}
.gdw hr{border:0;border-top:1px solid var(--line);margin:40px 0 24px}
.gdw hr + p{font-size:15px;background:var(--panel);border:1px solid var(--line);border-inline-start:3px solid var(--acid);border-radius:14px;padding:18px 20px}
.gdw p:first-of-type{font-size:18.5px;color:var(--cream)}
.gdtbl{overflow-x:auto;margin:20px 0 22px}
.gdtbl table{border-collapse:collapse;width:100%;font-size:14.5px;min-width:520px}
.gdtbl th,.gdtbl td{border:1px solid var(--line);padding:9px 12px;text-align:start;color:var(--dim)}
.gdtbl thead th{background:var(--ink2);color:var(--cream);font-weight:600}
.gdtbl tbody th{color:var(--cream);font-weight:500;background:var(--ink2)}
.gdlang{display:none}.gdlang.on{display:block}
.gdcta{margin-top:34px}
.gdcta a{display:inline-block;background:var(--acid);color:#0A0A0B;font-weight:700;padding:12px 22px;border-radius:99px;font-size:15px}
</style>
</head>
<body>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="/" data-i="v_back"></a></div>
<main class="gdw">
${langs.map((l) => `<article class="gdlang" id="gd_${l}"${l === "ar" ? ' dir="rtl"' : ""}>${L[l]}</article>`).join("\n")}
<div class="gdcta"><a href="/#audit" id="gdcta"></a></div>
</main>
${footer}
<script>
const NAV=${JSON.stringify(NAV)};const META=${JSON.stringify(META)};const LANGS=${JSON.stringify(langs)};const DEF=${JSON.stringify(def)};
const CTA={en:"Check my brand — free, no card",fr:"Vérifier ma marque — gratuit, sans carte",ar:"افحص علامتي — مجاناً وبدون بطاقة"};
function setLang(l){const shown=LANGS.includes(l)?l:(LANGS.includes('en')?'en':DEF);
 document.body.classList.toggle('rtl',shown==='ar');document.documentElement.lang=shown;
 document.title=META[l].t;document.querySelector('meta[name=description]').setAttribute('content',META[l].d);
 document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[l]&&NAV[l][k]!==undefined)e.textContent=NAV[l][k]});
 LANGS.forEach(x=>document.getElementById('gd_'+x).classList.toggle('on',x===shown));
 ['en','fr','ar'].forEach(x=>{const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===l)});
 document.getElementById('gdcta').textContent=CTA[l]||CTA.en;
 try{localStorage.setItem('lang',l)}catch(e){}
 document.querySelectorAll('a[href^="https://app.aivisib.com"]').forEach(a=>{a.href='https://app.aivisib.com/?lang='+l});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.setAttribute('href','/'+a.getAttribute('href').replace(/^\\/+/,'')));}
function toggleMenu(){const b=document.getElementById('burgerBtn'),m=document.getElementById('mmenu');const open=!m.classList.contains('open');m.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');}
function refreshThemeBtn(){const b=document.getElementById('themeBtn');if(b)b.setAttribute('aria-label',document.body.classList.contains('dark')?'Light mode':'Dark mode');}
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem('aiv_theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}refreshThemeBtn();}
refreshThemeBtn();
setLang((()=>{const ok=l=>['en','fr','ar'].includes(l);try{const u=new URLSearchParams(location.search).get('lang');if(ok(u))return u;}catch(e){}try{const s=localStorage.getItem('lang');if(ok(s))return s;}catch(e){}try{const langs=(navigator.languages||[navigator.language||'en']).map(x=>String(x).slice(0,2).toLowerCase());const h=langs.find(ok);if(h)return h;}catch(e){}return 'en';})());
</script>
</body>
</html>`;
  writeFileSync(g.file, html);
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
  console.log(`→ ${g.file} (${langs.join(", ")}) · ${visible} caractères lisibles`);
}
