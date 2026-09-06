# The Daily Fifth

Five surprising questions, memorable reveals, and a cabinet of ideas worth carrying into the rest of your day.

**Live prototype:** [brianeschoenberger-gif.github.io/the-daily-fifth](https://brianeschoenberger-gif.github.io/the-daily-fifth/)

This is a user-experience prototype for a daily curiosity habit. The quiz comes first: commit to a guess, see the answer, then follow its mechanism, hidden origins, downstream ripples, named concept, and source receipt. Confidence changes the points at stake without penalizing uncertainty. Progress, streak days, grace protection, saved Curiosity Cabinet cards, recall attempts, and mastery are stored locally; there are no accounts or live content feeds yet.

Saved discoveries return as active-recall prompts and advance through **Discovered → Remembered → Mastered**. One automatic grace day can bridge a single missed day. The original current-story format remains available beneath the game as optional weekly deep dives.

The archive currently contains three complete daily editions—fifteen discoveries in total—including two evergreen curiosity sets and one dated, coherent current-systems edition. Developing discoveries are visibly labeled and carry claim-specific caveats. Spoiler-free sharing creates a private challenge URL carrying the edition and score target; individual Cabinet facts can be copied with their named concept and primary source.

Cabinet cards are grouped into four thematic collections. Interest tuning marks matching questions as “For you” while deliberately retaining discoveries outside those choices as wildcards. A private, browser-local Learning Lab counts first-question activation, completion, active days, saves, shares, recalls, and confirmed real-world retellings; it intentionally does not optimize for time spent.

The Learning Lab can launch an explicit primer-first control session. Quiz-first remains the default, while the two flows record separate starts, completions, and completion rates for behavioral comparison.

## Run it locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm test
npm run build
```

## What to test

Ask a friend to use one edition without coaching. Afterward, have them complete the feedback card and copy the summary. The most important follow-up question is: **the next day, can they still explain the story and recall one useful detail?**

This prototype is designed to test five assumptions:

1. A cold question creates more curiosity than a primer-first lesson.
2. A strong reveal makes a wrong answer feel rewarding rather than punitive.
3. Origins, mechanisms, and second-order effects turn trivia into understanding.
4. Source receipts and explicit caveats preserve trust without slowing the game.
5. Streaks, confidence points, collection, and spoiler-free sharing encourage return visits without rewarding grind.

## Publishing

The included GitHub Actions workflow runs checks, creates a static export, and publishes `dist/client` to GitHub Pages on every push to `main`.

Every discovery carries at least two direct authoritative sources, a verification caveat, an evergreen flag, and a future callback question for spaced recall.

See [EDITORIAL.md](./EDITORIAL.md) for the repeatable research, review, and publication workflow behind each question.
