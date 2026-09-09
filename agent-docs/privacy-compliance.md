# Privacy and compliance

Privacy conventions for ILMASI Digital web projects. Apply during workflow step 11 (Privacy & compliance), after hardening and before performance.

## When to use

Load this doc when the site is in production and not yet public. Read `discovery/controller.md` and `build/environment.md` first.

## Sources

Use these and nothing else.

- [Linee guida cookie e altri strumenti di tracciamento](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876) — Garante, provv. 231 of 10 June 2021. The reference text for websites.
- [Linee guida tracking pixel nelle comunicazioni di posta elettronica](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10241943) — Garante, provv. 284 of 17 April 2026. GU 29 April 2026, six months to comply.
- [GDPR](https://www.garanteprivacy.it/il-testo-del-regolamento)
- [Codice Privacy](https://www.garanteprivacy.it/codice) — art. 122 governs storing and accessing information on a device.
- [Garante FAQ](https://www.garanteprivacy.it/faq)
- EDPB Guidelines 2/2023 on the technical scope of art. 5(3) ePrivacy, adopted 7 October 2024.

Anything not answered by these is an open question to raise.

## Roles

- **The client is the controller.** Purposes, legal bases, retention and recipients are theirs to state.
- **We are a processor** under art. 28 GDPR. `discovery/controller.md` tracks whether the appointment exists.
- **Hosting and anything receiving personal data are sub-processors.** The client has to know who they are. Take the list from `build/environment.md`.

## Step 1 — What exists

Open `discovery/controller.md`.

- **Existing policies win.** Reconcile them with what the new site does and report the deltas. Do not replace documents the client's advisor produced.
- If nothing exists, draft here from stated facts only.
- Check the identity fields are complete: legal name, registered office, VAT number, monitored contact address.

## Step 2 — Inventory what loads

On the production site, page by page.

- Open in a clean profile with the network tab, **before accepting anything**. List every third-party request and stored identifier.
- Repeat after accepting. The difference is the compliance surface.

Each of these is a separate decision:

| Thing | Note |
|---|---|
| Analytics | Consent unless strict conditions are met |
| Tag managers | The contents count, not the container |
| Advertising and remarketing tags | Consent, always |
| Social pixels | Consent, plus a transfer question |
| Embedded maps | Sets identifiers on load |
| Embedded video | Often profiling identifiers before playback |
| Externally hosted fonts | Host locally instead |
| Chat widgets | Own storage, own policy |
| CDN and security services | Usually technical, still recipients |

**Host locally whatever can be hosted locally.**

## Step 3 — Classify

Art. 122 permits storage or access without consent only where it serves solely to carry out a communication, or is strictly necessary for a service the user explicitly requested.

- Record which side each item falls on, and on what basis. "It seems technical" is not a basis.
- **Uncertain classification is treated as requiring consent** until resolved, and recorded in `controller.md` open questions.

## Step 4 — Banner requirements

Functional requirements, not preferences.

- **Prior blocking.** Nothing non-technical runs before consent.
- **Refusing is as easy as accepting**, in the same place with the same prominence.
- **Closing without choosing is possible**, and browsing continues with technical trackers only.
- **No cookie wall.**
- **Scrolling is not consent.**
- **Granular by purpose.**
- **Revocable at any time**, through a link reachable from every page.
- **Consent choices recorded.**
- **Do not re-ask on every visit.** Not sooner than six months unless conditions change materially.

## Step 5 — Draft the documents

**Cookie policy** — the classified inventory in plain language: what each tracker is, whose it is, what it does, how long it persists, how to revoke. It must match what the site loads.

**Privacy policy** — controller identity, purposes, legal bases, categories of data, retention, recipients and sub-processors, transfers outside the EEA and the safeguard relied on, data subject rights and how to exercise them, right to complain to the Garante.

- **Nothing enters either document that the client has not stated.** No inferred retention, no assumed legal basis. An open field means the document is not finished.
- Layer the information: a short first level with a link to the detail.
- Write in Italian per [language.md](language.md). Formal but readable; legalese works against the clarity the guidelines require.

## Step 6 — Email tracking pixels

Applies when `controller.md` records newsletter or DEM sending.

- **Disclosure is required in every case**, whatever the purpose and whoever the sender.
- **No consent needed** for aggregate open-rate counting, provided the pixel is the same for all recipients of a campaign and IP and technical data are anonymised. Nor for authentication and security messages, nor for institutional or service messages the controller is obliged to send.
- **Consent needed** for per-recipient open measurement used to optimise campaigns, or to infer interests and build profiles.
- Consent may be bundled into the general promotional consent, if neutrally worded.
- **Revocation must be granular**: unsubscribe entirely, or keep the emails without the tracking. Footer link to a rights area.
- Refusing tracking must not degrade the service.
- **Check the platform's default.** Per-recipient open tracking is on by default in most of them.

## Step 7 — Implement and verify

- Configure the consent tool against the step 3 classification, **not against its own scan.** Scanners are a cross-check.
- Set cache exclusions when performance is configured at step 12, and re-verify — see [performance.md](performance.md).

Verify by behaviour:

- [ ] Clean profile, network tab, **before** interacting: no non-technical request, no non-technical identifier.
- [ ] Refuse: browsing continues, nothing non-technical appears.
- [ ] Accept one category: exactly that category appears.
- [ ] Revoke: the identifiers go away.
- [ ] Revocation link reachable from every page.
- [ ] Blocked embeds show a usable placeholder.

## Quality gates

- [ ] Classification recorded for every item in the inventory.
- [ ] Both policies drafted from stated facts, no open fields.
- [ ] Prior blocking verified by observation.
- [ ] Recipients and sub-processors listed and communicated to the client.
- [ ] Open questions in `controller.md` resolved or flagged as blocking publication.
- [ ] Noted that the scan repeats once public — see [deployment.md](deployment.md).

## Related docs

- [deployment.md](deployment.md) — the scan to repeat once public
- [performance.md](performance.md) — cache exclusions for the consent scripts
- [language.md](language.md) — register for client-facing documents
- [form.md](form.md) — where form fields become processing activities
- [hardening.md](hardening.md) — step 10, security rather than data handling
