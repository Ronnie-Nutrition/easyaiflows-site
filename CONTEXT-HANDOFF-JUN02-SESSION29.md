# Session 29 Handoff — June 2, 2026

**Two major workstreams:** (A) SAM.gov venture launch and (B) FloLoyal → own-GHL migration + Meta CAPI integration.

---

## A. SAM.gov Federal Contracting Venture

### What we did
- Decided ownership: **Ysela = 51%+ owner** of new LLC → qualifies for WOSB, EDWOSB, and 8(a) certifications
- Confirmed Ysela passes economic disadvantage test (NW < $850K, AGI < $400K, assets < $6.5M) → **all 3 certs eligible**
- Identified the moat: Ronnie's RN + Ysela's counseling backgrounds + AZ/NM networks = healthcare-heavy federal contracts via IHS Phoenix Area and IHS Albuquerque Area
- Picked priority NAICS codes: 561320 (medical staffing), 621112 (mental health), 485991/621910 (NEMT), 611430 (training), 541930 (translation), 621610 (home health), 236220/238910 (construction)
- Created the Ysela one-pager (v2, includes EDWOSB + 8(a) story)
- Emailed draft to Ronnie.ysela@gmail.com (in Drafts — needs send)
- Proposed 5 LLC name options:
  1. **Craig-Tellez Strategic Group LLC** ← Claude's pick (signals WOSB/Hispanic at first glance)
  2. Lone Star Capability Partners LLC
  3. Sage Federal Services LLC
  4. Meridian Federal Group LLC
  5. Vista Federal Partners LLC

### Open threads
- [ ] **Ronnie to pick the LLC name** (Ysela conversation tonight)
- [ ] Verify name availability at [Texas SOS Direct](https://direct.sos.state.tx.us/)
- [ ] File Texas LLC ($300) by 6/8
- [ ] Get EIN from IRS (instant online)
- [ ] Submit SAM.gov entity registration by 6/15 (2-4 week activation window)
- [ ] File WOSB + EDWOSB self-cert day SAM activates
- [ ] 8(a) application — file ~6-12 months in OR pursue waiver path

### Files
- [SAMGOV-VENTURE-ONE-PAGER.md](SAMGOV-VENTURE-ONE-PAGER.md) (v2 — full cert stack)
- Memory: `project_samgov_venture.md`

---

## B. FloLoyal → own-GHL Migration + Meta CAPI

### What we did

**GHL token discovery + cleanup:**
- Mapped all 4 PIT tokens Ronnie shared:
  - `pit-39ccbed7-...` ← works for **Nutrition Hub on own-GHL** (`HJl01216dIdKMhk1SSn1`) — 5,298 contacts
  - `pit-e782c0f8-...` ← works for **EasyAiFlows** (`k5gu12TNotD5eV866JKZ`)
  - `pit-101f2b36-...` ← valid but scope unknown (Ronnie didn't recall — parked)
  - `pit-03386ad7-...` ← **REVOKED** — was in `/Users/apple/Desktop/Agentic_OS/agentic-os/.env`, now commented out
- Replaced .env vars with named tokens (`GHL_EASYAIFLOWS_TOKEN`, `GHL_NUTRITION_HUB_TOKEN`)
- Confirmed FloLoyal hides Private Integrations from sub-accounts → no API access there, manual CSV exports only

**Contact merge:**
- Ronnie exported FloLoyal Nutrition Hub contacts (5,844 rows)
- Script merged with own-GHL contacts (5,298 from API) → **5,416 unique master**
- **Delta: only 158 contacts in FloLoyal not in own-GHL** (97% already migrated)
- Files on Desktop:
  - `nutrition-hub-master-contacts.csv` (master de-duped with `source` column)
  - `nutrition-hub-meta-offline-events.csv` (Meta CAPI format, 5,416 events)

**Meta CAPI upload:**
- **38 events sent to Meta CAPI today** ✅ (`events_received: 38`)
- 473 events from 7-62 days → **blocked**: token lacks Marketing API scope to create offline event set; UI flow blocked by grayed-out Name field bug in CRM dataset modal (tried Chrome — still grayed)
- 4,943 events older than 62 days → not eligible anyway, no optimization value

**Daily cron deployed on VPS:**
- VPS: `root@64.23.156.59` (SSH key-based, works)
- Path: `/opt/nutritionhub-ghl-sync/daily_sync.py`
- Env: `/opt/nutritionhub-ghl-sync/.env` (chmod 600)
- Logs: `/opt/nutritionhub-ghl-sync/logs/sync.log`
- Cron: `0 4 * * * UTC` = **11 PM CDT daily**
- ⚠️ **Gotcha:** test run found 0 contacts in last 30h because new signups still flow to FloLoyal. Cron will quietly log "No events to send" until FloLoyal migration completes.

**Twilio phone:**
- Confirmed FloLoyal owns the Nutrition Hub Twilio number
- Ronnie has cadence call with FloLoyal owner **Thursday 6/5** → will request port-out then
- **Hard gate:** Do NOT cancel FloLoyal until port completes (5-10 business days)
- Realistic cancellation: **6/12 – 6/19**

### Open threads
- [ ] **Export Clover Customers CSV** (left sidebar → Customers → Export) — has phone + total spent → much better Meta event data than FloLoyal lead records
- [ ] After Clover export: re-merge + re-push events to Meta with real purchase values (not $5 placeholder)
- [ ] FloLoyal export remainder: workflows, opportunities, custom fields, marketing campaigns (P1 item)
- [ ] Re-point lead capture forms / counter check-in / SMS keywords from FloLoyal to own-GHL (so daily cron starts producing events)
- [ ] **Thursday 6/5:** Ronnie's call with FloLoyal owner → request Twilio port
- [ ] After port completes: cancel FloLoyal
- [ ] Resolve mystery of `pit-101f2b36-...` token (find which sub-account)

### Files
- [FLOLOYAL-EXPORT-CHECKLIST-PRD.md](FLOLOYAL-EXPORT-CHECKLIST-PRD.md) ← source of truth for migration order
- `nutrition-hub-master-contacts.csv`
- `nutrition-hub-meta-offline-events.csv`
- `/tmp/merge_contacts.py` (local merge script)
- `/tmp/send_to_meta_capi.py` (local CAPI push script — used for the 38-event push)
- `/tmp/daily_sync.py` (VPS sync script — deployed to /opt/nutritionhub-ghl-sync/)
- Memory: `project_floloyal_migration.md`, `project_nutrition_hub_pixel_capi.md` (updated), `reference_ghl_api.md` (updated)

---

## What to pick up FIRST next session

**Priority 1 (5 min):** Ronnie exports Clover Customers CSV to Desktop. Claude merges into master + re-pushes to Meta with real purchase values. Improves match rate immediately.

**Priority 2 (30 min):** Audit FloLoyal lead capture points (forms, SMS keywords, counter flow) and re-point them at own-GHL. This is what unblocks the daily cron from producing events.

**Priority 3 (when ready):** Decide LLC name → file Texas LLC.

---

## Reference: live infrastructure

| What | Where | Auth |
|---|---|---|
| Nutrition Hub order site | `order.nutritionhub101.com` (VPS 64.23.156.59 `/opt/nutritionhub-menu/`) | server.js + .env |
| Daily GHL→Meta sync | VPS `/opt/nutritionhub-ghl-sync/` | .env in same dir |
| Meta Pixel | `915336731481586` | `META_CAPI_TOKEN` in VPS .env |
| Own-GHL Nutrition Hub | location `HJl01216dIdKMhk1SSn1` | `pit-39ccbed7-...` |
| Own-GHL EasyAiFlows | location `k5gu12TNotD5eV866JKZ` | `pit-e782c0f8-...` |
| VPS SSH | `root@64.23.156.59` | `~/.ssh/id_ed25519` (key-based) |
| Mac Mini SSH | `macminiserver@100.76.74.31` | `~/.ssh/id_ed25519` (key-based) |

---

*Per memory rules: commit and push this handoff to GitHub before ending.*
