// Remplace « Comment ça marche » par un diagramme interactif de la méthode (5 étapes + mini-calculateur de marge d'erreur) : node _method_diagram.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8").replace(/\r\n/g, "\n");
if (h.includes('id="mdiag"')) { console.log("déjà présent"); process.exit(0); }
const a = h.indexOf("<!-- HOW -->"), b = h.indexOf("<!-- GALERIE");
if (a < 0 || b < 0) throw new Error("marqueurs HOW/GALERIE");
const section = `<!-- MÉTHODE (diagramme interactif) -->
<section class="s" id="how" style="padding-top:20px"><div class="wrap">
  <div class="head"><div class="kicker"><s></s><span data-i="mt_k"></span></div><h2 data-i="mt_t"></h2><p data-i="mt_p"></p></div>
  <div class="mdiag rv" id="mdiag">
    <div class="mflow" role="tablist">
      <button class="mnode on" data-n="1" onclick="mdSel(1)" role="tab"><i>1</i><b data-i="dg1l"></b><small data-i="dg1s"></small></button><span class="marr">→</span>
      <button class="mnode" data-n="2" onclick="mdSel(2)" role="tab"><i>2</i><b data-i="dg2l"></b><small data-i="dg2s"></small></button><span class="marr">→</span>
      <button class="mnode" data-n="3" onclick="mdSel(3)" role="tab"><i>3</i><b data-i="dg3l"></b><small data-i="dg3s"></small></button><span class="marr">→</span>
      <button class="mnode" data-n="4" onclick="mdSel(4)" role="tab"><i>4</i><b data-i="dg4l"></b><small data-i="dg4s"></small></button><span class="marr">→</span>
      <button class="mnode" data-n="5" onclick="mdSel(5)" role="tab"><i>5</i><b data-i="dg5l"></b><small data-i="dg5s"></small></button>
    </div>
    <div class="mpanel">
      <div class="mp" data-p="1"><h3 data-i="dg1t"></h3><p data-i="dg1d"></p><div class="mrig"><span data-i="mt_rig"></span><span data-i="dg1r"></span></div></div>
      <div class="mp" data-p="2" hidden><h3 data-i="dg2t"></h3><p data-i="dg2d"></p>
        <div class="meng"><span><b>ChatGPT</b> gpt-4o · web search</span><span><b>Gemini</b> 2.5 Flash · Google Search</span><span><b>Perplexity</b> Sonar</span><span><b>Claude</b> Haiku 4.5 · web search</span></div>
        <div class="mrig"><span data-i="mt_rig"></span><span data-i="dg2r"></span></div></div>
      <div class="mp" data-p="3" hidden><h3 data-i="dg3t"></h3><p data-i="dg3d"></p>
        <div class="mguard"><div><i>1</i><span data-i="dg3g1"></span></div><div><i>2</i><span data-i="dg3g2"></span></div></div>
        <div class="mrig"><span data-i="mt_rig"></span><span data-i="dg3r"></span></div></div>
      <div class="mp" data-p="4" hidden><h3 data-i="dg4t"></h3><p data-i="dg4d"></p>
        <div class="mcalc">
          <div class="mcrow"><label><span data-i="cc_runs"></span> <b id="ccRunsV">3</b></label><input type="range" id="ccRuns" min="1" max="12" value="3" oninput="mdCalc()"></div>
          <div class="mcrow"><label><span data-i="cc_hits"></span> <b id="ccHitsV">2</b></label><input type="range" id="ccHits" min="0" max="3" value="2" oninput="mdCalc()"></div>
          <div class="mcout"><div><small data-i="cc_vis"></small><b id="ccVis">67 %</b></div><div><small data-i="cc_ci"></small><b id="ccCI">± 40 pts</b></div><div><small data-i="cc_conf"></small><b id="ccConf">20 %</b></div></div>
          <p class="mcnote" data-i="cc_note"></p>
        </div>
        <div class="mrig"><span data-i="mt_rig"></span><span data-i="dg4r"></span></div></div>
      <div class="mp" data-p="5" hidden><h3 data-i="dg5t"></h3><p data-i="dg5d"></p><div class="mrig"><span data-i="mt_rig"></span><span data-i="dg5r"></span></div></div>
    </div>
    <a class="faqall" href="/methodologie" data-i="mt_link"></a>
  </div>
</div></section>

`;
h = h.slice(0, a) + section + h.slice(b);

const K = {
  en: { mt_k: "Our method", mt_t: "How we calculate. No approximation.", mt_p: "Five steps, published in full. Click a step to see what happens inside.", mt_rig: "Rigour", mt_link: "Read the full methodology →",
    dg1l: "Questions", dg1s: "verified", dg1t: "Real customer questions, checked against reality", dg1d: "Generated from your sector, city and languages, with neighbourhoods verified on OpenStreetMap, then reviewed and de-duplicated. You edit the list before anything is measured.", dg1r: "Broad questions and long-tail questions are tagged and measured separately.",
    dg2l: "4 engines", dg2s: "× 3 passes", dg2t: "Every question, asked 3 times to each engine, every week", dg2d: "Neutral state, web search on, your city as location. AI answers vary from one run to the next: one screenshot proves nothing, 3 passes do.", dg2r: "If fewer than 50% of calls succeed, no report is issued. An unmeasured engine is never shown as 0%.",
    dg3l: "Analysis", dg3s: "2 guards", dg3t: "A mention counts only if it is really you", dg3d: "Each answer is read at temperature 0 and turned into structured data: named or not, rank, competitors, sources, sentiment. Then two deterministic checks apply.", dg3g1: "The brand name must literally appear in the answer text.", dg3g2: "A namesake in another city or country is not counted (sector, city, country, website).", dg3r: "Tracked competitors count at most once per answer.",
    dg4l: "Statistics", dg4s: "with ±", dg4t: "A score is nothing without its margin of error", dg4d: "Visibility = mentions ÷ measured answers. Per question we compute a Wilson 95% interval; for the whole report we bootstrap over the questions (1,000 resamples). Try it:", dg4r: "The ± shown in every report comes from this calculation, not from a rule of thumb.",
    dg5l: "Report", dg5s: "weekly", dg5t: "Numbers first, words second", dg5d: "The executive summary is computed, not generated. Insights are written only from the computed numbers, then verified by a second pass, and any mention of an unmeasured engine is removed.", dg5r: "Every raw answer is stored, so every figure can be traced back.",
    cc_runs: "Passes per question", cc_hits: "Answers naming the brand", cc_vis: "Visibility", cc_ci: "Wilson 95%", cc_conf: "Confidence", cc_note: "With 1 pass the interval is almost meaningless. With 3 passes per engine and 16 questions, the report-level margin drops to about ± 12 points." },
  fr: { mt_k: "Notre méthode", mt_t: "Comment nous calculons. Sans approximation.", mt_p: "Cinq étapes, publiées en entier. Cliquez sur une étape pour voir ce qui se passe à l'intérieur.", mt_rig: "Rigueur", mt_link: "Lire la méthodologie complète →",
    dg1l: "Questions", dg1s: "vérifiées", dg1t: "De vraies questions de clients, contrôlées face au réel", dg1d: "Générées à partir de votre secteur, votre ville et vos langues, avec des quartiers vérifiés sur OpenStreetMap, puis relues et dédoublonnées. Vous validez la liste avant toute mesure.", dg1r: "Questions larges et questions de longue traîne sont étiquetées et mesurées séparément.",
    dg2l: "4 moteurs", dg2s: "× 3 passages", dg2t: "Chaque question, posée 3 fois à chaque moteur, chaque semaine", dg2d: "État neutre, recherche web activée, votre ville comme localisation. Les réponses des IA varient d'un passage à l'autre : une capture d'écran ne prouve rien, trois passages si.", dg2r: "Si moins de 50 % des appels réussissent, aucun rapport n'est émis. Un moteur non mesuré n'est jamais affiché à 0 %.",
    dg3l: "Analyse", dg3s: "2 garde-fous", dg3t: "Une citation ne compte que si c'est vraiment vous", dg3d: "Chaque réponse est lue à température 0 et transformée en données structurées : cité ou non, rang, concurrents, sources, sentiment. Puis deux contrôles déterministes s'appliquent.", dg3g1: "Le nom de la marque doit apparaître littéralement dans le texte de la réponse.", dg3g2: "Un homonyme dans une autre ville ou un autre pays n'est pas compté (secteur, ville, pays, site web).", dg3r: "Un concurrent suivi compte au plus une fois par réponse.",
    dg4l: "Statistiques", dg4s: "avec ±", dg4t: "Un score n'est rien sans sa marge d'erreur", dg4d: "Visibilité = citations ÷ réponses mesurées. Par question, un intervalle de Wilson à 95 % ; pour le rapport entier, un bootstrap sur les questions (1 000 tirages). Essayez :", dg4r: "Le ± affiché dans chaque rapport sort de ce calcul, pas d'une règle approximative.",
    dg5l: "Rapport", dg5s: "hebdomadaire", dg5t: "Les chiffres d'abord, les mots ensuite", dg5d: "Le résumé exécutif est calculé, pas généré. Les analyses sont rédigées uniquement à partir des chiffres calculés, puis vérifiées par une seconde passe, et toute mention d'un moteur non mesuré est supprimée.", dg5r: "Chaque réponse brute est conservée : chaque chiffre peut être retracé.",
    cc_runs: "Passages par question", cc_hits: "Réponses citant la marque", cc_vis: "Visibilité", cc_ci: "Wilson 95 %", cc_conf: "Confiance", cc_note: "Avec 1 passage, l'intervalle ne veut presque rien dire. Avec 3 passages par moteur et 16 questions, la marge au niveau du rapport descend vers ± 12 points." },
  ar: { mt_k: "منهجيتنا", mt_t: "كيف نحسب. بلا تقريب.", mt_p: "خمس خطوات منشورة بالكامل. انقر على خطوة لترى ما يجري داخلها.", mt_rig: "الدقة", mt_link: "اقرأ المنهجية الكاملة ←",
    dg1l: "الأسئلة", dg1s: "متحقق منها", dg1t: "أسئلة حقيقية من العملاء، متحقق منها على أرض الواقع", dg1d: "تُولَّد من قطاعك ومدينتك ولغاتك، مع أحياء متحقق منها في OpenStreetMap، ثم تُراجع وتُزال منها التكرارات. أنت تعتمد القائمة قبل أي قياس.", dg1r: "الأسئلة العامة وأسئلة الذيل الطويل توسم وتُقاس كلٌّ على حدة.",
    dg2l: "4 محركات", dg2s: "× 3 مرات", dg2t: "كل سؤال يُطرح 3 مرات على كل محرك، كل أسبوع", dg2d: "حالة محايدة، بحث في الويب مفعّل، مدينتك كموقع. إجابات الذكاء الاصطناعي تتغير من مرة إلى أخرى: لقطة شاشة واحدة لا تثبت شيئاً، أما ثلاث مرات فتثبت.", dg2r: "إذا نجح أقل من 50 % من الطلبات، لا يصدر أي تقرير. المحرك غير المقيس لا يُعرض أبداً بنسبة 0 %.",
    dg3l: "التحليل", dg3s: "ضابطان", dg3t: "الذكر لا يُحتسب إلا إذا كان أنت فعلاً", dg3d: "تُقرأ كل إجابة عند درجة حرارة 0 وتتحول إلى بيانات منظمة: مذكور أم لا، الترتيب، المنافسون، المصادر، الانطباع. ثم يُطبَّق ضابطان حتميان.", dg3g1: "يجب أن يظهر اسم العلامة حرفياً في نص الإجابة.", dg3g2: "الاسم المشابه في مدينة أو بلد آخر لا يُحتسب (القطاع، المدينة، البلد، الموقع الإلكتروني).", dg3r: "المنافس المتابَع يُحتسب مرة واحدة على الأكثر في كل إجابة.",
    dg4l: "الإحصاء", dg4s: "مع ±", dg4t: "النتيجة لا تعني شيئاً بلا هامش خطأ", dg4d: "الظهور = الإجابات الذاكرة للعلامة ÷ الإجابات المقيسة. لكل سؤال فاصل ويلسون 95 %؛ وللتقرير كله بوتستراب على الأسئلة (1000 عينة). جرّب:", dg4r: "هامش ± المعروض في كل تقرير يخرج من هذا الحساب، لا من قاعدة تقريبية.",
    dg5l: "التقرير", dg5s: "أسبوعي", dg5t: "الأرقام أولاً، ثم الكلمات", dg5d: "الملخص التنفيذي يُحسب ولا يُولَّد. التحليلات تُكتب من الأرقام المحسوبة فقط، ثم تُراجع في جولة ثانية، ويُحذف أي ذكر لمحرك غير مقيس.", dg5r: "كل إجابة خام محفوظة: يمكن تتبع كل رقم إلى مصدره.",
    cc_runs: "مرات لكل سؤال", cc_hits: "إجابات تذكر العلامة", cc_vis: "الظهور", cc_ci: "ويلسون 95 %", cc_conf: "الثقة", cc_note: "مع مرة واحدة يكاد الفاصل لا يعني شيئاً. مع 3 مرات لكل محرك و16 سؤالاً، ينخفض الهامش على مستوى التقرير إلى نحو ± 12 نقطة." },
};
const anchors = { en: 'n6:"Methodology",n7:"FAQ",', fr: 'n6:"Méthodologie",n7:"FAQ",', ar: 'n6:"المنهجية",n7:"الأسئلة الشائعة",' };
for (const l of ["en", "fr", "ar"]) { const an = anchors[l]; if (!h.includes(an)) throw new Error("anchor " + l); h = h.replace(an, an + Object.entries(K[l]).map(([k, v]) => `${k}:${JSON.stringify(v)},`).join("")); }

h = h.replace("</style>", `
/* ===== diagramme de méthode ===== */
.mdiag{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:26px}
.mflow{display:flex;align-items:stretch;gap:6px;overflow-x:auto;padding-bottom:6px}
.mnode{flex:1 1 0;min-width:150px;background:var(--ink2);border:1px solid var(--line);border-radius:16px;padding:14px 12px;text-align:start;cursor:pointer;color:var(--cream);font-family:inherit;transition:.18s;display:flex;flex-direction:column;gap:4px}
.mnode i{width:26px;height:26px;border-radius:8px;background:var(--line);display:grid;place-items:center;font-style:normal;font-weight:800;font-size:13px;margin-bottom:6px}
.mnode b{font-size:15px;letter-spacing:-.01em}.mnode small{font:500 11.5px 'JetBrains Mono',monospace;color:var(--dim)}
body.rtl .mnode small{font-family:'Cairo',sans-serif}
.mnode:hover{border-color:var(--cream)}
.mnode.on{background:var(--acid);color:#0A0A0B;border-color:var(--acid)}.mnode.on i{background:#0A0A0B;color:var(--acid)}.mnode.on small{color:#0A0A0B;opacity:.7}
.marr{align-self:center;color:var(--dim);font-size:18px;flex:none}
body.rtl .marr{transform:scaleX(-1)}
.mpanel{margin-top:18px;border-top:1px solid var(--line);padding-top:20px;min-height:180px}
.mp h3{font-size:22px;letter-spacing:-.02em;margin-bottom:8px}.mp p{color:var(--dim);font-size:15px;max-width:760px}
.mrig{margin-top:16px;display:flex;gap:10px;align-items:flex-start;font-size:14px;color:var(--cream)}
.mrig span:first-child{flex:none;font:600 11.5px 'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:#0A0A0B;background:var(--acid);padding:4px 8px;border-radius:6px}
body.rtl .mrig span:first-child{font-family:'Cairo',sans-serif;letter-spacing:0}
.meng{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.meng span{font-size:13px;padding:7px 12px;border-radius:99px;border:1px solid var(--line);color:var(--dim)}.meng b{color:var(--cream)}
.mguard{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}@media(max-width:700px){.mguard{grid-template-columns:1fr}}
.mguard div{display:flex;gap:10px;align-items:flex-start;background:var(--ink2);border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-size:14px}
.mguard i{flex:none;width:22px;height:22px;border-radius:6px;background:var(--acid);color:#0A0A0B;display:grid;place-items:center;font-style:normal;font-weight:800;font-size:12px}
.mcalc{margin-top:14px;background:var(--ink2);border:1px solid var(--line);border-radius:14px;padding:16px 18px;max-width:760px}
.mcrow{display:grid;grid-template-columns:240px 1fr;gap:14px;align-items:center;margin-bottom:10px}@media(max-width:600px){.mcrow{grid-template-columns:1fr}}
.mcrow label{font-size:14px;color:var(--dim)}.mcrow label b{color:var(--cream);font-family:'JetBrains Mono',monospace}
.mcrow input[type=range]{width:100%;accent-color:var(--acid-ink)}
.mcout{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0 8px}.mcout div{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 12px}
.mcout small{display:block;color:var(--dim);font-size:11.5px;font-family:'JetBrains Mono',monospace;margin-bottom:3px}.mcout b{font-size:22px;letter-spacing:-.02em}
body.rtl .mcout small{font-family:'Cairo',sans-serif}
.mcnote{font-size:13px!important;color:var(--dim)}
</style>`);

h = h.replace("/* ===== Menu mobile ===== */", `/* ===== diagramme de méthode ===== */
function mdSel(n){document.querySelectorAll('.mnode').forEach(b=>b.classList.toggle('on',+b.dataset.n===n));document.querySelectorAll('.mp').forEach(p=>{p.hidden=+p.dataset.p!==n;});if(n===4)mdCalc();}
function mdCalc(){const r=+document.getElementById('ccRuns').value;const hi=document.getElementById('ccHits');hi.max=r;let k=Math.min(+hi.value,r);hi.value=k;document.getElementById('ccRunsV').textContent=r;document.getElementById('ccHitsV').textContent=k;
 const p=k/r,z=1.96,z2=z*z,den=1+z2/r,c=(p+z2/(2*r))/den,half=(z*Math.sqrt((p*(1-p)+z2/(4*r))/r))/den;const lo=Math.max(0,c-half),hiv=Math.min(1,c+half),w=hiv-lo;
 document.getElementById('ccVis').textContent=Math.round(p*100)+' %';document.getElementById('ccCI').textContent='± '+Math.round(w*50)+' pts';document.getElementById('ccConf').textContent=Math.round((1-w)*100)+' %';}
/* ===== Menu mobile ===== */`);

writeFileSync("index.html", h);
console.log("diagramme ✓", h.length);
