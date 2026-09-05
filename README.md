# The Daily Fifth

One important story, five questions, and a conversation kit worth carrying into the rest of your day.

**Live prototype:** [brianeschoenberger-gif.github.io/the-daily-fifth](https://brianeschoenberger-gif.github.io/the-daily-fifth/)

This is a user-experience prototype for a personal daily news-learning habit. It contains three hand-curated, source-backed sample editions with a U.S. emphasis and one major global story. Progress is saved locally in the browser; there are no accounts, APIs, or live news ingestion yet.

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

This prototype is designed to test four assumptions:

1. One clearly chosen story feels more inviting than a feed.
2. A short primer provides enough context to make a quiz feel fair.
3. Explanations and sources create learning rather than trivia.
4. The Conversation Kit makes the experience socially useful.

## Publishing

The included GitHub Actions workflow runs checks, creates a static export, and publishes `dist/client` to GitHub Pages on every push to `main`.

Story photography is credited in the interface. Editorial facts and quiz explanations link directly to their supporting sources.
