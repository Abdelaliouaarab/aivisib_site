# Un outil de visibilité IA qui publie sa méthode et la marge d'erreur de ses scores

AIVisib publie sa méthode de mesure en entier, formules et limites comprises, et affiche la marge d'erreur de chaque score. Chaque question est posée trois fois à chaque moteur, et chaque résultat est accompagné de sa précision (±) et d'un intervalle de confiance de Wilson.

## Pourquoi une marge d'erreur

Les IA ne donnent pas deux fois la même réponse. Un score calculé sur peu de réponses bouge donc tout seul : sur 30 réponses, un score de 23 % veut dire en réalité « entre 12 % et 41 % ». Sans marge d'erreur, on ne peut pas savoir si une hausse est un vrai progrès ou du bruit.

## Ce que nous affichons

- **La marge de chaque score** : par exemple « 23 %, à ± 5 points ».
- **Le nombre de réponses** sur lequel le score est calculé.
- **Un indice de confiance** pour l'ensemble du rapport.
- **Ce qui a vraiment changé** d'une semaine à l'autre, en écartant les variations trop petites pour être fiables.

## Ce que nous publions

- **La [méthodologie](/methodologie) complète** : comment les questions sont posées, comment une citation est comptée, les formules, et les limites.
- **Des [mesures réelles](/mesures)**, avec leurs chiffres.
- **Les limites, sans détour** : nous mesurons chaque semaine et non chaque jour, et un test gratuit sur 18 réponses reste un instantané.

## Comment la mesure est faite

1. Chaque question d'acheteur est posée trois fois à ChatGPT, Gemini, Perplexity et Claude, en session neutre, avec la recherche web.
2. Chaque réponse est lue et classée : marque citée ou non, rang, concurrents, sources.
3. Un contrôle vérifie que le nom de la marque figure vraiment dans la réponse, pour ne jamais compter une citation inventée.
4. Le score et sa marge sont calculés, puis comparés à la semaine précédente.

## Questions fréquentes

### Quelle est la marge d'erreur d'un rapport ?

Elle dépend du nombre de réponses. Sur quelques centaines de réponses par semaine, un écart de moins de huit points n'est en général pas significatif. Le rapport affiche la marge exacte.

### Pourquoi mesurer chaque semaine et non chaque jour ?

Un chiffre quotidien calculé sur peu de réponses bouge de plusieurs points sans raison. Trois passages par question, une fois par semaine, donnent un chiffre plus stable.

### La méthode est-elle publique ?

Oui, en entier, sur notre page [méthodologie](/methodologie).

---

*Pour comprendre comment distinguer un vrai changement du bruit, lisez notre [guide sur les scores de visibilité IA](/guide/real-change-or-noise). Voir aussi : [les quatre moteurs inclus](/ai-visibility-tool-with-claude-and-gemini-included), [le test gratuit](/free-ai-visibility-check).*
