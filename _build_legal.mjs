// Génère privacy.html et terms.html (trilingues EN/FR/AR) avec l'en-tête, le pied de page, la langue et le thème du site :
//   node _build_legal.mjs
// Textes sources : _legal_src/{privacy,terms}_{en,fr,ar}.md. La version anglaise fait foi (mention dans FR/AR).
import { readFileSync, writeFileSync } from "node:fs";
const SP = "./_legal_src/";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/hello@aivisib\.com/g, '<a href="mailto:hello@aivisib.com">hello@aivisib.com</a>');
const UPD = /^(Last updated|Dernière mise à jour|آخر تحديث)/;
const NOTE = /^(Ce texte est une traduction|هذا النص ترجمة)/;
function md2html(md) {
  const out = []; let ul = [];
  const flush = () => { if (ul.length) { out.push("<ul>" + ul.map((x) => `<li>${inline(x)}</li>`).join("") + "</ul>"); ul = []; } };
  for (const l of md.split("\n")) {
    if (/^- /.test(l)) { ul.push(l.slice(2)); continue; }
    flush();
    if (/^# /.test(l)) out.push(`<h1>${inline(l.slice(2))}</h1>`);
    else if (/^## /.test(l)) out.push(`<h2>${inline(l.slice(3))}</h2>`);
    else if (UPD.test(l)) out.push(`<p class="lupd">${inline(l)}</p>`);
    else if (NOTE.test(l)) out.push(`<p class="lnote">${inline(l)}</p>`);
    else if (l.trim()) out.push(`<p>${inline(l)}</p>`);
  }
  flush();
  return out.join("\n");
}
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_sample","ft_guide1","ft_guide2","ft_guide3","ft_cmp3","ft_about","ft_privacy","ft_terms"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = {
  en: { n1: "How it works", n2: "Features", n3: "Pricing", n4: "Log in", n5: "Agencies", n6: "Methodology", n7: "FAQ", n_test: "Free test", v_back: "← Back to home" },
  fr: { n1: "Fonctionnement", n2: "Fonctionnalités", n3: "Tarifs", n4: "Connexion", n5: "Agences", n6: "Méthodologie", n7: "FAQ", n_test: "Test gratuit", v_back: "← Retour à l'accueil" },
  ar: { n1: "كيف يعمل", n2: "المميزات", n3: "الأسعار", n4: "تسجيل الدخول", n5: "الوكالات", n6: "المنهجية", n7: "الأسئلة الشائعة", n_test: "فحص مجاني", v_back: "← العودة إلى الرئيسية" },
};
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);

const PAGES = {
  privacy: {
    file: "privacy.html", url: "https://aivisib.com/privacy",
    META: {
      en: { t: "Privacy Policy — AIVisib", d: "AIVisib Privacy Policy: what we collect, how we use it, what we never do with your data, and your rights." },
      fr: { t: "Politique de confidentialité — AIVisib", d: "Politique de confidentialité d'AIVisib : ce que nous collectons, comment nous l'utilisons, ce que nous ne faisons jamais, et vos droits." },
      ar: { t: "سياسة الخصوصية — AIVisib", d: "سياسة الخصوصية لدى AIVisib: ما نجمعه من بيانات، وكيف نستخدمها، وما لا نفعله بها أبدًا، وحقوقك." },
    },
  },
  terms: {
    file: "terms.html", url: "https://aivisib.com/terms",
    META: {
      en: { t: "Terms of Service — AIVisib", d: "AIVisib Terms of Service: the service, what we measure and do not promise, subscriptions, acceptable use and liability." },
      fr: { t: "Conditions d'utilisation — AIVisib", d: "Conditions d'utilisation d'AIVisib : le service, ce que nous mesurons et ne promettons pas, abonnements, usage acceptable et responsabilité." },
      ar: { t: "شروط الاستخدام — AIVisib", d: "شروط استخدام AIVisib: الخدمة، وما نقيسه وما لا نعد به، والاشتراكات، والاستخدام المقبول، والمسؤولية." },
    },
  },
};

for (const [key, P] of Object.entries(PAGES)) {
  const L = Object.fromEntries(["en", "fr", "ar"].map((l) => [l, md2html(readFileSync(`${SP}${key}_${l}.md`, "utf8"))]));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${P.META.en.t}</title>
<meta name="description" content="${P.META.en.d}">
<link rel="canonical" href="${P.url}">
<link rel="alternate" hreflang="en" href="${P.url}?lang=en">
<link rel="alternate" hreflang="fr" href="${P.url}?lang=fr">
<link rel="alternate" hreflang="ar" href="${P.url}?lang=ar">
<link rel="alternate" hreflang="x-default" href="${P.url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.lgl{max-width:800px;margin:0 auto;padding:54px 26px 90px}
.lgl h1{font-size:clamp(34px,4.6vw,52px);margin-bottom:10px;letter-spacing:-.03em}
.lgl h2{font-size:21px;margin:36px 0 10px;letter-spacing:-.01em}
.lgl p,.lgl li{color:var(--dim);font-size:15.6px;line-height:1.65}
.lgl p{margin:0 0 12px}.lgl ul{margin:0 0 14px 22px}.lgl li{margin-bottom:8px}
body.rtl .lgl ul{margin:0 22px 14px 0}
.lgl b{color:var(--cream)}.lgl a{color:var(--cream);text-decoration:underline;text-underline-offset:3px}
.lgl .lupd{font:500 12.5px 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;margin-bottom:34px}
body.rtl .lgl .lupd{font-family:'Cairo',sans-serif;letter-spacing:0;font-size:14px}
.lgl .lnote{margin-top:34px;padding-top:16px;border-top:1px solid var(--line);font-size:13.5px;font-style:italic}
.llang{display:none}.llang.on{display:block}
</style>
</head>
<body>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="/" data-i="v_back"></a></div>
<main class="lgl">
${["en", "fr", "ar"].map((l) => `<div class="llang${l === "en" ? " on" : ""}" id="ll_${l}" ${l === "ar" ? 'dir="rtl"' : ""}>${L[l]}</div>`).join("\n")}
</main>
${footer}
<script>
const NAV=${JSON.stringify(NAV)};const META=${JSON.stringify(P.META)};
let lang='en';
function setLang(l){lang=l;document.body.classList.toggle('rtl',l==='ar');document.documentElement.lang=l;document.title=META[l].t;document.querySelector('meta[name=description]').setAttribute('content',META[l].d);
 document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[l][k]!==undefined)e.textContent=NAV[l][k]});
 ['en','fr','ar'].forEach(x=>{document.getElementById('ll_'+x).classList.toggle('on',x===l);const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===l)});
 try{localStorage.setItem('lang',l)}catch(e){}
 document.querySelectorAll('a[href^="https://app.aivisib.com"]').forEach(a=>{try{const u=new URL(a.href);u.searchParams.set('lang',l);a.href=u.toString()}catch(e){}});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.setAttribute('href','/'+a.getAttribute('href').replace(/^\\/+/,'')));}
function toggleMenu(){const b=document.getElementById('burgerBtn'),m=document.getElementById('mmenu');const open=!m.classList.contains('open');m.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');}
function refreshThemeBtn(){const b=document.getElementById('themeBtn');if(b)b.setAttribute('aria-label',document.body.classList.contains('dark')?'Light mode':'Dark mode');}
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem('aiv_theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}refreshThemeBtn();}
refreshThemeBtn();
setLang((()=>{const ok=l=>['en','fr','ar'].includes(l);try{const u=new URLSearchParams(location.search).get('lang');if(ok(u))return u;}catch(e){}try{const s=localStorage.getItem('lang');if(ok(s))return s;}catch(e){}try{const langs=(navigator.languages||[navigator.language||'en']).map(x=>String(x).slice(0,2).toLowerCase());const h=langs.find(ok);if(h)return h;}catch(e){}return 'en';})());
</script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "4eebac051e1a4b8784bff77028e4bd7c"}'></script>
</body>
</html>`;
  writeFileSync(P.file, html);
  console.log(`→ ${P.file}`, html.length, "caractères");
}
