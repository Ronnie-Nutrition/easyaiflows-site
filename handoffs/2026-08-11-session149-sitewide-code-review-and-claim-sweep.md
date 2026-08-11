# Session 149 — 2026-08-11 — easyaiflows-site code review: generator bugs, sitewide claim sweep, technical SEO

⭐ **Authority is the PRD + memory, not this file:** `/Users/apple/GTM-Workspace/SEO-MASTER-PRD.md`
(Workstream C) and memory `project_easyaiflows_industry_pages`.

**Edit `ai-for/generate-pages.js`, never the HTML.** Still true. Everything below that touches
`/ai-for/` was done in the generator and regenerated.

**✅ PUSHED AND VERIFIED LIVE** (`569d595..1dbd479`). Ronnie approved after reviewing the copy changes.
All 20 pages re-fetched from easyaiflows.com: 0 no-slash links, 0 missing OG/breadcrumb/canonical,
0 invalid JSON-LD, all 20 CTAs correct, proof link live, fabricated case studies gone.

---

## The review scope from session 148, and what it found

| # | Scoped item | Result |
|---|---|---|
| 1 | `generate-pages.js` — look for more naive string transforms | **4 more bugs found**, all rendered-verified |
| 2 | Rest of site for the same claim defect | **7 claim defects**, worst is 3 fabricated case studies |
| 3 | `og:image` propagation | Done — 0 → **70 indexable pages** |
| 4 | Whatever the review turns up | The 408-link redirect defect, the sitemap landmine, a duplicate-content pair |

---

## 🐛 Generator bugs (all confirmed against rendered HTML, not source)

### 1. 408 internal links were redirect hops — the big one
Every `/ai-for/` cross-link on the property omitted the trailing slash: `href="/ai-for/dentists"`.
GitHub Pages 301s that to `/ai-for/dentists/`. **408 links sitewide**, every one a redirect.

This is the *same missing slash* that caused the four-month unstyled-CSS bug fixed on 8/10. It was
fixed in the CSS path then and left everywhere else.

Fixed in the generator, the hub, and both city pages. **Sitewide count is now 0.**

### 2. `.toLowerCase()` ate an acronym
`${industry.name.toLowerCase()}` rendered *"transform how **hvac companies** operate"* and
*"tailored to how **hvac companies** actually work"* — two paragraphs, live for four months.
Exactly the singularizer's species: a naive string transform nobody read the output of.

Replaced with a `lowerName` that preserves any already-all-caps token.

### 3. The singularizer was fixed but its output was still wrong
Session 148 fixed the *ordering* bug, so the strings became grammatical. They were still
commercially wrong, because "\<singular\> Business" is the wrong register for most of these trades:

> Ready to Automate Your **Dentist** Business? · Your **Chiropractor** Business? · Your
> **Photographer** Business? · Your **Auto Repair Shop** Business? · Your **Pet Groomer** Business?

⭐ **A grammar fix is not a copy fix.** The `ctaNoun` escape hatch already existed from 148 — it was
just only used on 3 industries. Now set explicitly on **all 20**, so the regex is a fallback that
never actually fires. Verified by reading all 20 rendered H2s.

### 4. JSON-LD was assembled with a hand-rolled quote escape
`f.q.replace(/"/g,'\\"')` escapes `"` and nothing else. One backslash, newline or tab in a future FAQ
string emits invalid JSON-LD and silently kills that page's rich result. Now `JSON.stringify`.
**All 133 JSON-LD blocks sitewide now parse.**

### 5. `_gen_sitemap.py` was a loaded gun
Its docstring said *"ai-for industry pages: extensionless (/ai-for/dentists)"* and the code wrote
exactly that — **no trailing slash**, contradicting the canonical on every one of those pages. The
committed `sitemap.xml` happened to have slashes, so nothing was broken *yet*; the next run of the
script would have submitted 20 redirecting URLs to Google. Fixed and regenerated.

---

## 🔴 Claim defects outside `/ai-for/` — the sweep 148 didn't do

Homepage body and `pricing.html` came back **clean**. The blog did not.

**The worst: `blog/ai-automation-roi-small-business.html` had three fabricated case studies** under
the heading **"Real-World Examples"**, with named-sounding clients and specific outcomes —
*"Net impact: +$2,400/month"*, *"$585/month in saved revenue"*, *"Total impact: $3,000/month"*, plus
*"I've seen businesses hit 15-20x"*. Presented as delivered client results.

Reframed to **"Run It on Three Kinds of Business"** — worked examples of the ROI formula, explicitly
labelled *"These are worked examples, not client results."* The math stays (it's the useful part);
the claim that we produced it for someone goes. Each example now also names the assumption it rests
on, which is more honest *and* better copy. `blog/index.html` card and the JSON-LD description said
"case studies" — both fixed.

Other claims removed:

| Claim | Where | Why |
|---|---|---|
| *"Research shows 80% of sales require 5+ follow-ups, but 44% give up after one"* | 3 posts + blog index, **and in FAQPage schema** | Circulates everywhere, traces to no identifiable study. "Research shows" is borrowed credibility |
| *"Restaurants that implement this see their Google review count jump 40-60% in 90 days"* | restaurants post, **in schema** | Outcome claim about our customers |
| *"cut churn by 20-30%. That's thousands in saved revenue every month"* | restaurants post, **in schema** | Same. Kept the industry-context half (gyms lose 30-50% of new members) — that's the prospect's own problem, per 148's rule |
| *"Most business owners report saving 60-75%"* | social posts article, **in schema** | A survey nobody ran |
| *"I've seen it happen with every single client"* | booking post | Unverifiable universal |
| *"save business owners 10+ hours every week"* | **homepage** meta description ×4 copies | Outcome claim in the site's most-shown snippet |

⚠️ **The homepage one had FOUR copies**, not one — meta description, `og:description`,
`twitter:description`, and a second og variant. Session 148's rule (*"every FAQ string renders twice,
visibly and in schema"*) generalises: **grep the string, don't edit the tag you found it in.** The
follow-ups post's stat also lived in 2 places, and the restaurant churn claim in 2.

### ✅ Proof restored — pending item #3 closed
The `/ai-for/` pages carried **zero** proof after 148 stripped the fake stats. Every page now ends its
stats band with a line pointing at the one honest set of numbers on the property — Ronnie's own
Nutrition Hub follow-up results in `blog/automate-follow-ups-small-business.html`, first-person and
hedged. Added `id="real-results"` to that heading as the anchor target. Rendered on all 20.

---

## 🔧 Technical SEO

| Item | Before | After |
|---|---|---|
| Indexable pages missing `<link rel="canonical">` | **48** (incl. the homepage) | 0 |
| Indexable pages missing `og:image` | 69 of 70 | 0 |
| Internal `/ai-for/` links that 301 | 408 | 0 |
| Invalid JSON-LD blocks | 0 of 133 | 0 of 133 |
| Sitemap URLs disagreeing with the page's own canonical | 33 | 0 |
| Titles > 62 chars | 22 | 0 over 80 except 3 |
| Meta descriptions > 200 chars | 12 | 0 |
| `BreadcrumbList` schema on `/ai-for/` | none | all 20 |

Also fixed:
- **Cross-link block trimmed 19 → 6 + "See all 20".** Nineteen sibling links on every page reads as a
  link farm and splits the equity 20 ways. Six rotate by array position, so the set differs per page
  and every page still receives ~6 inbound.
- **`/blog/*` canonicals were extensionless, the sitemap said `.html`.** Matched them to `.html` —
  the form Google has been crawling since 7/15. A canonical that disagrees with the sitemap is worse
  than either choice alone.
- **`assistant.html` and `assistant/index.html`** are near-identical pages at two URLs, each
  canonicalising to itself. Both now point at `/assistant/`.
- **`operator-kit`'s `og:image` was a relative path** (`content="og-image.png"`) — scrapers need an
  absolute URL, so that share preview never worked. Now absolute.
- **`champions/` ("Tracker Mockup") was in the sitemap.** Now `noindex` and delisted, with
  `teleprompter.html`.
- Meta descriptions added to `assistant`, `perfect-pitch-kit`, `kolab`.
- Footer "Pricing" linked to `/#pricing` (a homepage anchor) instead of the real `/pricing` page.

---

## ⚠️ Mistake worth recording

Trimming meta descriptions with `s.replace(f'content="{old}"', new)` where `old` came from a regex
`content="(.*?)"` with `re.S` — on `operator-kit/index.html`, which writes its metas as `" />`, the
non-greedy ran past the intended tag to the next `">` and **deleted 272 lines** including the entire
`<style>` block. Caught by `git diff --stat`, reverted with `git checkout`, redone with exact-string
edits.

⭐ **`git diff --numstat | awk '$2>$1'` after any scripted multi-file edit.** Any file with more
deletions than insertions when you were only swapping copy is structural loss. That check is now part
of the verification pattern alongside 148's "insertions should equal deletions when swapping 1:1."

---

## ⏳ Pending

| # | Item | Who |
|---|---|---|
| 1 | ~~`git push`~~ ✅ done — `1dbd479`, verified live | — |
| 2 | ~~Request indexing for `/ai-for/churches/`~~ ✅ Ronnie did it 8/11 8:11 AM — churches was already indexed | — |
| 3 | ~~Verify the nonprofits FAQ claim~~ ✅ closed 8/11 — Ronnie confirmed multiple nonprofits, grant research. Rewritten + live (`10b1d71`) |
| 4 | **Restart the blog** — cold since 7/5. The 5 church GSC queries are 5 ready-made titles | Claude drafts |
| 5 | 18 pages still on the plain template (546–608 words, 36–40% dup) | Claude, one at a time |
| 6 | ~~Resubmit `sitemap.xml`~~ ✅ done 8/11 1:45 PM — **69 → 70 discovered pages**, Google re-read on submit |
| 7 | **3 blog posts still need Request Indexing** — daily quota hit at 11. Do these FIRST tomorrow | **Ronnie** |

## 📋 GSC actions taken 8/11 — and the two gotchas

**Requested indexing (11 total, quota exhausted):**
- 8:11–8:17 AM (7): `/ai-for/`, `/blog/`, `/pricing`, `/ai-for/hvac/`, and the ROI, lead-gen and
  appointment-booking posts. ⚠️ **All submitted BEFORE the first push** — harmless, since Google
  crawls what is live when it reaches the queue.
- 12:56 PM (4): `/`, `/nonprofit`, `/ai-for/nonprofits/`, `/ai-for/churches/`.

**⏳ Blocked by the daily cap — do first thing tomorrow:**
```
https://easyaiflows.com/blog/automate-follow-ups-small-business.html
https://easyaiflows.com/blog/ai-for-restaurants-salons-fitness.html
https://easyaiflows.com/blog/can-ai-write-social-media-posts.html
```
All three carry **FAQPage schema containing claims that were removed today**, so Google is currently
eligible to serve rich results quoting text no longer on the page. ⚠️ **My sequencing error:** I put
the priority note *below* the list instead of ordering the list by it, so the three that mattered
most are the three that got cut. **Order the list by priority; do not append the priority as a note.**

⭐ **"Page is indexed" describes the LAST CRAWL, not current content.** All 7 of the afternoon batch
came back indexed — which is precisely why they needed submitting, not a reason to skip them. GSC
even prompts for it: *"Page changed? REQUEST INDEXING."*

🐛 **Sitemap resubmit on a DOMAIN property needs the full URL.** Typing `sitemap.xml` returns
*"Invalid sitemap address"* — `sc-domain:` properties span http/https/www/non-www so GSC cannot infer
the host. Enter `https://easyaiflows.com/sitemap.xml`. **Google had not re-read the sitemap since
Aug 6** — five days of unread `lastmod` values. On resubmit: 69 → 70 discovered, immediately.

**On #3 — CLOSED 8/11 (`10b1d71`, live).** Ronnie: *"I've worked with multiple nonprofits helping them
research grants for their business."* That substantiates the plural but **not the geography** — and
geography is what the FAQ question actually asks (*"Do you work with nonprofits outside Texas?"*).

⭐ **The old answer replied to a location question with a roster boast.** The fix was not to verify
the boast, it was to answer the question with the *mechanism*: the build is remote, calls are video,
nothing needs anyone on site — **true regardless of where any client is**, and more useful to a
reader in Ohio than a roster size. 🔑 **When a claim can't be verified, check whether the sentence was
even answering the question. Often the honest version is also the better answer.**

Two lines got **stronger**, not weaker: both deep dives said *"we write grants for **a charitable
foundation**"* — singular, when Ronnie has several. Now "grant research for several nonprofit
organizations." Used his own scope word (*research*); **did not upgrade to "write"** without asking,
even though memory logs [[client_lphf]] as a grant-*writing* engagement.

**Both follow-ups answered and shipped (`085af7e`, live):**
1. ✅ The LPHF work **is** full grant writing. All three lines now say *"research and write grants for
   several nonprofit organizations."*
2. ✅ **Three** successful 501(c)(3) filings. `nonprofit.html` said *"refined over **multiple**
   successful filings"* — true at three, but changed to *"refined over **three** successful filings."*

⭐ **This thread ran in both directions and that is the point.** Four claims were removed as
unsupported; three were made **stronger** once the facts were checked (*a charitable foundation* →
*several nonprofit organizations*; *research* → *research and write*; *multiple* → *three*). 🔑 **A
claim sweep is not a deletion pass. Vague quantifiers hide real credentials as often as they inflate
absent ones — "multiple" reads as puffery, "three" reads as fact, and it was three the whole time.**

The footer's *"Serving clients nationwide"* is a service-area statement and is fine as-is — that
line describes where the company will work, not a roster it has.

## 🔍 GSC reality check — Ronnie inspected 16 URLs, 8/11 ~8:15 AM

**9 indexed, 7 not.** The misses are not random:

| Not indexed | Status |
|---|---|
| `/ai-for/` | Discovered – currently not indexed |
| `/blog/` | Discovered – currently not indexed |
| `/blog/ai-automation-roi-small-business.html` | Crawled – not indexed (last crawl Jul 29) |
| `/blog/automate-lead-generation-ai.html` | Discovered – not indexed |
| `/blog/automate-appointment-booking-ai.html` | **URL unknown to Google** |
| `/ai-for/hvac/` | **URL unknown to Google** |
| `/pricing` | **URL unknown to Google** |

⭐ **Both hub pages are unindexed.** `/ai-for/` and `/blog/` feed crawl discovery to 54 children —
that is the shape of the problem, not 7 unrelated misses. Indexing requests submitted for all 7.

⚠️ **The three "unknown to Google" URLs all reported *"No referring sitemaps detected."* That is NOT
a sitemap bug** — all three are in the live sitemap, it serves 200, and the URL forms match exactly.
GSC simply has no attribution data for a URL it has never fetched. **Don't chase that string as a
symptom; verify against the live sitemap first.**

✅ **But chasing it found a real one:** `/pricing` had **2 internal links while 26 pages pointed at
`/#pricing`**, a homepage anchor. In the sitemap since 7/28, never fetched. 🔑 **A page orphaned in
the internal link graph is one Google feels no obligation to crawl, sitemap listing or not.** Fixed
in the generator plus 7 hand-written pages (`grader`, `assistant`, `perfect-pitch`, both city pages,
the hub) — **2 → 28 internal links**, commit `1dbd479`. The same mechanism plausibly explains
`/ai-for/hvac/`: until this push every internal route to it was a 301.

⚠️ **I gave Ronnie one wrong recommendation and corrected it.** I said don't bother submitting the 14
remaining `/ai-for/` pages since "only meta changed" — that assumed they were indexed. HVAC is
unknown to Google entirely. **Use Indexing → Pages for the real indexed/not-indexed split across all
70 URLs; do not submit from a guess about what changed.**

**On #5 — do not deepen by word count, deepen by demand.** Pull GSC queries first and pick the page
with real query volume behind it, the way churches was picked in 148. Word count is the output, not
the target. Use the `deepDive` field so the other pages stay byte-identical.

---

## 🧪 The verification pattern (now three checks)

After regenerating:
1. `git status --short` lists *exactly* the pages you intended plus the generator.
2. `git diff --numstat | awk '$2>$1 {print}'` is **empty** — no file lost net content.
3. Read the **rendered** H1/H2/paragraph output of all 20 pages, not the source. Both bugs this
   session and the singularizer in 148 were invisible in the source and obvious in the output.

Then `curl` the live URL **with the trailing slash** — GitHub Pages lags the push a minute or two,
and it 301s the no-slash form.

---

## Standing rule that keeps proving itself

⭐ **A claim sweep is only coherent at page scope, never at element scope** (148) — and the same is
true at *site* scope. 148 swept `/ai-for/` and the identical claims were sitting in the blog, in
schema, eligible for rich results, the whole time. When a claim is found, grep the whole property for
the string before fixing the instance in front of you.
