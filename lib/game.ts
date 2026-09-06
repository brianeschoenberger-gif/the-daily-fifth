import type { Confidence } from './daily';

export type GameState = {
  editionId: string;
  answers: Array<number | null>;
  confidence: Array<Confidence | null>;
  current: number;
  saved: string[];
  savedOn: Record<string, string>;
  completedOn: string[];
  streakFreezes: number;
  freezeDates: string[];
  mastery: Record<string, number>;
  reviewAttempts: Record<string, number>;
  interests: string[];
  retoldOn: string[];
};

export const emptyGame = (
  questionCount = 5,
  editionId = 'origins-and-ripples-001',
): GameState => ({
  editionId,
  answers: Array(questionCount).fill(null),
  confidence: Array(questionCount).fill(null),
  current: 0,
  saved: [],
  savedOn: {},
  completedOn: [],
  streakFreezes: 1,
  freezeDates: [],
  mastery: {},
  reviewAttempts: {},
  interests: [],
  retoldOn: [],
});

export const dateKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const shiftDate = (date: Date, days: number) => {
  const shifted = new Date(date);
  shifted.setDate(shifted.getDate() + days);
  return dateKey(shifted);
};

export function calculateStreak(days: string[], now = new Date()) {
  const unique = new Set(days);
  const cursor = new Date(now);
  if (!unique.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (unique.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function recordCompletion(game: GameState, now = new Date()) {
  const today = dateKey(now);
  if (game.completedOn.includes(today)) return game;
  const completedOn = [...game.completedOn];
  const freezeDates = [...game.freezeDates];
  let streakFreezes = game.streakFreezes;
  const yesterday = shiftDate(now, -1);
  const twoDaysAgo = shiftDate(now, -2);
  if (
    !completedOn.includes(yesterday) &&
    completedOn.includes(twoDaysAgo) &&
    streakFreezes > 0
  ) {
    completedOn.push(yesterday);
    freezeDates.push(yesterday);
    streakFreezes -= 1;
  }
  completedOn.push(today);
  return { ...game, completedOn, freezeDates, streakFreezes };
}

export const masteryLabel = (level = 0) =>
  ['Discovered', 'Remembered', 'Mastered'][Math.min(level, 2)];
