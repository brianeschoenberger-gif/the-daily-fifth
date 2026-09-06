import { describe, expect, it } from 'vitest';

import {
  calculateStreak,
  emptyGame,
  masteryLabel,
  recordCompletion,
} from './game';

const localDate = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day, 12);

describe('daily-game progress', () => {
  it('activates a completion once and counts a contiguous streak', () => {
    const day = localDate(2026, 9, 5);
    const first = recordCompletion(emptyGame(), day);
    const duplicate = recordCompletion(first, day);

    expect(duplicate.completedOn).toEqual(['2026-09-05']);
    expect(calculateStreak(duplicate.completedOn, day)).toBe(1);
  });

  it('automatically spends one grace day on a single-day gap', () => {
    const game = { ...emptyGame(), completedOn: ['2026-09-03'] };
    const completed = recordCompletion(game, localDate(2026, 9, 5));

    expect(completed.completedOn).toEqual([
      '2026-09-03',
      '2026-09-04',
      '2026-09-05',
    ]);
    expect(completed.freezeDates).toEqual(['2026-09-04']);
    expect(completed.streakFreezes).toBe(0);
    expect(calculateStreak(completed.completedOn, localDate(2026, 9, 5))).toBe(
      3,
    );
  });

  it('does not hide a longer gap or spend unavailable grace', () => {
    const game = { ...emptyGame(), completedOn: ['2026-09-01'] };
    const completed = recordCompletion(game, localDate(2026, 9, 5));

    expect(completed.completedOn).toEqual(['2026-09-01', '2026-09-05']);
    expect(completed.streakFreezes).toBe(1);
    expect(calculateStreak(completed.completedOn, localDate(2026, 9, 5))).toBe(
      1,
    );
  });

  it('caps mastery labels at Mastered', () => {
    expect(masteryLabel()).toBe('Discovered');
    expect(masteryLabel(1)).toBe('Remembered');
    expect(masteryLabel(9)).toBe('Mastered');
  });
});
