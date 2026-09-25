// Génère compare.html : comparatif + FAQ, TEXTE ÉCRIT EN DUR dans le HTML (trilingue), avec le
// style / header / footer d'index.html : node _build_compare.mjs
//
// Pourquoi cette page existe : sur l'accueil, tous les textes sont injectés par JavaScript depuis
// l'objet T. Les robots des IA (GPTBot, ClaudeBot, PerplexityBot) n'exécutent pas le JavaScript :
// ils ne voyaient donc ni notre comparatif ni notre FAQ. Ici, les trois langues sont présentes dans
// le HTML livré (une seule est affichée à la fois, comme sur methodologie.html).
import { readFileSync, writeFileSync } from "node:fs";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ——— textes déjà publiés, lus dans l'objet T d'index.html (même source de vérité, déjà validée)
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_tech","ft_sample","ft_guide1","ft_guide2","ft_guide3","ft_cmp3","ft_about","ft_privacy","ft_terms"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };

const ROWS = ["r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11"];
const FAQ_N = 13;

// ——— textes propres à cette page
const P = {
  en: {
    h1: "AI visibility tools compared: AIVisib, Peec AI, Otterly.AI and Profound",
    back: "← Back to home",
    checked: "Competitor data taken from their public pricing and help pages, checked in September 2026.",
    needk: "Which tool for which need",
    faqk: "Frequently asked questions",
    needs: [
      ["The cheapest way to cover all four engines",
       "AIVisib includes ChatGPT, Gemini, Perplexity and Claude in every plan, starting at $59 a month. Peec AI's entry plan covers three engines of your choice; Otterly.AI sells Gemini and Claude as add-ons; Profound's entry plan measures ChatGPT only."],
      ["An agency with about ten clients",
       "AIVisib Agency is $399 a month for eight brands, which is $50 per client, with white-label reports and client share links included. Extra brands are $49 a month each. Peec AI and Profound work on credits; Otterly.AI's Standard plan is $189 for 100 prompts."],
      ["Measuring in Arabic",
       "AIVisib asks the questions, reads the answers and writes the reports in Modern Standard Arabic, and the interface itself is translated. The three others have English interfaces; prompts in Arabic are possible, the product around them is not."],
      ["Scores you can defend in front of a client",
       "AIVisib asks every question three times per engine and ships each score with its precision (±) and a Wilson confidence interval, with the full methodology published. The others measure once per day and do not publish a precision figure."],
      ["Daily tracking",
       "Here the others are ahead: Peec AI, Otterly.AI and Profound measure daily. AIVisib measures weekly, three passes per question, because a single daily answer moves more than the reality it is supposed to describe. If you need daily movement, they do that better."],
      ["Trying before paying",
       "AIVisib runs a live free check without an account and without a card: six real customer questions, three engines. The three others offer seven-day trials, which require signing up first."],
    ],
    lead2: "Everything below is factual and checked. Where a competitor does something better, it is written here.",
  },
  fr: {
    h1: "Comparatif des outils de visibilité IA : AIVisib, Peec AI, Otterly.AI et Profound",
    back: "← Retour à l'accueil",
    checked: "Données concurrentes issues de leurs pages publiques de tarifs et d'aide, vérifiées en septembre 2026.",
    needk: "Quel outil pour quel besoin",
    faqk: "Questions fréquentes",
    needs: [
      ["Couvrir les quatre moteurs au meilleur prix",
       "AIVisib inclut ChatGPT, Gemini, Perplexity et Claude dans toutes les offres, à partir de 59 $ par mois. L'offre d'entrée de Peec AI couvre trois moteurs au choix ; Otterly.AI vend Gemini et Claude en options payantes ; l'entrée de gamme de Profound ne mesure que ChatGPT."],
      ["Une agence avec une dizaine de clients",
       "L'offre Agency d'AIVisib coûte 399 $ par mois pour huit marques, soit 50 $ par client, rapports en marque blanche et liens de partage inclus. Chaque marque supplémentaire coûte 49 $ par mois. Peec AI et Profound fonctionnent au crédit ; l'offre Standard d'Otterly.AI est à 189 $ pour 100 questions."],
      ["Mesurer en arabe",
       "AIVisib pose les questions, lit les réponses et rédige les rapports en arabe standard, et l'interface elle-même est traduite. Les trois autres ont une interface en anglais ; on peut y écrire des questions en arabe, mais le produit autour reste anglophone."],
      ["Des scores défendables devant un client",
       "AIVisib pose chaque question trois fois par moteur et livre chaque score avec sa précision (±) et un intervalle de confiance de Wilson, méthodologie publiée en entier. Les autres mesurent une fois par jour et ne publient pas de chiffre de précision."],
      ["Un suivi quotidien",
       "Ici les autres sont devant : Peec AI, Otterly.AI et Profound mesurent chaque jour. AIVisib mesure chaque semaine, trois passages par question, parce qu'une réponse quotidienne unique bouge plus que la réalité qu'elle prétend décrire. Si vous voulez du quotidien, ils le font mieux."],
      ["Essayer avant de payer",
       "AIVisib propose un test gratuit en direct, sans compte et sans carte : six vraies questions de clients, trois moteurs. Les trois autres proposent des essais de sept jours, après inscription."],
    ],
    lead2: "Tout ce qui suit est factuel et vérifié. Là où un concurrent fait mieux, c'est écrit.",
  },
  ar: {
    h1: "مقارنة أدوات قياس الظهور في الذكاء الاصطناعي: AIVisib وPeec AI وOtterly.AI وProfound",
    back: "← العودة إلى الرئيسية",
    checked: "بيانات المنافسين مأخوذة من صفحات أسعارهم ومساعدتهم العامة، وتم التحقق منها في سبتمبر 2026.",
    needk: "أي أداة لأي حاجة",
    faqk: "الأسئلة الشائعة",
    needs: [
      ["تغطية المحركات الأربعة بأقل سعر",
       "يشمل AIVisib محركات ChatGPT وGemini وPerplexity وClaude في كل الباقات، بدءاً من 59 دولاراً شهرياً. باقة Peec AI الأساسية تغطي ثلاثة محركات يختارها المستخدم، وOtterly.AI يبيع Gemini وClaude كإضافات مدفوعة، وباقة Profound الأساسية تقيس ChatGPT فقط."],
      ["وكالة لديها نحو عشرة عملاء",
       "باقة Agency في AIVisib بـ399 دولاراً شهرياً لثماني علامات، أي 50 دولاراً لكل عميل، مع تقارير بعلامة الوكالة وروابط مشاركة للعملاء. وكل علامة إضافية بـ49 دولاراً شهرياً. أما Peec AI وProfound فيعملان بنظام الأرصدة، وباقة Otterly.AI القياسية بـ189 دولاراً لمئة سؤال."],
      ["القياس بالعربية",
       "يطرح AIVisib الأسئلة ويقرأ الإجابات ويكتب التقارير بالعربية الفصحى، وواجهته نفسها مترجمة. أما الثلاثة الآخرون فواجهاتهم بالإنجليزية؛ يمكن كتابة أسئلة بالعربية، لكن المنتج حولها ليس عربياً."],
      ["أرقام يمكن الدفاع عنها أمام العميل",
       "يطرح AIVisib كل سؤال ثلاث مرات على كل محرك، ويقدّم كل نتيجة مع هامش دقتها (±) ومجال ثقة ويلسون، والمنهجية منشورة بالكامل. الآخرون يقيسون مرة واحدة يومياً ولا ينشرون رقم دقة."],
      ["المتابعة اليومية",
       "هنا الآخرون متقدمون: Peec AI وOtterly.AI وProfound يقيسون يومياً. AIVisib يقيس أسبوعياً بثلاث جولات لكل سؤال، لأن إجابة يومية واحدة تتغير أكثر من الواقع الذي تُفترض وصفه. إن كنت تريد متابعة يومية، فهم يفعلون ذلك أفضل."],
      ["التجربة قبل الدفع",
       "يقدّم AIVisib فحصاً مجانياً مباشراً بلا حساب وبلا بطاقة: ستة أسئلة حقيقية لعملاء، وثلاثة محركات. والثلاثة الآخرون يقدمون تجربة سبعة أيام بعد التسجيل."],
    ],
    lead2: "كل ما يلي واقعي ومُتحقَّق منه. وحيث يتفوّق منافس، فذلك مكتوب هنا.",
  },
};
const META = {
  en: { t: "AI visibility tools compared — AIVisib vs Peec AI, Otterly.AI, Profound", d: "Entry price, engines included, Arabic support, confidence intervals, agency tiers: AIVisib next to Peec AI, Otterly.AI and Profound, from their public pricing, September 2026." },
  fr: { t: "Comparatif des outils de visibilité IA — AIVisib, Peec AI, Otterly.AI, Profound", d: "Prix d'entrée, moteurs inclus, arabe, intervalles de confiance, offres agences : AIVisib face à Peec AI, Otterly.AI et Profound, d'après leurs tarifs publics, septembre 2026." },
  ar: { t: "مقارنة أدوات الظهور في الذكاء الاصطناعي — AIVisib وPeec AI وOtterly.AI وProfound", d: "سعر البداية، المحركات المشمولة، العربية، مجالات الثقة، باقات الوكالات: AIVisib مقابل Peec AI وOtterly.AI وProfound، وفق أسعارهم المعلنة، سبتمبر 2026." },
};
const NAV = {
  en: { n1: "How it works", n2: "Features", n3: "Pricing", n4: "Log in", n5: "Agencies", n6: "Methodology", n7: "FAQ", n_test: "Free test", v_back: P.en.back },
  fr: { n1: "Fonctionnement", n2: "Fonctionnalités", n3: "Tarifs", n4: "Connexion", n5: "Agences", n6: "Méthodologie", n7: "FAQ", n_test: "Test gratuit", v_back: P.fr.back },
  ar: { n1: "كيف يعمل", n2: "المميزات", n3: "الأسعار", n4: "تسجيل الدخول", n5: "الوكالات", n6: "المنهجية", n7: "الأسئلة الشائعة", n_test: "فحص مجاني", v_back: P.ar.back },
};
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);

// ——— corps de page, par langue, texte en dur
function body(l) {
  const t = P[l];
  const th = [pick(l, "cmp_feat") || "Feature", "AIVisib", pick(l, "cmp_ca"), pick(l, "cmp_cb"), pick(l, "cmp_cc")];
  const rows = ROWS.map((r) => [pick(l, "cmp_" + r), pick(l, "cmp_" + r + "u"), pick(l, "cmp_" + r + "a"), pick(l, "cmp_" + r + "b"), pick(l, "cmp_" + r + "c")]);
  const table = '<div class="cmtbl"><table><thead><tr>' + th.map((h, i) => `<th${i === 1 ? ' class="us"' : ""}>${esc(h)}</th>`).join("") +
    "</tr></thead><tbody>" + rows.map((r) => "<tr>" + r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td${i === 1 ? ' class="us"' : ""}>${esc(c)}</td>`)).join("") + "</tr>").join("") + "</tbody></table></div>";
  const needs = t.needs.map(([q, a]) => `<div class="cmneed"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join("\n");
  const faq = Array.from({ length: FAQ_N }, (_, i) => `<div class="cmq"><h3>${esc(pick(l, "fq" + (i + 1)))}</h3><p>${esc(pick(l, "fa" + (i + 1)))}</p></div>`).join("\n");
  return `<h1>${esc(t.h1)}</h1>
<p class="lead">${esc(pick(l, "cmp_p"))}</p>
<p class="lead">${esc(t.lead2)}</p>
${table}
<p class="cmnote">${esc(pick(l, "cmp_note"))}</p>
<h2>${esc(t.needk)}</h2>
${needs}
<h2 id="faq">${esc(t.faqk)}</h2>
${faq}`;
}

// ——— données structurées : la FAQ de cette page, en anglais (lue par les moteurs)
const faqLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: Array.from({ length: FAQ_N }, (_, i) => ({
    "@type": "Question", name: pick("en", "fq" + (i + 1)),
    acceptedAnswer: { "@type": "Answer", text: pick("en", "fa" + (i + 1)) },
  })).concat(P.en.needs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))),
};

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${META.fr.t}</title>
<meta name="description" content="${META.fr.d}">
<link rel="canonical" href="https://aivisib.com/comparatif">
<link rel="alternate" hreflang="en" href="https://aivisib.com/compare?lang=en">
<link rel="alternate" hreflang="fr" href="https://aivisib.com/comparatif?lang=fr">
<link rel="alternate" hreflang="ar" href="https://aivisib.com/comparatif?lang=ar">
<link rel="alternate" hreflang="x-default" href="https://aivisib.com/compare">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:type" content="article"><meta property="og:site_name" content="AIVisib"><meta property="og:url" content="https://aivisib.com/comparatif"><meta property="og:title" content="${META.fr.t}"><meta property="og:description" content="${META.fr.d}"><meta property="og:image" content="https://aivisib.com/og-image.png">
<script type="application/ld+json">${JSON.stringify(faqLd)}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.cmw{max-width:900px;margin:0 auto;padding:54px 26px 90px}
.cmw h1{font-size:clamp(30px,4.2vw,50px);letter-spacing:-.03em;margin-bottom:18px}
.cmw h2{font-size:26px;margin:52px 0 16px;letter-spacing:-.02em}
.cmw h3{font-size:17.5px;margin:0 0 6px;color:var(--cream)}
.cmw p{color:var(--dim);font-size:16px;line-height:1.65;margin:0 0 12px}
.cmw .lead{font-size:17.5px;color:var(--cream)}
.cmtbl{overflow-x:auto;margin:22px 0 10px}
.cmtbl table{border-collapse:collapse;width:100%;font-size:14.5px;min-width:760px}
.cmtbl th,.cmtbl td{border:1px solid var(--line);padding:10px 12px;text-align:start;vertical-align:top;color:var(--dim)}
.cmtbl thead th{background:var(--ink2);color:var(--cream);font-weight:600}
.cmtbl tbody th{color:var(--cream);font-weight:500;background:var(--ink2)}
.cmtbl .us{background:rgba(200,255,0,.08);color:var(--cream)}
.cmtbl thead .us{background:var(--acid);color:#0A0A0B}
.cmnote{font-size:13.5px;border-inline-start:3px solid var(--line);padding-inline-start:12px}
.cmneed,.cmq{border-top:1px solid var(--line);padding:18px 0}
.cmlang{display:none}.cmlang.on{display:block}
</style>
</head>
<body>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="/" data-i="v_back"></a></div>
<main class="cmw">
${["en", "fr", "ar"].map((l) => `<div class="cmlang" id="cm_${l}"${l === "ar" ? ' dir="rtl"' : ""}>${body(l)}</div>`).join("\n")}
</main>
${footer}
<script>
const NAV=${JSON.stringify(NAV)};const META=${JSON.stringify(META)};
let lang='fr';
function setLang(l){lang=l;document.body.classList.toggle('rtl',l==='ar');document.documentElement.lang=l;document.title=META[l].t;document.querySelector('meta[name=description]').setAttribute('content',META[l].d);
 document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[l][k]!==undefined)e.textContent=NAV[l][k]});
 ['en','fr','ar'].forEach(x=>{document.getElementById('cm_'+x).classList.toggle('on',x===l);const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===l)});
 try{localStorage.setItem('lang',l)}catch(e){}
 document.querySelectorAll('a[href^="https://app.aivisib.com"]').forEach(a=>{try{const u=new URL(a.href);u.searchParams.set('lang',l);a.href=u.toString()}catch(e){}});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.setAttribute('href','/'+a.getAttribute('href').replace(/^\\/+/,'')));}
function toggleMenu(){const b=document.getElementById('burgerBtn'),m=document.getElementById('mmenu');const open=!m.classList.contains('open');m.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');}
function refreshThemeBtn(){const b=document.getElementById('themeBtn');if(b)b.setAttribute('aria-label',document.body.classList.contains('dark')?'Light mode':'Dark mode');}
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem('aiv_theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}refreshThemeBtn();}
refreshThemeBtn();
setLang((()=>{const ok=l=>['en','fr','ar'].includes(l);try{const u=new URLSearchParams(location.search).get('lang');if(ok(u))return u;}catch(e){}try{const s=localStorage.getItem('lang');if(ok(s))return s;}catch(e){}try{const langs=(navigator.languages||[navigator.language||'en']).map(x=>String(x).slice(0,2).toLowerCase());const h=langs.find(ok);if(h)return h;}catch(e){}return 'en';})());
// arrivée par /faq : on descend directement sur la FAQ de la langue affichée
if(/faq/i.test(location.pathname)){const d=document.querySelector('.cmlang.on h2#faq')||document.querySelector('.cmlang.on [id=faq]');if(d)d.scrollIntoView({behavior:'instant',block:'start'});}
</script>
</body>
</html>`;
writeFileSync("compare.html", html);
console.log("→ compare.html", html.length, "caractères");
