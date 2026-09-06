'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  Brain,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  History,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confidence, dailyEditions, type Discovery } from '@/lib/daily';
import { editions } from '@/lib/editions';
import {
  calculateStreak,
  dateKey,
  emptyGame,
  GameState,
  masteryLabel,
  recordCompletion,
} from '@/lib/game';
import { readMetrics, summarizeMetrics, trackMetric } from '@/lib/metrics';

const confidencePoints: Record<Confidence, number> = {
  guessing: 100,
  'pretty-sure': 125,
  certain: 150,
};
const confidenceLabels: Array<{ value: Confidence; label: string }> = [
  { value: 'guessing', label: 'Guessing' },
  { value: 'pretty-sure', label: 'Pretty sure' },
  { value: 'certain', label: 'Certain' },
];
const allDiscoveries = dailyEditions.flatMap((item) => item.discoveries);
const collections = [
  'Science & Nature',
  'Deep History',
  'Hidden Systems',
  'Human Ingenuity',
];
const emptyMetricSummary = {
  firstQuestions: 0,
  completions: 0,
  saves: 0,
  shares: 0,
  recalls: 0,
  retold: 0,
  revealExpansions: 0,
  activeDays: 0,
  returnedNextDay: false,
  sevenDayReturn: false,
  weeklyGoalMet: false,
  funnels: {
    quizFirst: { starts: 0, completions: 0, completionRate: 0 },
    primerFirst: { starts: 0, completions: 0, completionRate: 0 },
  },
};
export default function Home() {
  const [game, setGame] = useState<GameState>(emptyGame);
  const [hydrated, setHydrated] = useState(false);
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [copied, setCopied] = useState('');
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [recallDraft, setRecallDraft] = useState('');
  const [reviewRevealed, setReviewRevealed] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<number | null>(null);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [metricSummary, setMetricSummary] = useState(emptyMetricSummary);
  const [experimentFlow, setExperimentFlow] = useState<
    'quiz-first' | 'primer-first'
  >('quiz-first');
  const [primerDismissed, setPrimerDismissed] = useState(false);
  const currentEdition =
    dailyEditions.find((item) => item.id === game.editionId) ??
    dailyEditions[0];
  const discoveries = currentEdition.discoveries;
  const discovery = discoveries[game.current];
  const selected = game.answers[game.current];
  const confidence = game.confidence[game.current];
  const answered = selected !== null;
  const finished = game.current >= discoveries.length;
  const correctCount = game.answers.filter(
    (answer, index) => answer === discoveries[index].correct,
  ).length;
  const score = game.answers.reduce<number>(
    (total, answer, index) =>
      answer === discoveries[index].correct
        ? total + confidencePoints[game.confidence[index] ?? 'guessing']
        : total,
    0,
  );
  const streak = calculateStreak(game.completedOn);
  const savedDiscoveries = useMemo(
    () => allDiscoveries.filter((item) => game.saved.includes(item.id)),
    [game.saved],
  );
  const reviewDiscovery = allDiscoveries.find((item) => item.id === reviewId);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('daily-fifth-game-v2');
      const requested = new URLSearchParams(window.location.search).get(
        'edition',
      );
      const challengeParam = new URLSearchParams(window.location.search).get(
        'challenge',
      );
      const flowParam = new URLSearchParams(window.location.search).get('flow');
      if (flowParam === 'primer-first')
        queueMicrotask(() => setExperimentFlow('primer-first'));
      const challenge = Number(challengeParam);
      if (
        challengeParam !== null &&
        Number.isFinite(challenge) &&
        challenge >= 0
      )
        queueMicrotask(() => setChallengeTarget(challenge));
      const requestedId = dailyEditions.some((item) => item.id === requested)
        ? requested!
        : undefined;
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<GameState>;
        if (Array.isArray(parsed.answers)) {
          const editionId =
            requestedId ?? parsed.editionId ?? dailyEditions[0].id;
          queueMicrotask(() =>
            setGame({ ...emptyGame(5, editionId), ...parsed, editionId }),
          );
        }
      } else if (requestedId) {
        queueMicrotask(() => setGame(emptyGame(5, requestedId)));
      }
    } catch {
      localStorage.removeItem('daily-fifth-game-v2');
    }
    queueMicrotask(() => setHydrated(true));
  }, []);
  useEffect(() => {
    if (hydrated)
      localStorage.setItem('daily-fifth-game-v2', JSON.stringify(game));
  }, [game, hydrated]);

  const chooseConfidence = (value: Confidence) => {
    if (answered) return;
    setGame((existing) => {
      const next = [...existing.confidence];
      next[existing.current] = value;
      return { ...existing, confidence: next };
    });
  };
  const chooseAnswer = (answer: number) => {
    if (answered) return;
    setGame((existing) => {
      const answers = [...existing.answers];
      const confidence = [...existing.confidence];
      answers[existing.current] = answer;
      confidence[existing.current] ??= 'guessing';
      const next = { ...existing, answers, confidence };
      return answers.filter((item) => item !== null).length >= 3
        ? recordCompletion(next)
        : next;
    });
    if (game.current === 0)
      trackMetric({
        name: 'first_question_answered',
        editionId: currentEdition.id,
        variant: experimentFlow,
      });
  };
  const nextQuestion = () => {
    if (game.current === discoveries.length - 1)
      trackMetric({
        name: 'daily_completed',
        editionId: currentEdition.id,
        value: score,
        variant: experimentFlow,
      });
    setGame((existing) => ({
      ...existing,
      current: Math.min(existing.current + 1, discoveries.length),
    }));
    setCopied('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const chooseEdition = (editionId: string) => {
    if (editionId === currentEdition.id) return;
    setGame((existing) => ({
      ...emptyGame(5, editionId),
      saved: existing.saved,
      savedOn: existing.savedOn,
      completedOn: existing.completedOn,
      streakFreezes: existing.streakFreezes,
      freezeDates: existing.freezeDates,
      mastery: existing.mastery,
      reviewAttempts: existing.reviewAttempts,
      interests: existing.interests,
      retoldOn: existing.retoldOn,
    }));
    setChallengeTarget(null);
    setExperimentFlow('quiz-first');
    setPrimerDismissed(false);
    window.history.replaceState(null, '', `?edition=${editionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleSaved = () => {
    if (!game.saved.includes(discovery.id))
      trackMetric({
        name: 'fact_saved',
        editionId: currentEdition.id,
        discoveryId: discovery.id,
      });
    setGame((existing) => {
      if (existing.saved.includes(discovery.id)) {
        const savedOn = { ...existing.savedOn };
        delete savedOn[discovery.id];
        return {
          ...existing,
          saved: existing.saved.filter((id) => id !== discovery.id),
          savedOn,
        };
      }
      return {
        ...existing,
        saved: [...existing.saved, discovery.id],
        savedOn: { ...existing.savedOn, [discovery.id]: dateKey() },
        mastery: {
          ...existing.mastery,
          [discovery.id]: existing.mastery[discovery.id] ?? 0,
        },
      };
    });
  };
  const restart = () => {
    setGame((existing) => ({
      ...emptyGame(5, currentEdition.id),
      saved: existing.saved,
      savedOn: existing.savedOn,
      completedOn: existing.completedOn,
      streakFreezes: existing.streakFreezes,
      freezeDates: existing.freezeDates,
      mastery: existing.mastery,
      reviewAttempts: existing.reviewAttempts,
      interests: existing.interests,
      retoldOn: existing.retoldOn,
    }));
    setCopied('');
    setPrimerDismissed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const startReview = (id: string) => {
    setReviewId(id);
    setRecallDraft('');
    setReviewRevealed(false);
  };
  const finishReview = (remembered: boolean) => {
    if (!reviewId) return;
    setGame((existing) => ({
      ...existing,
      mastery: {
        ...existing.mastery,
        [reviewId]: remembered
          ? Math.min((existing.mastery[reviewId] ?? 0) + 1, 2)
          : (existing.mastery[reviewId] ?? 0),
      },
      reviewAttempts: {
        ...existing.reviewAttempts,
        [reviewId]: (existing.reviewAttempts[reviewId] ?? 0) + 1,
      },
    }));
    setReviewId(null);
    setRecallDraft('');
    setReviewRevealed(false);
    trackMetric({
      name: 'callback_reviewed',
      discoveryId: reviewId,
      value: remembered ? 1 : 0,
    });
  };
  const shareResults = async () => {
    const marks = game.answers
      .map((answer, index) =>
        answer === discoveries[index].correct ? '🟨' : '⬛',
      )
      .join('');
    try {
      const challengeUrl = `${window.location.origin}${window.location.pathname}?edition=${currentEdition.id}&challenge=${score}`;
      await navigator.clipboard.writeText(
        `The Daily Fifth ${marks}\n${correctCount}/5 · ${score} points · ${streak} day streak\nNo spoilers—can you beat ${score}?\n${challengeUrl}`,
      );
      setCopied('Private challenge copied');
      trackMetric({
        name: 'result_shared',
        editionId: currentEdition.id,
        value: score,
      });
    } catch {
      setCopied('Copy blocked');
    }
  };
  const shareFact = async (item: Discovery) => {
    try {
      await navigator.clipboard.writeText(
        `${item.icon} ${item.reveal}\n\n${item.namedConcept.term}: ${item.namedConcept.definition}\n\nSource: ${item.sources[0].url}`,
      );
      setCopied(`“${item.namedConcept.term}” fact card copied`);
      trackMetric({ name: 'fact_shared', discoveryId: item.id });
    } catch {
      setCopied('Copy blocked');
    }
  };
  const toggleInterest = (collection: string) =>
    setGame((existing) => ({
      ...existing,
      interests: existing.interests.includes(collection)
        ? existing.interests.filter((item) => item !== collection)
        : [...existing.interests, collection],
    }));
  const confirmRetold = () => {
    if (game.retoldOn.includes(dateKey())) return;
    setGame((existing) => ({
      ...existing,
      retoldOn: [...existing.retoldOn, dateKey()],
    }));
    trackMetric({ name: 'retold_confirmed', editionId: currentEdition.id });
  };
  const openMetrics = () => {
    setMetricSummary(summarizeMetrics(readMetrics()));
    setMetricsOpen(true);
  };
  const startPrimerExperiment = () => {
    setExperimentFlow('primer-first');
    setPrimerDismissed(false);
    setMetricsOpen(false);
    setGame((existing) => ({
      ...emptyGame(5, currentEdition.id),
      saved: existing.saved,
      savedOn: existing.savedOn,
      completedOn: existing.completedOn,
      streakFreezes: existing.streakFreezes,
      freezeDates: existing.freezeDates,
      mastery: existing.mastery,
      reviewAttempts: existing.reviewAttempts,
      interests: existing.interests,
      retoldOn: existing.retoldOn,
    }));
    window.history.replaceState(
      null,
      '',
      `?edition=${currentEdition.id}&flow=primer-first`,
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a
            href="#game"
            className="flex items-center gap-3"
            aria-label="The Daily Fifth home"
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-coral font-serif text-xl font-black text-white shadow-[3px_3px_0_var(--ink)]">
              5
            </span>
            <span>
              <strong className="block font-serif text-lg leading-none">
                The Daily Fifth
              </strong>
              <small className="mt-1 block text-[10px] font-black uppercase tracking-[.16em] text-ink/48">
                A daily curiosity game
              </small>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <div
              className="hidden h-10 items-center gap-2 rounded-full border border-cobalt/15 bg-cobalt/6 px-3 text-xs font-black text-cobalt sm:flex"
              title="Automatically protects one missed day"
            >
              <ShieldCheck className="size-4" /> {game.streakFreezes} grace
            </div>
            <div
              className="flex h-10 items-center gap-2 rounded-full bg-sun/55 px-3 text-sm font-black"
              aria-label={`${streak} day streak`}
            >
              <Flame className="size-4 text-coral" /> {streak}
            </div>
            <button
              onClick={() => setCabinetOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <BookMarked className="size-4 text-cobalt" />
              <span className="hidden sm:inline">Cabinet</span>
              <span className="text-ink/45">{game.saved.length}</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        className="border-b border-ink/10 bg-white/55"
        aria-label="Daily edition archive"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-2.5 sm:px-8">
          {dailyEditions.map((edition, index) => (
            <button
              key={edition.id}
              onClick={() => chooseEdition(edition.id)}
              aria-current={
                edition.id === currentEdition.id ? 'page' : undefined
              }
              className={`edition-tab ${edition.id === currentEdition.id ? 'edition-tab-active' : ''}`}
            >
              <span>{index === 0 ? 'Today' : `Edition ${index + 1}`}</span>
              <span className="max-w-44 truncate text-[10px] opacity-55">
                {edition.title}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <section
        id="game"
        className="relative overflow-hidden border-b border-ink/10"
      >
        <div className="curiosity-orbit" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5 pb-9 pt-8 sm:px-8 sm:pb-14 sm:pt-11">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.17em] text-coral">
                {currentEdition.eyebrow}
              </p>
              <p className="mt-1 text-sm text-ink/52">
                {currentEdition.date} · about 3 minutes
              </p>
            </div>
            <div
              className="flex items-center gap-2"
              aria-label={`${game.answers.filter((item) => item !== null).length} of 5 answered`}
            >
              {discoveries.map((item, index) => (
                <span
                  key={item.id}
                  className={`question-pip ${game.answers[index] !== null ? 'question-pip-done' : ''} ${index === game.current ? 'question-pip-current' : ''}`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          {!finished &&
            experimentFlow === 'primer-first' &&
            !primerDismissed && (
              <section className="quiz-stage">
                <p className="text-xs font-black uppercase tracking-[.17em] text-cobalt">
                  Experiment control · primer first
                </p>
                <h1 className="mt-3 font-serif text-4xl font-black">
                  First, the 90-second context
                </h1>
                <p className="mt-3 text-ink/58">
                  This recreates the original learning flow so its completion
                  and recall can be compared with the new cold-question
                  experience.
                </p>
                <div className="mt-7 space-y-5 border-l-2 border-cobalt pl-5">
                  {discoveries.map((item) => (
                    <article key={item.id}>
                      <p className="text-[10px] font-black uppercase tracking-[.14em] text-coral">
                        {item.category}
                      </p>
                      <p className="mt-1 leading-7 text-ink/72">
                        {item.reveal} {item.mechanism}
                      </p>
                    </article>
                  ))}
                </div>
                <Button
                  onClick={() => setPrimerDismissed(true)}
                  className="mt-7 h-12 rounded-full bg-coral px-6 text-white hover:bg-coral/90"
                >
                  Take the five-question quiz{' '}
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </section>
            )}
          {!finished ? (
            <article
              className={`quiz-stage ${experimentFlow === 'primer-first' && !primerDismissed ? 'hidden' : ''}`}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="rounded-full bg-cobalt/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-cobalt">
                  {discovery.icon} {discovery.category}
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-ink/42">
                  {!discovery.evergreen && (
                    <em
                      className="rounded-full bg-coral/10 px-2 py-1 not-italic text-coral"
                      title="Facts reflect the dated source trail and may change"
                    >
                      Developing
                    </em>
                  )}
                  {game.interests.length > 0 && (
                    <em
                      className={`rounded-full px-2 py-1 not-italic ${game.interests.includes(discovery.collection) ? 'bg-sun/45 text-ink' : 'border border-dashed border-coral/35 text-coral'}`}
                    >
                      {game.interests.includes(discovery.collection)
                        ? 'For you'
                        : 'Wildcard'}
                    </em>
                  )}
                  {discovery.difficulty}
                </span>
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[.16em] text-ink/40">
                Question {game.current + 1} of 5
              </p>
              <h1 className="max-w-3xl font-serif text-[clamp(2.15rem,6vw,4.7rem)] font-black leading-[.98] tracking-[-.04em]">
                {discovery.prompt}
              </h1>
              <div
                className="mt-8 grid gap-3 sm:grid-cols-2"
                aria-label="Answer choices"
              >
                {discovery.choices.map((choice, index) => {
                  const correct = index === discovery.correct;
                  const active = selected === index;
                  return (
                    <button
                      key={choice}
                      disabled={answered}
                      onClick={() => chooseAnswer(index)}
                      className={`curiosity-answer ${answered && correct ? 'curiosity-answer-correct' : ''} ${answered && active && !correct ? 'curiosity-answer-wrong' : ''}`}
                    >
                      <span className="answer-token">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{choice}</span>
                      {answered && correct && (
                        <Check className="ml-auto size-5" />
                      )}
                      {answered && active && !correct && (
                        <X className="ml-auto size-5" />
                      )}
                    </button>
                  );
                })}
              </div>
              {!answered && (
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-bold text-ink/50">
                    How sure are you?
                  </span>
                  {confidenceLabels.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => chooseConfidence(item.value)}
                      className={`confidence-chip ${confidence === item.value ? 'confidence-chip-active' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              {answered && (
                <section
                  className="reveal-panel animate-in fade-in slide-in-from-bottom-3 duration-500"
                  aria-live="polite"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.16em] text-coral">
                        {selected === discovery.correct
                          ? `Sharp guess · +${confidencePoints[confidence ?? 'guessing']}`
                          : 'Beautifully wrong · +0'}
                      </p>
                      <h2 className="mt-2 font-serif text-3xl font-black leading-tight sm:text-4xl">
                        {discovery.reveal}
                      </h2>
                    </div>
                    <span className="hidden text-5xl sm:block">
                      {discovery.icon}
                    </span>
                  </div>
                  <p className="mt-4 text-lg leading-8 text-ink/70">
                    {discovery.surprise}
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <Insight
                      icon={<Lightbulb />}
                      label="How it works"
                      text={discovery.mechanism}
                    />
                    <Insight
                      icon={<History />}
                      label="Origins"
                      text={discovery.origins}
                    />
                    <Insight
                      icon={<Waves />}
                      label="Ripples"
                      text={discovery.ripples}
                    />
                  </div>
                  <div className="mt-5 rounded-2xl border border-cobalt/15 bg-cobalt/6 p-4">
                    <p className="text-xs font-black uppercase tracking-[.14em] text-cobalt">
                      There’s a name for this
                    </p>
                    <p className="mt-1">
                      <strong>{discovery.namedConcept.term}:</strong>{' '}
                      <span className="text-ink/68">
                        {discovery.namedConcept.definition}
                      </span>
                    </p>
                  </div>
                  <details className="mt-4 rounded-2xl border border-dashed border-coral/30 bg-coral/5 p-4">
                    <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-coral">
                      <Sparkles className="size-4" /> Open a rabbit hole
                    </summary>
                    <p className="mt-3 leading-7 text-ink/68">
                      {discovery.rabbitHole}
                    </p>
                    <a
                      href={discovery.sources[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-black text-cobalt hover:underline"
                    >
                      Start with the source <ExternalLink className="size-3" />
                    </a>
                  </details>
                  <details
                    className="source-receipt mt-5"
                    onToggle={(event) => {
                      if (event.currentTarget.open)
                        trackMetric({
                          name: 'reveal_expanded',
                          editionId: currentEdition.id,
                          discoveryId: discovery.id,
                        });
                    }}
                  >
                    <summary>
                      <LockKeyhole className="size-4" /> Source receipt and
                      caveat <ChevronRight className="size-4" />
                    </summary>
                    <p>{discovery.verificationNote}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {discovery.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.publisher} <ExternalLink className="size-3" />
                        </a>
                      ))}
                    </div>
                  </details>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
                    <button
                      onClick={toggleSaved}
                      className={`save-button ${game.saved.includes(discovery.id) ? 'save-button-active' : ''}`}
                    >
                      <BookMarked className="size-4" />{' '}
                      {game.saved.includes(discovery.id)
                        ? 'Saved to Cabinet'
                        : 'Save this fact'}
                    </button>
                    <Button
                      onClick={nextQuestion}
                      className="h-12 rounded-full bg-coral px-6 text-white hover:bg-coral/90"
                    >
                      {game.current === 4
                        ? 'See my results'
                        : `Next: ${discoveries[game.current + 1].category}`}{' '}
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </div>
                </section>
              )}
            </article>
          ) : (
            <section className="results-card text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-sun text-3xl shadow-[4px_4px_0_var(--ink)]">
                ✨
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[.17em] text-coral">
                Daily Five complete
              </p>
              <h1 className="mt-2 font-serif text-5xl font-black sm:text-7xl">
                {correctCount}/5
              </h1>
              <p className="mt-2 text-lg font-bold text-cobalt">
                {score} curiosity points
              </p>
              {challengeTarget !== null && (
                <p className="mx-auto mt-3 w-max rounded-full bg-cobalt/8 px-4 py-2 text-sm font-black text-cobalt">
                  {score > challengeTarget
                    ? `Challenge won · beat ${challengeTarget}`
                    : score === challengeTarget
                      ? `Challenge tied · ${challengeTarget}`
                      : `Challenge target · ${challengeTarget}`}
                </p>
              )}
              {[3, 7, 14, 30, 100].includes(streak) && (
                <div className="mx-auto mt-4 w-max rounded-full bg-sun/45 px-4 py-2 text-sm font-black">
                  <Flame className="mr-1 inline size-4 text-coral" /> {streak}
                  -day milestone!
                </div>
              )}
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink/62">
                You discovered five ideas—and saved {game.saved.length}.
                Tomorrow, one may return as a memory check.
              </p>
              <div className="mx-auto mt-7 flex max-w-sm justify-center gap-2">
                {game.answers.map((answer, index) => (
                  <span
                    key={discoveries[index].id}
                    className={`result-tile ${answer === discoveries[index].correct ? 'result-tile-correct' : ''}`}
                  >
                    {discoveries[index].icon}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={shareResults}
                  className="h-12 rounded-full bg-coral px-6 text-white hover:bg-coral/90"
                >
                  <Share2 data-icon="inline-start" /> Share without spoilers
                </Button>
                <Button
                  onClick={() => setCabinetOpen(true)}
                  variant="outline"
                  className="h-12 rounded-full border-ink/20 bg-white px-6"
                >
                  <BookMarked data-icon="inline-start" /> Open Cabinet
                </Button>
              </div>
              {copied && (
                <p
                  className="mt-3 text-sm font-bold text-cobalt"
                  aria-live="polite"
                >
                  {copied}
                </p>
              )}
              <div className="mx-auto mt-7 max-w-md rounded-2xl bg-sun/30 p-4">
                <p className="text-sm font-bold">
                  Did one of today’s discoveries make it into a real
                  conversation?
                </p>
                <button
                  onClick={confirmRetold}
                  disabled={game.retoldOn.includes(dateKey())}
                  className="mt-2 text-xs font-black text-cobalt hover:underline disabled:text-ink/45 disabled:no-underline"
                >
                  {game.retoldOn.includes(dateKey())
                    ? '✓ Retelling recorded'
                    : 'Yes—I told someone'}
                </button>
              </div>
              <button
                onClick={restart}
                className="mx-auto mt-7 flex items-center gap-2 text-sm font-bold text-ink/48 hover:text-ink"
              >
                <RotateCcw className="size-4" /> Replay today’s five
              </button>
            </section>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-3">
        <div className="editorial-card">
          <Sparkles />
          <strong>Surprise</strong>
          <p>
            Facts worth interrupting a conversation for—not headlines you
            already skimmed.
          </p>
        </div>
        <div className="editorial-card">
          <History />
          <strong>Origins</strong>
          <p>
            The hidden decisions, institutions, and accidents that made the
            present possible.
          </p>
        </div>
        <div className="editorial-card">
          <Waves />
          <strong>Ripples</strong>
          <p>
            The second- and third-order effects that appear when you follow the
            causal chain.
          </p>
        </div>
      </section>
      <section className="border-t border-ink/10 bg-white/45">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="text-xs font-black uppercase tracking-[.17em] text-coral">
            Optional weekly format
          </p>
          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-4xl font-black">
                Follow one story deeper
              </h2>
              <p className="mt-2 max-w-2xl text-ink/58">
                The daily game ranges widely. Deep dives preserve the original
                format for current situations whose history and downstream
                effects deserve more room.
              </p>
            </div>
            <span className="text-xs font-bold text-ink/40">
              Archive samples · Sep 4, 2026
            </span>
          </div>
          <div className="mt-7 grid gap-4">
            {editions.map((edition) => (
              <details
                key={edition.id}
                className="deep-dive"
                onToggle={(event) => {
                  if (event.currentTarget.open)
                    trackMetric({
                      name: 'deep_dive_opened',
                      editionId: edition.id,
                    });
                }}
              >
                <summary>
                  <span>
                    <small>{edition.category}</small>
                    <strong>{edition.title}</strong>
                  </span>
                  <ChevronRight />
                </summary>
                <div className="deep-dive-body">
                  <div>
                    <p className="deep-dive-label">Why it matters</p>
                    <p className="font-serif text-xl font-bold leading-relaxed">
                      {edition.why}
                    </p>
                    <p className="deep-dive-label mt-7">The context</p>
                    <div className="space-y-4 text-sm leading-7 text-ink/68">
                      {edition.primer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <aside>
                    <div className="rounded-2xl bg-cobalt p-5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[.14em] text-white/60">
                        Useful lens
                      </p>
                      <p className="mt-2 font-serif text-xl font-bold">
                        {edition.lens}
                      </p>
                    </div>
                    <div className="mt-4 rounded-2xl bg-sun/60 p-5">
                      <p className="text-[10px] font-black uppercase tracking-[.14em] text-ink/50">
                        Three things to carry
                      </p>
                      <ul className="mt-3 space-y-3 text-sm leading-6">
                        {edition.conversation.facts.map((fact) => (
                          <li key={fact}>• {fact}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {edition.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="source-pill"
                        >
                          {source.publisher} <ExternalLink />
                        </a>
                      ))}
                    </div>
                  </aside>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-ink/10 px-5 py-8 text-center text-sm text-ink/45">
        <p>Understand the world. Keep the surprising parts.</p>
        <button
          onClick={openMetrics}
          className="mt-2 text-xs font-bold text-cobalt hover:underline"
        >
          Open my learning lab
        </button>
      </footer>

      {cabinetOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 grid h-full w-full place-items-center bg-ink/60 p-4 backdrop-blur-sm"
          aria-labelledby="cabinet-title"
        >
          <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-paper p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-coral">
                  Your collection
                </p>
                <h2
                  id="cabinet-title"
                  className="mt-1 font-serif text-4xl font-black"
                >
                  Curiosity Cabinet
                </h2>
              </div>
              <button
                onClick={() => setCabinetOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-ink text-white"
                aria-label="Close cabinet"
              >
                <X className="size-4" />
              </button>
            </div>
            <section className="mt-6 rounded-2xl border border-ink/10 bg-white/65 p-4">
              <p className="text-xs font-black uppercase tracking-[.14em] text-cobalt">
                Tune tomorrow
              </p>
              <p className="mt-1 text-sm text-ink/55">
                Choose what you love. Every edition still keeps one wildcard to
                prevent a filter bubble.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => toggleInterest(collection)}
                    className={`confidence-chip ${game.interests.includes(collection) ? 'confidence-chip-active' : ''}`}
                  >
                    {collection}
                  </button>
                ))}
                <span className="rounded-full border border-dashed border-coral/40 px-3 py-1.5 text-xs font-black text-coral">
                  ✦ Wildcard always on
                </span>
              </div>
            </section>
            {copied && (
              <p
                className="mt-3 text-sm font-bold text-cobalt"
                aria-live="polite"
              >
                {copied}
              </p>
            )}
            {reviewDiscovery && (
              <section className="memory-check mt-7" aria-live="polite">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-cobalt">
                  <Brain className="size-4" /> Memory check
                </div>
                <h3 className="mt-3 font-serif text-2xl font-black leading-tight">
                  {reviewDiscovery.callback.prompt}
                </h3>
                {!reviewRevealed ? (
                  <>
                    <label
                      className="mt-4 block text-sm font-bold"
                      htmlFor="recall-draft"
                    >
                      Retrieve it from memory—rough wording is fine.
                    </label>
                    <textarea
                      id="recall-draft"
                      value={recallDraft}
                      onChange={(event) => setRecallDraft(event.target.value)}
                      className="mt-2 min-h-20 w-full rounded-xl border border-ink/15 bg-white p-3 focus:border-cobalt focus:outline-none"
                      placeholder="What do you remember?"
                    />
                    <Button
                      onClick={() => setReviewRevealed(true)}
                      className="mt-3 rounded-full bg-cobalt text-white hover:bg-cobalt/90"
                    >
                      Reveal answer
                    </Button>
                  </>
                ) : (
                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-[.13em] text-coral">
                      Answer
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {reviewDiscovery.callback.answer}
                    </p>
                    {recallDraft.trim() && (
                      <p className="mt-3 border-t border-ink/10 pt-3 text-sm text-ink/55">
                        You recalled: “{recallDraft.trim()}”
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        onClick={() => finishReview(true)}
                        className="rounded-full bg-coral text-white hover:bg-coral/90"
                      >
                        <Check data-icon="inline-start" /> I remembered
                      </Button>
                      <Button
                        onClick={() => finishReview(false)}
                        variant="outline"
                        className="rounded-full bg-white"
                      >
                        Not yet
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            )}
            {savedDiscoveries.length ? (
              <div className="mt-7 space-y-8">
                {collections.map((collection) => {
                  const cards = savedDiscoveries.filter(
                    (item) => item.collection === collection,
                  );
                  if (!cards.length) return null;
                  return (
                    <section key={collection}>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-serif text-xl font-black">
                          {collection}
                        </h3>
                        <span className="text-xs font-bold text-ink/40">
                          {cards.length} collected
                        </span>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {cards.map((item) => (
                          <article key={item.id} className="cabinet-card">
                            <span className="text-3xl">{item.icon}</span>
                            <p className="mt-4 text-[10px] font-black uppercase tracking-[.14em] text-coral">
                              {masteryLabel(game.mastery[item.id])} ·{' '}
                              {item.category}
                            </p>
                            <h3 className="mt-2 font-serif text-xl font-black leading-tight">
                              {item.reveal}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-ink/60">
                              <strong>{item.namedConcept.term}</strong> ·{' '}
                              {item.namedConcept.definition}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
                              <span className="text-[11px] font-bold text-ink/42">
                                {game.reviewAttempts[item.id] ?? 0} reviews
                              </span>
                              <span className="flex gap-3">
                                <button
                                  onClick={() => shareFact(item)}
                                  className="text-ink/45 hover:text-coral"
                                  aria-label={`Share ${item.namedConcept.term}`}
                                  title="Copy fact card"
                                >
                                  <Share2 className="size-3.5" />
                                </button>
                                <button
                                  onClick={() => startReview(item.id)}
                                  className="flex items-center gap-1.5 text-xs font-black text-cobalt hover:underline"
                                >
                                  <Brain className="size-3.5" />{' '}
                                  {game.savedOn[item.id] === dateKey()
                                    ? 'Preview recall'
                                    : 'Memory check'}
                                </button>
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-ink/20 p-10 text-center">
                <BookMarked className="mx-auto size-8 text-ink/30" />
                <p className="mt-4 font-serif text-xl font-bold">
                  Save a reveal and it will live here.
                </p>
                <p className="mt-2 text-sm text-ink/50">
                  Collected facts return as spaced memory checks.
                </p>
              </div>
            )}
          </div>
        </dialog>
      )}
      {metricsOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 grid h-full w-full place-items-center bg-ink/60 p-4 backdrop-blur-sm"
          aria-labelledby="metrics-title"
        >
          <div className="w-full max-w-2xl rounded-[2rem] bg-paper p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-coral">
                  Private prototype metrics
                </p>
                <h2
                  id="metrics-title"
                  className="mt-1 font-serif text-4xl font-black"
                >
                  Your learning lab
                </h2>
              </div>
              <button
                onClick={() => setMetricsOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-ink text-white"
                aria-label="Close learning lab"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink/58">
              Stored only in this browser. The app measures meaningful learning
              actions—not time spent or opportunities to grind points.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric
                value={metricSummary.firstQuestions}
                label="First questions"
              />
              <Metric
                value={metricSummary.completions}
                label="Daily completions"
              />
              <Metric value={metricSummary.activeDays} label="Active days" />
              <Metric value={metricSummary.saves} label="Facts saved" />
              <Metric value={metricSummary.recalls} label="Recall checks" />
              <Metric
                value={metricSummary.revealExpansions}
                label="Sources opened"
              />
              <Metric value={metricSummary.shares} label="Shares" />
              <Metric value={metricSummary.retold} label="Real retellings" />
              <Metric value={streak} label="Current streak" />
            </div>
            <div className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
              <HabitCheck
                met={metricSummary.returnedNextDay}
                label="Next-day return"
              />
              <HabitCheck
                met={metricSummary.sevenDayReturn}
                label="7-day return"
              />
              <HabitCheck
                met={metricSummary.weeklyGoalMet}
                label="3 sessions in a week"
              />
            </div>
            <section className="mt-6 border-t border-ink/10 pt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.14em] text-coral">
                    Flow experiment
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-black">
                    Does curiosity beat pre-reading?
                  </h3>
                </div>
                <button
                  onClick={startPrimerExperiment}
                  className="text-xs font-black text-cobalt hover:underline"
                >
                  Try control flow
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Funnel
                  label="Quiz first"
                  data={metricSummary.funnels.quizFirst}
                />
                <Funnel
                  label="Primer first"
                  data={metricSummary.funnels.primerFirst}
                />
              </div>
            </section>
          </div>
        </dialog>
      )}
    </main>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4">
      <strong className="font-serif text-3xl">{value}</strong>
      <span className="mt-1 block text-xs font-bold text-ink/45">{label}</span>
    </div>
  );
}

function HabitCheck({ met, label }: { met: boolean; label: string }) {
  return (
    <div
      className={`rounded-xl border p-3 font-bold ${met ? 'border-cobalt/20 bg-cobalt/8 text-cobalt' : 'border-ink/10 bg-white text-ink/38'}`}
    >
      {met ? '✓' : '○'} {label}
    </div>
  );
}

function Funnel({
  label,
  data,
}: {
  label: string;
  data: { starts: number; completions: number; completionRate: number };
}) {
  return (
    <div className="rounded-xl bg-white p-3">
      <strong className="text-sm">{label}</strong>
      <p className="mt-1 text-2xl font-black text-cobalt">
        {data.completionRate}%
      </p>
      <span className="text-[11px] text-ink/42">
        {data.completions}/{data.starts} completed
      </span>
    </div>
  );
}

function Insight({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) {
  return (
    <article className="insight-card">
      <span>{icon}</span>
      <strong>{label}</strong>
      <p>{text}</p>
    </article>
  );
}
