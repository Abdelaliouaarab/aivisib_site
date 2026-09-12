// Injecte les nouvelles clés i18n (site_copy_v3.md) dans l'objet T d'index.html : node _inject_copy.mjs
import { readFileSync, writeFileSync } from "node:fs";
const SP = "C:/Users/ouaar/AppData/Local/Temp/claude/C--Users-ouaar-myprojectsclaude/464f5a61-f2a5-4a7e-8c91-30bd8326801c/scratchpad/";
const md = readFileSync(SP + "site_copy_v3.md", "utf8");
const blocks = [...md.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => JSON.parse(m[1]));
const [en, fr, ar] = blocks;
const anchors = { en: 'n6:"Methodology",n7:"FAQ",', fr: 'n6:"Méthodologie",n7:"FAQ",', ar: 'n6:"المنهجية",n7:"الأسئلة الشائعة",' };
const asked = { en: "Asked in", fr: "Posée en", ar: "طُرح بـ" };
const measured = { en: "Measured on", fr: "Mesuré le", ar: "تاريخ القياس" };
const seeAll = { en: "See all our published measurements on LinkedIn →", fr: "Toutes nos mesures publiées sur LinkedIn →", ar: "كل قياساتنا المنشورة على LinkedIn ←" };
const rd = {
  en: { rd_k: "The real product", rd_t: "The report, exactly as you get it.", rd_p: "A real weekly report on a public brand (BoursoBank, online bank, Paris), generated on 12/09/2026: 25 questions × 4 engines × 3 passes. No sample data." },
  fr: { rd_k: "Le vrai produit", rd_t: "Le rapport, tel que vous le recevez.", rd_p: "Un vrai rapport hebdomadaire sur une marque publique (BoursoBank, banque en ligne, Paris), généré le 12/09/2026 : 25 questions × 4 moteurs × 3 passages. Aucune donnée fictive." },
  ar: { rd_k: "المنتج الحقيقي", rd_t: "التقرير، كما تستلمه بالضبط.", rd_p: "تقرير أسبوعي حقيقي عن علامة عامة (BoursoBank، بنك إلكتروني، باريس)، أُنشئ في 12/09/2026: 25 سؤالاً × 4 محركات × 3 مرات. لا بيانات وهمية." },
};
function keys(L, lang) {
  const o = {};
  o.h1v3 = L.hero.h1; o.subv3 = L.hero.sub; [o.pill1, o.pill2, o.pill3] = L.hero.pills; o.cta1 = L.hero.cta_primary; o.cta2 = L.hero.cta_secondary;
  o.m_t = L.measurements.title; o.m_p = L.measurements.intro; o.m_asked = asked[lang]; o.m_meas = measured[lang]; o.m_all = seeAll[lang];
  L.measurements.cards.forEach((c, i) => { o["m" + (i + 1) + "q"] = c.question; o["m" + (i + 1) + "v"] = c.verdict; o["m" + (i + 1) + "i"] = c.insight; o["m" + (i + 1) + "d"] = c.date; o["m" + (i + 1) + "l"] = c.asked_in; });
  o.ob_t = L.objections.title; L.objections.items.forEach((it, i) => { o["ob" + (i + 1) + "q"] = it.q; o["ob" + (i + 1) + "a"] = it.a; });
  L.trust_strip.forEach((t, i) => { o["ts" + (i + 1)] = t; });
  o.f_company = L.footer.company_line; o.fl_meth = L.footer.links.methodology; o.fl_sec = L.footer.links.security; o.fl_ag = L.footer.links.agencies; o.fl_cmp = L.footer.links.comparison; o.fl_faq = L.footer.links.faq; o.fl_meas = L.footer.links.measurements; o.fl_li = L.footer.links.linkedin;
  Object.assign(o, rd[lang]);
  return Object.entries(o).map(([k, v]) => `${k}:${JSON.stringify(v)},`).join("");
}
let html = readFileSync("index.html", "utf8");
for (const [lang, L] of [["en", en], ["fr", fr], ["ar", ar]]) {
  const a = anchors[lang];
  if (!html.includes(a)) throw new Error("anchor missing " + lang);
  // évite la double injection
  if (html.includes(a + 'h1v3:')) { html = html.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + 'h1v3:[\\s\\S]*?rd_p:"[^"]*",'), a); }
  html = html.replace(a, a + keys(L, lang));
}
writeFileSync("index.html", html);
console.log("clés injectées (en/fr/ar)");
