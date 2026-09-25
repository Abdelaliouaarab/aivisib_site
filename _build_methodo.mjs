// Génère methodologie.html (trilingue) à partir des 3 fichiers markdown + le style/header/footer d'index.html : node _build_methodo.mjs
import { readFileSync, writeFileSync } from "node:fs";
const SP = "./_methodo_src/"; // textes sources de la page (EN/FR/AR), versionnés dans le dépôt
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, "<code>$1</code>");
function md2html(md) {
  const lines = md.split("\n"); let out = [], i = 0;
  const flushList = (buf, ol) => { if (buf.length) { out.push(`<${ol ? "ol" : "ul"}>` + buf.map((x) => `<li>${inline(x)}</li>`).join("") + `</${ol ? "ol" : "ul"}>`); buf.length = 0; } };
  let ul = [], ol = [];
  while (i < lines.length) {
    const l = lines[i];
    if (/^\|/.test(l)) { // table
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
      const head = cells(rows[0]); const body = rows.slice(2).map(cells);
      out.push('<div class="mtbl"><table><thead><tr>' + head.map((h) => `<th>${h}</th>`).join("") + "</tr></thead><tbody>" + body.map((r) => "<tr>" + r.map((c) => `<td>${c}</td>`).join("") + "</tr>").join("") + "</tbody></table></div>");
      continue;
    }
    if (/^\d+\. /.test(l)) { flushList(ul, false); ol.push(l.replace(/^\d+\. /, "")); i++; continue; }
    if (/^- /.test(l)) { flushList(ol, true); ul.push(l.replace(/^- /, "")); i++; continue; }
    flushList(ul, false); flushList(ol, true);
    if (/^# /.test(l)) out.push(`<h1>${inline(l.slice(2))}</h1>`);
    else if (/^## /.test(l)) out.push(`<h2 id="s${out.length}">${inline(l.slice(3))}</h2>`);
    else if (/^### /.test(l)) out.push(`<h3>${inline(l.slice(4))}</h3>`);
    else if (/^---/.test(l)) out.push("<hr>");
    else if (l.trim()) out.push(`<p>${inline(l)}</p>`);
    i++;
  }
  flushList(ul, false); flushList(ol, true);
  return out.join("\n");
}
const L = { en: md2html(readFileSync(SP + "methodo_en.md", "utf8")), fr: md2html(readFileSync(SP + "methodo_fr.md", "utf8")), ar: md2html(readFileSync(SP + "methodo_ar.md", "utf8")) };
// clés du pied de page et de la nav lues dans l'objet T d'index.html (même source de vérité)
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_tech","ft_sample","ft_cmp3","ft_about","ft_privacy","ft_terms"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = {
  en: { n1: "How it works", n2: "Features", n3: "Pricing", n4: "Log in", n5: "Agencies", n6: "Methodology", n7: "FAQ", n_test: "Free test", v_back: "← Back to home" },
  fr: { n1: "Fonctionnement", n2: "Fonctionnalités", n3: "Tarifs", n4: "Connexion", n5: "Agences", n6: "Méthodologie", n7: "FAQ", n_test: "Test gratuit", v_back: "← Retour à l'accueil" },
  ar: { n1: "كيف يعمل", n2: "المميزات", n3: "الأسعار", n4: "تسجيل الدخول", n5: "الوكالات", n6: "المنهجية", n7: "الأسئلة الشائعة", n_test: "فحص مجاني", v_back: "← العودة إلى الرئيسية" },
};
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);
const META = {
  en: { t: "How we measure AI visibility — AIVisib methodology", d: "How AIVisib measures if ChatGPT, Gemini, Perplexity and Claude recommend your business: real customer questions, weekly passes, margin of error." },
  fr: { t: "Comment nous mesurons la visibilité IA — méthodologie AIVisib", d: "Comment AIVisib mesure si ChatGPT, Gemini, Perplexity et Claude recommandent votre entreprise : vraies questions clients, mesure hebdo, marge d'erreur." },
  ar: { t: "كيف نقيس الظهور في الذكاء الاصطناعي — منهجية AIVisib", d: "كيف يقيس AIVisib إن كانت ChatGPT، Gemini، Perplexity، Claude توصي بنشاطك: أسئلة عملاء حقيقيين، قياس أسبوعي، وهامش خطأ." },
};
// Données structurées (Article + FAQ + fil d'Ariane) : lues directement par Google et les moteurs IA.
// La FAQ est extraite de la section « Questions fréquentes » du texte français (même source de vérité que la page).
const frMd = readFileSync(SP + "methodo_fr.md", "utf8");
const faqBlock = frMd.slice(frMd.indexOf("## 9. Questions fréquentes"), frMd.indexOf("## Versions"));
const faq = [...faqBlock.matchAll(/^### (.+)\n\n([\s\S]+?)(?=\n\n###|\n*$)/gm)].map((m) => ({ "@type": "Question", name: m[1].trim(), acceptedAnswer: { "@type": "Answer", text: m[2].replace(/\*\*/g, "").trim() } }));
const LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "TechArticle", headline: "Méthodologie : comment AIVisib mesure la visibilité de votre marque dans les réponses des IA", description: META.fr.d, inLanguage: ["fr", "en", "ar"], datePublished: "2026-09-12", dateModified: "2026-09-25", url: "https://aivisib.com/methodologie", author: { "@type": "Organization", name: "AIVisib", url: "https://aivisib.com" }, publisher: { "@type": "Organization", name: "AIVisib", url: "https://aivisib.com", logo: { "@type": "ImageObject", url: "https://aivisib.com/brand/aivisib-logo-400.png" } }, about: ["AI visibility", "Generative Engine Optimization", "ChatGPT", "Gemini", "Perplexity", "Claude"] },
    { "@type": "FAQPage", mainEntity: faq },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "AIVisib", item: "https://aivisib.com/" }, { "@type": "ListItem", position: 2, name: "Méthodologie", item: "https://aivisib.com/methodologie" }] },
  ],
};
if (faq.length < 5) throw new Error("FAQ JSON-LD : " + faq.length + " questions extraites seulement");
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${META.fr.t}</title>
<meta name="description" content="${META.fr.d}">
<link rel="canonical" href="https://aivisib.com/methodologie">
<link rel="alternate" hreflang="en" href="https://aivisib.com/methodologie?lang=en">
<link rel="alternate" hreflang="fr" href="https://aivisib.com/methodologie?lang=fr">
<link rel="alternate" hreflang="ar" href="https://aivisib.com/methodologie?lang=ar">
<link rel="alternate" hreflang="x-default" href="https://aivisib.com/methodologie">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:type" content="article"><meta property="og:site_name" content="AIVisib"><meta property="og:url" content="https://aivisib.com/methodologie"><meta property="og:title" content="${META.fr.t}"><meta property="og:description" content="${META.fr.d}"><meta property="og:image" content="https://aivisib.com/og-image.png">
<script type="application/ld+json">${JSON.stringify(LD).replace(/</g, "\\u003c")}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.mth{max-width:820px;margin:0 auto;padding:54px 26px 90px}
.mth h1{font-size:clamp(34px,4.6vw,56px);margin-bottom:18px}
.mth h2{font-size:26px;margin:46px 0 12px;letter-spacing:-.02em}
.mth h3{font-size:17px;margin:22px 0 6px;color:var(--cream)}
.mth p,.mth li{color:var(--dim);font-size:16px;line-height:1.65}
.mth p{margin:0 0 12px}.mth ul,.mth ol{margin:0 0 14px 22px}.mth li{margin-bottom:6px}
body.rtl .mth ul,body.rtl .mth ol{margin:0 22px 14px 0}
.mth b{color:var(--cream)}.mth code{font-family:'JetBrains Mono',monospace;font-size:14px;background:var(--ink2);padding:1px 6px;border-radius:5px}
.mth hr{border:0;border-top:1px solid var(--line);margin:34px 0}
.mtbl{overflow-x:auto;margin:10px 0 16px}.mtbl table{border-collapse:collapse;width:100%;font-size:14.5px}
.mtbl th,.mtbl td{border:1px solid var(--line);padding:9px 11px;text-align:start;vertical-align:top}.mtbl th{background:var(--ink2);color:var(--cream)}.mtbl td{color:var(--dim)}
.mth .lead{font-size:18px;color:var(--cream)}
.mlang{display:none}.mlang.on{display:block}
.mtoc{border:1px solid var(--line);border-radius:14px;padding:14px 18px;margin:18px 0 6px;font-size:14px}
.mtoc a{display:inline-block;margin:3px 12px 3px 0;color:var(--dim);text-decoration:underline;text-underline-offset:3px}.mtoc a:hover{color:var(--cream)}
.msign{margin-top:26px;display:flex;align-items:center;gap:12px;font-size:14px;color:var(--dim)}
.msign .mmark{width:40px;height:40px;border-radius:12px;background:var(--acid);color:#0A0A0B;display:grid;place-items:center;font-style:normal;font-size:20px;flex:none}
.mpdf{display:inline-block;margin-top:14px;font-weight:600;text-decoration:underline;text-underline-offset:3px;color:var(--cream)}
</style>
</head>
<body>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="/" data-i="v_back"></a></div>
<main class="mth">
${["en", "fr", "ar"].map((l) => `<div class="mlang" id="ml_${l}" ${l === "ar" ? 'dir="rtl"' : ""}>${L[l]}</div>`).join("\n")}
<div class="msign"><i class="mmark">◈</i><span id="msign"></span></div>

</main>
${footer}
<script>
const NAV=${JSON.stringify(NAV)};const META=${JSON.stringify(META)};
const SIGN={en:"Method validated by the AIVisib team.",fr:"Méthode validée par l'équipe AIVisib.",ar:"المنهجية معتمدة من فريق AIVisib."};
let lang='fr';
function setLang(l){lang=l;document.body.classList.toggle('rtl',l==='ar');document.documentElement.lang=l;document.title=META[l].t;document.querySelector('meta[name=description]').setAttribute('content',META[l].d);
 document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[l][k]!==undefined)e.textContent=NAV[l][k]});
 ['en','fr','ar'].forEach(x=>{document.getElementById('ml_'+x).classList.toggle('on',x===l);const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===l)});
 document.getElementById('msign').textContent=SIGN[l];
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
writeFileSync("methodologie.html", html);
console.log("→ methodologie.html", html.length, "caractères");
