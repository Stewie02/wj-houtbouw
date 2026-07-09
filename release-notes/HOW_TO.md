# Making release notes

How to produce a new release note in the same style as this folder.

**Note:** the release note content is written in **Dutch** (it's for the client). This
instruction file, and any other tooling/meta text, stays in English.

## Audience and tone

- For the **non-technical client**. No jargon, no file names or code.
- **Dutch** copy, no hyphens used as punctuation in running text.
- Keep points **short**: one bold heading + one or two sentences.

## Structure (always these three parts)

1. **Title + date** — `# Verbeteringen aan de webshop` with the date below it (`*9 juli 2026*`).
2. **What's new** (`## Wat er nieuw is`) — the shipped items, each a short point. Only what is
   actually done and live.
3. **What the client must do in Medusa admin** (`## Wat je zelf nog moet doen in Medusa admin`) —
   the manual setup actions, numbered. Visually set apart (accent bar in the PDF).

Base the content on the checked-off (`✅ DONE`) items in `CONVERSION_PLAN.md`. Include only what
is demonstrably finished; leave out work in progress.

## Files

- `release-notes-YYYY-MM-DD.md` — the markdown source (date in the file name and in the text).
- `release-notes-YYYY-MM-DD.pdf` — the PDF for the client.
- `template.html` — the styling. Copy it, fill in the content, generate the PDF.

## Styling (in template.html)

W&J Houtbouw brand colours:

- Headings: `#2B4D1A` (wj-green), title `#12100D` (wj-dark)
- Date label: `#C4843A` (wj-wood), uppercase
- Body: `#1A1410`, secondary `#7B6F65`
- Admin blocks: background `#EDE9E3` with a left accent bar `#C4843A`
- Serif headings (Georgia), sans-serif body. Square corners, no rounding.

## Generating the PDF

There's no pandoc/weasyprint on this machine; use Chrome headless:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="release-notes/release-notes-YYYY-MM-DD.pdf" \
  "release-notes/template.html"
```

Workflow: copy `template.html`, edit the content, generate the PDF, and keep the markdown as the
source of truth.
