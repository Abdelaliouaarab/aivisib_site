# AI visibility scores: how to tell a real change from noise

A visibility score is not a fact, it is an estimate made from a sample of answers. On 30 answers, a score of 23% could really be anywhere between 12% and 41%. On 300 answers, the same 23% narrows to 19–28%. So before asking whether your score went up, ask how many answers it was built on — because a move from 23% to 28% on 300 answers means nothing at all, while a move to 31% does.

This guide explains how to read those numbers, and how to tell, week after week, whether something actually changed.

## Why AI answers move on their own

Four different things make the same question return different names, none of which has anything to do with your marketing.

- **The models sample.** A language model draws its words rather than looking them up. Ask three times, get three lists.
- **The live web moves.** Assistants with search quote pages that are reindexed, reranked and republished constantly.
- **Personalisation.** Account history, memory and location change the answer for the same question.
- **The question set.** Twenty questions are a sample of the thousands your customers could ask. Change the twenty and you change the score.

A serious measurement cannot remove this variation. It can only measure it and tell you how big it is.

## What your score actually is

If you appear in 7 answers out of 30, your score is 23%. That figure is an estimate of an invisible true value, and its precision depends almost entirely on how many answers you counted.

Here is what a 23% score is really worth, at 95% confidence:

| Answers counted | Score | Plausible range | Precision |
|---|---|---|---|
| 18 | 23% | 9 – 45% | ±18 points |
| 30 | 23% | 12 – 41% | ±15 points |
| 72 | 23% | 15 – 35% | ±10 points |
| 100 | 23% | 16 – 32% | ±8 points |
| 300 | 23% | 19 – 28% | ±5 points |
| 720 | 23% | 20 – 26% | ±3 points |

Two practical rules follow. To reach a precision of ±10 points, you need about 66 answers. To reach ±5 points, about 270. Below thirty answers, you are not measuring, you are sampling a rumour.

And the extreme case from everyday life: ask one question three times, get named once. That is 33% — with a plausible range of 6% to 79%. That single number is worthless, and it is exactly what someone does when they type their own brand into ChatGPT and draw a conclusion.

## Why we use the Wilson interval

The formula most people remember from school breaks down precisely where AI visibility lives: small samples, and proportions close to zero. Most brands start at 0, 3 or 7%, and the textbook formula happily returns a lower bound below zero, which is meaningless.

The Wilson interval is built for that case. It stays inside 0–100%, stays honest on small samples, and it is what we use for every figure we publish. The full formula is in our methodology, and you are welcome to check our arithmetic.

## Daily tracking is not more precision

This is the most common misunderstanding in our market, and it is worth being precise about, because several tools measure daily and it sounds better.

Take twenty questions on four engines. Measured once a day, that is 80 answers a day — a precision of about ±9 points. Measured three times a week, that is 240 answers a week — about ±6 points. The daily chart looks alive, with a number moving every morning. Most of that movement is the sampling noise of ±9, not your market.

There is a real case for daily: catching an incident, a competitor's campaign, a sudden change in an engine. But for the question *"is my visibility improving?"*, a noisier number delivered more often answers it worse, not better. We chose weekly with three passes for that reason, and we say so openly — if you need daily signals, tools that do it exist, and we name them on our comparison page.

## How to tell a real change from noise

Week over week, compare the ranges, not the numbers.

On 300 answers a week, starting from 23%:

- 26% next week — inside the margin, no conclusion.
- 28% — still inside, no conclusion, even though it looks like a five-point gain.
- 29% — not conclusive either, though it is starting to be interesting.
- 31% — now the difference is larger than the noise. Something changed.

So on this sample size, you need roughly eight points of movement before you can claim anything. If you want to detect a three-point improvement, you need three to four times more answers. That is a cost, and it is the honest trade-off nobody in this market puts on the table.

The other way to see a real change earlier is the trend: four consecutive weeks moving in the same direction mean more than one large jump, even when each individual week is inside its margin.

## What the margin does not cover

The confidence interval only covers sampling. Three other things can move your score without any statistics warning you.

- **The question list.** Add or remove questions and you are measuring something else. Keep the list stable, and when you do change it, restart the history rather than pretending it continues.
- **Model updates.** A new version of an engine can redraw the whole landscape overnight. This is real change, not noise, but it is not your doing either.
- **The engine mix.** A score averaged over four engines drops if one of them stops answering. Always read the per-engine breakdown before concluding anything about the average.

## Five questions to ask any vendor

Whatever tool you use, ours included, these five answers tell you whether you are buying a measurement or a decoration.

1. **How many answers is my score computed from, per week?** If the answer is vague, everything else is decoration.
2. **How many times is each question asked?** One pass per day is one draw, not a measurement.
3. **Is a margin of error shown next to the score?** If not, ask why. There always is one; the only question is whether you are shown it.
4. **Which engines are included in the plan I am buying**, and what happens to the average when one fails?
5. **Is the methodology published?** Not a marketing page — the formulas, the sample sizes, and the limits.

We publish all five, including the places where our own figures are weak. Our free check runs eighteen answers, which is ±18 points: enough to see whether you are near zero or clearly present, not enough to settle a discussion. We would rather write that than let you quote a number that cannot support the weight.

---

*Our full method, including the Wilson formula, the number of passes and what we do not measure, is published in our methodology. You can run a free check on your own brand from our homepage, with no account and no credit card — and now you know exactly how much to trust the number it gives you.*
