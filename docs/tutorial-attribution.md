# Tutorial-to-strategy-call measurement — November 13, 2026

Participating tutorials: publish-claude-designed-website, export-claude-design-as-png, do-all-ai-tools-build-the-same-ui.

## What is measured

After explicit analytics opt-in, `strategy_call_click` records a click to the exact existing strategy calendar, with `page_path`, `tutorial_id`, `link_url`, `link_text` and `destination`. This is an outbound click, NOT proof of a loaded calendar or completed booking. Inquiry-form links retain the existing `inquiry_form_open` event and also receive the tutorial context. No event is marked as a key event by this release; no appointment events are created or replayed.

The last participating tutorial is remembered within a tab for 30 minutes of activity, including through the services page. External referrals/new campaign entries reset previous tutorial context. This is an assisting/last-tutorial measure, not first-touch acquisition or proof of causality. Existing campaign UTMs are preserved. Missing utm_content gets `eaf_tutorial_<slug>`; `eaf_tutorial=<slug>` is also added to exact CRM destinations. Existing utm_content is never overwritten; in that case the custom URL parameter may only be available in the captured landing URL, not a native CRM field. No internal site links receive UTMs and organic source labels are never invented.

## Consent and coverage

The 105 pages with the existing GA4 loader now load shared basic consent code first; industry generator updated too. Google Analytics and attribution storage/decorating remain off until Allow analytics. Decline leaves ordinary inquiry/booking links usable. Preferences can be changed at the page bottom, are retained for 180 days, and revocation clears campaign/tutorial storage and Google Analytics cookies, disables measurement and reloads. Other open tabs reload on preference changes. No premium service or webhook enabled. Existing CRM workflows and external calendar provider settings are unchanged; this release does not establish consent handling inside those workflows.

The opt-in change creates a measurement break on November 13: do not interpret fewer measured sessions/clicks as less actual traffic or compare directly with the old unconditional collection baseline. No retroactive attribution or backfill is possible. People declining, blocking analytics, switching devices/tabs or returning after expiry may remain unattributed.

## Existing reporting

GA4 property 553511587 (EasyAiFlows — Web): registered event-scoped custom dimension **Assisting tutorial**, parameter `tutorial_id`, verified in Admin. After real events are processed, Explore with Event name = strategy_call_click, rows Assisting tutorial and Page path, values Event count / Total users. For assisted form routes use inquiry_form_open separately. Event count counts clicks, not unique people or bookings. Older inquiry_form_open events included calendar clicks; this release separates those into strategy_call_click. Do not combine overlapping event definitions without date boundaries.

HighLevel documents calendar booking submissions as attribution-capture events. For an actual confirmed appointment, inspect its linked contact's attribution at that time and look for the tutorial utm_content or tagged landing URL, checking the correct calendar and appointment record. A contact's mutable latest attribution is not a permanent per-appointment ledger; never assign every booking for that contact to the same tutorial. Exclude cancelled/rescheduled duplicates and known setup records.

Completed-booking attribution remains unverified until a genuine consented booking demonstrates captured tutorial evidence. Native CRM-to-GA4 session/source association remains unverified from prior work. No paid webhook, synthetic booking, notification-triggering submission, or claim of zero business bookings was made. If CRM doesn't retain tutorial metadata for a booking, mark it unknown rather than matching identities/timestamps to manufacture attribution. This release verifies URL handoff and client event construction, not Google ingestion or production CRM capture.

## Verification

Node tests cover consent denial/grant/revocation, campaign preservation, direct and assisted handoff, expiry, external referral reset, blocked storage, click type, unknown/sensitive query parameter exclusion and no booking events. Browser checks with Google collection blocked verified no Google script or tracking storage before/after decline; three tutorial-specific click payloads after opt-in; tags through services to the existing inquiry form; and the tagged calendar rendered Free AI Strategy Call — EasyAiFlows (15 min). No form submitted or time booked. All HTML loader replacements validated; diff check passed.

Sources: https://developers.google.com/tag-platform/security/concepts/consent-mode and https://help.gohighlevel.com/support/solutions/articles/48001219997-understanding-attribution-source . Use existing weekly reporting; no new schedule is required. Nutrition Hub checks are separate and unchanged.
