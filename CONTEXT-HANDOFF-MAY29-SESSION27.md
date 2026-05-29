# Session 27 Handoff — 2026-05-29

## What we did this session

### Part 1 — Meta ads audit (continuing from Session 26)
- Audited **Sprint to Summer** (Herbalife distributor reminder, campaign `120248142182120092`): config-checked, $13.65 spent / 2 days, CTR 2.81%, frequency 4.2 against a 1,000-person custom audience. Verdict: deadline-driven reminder ad, auto-stops 5/31, no action needed.
- Audited **EasyAiFlows grader ad** (campaign `120247959569850020`, $15/day, launched 5/18): 11 days, $152 spent, 0 calls booked, 1 email captured. CTR 7.70% (elite) but landing page leak — 102 clicks → 43 LPVs (58% drop). Diagnosis: ad creative is working, landing page + funnel is broken.
- Ronnie **paused the EasyAiFlows grader ad** himself at 1:03 PM. Stops the bleed while the page gets fixed (separate task).
- Verified workhorse Nutrition Hub ad still healthy (last fired 5/28 18:51 CT).

### Part 2 — Built the Operator Kit Meta ad campaign (new)
- Created **Campaign `120248899186020020`** — "Operator Kit - Cold Outbound v1" on the EasyAiFlows ad account (`act_949997431238662`).
- Created **Ad Set `120248966589530020`** — US 18-65, English locale, Advantage+ Audience + Advantage+ placements, optimized for `ADD_TO_CART`.
- Created **Ad `120248966591990020`** — points at `https://easyaiflows.com/operator-kit/` with PRD-aligned copy.
- Old ad set + ad (with `INITIATED_CHECKOUT` optimization) deleted — replaced after we discovered Meta locks optimization event after publish.
- Ronnie uploaded a fresh 34-second selfie video showing him + Claude Code on screen, in two aspect ratios (`IMG_1312.mov` 34.4s + `IMG_2087.mov` 34.0s).
- Campaign budget reduced to **$10/day** by Ronnie (was $15 in initial build).
- Advertiser verification (driver's license) — completed and verified.
- Ad creative published; entered Meta's review queue (PENDING_REVIEW).

### Part 3 — Tracking stack: Pixel + Gumroad CAPI
- Installed EasyAiFlows pixel `1609715360098067` on the operator-kit landing page (commit `546e4f6` in easyaiflows-site).
- Iterated through 3 versions of the buy-button event:
  1. First built with `InitiateCheckout` on outbound click (commit `546e4f6`) — wrong (the fake-IC bug PRD #02 warns against)
  2. Tried `Lead` (commit `96aa5ab`) — Meta API rejected: LEAD not valid for OUTCOME_SALES
  3. Settled on `AddToCart` (commit `1bfcb4a`) — correct per PRD event taxonomy + valid for OUTCOME_SALES
- Wired Gumroad pixel integration (Settings → Advanced → Third-party analytics → pixel ID `1609715360098067` + Purchase events enabled). Ronnie did this in the Gumroad UI.
- Verified via Pixel Helper (incognito on https://easyaiflows.com/operator-kit/):
  - ✅ `PageView` fires on load
  - ✅ `ViewContent` fires on load
  - ✅ `AddToCart` fires on "Get instant access" click
  - ✅ Gumroad-side `ViewContent` fires (proves their pixel integration works)
  - ⚠️ Meta auto-detection also fires `SubscribeButtonClick` (noise but harmless)
- Confirmed **domain verification** for easyaiflows.com was already done.
- Confirmed **AEM (Aggregated Event Measurement)** is auto-managed by Meta for 2026+ pixels — no user-facing controls in UI or API. Nothing to do.

### Part 4 — PRD updates from day-2 learnings (Operator Kit v1.1)
- Initialized `/Users/apple/GTM-Workspace/operator-kit/` as standalone local git repo.
- Updated **PRD #02 (Meta Ad Operator)** with 5 substantial additions:
  - Phase 1: Pixel Helper "Show all events" tip (summary view hides custom events)
  - Phase 1B (new): Third-party checkout platform integration (Gumroad/Shopify/Stripe Checkout/Kajabi)
  - Phase 3: corrected optimization event picker — split into OUTCOME_SALES vs OUTCOME_LEADS tables (original combined incorrectly)
  - Phase 4B (new): pre-launch checklist
  - Appendix (new): Meta Marketing API gotchas with a working Python helper
- Updated **PRD #09 (Workhorse Anatomy)** with matching corrections:
  - Optimization event picker fixed (same OUTCOME_SALES/LEADS split)
  - Common ad set mistakes expanded with 4 new entries
  - API verification section expanded with bid_strategy + pixel health checks
  - New section: Working with third-party checkout
- Rebuilt **ZIP at v1.1** (85KB, up from 80KB) at `/Users/apple/Desktop/claude-code-operator-kit-v1.1.zip`.

## What's pending

### Ronnie's tasks
1. **Flip the ad ACTIVE in Meta Ads Manager.** Toggle the campaign + ad set + ad to ON. The ad will sit queued until Meta finishes review (PENDING_REVIEW → ACTIVE-ELIGIBLE), then start serving. No need to babysit.
2. **Re-upload v1.1 ZIP to Gumroad** at https://app.gumroad.com → your product → Files. Replace the existing ZIP with `~/Desktop/claude-code-operator-kit-v1.1.zip`. Existing buyers get the v1.1 automatically per "Lifetime updates."
3. **Create a private GitHub repo for the Operator Kit source** (so the 15 PRDs have a remote backup, not just local). Suggested name: `claude-code-operator-kit-source`. Once created, run:
   ```bash
   cd /Users/apple/GTM-Workspace/operator-kit
   git remote add origin https://github.com/Ronnie-Nutrition/claude-code-operator-kit-source.git
   git push -u origin main
   ```

### Performance monitoring window
- **First 24 hrs after going ACTIVE:** don't touch. Meta learning phase.
- **Days 2–4:** check CTR (target >1.5%), CPC (target <$2), AddToCart cost (target <$10). 0–1 AddToCart in first 3 days is normal at this volume.
- **Day 7:** first decision point. 0 sales but good CTR + AddToCart cost → page/offer issue. 1+ sales → double down.
- **2–3 weeks in:** once 50+ AddToCart events accumulated, switch optimization event to `Purchase` (will require a new ad set since published ones are locked).

### Fix the EasyAiFlows grader landing page (separate task, no rush)
The grader ad is paused — page is the leak. Open https://easyaiflows.com/grader/ on mobile, time the load, find why 58% of clickers don't see PageView. Once fixed, the grader campaign can come back online — that 7.70% CTR was real.

## Key files touched this session

- `/Users/apple/easyaiflows-site/operator-kit/index.html` — Pixel install (commits `546e4f6`, `96aa5ab`, `1bfcb4a`)
- `/Users/apple/GTM-Workspace/operator-kit/.git/` — NEW git repo (initial commit `6fccb1b`)
- `/Users/apple/GTM-Workspace/operator-kit/skills/02-meta-ad-operator-prd.md` — v1.1 updates (commit `6894970`)
- `/Users/apple/GTM-Workspace/operator-kit/skills/09-workhorse-ad-anatomy.md` — v1.1 updates (commit `6894970`)
- `/Users/apple/GTM-Workspace/operator-kit/dist/claude-code-operator-kit.zip` — rebuilt to v1.1
- `/Users/apple/Desktop/claude-code-operator-kit-v1.1.zip` — copy for Gumroad re-upload
- `/tmp/build_op_kit_campaign.py` — campaign creation script (kept for reference)
- `/tmp/rebuild_op_kit_adset.py` — adset rebuild script (kept for reference)
- `/tmp/update_op_kit_adset.py` — adset update script (kept for reference)

## Credentials / IDs / config worth keeping

| Item | Value |
|---|---|
| EasyAiFlows ad account | `act_949997431238662` |
| EasyAiFlows pixel | `1609715360098067` |
| EasyAiFlows page | `1011205275409851` |
| EasyAiFlows IG | `17841446747607762` |
| Operator Kit campaign | `120248899186020020` (PAUSED — flip ACTIVE to launch) |
| Operator Kit ad set | `120248966589530020` (US 18-65, AddToCart opt) |
| Operator Kit ad | `120248966591990020` |
| Operator Kit creative | `1008438548789841` (most recent — has both videos) |
| Operator Kit videos | `1506569281258693` + `2209370119848975` (34 sec each, different aspects) |
| EasyAiFlows grader campaign | `120247959569850020` (PAUSED by Ronnie 5/28 13:03 — page leak to fix) |
| Sprint to Summer | `120248142182120092` (active, auto-stops 5/31) |
| Workhorse Nutrition Hub | `120244072563520092` ($35/day, still running) |
| Meta API token | env `META_ACCESS_TOKEN` in `/Users/apple/GTM-Workspace/.env` |

## The exact prompt to start the next session

```
Continue from CONTEXT-HANDOFF-MAY29-SESSION27.md — check status of the
Operator Kit Meta ad (campaign 120248899186020020). Pull the last 24 hr
performance via Graph API, plus any Gumroad sales since launch. Tell me
what's working, what isn't, and whether to hold, scale, or kill.

Also confirm:
- v1.1 ZIP is uploaded to Gumroad
- Operator Kit folder is pushed to a remote GitHub repo
```
