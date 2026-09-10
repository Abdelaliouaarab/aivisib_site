s = open('index.html', encoding='utf8').read()
reps = [
# ===== FONCTIONNEMENT (3 étapes) =====
('s1p:"Your name, your rivals, your industry. AIVisib auto-writes the real questions your buyers ask AI."',
 's1p:"Your name, your rivals, your industry. AIVisib writes the real questions your buyers ask AI — and every question is vetted against reality before it counts."'),
('s2p:"Every week we run those questions through ChatGPT, Gemini, Perplexity and Claude — in three languages."',
 's2p:"Every week we ask ChatGPT, Gemini, Perplexity and Claude — with live web search, several passes per question, in three languages. We record what your buyers actually see."'),
('s3p:"A clear scoreboard: who gets named, which sources the AIs trust, and the actions that move you up."',
 's3p:"A clear scoreboard with its precision printed on it: who gets named, what changed since last week, which sources the AIs trust — and the actions that move you up."'),
('s1p:"Votre nom, vos concurrents, votre secteur. AIVisib rédige automatiquement les vraies questions posées aux IA."',
 's1p:"Votre nom, vos concurrents, votre secteur. AIVisib rédige les vraies questions que vos acheteurs posent aux IA — et chaque question est contrôlée face au réel avant de compter."'),
('s2p:"Chaque semaine, ces questions passent par ChatGPT, Gemini, Perplexity et Claude — en trois langues."',
 's2p:"Chaque semaine, nous interrogeons ChatGPT, Gemini, Perplexity et Claude — avec recherche web active, plusieurs passages par question, en trois langues. Nous enregistrons ce que vos acheteurs voient réellement."'),
('s3p:"Un tableau clair : qui est cité, quelles sources les IA utilisent, et les actions qui vous font monter."',
 's3p:"Un tableau clair, avec sa précision affichée : qui est cité, ce qui a changé depuis la semaine dernière, quelles sources les IA utilisent — et les actions qui vous font monter."'),
('s1p:"اسم علامتك، منافسوك، قطاعك — ويكتب AIVisib تلقائياً الأسئلة الحقيقية التي يطرحها عملاؤك."',
 's1p:"اسم علامتك، منافسوك، قطاعك — يكتب AIVisib الأسئلة الحقيقية التي يطرحها عملاؤك على الذكاء الاصطناعي، ويُدقَّق كل سؤال على أرض الواقع قبل أن يُحتسب."'),
('s2p:"كل أسبوع نطرح هذه الأسئلة على ChatGPT، Gemini، Perplexity، Claude — بثلاث لغات."',
 's2p:"كل أسبوع نسأل ChatGPT وGemini وPerplexity وClaude — مع بحث مباشر في الويب، وعدة جولات لكل سؤال، وبثلاث لغات. نسجّل ما يراه المشترون فعلًا."'),
('s3p:"لوحة واضحة: من يُذكر، وما المصادر التي تثق بها المحركات، وما الإجراءات التي ترفع ترتيبك."',
 's3p:"لوحة واضحة مع دقتها المعلنة: من يُذكر، وما الذي تغيّر منذ الأسبوع الماضي، وما المصادر التي تثق بها المحركات — وما الإجراءات التي ترفع ترتيبك."'),

# ===== FONCTIONNALITÉS =====
# f2 : part des recommandations + sentiment fusionné
('f2p:"See precisely who gets recommended instead of you — per question, per engine, per language."',
 'f2p:"See precisely who gets recommended instead of you — and how you are described when you appear — per question, per engine, per language."'),
('f2p:"Voyez précisément qui est recommandé à votre place — par question, par moteur, par langue."',
 'f2p:"Voyez précisément qui est recommandé à votre place — et comment on parle de vous quand vous apparaissez — par question, par moteur, par langue."'),
('f2p:"شاهد بدقة من يُوصى به بدلاً منك — لكل سؤال، ولكل محرك، ولكل لغة."',
 'f2p:"شاهد بدقة من يُوصى به بدلاً منك — وكيف يوصَف اسمك عندما تظهر — لكل سؤال، ولكل محرك، ولكل لغة."'),
# f4 : Sentiment → Chiffres contrôlés (savoir-faire statistique, sans révéler la recette)
('f4t:"Sentiment"', 'f4t:"Numbers you can defend"'),
('f4p:"Praised, ignored, or described with outdated facts? Catch it before your customers do."',
 'f4p:"Every score goes through our in-house statistical filters and anti-hallucination guards before it reaches your report — and ships with its precision printed next to it. No other tool shows you that."'),
('f4t:"Sentiment"', 'PLACEHOLDER1'),
('f4p:"Vanté, ignoré, ou décrit avec des infos obsolètes ? Détectez-le avant vos clients."',
 'f4p:"Chaque score passe par nos filtres statistiques et nos garde-fous anti-hallucination maison avant d\\'atteindre votre rapport — et s\\'affiche avec sa marge de précision. Aucun autre outil ne vous montre ça."'),
('f4t:"تحليل الانطباع"', 'f4t:"أرقام يمكنك الدفاع عنها"'),
('f4p:"مُشاد به، متجاهَل، أم موصوف بمعلومات قديمة؟ اكتشف ذلك قبل عملائك."',
 'f4p:"يمرّ كل رقم عبر مرشحاتنا الإحصائية وضوابطنا الخاصة ضد الهلوسة قبل أن يصل إلى تقريرك — ويُعرض مع هامش دقته. لا توجد أداة أخرى تريك ذلك."'),
# f7 : Weekly → Conditions réelles + hebdo
('f7t:"Weekly tracking"', 'f7t:"Measured in real conditions"'),
('f7p:"AI answers shift constantly. We watch them so you don\\'t have to."', 'PLACEHOLDER2'),
("f7p:\"AI answers shift constantly. We watch them so you don't have to.\"",
 "f7p:\"We query the engines with live web search — the same answers your buyers get today, not what the models memorised months ago. And we re-measure every week, so you see movement, not snapshots.\""),
('f7t:"Suivi hebdomadaire"', 'f7t:"Mesuré en conditions réelles"'),
('f7p:"Les réponses des IA changent sans cesse. Nous les surveillons à votre place."',
 'f7p:"Nous interrogeons les moteurs avec recherche web active — les réponses que vos acheteurs obtiennent aujourd\\'hui, pas ce que les modèles ont mémorisé il y a des mois. Et nous re-mesurons chaque semaine : vous voyez le mouvement, pas des instantanés."'),
('f7t:"متابعة أسبوعية"', 'f7t:"قياس في ظروف حقيقية"'),
('f7p:"إجابات الذكاء الاصطناعي تتغير باستمرار. نحن نراقبها نيابةً عنك."',
 'f7p:"نسأل المحركات مع بحث مباشر في الويب — الإجابات نفسها التي يحصل عليها المشترون اليوم، لا ما حفظته النماذج قبل أشهر. ونعيد القياس كل أسبوع لترى الحركة، لا لقطات جامدة."'),
]
missing = []
for a, b in reps:
    if b.startswith('PLACEHOLDER'): continue
    if a in s: s = s.replace(a, b, 1)
    else: missing.append(a)
open('index.html', 'w', encoding='utf8').write(s)
print('missing', len(missing))
for m in missing: print('  -', m[:80])
