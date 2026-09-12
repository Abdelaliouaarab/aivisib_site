// v4 « visuel d'abord » : hero centré + capture produit, chiffres, 4 tuiles avec vrais crops, 4 étapes courtes, galerie de mesures, audit compact : node _restructure_v4.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8").replace(/\r\n/g, "\n");
if (h.includes('class="hero v4"')) { console.log("déjà v4"); process.exit(0); }
const cut = (from, to, repl) => { const a = h.indexOf(from), b = h.indexOf(to, a + 1); if (a < 0 || b < 0) throw new Error("marqueur manquant : " + (a < 0 ? from : to)); h = h.slice(0, a) + repl + h.slice(b); };

// champs du formulaire d'audit (réutilisés tels quels)
const inputs = [...h.matchAll(/<input id="au_[a-z]+"[^>]*>/g)].map((m) => m[0]);
if (inputs.length !== 4) throw new Error("inputs audit : " + inputs.length);
const founder = h.match(/<div class="au-founder">[\s\S]*?<\/div>\n\s*<div class="au-founder team">[\s\S]*?<\/div>/)[0];

const body = `<!-- HERO -->
<section class="hero v4" id="hero"><div class="wrap">
  <div class="hcenter">
    <div class="kicker"><s></s><span data-i="kick"></span></div>
    <h1 data-i="h1v3"></h1>
    <p class="sub" data-i="subv4"></p>
    <div class="btns"><a href="#audit" class="cta big" data-i="cta1"></a><a href="#product" class="cta out" data-i="cta2"></a></div>
    <div class="tstrip"><span data-i="ts1"></span><span data-i="ts2"></span><span data-i="ts3"></span><span data-i="ts4"></span></div>
  </div>
  <div class="shot hero-shot rv" id="product"><img src="/brand/screens/report_boursobank.png" alt="AIVisib — rapport réel BoursoBank" width="1440" height="2000" fetchpriority="high"></div>
  <p class="shotcap" data-i="rd_p"></p>
</div></section>

<!-- CHIFFRES -->
<section class="nums"><div class="wrap"><div class="numgrid">
  <div><b>4</b><span data-i="ns1"></span></div>
  <div><b>×3</b><span data-i="ns2"></span></div>
  <div><b>192</b><span data-i="ns3"></span></div>
  <div><b>EN · FR · AR</b><span data-i="ns4"></span></div>
</div></div></section>

<!-- CE QUE VOUS RECEVEZ -->
<section class="s" id="feat"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="f_k"></span></div><h2 data-i="wg_t"></h2></div>
  <div class="wg">
    <div class="wgc rv"><img src="/brand/screens/crop_kpis.jpg" alt="" loading="lazy"><h3 data-i="wg1t"></h3><p data-i="wg1p"></p></div>
    <div class="wgc rv"><img src="/brand/screens/crop_share.jpg" alt="" loading="lazy"><h3 data-i="wg2t"></h3><p data-i="wg2p"></p></div>
    <div class="wgc rv"><img src="/brand/screens/crop_sources.jpg" alt="" loading="lazy"><h3 data-i="wg3t"></h3><p data-i="wg3p"></p></div>
    <div class="wgc rv"><img src="/brand/screens/crop_plan.jpg" alt="" loading="lazy"><h3 data-i="wg4t"></h3><p data-i="wg4p"></p></div>
  </div>
</div></section>

<!-- HOW -->
<section class="s" id="how" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="h_k"></span></div><h2 data-i="h_t"></h2></div>
  <div class="steps4">
    <div class="st rv"><span class="hwn">01</span><h3 data-i="s1t"></h3><span class="hwchip" data-i="s1c"></span></div>
    <div class="st rv"><span class="hwn">02</span><h3 data-i="s2t"></h3><span class="hwchip" data-i="s2c"></span></div>
    <div class="st rv"><span class="hwn">03</span><h3 data-i="s3t"></h3><span class="hwchip" data-i="s3c"></span></div>
    <div class="st rv"><span class="hwn">04</span><h3 data-i="s4t"></h3><span class="hwchip" data-i="s4c"></span></div>
  </div>
  <div class="hwtrust rv"><span data-i="ht1"></span><span data-i="ht2"></span><span data-i="ht3"></span><span data-i="ht4"></span><span data-i="ht5"></span></div>
</div></section>

<!-- GALERIE DE MESURES RÉELLES -->
<section class="s" id="mesures" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span>ChatGPT · Gemini · 09/2026</span></div><h2 data-i="m_t"></h2><p data-i="m_p2"></p></div>
  <div class="gal rv">
    <a href="/brand/linkedin/li_post1_bank_dubai.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li_post1_bank_dubai.jpg" alt="Dubai bank — ChatGPT vs Gemini" loading="lazy"></a>
    <a href="/brand/linkedin/li_post2_airline.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li_post2_airline.jpg" alt="Paris–Dubai airline" loading="lazy"></a>
    <a href="/brand/linkedin/li_post5_banque_fr.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li_post5_banque_fr.jpg" alt="Banque en ligne France" loading="lazy"></a>
    <a href="/brand/linkedin/li2_post5_hotel_marrakech.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li2_post5_hotel_marrakech.jpg" alt="Hôtels Marrakech" loading="lazy"></a>
    <a href="/brand/linkedin/li2_post7_ecole_casa.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li2_post7_ecole_casa.jpg" alt="Écoles de commerce Casablanca" loading="lazy"></a>
    <a href="/brand/linkedin/li2_post6_hospital_riyadh.png" target="_blank" rel="noopener"><img src="/brand/screens/g_li2_post6_hospital_riyadh.jpg" alt="مستشفيات الرياض" loading="lazy"></a>
  </div>
  <a class="faqall" href="https://www.linkedin.com/company/146271305" target="_blank" rel="noopener" data-i="m_all"></a>
</div></section>

<!-- AUDIT GRATUIT -->
<section class="s" id="auditsec" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="au_k"></span></div><h2 data-i="au_t"></h2><p data-i="au_p2"></p></div>
  <div class="auditbox wide" id="audit">
    <div class="af-row4">${inputs.join("")}</div>
    <div class="augdpr" id="auGdpr"></div>
    <button class="cta big" id="auBtn" onclick="runAudit()" data-i="au_btn"></button>
    <div class="af-note" data-i="au_note"></div>
    ${founder}
    <div class="auditresult" id="auditResult" style="display:none"></div>
  </div>
</div></section>

`;
cut("<!-- HERO -->", '<section class="s" id="compare">', body);
// objections → supprimées (la FAQ suffit)
cut("<!-- OBJECTIONS -->", "<!-- FAQ -->", "");

// clés courtes (3 langues)
const K = {
  en: { subv4: "Measured every week on ChatGPT, Gemini, Perplexity and Claude, in English, French and Arabic. With the margin of error, always shown.", ns1: "AI engines, all included", ns2: "passes per question, every week", ns3: "AI answers analysed per week", ns4: "three native languages", wg_t: "What you get, every week.", wg1t: "Your score, with its margin of error", wg1p: "Visibility, position, sentiment: every figure with its ±, compared to last week.", wg2t: "Who the AI recommends instead of you", wg2p: "Your share of recommendations against the competitors you track.", wg3t: "The sources the AIs read", wg3p: "The sites the engines cite, counted. You know where to appear to be cited.", wg4t: "An action plan, not a pile of data", wg4p: "Prioritised actions in plain language, ready for your team.", m_p2: "Six of the measurements we publish every week on LinkedIn. Click to enlarge.", au_p2: "Three real customer questions, asked live to ChatGPT and Gemini. Result in about 20 seconds." },
  fr: { subv4: "Mesuré chaque semaine sur ChatGPT, Gemini, Perplexity et Claude, en anglais, en français et en arabe. Avec la marge d'erreur, toujours affichée.", ns1: "moteurs IA, tous inclus", ns2: "passages par question, chaque semaine", ns3: "réponses d'IA analysées par semaine", ns4: "trois langues, natives", wg_t: "Ce que vous recevez, chaque semaine.", wg1t: "Votre score, avec sa marge d'erreur", wg1p: "Visibilité, position, sentiment : chaque chiffre avec son ±, comparé à la semaine précédente.", wg2t: "Qui l'IA recommande à votre place", wg2p: "Votre part des recommandations face aux concurrents que vous suivez.", wg3t: "Les sources que les IA lisent", wg3p: "Les sites cités par les moteurs, comptés. Vous savez où apparaître pour être cité.", wg4t: "Un plan d'action, pas un tas de données", wg4p: "Des actions priorisées, en langage clair, prêtes pour votre équipe.", m_p2: "Six des mesures que nous publions chaque semaine sur LinkedIn. Cliquez pour agrandir.", au_p2: "Trois vraies questions de clients, posées en direct à ChatGPT et Gemini. Résultat en 20 secondes environ." },
  ar: { subv4: "يُقاس كل أسبوع على ChatGPT، Gemini، Perplexity، Claude، بالإنجليزية والفرنسية والعربية. مع هامش الخطأ، معروضاً دائماً.", ns1: "محركات ذكاء اصطناعي، كلها مشمولة", ns2: "مرات لكل سؤال، كل أسبوع", ns3: "إجابة محلَّلة كل أسبوع", ns4: "ثلاث لغات أصلية", wg_t: "ما تحصل عليه، كل أسبوع.", wg1t: "نتيجتك، مع هامش الخطأ", wg1p: "الظهور، الترتيب، الانطباع: كل رقم مع هامشه ±، مقارنةً بالأسبوع السابق.", wg2t: "من يوصي به الذكاء الاصطناعي بدلاً منك", wg2p: "حصتك من التوصيات مقابل المنافسين الذين تتابعهم.", wg3t: "المصادر التي تقرأها المحركات", wg3p: "المواقع التي تستشهد بها المحركات، معدودة. تعرف أين تظهر لتُذكر.", wg4t: "خطة عمل، لا كومة بيانات", wg4p: "إجراءات مرتبة بالأولوية، بلغة واضحة، جاهزة لفريقك.", m_p2: "ست قياسات من التي ننشرها كل أسبوع على LinkedIn. انقر للتكبير.", au_p2: "ثلاثة أسئلة حقيقية من العملاء، تُطرح مباشرة على ChatGPT، Gemini. النتيجة خلال نحو 20 ثانية." },
};
const anchors = { en: 'n6:"Methodology",n7:"FAQ",', fr: 'n6:"Méthodologie",n7:"FAQ",', ar: 'n6:"المنهجية",n7:"الأسئلة الشائعة",' };
for (const l of ["en", "fr", "ar"]) { const a = anchors[l]; if (!h.includes(a)) throw new Error("anchor " + l); h = h.replace(a, a + Object.entries(K[l]).map(([k, v]) => `${k}:${JSON.stringify(v)},`).join("")); }

// CSS
h = h.replace("</style>", `
/* ===== v4 : visuel d'abord ===== */
.hero.v4{padding:64px 0 36px}
.hcenter{max-width:840px;margin:0 auto;text-align:center}
.hcenter .kicker{justify-content:center}
.hcenter h1{font-size:clamp(38px,5.2vw,68px)}
.hcenter .sub{margin:0 auto 28px;max-width:660px}
.hcenter .btns{justify-content:center}
.hcenter .tstrip{justify-content:center;margin-top:22px}
.hero-shot{margin-top:48px;max-height:640px}
.shotcap{text-align:center;color:var(--dim);font-size:13px;margin-top:14px}
.nums{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:28px 0;background:var(--ink2)}
.numgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;text-align:center}
.numgrid b{display:block;font-size:34px;letter-spacing:-.03em;font-weight:700;line-height:1.1;margin-bottom:4px}
.numgrid span{color:var(--dim);font-size:13.5px}
@media(max-width:700px){.numgrid{grid-template-columns:repeat(2,1fr)}}
.wg{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:820px){.wg{grid-template-columns:1fr}}
.wgc{background:var(--panel);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.wgc img{width:100%;display:block;border-bottom:1px solid var(--line);background:#fff}
.wgc h3{font-size:19px;margin:18px 22px 6px;letter-spacing:-.02em}
.wgc p{color:var(--dim);font-size:14.5px;margin:0 22px 20px}
.steps4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
@media(max-width:900px){.steps4{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.steps4{grid-template-columns:1fr}}
.st{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:22px}
.st h3{font-size:17px;margin:10px 0 12px;letter-spacing:-.01em;line-height:1.3}
.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:820px){.gal{grid-template-columns:repeat(2,1fr)}}
.gal a{display:block;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#0A0A0B}
.gal img{width:100%;display:block;transition:.25s}
.gal a:hover img{transform:scale(1.02)}
.auditbox.wide{max-width:960px;margin:0 auto}
.af-row4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}
@media(max-width:820px){.af-row4{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.af-row4{grid-template-columns:1fr}}
</style>`);
writeFileSync("index.html", h);
console.log("v4 ✓", h.length);
