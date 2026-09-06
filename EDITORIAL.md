# Editorial playbook

The Daily Fifth publishes questions that reward curiosity rather than recall of a headline. A candidate must be surprising, explainable, useful in conversation, and strong enough to support a mechanism, a historical origin, and at least one non-obvious downstream consequence.

## 1. Find the question

Start with an observable puzzle: a counterintuitive quantity, an invisible system, a forgotten decision that still shapes daily life, or a current event whose consequences extend beyond the immediate story. Reject questions that are merely obscure names, dates, or records.

Score every candidate from 1–5 for surprise and tellability. Both scores must be at least 4. Keep the five answers in an edition varied across Science & Nature, Deep History, Hidden Systems, and Human Ingenuity; personalization may reorder emphasis, but at least one wildcard should remain.

## 2. Build the evidence card

Use at least two direct, authoritative HTTPS sources. Prefer original records, public agencies, museums, standards bodies, universities, and peer-reviewed research. Record the exact claim each source supports. If the evidence is changing, disputed, estimated, or definition-dependent, mark the item `evergreen: false` and write a claim-specific verification note.

The answer choices must be plausible, mutually distinct, and resolvable from the sourced claim. Never turn uncertainty in the evidence into false certainty in the quiz.

## 3. Write the reveal

Each discovery must contain:

- **Surprise:** the crisp answer and the memorable contrast.
- **Mechanism:** how the thing actually works.
- **Origins:** the historical path that made the present situation possible.
- **Ripples:** second- and third-order effects, including who or what changes downstream.
- **Named concept:** the established term a reader can reuse to recognize the pattern elsewhere.
- **Rabbit hole:** one concrete next question plus a primary-source route into it.
- **Callback:** a free-recall prompt that tests the durable idea, not the multiple-choice wording.

Write for retelling: one central causal chain, few proper nouns, concrete comparisons, and no generic “this is important” conclusions.

## 4. Review before publication

An editor verifies every URL, maps every material claim to a source, checks the correct answer index, and challenges each distractor. A second pass checks that the origins explain the present rather than merely preceding it, the ripples are causal rather than speculative, and the named concept is genuinely used by a relevant field.

Run `npm run lint`, `npm test`, and `npm run build`. The schema tests enforce five questions per edition, unique IDs, minimum reveal depth, source count, quality scores, rabbit holes, callbacks, and developing-information labels.

## 5. Revisit and retire

Review developing items before reuse and update their “verified through” note. Retire broken links, materially changed claims, or questions whose reveal no longer meets the evidence bar. Evergreen items still receive periodic link checks. Learning Lab signals can guide which formats deserve more editions, but time spent and compulsive engagement are not editorial success metrics; next-day recall, completion, saves, and real-world retellings are.
