'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Clock3,
  ExternalLink,
  Lightbulb,
  MessageCircleQuestion,
  RefreshCcw,
  Sparkles,
  X,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { editions } from '@/lib/editions';

type EditionProgress = { answers: Array<number | null>; current: number };
type ProgressMap = Record<string, EditionProgress>;
type Feedback = {
  interesting: number;
  confidence: number;
  returnIntent: number;
  memorable: string;
};

const emptyProgress = (): EditionProgress => ({
  answers: Array(5).fill(null),
  current: 0,
});
const images: Record<
  string,
  { src: string; alt: string; credit: string; creditUrl: string }
> = {
  'mail-voting-rules': {
    src: '/stories/ballot.jpg',
    alt: 'An official ballot drop box in Washington state',
    credit: 'Greg Thames / Pexels',
    creditUrl:
      'https://www.pexels.com/photo/ballot-drop-box-in-the-america-17322131/',
  },
  'diesel-record': {
    src: '/stories/diesel.jpg',
    alt: 'A diesel price sign beside tanker trucks and an American flag',
    credit: 'Raphael Loquellano / Pexels',
    creditUrl:
      'https://www.pexels.com/photo/diesel-price-on-gas-station-with-american-flag-behind-18703889/',
  },
  'iran-iaea-referral': {
    src: '/stories/nuclear.jpg',
    alt: 'A nuclear power station at dusk',
    credit: 'Kyle Miller / Pexels',
    creditUrl:
      'https://www.pexels.com/photo/view-of-a-nuclear-power-plant-18335700/',
  },
};

function validProgress(value: unknown): value is ProgressMap {
  return Boolean(value && typeof value === 'object');
}

export default function Home() {
  const [editionIndex, setEditionIndex] = useState(0);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    interesting: 0,
    confidence: 0,
    returnIntent: 0,
    memorable: '',
  });
  const [copyStatus, setCopyStatus] = useState('');
  const quizRef = useRef<HTMLElement>(null);
  const edition = editions[editionIndex];
  const currentProgress = progress[edition.id] ?? emptyProgress();
  const currentQuestion = edition.questions[currentProgress.current];
  const selected = currentProgress.answers[currentProgress.current];
  const finished = currentProgress.answers.every((answer) => answer !== null);
  const score = currentProgress.answers.reduce<number>(
    (total, answer, index) =>
      total + (answer === edition.questions[index].correct ? 1 : 0),
    0,
  );
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const storyImage = images[edition.id];

  const chooseEdition = useCallback((index: number) => {
    const next = editions[index];
    setEditionIndex(index);
    setArchiveOpen(false);
    setCopyStatus('');
    window.history.replaceState(null, '', `#${next.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let savedProgress: ProgressMap | undefined;
    try {
      const saved = JSON.parse(
        localStorage.getItem('daily-fifth-progress') ?? '{}',
      );
      if (validProgress(saved)) savedProgress = saved;
    } catch {
      localStorage.removeItem('daily-fifth-progress');
    }
    const hash = window.location.hash.slice(1);
    const found = editions.findIndex((item) => item.id === hash);
    queueMicrotask(() => {
      if (savedProgress) setProgress(savedProgress);
      if (found >= 0) setEditionIndex(found);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem('daily-fifth-progress', JSON.stringify(progress));
  }, [hydrated, progress]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'open_daily_edition',
          title: 'Open a Daily Fifth edition',
          description:
            'Open one of the three available news-learning editions by its stable ID.',
          inputSchema: {
            type: 'object',
            properties: {
              editionId: {
                type: 'string',
                enum: editions.map((item) => item.id),
              },
            },
            required: ['editionId'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute(input: unknown) {
            const editionId =
              typeof input === 'object' && input
                ? (input as { editionId?: unknown }).editionId
                : undefined;
            const index = editions.findIndex((item) => item.id === editionId);
            if (index < 0) throw new Error('Unknown edition ID');
            chooseEdition(index);
            return {
              editionId,
              title: editions[index].title,
              status: 'opened',
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => {});
    return () => lifecycle.abort();
  }, [chooseEdition]);

  const selectAnswer = (answer: number) => {
    if (selected !== null) return;
    setProgress((existing) => {
      const next = existing[edition.id]
        ? {
            ...existing[edition.id],
            answers: [...existing[edition.id].answers],
          }
        : emptyProgress();
      next.answers[next.current] = answer;
      return { ...existing, [edition.id]: next };
    });
  };

  const nextQuestion = () => {
    if (currentProgress.current >= edition.questions.length - 1) {
      setTimeout(
        () =>
          document
            .getElementById('conversation-kit')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        50,
      );
      return;
    }
    setProgress((existing) => ({
      ...existing,
      [edition.id]: {
        ...currentProgress,
        current: currentProgress.current + 1,
      },
    }));
    setTimeout(
      () =>
        quizRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        }),
      50,
    );
  };

  const restart = () => {
    setProgress((existing) => ({ ...existing, [edition.id]: emptyProgress() }));
    setFeedback({
      interesting: 0,
      confidence: 0,
      returnIntent: 0,
      memorable: '',
    });
    setCopyStatus('');
    setTimeout(
      () =>
        quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    );
  };

  const copyFeedback = async () => {
    const summary = [
      `The Daily Fifth — ${edition.title}`,
      `Quiz: ${score}/5`,
      `Interesting: ${feedback.interesting || '—'}/5`,
      `More ready to discuss: ${feedback.confidence || '—'}/5`,
      `Would return: ${feedback.returnIntent || '—'}/5`,
      `Most memorable: ${feedback.memorable.trim() || '—'}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus('Copied—ready to send.');
    } catch {
      setCopyStatus('Copy was blocked by this browser.');
    }
  };

  const completedCount = useMemo(
    () =>
      Object.values(progress).filter((item) =>
        item.answers.every((answer) => answer !== null),
      ).length,
    [progress],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="The Daily Fifth home"
          >
            <span className="grid size-9 place-items-center rounded-full bg-coral font-serif text-lg font-bold text-white transition-transform group-hover:-rotate-6">
              5
            </span>
            <span>
              <span className="block font-serif text-lg font-bold leading-none tracking-tight">
                The Daily Fifth
              </span>
              <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.17em] text-ink/50 sm:block">
                One story. Five questions.
              </span>
            </span>
          </a>
          <button
            onClick={() => setArchiveOpen(true)}
            className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Past editions{' '}
            <span className="ml-1 text-ink/45">{completedCount}/3</span>
          </button>
        </div>
      </header>

      <nav
        aria-label="Edition picker"
        className="border-b border-ink/10 bg-white/60"
      >
        <div className="edition-scroller mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {editions.map((item, index) => (
            <button
              key={item.id}
              onClick={() => chooseEdition(index)}
              aria-current={index === editionIndex ? 'page' : undefined}
              className={`edition-tab ${index === editionIndex ? 'edition-tab-active' : ''}`}
            >
              <span>{index === 0 ? 'Today' : item.category}</span>
              <span className="text-[10px] opacity-55">{item.shortDate}</span>
            </button>
          ))}
        </div>
      </nav>

      <section id="top" className="relative border-b border-ink/10">
        <div
          className="absolute inset-0 dot-field opacity-45"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl gap-9 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/55">
              <span className="rounded-full bg-coral px-3 py-1.5 text-white">
                {editionIndex === 0 ? 'Today’s story' : 'Sample edition'}
              </span>
              <span>{edition.date}</span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3.5" /> 5 min
              </span>
            </div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.13em] text-cobalt">
              {edition.category}
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(2.65rem,6.5vw,5.35rem)] font-bold leading-[0.95] tracking-[-0.045em] text-ink">
              {edition.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-ink/62">
              {edition.deck}
            </p>
          </div>
          <figure className="relative overflow-hidden rounded-[1.8rem] border-2 border-ink bg-ink shadow-[7px_7px_0_var(--ink)]">
            <Image
              src={`${basePath}${storyImage.src}`}
              alt={storyImage.alt}
              width={800}
              height={600}
              priority={editionIndex === 0}
              className="aspect-[4/3] w-full object-cover grayscale-[12%]"
            />
            <figcaption className="absolute bottom-0 right-0 bg-ink/78 px-2 py-1 text-[10px] text-white/80 backdrop-blur">
              <a href={storyImage.creditUrl} target="_blank" rel="noreferrer">
                {storyImage.credit}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-sun">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-start sm:px-8">
          <div className="flex shrink-0 items-center gap-2 text-xs font-black uppercase tracking-[0.13em]">
            <Sparkles className="size-4" /> Why it matters
          </div>
          <p className="max-w-4xl font-serif text-xl font-bold leading-snug sm:ml-auto sm:text-right">
            {edition.why}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <section aria-labelledby="primer-title" className="mb-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-cobalt text-white">
                <BookOpen className="size-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
                  The 90-second primer
                </p>
                <h2
                  id="primer-title"
                  className="font-serif text-3xl font-bold tracking-tight"
                >
                  First, the context
                </h2>
              </div>
            </div>
            <div className="primer border-l-2 border-cobalt pl-5 text-[1.08rem] leading-8 text-ink/78 sm:pl-7">
              {edition.primer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <details className="sources-box mt-6">
              <summary>
                See the source trail <ChevronRight />
              </summary>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                {edition.sources.map((source) => (
                  <a
                    key={source.url}
                    className="source-card"
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <strong>{source.label}</strong>
                      <small>{source.publisher}</small>
                    </span>
                    <ExternalLink />
                  </a>
                ))}
              </div>
            </details>
          </section>

          <section
            ref={quizRef}
            aria-labelledby="quiz-title"
            className="scroll-mt-5 rounded-[2rem] bg-ink p-5 text-paper shadow-[0_24px_70px_rgba(30,35,34,.16)] sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between gap-4">
              <div
                className="flex gap-1.5"
                aria-label={`${currentProgress.answers.filter((a) => a !== null).length} of 5 answered`}
              >
                {edition.questions.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 w-8 rounded-full ${currentProgress.answers[index] !== null ? 'bg-sun' : index === currentProgress.current ? 'bg-paper/55' : 'bg-paper/15'}`}
                  />
                ))}
              </div>
              {currentProgress.answers.some((a) => a !== null) && (
                <button
                  onClick={restart}
                  className="flex items-center gap-1.5 text-xs font-semibold text-paper/55 hover:text-paper"
                >
                  <RefreshCcw className="size-3.5" /> Restart
                </button>
              )}
            </div>
            {!finished ? (
              <>
                <div className="mb-8 flex items-end justify-between gap-4 border-b border-paper/15 pb-6">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.17em] text-sun">
                      Question {currentProgress.current + 1} of 5
                    </p>
                    <h2
                      id="quiz-title"
                      className="font-serif text-3xl font-bold sm:text-4xl"
                    >
                      {currentQuestion.prompt}
                    </h2>
                  </div>
                  <span className="hidden font-serif text-5xl font-bold text-paper/15 sm:block">
                    {String(currentProgress.current + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="grid gap-3" aria-label="Answer choices">
                  {currentQuestion.choices.map((answer, index) => {
                    const answered = selected !== null;
                    const correct = index === currentQuestion.correct;
                    const active = selected === index;
                    return (
                      <button
                        key={answer}
                        disabled={answered}
                        onClick={() => selectAnswer(index)}
                        className={`answer-choice ${answered && correct ? 'answer-correct' : ''} ${answered && active && !correct ? 'answer-wrong' : ''}`}
                      >
                        <span className="answer-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{answer}</span>
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
                {selected !== null && (
                  <div
                    className="mt-6 rounded-2xl bg-paper p-5 text-ink animate-in fade-in slide-in-from-bottom-2 duration-300"
                    aria-live="polite"
                  >
                    <p className="mb-2 font-serif text-xl font-bold">
                      {selected === currentQuestion.correct
                        ? 'Exactly right.'
                        : 'Not quite—but now you’ll remember it.'}
                    </p>
                    <p className="leading-7 text-ink/70">
                      {currentQuestion.explanation}
                    </p>
                    <a
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-cobalt hover:underline"
                      href={edition.sources[currentQuestion.source].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Verify with{' '}
                      {edition.sources[currentQuestion.source].publisher}{' '}
                      <ExternalLink className="size-3" />
                    </a>
                    <div>
                      <Button
                        onClick={nextQuestion}
                        className="mt-5 h-11 rounded-full bg-coral px-5 text-white hover:bg-coral/90"
                      >
                        {currentProgress.current === 4
                          ? 'See my conversation kit'
                          : 'Next question'}{' '}
                        <ArrowRight data-icon="inline-end" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-7 text-center">
                <CheckCircle2 className="mx-auto mb-4 size-12 text-sun" />
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-sun">
                  Edition complete
                </p>
                <h2
                  id="quiz-title"
                  className="mt-2 font-serif text-5xl font-bold"
                >
                  You got {score} of 5.
                </h2>
                <p className="mx-auto mt-4 max-w-lg leading-7 text-paper/65">
                  The score is secondary. You now have the context, the nuance,
                  and a few details worth carrying into a conversation.
                </p>
                <Button
                  onClick={() =>
                    document
                      .getElementById('conversation-kit')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="mt-6 h-11 rounded-full bg-coral px-5 text-white hover:bg-coral/90"
                >
                  Get conversation-ready <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            )}
          </section>

          {finished && (
            <section
              id="conversation-kit"
              className="scroll-mt-6 pt-16"
              aria-labelledby="conversation-title"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-coral text-white">
                  <MessageCircleQuestion className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
                    Your reward
                  </p>
                  <h2
                    id="conversation-title"
                    className="font-serif text-4xl font-bold tracking-tight"
                  >
                    The Conversation Kit
                  </h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {edition.conversation.facts.map((fact, index) => (
                  <article key={fact} className="fact-card">
                    <span>0{index + 1}</span>
                    <p>{fact}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <article className="kit-card bg-cobalt text-white">
                  <p className="kit-label text-white/60">
                    The 20-second version
                  </p>
                  <p className="font-serif text-xl font-bold leading-relaxed">
                    “{edition.conversation.summary}”
                  </p>
                </article>
                <div className="grid gap-5">
                  <article className="kit-card">
                    <p className="kit-label">The useful nuance</p>
                    <p className="leading-7 text-ink/72">
                      {edition.conversation.nuance}
                    </p>
                  </article>
                  <article className="kit-card bg-sun">
                    <p className="kit-label">Ask someone this</p>
                    <p className="font-serif text-xl font-bold leading-snug">
                      {edition.conversation.question}
                    </p>
                  </article>
                </div>
              </div>

              <section
                className="mt-12 rounded-[2rem] border border-ink/12 bg-white p-5 sm:p-8"
                aria-labelledby="feedback-title"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  Help shape tomorrow
                </p>
                <h3
                  id="feedback-title"
                  className="mt-2 font-serif text-3xl font-bold"
                >
                  Was this worth five minutes?
                </h3>
                <div className="mt-7 grid gap-7 sm:grid-cols-3">
                  <Rating
                    label="Interesting"
                    value={feedback.interesting}
                    onChange={(value) =>
                      setFeedback({ ...feedback, interesting: value })
                    }
                  />
                  <Rating
                    label="Ready to discuss"
                    value={feedback.confidence}
                    onChange={(value) =>
                      setFeedback({ ...feedback, confidence: value })
                    }
                  />
                  <Rating
                    label="Would return"
                    value={feedback.returnIntent}
                    onChange={(value) =>
                      setFeedback({ ...feedback, returnIntent: value })
                    }
                  />
                </div>
                <label
                  className="mt-7 block text-sm font-bold"
                  htmlFor="memorable"
                >
                  What will you remember?
                </label>
                <textarea
                  id="memorable"
                  value={feedback.memorable}
                  onChange={(event) =>
                    setFeedback({ ...feedback, memorable: event.target.value })
                  }
                  className="mt-2 min-h-24 w-full rounded-xl border border-ink/15 bg-paper/45 p-3 text-base focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/20"
                  placeholder="The fact or idea that stuck…"
                />
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={copyFeedback}
                    className="h-11 rounded-full bg-ink px-5 text-white hover:bg-ink/85"
                  >
                    <Clipboard data-icon="inline-start" /> Copy feedback
                  </Button>
                  <span
                    aria-live="polite"
                    className="text-sm font-semibold text-cobalt"
                  >
                    {copyStatus}
                  </span>
                </div>
              </section>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
              Today’s path
            </p>
            <ol className="space-y-4 text-sm font-semibold">
              <li className="flex items-center gap-3 text-cobalt">
                <span className="step-dot bg-cobalt text-white">1</span> Get the
                context
              </li>
              <li className="flex items-center gap-3">
                <span className="step-dot">2</span> Take the quiz
              </li>
              <li
                className={`flex items-center gap-3 ${finished ? 'text-coral' : 'text-ink/45'}`}
              >
                <span
                  className={`step-dot ${finished ? 'bg-coral text-white' : ''}`}
                >
                  3
                </span>{' '}
                Get conversation-ready
              </li>
            </ol>
          </div>
          <blockquote className="rounded-3xl bg-cobalt p-6 text-white">
            <Lightbulb className="mb-5 size-5 text-sun" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/65">
              A useful lens
            </p>
            <p className="font-serif text-2xl font-bold leading-tight">
              {edition.lens}
            </p>
          </blockquote>
          <p className="px-2 text-xs leading-5 text-ink/48">
            Prototype edition. Facts are sourced to material available on
            September 4, 2026; developing stories can change.
          </p>
        </aside>
      </div>

      <footer className="border-t border-ink/10 px-5 py-10 text-center text-sm text-ink/50">
        <p className="font-serif text-lg font-bold text-ink">The Daily Fifth</p>
        <p className="mt-1">Understand today. Remember what matters.</p>
      </footer>

      {archiveOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          aria-labelledby="archive-title"
        >
          <div className="w-full max-w-2xl rounded-[2rem] bg-paper p-5 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  Three ways into the world
                </p>
                <h2
                  id="archive-title"
                  className="mt-1 font-serif text-3xl font-bold"
                >
                  Sample editions
                </h2>
              </div>
              <button
                onClick={() => setArchiveOpen(false)}
                aria-label="Close edition picker"
                className="grid size-9 place-items-center rounded-full bg-white"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="grid gap-3">
              {editions.map((item, index) => {
                const done = progress[item.id]?.answers.every(
                  (answer) => answer !== null,
                );
                return (
                  <button
                    key={item.id}
                    onClick={() => chooseEdition(index)}
                    className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md"
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full font-serif font-bold ${done ? 'bg-cobalt text-white' : 'bg-mist'}`}
                    >
                      {done ? <Check className="size-4" /> : index + 1}
                    </span>
                    <span>
                      <small className="font-bold uppercase tracking-wider text-coral">
                        {item.category}
                      </small>
                      <strong className="mt-1 block font-serif text-lg leading-tight">
                        {item.title}
                      </strong>
                    </span>
                    <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
}

function Rating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">{label}</legend>
      <div
        className="flex gap-1.5"
        aria-label={`${label}, ${value || 'not rated'} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            type="button"
            key={number}
            onClick={() => onChange(number)}
            aria-label={`${number} out of 5`}
            aria-pressed={number === value}
            className={`grid size-9 place-items-center rounded-full border text-sm font-bold transition ${number <= value ? 'border-coral bg-coral text-white' : 'border-ink/15 bg-paper hover:border-coral'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: object;
          annotations?: {
            readOnlyHint?: boolean;
            untrustedContentHint?: boolean;
          };
          execute: (input: unknown) => unknown;
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}
