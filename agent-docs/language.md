# Working Language

All client-facing interaction in this project — the discovery interview, clarifying questions, the brief, copywriting, and reviews — happens **in Italian**. This applies to every stage of the workflow described in `AGENTS.md`, not just discovery.

## Core rule: contextualize, don't translate

The documents in `agent-docs/` (discovery, copywriting, design, etc.) are written in English as a conceptual reference. The agent **must not translate them word for word** when applying them in conversation or in any client-facing output. Instead it should:

- Grasp the intent and logic behind each question or principle (why it is asked, what it is meant to surface) and rephrase it naturally in Italian, the way an Italian consultant would put it to an Italian client.
- Adapt examples, cultural references, tone, and register to the Italian context — not merely swap words.
- Keep a technical term in English (Etch, Automatic.css, ACSS, wireframe, CTA, brief) when that is how the industry uses it in Italy too. Where a natural, widely used Italian equivalent exists, use that instead.

In short: the files in `agent-docs/` are the **source of the reasoning**, not a script to be recited in another language.

## Register and tone

- The choice between **tu** and **Lei** must follow the audience and brand positioning established during discovery, not be inherited by default from the tone of the English source. If the brief does not settle it, ask the client explicitly before producing any copy.
- Keep the chosen register consistent across the entire site: switching between tu and Lei from page to page or section to section is a recurring localization failure.
- Avoid the hard-sell tone typical of American marketing ("Get started now!", "Don't miss out!"): translated literally it almost always reads as out of place in Italian. Prefer direct but measured CTAs, calibrated to the client's sector.
- Favor sentence structures that are natural in Italian (often longer, with subordinate clauses) rather than mirroring the clipped syntax of English.

## Common EN → IT translation and localization pitfalls

1. **Calques and false friends**: "eventualmente" is not *eventually* (use "alla fine" / "col tempo"); "attualmente" is not *actually* (use "in realtà"); "realizzare" does not mean *realize* in the sense of understanding (use "rendersi conto"); "assumere" does not mean *assume* in the sense of supposing (use "supporre" / "dare per scontato").
2. **"-ing" forms**: do not map them mechanically onto the Italian gerund in "-ndo". The infinitive or a noun usually reads better (e.g. "Building your website" → "Costruire il tuo sito web", not "Costruendo il tuo sito web" as a heading).
3. **Anglicisms**: keep the ones fully naturalized in everyday or technical Italian (email, form, layout, footer, brief, wireframe). Drop the ones that are just lazy translation when a clear, widely used Italian equivalent exists.
4. **SEO**: keyword research must be conducted natively in Italian — search volumes, intents, and synonyms differ. Never derive it by translating English keyword research.
5. **Local formats**: currency in Italian convention (e.g. "1.500 €" or "€ 1.500", not "$1,500"), comma as the decimal separator and period for thousands, dates as dd/mm/yyyy.
6. **Idioms and metaphors**: never translate literally ("it's a piece of cake" is not "è un pezzo di torta"). Find the Italian idiomatic equivalent or rephrase without the metaphor.
7. **Word order and agreement**: watch for English-calqued structures that read unnaturally in Italian — stacked adjectives before the noun, or repeating "il tuo" in every sentence where Italian would simply omit the possessive.
8. **Text expansion**: Italian typically runs 15–25% longer than English. Headings, buttons, menu items, and microcopy translated from English mockups tend to break the layout — always check how they render in the design, not just in the copy document.
9. **Title capitalization**: English uses Title Case ("Our Best Services"); Italian does not. Use sentence case, capitalizing only the first word.

## In practice

- The discovery interview (`discovery.md`) is conducted entirely in Italian, with questions reformulated according to these principles rather than translated line by line.
- The final brief (`discovery/brief.md`) is written in Italian.
- Copywriting, wireframe annotations, and any text aimed at the end client: Italian, following the same contextualization logic.
- File names, technical conventions (HTML, CSS, ACSS), and code comments may remain in English unless specified otherwise, since they follow standard development conventions.
