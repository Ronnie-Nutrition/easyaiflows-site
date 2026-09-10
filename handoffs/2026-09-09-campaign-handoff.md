# Campaign handoff and inquiry-click measurement

Added /js/inquiry-tracking.js to 85 tagged HTML pages and the industry-page generator. Explicit source/medium/campaign/content/term/id tags persist for up to 30 minutes in sessionStorage and are appended only to this site's existing inquiry form and strategy calendar links. A new tagged landing replaces previous tags; an external referral without tags clears them. Untagged traffic is not labeled organic. Existing destination campaign parameters are preserved. Only bounded campaign values are copied, not arbitrary URL parameters. Storage failure does not block navigation.

A click sends inquiry_form_open through the website's existing Google tag, with destination type and page path. It is an interest event, not a lead, booking, or key event. It does not prove that the destination finished loading. Source breakdowns should use GA4 session acquisition dimensions. Current CRM events cannot be assumed to share the website session; their source attribution requires a separate browser-to-server session bridge. No API secret belongs in this script.

Validation: node tests/inquiry-tracking.test.cjs covers tagged/internal/direct visits, expiration, external referrals, sensitive/unknown parameter exclusion, existing destination campaigns, unrelated links, unavailable storage and mouse interactions. Live deployment/GA4 verification is recorded in the private project scorecard after release.

Remaining: verify tagged submission attribution in the CRM and implement/test a supported session bridge before claiming campaign-attributed submitted leads or bookings. A click is never a replacement for conversion evidence.
