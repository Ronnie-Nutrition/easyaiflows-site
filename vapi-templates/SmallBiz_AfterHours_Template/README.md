# SmallBiz AfterHours Template
## EasyAiFlows — Vapi Voice Agent Template

**Product:** After-hours AI phone answering + appointment booking agent
**Platform:** Vapi.ai
**Status:** Production-ready (v1.3)

---

## What This Does

This is a white-label voice AI template that answers after-hours calls for small businesses, collects caller info, and books appointments on Google Calendar. Clients never miss a lead again — even at 2am.

**Features:**
- After-hours greeting (no hardcoded business name — uses "our team" as fallback)
- One-at-a-time intake (name → phone → email → service → preferred time)
- Google Calendar availability check + booking via Vapi native tools
- Digit-by-digit phone/email readback to verify accuracy
- Urgent call transfer to owner
- 8 CRITICAL RULES guardrails to prevent hallucination and instruction leakage

---

## Setup Instructions (Per Client)

### Step 1: Duplicate the Template
In Vapi Dashboard → Assistants → SmallBiz_AfterHours_Template → click the three-dot menu → Duplicate.

### Step 2: Fill in Client Placeholders
Replace ALL `[BRACKET]` placeholders in the system prompt:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[AGENT_NAME]` | Name callers will know the AI as | Alex |
| `[BUSINESS_NAME]` | Client's business name | Pearland Wellness Spa |
| `[BUSINESS_TYPE]` | Type of business | med spa |
| `[CITY, STATE]` | Location | Pearland, TX |
| `[BUSINESS_ADDRESS]` | Street address | 1234 Broadway St, Pearland TX 77581 |
| `[BUSINESS_WEBSITE]` | Website URL | www.pearlandwellnessspa.com |
| `[BUSINESS_HOURS]` | Normal operating hours | Mon–Fri 9am–6pm, Sat 10am–3pm |
| `[EMERGENCY_HOURS]` | When urgent calls can be transferred | Mon–Sun 8am–10pm |
| `[SERVICES_LIST]` | Bulleted list of services offered | See system prompt format |
| `[FAQ_QUESTION_1]` to `[FAQ_QUESTION_5]` | Common questions clients ask | "Do you take walk-ins?" |
| `[FAQ_ANSWER_1]` to `[FAQ_ANSWER_5]` | Answers to above | "Walk-ins welcome based on availability" |
| `[OWNER_PHONE]` | Phone number for urgent transfer | +12814445555 |
| `[OWNER_EMAIL]` | Owner contact email | owner@business.com |

### Step 3: Update the First Message Field
Change the "First Message" field (above the system prompt in Vapi) from the default with `[BUSINESS_NAME]` to match the greeting in Step 1 of the Conversation Flow:

```
Thank you for calling. Our team is currently unavailable, but I'm your scheduling assistant. I can answer questions and book your appointment right now. How can I help you?
```

### Step 4: Connect Client Google Calendar
1. In Vapi Dashboard → Tools → CheckAvailability
2. Under Calendar Settings → connect the client's Google account
3. Set Timezone to client's local timezone (e.g., `America/Chicago` for TX clients)
4. Repeat for CreateEvent tool

### Step 5: Set the Voice
Current voice: **Cartesia / Kira — trusted confidant / Sonic 3**
> NOTE: Do NOT use ElevenLabs voices if you have a custom ElevenLabs API key in your Vapi account settings — Vapi will route through your key and Vapi's built-in voices won't be found. Use Cartesia or OpenAI TTS instead.

### Step 6: Publish and Test
1. Click Publish
2. Do a test call via "Talk to Assistant" button in Vapi
3. Verify: greeting → name → phone → email → service → time → calendar check → booking confirmation → clean close

---

## Voice Agent Config Summary

| Setting | Value |
|---------|-------|
| Provider | OpenAI |
| Model | GPT-4.1 |
| Voice Provider | Cartesia |
| Voice | Kira — trusted confidant |
| Voice Model | Sonic 3 |
| First Message Mode | Assistant speaks first |
| Tools | CheckAvailability (Google Cal), CreateEvent (Google Cal), End Call |

---

## Known Bugs Fixed (v1.3)

| Bug | Symptom | Fix |
|-----|---------|-----|
| Instruction leakage | Agent said "ending the call. now." out loud | CRITICAL RULE #1 + rewrote Step 6 |
| Name hallucination | Agent invented "Elysium" / "Alesi" | CRITICAL RULE #2 + "our team" fallback in greeting |
| Front-loading questions | Agent listed all required info upfront | CRITICAL RULE #7 + rewrote Step 3 |
| Tool filler phrases | "This will just take us..." during tool calls | CRITICAL RULE #8 (stay silent during tools) |
| 11labs voice error | "Couldn't Find 11labs Voice" | Switched to Cartesia (no API key conflict) |

---

## Pricing Suggestion (EasyAiFlows)

| Tier | Price | Includes |
|------|-------|----------|
| Setup Fee | $497 one-time | Custom build + placeholder fill + Google Cal connect + testing |
| Monthly | $197/mo | Hosting, maintenance, 500 mins included |
| Add-on | $0.10/min over 500 | Vapi per-minute billing pass-through + margin |

---

## Files in This Directory

| File | What |
|------|------|
| `system-prompt.md` | Full system prompt with all placeholders |
| `README.md` | This file — setup guide |

---

## Vapi Dashboard Links

- **Template Assistant:** https://dashboard.vapi.ai/assistants/736418e0-d4da-42ac-be3e-7e6102aad3b9
- **CheckAvailability Tool:** https://dashboard.vapi.ai/tools/eec8f77e-d55a-4cfc-8470-862e98d2fcbc
- **CreateEvent Tool:** https://dashboard.vapi.ai/tools/755d0d43-c251-44ca-8a15-7e7bbb880896
