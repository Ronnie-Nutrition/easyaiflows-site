# Claude Cowork Prompt — Build GHL Nurture Drip

Paste the prompt below into Claude Cowork (in Claude Desktop). Before you do, make sure:

1. You're logged into GHL at `app.gohighlevel.com`
2. You're in the **Easy AI Flows** sub-account (NOT Nutrition Hub — top-left location switcher)
3. The file `ghl-nurture-drip-emails.md` exists at `/Users/apple/easyaiflows-site/`

---

## Prompt To Paste Into Claude Cowork

```
I need you to build a 5-email nurture drip workflow in Go High Level (GHL).

CONTENT SOURCE:
The 5 email subject lines and bodies are in this file on my computer:
/Users/apple/easyaiflows-site/ghl-nurture-drip-emails.md

TARGET:
- GHL Sub-account: Easy AI Flows (location ID: k5gu12TNotD5eV866JKZ)
- I am logged in and in the correct sub-account
- Workflow tool: app.gohighlevel.com → Automation → Workflows

INSTRUCTIONS:

Step 1 — Read the email content file
Open /Users/apple/easyaiflows-site/ghl-nurture-drip-emails.md and parse out:
- The 5 emails (subject + body for each)
- The workflow logic at the bottom (timing and exit conditions)

Step 2 — Navigate to GHL Workflows
Go to https://app.gohighlevel.com → Automation → Workflows
Confirm you're in the "Easy AI Flows" sub-account.
Click "+ Create Workflow" → "Start from scratch" (or "Blank Workflow").

Step 3 — Name the workflow
Name: "AI Grader Lead Nurture - Batch 1"
Save.

Step 4 — Add the trigger
Click "Add Trigger" → choose "Contact Tag Added"
Configure:
- Trigger name: "Grader Lead Tagged"
- Tag: ai-grader-lead
Save the trigger.

Step 5 — Build the workflow steps

After the trigger, add these steps in order. The email bodies are in the markdown file — copy them EXACTLY (do not rewrite them, do not let GHL's AI "improve" them).

5a) WAIT step — 1 hour

5b) SEND EMAIL #1
- From name: Ronnie Craig
- From email: ronnie@easyaiflows.com
- Subject: Your AI Readiness Score is locked in 🎯
- Preview text: Plus what I'd actually do with it...
- Body: Copy the full body of Email #1 from the markdown file
- Make sure unsubscribe link is included (GHL adds automatically — verify it's there)

5c) WAIT step — 2 days

5d) SEND EMAIL #2
- Subject: Why I left my comfort zone (and what it taught me about AI)
- Preview text: I'd been a nurse for 30 years when this happened...
- Body: Copy the full body of Email #2 from the markdown file

5e) WAIT step — 3 days

5f) SEND EMAIL #3
- Subject: The 3 questions I ask every business owner
- Preview text: Use this before you spend a dollar on AI...
- Body: Copy the full body of Email #3 from the markdown file

5g) WAIT step — 4 days

5h) SEND EMAIL #4
- Subject: Here's what I'd automate first if I were you
- Preview text: Doesn't matter what business you're in...
- Body: Copy the full body of Email #4 from the markdown file

5i) WAIT step — 5 days

5j) SEND EMAIL #5
- Subject: Last note from me (unless you want me to keep sending)
- Preview text: I won't keep showing up in your inbox uninvited...
- Body: Copy the full body of Email #5 from the markdown file

Step 6 — Add exit conditions
Use GHL's "Goal Event" or "Wait For Event" feature to remove contacts from the sequence when ANY of these happen:
- Contact books a TidyCal appointment (use "Appointment Status: Booked" condition if available, otherwise tag-based)
- Contact replies to any email (use "Email Replied" event)
- Contact gets the tag "do-not-email" added

If contact matches any exit condition → END workflow.

Step 7 — Test the workflow before publishing
- Click "Test Workflow" or use GHL's test feature
- Run a dry test against contact: ronnie.c@easyaiflows.com (this is my test contact, already tagged ai-grader-lead)
- Verify the emails preview correctly with no broken formatting

Step 8 — Publish
- Toggle the workflow from Draft → Published
- Verify "Published" status is showing at the top

Step 9 — Enroll the May 25 lead manually
After publishing:
- Go to Contacts → search for "maps-ratter-8i@icloud.com" (this is a real lead from May 25)
- Open their contact record
- Manually enroll them in the new "AI Grader Lead Nurture - Batch 1" workflow
- They should start receiving emails from Email #1

Step 10 — Confirmation
Once done, take a screenshot of:
- The published workflow showing the 5 emails and wait steps
- The May 25 contact showing the workflow is active on their record

RULES:
- Use the EXACT email subjects, preview text, and body from the markdown file
- Do NOT rewrite, paraphrase, or let GHL's AI "improve" any text
- Do NOT enable any unrelated GHL features (LeadConnector AI suggestions, smart sending, etc.)
- If you hit a blocker (UI element missing, GHL flow not matching my instructions), pause and ask me — don't guess
- If GHL doesn't support an exit condition I described, build what you can and tell me which ones you skipped

EXPECTED TIME: ~30-45 minutes (GHL's workflow builder has a lot of clicks)
EXPECTED OUTPUT: Published workflow + the May 25 lead enrolled + screenshots
```

---

## After Cowork Finishes

1. **Verify the workflow in GHL** — Click into it, scroll through, make sure all 5 emails look right and the timing is correct.

2. **Watch the May 25 lead** — Within 1 hour of enrolling them, they should receive Email #1. Check the contact record's "Activity" tab to confirm.

3. **Future leads** — Every new contact tagged `ai-grader-lead` (which happens automatically when someone submits the grader) will now flow through this drip without any manual intervention.

---

## What This Fixes

Before today:
- ❌ Leads sit in GHL with no follow-up
- ❌ Cold within 48 hours
- ❌ 9× lower close rate

After today:
- ✅ Lead submitted → Email #1 in 1 hour (warm reactivation)
- ✅ 5 touches over 14 days
- ✅ Automatic exit when they book → no double-messaging
- ✅ Pipeline finally complete: Ad → Grader → Email Drip → Strategy Call → Customer

---

## When To Update This Drip

After ~30 grader leads have flowed through, we'll have data on:
- Which email has the highest reply rate
- Which email drives the most bookings
- Drop-off rate after each email

Then we iterate on the worst-performing email first. Don't touch the drip before then — same "no premature optimization" rule that applies to the Meta ad.
