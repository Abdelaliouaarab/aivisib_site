// Page /agences avec SES PROPRES titre, description et adresse canonique (14/10/2026) : node _build_agences.mjs
// Avant, /agences servait index.pre.html tel quel : Google y voyait le titre et l'adresse canonique de l'accueil,
// donc pas de page « agences » à classer. On part de la version pré-rendue (texte lisible par les robots)
// et on remplace l'en-tête. À RELANCER après chaque `node _prerender_site.mjs` (sinon /agences garde l'ancien accueil).
import { readFileSync, writeFileSync } from "node:fs";
let s = readFileSync("index.pre.html", "utf8");
const URL_ = "https://aivisib.com/agences";
const T = "AIVisib for agencies — AI visibility reports for your clients, under your brand";
const D = "Track whether ChatGPT, Gemini, Perplexity and Claude recommend each of your clients, in English, French and Arabic, and deliver weekly white-label reports under your own name.";
const rep = (re, to) => { if (!re.test(s)) throw new Error("introuvable : " + re); s = s.replace(re, to); };
rep(/<title>[^<]*<\/title>/, `<title>${T}</title>`);
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${D}">`);
rep(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${URL_}">`);
rep(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${URL_}">`);
rep(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${T}">`);
rep(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${D}">`);
rep(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${T}">`);
rep(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${D}">`);
// balises de langue : la page agences existe en trois langues via ?lang= (comme /methodologie)
rep(/(<link rel="alternate" hreflang="[^"]*" href="[^"]*">)+/, ["en", "fr", "ar"].map((l) => `<link rel="alternate" hreflang="${l}" href="${URL_}?lang=${l}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${URL_}">`);
// la section « agences » visible sans attendre le script (robots et premier affichage)
rep(/<body>/, '<body data-view="agences">');
rep(/<section class="s" id="agences">/, '<section class="s vshow" id="agences">');
writeFileSync("agences.html", s);
console.log("agences.html :", s.length, "caractères");
