import { describe, expect, it } from 'vitest';

import { dailyEditions } from './daily';

describe('daily curiosity edition', () => {
  it('contains multiple five-question editions with distinct discoveries', () => {
    expect(dailyEditions.length).toBeGreaterThanOrEqual(2);
    const allDiscoveries = dailyEditions.flatMap(
      (edition) => edition.discoveries,
    );
    expect(new Set(allDiscoveries.map((item) => item.id)).size).toBe(
      allDiscoveries.length,
    );

    for (const edition of dailyEditions) {
      expect(edition.discoveries).toHaveLength(5);
    }
    for (const discovery of allDiscoveries) {
      expect(discovery.choices).toHaveLength(4);
      expect(discovery.correct).toBeGreaterThanOrEqual(0);
      expect(discovery.correct).toBeLessThan(4);
      expect(discovery.surprise.length).toBeGreaterThan(80);
      expect(discovery.mechanism.length).toBeGreaterThan(80);
      expect(discovery.origins.length).toBeGreaterThan(80);
      expect(discovery.ripples.length).toBeGreaterThan(80);
      expect(discovery.namedConcept.term).not.toBe('');
      expect(discovery.rabbitHole.length).toBeGreaterThan(40);
      expect(discovery.callback.prompt).not.toBe('');
      expect([
        'Science & Nature',
        'Deep History',
        'Hidden Systems',
        'Human Ingenuity',
      ]).toContain(discovery.collection);
    }
  });

  it('meets the editorial sourcing and quality bar', () => {
    for (const discovery of dailyEditions.flatMap(
      (edition) => edition.discoveries,
    )) {
      expect(discovery.sources.length).toBeGreaterThanOrEqual(2);
      expect(
        discovery.sources.every((source) => source.url.startsWith('https://')),
      ).toBe(true);
      expect(discovery.verificationNote).not.toBe('');
      expect(discovery.surpriseScore).toBeGreaterThanOrEqual(4);
      expect(discovery.tellabilityScore).toBeGreaterThanOrEqual(4);
      expect(typeof discovery.evergreen).toBe('boolean');
    }
  });

  it('marks the dated current-systems edition as developing information', () => {
    const current = dailyEditions.find(
      (edition) => edition.id === 'current-systems-001',
    );
    expect(current).toBeDefined();
    expect(
      current?.discoveries.every((discovery) => !discovery.evergreen),
    ).toBe(true);
    expect(
      current?.discoveries.every(
        (discovery) => discovery.verificationNote.length > 60,
      ),
    ).toBe(true);
  });
});
