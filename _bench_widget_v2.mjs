// Widget benchmark v2 : 8 logos, graphique multi-lignes par semaine (une couleur par marque, légende cliquable) : node _bench_widget_v2.mjs
import { readFileSync, writeFileSync } from "node:fs";
let h = readFileSync("index.html", "utf8").replace(/\r\n/g, "\n");
if (h.includes('id="bwLegend"')) { console.log("déjà v2"); process.exit(0); }
// 1) logos : 8 marques
const LOGOS = ["mercedes", "bmw", "audi", "skoda", "volkswagen", "lexus", "volvo", "landrover"];
const a = h.indexOf('<div class="blogos" id="bwBrands">'), b = h.indexOf("</div>", a) + 6;
h = h.slice(0, a) + `<div class="blogos" id="bwBrands">${LOGOS.map((id) => `<button class="bl" data-b="${id}" onclick="bwSel('${id}')"><img src="/brand/logos/${id}.svg" alt="${id}"><span></span></button>`).join("")}</div>` + h.slice(b);
// 2) zone graphique : plus grande, avec légende
const c = h.indexOf('<div class="btrend">'), d = h.indexOf("</div>", h.indexOf('id="bwTrendNote"')) + 6;
h = h.slice(0, c) + `<div class="btrend"><div class="btt" id="bwTrendTitle"></div><svg id="bwTrend" viewBox="0 0 520 220"></svg><div class="blegend" id="bwLegend"></div><div class="btn2" id="bwTrendNote"></div></div>` + h.slice(d);
// 3) rendu du graphique : multi-lignes
const s0 = h.indexOf("  // tendance de la marque sélectionnée"), s1 = h.indexOf("  const nAns=Object.values(D)[0]");
if (s0 < 0 || s1 < 0) throw new Error("bloc tendance introuvable");
h = h.slice(0, s0) + `  // graphique : une ligne par marque (couleur dédiée), x = semaines de la période, y = indicateur
  const hist=snaps.slice(-per);const W=520,H=220,px=34,py=22,pb=30;
  const vals=BW.brands.map(br=>({id:br.id,name:br.name,color:br.color||'#888',pts:hist.map((s,i)=>({i,d:s.date,v:(s.data[cc][cl][ek][br.id]||{})[m]}))}));
  const allV=vals.flatMap(r=>r.pts.map(p=>p.v)).filter(v=>v!=null);
  const ymax=m==='pos'?Math.max(6,...allV):(m==='share'?Math.max(50,...allV):100);
  const X=i=>hist.length<2?W/2:px+i*(W-2*px)/(hist.length-1);const Y=v=>m==='pos'?py+((v-1)/(ymax-1))*(H-py-pb):H-pb-(v/ymax)*(H-py-pb);
  let svgs='';for(let g=0;g<=4;g++){const yv=m==='pos'?1+(ymax-1)*g/4:ymax*g/4;const yy=Y(yv);svgs+='<line x1="'+px+'" y1="'+yy+'" x2="'+(W-px)+'" y2="'+yy+'" stroke="var(--line)" stroke-dasharray="3 4"/><text x="'+(px-6)+'" y="'+(yy+4)+'" text-anchor="end" font-size="10" fill="var(--dim)">'+(m==='pos'?'#'+Math.round(yv*10)/10:Math.round(yv)+'%')+'</text>';}
  hist.forEach((s,i)=>{svgs+='<text x="'+X(i)+'" y="'+(H-8)+'" text-anchor="middle" font-size="10" fill="var(--dim)">'+s.date.slice(8)+'/'+s.date.slice(5,7)+'</text>';});
  const order=[...vals].sort((r1,r2)=>(r1.id===bwBrand)-(r2.id===bwBrand));
  for(const r of order){const on=r.id===bwBrand;const pts=r.pts.filter(p=>p.v!=null);if(!pts.length)continue;
    if(pts.length>1)svgs+='<polyline fill="none" stroke="'+r.color+'" stroke-width="'+(on?3.2:1.6)+'" stroke-opacity="'+(on?1:.55)+'" stroke-linejoin="round" points="'+pts.map(p=>X(p.i)+','+Y(p.v)).join(' ')+'"/>';
    pts.forEach(p=>{svgs+='<circle cx="'+X(p.i)+'" cy="'+Y(p.v)+'" r="'+(on?5:3.5)+'" fill="'+r.color+'" fill-opacity="'+(on?1:.7)+'" style="cursor:pointer" onclick="bwSel(\\''+r.id+'\\')"><title>'+escH(r.name)+' · '+p.d+' · '+(m==='pos'?'#'+p.v:p.v+' %')+'</title></circle>';if(on)svgs+='<text x="'+X(p.i)+'" y="'+(Y(p.v)-10)+'" text-anchor="middle" font-size="11" font-weight="700" fill="'+r.color+'">'+(m==='pos'?'#'+p.v:p.v+'%')+'</text>';});}
  document.getElementById('bwTrend').innerHTML=svgs;
  document.getElementById('bwLegend').innerHTML=vals.map(r=>'<button class="lg'+(r.id===bwBrand?' on':'')+'" onclick="bwSel(\\''+r.id+'\\')"><i style="background:'+r.color+'"></i>'+escH(r.name)+'</button>').join('');
  const br=BW.brands.find(x=>x.id===bwBrand);document.getElementById('bwTrendTitle').textContent=t.bw_trend+' · '+document.getElementById('bwMetric').selectedOptions[0].textContent+(hist.length>1?' · '+hist.length+' '+t.bw_weeks:'');
  document.getElementById('bwTrendNote').textContent=snaps.length<2?t.bw_hist:(m==='pos'?t.bw_pos1:'');
` + h.slice(s1);
// 4) clés + CSS
const K = { en: { bw_weeks: "weeks" }, fr: { bw_weeks: "semaines" }, ar: { bw_weeks: "أسابيع" } };
const anchors = { en: 'n6:"Methodology",n7:"FAQ",', fr: 'n6:"Méthodologie",n7:"FAQ",', ar: 'n6:"المنهجية",n7:"الأسئلة الشائعة",' };
for (const l of ["en", "fr", "ar"]) h = h.replace(anchors[l], anchors[l] + `bw_weeks:${JSON.stringify(K[l].bw_weeks)},`);
h = h.replace("</style>", `
.bgrid{grid-template-columns:1fr 1.25fr}
#bwTrend{width:100%;height:auto;aspect-ratio:520/220;direction:ltr}
.blegend{display:flex;flex-wrap:wrap;gap:6px 10px;margin-top:8px}
.blegend .lg{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid transparent;border-radius:99px;padding:3px 8px;font:500 12px 'Space Grotesk',system-ui,sans-serif;color:var(--dim);cursor:pointer}
.blegend .lg i{width:10px;height:10px;border-radius:50%;display:inline-block}
.blegend .lg.on{border-color:var(--line);color:var(--cream);background:var(--panel);font-weight:700}
body.rtl .blegend .lg{font-family:'Cairo',sans-serif}
</style>`);
writeFileSync("index.html", h);
console.log("widget v2 ✓", h.length);
