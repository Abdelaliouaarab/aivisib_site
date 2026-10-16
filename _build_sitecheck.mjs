// Analyseur GRATUIT du site (16/10/2026) : génère site-check.html (EN), site-check.fr.html, site-check.ar.html
// avec le style / l'en-tête / le pied de page d'index.html. Textes des vérifications : ../aivisib_engine/sitecheck_texts.json
// (source unique, partagée avec l'email du moteur). Lancer : node _build_sitecheck.mjs
import { readFileSync, writeFileSync } from "node:fs";
const idx = readFileSync("index.html", "utf8");
const style = idx.match(/<style>[\s\S]*?<\/style>/)[0];
const fonts = idx.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/)[0];
const header = idx.match(/<header>[\s\S]*?<\/header>/)[0];
const footer = idx.match(/<footer>[\s\S]*?<\/footer>/)[0];
const TXT = JSON.parse(readFileSync("../aivisib_engine/sitecheck_texts.json", "utf8"));
const ENGINE = "https://aivisib-engine.onrender.com";
const URLS = { en: "https://aivisib.com/site-check", fr: "https://aivisib.com/fr/site-check", ar: "https://aivisib.com/ar/site-check" };
const FOOT_KEYS = ["f_company", "ft_prod", "ft_res", "ft_co", "ft_test", "ft_tech", "ft_sample", "ft_guide1", "ft_guide2", "ft_guide3", "ft_wl", "ft_cmp3", "ft_alt", "ft_about", "ft_privacy", "ft_terms"];
const segs = { en: idx.slice(idx.indexOf("en:{tk1"), idx.indexOf("fr:{tk1")), fr: idx.slice(idx.indexOf("fr:{tk1"), idx.indexOf("ar:{tk1")), ar: idx.slice(idx.indexOf("ar:{tk1")) };
const pick = (l, k) => { const m = segs[l].match(new RegExp("(?:^|[,{]\\s*)" + k + ':"((?:[^"\\\\]|\\\\.)*)"')); return m ? JSON.parse('"' + m[1] + '"') : ""; };
const NAV = {
  en: { n1: "How it works", n2: "Features", n3: "Pricing", n4: "Log in", n5: "Agencies", n6: "Methodology", n7: "FAQ", n_test: "Free test", v_back: "← Back to home" },
  fr: { n1: "Fonctionnement", n2: "Fonctionnalités", n3: "Tarifs", n4: "Connexion", n5: "Agences", n6: "Méthodologie", n7: "FAQ", n_test: "Test gratuit", v_back: "← Retour à l'accueil" },
  ar: { n1: "طريقة العمل", n2: "المميزات", n3: "الأسعار", n4: "تسجيل الدخول", n5: "الوكالات", n6: "المنهجية", n7: "الأسئلة الشائعة", n_test: "فحص مجاني", v_back: "→ العودة إلى الرئيسية" },
};
for (const l of ["en", "fr", "ar"]) for (const k of FOOT_KEYS) NAV[l][k] = pick(l, k);

const P = {
  en: {
    title: "Free AI readability check: can ChatGPT read your website? — AIVisib",
    desc: "Free, instant check of 24 signals AI engines need to read your website: AI crawlers allowed, text readable without JavaScript, structured data, FAQ, languages. No account.",
    h1: "Can AI engines read your website?", lead: "A free, instant check of the 24 signals ChatGPT, Gemini, Perplexity and Claude need to read and understand your site. No account, no card.",
    url: "Your website address", brand: "Your brand name (optional)", langs: "Your customers' languages", go: "Check my site", wait: "Reading your site… (10 to 30 seconds)",
    score: "AI readability score", fix: "To fix first", good: "Already good", ev: "Technical detail",
    mailT: "Receive this report by email", mailP: "Your email address", mailB: "Send me the report", mailOk: "Sent. Check your inbox (and your spam folder).",
    ctaT: "Your site can be read. But do the AI engines actually recommend you?", ctaP: "Our free test asks real customer questions to ChatGPT, Gemini and Perplexity and shows whether they name you or your competitors.", ctaB: "Run the free AI test",
    honest: "A readable site is necessary, but it does not guarantee that AI engines will recommend you: they also rely on what other sites say about you.",
    errUrl: "Please enter a valid website address, for example yoursite.com.", errUnreach: "We could not open this site. Check the address and try again.", errRate: "Too many checks in a short time. Please try again in a few minutes.", errGen: "The check failed. Please try again in a moment.", errMail: "Please enter a valid email address.",
    whatT: "What we check", faqT: "Questions", faq: [
      ["Is it really free?", "Yes. The check reads your public pages and does not use any paid AI call, so we can offer it to everyone, without an account."],
      ["Does a good score mean ChatGPT recommends me?", "No. It means AI engines can read and understand your site. Whether they recommend you also depends on the sources they read about you; our free AI test measures that."],
      ["What do you do with my site address?", "We read your public pages to run the check. If you ask for the report by email, we keep your email to send it and may contact you about AIVisib."],
    ],
  },
  fr: {
    title: "Analyse gratuite : votre site est-il lisible par ChatGPT et les IA ? — AIVisib",
    desc: "Vérification gratuite et immédiate des 24 signaux dont les IA ont besoin pour lire votre site : robots des IA autorisés, texte sans JavaScript, données structurées, FAQ, langues. Sans compte.",
    h1: "Les IA peuvent-elles lire votre site ?", lead: "Une analyse gratuite et immédiate des 24 signaux dont ChatGPT, Gemini, Perplexity et Claude ont besoin pour lire et comprendre votre site. Sans compte, sans carte.",
    url: "L'adresse de votre site", brand: "Le nom de votre marque (facultatif)", langs: "Les langues de vos clients", go: "Analyser mon site", wait: "Lecture de votre site… (10 à 30 secondes)",
    score: "Note de lisibilité par les IA", fix: "À corriger en priorité", good: "Déjà bon", ev: "Détail technique",
    mailT: "Recevoir ce rapport par email", mailP: "Votre adresse email", mailB: "M'envoyer le rapport", mailOk: "Envoyé. Regardez votre boîte de réception (et vos courriers indésirables).",
    ctaT: "Votre site est lisible. Mais les IA vous recommandent-elles vraiment ?", ctaP: "Notre test gratuit pose de vraies questions de clients à ChatGPT, Gemini et Perplexity et montre s'ils vous citent, ou vos concurrents.", ctaB: "Faire le test IA gratuit",
    honest: "Un site lisible est nécessaire, mais ne garantit pas que les IA vous recommandent : elles s'appuient aussi sur ce que les autres sites disent de vous.",
    errUrl: "Entrez une adresse de site valide, par exemple votresite.com.", errUnreach: "Nous n'avons pas pu ouvrir ce site. Vérifiez l'adresse et réessayez.", errRate: "Trop d'analyses en peu de temps. Réessayez dans quelques minutes.", errGen: "L'analyse a échoué. Réessayez dans un instant.", errMail: "Entrez une adresse email valide.",
    whatT: "Ce que nous vérifions", faqT: "Questions", faq: [
      ["Est-ce vraiment gratuit ?", "Oui. L'analyse lit vos pages publiques et n'utilise aucun appel payant à une IA : nous pouvons l'offrir à tous, sans compte."],
      ["Une bonne note veut-elle dire que ChatGPT me recommande ?", "Non. Elle veut dire que les IA peuvent lire et comprendre votre site. Qu'elles vous recommandent dépend aussi des sources qu'elles lisent sur vous ; c'est ce que mesure notre test IA gratuit."],
      ["Que faites-vous de l'adresse de mon site ?", "Nous lisons vos pages publiques pour l'analyse. Si vous demandez le rapport par email, nous gardons votre adresse pour l'envoyer et pouvons vous écrire au sujet d'AIVisib."],
    ],
  },
  ar: {
    title: "فحص مجاني: هل يستطيع ChatGPT وأنظمة الذكاء الاصطناعي قراءة موقعكم؟ — AIVisib",
    desc: "فحص مجاني وفوري لـ 24 مؤشراً تحتاجها أنظمة الذكاء الاصطناعي لقراءة موقعكم: السماح لروبوتاتها، والنص المقروء دون JavaScript، والبيانات المنظّمة، والأسئلة الشائعة، واللغات. دون حساب.",
    h1: "هل تستطيع أنظمة الذكاء الاصطناعي قراءة موقعكم؟", lead: "فحص مجاني وفوري لـ 24 مؤشراً تحتاجها ChatGPT، Gemini، Perplexity، Claude لقراءة موقعكم وفهمه. دون حساب ودون بطاقة.",
    url: "عنوان موقعكم", brand: "اسم علامتكم (اختياري)", langs: "لغات عملائكم", go: "افحصوا موقعي", wait: "جارٍ قراءة موقعكم… (من 10 إلى 30 ثانية)",
    score: "نتيجة قابلية القراءة", fix: "ما يجب تصحيحه أولاً", good: "ما هو جيد", ev: "تفصيل تقني",
    mailT: "استلموا هذا التقرير بالبريد الإلكتروني", mailP: "بريدكم الإلكتروني", mailB: "أرسلوا لي التقرير", mailOk: "تم الإرسال. راجعوا صندوق الوارد (والرسائل غير المرغوب فيها).",
    ctaT: "يمكن قراءة موقعكم. لكن هل ترشّحكم أنظمة الذكاء الاصطناعي فعلاً؟", ctaP: "يطرح فحصنا المجاني أسئلة حقيقية لعملاء على ChatGPT، Gemini، Perplexity، ويبيّن هل تذكركم أم تذكر منافسيكم.", ctaB: "جرّبوا الفحص المجاني للذكاء الاصطناعي",
    honest: "الموقع المقروء شرط ضروري، لكنه لا يضمن أن ترشّحكم أنظمة الذكاء الاصطناعي: فهي تعتمد أيضاً على ما تقوله المواقع الأخرى عنكم.",
    errUrl: "أدخلوا عنوان موقع صحيحاً، مثل yoursite.com.", errUnreach: "تعذّر فتح هذا الموقع. تحققوا من العنوان وأعيدوا المحاولة.", errRate: "عدد كبير من الفحوص في وقت قصير. أعيدوا المحاولة بعد بضع دقائق.", errGen: "تعذّر الفحص. أعيدوا المحاولة بعد قليل.", errMail: "أدخلوا بريداً إلكترونياً صحيحاً.",
    whatT: "ما الذي نفحصه", faqT: "أسئلة", faq: [
      ["هل الفحص مجاني فعلاً؟", "نعم. يقرأ الفحص صفحاتكم العامة ولا يستعمل أي طلب مدفوع لأنظمة الذكاء الاصطناعي، لذلك نقدّمه للجميع دون حساب."],
      ["هل تعني النتيجة الجيدة أن ChatGPT يرشّحني؟", "لا. تعني أن أنظمة الذكاء الاصطناعي تستطيع قراءة موقعكم وفهمه. أما ترشيحكم فيعتمد أيضاً على المصادر التي تقرؤها عنكم، وهذا ما يقيسه فحصنا المجاني للذكاء الاصطناعي."],
      ["ماذا تفعلون بعنوان موقعي؟", "نقرأ صفحاتكم العامة لإجراء الفحص. وإذا طلبتم التقرير بالبريد، نحتفظ ببريدكم لإرساله، وقد نراسلكم بشأن AIVisib."],
    ],
  },
};

for (const L of ["en", "fr", "ar"]) {
  const p = P[L], rtl = L === "ar";
  const checksList = Object.keys(TXT.checks).map((id) => `<li><b>${TXT.checks[id][L].t}</b> — ${TXT.checks[id][L].w}</li>`).join("");
  const ld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "AIVisib — " + p.h1, url: URLS[L], applicationCategory: "BusinessApplication", operatingSystem: "Web", inLanguage: L, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "Norstrol LLC", url: "https://aivisib.com/" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  const html = `<!DOCTYPE html>
<html lang="${L}"${rtl ? ' dir="rtl"' : ""}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${URLS[L]}">
${["en", "fr", "ar"].map((x) => `<link rel="alternate" hreflang="${x}" href="${URLS[x]}">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${URLS.en}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0A0A0B">
<meta property="og:type" content="website"><meta property="og:site_name" content="AIVisib"><meta property="og:url" content="${URLS[L]}"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:image" content="https://aivisib.com/og-image.png">
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join("\n")}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
${style}
<style>
.scw{max-width:820px;margin:0 auto;padding:54px 24px 90px}
.scw h1{font-size:clamp(32px,4.6vw,52px);letter-spacing:-.03em;line-height:1.08;margin-bottom:16px}
.scw .lead{font-size:18px;color:var(--dim);line-height:1.65;margin-bottom:28px}
.scf{display:block!important;text-align:start;width:100%;max-width:none;box-sizing:border-box;margin:0;background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:22px}
.scf .sclab{display:block!important;width:100%;font-size:13px;font-weight:600;color:var(--dim);margin:14px 0 6px;text-align:start}
.scf input[type=text],.scf input[type=email],.scmail input{display:block;box-sizing:border-box;width:100%;font:inherit;font-size:16px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--input-bg);color:var(--cream)}
.scl{display:flex!important;flex-direction:row;justify-content:flex-start!important;gap:18px;flex-wrap:wrap;font-size:15px}.scl label{display:inline-flex!important;flex-direction:row!important;text-transform:none!important;font-size:15px!important;letter-spacing:0!important;justify-content:flex-start!important;align-items:center;gap:8px;margin:0;color:var(--cream);font-weight:500;width:auto!important;flex:0 0 auto}.scl input{width:18px!important;height:18px;min-width:0!important;flex:0 0 auto!important;padding:0!important;margin:0!important}
.scb{display:inline-block;margin-top:18px;background:var(--acid);color:#0A0A0B;font-weight:700;border:0;border-radius:99px;padding:13px 24px;font-size:16px;cursor:pointer}
.scb:disabled{opacity:.6;cursor:wait}
.scmsg{margin-top:14px;font-size:15px;color:var(--dim)}.scmsg.err{color:var(--hot)}
.scr{margin-top:30px}.scs{display:flex;align-items:center;gap:20px;margin-bottom:22px}
.scs .n{font-size:58px;font-weight:700;letter-spacing:-.03em}.scs .n small{font-size:22px;color:var(--dim)}.scs .host{font-size:15px;color:var(--dim)}
.sch{font-size:21px;margin:26px 0 12px}
.sci{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:14px 16px;margin-bottom:10px}
.sci .t{font-weight:700;display:flex;gap:10px;align-items:center}.sci .w{color:var(--dim);font-size:15px;margin-top:4px;line-height:1.55}.sci .f{font-size:15px;margin-top:6px;line-height:1.55}
.sci .ev{font:12px 'JetBrains Mono',monospace;color:var(--dim);margin-top:6px;direction:ltr;text-align:start;unicode-bidi:plaintext;word-break:break-word}
.chip{font-size:12px;font-weight:700;border-radius:99px;padding:2px 9px;white-space:nowrap}.chip.fail{background:rgba(224,74,46,.14);color:var(--hot)}.chip.warn{background:rgba(214,150,30,.16);color:#b8770c}.chip.info{background:var(--ink2);color:var(--dim)}.chip.ok{background:rgba(15,164,127,.14);color:var(--cool)}
.scgood{display:flex;flex-wrap:wrap;gap:8px}.scgood span{font-size:14px;background:var(--ink2);border-radius:99px;padding:5px 12px}
.scbox{background:var(--panel);border:1px solid var(--line);border-inline-start:3px solid var(--acid);border-radius:16px;padding:18px 20px;margin-top:22px}
.scbox h3{font-size:18px;margin-bottom:6px}.scbox p{color:var(--dim);font-size:15px;line-height:1.6}
.scmail{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}.scmail input{flex:1;min-width:220px}
.scnote{font-size:14px;color:var(--dim);margin-top:18px;line-height:1.6}
.scw .seo h2{font-size:24px;margin:52px 0 12px}.scw .seo li{color:var(--dim);font-size:15.5px;line-height:1.65;margin-bottom:8px}.scw .seo ul{margin:0 0 10px 20px}
body.rtl .scw .seo ul{margin:0 20px 10px 0}.scw .seo h3{font-size:17px;margin:20px 0 6px}.scw .seo p{color:var(--dim);font-size:15.5px;line-height:1.65}
</style>
</head>
<body${rtl ? ' class="rtl"' : ""}>
<script>(function(){try{if(localStorage.getItem('aiv_theme')==='dark')document.body.classList.add('dark');}catch(e){}})();</script>
${header}
<div class="vback"><a href="${L === "en" ? "/" : "/" + L}" data-i="v_back"></a></div>
<main class="scw">
<h1>${p.h1}</h1>
<p class="lead">${p.lead}</p>
<form class="scf" id="scf" onsubmit="return runCheck(event)">
<label class="sclab" for="u">${p.url}</label><input type="text" id="u" placeholder="${L === "fr" ? "votresite.com" : "yoursite.com"}" autocomplete="url" inputmode="url" required>
<label class="sclab" for="b">${p.brand}</label><input type="text" id="b" maxlength="60">
<span class="sclab">${p.langs}</span><div class="scl"><label><input type="checkbox" value="en"${L === "en" ? " checked" : ""}> English</label><label><input type="checkbox" value="fr"${L === "fr" ? " checked" : ""}> Français</label><label><input type="checkbox" value="ar"${L === "ar" ? " checked" : ""}> العربية</label></div>
<button class="scb" id="go" type="submit">${p.go}</button>
<div class="scmsg" id="msg" role="status"></div>
</form>
<div class="scr" id="res" hidden></div>
<section class="seo">
<h2>${p.whatT}</h2><ul>${checksList}</ul>
<p>${p.honest}</p>
<h2>${p.faqT}</h2>${p.faq.map(([q, a]) => `<h3>${q}</h3><p>${a}</p>`).join("")}
</section>
</main>
${footer}
<script>
const NAV=${JSON.stringify(NAV)};const L=${JSON.stringify(L)};const P=${JSON.stringify(p)};
const TXT=${JSON.stringify({ status: TXT.status, checks: Object.fromEntries(Object.entries(TXT.checks).map(([k, v]) => [k, v[L]])) })};
const ENGINE=${JSON.stringify(ENGINE)};const ALT=${JSON.stringify(URLS)};let LAST=null;
function setLang(l){if(l!==L&&ALT[l]){location.href=ALT[l];return;}document.querySelectorAll('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(NAV[L][k]!==undefined)e.textContent=NAV[L][k]});['en','fr','ar'].forEach(x=>{const b=document.getElementById('b_'+x);if(b)b.classList.toggle('on',x===L)});document.querySelectorAll('a[href^="#"]').forEach(a=>a.setAttribute('href','/'+(L==='en'?'':L+'/')+a.getAttribute('href')));}
function toggleMenu(){const b=document.getElementById('burgerBtn'),m=document.getElementById('mmenu');if(!m)return;const open=!m.classList.contains('open');m.classList.toggle('open',open);if(b)b.setAttribute('aria-expanded',open?'true':'false');}
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem('aiv_theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}}
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const msg=(t,err)=>{const m=document.getElementById('msg');m.textContent=t||'';m.className='scmsg'+(err?' err':'');};
async function runCheck(e){e.preventDefault();const u=document.getElementById('u').value.trim();if(!/[a-z0-9-]+\\.[a-z]{2,}/i.test(u)){msg(P.errUrl,true);return false;}
 const langs=[...document.querySelectorAll('.scl input:checked')].map(i=>i.value);const btn=document.getElementById('go');btn.disabled=true;msg(P.wait);document.getElementById('res').hidden=true;
 try{const r=await fetch(ENGINE+'/site/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:u,langs,brand:document.getElementById('b').value.trim(),lang:L})});const d=await r.json();
  if(!r.ok){msg(d.error==='rate_limited'?P.errRate:d.error==='invalid_url'?P.errUrl:d.error==='unreachable'?P.errUnreach:P.errGen,true);return false;}
  LAST=d;msg('');render(d);}catch(err){msg(P.errGen,true);}finally{btn.disabled=false;}return false;}
function render(d){const bad=d.checks.filter(c=>c.status==='fail'||c.status==='warn'),info=d.checks.filter(c=>c.status==='info'),good=d.checks.filter(c=>c.status==='ok');
 const item=c=>{const t=TXT.checks[c.id]||{t:c.id,w:'',f:''};return '<div class="sci"><div class="t"><span class="chip '+c.status+'">'+esc(TXT.status[c.status][L])+'</span>'+esc(t.t)+'</div><div class="w">'+esc(t.w)+'</div>'+(c.status!=='ok'?'<div class="f">→ '+esc(t.f)+'</div>':'')+(c.evidence?'<div class="ev">'+esc(P.ev)+' : '+esc(c.evidence)+'</div>':'')+'</div>';};
 let h='<div class="scs"><div class="n">'+(d.score==null?'—':d.score)+'<small>/100</small></div><div><b>'+esc(P.score)+'</b><div class="host">'+esc(d.host)+'</div></div></div>';
 if(bad.length)h+='<h2 class="sch">'+esc(P.fix)+'</h2>'+bad.map(item).join('');
 if(info.length)h+='<h2 class="sch">'+esc(TXT.status.info[L])+'</h2>'+info.map(item).join('');
 if(good.length)h+='<h2 class="sch">'+esc(P.good)+'</h2><div class="scgood">'+good.map(c=>'<span>✅ '+esc((TXT.checks[c.id]||{t:c.id}).t)+'</span>').join('')+'</div>';
 h+='<div class="scbox"><h3>'+esc(P.mailT)+'</h3><form class="scmail" onsubmit="return sendMail(event)"><input type="email" id="em" placeholder="'+esc(P.mailP)+'" required><button class="scb" style="margin-top:0" type="submit">'+esc(P.mailB)+'</button></form><div class="scmsg" id="mm"></div></div>';
 h+='<div class="scbox"><h3>'+esc(P.ctaT)+'</h3><p>'+esc(P.ctaP)+'</p><a class="scb" href="/'+(L==='en'?'':L+'/')+'#audit">'+esc(P.ctaB)+'</a></div><p class="scnote">'+esc(P.honest)+'</p>';
 const res=document.getElementById('res');res.innerHTML=h;res.hidden=false;res.scrollIntoView({behavior:'smooth',block:'start'});}
async function sendMail(e){e.preventDefault();const em=document.getElementById('em').value.trim(),mm=document.getElementById('mm');if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em)){mm.textContent=P.errMail;mm.className='scmsg err';return false;}
 try{const r=await fetch(ENGINE+'/site/check/email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:LAST&&LAST.id,email:em,lang:L})});const d=await r.json();
  if(r.ok){mm.textContent=P.mailOk;mm.className='scmsg';}else{mm.textContent=d.error==='rate_limited'?P.errRate:d.error==='invalid_email'?P.errMail:P.errGen;mm.className='scmsg err';}}catch(err){mm.textContent=P.errGen;mm.className='scmsg err';}return false;}
setLang(L);
</script>
</body>
</html>`;
  const file = L === "en" ? "site-check.html" : `site-check.${L}.html`;
  writeFileSync(file, html);
  console.log("→", file, html.length, "caractères");
}
