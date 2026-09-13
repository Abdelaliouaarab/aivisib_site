// Remplace la capture du rapport (hero) par le widget interactif « benchmark automobile » (façon Otterly) : node _bench_widget.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8").replace(/\r\n/g, "\n");
if (h.includes('id="bench"')) { console.log("déjà présent"); process.exit(0); }
const a = h.indexOf('<div class="shot hero-shot rv" id="product">'), b = h.indexOf("</div></section>", a);
if (a < 0 || b < 0) throw new Error("hero-shot introuvable");
const LOGOS = { mercedes: "mercedes.svg", bmw: "bmw.svg", audi: "audi.svg", seat: "seat.svg", skoda: "skoda.svg", volkswagen: "volkswagen.svg" };
const widget = `<div class="bench rv" id="bench" data-loaded="0">
    <div class="bh"><div><div class="kicker"><s></s><span data-i="bw_k"></span></div><h2 data-i="bw_t"></h2><p data-i="bw_p"></p></div><div class="bmeta" id="bwMeta"></div></div>
    <div class="blogos" id="bwBrands">${Object.entries(LOGOS).map(([id, f]) => `<button class="bl" data-b="${id}" onclick="bwSel('${id}')"><img src="/brand/logos/${f}" alt="${id}"><span></span></button>`).join("")}</div>
    <div class="bfilters">
      <label><span data-i="bw_country"></span><select id="bwCountry" onchange="bwRender()"></select></label>
      <label><span data-i="bw_class"></span><select id="bwClass" onchange="bwRender()"></select></label>
      <label><span data-i="bw_engine"></span><select id="bwEngine" onchange="bwRender()"></select></label>
      <label><span data-i="bw_metric"></span><select id="bwMetric" onchange="bwRender()"><option value="vis" data-i="bw_m_vis"></option><option value="share" data-i="bw_m_share"></option><option value="pos" data-i="bw_m_pos"></option><option value="sent" data-i="bw_m_sent"></option></select></label>
      <label><span data-i="bw_period"></span><select id="bwPeriod" onchange="bwRender()"><option value="1" data-i="bw_last"></option><option value="4" data-i="bw_w4"></option><option value="8" data-i="bw_w8"></option><option value="12" data-i="bw_w12"></option></select></label>
    </div>
    <div class="bgrid">
      <div class="bbars" id="bwBars"></div>
      <div class="btrend"><div class="btt" id="bwTrendTitle"></div><svg id="bwTrend" viewBox="0 0 320 140" preserveAspectRatio="none"></svg><div class="btn2" id="bwTrendNote"></div></div>
    </div>
    <div class="bfoot" id="bwFoot"></div>
  </div>
  `;
h = h.slice(0, a) + widget + h.slice(b);
// la légende sous l'ancienne capture n'a plus lieu d'être
h = h.replace('<p class="shotcap" data-i="rd_p"></p>\n', "");

const K = {
  en: { bw_k: "Live benchmark · car brands", bw_t: "What the AIs recommend, right now.", bw_p: "Six brands, three markets, three vehicle classes, four AI engines. Real measurements, refreshed every week. Pick a brand.", bw_country: "Country", bw_class: "Vehicle class", bw_engine: "AI engine", bw_metric: "Metric", bw_period: "Period", bw_all: "All engines", bw_m_vis: "Visibility", bw_m_share: "Share of recommendations", bw_m_pos: "Average position", bw_m_sent: "Sentiment", bw_last: "Latest measurement", bw_w4: "Last 4 weeks", bw_w8: "Last 8 weeks", bw_w12: "Last 12 weeks", bw_hist: "Weekly history starts with the second measurement.", bw_meas: "Measured on", bw_ans: "answers analysed", bw_trend: "Trend", bw_foot: "Method: 5 buyer questions per language × 4 engines × 3 passes, neutral state, web search on, {city} as location. Brands are not affiliated with AIVisib. Same method as your report.", bw_none: "Not named in this sample", bw_pos1: "1 = named first" },
  fr: { bw_k: "Benchmark en direct · marques automobiles", bw_t: "Ce que les IA recommandent, maintenant.", bw_p: "Six marques, trois marchés, trois classes de véhicules, quatre moteurs IA. Des mesures réelles, rafraîchies chaque semaine. Choisissez une marque.", bw_country: "Pays", bw_class: "Classe de véhicule", bw_engine: "Moteur IA", bw_metric: "Indicateur", bw_period: "Période", bw_all: "Tous les moteurs", bw_m_vis: "Visibilité", bw_m_share: "Part des recommandations", bw_m_pos: "Position moyenne", bw_m_sent: "Sentiment", bw_last: "Dernière mesure", bw_w4: "4 dernières semaines", bw_w8: "8 dernières semaines", bw_w12: "12 dernières semaines", bw_hist: "L'historique hebdomadaire commence à la deuxième mesure.", bw_meas: "Mesuré le", bw_ans: "réponses analysées", bw_trend: "Tendance", bw_foot: "Méthode : 5 questions d'acheteurs par langue × 4 moteurs × 3 passages, état neutre, recherche web activée, {city} comme localisation. Marques non affiliées à AIVisib. Même méthode que votre rapport.", bw_none: "Non citée dans cet échantillon", bw_pos1: "1 = citée en premier" },
  ar: { bw_k: "مقارنة مباشرة · علامات السيارات", bw_t: "ما توصي به أنظمة الذكاء الاصطناعي، الآن.", bw_p: "ست علامات، ثلاثة أسواق، ثلاث فئات من السيارات، أربعة محركات ذكاء اصطناعي. قياسات حقيقية تُحدَّث كل أسبوع. اختر علامة.", bw_country: "البلد", bw_class: "فئة السيارة", bw_engine: "محرك الذكاء الاصطناعي", bw_metric: "المؤشر", bw_period: "الفترة", bw_all: "كل المحركات", bw_m_vis: "الظهور", bw_m_share: "حصة التوصيات", bw_m_pos: "متوسط الترتيب", bw_m_sent: "الانطباع", bw_last: "آخر قياس", bw_w4: "آخر 4 أسابيع", bw_w8: "آخر 8 أسابيع", bw_w12: "آخر 12 أسبوعاً", bw_hist: "يبدأ السجل الأسبوعي مع القياس الثاني.", bw_meas: "تاريخ القياس", bw_ans: "إجابة محلَّلة", bw_trend: "الاتجاه", bw_foot: "المنهجية: 5 أسئلة مشترين لكل لغة × 4 محركات × 3 مرات، حالة محايدة، بحث في الويب مفعّل، {city} كموقع. العلامات غير مرتبطة بـ AIVisib. المنهجية نفسها المستخدمة في تقريرك.", bw_none: "غير مذكورة في هذه العينة", bw_pos1: "1 = ذُكرت أولاً" },
};
const anchors = { en: 'n6:"Methodology",n7:"FAQ",', fr: 'n6:"Méthodologie",n7:"FAQ",', ar: 'n6:"المنهجية",n7:"الأسئلة الشائعة",' };
for (const l of ["en", "fr", "ar"]) { const an = anchors[l]; if (!h.includes(an)) throw new Error("anchor " + l); h = h.replace(an, an + Object.entries(K[l]).map(([k, v]) => `${k}:${JSON.stringify(v)},`).join("")); }

h = h.replace("</style>", `
/* ===== widget benchmark ===== */
.bench{margin-top:44px;background:var(--panel);border:1px solid var(--line);border-radius:24px;padding:26px;box-shadow:var(--shadow-dash);text-align:start}
.bh{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;flex-wrap:wrap}
.bh h2{font-size:clamp(22px,2.4vw,30px);letter-spacing:-.02em;margin:6px 0 6px}
.bh p{color:var(--dim);font-size:14.5px;max-width:640px}
.bmeta{font:500 12px 'JetBrains Mono',monospace;color:var(--dim);white-space:nowrap;padding-top:6px}
body.rtl .bmeta{font-family:'Cairo',sans-serif}
.blogos{display:flex;gap:10px;overflow-x:auto;padding:18px 0 6px;scrollbar-width:thin}
.bl{flex:none;display:flex;align-items:center;gap:10px;background:var(--ink2);border:1px solid var(--line);border-radius:99px;padding:8px 16px 8px 10px;cursor:pointer;font-family:inherit;color:var(--cream);font-weight:600;font-size:14px;transition:.18s}
.bl img{width:30px;height:30px;object-fit:contain;background:#fff;border-radius:50%;padding:3px}
.bl:hover{border-color:var(--cream)}
.bl.on{background:var(--acid);border-color:var(--acid);color:#0A0A0B}
.bfilters{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:14px 0 18px}
@media(max-width:900px){.bfilters{grid-template-columns:repeat(2,1fr)}}
.bfilters label{display:flex;flex-direction:column;gap:5px;font:500 11.5px 'JetBrains Mono',monospace;color:var(--dim);letter-spacing:.04em;text-transform:uppercase}
body.rtl .bfilters label{font-family:'Cairo',sans-serif;letter-spacing:0}
.bfilters select{background:var(--input-bg);border:1px solid var(--line);color:var(--cream);border-radius:10px;padding:10px 12px;width:100%;min-width:0;font-family:'Space Grotesk',system-ui,sans-serif;font-size:14px;text-transform:none;letter-spacing:0}
.bfilters label{min-width:0}
.bfilters label span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
body.rtl .bfilters select{font-family:'Cairo',sans-serif}
.bgrid{display:grid;grid-template-columns:1.4fr 1fr;gap:18px}
@media(max-width:820px){.bgrid{grid-template-columns:1fr}}
.bbars{display:flex;flex-direction:column;gap:9px}
.bb{display:grid;grid-template-columns:150px 1fr 96px;gap:12px;align-items:center;font-size:14px}
@media(max-width:560px){.bb{grid-template-columns:110px 1fr 80px}}
.bb .bn{display:flex;align-items:center;gap:8px;font-weight:600}.bb .bn img{width:22px;height:22px;object-fit:contain;background:#fff;border-radius:50%;padding:2px}
.bb .bt{height:14px;background:var(--track);border-radius:99px;overflow:hidden}.bb .bt i{display:block;height:100%;background:var(--bar1);border-radius:99px;transition:width .5s}
.bb.on .bt i{background:var(--acid-ink)}.bb.on .bn{color:var(--acid-ink)}
.bb .bv{font:600 13px 'JetBrains Mono',monospace;text-align:end;white-space:nowrap}.bb .bv small{color:var(--dim);font-weight:500}
body.rtl .bb .bv{font-family:'Cairo',sans-serif}
.btrend{background:var(--ink2);border:1px solid var(--line);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column}
.btt{font-weight:600;font-size:14px;margin-bottom:8px}
#bwTrend{width:100%;height:140px;direction:ltr}
.btn2{font-size:12px;color:var(--dim);margin-top:8px}
.bfoot{margin-top:16px;font-size:12px;color:var(--dim);border-top:1px solid var(--line);padding-top:12px}
</style>`);

h = h.replace("/* ===== Menu mobile ===== */", `/* ===== widget benchmark (données réelles /data/bench_cars.json) ===== */
var BW=null; var bwBrand='volkswagen';
async function bwLoad(){try{const r=await fetch('/data/bench_cars.json',{cache:'no-store'});BW=await r.json();bwInit();}catch(e){const el=document.getElementById('bench');if(el)el.style.display='none';}}
function bwOpt(sel,items,keep){const s=document.getElementById(sel);const v=s.value;s.innerHTML=items.map(([val,label])=>'<option value="'+val+'">'+escH(label)+'</option>').join('');if(keep&&[...s.options].some(o=>o.value===v))s.value=v;}
function bwInit(){if(!BW)return;const t=T[lang];
  bwOpt('bwCountry',Object.entries(BW.countries).map(([k,v])=>[k,v.name[lang]||v.name.en]),true);
  bwOpt('bwClass',Object.entries(BW.classes).map(([k,v])=>[k,v.name[lang]||v.name.en]),true);
  bwOpt('bwEngine',[['all',t.bw_all],...BW.engines.map(e=>[e.id,e.label])],true);
  document.querySelectorAll('#bwBrands .bl').forEach(b=>{const br=BW.brands.find(x=>x.id===b.dataset.b);b.querySelector('span').textContent=br?br.name:b.dataset.b;});
  bwRender();}
function bwSel(id){bwBrand=id;bwRender();}
function bwRender(){if(!BW)return;const t=T[lang];const cc=document.getElementById('bwCountry').value,cl=document.getElementById('bwClass').value,ek=document.getElementById('bwEngine').value,m=document.getElementById('bwMetric').value,per=+document.getElementById('bwPeriod').value;
  const snaps=BW.history.filter(s=>s.data[cc]&&s.data[cc][cl]&&s.data[cc][cl][ek]);const last=snaps[snaps.length-1];
  document.querySelectorAll('#bwBrands .bl').forEach(b=>b.classList.toggle('on',b.dataset.b===bwBrand));
  const bars=document.getElementById('bwBars');
  if(!last){bars.innerHTML='<div class="btn2">—</div>';return;}
  const D=last.data[cc][cl][ek];const rows=BW.brands.map(b=>({...b,v:D[b.id]?D[b.id][m]:null,pm:D[b.id]?D[b.id].pm:0,n:D[b.id]?D[b.id].n:0}));
  const asc=m==='pos';rows.sort((a,b)=>{if(a.v==null&&b.v==null)return 0;if(a.v==null)return 1;if(b.v==null)return -1;return asc?a.v-b.v:b.v-a.v;});
  const max=m==='pos'?Math.max(...rows.map(r=>r.v||0),1):100;
  bars.innerHTML=rows.map(r=>{const w=r.v==null?0:(m==='pos'?(1-(r.v-1)/Math.max(max,2))*100:r.v);const val=r.v==null?'<small>'+escH(t.bw_none)+'</small>':(m==='pos'?'#'+r.v:r.v+' %'+(m==='vis'?' <small>± '+r.pm+'</small>':''));
    return '<div class="bb'+(r.id===bwBrand?' on':'')+'" onclick="bwSel(\\''+r.id+'\\')" style="cursor:pointer"><span class="bn"><img src="/brand/logos/'+r.id+'.svg" alt="">'+escH(r.name)+'</span><span class="bt"><i style="width:'+Math.max(0,Math.min(100,w))+'%"></i></span><span class="bv">'+val+'</span></div>';}).join('');
  // tendance de la marque sélectionnée
  const hist=snaps.slice(-per).map(s=>({d:s.date,v:(s.data[cc][cl][ek][bwBrand]||{})[m]}));
  const br=BW.brands.find(b=>b.id===bwBrand);document.getElementById('bwTrendTitle').textContent=t.bw_trend+' · '+(br?br.name:'')+' · '+document.getElementById('bwMetric').selectedOptions[0].textContent;
  const svg=document.getElementById('bwTrend');const pts=hist.filter(p=>p.v!=null);const W=320,H=140,px=24,py=16;
  const ymax=m==='pos'?Math.max(6,...pts.map(p=>p.v)):100;const X=i=>pts.length<2?W/2:px+i*(W-2*px)/(pts.length-1);const Y=v=>m==='pos'?py+((v-1)/(ymax-1))*(H-2*py):H-py-(v/ymax)*(H-2*py);
  let s='<line x1="'+px+'" y1="'+(H-py)+'" x2="'+(W-px)+'" y2="'+(H-py)+'" stroke="var(--line)"/>';
  if(pts.length>1)s+='<polyline fill="none" stroke="var(--acid-ink)" stroke-width="2.5" points="'+pts.map((p,i)=>X(i)+','+Y(p.v)).join(' ')+'"/>';
  pts.forEach((p,i)=>{s+='<circle cx="'+X(i)+'" cy="'+Y(p.v)+'" r="4" fill="var(--acid-ink)"/><text x="'+X(i)+'" y="'+(Y(p.v)-9)+'" text-anchor="middle" font-size="11" fill="var(--cream)">'+(m==='pos'?'#'+p.v:p.v+'%')+'</text><text x="'+X(i)+'" y="'+(H-2)+'" text-anchor="middle" font-size="9" fill="var(--dim)">'+p.d.slice(5)+'</text>';});
  svg.innerHTML=s;
  document.getElementById('bwTrendNote').textContent=snaps.length<2?t.bw_hist:(m==='pos'?t.bw_pos1:'');
  const nAns=Object.values(D)[0]?Object.values(D)[0].n:0;
  document.getElementById('bwMeta').textContent=t.bw_meas+' '+last.date.split('-').reverse().join('/')+' · '+nAns+' '+t.bw_ans;
  document.getElementById('bwFoot').textContent=t.bw_foot.replace('{city}',BW.countries[cc].city);}
bwLoad();
/* ===== Menu mobile ===== */`);
// re-rendre le widget quand la langue change
h = h.replace("  // transmet la langue choisie au dashboard", "  if(typeof bwInit==='function'&&BW)bwInit();\n  // transmet la langue choisie au dashboard");
writeFileSync("index.html", h);
console.log("widget ✓", h.length);
