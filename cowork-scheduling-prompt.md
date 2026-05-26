# Claude Cowork Prompt — Schedule FB Group Posts

Paste the prompt below into Claude Cowork (in Claude Desktop). Before you do, make sure:

1. You're logged into Facebook in Chrome
2. You have admin access to the group "Claude AI Builds That Actually Make You Money"
3. Meta Business Suite is accessible at business.facebook.com

---

## Prompt To Paste Into Claude Cowork

```
I need you to schedule 10 Facebook Group posts using Meta Business Suite Planner.

CONTENT SOURCE:
The 10 posts are in this file on my computer:
/Users/apple/easyaiflows-site/fb-group-content-batch-1.md

TARGET:
- Group: "Claude AI Builds That Actually Make You Money"
- Group URL: https://www.facebook.com/groups/831379269980598
- Page connected: Easy AiFlows (EasyAiFlows)
- I am an admin of this group, logged into Facebook in Chrome

TOOL TO USE:
Meta Business Suite Planner at https://business.facebook.com/planner

INSTRUCTIONS:

Step 1 — Read the content file
Open /Users/apple/easyaiflows-site/fb-group-content-batch-1.md and parse out the 10 posts and the schedule table at the bottom.

Step 2 — Open Chrome and navigate to Meta Business Suite
Go to https://business.facebook.com/planner
Confirm I am logged into the EasyAiFlows business account (top-left account switcher).
If I'm in the wrong business account, ask me to switch before continuing.

Step 3 — For each of the 10 posts:
a) Click "Create Post" (or equivalent button)
b) Switch the audience/destination to the Facebook GROUP "Claude AI Builds That Actually Make You Money" (NOT the Page — make sure you're posting to the group)
c) Paste the post body text exactly as written in the markdown file
d) DO NOT add hashtags, emojis, or other modifications I did not include
e) For the images:
   - Post #3: Suggest I attach a Meta Ads Manager screenshot (skip if I don't have one ready — schedule text-only)
   - Post #5: Suggest I attach a GHL contact view screenshot (skip if not ready — schedule text-only)
   - Post #10: Suggest I attach a selfie photo (skip if not ready — schedule text-only)
   - All other posts are TEXT-ONLY by design — do not auto-suggest images
f) Set the scheduled date and time per the table in the markdown file
g) Click "Schedule" to confirm
h) Confirm the post appears in the scheduled queue before moving to the next

Step 4 — After all 10 are scheduled
Open https://business.facebook.com/planner and show me the scheduled queue so I can verify all 10 are listed with the correct dates and times.

RULES:
- Pause and ask me if you hit anything unexpected (popup, login issue, error message, missing button)
- Do NOT change the post wording, even if Meta suggests "improvements"
- Do NOT enable any "Advantage+" or "AI-enhanced" options Meta offers during scheduling
- Do NOT post to the EasyAiFlows Page by accident — every post must go to the GROUP
- If the group is not selectable from Business Suite Planner (sometimes Meta requires you to post directly from the group page), let me know — I'll switch tools
- Take a screenshot when you're done so I have a confirmation

EXPECTED TIME: ~25 minutes
EXPECTED OUTPUT: All 10 posts scheduled, queue screenshot, list of any posts you couldn't complete with the reason
```

---

## After Cowork Finishes

1. **Verify yourself** — Open `business.facebook.com/planner` and scroll through the scheduled queue. Make sure each post is targeted to the GROUP, not the Page.

2. **Note any failures** — Cowork will tell you which (if any) it couldn't complete. Common reasons:
   - Meta randomly requires re-login → you log in, re-run the prompt for just the failed posts
   - Group not selectable in Planner → some Meta accounts have to post directly from the group page (workaround: do those manually)
   - Image attachment needed → schedule text-only for now, add image later

3. **Delete this prompt file or save it for next batch** — Same prompt works for Batch #2 once we write it. Just update the file path reference.

---

## Backup Plan If Cowork Can't Post To The Group

Meta has been **inconsistent** about whether Groups can be scheduled from Business Suite Planner. If Cowork reports it can't post to the group from Planner:

**Fallback:** Tell Cowork to use **Creator Studio** instead (creatorstudio.facebook.com) — it has slightly different group support.

**Final fallback:** Have Cowork schedule the posts by going directly to the group page and using Facebook's built-in scheduling feature (click in the post box → schedule icon → set date/time). Slower but always works.

Update your Cowork prompt accordingly if Planner doesn't work.
