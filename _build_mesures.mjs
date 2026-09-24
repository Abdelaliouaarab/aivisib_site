// Génère mesures.html (galerie des mesures réelles publiées, trilingue) avec le style / header / footer d'index.html : node _build_mesures.mjs
import { readFileSync, writeFileSync } from "node:fs";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const lbHtml = idx.match(/<!-- LB -->[\s\S]*?<!-- \/LB -->/)[0];
const lbJs = idx.match(/\/\* LB-JS \*\/[\s\S]*?\/\* \/LB-JS \*\//)[0];
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_tech","ft_sample","ft_cmp3","ft_about","ft_privacy","ft_terms","n1","n2","n3","n4","n5","n6","n7","n_test"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = { en: {}, fr: {}, ar: {} };
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);
Object.assign(NAV.en, { lb_all: "All measurements →", v_back: "← Back to home", ms_k: "Real measurements · published on LinkedIn", ms_t: "What the AIs really answer", ms_p: "Every visual below is a real measurement: the question was asked live to ChatGPT and Gemini, three times, and the answers were counted. Nothing is simulated. Published on our LinkedIn page, one measurement at a time.", ms_all: "Follow the next measurements on LinkedIn →", ms_open: "Open the image" });
Object.assign(NAV.fr, { lb_all: "Toutes les mesures →", v_back: "← Retour à l'accueil", ms_k: "Mesures réelles · publiées sur LinkedIn", ms_t: "Ce que les IA répondent vraiment", ms_p: "Chaque visuel ci-dessous est une mesure réelle : la question a été posée en direct à ChatGPT et Gemini, trois fois, et les réponses ont été comptées. Rien n'est simulé. Publié sur notre page LinkedIn, une mesure à la fois.", ms_all: "Suivre les prochaines mesures sur LinkedIn →", ms_open: "Ouvrir l'image" });
Object.assign(NAV.ar, { lb_all: "كل القياسات ←", v_back: "← العودة إلى الرئيسية", ms_k: "قياسات حقيقية · منشورة على LinkedIn", ms_t: "ما يجيب به الذكاء الاصطناعي فعلاً", ms_p: "كل صورة أدناه قياس حقيقي: طُرح السؤال مباشرة على ChatGPT وGemini ثلاث مرات، وعُدّت الإجابات. لا شيء مُحاكى. تُنشر على صفحتنا في LinkedIn، قياساً بعد قياس.", ms_all: "تابع القياسات القادمة على LinkedIn ←", ms_open: "افتح الصورة" });
const ITEMS = [
  ["li_post2_airline", "Airlines · Paris–Dubai", "Compagnies aériennes · Paris–Dubaï", "شركات الطيران · باريس–دبي"],
  ["li2_post5_hotel_marrakech", "Hotels · Marrakech", "Hôtels · Marrakech", "الفنادق · مراكش"],
  ["li2_post6_hospital_riyadh", "Hospitals · Riyadh", "Hôpitaux · Riyad", "المستشفيات · الرياض"],
  ["li_post1_bank_dubai", "Banks · Dubai", "Banques · Dubaï", "البنوك · دبي"],
  ["li_post5_banque_fr", "Online banks · France", "Banques en ligne · France", "البنوك الإلكترونية · فرنسا"],
  ["li2_post4_assurance_fr", "Insurance · France", "Assurances · France", "التأمين · فرنسا"],
  ["li2_post1_realestate_dubai", "Real estate · Dubai", "Immobilier · Dubaï", "العقارات · دبي"],
  ["li2_post2_school_dubai", "Schools · Dubai", "Écoles · Dubaï", "المدارس · دبي"],
  ["li2_post7_ecole_casa", "Schools · Casablanca", "Écoles · Casablanca", "المدارس · الدار البيضاء"],
  ["li_post3_telecom_ksa", "Telecom · Saudi Arabia", "Télécoms · Arabie saoudite", "الاتصالات · السعودية"],
  ["li_post6_telecom_ma", "Telecom · Morocco", "Télécoms · Maroc", "الاتصالات · المغرب"],
  ["li2_post3_ecommerce_ksa", "E-commerce · Saudi Arabia", "E-commerce · Arabie saoudite", "التجارة الإلكترونية · السعودية"],
  ["li_post4_delivery_dubai", "Food delivery · Dubai", "Livraison de repas · Dubaï", "توصيل الطعام · دبي"],
  ["li_post7_supermarche_ma", "Supermarkets · Morocco", "Supermarchés · Maroc", "المتاجر الكبرى · المغرب"],
];
ITEMS.forEach(([id, en, fr, ar]) => { NAV.en["mi_" + id] = en; NAV.fr["mi_" + id] = fr; NAV.ar["mi_" + id] = ar; });
const META = {
  en: { t: "Real AI visibility measurements — AIVisib", d: "Real questions asked live to ChatGPT and Gemini, answers counted, nothing simulated. Airlines, banks, hotels, hospitals, schools, in English, French and Arabic." },
  fr: { t: "Mesures réelles de visibilité IA — AIVisib", d: "De vraies questions posées en direct à ChatGPT et Gemini, réponses comptées, rien de simulé. Compagnies aériennes, banques, hôtels, hôpitaux, écoles, en anglais, français et arabe." },
  ar: { t: "قياسات حقيقية للظهور في الذكاء الاصطناعي — AIVisib", d: "أسئلة حقيقية طُرحت مباشرة على ChatGPT وGemini، وعُدّت الإجابات، لا شيء مُحاكى. طيران، بنوك، فنادق، مستشفيات، مدارس، بالإنجليزية والفرنسية والعربية." },
};
const cards = ITEMS.map(([id]) => `<figure class="msf" id="${id}"><a href="/brand/linkedin/${id}.png" data-lb="/brand/linkedin/${id}.png" data-lbcap="mi_${id}" title="" data-i-title="ms_open"><img src="/brand/linkedin/${id}.png" alt="${(NAV.en["mi_" + id] || "").replace(/"/g, "&quot;")}" loading="lazy"></a><figcaption data-i="mi_${id}"></figcaption></figure>`).join("\n");
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${META.fr.t}</title>
<meta name="description" content="${META.fr.d}">
<link rel="canonical" href="https://aivisib.com/mesures">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:type" content="article"><meta property="og:site_name" content="AIVisib"><meta property="og:url" content="https://aivisib.com/mesures"><meta property="og:title" content="${META.fr.t}"><meta property="og:description" content="${META.fr.d}"><meta property="og:image" content="https://aivisib.com/brand/linkedin/li_post2_airline.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.msw{max-width:980px;margin:0 auto;padding:44px 22px 80px}
.msw .head{margin-bottom:30px}
.msg{display:grid;grid-template-columns:1fr 1fr;gap:22px}
@media(max-width:760px){.msg{grid-template-columns:1fr}}
.msf{margin:0;background:var(--panel);border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:var(--shadow-1)}
.msf img{width:100%;height:auto;display:block}
.msf a{display:block;transition:.2s}.msf a:hover{opacity:.92}
.msf figcaption{padding:12px 16px;font:600 13px 'JetBrains Mono',monospace;letter-spacing:.04em;color:var(--cream);border-top:1px solid var(--line)}
body.rtl .msf figcaption{font-family:'Cairo',sans-serif;letter-spacing:0}
.msall{display:inline-block;margin-top:28px;font-weight:600;text-decoration:underline;text-underline-offset:4px;color:var(--cream)}
</style>
</head>
<body>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="/" data-i="v_back"></a></div>
<main class="msw">
  <div class="head"><div class="kicker"><s><i></i><i></i><i></i></s><span data-i="ms_k"></span></div><h1 data-i="ms_t"></h1><p data-i="ms_p"></p></div>
  <div class="msg">
${cards}
  </div>
  <a class="msall" href="https://www.linkedin.com/company/146271305" target="_blank" rel="noopener" data-i="ms_all"></a>
</main>
${footer}
${lbHtml}
<script>
${lbJs}
const NAV=${JSON.stringify(NAV)};const META=${JSON.stringify(META)};
let lang='fr';
function setLang(l){lang=l;document.body.classList.toggle('rtl',l==='ar');document.documentElement.lang=l;document.title=META[l].t;document.querySelector('meta[name=description]').setAttribute('content',META[l].d);
 document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[l][k]!==undefined)e.textContent=NAV[l][k]});
 document.querySelectorAll('[data-i-title]').forEach(e=>{e.title=NAV[l][e.getAttribute('data-i-title')]||''});
 document.querySelectorAll('.msf img').forEach(im=>{im.alt=NAV[l]['mi_'+im.closest('figure').id]||''});
 ['en','fr','ar'].forEach(x=>{const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===l)});
 try{localStorage.setItem('lang',l)}catch(e){}
 document.querySelectorAll('a[href^="https://app.aivisib.com"]').forEach(a=>{if(!a.hasAttribute('data-keep'))a.href='https://app.aivisib.com/?lang='+l});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.setAttribute('href','/'+a.getAttribute('href').replace(/^\\/+/,'')));}
function toggleMenu(){const b=document.getElementById('burgerBtn'),m=document.getElementById('mmenu');const open=!m.classList.contains('open');m.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');}
function refreshThemeBtn(){const b=document.getElementById('themeBtn');if(b)b.setAttribute('aria-label',document.body.classList.contains('dark')?'Light mode':'Dark mode');}
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem('aiv_theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}refreshThemeBtn();}
refreshThemeBtn();
window.addEventListener('load',()=>{const h=location.hash.slice(1);if(h){const a=document.querySelector('#'+CSS.escape(h)+' a[data-lb]');if(a){lbItems();lbShow(LBI.findIndex(x=>x.src===a.getAttribute('data-lb')));}}});
setLang((()=>{const ok=l=>['en','fr','ar'].includes(l);try{const u=new URLSearchParams(location.search).get('lang');if(ok(u))return u;}catch(e){}try{const s=localStorage.getItem('lang');if(ok(s))return s;}catch(e){}try{const langs=(navigator.languages||[navigator.language||'en']).map(x=>String(x).slice(0,2).toLowerCase());const h=langs.find(ok);if(h)return h;}catch(e){}return 'en';})());
</script>
</body>
</html>`;
// pré-rendu : texte anglais en dur dans les balises vides, réécrit par setLang au chargement
const baked = html.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i="([^"]+)"[^>]*>)<\/\2>/gi,
  (m, open, tag, key) => (NAV.en[key] !== undefined ? open + String(NAV.en[key]).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + tag + ">" : m));
writeFileSync("mesures.html", baked);
const lisible = baked.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
console.log("→ mesures.html", baked.length, "caractères,", ITEMS.length, "visuels,", lisible, "caractères lisibles par un robot");
