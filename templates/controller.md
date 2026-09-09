<!--
  The controller is the client. Everything in this file is theirs to state, not
  ours to infer. An invented retention period or a guessed legal basis becomes
  a false declaration in a published document.

  Filled in two stages:
    Stage 1 — during discovery. Identity. The client has these to hand.
    Stage 2 — at step 11. Processing facts, which depend on what the site
              actually ended up doing.

  "Not provided yet" is a valid state and must stay visible. Never replace a
  missing answer with a plausible one.
-->

# Data controller

Stage 1 fields are marked **[D]** (discovery), stage 2 **[11]** (step 11).

## Identity — [D]

| | |
|---|---|
| Legal name | `[ragione sociale]` |
| Legal form | `[S.r.l. / S.p.A. / ditta individuale / studio associato / …]` |
| Registered office | `[full address]` |
| VAT number | `[partita IVA]` |
| Tax code | `[codice fiscale, if different]` |
| Legal representative | `[name, role]` |
| Contact email for data subjects | `[address]` |
| PEC | `[address]` |
| Phone | `[number]` |

<!--
  The contact point for data subjects must be a channel someone actually
  monitors. An address that bounces makes the rights section of the policy
  inoperative.
-->

## Data protection officer — [D]

| | |
|---|---|
| DPO appointed | `[yes | no | unknown]` |
| Name and contact | `[if appointed]` |

## Existing documents — [D]

| | |
|---|---|
| Privacy policy exists | `[yes — where | no]` |
| Cookie policy exists | `[yes — where | no]` |
| Who maintains them | `[internal | external counsel | nobody]` |
| Register of processing exists | `[yes | no | unknown]` |

<!--
  If documents already exist, they are the starting point and they win. Our job
  becomes reconciling them with what the new site actually does, not replacing
  them.
-->

## Processing activities — [11]

One row per way the site collects personal data. Add rows; delete the example.

| What collects it | Data collected | Purpose | Legal basis | Retention |
|---|---|---|---|---|
| `[e.g. contact form]` | `[name, email, message]` | `[respond to enquiry]` | `[stated by client]` | `[stated by client]` |

<!--
  Legal basis and retention are the two fields most often filled with a guess.
  Both are the controller's determination. If the client does not know, the
  answer is "not provided yet" and it stays open until they decide.
-->

## Recipients and third parties — [11]

| Recipient | What they receive | Role | Location |
|---|---|---|---|
| `[e.g. hosting provider]` | `[all site data at rest]` | `[processor]` | `[country]` |

Includes anything that receives personal data: hosting, mail sending, CRM,
analytics, embedded maps and video, booking systems, payment providers.

## Transfers outside the EEA — [11]

| | |
|---|---|
| Any transfers | `[yes | no]` |
| Which recipients | `[list]` |
| Safeguard relied on | `[stated by client or their advisor]` |

## Email marketing — [11]

| | |
|---|---|
| Newsletter or DEM sending | `[yes | no]` |
| Platform | `[name]` |
| Open tracking | `[aggregate only | per-recipient | none | unknown]` |
| Consent collected at signup | `[yes — how | no]` |
| Granular revocation available | `[yes | no]` |

<!--
  These fields exist because of the Garante's April 2026 tracking pixel
  guidelines. See privacy-compliance.md — per-recipient open tracking and
  aggregate counting are treated differently.
-->

## Our role — [11]

| | |
|---|---|
| Processor appointment in place | `[yes — date | no]` |
| Sub-processors disclosed | `[list]` |
| Client informed of sub-processors | `[yes | no]` |

<!--
  We manage the site and its hosting on an ongoing basis, which makes us a
  processor acting on the controller's instructions. The appointment under
  art. 28 GDPR is a contractual document, tracked here only so its absence is
  visible.
-->

## Open questions

<!--
  Anything the client has not answered. This section should be empty before the
  policies are published, and its contents are a blocker, not a note.
-->

`[none]`
