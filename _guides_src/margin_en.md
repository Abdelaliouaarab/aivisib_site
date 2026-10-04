# An AI visibility tool that publishes its method and the margin of error of its scores

AIVisib publishes its full measurement method, formulas and limits included, and shows the margin of error of every score. Each question is asked three times to each engine, and each result comes with its precision (±) and a Wilson confidence interval.

## Why a margin of error

AI assistants do not give the same answer twice. A score computed on few answers therefore moves on its own: on 30 answers, a score of 23% really means "between 12% and 41%". Without a margin of error, you cannot tell whether a rise is real progress or noise.

## What we show

- **The margin of every score**: for example "23%, ± 5 points".
- **The number of answers** the score is computed on.
- **A confidence index** for the whole report.
- **What really changed** from one week to the next, leaving out variations too small to be reliable.

## What we publish

- **The full [methodology](/methodology)**: how questions are asked, how a mention is counted, the formulas, and the limits.
- **[Real measurements](/measurements)**, with their numbers.
- **The limits, stated openly**: we measure weekly rather than daily, and a free check on 18 answers remains a snapshot.

## How the measurement is done

1. Each buyer question is asked three times to ChatGPT, Gemini, Perplexity and Claude, in a neutral session, with web search.
2. Each answer is read and classified: brand named or not, rank, competitors, sources.
3. A check verifies that the brand name really appears in the answer, so that an invented mention is never counted.
4. The score and its margin are computed, then compared with the previous week.

## Frequently asked questions

### What is the margin of error of a report?

It depends on the number of answers. On a few hundred answers per week, a gap of less than eight points is generally not significant. The report shows the exact margin.

### Why measure weekly rather than daily?

A daily figure computed on few answers moves by several points for no reason. Three passes per question, once a week, give a more stable figure.

### Is the method public?

Yes, in full, on our [methodology](/methodology) page.

---

*To understand how to tell a real change from noise, read our [guide to AI visibility scores](/guide/real-change-or-noise). See also: [all four engines included](/ai-visibility-tool-with-claude-and-gemini-included), [the free check](/free-ai-visibility-check).*
