# Forms

Form conventions for ILMASI Digital web projects. Apply during workflow step 3 (Copywriting) to specify the form, and step 8 (Development) to build it.

## When to use

Load this doc when a page needs a form. Docs: [wsform.com/knowledgebase/](https://wsform.com/knowledgebase/).

## Deliverable

A WS Form JSON file, importable from the layout editor import icon or by dragging it into the form builder area. See [Import / Export](https://wsform.com/knowledgebase/import-export/).

## Schema

Verified against a WS Form 1.12.6 export. Match these keys exactly.

### Root

| Key | Value |
|---|---|
| `label` | Form name |
| `status` | `draft` or published |
| `identifier` | `ws_form` |
| `version` | Plugin version that produced the file |
| `groups` | Array of tabs |
| `meta` | Form settings, ~200 flat keys |
| `checksum` | MD5 written on export |

**`groups` are tabs.** The editor calls them tabs; the JSON calls them groups.

### Hierarchy

```
groups[]                    tabs
  label, sort_index, id, meta
  sections[]
    label, child_count, sort_index, id, meta
    fields[]
      label, type, sort_index, id, meta
```

- `id` is a numeric string, unique within the form. **Fields are referenced elsewhere as `#field(3)`.**
- `sort_index` sets order, starting at 1.
- `meta` is flat: one key per setting. `'on'` enables, `''` disables. Field `meta` runs 44–58 keys depending on type.

### Field types

**The editor label is not the JSON type.** Read the type from an export, never from the interface.

| Editor | JSON `type` |
|---|---|
| Text | `text` |
| Email | `email` |
| Phone | `tel` |
| Text Area | `textarea` |
| Checkbox | `checkbox` |
| Submit | `submit` |

Over 55 types exist — see [Fields](https://wsform.com/knowledgebase/fields/).

### Layout

Fields sit full width by default. Two side by side is a width setting on each, not a container: `breakpoint_size_75: '6'` on both puts them in a row at that breakpoint.

The editor shows a field's reference as `#field(6)` on hover. Use it to confirm ids before wiring actions.

### Field meta worth setting

| Key | Note |
|---|---|
| `required` | `'on'` or `''` |
| `label_render` | `'on'` to show the label |
| `autocomplete` | `given-name`, `family-name`, `email`, `tel` |
| `help` | Help text |
| `placeholder` | Never a substitute for the label |
| `invalid_feedback` | Error message, in Italian |
| `invalid_feedback_render` | `'on'` |
| `min_length`, `max_length`, `pattern` | Validation |
| `breakpoint_size_75` | Column width at that breakpoint |
| `class_field_button_type` | On `submit`, e.g. `primary` |

### Checkbox options

Options are not in `meta` directly. They live in `meta.data_grid_checkbox`:

```
data_grid_checkbox.groups[0].rows[] → { id, required, data: [ "option text" ] }
```

`required` is **per row**, not on the field.

### Actions

Actions live in `meta.action`, a data grid whose rows hold two columns:

```
rows[] → data: [ "Send Email", "{\"id\":\"email\",\"meta\":{...},\"events\":[\"submit\"]}" ]
```

**The second column is a JSON string nested inside the JSON.** Escape it correctly or the action is silently dropped.

Action ids seen: `database` (Save to Submissions), `email`, `redirect`.

Useful `email` meta: `action_email_from_email`, `action_email_from_name`, `action_email_to[]`, `action_email_reply_to_email`, `action_email_subject`, `action_email_message_editor`, `action_email_content_type`.

### Variables

`#field(3)`, `#email_submission`, `#email_subject`, `#blog_charset`, `#query_var("post_id")`. See [Variables Reference](https://wsform.com/knowledgebase/variables/).

## Build method

1. Create a form on the target site — blank, or from the [template library](https://wsform.com/templates/).
2. Export it from the layout editor export icon.
3. Edit a copy. Never author from scratch.
4. **Import into a scratch form and open it in the editor before delivering.**

The root `checksum` is written on export and cannot be recomputed outside the plugin. Whether import enforces it is **untested** — so always test-import. If a hand-edited file is rejected, import the unmodified export and make the changes in the editor instead.

## Step 1 — Intent

Ask, and record the answers in `discovery/brief.md`:

- **What single action should this form complete?** One form, one intent. Two intents means two forms.
- What happens after submission — who acts on it, and within what time?
- What does the submitter see next: message, redirect, or both?
- Is the person being answered, or also subscribing to something?

## Step 2 — Fields

For every proposed field, ask:

- **Who reads this, and what do they do with it?**
- **Does the answer change the response?** If not, drop the field.
- Can it be derived instead of asked — from the page, the URL, the referrer?

Then:

- **Required is the minimum needed to act on the request.** Everything else is optional or absent.
- Ask for a phone number only where someone will call.
- Never ask for the same thing twice in different words.

Record for each field: label, type, required or optional, help text, validation, error message.

## Step 3 — Field settings

- **Every field has a visible label.** Never a placeholder as a label.
- Use the specific type: email, tel, url, number, date — not text for everything.
- Set `autocomplete`: `given-name`, `family-name`, `email`, `tel`.
- Radio for few options, select for many, checkbox for multiple choice.
- File uploads: set accepted types and size. See [File Upload Accept Parameters](https://wsform.com/knowledgebase/file-upload-accept-parameters/).
- Hidden fields for source or campaign tracking. See [How Hidden Fields Work](https://wsform.com/knowledgebase/how-hidden-fields-work/).
- **Labels, help text, validation and error messages are copy.** Write them at step 3, in Italian, per [language.md](language.md) and [copywriting.md](copywriting.md).

## Step 4 — Actions

Set up the actions that run on submit. See [Actions](https://wsform.com/knowledgebase/introduction-actions/).

- **Email notification** to a monitored address. Configure per [Email Notification Settings](https://wsform.com/knowledgebase/email-configuration/).
- **Save the submission** in WordPress.
- **Spam check.**
- **Confirmation message** or redirect.

**Route submissions somewhere other than the WordPress database as well** — an inbox or CRM. See [backup-maintenance.md](backup-maintenance.md).

## Step 5 — Privacy

- The fields collected are processing activities. **Record them in `discovery/controller.md`**, with purpose, legal basis and retention as stated by the client — see [privacy-compliance.md](privacy-compliance.md).
- Link the privacy policy from the form.
- **A consent checkbox only where consent is the legal basis.** Answering an enquiry usually is not. Never pre-ticked, never bundled with anything else.
- Separate checkbox for marketing subscription, worded neutrally.
- **Third-party captcha is a third-party script**: it needs disclosure and, unless it qualifies as technical, consent. Prefer a honeypot or a native check. See [Spam Protection](https://wsform.com/knowledgebase_category/spam-protection/).
- Any destination the submission reaches is a recipient and goes in the policies.

## Step 6 — Verify

- [ ] JSON imports cleanly into a scratch form and opens in the editor.
- [ ] Actions present after import — the nested JSON string is the usual failure.
- [ ] Every field has a visible label and the correct type.
- [ ] Required fields are the minimum needed to act.
- [ ] **A real submission arrives in a real inbox**, read end to end.
- [ ] Validation and error messages appear in Italian.
- [ ] Keyboard navigation reaches every field and the submit button.
- [ ] Fields, purpose and retention recorded in `discovery/controller.md`.
- [ ] Consent checkbox present only where consent is the basis, and not pre-ticked.

Re-test the submission after go-live and after every update pass — see [backup-maintenance.md](backup-maintenance.md).

## Related docs

- [copywriting.md](copywriting.md) — step 3, which owns labels and messages
- [privacy-compliance.md](privacy-compliance.md) — step 11, where the fields are declared
- [backup-maintenance.md](backup-maintenance.md) — submission routing and re-testing
- [html.md](html.md) — markup and accessibility
