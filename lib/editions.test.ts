import { describe, expect, it } from 'vitest';

import { editions } from './editions';

describe('edition content', () => {
  it('ships three complete, distinct editions', () => {
    expect(editions).toHaveLength(3);
    expect(new Set(editions.map((edition) => edition.id)).size).toBe(3);
  });

  it.each(editions)('$id has a five-question learning loop', (edition) => {
    expect(edition.primer.length).toBeGreaterThanOrEqual(3);
    expect(edition.questions).toHaveLength(5);
    expect(edition.conversation.facts).toHaveLength(3);

    for (const question of edition.questions) {
      expect(question.choices).toHaveLength(4);
      expect(question.correct).toBeGreaterThanOrEqual(0);
      expect(question.correct).toBeLessThan(question.choices.length);
      expect(edition.sources[question.source]).toBeDefined();
    }
  });

  it('uses direct HTTPS source links', () => {
    for (const source of editions.flatMap((edition) => edition.sources)) {
      expect(source.url).toMatch(/^https:\/\//);
    }
  });
});
