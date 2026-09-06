import { describe, expect, it } from 'vitest';

import { type MetricEvent, summarizeMetrics } from './metrics';

describe('prototype learning metrics', () => {
  it('summarizes product actions without optimizing time spent', () => {
    const events: MetricEvent[] = [
      {
        name: 'first_question_answered',
        at: '2026-09-05T10:00:00Z',
        variant: 'quiz-first',
      },
      {
        name: 'daily_completed',
        at: '2026-09-05T10:03:00Z',
        variant: 'quiz-first',
      },
      { name: 'fact_saved', at: '2026-09-05T10:03:01Z' },
      { name: 'fact_shared', at: '2026-09-05T10:03:02Z' },
      { name: 'result_shared', at: '2026-09-06T10:00:00Z' },
      {
        name: 'first_question_answered',
        at: '2026-09-06T10:00:20Z',
        variant: 'quiz-first',
      },
      {
        name: 'daily_completed',
        at: '2026-09-06T10:00:30Z',
        variant: 'quiz-first',
      },
      { name: 'reveal_expanded', at: '2026-09-06T10:00:40Z' },
      { name: 'callback_reviewed', at: '2026-09-06T10:01:00Z' },
      { name: 'retold_confirmed', at: '2026-09-06T10:01:10Z' },
      { name: 'daily_completed', at: '2026-09-11T10:00:00Z' },
      { name: 'daily_completed', at: '2026-09-12T10:00:00Z' },
    ];

    expect(summarizeMetrics(events)).toEqual({
      firstQuestions: 2,
      completions: 4,
      saves: 1,
      shares: 2,
      recalls: 1,
      retold: 1,
      revealExpansions: 1,
      activeDays: 4,
      returnedNextDay: true,
      sevenDayReturn: true,
      weeklyGoalMet: true,
      funnels: {
        quizFirst: { starts: 2, completions: 2, completionRate: 100 },
        primerFirst: { starts: 0, completions: 0, completionRate: 0 },
      },
    });
  });
});
