# Prototype QA inventory

## Requirements

- Three current, source-backed editions are available from the edition tabs and archive.
- Each edition includes a date, why-it-matters framing, short primer, five questions, answer explanations with source links, and a Conversation Kit.
- Quiz progress survives refresh, can be restarted, and is isolated by edition.
- Hash URLs open the corresponding edition directly.
- The end card captures three ratings and a memorable takeaway, then copies a concise summary.
- The experience works on desktop and mobile, with keyboard-visible controls and reduced-motion support.

## Interactive controls and states

| Area               | Control                                                       | States to verify                                              |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| Edition navigation | Three tabs, Past editions button, modal choices, close button | Selected tab, completed count, direct hash, modal open/closed |
| Sources            | Source-trail disclosure and outbound links                    | Collapsed/expanded, valid destination                         |
| Quiz               | Four answer buttons, next/restart buttons                     | Unanswered, correct, incorrect, explanation, completion       |
| Conversation Kit   | Completion CTA                                                | Hidden before completion, visible after completion            |
| Feedback           | Three 1–5 ratings, textarea, copy button                      | Empty, selected, typed, copied status                         |
| Persistence        | Browser refresh                                               | Current answer and edition completion retained                |

## Exploratory cases

- Switch editions midway through a quiz and return.
- Refresh after an incorrect answer is revealed.
- Open each edition by its hash URL.
- Complete one edition entirely by keyboard.
- Check narrow-screen horizontal tab scrolling and long headline wrapping.
- Verify the page has no horizontal overflow at 390×844 and 1600×900.
