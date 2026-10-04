// Génère mesures.html (galerie des mesures réelles publiées, trilingue) avec le style / header / footer d'index.html : node _build_mesures.mjs
import { readFileSync, writeFileSync } from "node:fs";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const lbHtml = idx.match(/<!-- LB -->[\s\S]*?<!-- \/LB -->/)[0];
const lbJs = idx.match(/\/\* LB-JS \*\/[\s\S]*?\/\* \/LB-JS \*\//)[0];
const FOOT_KEYS = ["f_company","ft_prod","ft_res","ft_co","ft_test","ft_tech","ft_sample","ft_guide1","ft_guide2","ft_guide3","ft_wl","ft_cmp3","ft_alt","ft_about","ft_privacy","ft_terms","n1","n2","n3","n4","n5","n6","n7","n_test"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = { en: {}, fr: {}, ar: {} };
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);
Object.assign(NAV.en, { lb_all: "All measurements →", v_back: "← Back to home", ms_k: "Real measurements · published on LinkedIn", ms_t: "What the AIs really answer", ms_p: "Every visual below is a real measurement: the question was asked live to ChatGPT and Gemini, three times, and the answers were counted. Nothing is simulated. Published on our LinkedIn page, one measurement at a time.", ms_all: "Follow the next measurements on LinkedIn →", ms_open: "Open the image" });
Object.assign(NAV.fr, { lb_all: "Toutes les mesures →", v_back: "← Retour à l'accueil", ms_k: "Mesures réelles · publiées sur LinkedIn", ms_t: "Ce que les IA répondent vraiment", ms_p: "Chaque visuel ci-dessous est une mesure réelle : la question a été posée en direct à ChatGPT et Gemini, trois fois, et les réponses ont été comptées. Rien n'est simulé. Publié sur notre page LinkedIn, une mesure à la fois.", ms_all: "Suivre les prochaines mesures sur LinkedIn →", ms_open: "Ouvrir l'image" });
Object.assign(NAV.ar, { lb_all: "كل القياسات ←", v_back: "← العودة إلى الرئيسية", ms_k: "قياسات حقيقية · منشورة على LinkedIn", ms_t: "أمثلة عن إجابات فعلية للذكاء الاصطناعي", ms_p: "كل صورة أدناه قياس حقيقي: طُرح السؤال مباشرة على ChatGPT، Gemini ثلاث مرات، وعُدّت الإجابات. لا شيء مُحاكى. تُنشر على صفحتنا في LinkedIn، قياساً بعد قياس.", ms_all: "تابع القياسات القادمة على LinkedIn ←", ms_open: "افتح الصورة" });
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

// Résumé factuel de chaque mesure (texte lisible par les robots des IA, qui ne lisent pas les images)
const DESC = {
  li_post2_airline: ["Question asked on 07/09/2026: “Which airline is the best choice from Paris to Dubai?” ChatGPT named Emirates first and nothing else. Gemini named Emirates first, then Air France and Qatar Airways. From Paris, the French carrier is never first.", "Question posée le 07/09/2026 : « Quelle compagnie aérienne choisir de Paris à Dubaï ? » ChatGPT cite Emirates en premier, et rien d'autre. Gemini cite Emirates en premier, puis Air France et Qatar Airways. Au départ de Paris, la compagnie française n'est jamais première.", "سؤال طُرح في 07/09/2026: «ما أفضل شركة طيران من باريس إلى دبي؟» ذكر ChatGPT طيران الإمارات أولاً دون غيرها. وذكر Gemini طيران الإمارات أولاً ثم الخطوط الجوية الفرنسية والخطوط القطرية. انطلاقاً من باريس، لا تأتي الشركة الفرنسية أولاً أبداً."],
  li2_post5_hotel_marrakech: ["Question asked on 11/09/2026: “Which hotel in Marrakech for a couple's weekend?” ChatGPT named Royal Mansour first, then El Fenn and Amanjena. Gemini named Royal Mansour first, then La Mamounia and Mandarin Oriental. The legendary La Mamounia is named first by neither AI.", "Question posée le 11/09/2026 : « Quel hôtel choisir à Marrakech pour un week-end en couple ? » ChatGPT cite Royal Mansour en premier, puis El Fenn et Amanjena. Gemini cite Royal Mansour en premier, puis La Mamounia et Mandarin Oriental. La légendaire Mamounia n'est citée en premier par aucune IA.", "سؤال طُرح في 11/09/2026: «أي فندق في مراكش لعطلة نهاية أسبوع للأزواج؟» ذكر ChatGPT رويال منصور أولاً ثم الفن وأمانجينا. وذكر Gemini رويال منصور أولاً ثم المامونية وماندارين أورينتال. فندق المامونية الشهير لم يُذكر أولاً في أي من المحركين."],
  li2_post6_hospital_riyadh: ["Question asked in Arabic on 11/09/2026: “What is the best private hospital in Riyadh for families?” Both AIs named Dr. Sulaiman Al Habib first. ChatGPT then named Dallah Al Nakheel and Saudi German Hospital; Gemini named Saudi German Hospital and Dallah. Same first name, different order after it.", "Question posée en arabe le 11/09/2026 : « Quel est le meilleur hôpital privé à Riyad pour les familles ? » Les deux IA citent Dr. Sulaiman Al Habib en premier. ChatGPT cite ensuite Dallah Al Nakheel et l'Hôpital saoudien-allemand ; Gemini cite l'Hôpital saoudien-allemand et Dallah. Même premier nom, ordre différent ensuite.", "سؤال طُرح بالعربية في 11/09/2026: «ما أفضل مستشفى خاص في الرياض للعائلات؟» ذكر المحركان مستشفى د. سليمان الحبيب أولاً. ثم ذكر ChatGPT دله النخيل والسعودي الألماني، وذكر Gemini السعودي الألماني ودله. الاسم الأول نفسه، والترتيب بعده مختلف."],
  li_post1_bank_dubai: ["Question asked on 07/09/2026: “I'm moving to Dubai. Which bank should I open my account with?” ChatGPT named Emirates NBD first, then ADCB and HSBC UAE. Gemini named Emirates NBD only. Both AIs name the same bank first.", "Question posée le 07/09/2026 : « Je m'installe à Dubaï, dans quelle banque ouvrir mon compte ? » ChatGPT cite Emirates NBD en premier, puis ADCB et HSBC UAE. Gemini ne cite qu'Emirates NBD. Les deux IA citent la même banque en premier.", "سؤال طُرح في 07/09/2026: «سأنتقل إلى دبي، في أي بنك أفتح حسابي؟» ذكر ChatGPT بنك الإمارات دبي الوطني أولاً ثم بنك أبوظبي التجاري وHSBC الإمارات. ولم يذكر Gemini سوى بنك الإمارات دبي الوطني. المحركان يذكران البنك نفسه أولاً."],
  li_post5_banque_fr: ["Question asked in French on 07/09/2026: “Which online bank should I choose in France in 2026?” ChatGPT and Gemini both named BoursoBank first, then Fortuneo and Monabanq. Seven banks were named across the answers; only one is ever first.", "Question posée le 07/09/2026 : « Quelle banque en ligne choisir en France en 2026 ? » ChatGPT et Gemini citent tous deux BoursoBank en premier, puis Fortuneo et Monabanq. Sept banques citées au total dans les réponses, une seule en premier.", "سؤال طُرح بالفرنسية في 07/09/2026: «أي بنك إلكتروني أختار في فرنسا سنة 2026؟» ذكر ChatGPT، Gemini كلاهما BoursoBank أولاً ثم Fortuneo وMonabanq. ذُكرت سبعة بنوك في مجمل الإجابات، وواحد فقط يأتي أولاً."],
  li2_post4_assurance_fr: ["Question asked in French on 11/09/2026: “Which car insurance should I choose in France in 2026?” Both AIs named Direct Assurance first. ChatGPT then named L'Olivier Assurance; Gemini named L'olivier Assurance and Eurofil. The same first name, and it is not the largest insurer.", "Question posée le 11/09/2026 : « Quelle assurance auto choisir en France en 2026 ? » Les deux IA citent Direct Assurance en premier. ChatGPT cite ensuite L'Olivier Assurance ; Gemini cite L'olivier Assurance et Eurofil. Le même premier nom, et ce n'est pas le plus gros assureur.", "سؤال طُرح بالفرنسية في 11/09/2026: «أي تأمين سيارات أختار في فرنسا سنة 2026؟» ذكر المحركان Direct Assurance أولاً. ثم ذكر ChatGPT شركة L'Olivier، وذكر Gemini شركة L'olivier وEurofil. الاسم الأول نفسه، وهو ليس أكبر شركة تأمين."],
  li2_post1_realestate_dubai: ["Question asked on 11/09/2026: “I want to buy an apartment in Dubai. Which real estate agency should I use?” ChatGPT named Betterhomes first, then Allsopp & Allsopp and haus & haus. Gemini named H&S Real Estate first, then Betterhomes and Allsopp & Allsopp. Same question, two different first picks.", "Question posée le 11/09/2026 : « Je veux acheter un appartement à Dubaï, quelle agence immobilière choisir ? » ChatGPT cite Betterhomes en premier, puis Allsopp & Allsopp et haus & haus. Gemini cite H&S Real Estate en premier, puis Betterhomes et Allsopp & Allsopp. Même question, deux premiers choix différents.", "سؤال طُرح في 11/09/2026: «أريد شراء شقة في دبي، أي وكالة عقارية أختار؟» ذكر ChatGPT شركة Betterhomes أولاً ثم Allsopp & Allsopp وhaus & haus. وذكر Gemini شركة H&S Real Estate أولاً ثم Betterhomes وAllsopp & Allsopp. السؤال نفسه، وخياران أولان مختلفان."],
  li2_post2_school_dubai: ["Question asked on 11/09/2026: “Which are the best British curriculum schools in Dubai?” ChatGPT named JESS first, then DESS and Dubai College. Gemini named Dubai College first, then Kings' Al Barsha and JESS. Fourteen schools were named in total, with two different number ones.", "Question posée le 11/09/2026 : « Quelles sont les meilleures écoles à programme britannique à Dubaï ? » ChatGPT cite JESS en premier, puis DESS et Dubai College. Gemini cite Dubai College en premier, puis Kings' Al Barsha et JESS. Quatorze écoles citées au total, deux numéros un différents.", "سؤال طُرح في 11/09/2026: «ما أفضل المدارس ذات المنهج البريطاني في دبي؟» ذكر ChatGPT مدرسة JESS أولاً ثم DESS وكلية دبي. وذكر Gemini كلية دبي أولاً ثم Kings' Al Barsha وJESS. ذُكرت أربع عشرة مدرسة في المجموع، مع اسمين أولين مختلفين."],
  li2_post7_ecole_casa: ["Question asked in French on 11/09/2026: “Which business school should I choose in Casablanca after the baccalaureate?” ChatGPT named ENCG Casablanca only. Gemini named ENCG Casablanca first, then ISCAE and HEM. The public school comes ahead of every private one.", "Question posée le 11/09/2026 : « Quelle école de commerce choisir à Casablanca après le bac ? » ChatGPT ne cite que l'ENCG Casablanca. Gemini cite l'ENCG Casablanca en premier, puis l'ISCAE et HEM. L'école publique devant toutes les privées.", "سؤال طُرح بالفرنسية في 11/09/2026: «أي مدرسة تجارة أختار في الدار البيضاء بعد البكالوريا؟» لم يذكر ChatGPT سوى المدرسة الوطنية للتجارة والتسيير بالدار البيضاء. وذكرها Gemini أولاً ثم ISCAE وHEM. المدرسة العمومية تتقدم على كل المدارس الخاصة."],
  li_post3_telecom_ksa: ["Question asked in Arabic on 07/09/2026: “What is the best mobile operator in Saudi Arabia?” ChatGPT and Gemini both named stc first, then Mobily and Zain. The same first answer on both engines.", "Question posée en arabe le 07/09/2026 : « Quel est le meilleur opérateur mobile en Arabie saoudite ? » ChatGPT et Gemini citent tous deux stc en premier, puis Mobily et Zain. La même première réponse sur les deux moteurs.", "سؤال طُرح بالعربية في 07/09/2026: «ما أفضل شركة اتصالات للهواتف المحمولة في السعودية؟» ذكر ChatGPT، Gemini كلاهما stc أولاً ثم موبايلي وزين. الجواب الأول نفسه في المحركين."],
  li_post6_telecom_ma: ["Question asked in Arabic on 07/09/2026: “What is the best telecom operator in Morocco for quality and price?” ChatGPT named Maroc Telecom first, then Orange. Gemini named Maroc Telecom first, then Orange and Inwi. Both engines cite reports, not advertising.", "Question posée en arabe le 07/09/2026 : « Quel est le meilleur opérateur télécom au Maroc en qualité et en prix ? » ChatGPT cite Maroc Telecom en premier, puis Orange. Gemini cite Maroc Telecom en premier, puis Orange et Inwi. Les deux moteurs s'appuient sur des rapports, pas sur la publicité.", "سؤال طُرح بالعربية في 07/09/2026: «ما أفضل شركة اتصالات في المغرب من حيث الجودة والسعر؟» ذكر ChatGPT اتصالات المغرب أولاً ثم Orange. وذكر Gemini اتصالات المغرب أولاً ثم Orange وInwi. المحركان يستندان إلى التقارير لا إلى الإعلانات."],
  li2_post3_ecommerce_ksa: ["Question asked in Arabic on 11/09/2026: “What is the best online shopping site in Saudi Arabia?” ChatGPT named Amazon Saudi Arabia first, then Noon. Gemini named Amazon Saudi Arabia first, then Noon and Jarir Bookstore. Both engines agree on the same order.", "Question posée en arabe le 11/09/2026 : « Quel est le meilleur site d'achat en ligne en Arabie saoudite ? » ChatGPT cite Amazon Arabie saoudite en premier, puis Noon. Gemini cite Amazon Arabie saoudite en premier, puis Noon et la librairie Jarir. Les deux moteurs s'accordent sur le même ordre.", "سؤال طُرح بالعربية في 11/09/2026: «ما أفضل موقع للتسوق عبر الإنترنت في السعودية؟» ذكر ChatGPT أمازون السعودية أولاً ثم نون. وذكر Gemini أمازون السعودية أولاً ثم نون ومكتبة جرير. المحركان اتفقا على الترتيب نفسه."],
  li_post4_delivery_dubai: ["Question asked on 07/09/2026: “What is the best food delivery app in Dubai?” ChatGPT named Talabat first, then Deliveroo and Careem Food. Gemini named Talabat only. Two AIs, two sets of sources, one winner.", "Question posée le 07/09/2026 : « Quelle est la meilleure application de livraison de repas à Dubaï ? » ChatGPT cite Talabat en premier, puis Deliveroo et Careem Food. Gemini ne cite que Talabat. Deux IA, deux jeux de sources, un seul gagnant.", "سؤال طُرح في 07/09/2026: «ما أفضل تطبيق لتوصيل الطعام في دبي؟» ذكر ChatGPT طلبات أولاً ثم Deliveroo وCareem Food. ولم يذكر Gemini سوى طلبات. محركان ومصادر مختلفة وفائز واحد."],
  li_post7_supermarche_ma: ["Question asked in French on 07/09/2026: “Which supermarket is the cheapest in Morocco for the monthly shopping?” ChatGPT named Atacadão first, then Marjane and BIM / Kazyon. Gemini named BIM first, then Marjane and Carrefour Market. Same question, two different answers.", "Question posée le 07/09/2026 : « Quel supermarché est le moins cher au Maroc pour les courses du mois ? » ChatGPT cite Atacadão en premier, puis Marjane et BIM / Kazyon. Gemini cite BIM en premier, puis Marjane et Carrefour Market. Même question, deux réponses différentes.", "سؤال طُرح بالفرنسية في 07/09/2026: «ما أرخص متجر كبير في المغرب لمشتريات الشهر؟» ذكر ChatGPT أتاكاداو أولاً ثم مرجان وBIM / كازيون. وذكر Gemini متجر BIM أولاً ثم مرجان وكارفور ماركت. السؤال نفسه، وجوابان مختلفان."],
};
for (const id in DESC) { NAV.en["md_" + id] = DESC[id][0]; NAV.fr["md_" + id] = DESC[id][1]; NAV.ar["md_" + id] = DESC[id][2]; }
const META = {
  en: { t: "Real AI visibility measurements — AIVisib", d: "Real questions asked live to ChatGPT and Gemini, answers counted, nothing simulated. Airlines, banks, hotels, hospitals, schools, in English, French and Arabic." },
  fr: { t: "Mesures réelles de visibilité IA — AIVisib", d: "De vraies questions posées en direct à ChatGPT et Gemini, réponses comptées, rien de simulé. Compagnies aériennes, banques, hôtels, hôpitaux, écoles, en anglais, français et arabe." },
  ar: { t: "قياسات حقيقية للظهور في الذكاء الاصطناعي — AIVisib", d: "أسئلة حقيقية طُرحت مباشرة على ChatGPT، Gemini، وعُدّت الإجابات، لا شيء مُحاكى. طيران، بنوك، فنادق، مستشفيات، مدارس، بالإنجليزية والفرنسية والعربية." },
};
const cards = ITEMS.map(([id]) => `<figure class="msf" id="${id}"><a href="/brand/linkedin/${id}.png" data-lb="/brand/linkedin/${id}.png" data-lbcap="mi_${id}" title="" data-i-title="ms_open"><img src="/brand/linkedin/${id}.png" alt="${(NAV.en["mi_" + id] || "").replace(/"/g, "&quot;")}" loading="lazy"></a><figcaption data-i="mi_${id}"></figcaption><p class="msd" data-i="md_${id}"></p></figure>`).join("\n");
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
.msf .msd{margin:0;padding:10px 16px 14px;font-size:13.5px;line-height:1.55;color:var(--dim)}
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
 document.querySelectorAll('a[href^="https://app.aivisib.com"]').forEach(a=>{try{const u=new URL(a.href);u.searchParams.set('lang',l);a.href=u.toString()}catch(e){}});
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
