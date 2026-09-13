# Méthodologie

AIVisib mesure si ChatGPT, Gemini, Perplexity et Claude recommandent votre entreprise. Nous publions cette page pour que vous puissiez juger nos chiffres sur pièces, pas sur parole.

## 1. Les questions

### Comment les questions sont générées

Les questions sont générées pour chaque marque à partir de trois éléments : son secteur, sa ville et ses langues. La liste se construit en plusieurs étapes.

1. **Quartiers.** GPT-4o propose des quartiers de la ville. Chacun est vérifié dans OpenStreetMap (Nominatim, recherche limitée à la ville). Les lieux non vérifiés sont écartés.
2. **Brouillons.** GPT-4o-mini (température 0,9) rédige des questions candidates, avec 40 % de plus que nécessaire. L'ensemble mélange des questions larges à l'échelle de la ville et des questions de longue traîne citant un vrai quartier ou un besoin précis.
3. **Garde-fou d'alphabet.** Les questions en arabe ne contiennent aucune lettre latine, et les questions en alphabet latin aucune lettre arabe.
4. **Relecture.** GPT-4o (température 0) rejette les questions irréalistes, hors secteur, ou citant un lieu absent de la liste vérifiée.
5. **Dédoublonnage.** Chaque question est encodée avec text-embedding-3-small. Deux questions dont la similarité cosinus dépasse 0,85 sont considérées comme des paraphrases, et l'une est supprimée.

### Votre contrôle

Vous pouvez modifier ou supprimer chaque question avant l'enregistrement. Rien n'est mesuré sans votre validation de la liste.

### Head et longue traîne

Chaque question est étiquetée « head » (large, échelle de la ville) ou « longue traîne » (quartier ou besoin précis). Les métriques sont fournies pour les deux périmètres.

## 2. Les moteurs et la façon d'interroger

### Moteurs et réglages

| Moteur | Modèle et configuration |
|---|---|
| ChatGPT | OpenAI Responses API avec recherche web, taille de contexte de recherche « low », localisation approximative réglée sur votre ville et votre pays |
| Gemini | Gemini 2.5 Flash avec ancrage Google Search, température 0,6 |
| Perplexity | Sonar, recherche web en direct, température 0,6 |
| Claude | Claude Haiku 4.5 avec recherche web (2 recherches au maximum), température 0,6, 1024 tokens de sortie |

### La même consigne pour tous les moteurs

Les quatre moteurs reçoivent le même prompt système neutre : répondre naturellement, nommer des entreprises réelles, répondre dans la langue de la question.

### État neutre

Il n'y a ni mémoire, ni personnalisation, ni compte connecté. Chaque question part d'un état vierge, proche de ce que verrait un nouvel utilisateur.

### Passes et rythme

Chaque question est posée 3 fois par moteur, chaque semaine. Pour une marque type, 16 questions × 4 moteurs × 3 passes donnent 192 réponses par rapport.

Les appels sont exécutés en parallèle (6 à la fois), avec 3 nouvelles tentatives en cas d'erreur temporaire.

### Quand nous refusons de publier

Si moins de 50 % des appels réussissent, aucun rapport n'est émis. Nous ne publions jamais un faux 0 %. Un moteur sans aucune réponse réussie est affiché « non mesuré », jamais 0 %.

## 3. Comment nous comptons une mention

### L'analyseur

Chaque réponse est lue par GPT-4o-mini à température 0. Il renvoie un JSON structuré : marque mentionnée (oui/non), rang de 1 à 10 parmi les entreprises nommées, concurrents suivis mentionnés, autres marques, sources citées, et sentiment (positif, neutre, négatif).

### Deux garde-fous déterministes

La sortie de l'analyseur n'est jamais prise seule. Deux règles s'appliquent ensuite.

1. **Présence littérale.** Le nom de la marque doit apparaître littéralement dans le texte de la réponse. Sinon, la mention est écartée.
2. **Garde-fou des homonymes.** L'analyseur reçoit l'identité de l'entreprise : secteur, ville, pays, et site web s'il est fourni. Une mention qui désigne clairement une autre entreprise du même nom, ailleurs, n'est pas comptée.

### Concurrents

Un concurrent suivi compte au plus une fois par réponse, quel que soit le nombre de fois où il est nommé.

## 4. Les métriques et leurs formules

### Visibilité

Visibilité = réponses mentionnant la marque ÷ réponses mesurées × 100.

Elle est calculée globalement, par moteur, par question et par périmètre (head / longue traîne). La visibilité par langue est la moyenne des visibilités des questions de cette langue.

### Part des recommandations IA

Part = réponses citant la marque ÷ total des citations de la marque et de ses concurrents suivis × 100.

Cette part est calculée uniquement parmi les concurrents que vous suivez. Ce n'est pas une part de l'ensemble du marché.

### Position moyenne

Position moyenne = rang moyen de la marque dans les réponses où elle est citée. 1 signifie que la marque est nommée en premier. Si la marque n'est jamais citée, la valeur est vide, pas 0.

### Sentiment

Sentiment = moyenne de 100 (positif), 50 (neutre) et 0 (négatif), sur les réponses où la marque est citée.

### Sources principales

Sources principales = fréquence des domaines cités par les moteurs. Seules les URL réellement citées comptent. Les URL de redirection sont résolues vers leur domaine final.

## 5. Précision et confiance

### Pourquoi les réponses varient

La même question posée deux fois peut produire deux réponses différentes. C'est normal pour ces moteurs. C'est pourquoi nous posons chaque question 3 fois et associons un intervalle de confiance aux résultats.

### Par question : intervalle de Wilson

Pour chaque question, nous calculons un intervalle de Wilson à 95 % (z = 1,96) sur son taux de mention. Confiance = 100 × (1 − largeur de l'intervalle). Un intervalle étroit signifie un résultat stable.

### Par rapport : bootstrap

Pour le score global, nous rééchantillonnons les questions 1 000 fois avec remise (bootstrap, graine fixe 20260830, donc résultat reproductible). Nous calculons le score pour chaque rééchantillon.

Largeur = 2 × 1,96 × écart-type des scores rééchantillonnés. Confiance = 100 × (1 − largeur).

### Pourquoi le ± est affiché au niveau du rapport

Le ± affiché dans le tableau de bord décrit le score du rapport, pas une question isolée. Une question seule a trop peu de réponses pour un ± significatif. L'intervalle au niveau du rapport indique de combien le score bougerait si le jeu de questions avait été légèrement différent.

## 6. Textes du rapport et anti-hallucination

### Analyses

Les analyses sont rédigées par GPT-4o-mini (température 0,4). Elles sont écrites uniquement à partir des chiffres calculés, et uniquement sur les moteurs mesurés.

### Vérification

Une seconde passe (température 0) contrôle chaque nom de moteur et chaque chiffre du texte par rapport aux données. En cas d'erreur, le texte est régénéré une fois.

### Plan d'action

Le plan d'action (température 0,5) s'appuie sur votre secteur, votre ville et les sources principales observées.

### Filtres déterministes

Après génération, des filtres déterministes suppriment toute mention d'un moteur non mesuré dans le rapport.

### Résumé exécutif

Le résumé exécutif en 5 lignes est calculé directement à partir des données, pas par un modèle de langage.

## 7. Ce que nous ne mesurons pas (encore)

Nous préférons énoncer nos limites clairement.

- **Moteurs non couverts.** Google AI Overviews et AI Mode, Copilot et Grok ne sont pas mesurés aujourd'hui.
- **Variation naturelle.** Les réponses varient d'une passe à l'autre. Trois passes et un intervalle de confiance réduisent cet effet sans le supprimer.
- **Homonymes dans la même ville.** Deux entreprises du même nom, dans la même ville et le même secteur, ne peuvent pas être distinguées sans site web.
- **Volumes de requêtes.** Nous n'estimons pas combien d'utilisateurs réels posent chaque question.
- **Fréquence.** Les mesures sont hebdomadaires, pas quotidiennes.

## 8. Données et sécurité

### Historique

Chaque rapport et chaque réponse brute sont conservés. Le tableau de bord compare chaque rapport au précédent (seuil de variation : 1 point ; 0,2 pour la position) et affiche les tendances sur les 12 derniers rapports.

### Audit gratuit

L'audit gratuit du site pose 3 questions types à 2 moteurs (ChatGPT, Gemini), une fois chacune. La ville est obligatoire. C'est une indication, pas un rapport.

### Sécurité

- Nous utilisons uniquement les API officielles.
- Les données de chaque client sont isolées par compte (sécurité au niveau des lignes).
- Nous ne revendons aucune donnée.
- Vous pouvez résilier en un clic.

## 9. Versions

**Version du 12 septembre 2026.** Cette page change quand la méthode change.

---

Méthode validée par l'équipe AIVisib.
