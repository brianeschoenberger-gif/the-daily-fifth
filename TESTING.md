# Curiosity-game QA inventory

## Requirements

- The first viewport opens directly on question one; no primer blocks play.
- The archive contains three daily editions with five distinct, source-backed discoveries each.
- Every reveal includes Surprise, How it works, Origins, Ripples, a named concept, and a source receipt with a caveat.
- Time-sensitive discoveries are visibly labeled “Developing” and distinguish procedural fact, interpretation, and uncertainty in their verification notes.
- Confidence is optional and changes points only for a correct answer.
- Three answered questions preserve the daily streak; one grace credit bridges a one-day gap; all five produce the results card.
- Saved discoveries persist in the Curiosity Cabinet across refreshes and replays, and recall checks advance them through Discovered, Remembered, and Mastered.
- Results can be copied without revealing answers; the private URL opens the same edition with the score target.
- Individual Cabinet fact cards can be copied with their named concept and primary source.
- Cabinet cards are grouped into thematic collections; interest choices persist and never disable wildcard questions.
- The private Learning Lab records activation, completion, saves, shares, recalls, active days, and confirmed real-world retellings.
- The Learning Lab launches a fresh primer-first control and reports separate quiz-first and primer-first completion funnels.
- Three archived current-story deep dives remain available as optional context.
- Keyboard focus and reduced-motion behavior remain accessible.

## Interactive states

| Area              | Controls                               | States to verify                                                       |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| Header            | Streak, Cabinet                        | Zero/active streak, empty/populated Cabinet                            |
| Quiz              | Four answers, three confidence choices | Unanswered, correct, incorrect, confidence selected                    |
| Reveal            | Source disclosure, save, next          | Collapsed/open, unsaved/saved, questions 1–5                           |
| Results           | Share, Cabinet, replay                 | Copied/error, modal open/closed, reset with saves retained             |
| Memory check      | Free recall, reveal, self-assessment   | Hidden answer, revealed answer, remembered/not-yet, mastery capped     |
| Deep dives        | Three disclosures and source links     | Collapsed/open, dated archive label, valid destinations                |
| Edition archive   | Today and archived edition tabs        | Active tab, reset game, correct content, direct query URL              |
| Private challenge | Shared edition-and-score URL           | Same edition loads, target shown, won/tied/target states               |
| Personalization   | Four interest chips                    | Unselected/selected, “For you”/wildcard labels, persistence            |
| Learning Lab      | Footer trigger, close button           | Empty/populated counters, browser-local disclosure                     |
| Flow experiment   | Primer-first control trigger           | Fresh control session, primer gate, separated funnel metrics           |
| Persistence       | Browser refresh                        | Current question, answers, confidence, saves, completion days retained |

## Exploratory cases

- Complete the game with no confidence choices.
- Choose “Certain” and answer incorrectly; confirm the score does not go below zero.
- On question five, confirm its reveal appears before the results screen.
- Save and unsave the current discovery from the reveal.
- Complete two successful memory checks for one fact and confirm it advances to Mastered; a third must not advance further.
- Replay after completion and confirm Cabinet cards remain.
- Select only one interest and confirm questions outside it remain in the edition as wildcards.
- Record a real-world retelling once and confirm repeat clicks do not duplicate it that day.
- Complete both quiz-first and primer-first sessions and confirm their starts and completion rates remain separate.
- Complete the entire game by keyboard.
- Verify no horizontal overflow at 390×844 and 1600×900.
- Open every outbound source and compare the claim with its verification note.
