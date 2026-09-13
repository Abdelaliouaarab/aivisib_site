# Methodology

AIVisib measures whether ChatGPT, Gemini, Perplexity and Claude recommend your business. We publish this page so you can judge our numbers on their merits, not on our word.

## 1. The questions

### How questions are generated

Questions are generated for each brand from three inputs: its sector, its city and its languages. The list is built in several steps.

1. **Neighbourhoods.** GPT-4o proposes neighbourhoods of the city. Each one is verified against OpenStreetMap (Nominatim, bounded to the city). Unverified places are dropped.
2. **Drafts.** GPT-4o-mini (temperature 0.9) writes candidate questions, with 40% more than needed. The set mixes broad, city-level questions and long-tail questions naming a real neighbourhood or a precise need.
3. **Alphabet guard.** Arabic questions contain no Latin letters, and Latin-script questions contain no Arabic letters.
4. **Review.** GPT-4o (temperature 0) rejects questions that are unrealistic, outside the sector or that name a place not in the verified list.
5. **De-duplication.** Each question is embedded with text-embedding-3-small. Two questions with cosine similarity above 0.85 are treated as paraphrases, and one is removed.

### Your control

You can edit or delete every question before saving. Nothing is measured without your approval of the list.

### Head and long-tail

Each question is tagged "head" (broad, city-level) or "long-tail" (specific neighbourhood or need). Metrics are reported for both scopes.

## 2. The engines and how we ask

### Engines and settings

| Engine | Model and configuration |
|---|---|
| ChatGPT | OpenAI Responses API with web search, search context size "low", approximate user location set to your city and country |
| Gemini | Gemini 2.5 Flash with Google Search grounding, temperature 0.6 |
| Perplexity | Sonar, live web search, temperature 0.6 |
| Claude | Claude Haiku 4.5 with web search (at most 2 searches), temperature 0.6, 1024 output tokens |

### The same instruction for every engine

All four engines receive the same neutral system prompt: answer naturally, name real businesses, reply in the language of the question.

### Neutral state

There is no memory, no personalisation and no logged-in account. Each question starts from a clean state, close to what a new user would see.

### Passes and schedule

Every question is asked 3 times per engine, every week. For a typical brand, 16 questions × 4 engines × 3 passes give 192 answers per report.

Calls run in parallel (pool of 6), with 3 retries on temporary errors.

### When we refuse to report

If fewer than 50% of calls succeed, no report is issued. We never publish a false 0%. An engine with zero successful answers is shown as "not measured", never as 0%.

## 3. How we count a mention

### The analyser

Each answer is read by GPT-4o-mini at temperature 0. It returns structured JSON: brand mentioned (yes/no), rank from 1 to 10 among named businesses, tracked competitors mentioned, other brands, cited sources, and sentiment (positive, neutral, negative).

### Two deterministic guards

The analyser's output is never trusted alone. Two rules apply after it.

1. **Literal presence.** The brand name must appear literally in the answer text. If it does not, the mention is discarded.
2. **Homonym guard.** The analyser receives the business identity: sector, city, country, and website if provided. A mention that clearly refers to a different business with the same name elsewhere is not counted.

### Competitors

A tracked competitor counts at most once per answer, however many times it is named.

## 4. The metrics and their formulas

### Visibility

Visibility = answers mentioning the brand ÷ measured answers × 100.

It is computed overall, per engine, per question and per scope (head / long-tail). Visibility per language is the mean of the visibilities of the questions in that language.

### Share of AI recommendations

Share = answers citing the brand ÷ total citations of the brand and its tracked competitors × 100.

This share is computed only among the competitors you track. It is not a share of the whole market.

### Average position

Average position = mean rank of the brand in the answers where it is cited. 1 means the brand is named first. If the brand is never cited, the value is null, not 0.

### Sentiment

Sentiment = mean of 100 (positive), 50 (neutral) and 0 (negative), over the answers where the brand is cited.

### Top sources

Top sources = frequency of the domains cited by the engines. Only URLs actually cited count. Redirect URLs are resolved to their final domain.

## 5. Precision and confidence

### Why answers vary

The same question asked twice can produce different answers. This is normal for these engines. That is why we ask each question 3 times and attach a confidence interval to the results.

### Per question: Wilson interval

For each question, we compute a Wilson 95% interval (z = 1.96) on its mention rate. Confidence = 100 × (1 − interval width). A narrow interval means a stable result.

### Per report: bootstrap

For the overall score, we resample the questions 1,000 times with replacement (bootstrap, fixed seed 20260830, so the result is reproducible). We compute the score for each resample.

Width = 2 × 1.96 × standard deviation of the resampled scores. Confidence = 100 × (1 − width).

### Why ± is shown at report level

The ± shown in the dashboard describes the report score, not a single question. A single question has too few answers for a meaningful ± on its own. The report-level interval reflects how much the score would move if the question set had been slightly different.

## 6. Texts of the report and anti-hallucination

### Insights

Insights are written by GPT-4o-mini (temperature 0.4). They are written only from the computed numbers, and only about measured engines.

### Verification

A second pass (temperature 0) checks every engine name and figure in the text against the data. If something is wrong, the text is regenerated once.

### Action plan

The action plan (temperature 0.5) is anchored on your sector, your city and the top sources observed.

### Deterministic filters

After generation, deterministic filters remove any mention of an engine that was not measured in the report.

### Executive summary

The 5-line executive summary is computed directly from the data, not by a language model.

## 7. What we do not measure (yet)

We prefer to state limits plainly.

- **Engines not covered.** Google AI Overviews and AI Mode, Copilot and Grok are not measured today.
- **Natural variation.** Answers vary between passes. Three passes and a confidence interval reduce this effect but do not remove it.
- **Homonyms in the same city.** Two businesses with the same name, in the same city and sector, cannot be told apart without a website.
- **Prompt volumes.** We do not estimate how many real users ask each question.
- **Frequency.** Measurements are weekly, not daily.

## 8. Data and security

### History

Every report and every raw answer is stored. The dashboard compares each report to the previous one (change threshold: 1 point; 0.2 for position) and shows trends over the last 12 reports.

### Free audit

The free audit on the website asks 3 template questions to 2 engines (ChatGPT, Gemini), once each. A city is required. It is an indication, not a report.

### Security

- We use official APIs only.
- Client data is isolated per account with row-level security.
- We do not resell data.
- You can cancel in one click.

## 9. Versions

**Version dated 12 September 2026.** This page changes when the method changes.

---

Method validated by the AIVisib team.
