export type MetricName =
  | 'first_question_answered'
  | 'daily_completed'
  | 'reveal_expanded'
  | 'fact_saved'
  | 'result_shared'
  | 'fact_shared'
  | 'callback_reviewed'
  | 'deep_dive_opened'
  | 'retold_confirmed';

export type MetricEvent = {
  name: MetricName;
  at: string;
  editionId?: string;
  discoveryId?: string;
  value?: number;
  variant?: 'quiz-first' | 'primer-first';
};

const key = 'daily-fifth-metrics-v1';

export function readMetrics(): MetricEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function trackMetric(event: Omit<MetricEvent, 'at'>) {
  if (typeof window === 'undefined') return;
  const events = readMetrics();
  events.push({ ...event, at: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(events.slice(-500)));
}

export function summarizeMetrics(events: MetricEvent[]) {
  const count = (name: MetricName) =>
    events.filter((event) => event.name === name).length;
  const activeDays = new Set(events.map((event) => event.at.slice(0, 10))).size;
  const completionDays = [
    ...new Set(
      events
        .filter((event) => event.name === 'daily_completed')
        .map((event) => event.at.slice(0, 10)),
    ),
  ].sort();
  const dayNumber = (value: string) =>
    Date.parse(`${value}T00:00:00Z`) / 86_400_000;
  const returnedNextDay = completionDays.some(
    (day, index) =>
      index > 0 && dayNumber(day) - dayNumber(completionDays[index - 1]) === 1,
  );
  const sevenDayReturn =
    completionDays.length > 1 &&
    dayNumber(completionDays.at(-1)!) - dayNumber(completionDays[0]) >= 7;
  const weeklyGoalMet = completionDays.some((day, index) => {
    const start = dayNumber(day);
    return (
      completionDays
        .slice(index)
        .filter((candidate) => dayNumber(candidate) - start <= 6).length >= 3
    );
  });
  const funnel = (variant: 'quiz-first' | 'primer-first') => {
    const matching = events.filter((event) => event.variant === variant);
    const starts = matching.filter(
      (event) => event.name === 'first_question_answered',
    ).length;
    const completions = matching.filter(
      (event) => event.name === 'daily_completed',
    ).length;
    return {
      starts,
      completions,
      completionRate: starts ? Math.round((completions / starts) * 100) : 0,
    };
  };
  return {
    firstQuestions: count('first_question_answered'),
    completions: count('daily_completed'),
    saves: count('fact_saved'),
    shares: count('result_shared') + count('fact_shared'),
    recalls: count('callback_reviewed'),
    retold: count('retold_confirmed'),
    revealExpansions: count('reveal_expanded'),
    activeDays,
    returnedNextDay,
    sevenDayReturn,
    weeklyGoalMet,
    funnels: {
      quizFirst: funnel('quiz-first'),
      primerFirst: funnel('primer-first'),
    },
  };
}
