#!/usr/bin/env node
/**
 * Programmatic SEO Generator — EasyAiFlows Industry Pages
 * Generates static HTML pages for easyaiflows.com/ai-for/[industry]
 * Run: node generate-pages.js
 */

const fs = require('fs');
const path = require('path');

const industries = [
  {
    slug: "dentists",
    ctaNoun: "Dental Practice",
    name: "Dentists",
    headline: "AI Automation for <span>Dental Practices</span>",
    description: "Automate appointment reminders, patient follow-ups, and front desk workflows so your dental practice runs smoothly — even when you're chairside.",
    metaDescription: "AI automation for dental practices: appointment reminders, patient follow-ups, insurance verification, and front desk workflows. From $97/mo.",
    painPoints: [
      { icon: "&#128197;", title: "No-Shows Eating Your Revenue", desc: "Missed appointments cost the average dental practice $150K+/year. Manual reminder calls don't scale and staff forget to follow up." },
      { icon: "&#128222;", title: "Front Desk Overwhelmed", desc: "Your receptionist is juggling phones, check-ins, insurance verification, and scheduling — all at once. Patients wait, calls go to voicemail." },
      { icon: "&#128203;", title: "Patient Follow-Ups Fall Through", desc: "Patients who need cleanings, crowns, or treatment plans don't come back because nobody followed up. Revenue walks out the door." }
    ],
    automations: [
      { icon: "&#128276;", title: "Smart Appointment Reminders", desc: "AI sends text and email reminders 48hrs, 24hrs, and 2hrs before appointments — with one-tap confirm/reschedule. Every patient gets all three, every time." },
      { icon: "&#129302;", title: "AI Front Desk Assistant", desc: "An AI chatbot on your website and Google listing answers FAQs, books appointments, and handles insurance questions 24/7 — no hold times." },
      { icon: "&#128140;", title: "Automated Recall & Reactivation", desc: "AI identifies patients overdue for cleanings or treatment and sends personalized reactivation sequences. Fills your schedule with existing patients." }
    ],
    stats: [
      { number: "3", label: "Reminders before every appointment" },
      { number: "24/7", label: "Front desk coverage, web and Google" },
      { number: "1-tap", label: "Confirm or reschedule" }
    ],
    faqs: [
      { q: "How does AI reduce no-shows at a dental practice?", a: "AI automation sends multi-channel reminders (text, email, voice) at optimal intervals before appointments. Patients can confirm or reschedule with one tap. The patient who would have forgotten gets three chances to remember, and the one who genuinely cannot make it moves the slot instead of just not showing up." },
      { q: "Can AI handle dental insurance verification?", a: "Yes. AI tools can pull patient insurance details, verify coverage, and flag issues before the appointment — so coverage problems surface the day before, not while the patient is standing at the counter." },
      { q: "Will patients feel like they're talking to a robot?", a: "Modern AI assistants use natural language and can be trained on your practice's tone. Most patients can't tell the difference — they just appreciate the fast response." }
    ]
  },
  {
    slug: "restaurants",
    ctaNoun: "Restaurant",
    name: "Restaurants",
    headline: "AI Automation for <span>Restaurants</span>",
    description: "Automate online orders, reservation management, and customer engagement so you can focus on the food — not the phone.",
    metaDescription: "AI automation for restaurants: automate online ordering, reservation management, customer reviews, and marketing. Set up, trained, and supported from $97/mo.",
    painPoints: [
      { icon: "&#128222;", title: "Phone Won't Stop Ringing", desc: "Your staff is taking orders, answering questions about the menu, and handling reservations — all while trying to serve in-house customers." },
      { icon: "&#11088;", title: "Reviews Going Unanswered", desc: "Bad reviews sit on Google and Yelp for weeks. Good reviews get no thank-you. Your online reputation suffers while you're in the kitchen." },
      { icon: "&#128200;", title: "Marketing Is an Afterthought", desc: "You know you should post on social media and send promos, but who has time? The restaurant across the street is getting all the attention." }
    ],
    automations: [
      { icon: "&#127828;", title: "AI Order Taking", desc: "An AI assistant takes phone and online orders 24/7 — no missed calls, no miscommunication. Integrates with your POS system directly." },
      { icon: "&#11088;", title: "Review Auto-Response", desc: "AI monitors Google, Yelp, and Facebook reviews and responds within minutes. Positive reviews get thanked; negative ones get addressed professionally." },
      { icon: "&#128232;", title: "Automated Marketing Campaigns", desc: "AI sends weekly specials, birthday promos, and re-engagement texts to past customers. Your marketing runs on autopilot." }
    ],
    stats: [
      { number: "24/7", label: "Phone and online order taking" },
      { number: "3", label: "Review sites monitored and answered" },
      { number: "4", label: "POS systems supported out of the box" }
    ],
    faqs: [
      { q: "Can AI take phone orders for my restaurant?", a: "Yes. AI voice assistants can answer calls, take orders, handle modifications, and process payments — all without a human. They work 24/7 and never get overwhelmed during rush hours." },
      { q: "How does AI help with restaurant marketing?", a: "AI automates social media posting, email/text campaigns, and customer re-engagement. It can send birthday offers, weekly specials, and win-back messages to customers who haven't visited in 30+ days." },
      { q: "Will AI automation work with my existing POS system?", a: "Most AI tools integrate with popular POS systems like Square, Toast, Clover, and Lightspeed. Custom integrations are also possible for any system with an API." }
    ]
  },
  {
    slug: "hvac",
    ctaNoun: "HVAC Business",
    name: "HVAC Companies",
    headline: "AI Automation for <span>HVAC Companies</span>",
    description: "Automate dispatch scheduling, customer follow-ups, and seasonal marketing so your HVAC business grows without adding office staff.",
    metaDescription: "AI automation for HVAC companies: dispatch, scheduling, customer follow-ups, and seasonal marketing campaigns. Set up and supported from $97/mo.",
    painPoints: [
      { icon: "&#128222;", title: "Missed Calls = Lost Jobs", desc: "When you're on a roof or under a house, calls go to voicemail. By the time you call back, the customer already hired someone else." },
      { icon: "&#128197;", title: "Scheduling Chaos", desc: "Double-bookings, no-shows, and last-minute cancellations wreck your day. Dispatching techs efficiently is a constant headache." },
      { icon: "&#127777;", title: "Seasonal Feast or Famine", desc: "Summer and winter are slammed, but spring and fall are dead. You need consistent marketing to fill the slow months." }
    ],
    automations: [
      { icon: "&#129302;", title: "24/7 AI Call Answering", desc: "An AI assistant answers every call, qualifies the lead, books the appointment, and dispatches the nearest tech — even at 2 AM." },
      { icon: "&#128197;", title: "Smart Dispatch & Scheduling", desc: "AI optimizes your schedule based on location, job type, and tech availability. Reduces drive time and fits more jobs per day." },
      { icon: "&#128232;", title: "Seasonal Campaign Automation", desc: "AI runs pre-season tune-up campaigns, maintenance reminders, and referral programs automatically — keeping your pipeline full year-round." }
    ],
    stats: [
      { number: "24/7", label: "Call answering, nights and weekends" },
      { number: "4", label: "Steps per call, answer to dispatch" },
      { number: "3", label: "Seasonal campaigns run for you" }
    ],
    faqs: [
      { q: "Can AI answer calls for my HVAC business?", a: "Yes. AI voice assistants handle inbound calls 24/7 — they can describe your services, give estimates, book appointments, and dispatch techs. You never miss a lead again." },
      { q: "How does AI help HVAC companies during slow seasons?", a: "AI automates seasonal email/text campaigns targeting past customers for tune-ups, filter changes, and maintenance plans. It also runs referral campaigns and sends reminders to customers whose systems are aging." },
      { q: "Is this worth it for a small HVAC company?", a: "Especially for small companies. One missed call can cost $500-$2,000 in lost revenue. AI answering alone pays for itself in the first week for most HVAC businesses." }
    ]
  },
  {
    slug: "real-estate",
    ctaNoun: "Real Estate Business",
    name: "Real Estate Agents",
    headline: "AI Automation for <span>Real Estate Agents</span>",
    description: "Automate lead follow-up, listing marketing, and client communication so you close more deals without working more hours.",
    metaDescription: "AI automation for real estate agents: automate lead follow-up, listing alerts, client nurture sequences, and social media marketing. Close more deals.",
    painPoints: [
      { icon: "&#128241;", title: "Leads Go Cold in Minutes", desc: "Online leads expect a response in under 5 minutes. If you're showing a house, those leads go to the agent who responds first." },
      { icon: "&#128203;", title: "Follow-Up Is a Full-Time Job", desc: "You have 200+ contacts who need regular touches. Birthday texts, market updates, listing alerts — it's impossible to do manually." },
      { icon: "&#128247;", title: "Listing Marketing Takes Forever", desc: "Creating social posts, email blasts, and flyers for every listing eats hours you should spend face-to-face with clients." }
    ],
    automations: [
      { icon: "&#9889;", title: "Instant Lead Response", desc: "AI responds to every new lead within 60 seconds — via text, email, or DM. It qualifies them, answers questions, and books a showing." },
      { icon: "&#128140;", title: "Smart CRM Nurture Sequences", desc: "AI sends personalized market updates, home anniversary texts, and check-ins to your entire database on autopilot. No contact falls through the cracks." },
      { icon: "&#128247;", title: "One-Click Listing Marketing", desc: "AI generates social posts, email campaigns, and ad copy for every new listing. Just approve and publish — marketing done in minutes." }
    ],
    stats: [
      { number: "60s", label: "Response to every new lead" },
      { number: "3", label: "Channels covered: text, email, DM" },
      { number: "1-click", label: "Marketing for every new listing" }
    ],
    faqs: [
      { q: "How does AI help real estate agents follow up faster?", a: "AI monitors your lead sources (Zillow, Realtor.com, website, social) and instantly responds to new inquiries with personalized messages. It asks qualifying questions, answers common queries, and books showings — all before you even see the notification." },
      { q: "Can AI replace my real estate CRM?", a: "AI works alongside your existing CRM (KVCore, Follow Up Boss, etc.). It enhances your CRM by automating the follow-up sequences, tagging leads by behavior, and alerting you when a lead is hot and ready to talk." },
      { q: "Will my clients know they're talking to AI?", a: "Only if you want them to. AI assistants can be configured to match your communication style perfectly. For initial contact and nurture, most clients can't tell — and they appreciate the fast, helpful responses." }
    ]
  },
  {
    slug: "fitness-studios",
    ctaNoun: "Fitness Studio",
    name: "Fitness Studios",
    headline: "AI Automation for <span>Fitness Studios</span>",
    description: "Automate class bookings, member retention, and lead conversion so your gym grows on autopilot.",
    metaDescription: "AI automation for fitness studios and gyms: automate class bookings, member follow-ups, lead conversion, and retention campaigns. Grow your membership.",
    painPoints: [
      { icon: "&#128694;", title: "Trial Members Don't Convert", desc: "People take a free class and disappear. Without systematic follow-up, you lose 70%+ of trial members to inertia." },
      { icon: "&#128180;", title: "Members Cancel Silently", desc: "By the time you notice someone hasn't been in for 3 weeks, they've already mentally quit. Retention is reactive, not proactive." },
      { icon: "&#128241;", title: "DMs and Inquiries Pile Up", desc: "Instagram DMs, Facebook messages, and website forms go unanswered for hours. Interested leads find another gym." }
    ],
    automations: [
      { icon: "&#127947;", title: "Trial-to-Member Conversion Sequence", desc: "AI automatically follows up with trial members: a thank-you text after class, a check-in at 48 hours, and a special offer at 7 days. Nobody walks out of a trial and never hears from you again." },
      { icon: "&#128140;", title: "Proactive Retention Alerts", desc: "AI tracks attendance patterns and flags at-risk members before they cancel. Sends personalized re-engagement messages and offers." },
      { icon: "&#129302;", title: "24/7 Lead Response Bot", desc: "AI responds to every DM, form fill, and inquiry instantly — answers questions, shares class schedules, and books trial sessions." }
    ],
    stats: [
      { number: "3", label: "Touchpoints in every trial follow-up" },
      { number: "Daily", label: "Attendance checked for at-risk members" },
      { number: "24/7", label: "DM and form-fill response" }
    ],
    faqs: [
      { q: "How does AI help fitness studios retain members?", a: "AI monitors member check-in data and identifies patterns — like someone who usually comes 3x/week but hasn't visited in 10 days. It automatically sends personalized re-engagement messages before the member decides to cancel." },
      { q: "Can AI book classes and trial sessions?", a: "Yes. AI chatbots on your website, Instagram, and Facebook can show class schedules, answer questions about pricing, and book trial sessions — all without staff involvement." },
      { q: "Does this work for boutique studios or just big gyms?", a: "AI automation is especially powerful for boutique studios where every member matters. The personal touch of automated follow-ups actually feels more boutique than big-gym mass emails." }
    ]
  },
  {
    slug: "barbershops",
    ctaNoun: "Barbershop",
    name: "Barbershops",
    headline: "AI Automation for <span>Barbershops</span>",
    description: "Automate appointment booking, client reminders, and rebooking so your chairs stay full and your phone stays quiet.",
    metaDescription: "AI automation for barbershops: automate appointment booking, reminders, rebooking, and client retention. Keep your chairs full.",
    painPoints: [
      { icon: "&#128222;", title: "Constant Phone Interruptions", desc: "Every booking call interrupts a haircut. You're trying to fade someone's temple while scheduling the next client." },
      { icon: "&#128197;", title: "No-Shows Kill Your Day", desc: "A no-show isn't just lost revenue — it's dead time that could've gone to someone on the waitlist." },
      { icon: "&#128260;", title: "Rebooking Doesn't Happen", desc: "Clients leave happy but don't book their next cut. You're relying on them to remember in 2-3 weeks." }
    ],
    automations: [
      { icon: "&#128197;", title: "Online Booking + AI Chat", desc: "Clients book through your website, IG link, or Google — 24/7. An AI chatbot answers questions and suggests open slots." },
      { icon: "&#128276;", title: "Smart Reminders & Waitlist", desc: "AI sends reminders before appointments and automatically fills cancelled slots from your waitlist. A gap in the book gets offered to someone before you notice it." },
      { icon: "&#128260;", title: "Auto-Rebook Sequences", desc: "AI texts clients 2-3 weeks after their last cut with a booking link. Keeps your calendar full without you lifting a finger." }
    ],
    stats: [
      { number: "24/7", label: "Booking from web, IG, or Google" },
      { number: "Auto", label: "Cancelled slots filled from waitlist" },
      { number: "2-3wk", label: "Rebook text after every cut" }
    ],
    faqs: [
      { q: "Can AI handle barbershop appointment booking?", a: "Yes. AI booking systems let clients choose their barber, pick a service, and select a time — all online, 24/7. It syncs with your calendar so there are never double-bookings." },
      { q: "How does AI get clients to rebook?", a: "AI tracks when each client last visited and sends a personalized text at the right interval (e.g., 3 weeks for fades, 5 weeks for longer styles) with a one-tap booking link." },
      { q: "Is this too expensive for a small barbershop?", a: "Our Starter plan is $97/month — about $3 a day, and less than a single missed appointment costs you. Setup, training, and ongoing support are included, and there's a 30-day guarantee." }
    ]
  },
  {
    slug: "nail-salons",
    ctaNoun: "Nail Salon",
    name: "Nail Salons",
    headline: "AI Automation for <span>Nail Salons</span>",
    description: "Automate booking, reminders, and client loyalty so your techs stay booked and clients keep coming back.",
    metaDescription: "AI automation for nail salons: automate appointment booking, reminders, loyalty programs, and social media. Keep your chairs full and clients loyal.",
    painPoints: [
      { icon: "&#128222;", title: "Phone Rings During Every Service", desc: "You can't pick up the phone with gel on your hands. Calls go to voicemail, and new clients book somewhere else." },
      { icon: "&#128197;", title: "Last-Minute Cancellations", desc: "Late cancellations leave expensive gaps in your schedule. By the time you text your waitlist, the slot is wasted." },
      { icon: "&#128140;", title: "Clients Forget to Rebook", desc: "They love their nails but don't think about rebooking until they notice chips — then they call whoever has an opening." }
    ],
    automations: [
      { icon: "&#128197;", title: "24/7 Online Booking", desc: "Clients book anytime from your website, Instagram, or Google Business. AI suggests available times and upsells add-on services." },
      { icon: "&#128276;", title: "Smart Cancellation Recovery", desc: "When someone cancels, AI instantly texts your waitlist to fill the gap. No manual scrambling." },
      { icon: "&#128140;", title: "Loyalty & Rebook Automation", desc: "AI tracks visit frequency and sends rebook reminders at the perfect interval. Loyalty rewards are tracked and applied automatically." }
    ],
    stats: [
      { number: "24/7", label: "Booking from web, IG, or Google" },
      { number: "Instant", label: "Waitlist text when someone cancels" },
      { number: "Auto", label: "Loyalty tracked and applied" }
    ],
    faqs: [
      { q: "Can AI book nail salon appointments?", a: "Yes. AI booking handles service selection, tech preference, time selection, and even deposits — all without a phone call. Clients book from Instagram DMs, your website, or Google." },
      { q: "How does AI help with nail salon no-shows?", a: "AI sends reminders at 48hr and 2hr marks, requires deposits for high-value services, and instantly fills cancellations from your waitlist. Most salons see no-shows drop 50-70%." },
      { q: "Can AI run my nail salon's social media?", a: "AI can schedule posts, respond to DMs with booking links, and even generate caption ideas for your nail art photos. You still take the photos — AI handles the rest." }
    ]
  },
  {
    slug: "med-spas",
    ctaNoun: "Med Spa",
    name: "Med Spas",
    headline: "AI Automation for <span>Med Spas</span>",
    description: "Automate consultations, treatment follow-ups, and membership management so your med spa delivers luxury at scale.",
    metaDescription: "AI automation for med spas: automate consultation booking, treatment follow-ups, membership management, and patient re-engagement. Scale your practice.",
    painPoints: [
      { icon: "&#128176;", title: "High-Value Leads Slip Away", desc: "Someone inquires about Botox or filler and doesn't hear back for 4 hours. By then, they've booked with the med spa that responded in 2 minutes." },
      { icon: "&#128203;", title: "Follow-Up After Treatments Is Inconsistent", desc: "Post-treatment check-ins, before/after photo requests, and rebooking reminders depend on staff remembering. They don't always." },
      { icon: "&#128260;", title: "Membership Revenue Leaks", desc: "Members forget to use their monthly credits, stop seeing value, and cancel. Nobody tracks who's engaged and who's drifting." }
    ],
    automations: [
      { icon: "&#9889;", title: "Instant Consultation Booking", desc: "AI responds to every inquiry within 60 seconds — answers treatment questions, shares pricing, and books consultations directly." },
      { icon: "&#128140;", title: "Post-Treatment Automation", desc: "AI sends aftercare instructions, check-in messages at 24hrs and 7 days, requests before/after photos, and books the next session." },
      { icon: "&#128179;", title: "Membership Engagement Engine", desc: "AI tracks member credit usage, sends reminders to book, and re-engages members showing signs of churn before they cancel." }
    ],
    stats: [
      { number: "60s", label: "Response to every consultation inquiry" },
      { number: "2", label: "Aftercare check-ins, 24hr and 7 day" },
      { number: "Auto", label: "Member credits tracked and reminded" }
    ],
    faqs: [
      { q: "How does AI help med spas convert more consultations?", a: "Speed wins in med spa sales. AI responds to every lead instantly, answers common questions about treatments and pricing, and books consultations 24/7. The inquiry that comes in at 9pm gets an answer at 9pm, instead of on Monday when they have already booked somewhere else." },
      { q: "Can AI handle HIPAA-compliant patient communication?", a: "Yes. AI automation platforms designed for healthcare (like GoHighLevel in HIPAA mode) encrypt patient data and maintain compliance while automating communication." },
      { q: "Is AI automation appropriate for a luxury med spa brand?", a: "Absolutely. AI enables the white-glove experience your clients expect — instant responses, personalized follow-ups, and seamless booking. The luxury feel comes from responsiveness, not from making people wait." }
    ]
  },
  {
    slug: "chiropractors",
    ctaNoun: "Chiropractic Practice",
    name: "Chiropractors",
    headline: "AI Automation for <span>Chiropractic Practices</span>",
    description: "Automate patient scheduling, treatment plan adherence, and reactivation so your patients stay on track and your schedule stays full.",
    metaDescription: "AI automation for chiropractors: automate scheduling, treatment plan reminders, patient reactivation, and review generation. Grow your practice.",
    painPoints: [
      { icon: "&#128197;", title: "Patients Drop Off Mid-Plan", desc: "You prescribe 12 visits. They come for 4, feel better, and disappear. Treatment plans go incomplete and outcomes suffer." },
      { icon: "&#128222;", title: "Staff Buried in Phone Calls", desc: "Appointment changes, insurance questions, and new patient inquiries tie up your front desk all day." },
      { icon: "&#128164;", title: "Inactive Patients Never Return", desc: "You have hundreds of past patients who haven't been in for 6+ months. Reactivation campaigns don't get done." }
    ],
    automations: [
      { icon: "&#128203;", title: "Treatment Plan Adherence", desc: "AI sends reminders for upcoming visits, motivational messages between appointments, and alerts when a patient misses a scheduled session." },
      { icon: "&#129302;", title: "AI Receptionist", desc: "An AI assistant handles scheduling, rescheduling, insurance questions, and new patient intake — by phone, text, or web chat." },
      { icon: "&#128260;", title: "Patient Reactivation Campaigns", desc: "AI identifies patients who haven't visited in 90+ days and sends personalized reactivation sequences. Fills your schedule with familiar faces." }
    ],
    stats: [
      { number: "3", label: "Reception channels: phone, text, chat" },
      { number: "Auto", label: "Alert when a patient misses a visit" },
      { number: "90d", label: "Reactivation sequence trigger" }
    ],
    faqs: [
      { q: "How does AI improve treatment plan adherence?", a: "AI sends patients reminders before each visit, educational content about why completing their plan matters, and motivational check-ins between sessions. Practices see 40-50% improvement in plan completion rates." },
      { q: "Can AI reactivate past chiropractic patients?", a: "Yes. AI identifies inactive patients, segments them by last visit date and treatment history, and sends personalized campaigns. Common response rates are 20-35%, which means dozens of reactivated patients per month." },
      { q: "How does AI handle new patient intake?", a: "AI can collect intake forms digitally before the first visit, verify insurance, and answer common questions — reducing first-visit wait times and freeing your staff." }
    ]
  },
  {
    slug: "insurance-agents",
    ctaNoun: "Insurance Agency",
    name: "Insurance Agents",
    headline: "AI Automation for <span>Insurance Agents</span>",
    description: "Automate lead follow-up, policy renewals, and client communication so you write more policies without hiring more staff.",
    metaDescription: "AI automation for insurance agents: automate lead follow-up, policy renewals, cross-sell campaigns, and client retention. Write more policies.",
    painPoints: [
      { icon: "&#128241;", title: "Leads from Aggregators Go Cold", desc: "You're paying $15-$50 per lead from quote sites. If you don't call within 5 minutes, that lead has already talked to 3 other agents." },
      { icon: "&#128260;", title: "Renewal Follow-Ups Are Manual", desc: "Tracking policy expiration dates across hundreds of clients and sending timely renewal reminders is a spreadsheet nightmare." },
      { icon: "&#128176;", title: "Cross-Sell Opportunities Missed", desc: "Your auto-only clients need homeowners. Your life clients need umbrella. But you don't have time to identify and pursue every opportunity." }
    ],
    automations: [
      { icon: "&#9889;", title: "Speed-to-Lead Automation", desc: "AI contacts every new lead within 60 seconds — via text and email. It qualifies them, collects basic info, and books a call with you." },
      { icon: "&#128197;", title: "Automated Renewal Campaigns", desc: "AI tracks every policy expiration date and sends renewal sequences starting 60 days out. No client falls through the cracks." },
      { icon: "&#128200;", title: "Smart Cross-Sell Engine", desc: "AI analyzes your book of business, identifies cross-sell opportunities, and sends targeted campaigns. More policies per household with zero extra effort." }
    ],
    stats: [
      { number: "60s", label: "Contact on every new lead" },
      { number: "60d", label: "Renewal sequence starts before expiry" },
      { number: "Auto", label: "Cross-sell opportunities surfaced" }
    ],
    faqs: [
      { q: "How fast does AI respond to insurance leads?", a: "AI responds within 60 seconds of a lead coming in — whether it's from a quote aggregator, your website, or a social media ad. It sends a personalized text and email, collects key details, and books a call on your calendar." },
      { q: "Can AI help with insurance policy renewals?", a: "Yes. AI tracks every policy expiration in your book, sends multi-touch renewal sequences starting 60 days before expiration, and escalates non-responsive clients to you for a personal call." },
      { q: "Is AI automation compliant for insurance?", a: "AI communication tools can be configured to meet state insurance regulations. All messages can include required disclosures, and you maintain full oversight and approval of automated content." }
    ]
  },
  {
    slug: "mortgage-brokers",
    ctaNoun: "Mortgage Business",
    name: "Mortgage Brokers",
    headline: "AI Automation for <span>Mortgage Brokers</span>",
    description: "Automate lead nurture, rate alerts, and borrower communication so you close more loans without drowning in follow-ups.",
    metaDescription: "AI automation for mortgage brokers: automate lead nurture, rate change alerts, document collection, and borrower communication. Close more loans.",
    painPoints: [
      { icon: "&#128200;", title: "Long Sales Cycles Mean Lost Leads", desc: "Mortgage leads take 30-90 days to convert. Without consistent nurture, warm leads go cold and close with another lender." },
      { icon: "&#128203;", title: "Document Chase Is Exhausting", desc: "Collecting W-2s, pay stubs, and bank statements from borrowers is like pulling teeth. Deals stall because docs are incomplete." },
      { icon: "&#128241;", title: "Rate Changes Require Instant Action", desc: "When rates drop, every past lead who didn't close becomes a hot opportunity — but you can't manually text 500 people." }
    ],
    automations: [
      { icon: "&#128140;", title: "Long-Term Lead Nurture", desc: "AI keeps in touch with pre-qualified borrowers over weeks and months — sending market updates, rate info, and check-ins until they're ready to move." },
      { icon: "&#128203;", title: "Automated Document Collection", desc: "AI sends borrowers a secure link to upload docs, follows up on missing items, and notifies you when the file is complete." },
      { icon: "&#128200;", title: "Rate Drop Alert Campaigns", desc: "When rates move, AI instantly notifies relevant contacts — past leads, past clients eligible for refi, and pre-approved borrowers waiting to lock." }
    ],
    stats: [
      { number: "Months", label: "Nurture runs until they are ready" },
      { number: "Auto", label: "Missing documents chased for you" },
      { number: "Instant", label: "Rate-drop alerts to eligible contacts" }
    ],
    faqs: [
      { q: "How does AI help mortgage brokers close more loans?", a: "AI maintains consistent, personalized communication with every lead in your pipeline — even the ones that won't convert for months. When they're finally ready, you're the broker they've been hearing from, not a stranger." },
      { q: "Can AI collect mortgage documents?", a: "Yes. AI sends secure upload links, tracks what's been submitted and what's missing, and follows up with borrowers automatically. This eliminates the back-and-forth that delays closings." },
      { q: "How do rate drop alerts work?", a: "AI monitors rate changes and cross-references your database to find contacts who would benefit — past leads, past clients eligible for refinance, and pre-approved borrowers. It sends personalized alerts instantly." }
    ]
  },
  {
    slug: "photographers",
    ctaNoun: "Photography Business",
    name: "Photographers",
    headline: "AI Automation for <span>Photography Businesses</span>",
    description: "Automate inquiry response, booking management, and client delivery so you spend more time behind the camera.",
    metaDescription: "AI automation for photographers: automate inquiry response, booking management, contracts, invoicing, and gallery delivery. Book more clients.",
    painPoints: [
      { icon: "&#128247;", title: "Inquiries Go Unanswered for Hours", desc: "You're shooting all day. By the time you respond to that wedding inquiry at 9 PM, they've already booked someone else." },
      { icon: "&#128203;", title: "Admin Takes More Time Than Shooting", desc: "Contracts, invoices, questionnaires, timelines, gallery delivery — the business side of photography eats 15+ hours a week." },
      { icon: "&#128260;", title: "Past Clients Don't Come Back", desc: "Your engagement clients need a wedding photographer. Your family portrait clients need updated photos. But nobody follows up." }
    ],
    automations: [
      { icon: "&#9889;", title: "Instant Inquiry Response", desc: "AI responds to every website, IG, and email inquiry within minutes — shares your pricing guide, checks date availability, and books a consultation." },
      { icon: "&#128203;", title: "Automated Booking Workflow", desc: "Once a client books, AI sends contracts, invoices, questionnaires, and timeline documents automatically. You just show up and shoot." },
      { icon: "&#128140;", title: "Client Lifecycle Automation", desc: "AI follows up with past clients at key intervals — anniversary shoots, family updates, holiday mini-sessions. Turns one-time clients into repeat customers." }
    ],
    stats: [
      { number: "Minutes", label: "Inquiry response on any channel" },
      { number: "4", label: "Docs sent automatically after booking" },
      { number: "Auto", label: "Past-client follow-ups at key dates" }
    ],
    faqs: [
      { q: "How does AI help photographers book more clients?", a: "Speed is everything. Couples inquiring about wedding photography often contact 5-10 photographers at once. AI responds to every inquiry instantly with your pricing, availability, and a booking link — making you the first photographer they talk to." },
      { q: "Can AI handle photography contracts and invoices?", a: "Yes. AI workflows can automatically send contracts (via tools like HoneyBook or Dubsado), collect signatures, generate invoices, and send payment reminders — all triggered by the booking event." },
      { q: "Will AI feel impersonal for my photography brand?", a: "AI handles the admin so you can be MORE personal where it matters — during consultations, shoots, and gallery reveals. Clients don't want a personal touch on invoice reminders; they want it during the shoot." }
    ]
  },
  {
    slug: "event-planners",
    ctaNoun: "Event Planning Business",
    name: "Event Planners",
    headline: "AI Automation for <span>Event Planners</span>",
    description: "Automate vendor coordination, client communication, and timeline management so every event runs flawlessly.",
    metaDescription: "AI automation for event planners: automate vendor coordination, client updates, RSVP tracking, and timeline management. Plan more events with less stress.",
    painPoints: [
      { icon: "&#128203;", title: "Vendor Coordination Is a Nightmare", desc: "You're emailing 15 vendors per event — caterers, DJs, florists, venues. Keeping everyone aligned manually is a full-time job." },
      { icon: "&#128241;", title: "Clients Want Constant Updates", desc: "Brides, corporate clients, and hosts text you at all hours wanting status updates. Managing expectations while managing logistics burns you out." },
      { icon: "&#128197;", title: "Timeline Management Is Manual", desc: "Day-of timelines change constantly. Communicating updates to all stakeholders requires dozens of messages." }
    ],
    automations: [
      { icon: "&#128232;", title: "Automated Vendor Communication", desc: "AI sends confirmation requests, timeline updates, and logistics details to all vendors on schedule. Everyone stays aligned without 50 emails from you." },
      { icon: "&#129302;", title: "Client Update Portal", desc: "AI powers a client-facing portal with real-time status updates, task completion tracking, and a chat interface — so clients can answer 'where are we?' themselves, at 11pm, without texting you." },
      { icon: "&#128197;", title: "Dynamic Timeline Management", desc: "AI generates day-of timelines and automatically notifies all stakeholders when changes happen. One update, everyone knows." }
    ],
    stats: [
      { number: "Auto", label: "Vendor confirmations and updates sent" },
      { number: "24/7", label: "Client portal with live status" },
      { number: "1", label: "Timeline update notifies everyone" }
    ],
    faqs: [
      { q: "How does AI help event planners manage vendors?", a: "AI automates vendor communication — sending confirmations, timeline updates, logistics details, and payment reminders on a schedule you set. It tracks responses and flags vendors who haven't confirmed." },
      { q: "Can AI manage RSVPs?", a: "Yes. AI can send invitations, track RSVPs, send reminders to non-responders, manage dietary restrictions, and generate seating assignments — all automatically." },
      { q: "Will AI help me take on more events?", a: "Absolutely. The biggest bottleneck for event planners is communication overhead. AI handles the routine half of it — vendor confirmations, timeline updates, client status — which is the part that scales badly when you add another event to the calendar." }
    ]
  },
  {
    slug: "cleaning-services",
    ctaNoun: "Cleaning Business",
    name: "Cleaning Services",
    headline: "AI Automation for <span>Cleaning Services</span>",
    description: "Automate booking, reminders, and customer follow-ups so your cleaning business grows without you answering every call.",
    metaDescription: "AI automation for cleaning services: automate booking, scheduling, customer follow-ups, and review generation. Scale your cleaning business.",
    painPoints: [
      { icon: "&#128222;", title: "You're Cleaning AND Answering Phones", desc: "You can't pick up the phone while scrubbing a bathroom. Missed calls mean missed jobs — and your competitors are answering." },
      { icon: "&#128197;", title: "Scheduling Is a Juggling Act", desc: "Recurring clients, one-time deep cleans, and move-out jobs all need different scheduling. Double-bookings happen too often." },
      { icon: "&#128260;", title: "One-Time Clients Never Rebook", desc: "They loved the clean but never called back. Without follow-up, one-time jobs stay one-time." }
    ],
    automations: [
      { icon: "&#129302;", title: "AI Booking Assistant", desc: "Clients book online 24/7 — selecting service type, home size, and preferred time. AI confirms and adds to your schedule automatically." },
      { icon: "&#128197;", title: "Smart Scheduling & Routing", desc: "AI optimizes your daily route by location, reducing drive time. Handles recurring schedules, reschedules, and cancellations." },
      { icon: "&#128140;", title: "Rebook & Review Automation", desc: "AI follows up after every clean — asks for a review and offers a recurring discount. Turns one-time clients into weekly regulars." }
    ],
    stats: [
      { number: "24/7", label: "Online booking and confirmation" },
      { number: "Auto", label: "Daily routes optimized by location" },
      { number: "Every", label: "Clean followed by a review request" }
    ],
    faqs: [
      { q: "Can AI book cleaning appointments?", a: "Yes. AI booking forms let clients select their service, home size, and schedule — then automatically adds the job to your calendar, sends a confirmation, and creates reminders." },
      { q: "How does AI help cleaning businesses get more reviews?", a: "AI sends a review request text/email after every completed job with a direct link to your Google Business page. Timing it right after the clean (when the house looks great) gets the best results." },
      { q: "Is AI automation affordable for solo cleaning businesses?", a: "Yes. Our Starter plan is $97/month, with setup, training, and ongoing support included. If it wins you even one extra recurring client, it more than pays for itself — and there's a 30-day guarantee if it isn't a fit." }
    ]
  },
  {
    slug: "landscapers",
    ctaNoun: "Landscaping Business",
    name: "Landscapers",
    headline: "AI Automation for <span>Landscaping Companies</span>",
    description: "Automate estimates, scheduling, and seasonal marketing so your landscaping business grows while you're in the field.",
    metaDescription: "AI automation for landscapers: automate estimates, scheduling, crew management, and seasonal marketing. Grow your landscaping business.",
    painPoints: [
      { icon: "&#128222;", title: "Can't Return Calls Fast Enough", desc: "You're on a mower all day. By the time you call leads back at night, they've already hired someone who answered the phone." },
      { icon: "&#128176;", title: "Estimates Take Too Long", desc: "Driving to every property for a quote eats hours. Half those estimates don't convert anyway." },
      { icon: "&#127793;", title: "Seasonal Marketing Doesn't Happen", desc: "Spring cleanup, fall aeration, holiday lighting — you know you should market these, but you're too busy working." }
    ],
    automations: [
      { icon: "&#129302;", title: "AI Lead Capture & Response", desc: "AI answers calls and texts 24/7, collects property details, and provides instant ballpark estimates based on square footage and service type." },
      { icon: "&#128197;", title: "Crew Scheduling & Route Optimization", desc: "AI schedules crews by zone, optimizes daily routes, and handles reschedules due to weather — all automatically." },
      { icon: "&#127793;", title: "Seasonal Campaign Automation", desc: "AI runs seasonal service campaigns to your customer list — spring cleanup in March, aeration in fall, holiday lighting in November. Revenue stays consistent." }
    ],
    stats: [
      { number: "24/7", label: "Calls and texts answered" },
      { number: "Instant", label: "Ballpark estimate by square footage" },
      { number: "3", label: "Seasonal campaigns: spring, fall, holiday" }
    ],
    faqs: [
      { q: "Can AI provide landscaping estimates?", a: "AI can collect property details (address, square footage, service needed) and provide instant ballpark estimates. For complex jobs, it schedules an on-site visit. This qualifies leads before you drive out." },
      { q: "How does AI help with landscaping crew scheduling?", a: "AI optimizes daily crew schedules by geographic zone, reducing drive time between jobs. It handles recurring service schedules, weather-related reschedules, and crew assignments automatically." },
      { q: "Does AI marketing work for seasonal landscaping services?", a: "Extremely well. AI sends targeted campaigns to your customer list at the right time — spring cleanup reminders in February, aeration offers in September, holiday lighting in October. Past customers convert at 5-10x the rate of cold leads." }
    ]
  },
  {
    slug: "auto-repair",
    ctaNoun: "Auto Repair Shop",
    name: "Auto Repair Shops",
    headline: "AI Automation for <span>Auto Repair Shops</span>",
    description: "Automate appointment booking, service reminders, and customer updates so your bays stay full and customers stay informed.",
    metaDescription: "AI automation for auto repair shops: automate appointment booking, service reminders, vehicle status updates, and customer retention. Keep your bays full.",
    painPoints: [
      { icon: "&#128222;", title: "Phone Ringing Off the Hook", desc: "Service advisors spend half their day on the phone instead of writing up jobs. Walk-in customers wait while the phone keeps ringing." },
      { icon: "&#128203;", title: "Customers Want Status Updates", desc: "\"Is my car ready yet?\" calls interrupt workflow. Techs get pulled away to relay updates through the front desk." },
      { icon: "&#128260;", title: "Maintenance Customers Don't Return", desc: "Oil change customers leave and don't come back for 8 months — if ever. Nobody reminds them about their 5K-mile interval." }
    ],
    automations: [
      { icon: "&#128197;", title: "Online Appointment Booking", desc: "Customers book service appointments online — selecting service type, vehicle info, and preferred time. AI confirms and adds to your shop calendar." },
      { icon: "&#128241;", title: "Automated Vehicle Status Updates", desc: "AI texts customers when their vehicle enters service, when parts are ordered, and when it's ready for pickup. Zero phone calls needed." },
      { icon: "&#128260;", title: "Service Reminder Sequences", desc: "AI tracks mileage intervals and sends oil change, tire rotation, and inspection reminders at exactly the right time." }
    ],
    stats: [
      { number: "24/7", label: "Online appointment booking" },
      { number: "Auto", label: "Status texts at every stage" },
      { number: "3", label: "Reminders: oil, tires, inspection" }
    ],
    faqs: [
      { q: "Can AI send my customers vehicle status updates?", a: "Yes. AI integrates with your shop management system to send automated texts when a vehicle enters the bay, when additional work is found, and when it's ready for pickup. Customers love the transparency." },
      { q: "How does AI get auto repair customers to come back?", a: "AI tracks each vehicle's service history and mileage estimates, then sends personalized reminders for upcoming maintenance — oil changes, brake inspections, tire rotations. It's like having a service advisor dedicated to retention." },
      { q: "Does this work with my shop management software?", a: "AI integrates with popular shop management systems like Mitchell, ShopWare, Tekmetric, and Shop-Ware. Custom integrations are available for other platforms." }
    ]
  },
  {
    slug: "pet-groomers",
    ctaNoun: "Grooming Business",
    name: "Pet Groomers",
    headline: "AI Automation for <span>Pet Groomers</span>",
    description: "Automate booking, reminders, and rebooking so your grooming schedule stays packed and pet parents keep coming back.",
    metaDescription: "AI automation for pet groomers: automate appointment booking, reminders, rebooking, and pet parent communication. Keep your grooming table full.",
    painPoints: [
      { icon: "&#128054;", title: "Phone Calls During Grooming", desc: "You can't answer the phone with a squirmy Pomeranian in one hand and clippers in the other. Calls go to voicemail." },
      { icon: "&#128197;", title: "No-Shows Waste Expensive Time", desc: "A grooming appointment is 1-2 hours. A no-show isn't just lost revenue — it's a quarter of your day." },
      { icon: "&#128260;", title: "Clients Don't Book Regular Visits", desc: "Pet parents know they should bring Fluffy every 6 weeks but never remember. You rely on them to call — they don't." }
    ],
    automations: [
      { icon: "&#128197;", title: "24/7 Online Booking", desc: "Pet parents book appointments anytime — selecting breed, service, and preferred time. AI confirms and adds to your calendar." },
      { icon: "&#128276;", title: "No-Show Prevention", desc: "AI sends reminders at 48hrs, 24hrs, and 2hrs before appointments. Requires deposits for premium services, so a booked slot stays booked." },
      { icon: "&#128054;", title: "Auto-Rebook at the Right Interval", desc: "AI knows each pet's grooming schedule and sends rebook reminders at exactly the right time. One-tap booking keeps them on track." }
    ],
    stats: [
      { number: "24/7", label: "Booking for any breed or service" },
      { number: "3", label: "Reminders before every appointment" },
      { number: "1-tap", label: "Rebooking at the right interval" }
    ],
    faqs: [
      { q: "Can AI handle pet grooming appointments?", a: "Yes. AI booking systems let pet parents select breed, service type, and groomer preference — then book 24/7. It handles special instructions (sensitive skin, anxiety, etc.) and syncs with your calendar." },
      { q: "How does AI remind pet parents to rebook?", a: "AI tracks each pet's last visit and grooming interval (every 4 weeks for doodles, 6 weeks for labs, etc.) and sends a personalized text with a one-tap booking link when it's time." },
      { q: "Is this affordable for a solo pet groomer?", a: "Our Starter plan is $97/month — about $3 a day. Preventing just one no-show a week covers that several times over, and every plan includes setup, training, support, and a 30-day guarantee." }
    ]
  },
  {
    slug: "daycares",
    ctaNoun: "Daycare",
    name: "Daycares",
    headline: "AI Automation for <span>Daycare Centers</span>",
    description: "Automate enrollment inquiries, parent communication, and waitlist management so you can focus on the kids.",
    metaDescription: "AI automation for daycares: automate enrollment inquiries, parent communication, waitlist management, and billing reminders. Focus on care, not admin.",
    painPoints: [
      { icon: "&#128222;", title: "Enrollment Inquiries Go Unanswered", desc: "Working parents call during business hours — when your staff is busy with children. By the time you call back, they've toured another daycare." },
      { icon: "&#128203;", title: "Waitlist Management Is a Mess", desc: "Your waitlist is a spreadsheet (or sticky notes). When a spot opens, you scramble to contact families and half don't respond." },
      { icon: "&#128241;", title: "Parent Communication Is Overwhelming", desc: "Daily updates, sick policy reminders, event notices, and billing reminders — communicating with 40+ families is a job in itself." }
    ],
    automations: [
      { icon: "&#129302;", title: "AI Enrollment Assistant", desc: "AI answers enrollment inquiries 24/7 — sharing availability, pricing, tour scheduling, and required documents. Parents get instant answers." },
      { icon: "&#128203;", title: "Smart Waitlist Management", desc: "AI automatically contacts families when spots open, in priority order. If the first family doesn't respond in 24 hours, it moves to the next." },
      { icon: "&#128232;", title: "Automated Parent Communication", desc: "AI sends daily updates, reminders, event notices, and billing alerts. Parents get consistent communication without staff spending hours writing messages." }
    ],
    stats: [
      { number: "24/7", label: "Enrollment questions answered" },
      { number: "24h", label: "Waitlist moves to the next family" },
      { number: "4", label: "Parent message types automated" }
    ],
    faqs: [
      { q: "How does AI help daycares with enrollment?", a: "AI responds to every enrollment inquiry instantly — by phone, text, email, or web form. It shares availability, pricing, and program details, then books a tour. Parents are more likely to enroll when they get fast, helpful responses." },
      { q: "Can AI manage a daycare waitlist?", a: "Yes. AI maintains a prioritized waitlist and automatically contacts families when spots open. It tracks responses, moves to the next family if there's no reply, and keeps everyone informed of their position." },
      { q: "Is AI appropriate for childcare communication?", a: "AI handles administrative communication (billing, scheduling, closures) while your staff focuses on the personal, care-related updates. Parents appreciate timely admin messages, and your staff has more time for the kids." }
    ]
  },
  {
    slug: "churches",
    name: "Churches",
    ctaNoun: "Church's Visitor and Volunteer Follow-Up",
    headline: "AI Automation for <span>Churches</span>",
    description: "No-code workflow automation for visitor follow-up, volunteer coordination, and event communication — running on the church management software you already use, so your staff can focus on ministry.",
    metaDescription: "No-code AI workflow automation for churches: visitor follow-up, volunteer scheduling, and multi-channel event communication. Works with Planning Center and Breeze.",
    painPoints: [
      { icon: "&#128100;", title: "First-Time Visitors Never Return", desc: "Someone visits Sunday morning, fills out a card, and never hears from you until they've already found another church. Follow-up is inconsistent." },
      { icon: "&#128232;", title: "Event Communication Is Scattered", desc: "Announcements go out via email, bulletin, social media, and text — but not everyone sees everything. Attendance suffers." },
      { icon: "&#128101;", title: "Volunteer Coordination Is Painful", desc: "Recruiting, scheduling, and reminding volunteers is a manual process that eats hours of staff time every week." }
    ],
    automations: [
      { icon: "&#128140;", title: "Visitor Follow-Up Sequence", desc: "AI sends a welcome text within hours of a first visit, a personal email on Monday, and a small group invitation on Wednesday. No visitor slips through the cracks." },
      { icon: "&#128232;", title: "Multi-Channel Event Promotion", desc: "AI distributes event announcements across email, text, social media, and app notifications — ensuring maximum reach with one setup." },
      { icon: "&#128101;", title: "Volunteer Scheduling Automation", desc: "AI manages volunteer sign-ups, sends schedule reminders, handles swap requests, and fills gaps when someone cancels." }
    ],
    stats: [
      { number: "3", label: "Visitor touchpoints in the first week" },
      { number: "4", label: "Channels for every announcement" },
      { number: "Auto", label: "Volunteer gaps filled when someone cancels" }
    ],
    deepDive: {
      heading: "What No-Code Workflow Automation Looks Like in a Church",
      intro: "Churches do not usually have a technology problem. They have a Tuesday problem — the follow-up everyone agreed was important on Sunday morning is competing with a funeral, a budget meeting, and a broken HVAC unit by the middle of the week, and the follow-up is what loses. No-code workflow automation is not about replacing anyone on your staff. It is about making sure the message still goes out on the week everyone is buried. Here is what that actually looks like.",
      blocks: [
        { title: "The two weeks after a first visit are the whole ballgame", body: "A first-time visitor usually decides whether they are coming back before anyone on staff has had a real conversation with them. The window is short, and when follow-up does not happen it is almost never because nobody cared — it is because Sunday afternoon happened. The workflow is simple: a welcome text within a few hours, from whoever actually greeted them; a short personal email Monday from a real person with a real name, not from The Communications Team; and mid-week, an invitation to the one specific group that fits them rather than a list of twelve. The part most churches skip is the most important one — the moment a visitor replies to anything, the sequence stops and a human takes over. That single rule is the difference between a system that feels warm and one that feels like a mailing list." },
        { title: "Volunteer follow-up is a scheduling problem wearing a recruitment costume", body: "Most churches believe they have a volunteer recruitment problem. Usually what they have is a volunteer follow-up problem: someone signs up at a table on Sunday, hears nothing for three weeks, and by the time a coordinator calls, the moment has passed. Automating that gap closes it — the signup confirmation goes out immediately, orientation details go out the same week, the shift reminder goes out two days ahead, and the thank-you goes out that night. Swap requests get handled without three separate text threads. When a regular volunteer drops off the schedule for a month, the coordinator hears about it then rather than noticing in the spring. None of this recruits anybody. It just stops you from losing the people who already raised their hand." },
        { title: "What 'no-code' actually means, and what it does not", body: "No-code means the workflows are assembled from connected tools rather than written as software. Nobody on your staff needs to program anything, and nobody inherits a codebase to maintain after we are gone. Your communications director can open the flow, read every step in plain language, change the wording of a message, add a delay, or switch a sequence off — in an interface that looks like a flowchart, not a terminal. What no-code does not mean is that it builds itself. Somebody still has to decide what a first-time visitor should hear on day three, and that is a ministry decision, not a technical one. We build the flow. You own the words inside it." },
        { title: "It runs on the church management software you already have", body: "You do not need to migrate your database to start. These workflows sit on top of the systems churches already run — Planning Center, Breeze, Church Community Builder, Realm, Tithe.ly, Subsplash — and connect them so an action in one shows up everywhere it should. A connection card submitted Sunday creates the person record, starts the visitor sequence, and notifies the right staff member, without anyone retyping it Monday. A volunteer signup triggers onboarding. A first gift triggers a thank-you. Replacing your ChMS is a far larger project than fixing the handoffs between the tools you have, and it is usually not the thing standing between you and better retention." },
        { title: "The announcement everybody missed", body: "Every church has promoted an event for three weeks and still heard 'I did not know about that' on the day. The cause is rarely effort. It is that the announcement went out on four channels, at four different times, worded four different ways, and the people who needed it were not looking at the one they were on. One setup distributed to email, text, social, and the app at the same moment — with the reminder already scheduled when the announcement goes out — solves most of it. The rest is knowing who has not opened it yet, which the system can tell you while there is still time to do something about it." },
        { title: "What we will not automate — and you should not either", body: "Prayer requests. The call after a diagnosis. The conversation with the family who quietly stopped coming. Anything where the entire point is that a person chose to spend their time on you. We have watched organizations automate the wrong half and turn warm relationships cold, and that does not come back in a single season. The rule is the same one we give nonprofits: automate the reliability, never the relationship. If a message would be insulting to receive from a robot, a person sends it — and the system's job is to make sure that person knows it needs sending." },
        { title: "Why we care about this one", body: "EasyAiFlows is run by Ronnie Craig, an RN who spends his working life in hospice care. The question of when a message has to come from a person, and when a system should simply make sure it goes out on time, is not an abstract one here. We also do 501(c)(3) formation work and research and write grants for several nonprofit organizations, so we see the ministry and nonprofit side of this at close range. If your church runs a benevolence fund, a food pantry, or a school as its own entity, that side has the same problems — see our <a href=\"/nonprofit\">501(c)(3) formation service</a>." }
      ]
    },
    faqs: [
      { q: "What is no-code automation for churches?", a: "It is connecting the tools your church already uses so routine work happens without someone remembering it. A connection card triggers the visitor follow-up sequence. A volunteer signup triggers onboarding and shift reminders. An event announcement goes to every channel at once. It is called no-code because the workflows are assembled visually rather than programmed, so your staff can read and change them without a developer." },
      { q: "How does church volunteer follow-up automation work?", a: "It closes the gap between someone signing up and their first shift, which is where most volunteers are lost. The signup confirmation sends immediately, orientation details go out that week, a shift reminder goes out two days before, and a thank-you goes out afterward. Swap requests and unfilled positions are handled automatically, and your coordinator is alerted when a regular volunteer has not been on the schedule for a while." },
      { q: "Can church workflow automation connect to Planning Center or Breeze?", a: "Yes. The workflows sit on top of the church management software you already run — Planning Center, Breeze, Church Community Builder, Realm, Tithe.ly, Subsplash and others — rather than replacing it. We connect those tools so a connection card, a volunteer signup, or a first gift in one system triggers the right follow-up in the others. You do not need to migrate your database to start." },
      { q: "Do we need someone technical on staff to run this?", a: "No. That is the point of building it no-code. Every step is visible in a flowchart-style interface, so whoever handles your communications can change the wording of a message, adjust timing, or pause a sequence without touching code and without calling us. We build the workflow and hand it over; you are not dependent on us to run it." },
      { q: "How does AI help churches with visitor retention?", a: "AI sends personalized follow-up messages to first-time visitors — a welcome text the same day, a personal email from a real staff member, and an invitation to a specific group rather than a general list. Every first-time visitor gets the same follow-up on the same schedule, whether or not it was a busy week, and the sequence stops the moment someone replies so a person can take over." },
      { q: "Is AI appropriate for church communication?", a: "It handles the logistical communication — scheduling, reminders, event details, confirmations — so your pastoral staff can spend their time on the relational work. The rule we build to is that automation controls the timing, never the sentiment. Pastoral care, prayer requests, and hard conversations stay entirely human, and the system's job there is only to make sure the right person knows to reach out." },
      { q: "Is this realistic for a small church with part-time staff?", a: "Usually yes, and small churches often get more out of it than large ones because there is no slack in the schedule to absorb dropped follow-up. We start with the one or two workflows that give back the most staff hours — normally visitor follow-up and volunteer scheduling — rather than automating everything at once. Book a strategy call and we will tell you honestly if the answer is no." },
      { q: "Is our member and giving data safe?", a: "Your records stay in the systems you already use. We connect those tools rather than exporting your database somewhere new, each integration is limited to the data it actually needs, and access stays under your control so you can revoke it at any time. If your church has a written data or privacy policy, bring it to the strategy call and we will build inside it." }
    ]
  },
  {
    slug: "nonprofits",
    ctaNoun: "Nonprofit's Donor and Volunteer Follow-Up",
    name: "Nonprofits",
    headline: "AI Automation for <span>Nonprofits</span>",
    description: "Automate donor communication, volunteer management, and grant tracking so your team spends more time on mission — not admin.",
    metaDescription: "AI automation for nonprofits: automate donor follow-up, volunteer coordination, grant deadline tracking, and impact reporting. More mission, less admin.",
    painPoints: [
      { icon: "&#128176;", title: "Donor Follow-Up Is Inconsistent", desc: "Donors give once and never hear from you again. By the time your annual appeal goes out, they've moved on to another cause." },
      { icon: "&#128203;", title: "Grant Deadlines Sneak Up", desc: "Your team juggles dozens of grant applications with different deadlines, requirements, and reporting schedules. Things get missed." },
      { icon: "&#128101;", title: "Volunteer Management Eats Staff Time", desc: "Recruiting, onboarding, scheduling, and thanking volunteers is critical but consumes hours that should go toward programs." }
    ],
    automations: [
      { icon: "&#128140;", title: "Donor Stewardship Automation", desc: "AI sends thank-you messages within 24 hours, impact updates quarterly, and personalized renewal appeals — keeping donors engaged year-round." },
      { icon: "&#128203;", title: "Grant Deadline & Task Tracking", desc: "AI tracks every grant deadline, sends reminders to responsible staff, and flags when reports or applications are coming due." },
      { icon: "&#128101;", title: "Volunteer Lifecycle Automation", desc: "AI handles volunteer applications, onboarding emails, scheduling, and post-event thank-you messages. Your team focuses on relationships." }
    ],
    stats: [
      { number: "24h", label: "Thank-you after every gift" },
      { number: "Every", label: "Grant deadline tracked and flagged" },
      { number: "Auto", label: "Volunteer onboarding and thank-yous" }
    ],
    deepDive: {
      heading: "What Nonprofit Workflow Automation Actually Looks Like",
      intro: "Most nonprofits do not have a technology problem. They have a capacity problem — three people doing the work of eight, and the admin work always wins because it has a deadline. Automation is not about replacing anyone. It is about making sure the follow-up still happens on the week everyone is buried. Here is what that looks like in practice.",
      blocks: [
        { title: "The donor journey, from first gift to renewal", body: "A first-time donor gives online. Within the hour they get a real thank-you, not a receipt. A few days later they get one short story about what their gift paid for. A month in, they see the program in action. When renewal season comes, the appeal they receive already knows what they gave to last time and what it did. None of that requires a staff member to remember it on the right day — but every step of it is written by you, in your voice, once. The system just makes sure it goes out." },
        { title: "A grant calendar that runs itself", body: "Most missed grant deadlines are not a knowledge problem. Somebody knew. It was on a spreadsheet nobody opened that week. We build the grant calendar as a live system: every application and every report gets an owner, a due date, and an escalating reminder that starts far enough out to actually be useful. Interim reports, final reports, and renewal windows all get tracked the same way. It will not write your narrative, and we will not pretend otherwise — it makes sure you are never writing it the night before." },
        { title: "Volunteers: recruit once, then keep them", body: "The gap that costs nonprofits most is between someone signing up and their first shift. That is where enthusiasm dies. Automated onboarding closes it — the application confirmation, the orientation details, the shift reminder, the thank-you afterward, and a check-in when a regular volunteer has not been on the schedule for a while. Your coordinator stops chasing logistics and goes back to the part only a person can do." },
        { title: "The board report nobody has time to build", body: "If your monthly or quarterly board report is assembled by hand from four different places the week it is due, that is a workflow, and it can be automated. Gifts, new donors, retention, volunteer hours, and grant status can be pulled into the same format every time, so the report is a review rather than a rebuild. The same numbers feed your annual report and your grant reporting later." },
        { title: "What we will not automate — and you should not either", body: "The ask itself. The major-donor relationship. The call after a loss. Anything where the point is that a human chose to spend their time on you. We have watched organizations automate the wrong half and turn warm donors cold, and it is not recoverable in a single season. The rule we use: automate the reliability, never the relationship. If a message would be insulting to receive from a robot, a person sends it." },
        { title: "It works with the donor CRM you already have", body: "You do not need to migrate your database to start. These workflows sit on top of the tools nonprofits already run — the donation platform, the donor CRM, the email list, the volunteer signup sheet. We connect them so a gift in one place triggers the right follow-up everywhere else. Replacing your CRM is a much bigger project than fixing your follow-up, and it is usually not the thing standing between you and better retention." },
        { title: "Why we care about this one", body: "EasyAiFlows is run by Ronnie Craig, an RN who spends his working life in hospice care — so the nonprofit and community-health world is not an industry vertical we picked off a list. We research and write grants for several nonprofit organizations, which is how we know what a grant calendar actually costs a small team, and we do 501(c)(3) formation work, so we also see organizations at the very beginning, before any of these systems exist. If you are still at that stage, start there instead: see our <a href=\"/nonprofit\">501(c)(3) formation service</a>." }
      ]
    },
    faqs: [
      { q: "What is nonprofit workflow automation?", a: "It is connecting the tools you already use so routine work happens without someone remembering it. A gift triggers a thank-you and adds the donor to a stewardship sequence. A grant deadline triggers reminders to the staff member who owns it. A volunteer signup triggers onboarding. The workflows are designed around how your organization actually operates, then they run on their own." },
      { q: "How does AI help nonprofits retain donors?", a: "AI automates the donor stewardship journey — thank-you messages within 24 hours of a gift, quarterly impact updates, birthday and anniversary acknowledgments, and personalized renewal appeals. Consistent communication is the single biggest driver of donor retention, and consistency is exactly what a short-staffed team cannot guarantee by hand." },
      { q: "Can AI help with grant management?", a: "AI tracks grant deadlines, sends reminders to responsible staff, monitors reporting requirements, and flags upcoming applications. It will not write the grant narrative for you, but it makes sure nothing falls through the cracks between application, award, interim report and renewal." },
      { q: "We are a small team with almost no budget. Is this realistic?", a: "Usually yes, and small teams tend to get more out of it than large ones because there is no slack in the schedule to absorb dropped follow-up. Many of the underlying tools offer significant nonprofit discounts, and we start with the one or two workflows that give back the most staff hours rather than automating everything at once. Book a strategy call and we will tell you honestly if the answer is no." },
      { q: "Will this make our communication feel impersonal?", a: "Only if you write it that way. Every message is drafted in your voice and approved by you before it ever sends — automation controls the timing, not the sentiment. In practice most donors hear from automated organizations more warmly than from overwhelmed ones, because the overwhelmed ones go quiet for months at a time." },
      { q: "Is our donor data safe?", a: "Your donor records stay in your existing systems. We connect those tools rather than exporting your database somewhere new, we limit each integration to the data it actually needs, and access stays under your control so you can revoke it at any time. If your organization has a written data policy, bring it to the strategy call and we will build inside it." },
      { q: "Do you work with nonprofits outside Texas?", a: "Yes. The workflows are built and run remotely — the calls happen over video and no part of the build needs anyone on site — so where you are does not change what gets built or what it costs. EasyAiFlows is based in Pearland, Texas. Our nonprofit work so far has been grant research and writing for several organizations, plus 501(c)(3) formation, and none of it depended on being in the same city." }
    ]
  }
];

function generatePage(industry, allIndustries) {
  // Cross-links. Two things were wrong here for four months:
  //   1. Every href omitted the trailing slash. GitHub Pages 301s /ai-for/x -> /ai-for/x/, so all
  //      408 internal links on this property were redirect hops. That same missing slash is what
  //      caused the unstyled-CSS bug fixed on 8/10 — verify links WITH the slash.
  //   2. Every page linked to all 19 siblings, which reads as a link farm and splits the equity
  //      20 ways. Six siblings (rotating by array position, so the set differs per page and every
  //      page still receives ~6 inbound links) plus one link to the hub.
  const idx = allIndustries.findIndex(i => i.slug === industry.slug);
  const related = Array.from({ length: 6 }, (_, n) => allIndustries[(idx + n + 1) % allIndustries.length])
    .map(i => `        <a href="/ai-for/${i.slug}/">${i.name}</a>`)
    .join('\n');

  // Lowercasing the display name for mid-sentence use used to be a bare .toLowerCase(), which
  // turned "HVAC Companies" into "hvac companies" on two paragraphs of the HVAC page. Preserve any
  // token that is already all-caps (an acronym); lowercase the rest.
  const lowerName = industry.name
    .split(' ')
    .map(w => (w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase()))
    .join(' ');

  // Closing-CTA noun. The old inline singularizer ran /s$/ before /ies$/, so the `ies` rule could
  // never fire — "HVAC Companies" rendered as "Companie" and "Churches" as "Churche". Order matters,
  // and -ches/-shes/-xes need their own case. An industry can override with `ctaNoun` where
  // "<X> Business" is the wrong register (a church is not a business).
  const ctaNoun = industry.ctaNoun || `${industry.name
    .replace(/ies$/, 'y')
    .replace(/(ch|sh|[sxz])es$/, '$1')
    .replace(/s$/, '')} Business`;

  // Optional long-form section. Industries that omit `deepDive` render exactly as before.
  const deepDive = !industry.deepDive ? '' : `  <!-- ── Deep Dive ── -->
  <section class="deep-dive">
    <div class="container">
      <h2>${industry.deepDive.heading}</h2>
      <p class="deep-intro">${industry.deepDive.intro}</p>
${industry.deepDive.blocks.map(b => `      <div class="deep-block">
        <h3>${b.title}</h3>
        <p>${b.body}</p>
      </div>`).join('\n')}
    </div>
  </section>

`;

  // JSON.stringify, not a hand-rolled quote replace. The old version escaped `"` only, so a
  // backslash, newline, or tab in any future FAQ string would have emitted invalid JSON-LD and
  // silently killed the rich result for that page.
  const faqSchema = industry.faqs.map(f => `      {
        "@type": "Question",
        "name": ${JSON.stringify(f.q)},
        "acceptedAnswer": {
          "@type": "Answer",
          "text": ${JSON.stringify(f.a)}
        }
      }`).join(',\n');

  const pageUrl = `https://easyaiflows.com/ai-for/${industry.slug}/`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Automation for ${industry.name} | EasyAiFlows</title>
  <meta name="description" content="${industry.metaDescription}">
  <link rel="stylesheet" href="/ai-for/industry-style.css">
  <link rel="icon" href="/logo.png" type="image/png">
  <link rel="canonical" href="${pageUrl}">

  <!-- Open Graph / social share -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EasyAiFlows">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="AI Automation for ${industry.name} | EasyAiFlows">
  <meta property="og:description" content="${industry.metaDescription}">
  <meta property="og:image" content="https://easyaiflows.com/images/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="EasyAiFlows — AI automation for ${lowerName}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AI Automation for ${industry.name} | EasyAiFlows">
  <meta name="twitter:description" content="${industry.metaDescription}">
  <meta name="twitter:image" content="https://easyaiflows.com/images/og-image.png">

  <!-- Breadcrumb Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://easyaiflows.com/" },
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://easyaiflows.com/ai-for/" },
      { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(industry.name)}, "item": "${pageUrl}" }
    ]
  }
  </script>

  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${faqSchema}
    ]
  }
  </script>

  <!-- Service Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation for ${industry.name}",
    "description": "${industry.metaDescription}",
    "provider": {
      "@type": "Organization",
      "name": "EasyAiFlows",
      "url": "https://easyaiflows.com"
    },
    "areaServed": "US",
    "serviceType": "AI Automation"
  }
  </script>
</head>
<body>

  <!-- ── Navigation ── -->
  <nav>
    <div class="container">
      <a href="/" class="nav-logo">
        <img src="/logo.png" alt="EasyAiFlows">
        <span>EasyAiFlows</span>
      </a>
      <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('active')">&#9776;</button>
      <div class="nav-links">
        <a href="/#services">Services</a>
        <a href="/ai-for/">Industries</a>
        <a href="/blog/">Blog</a>
        <a href="/grader" class="btn btn-outline" style="border-color:var(--cyan);color:var(--cyan)">AI Grader</a>
        <a href="https://tidycal.com/ronnieysela/ai-strategy-call" class="btn btn-primary" target="_blank">Book a Call</a>
      </div>
    </div>
  </nav>

  <!-- ── Hero ── -->
  <section class="industry-hero">
    <div class="container">
      <div class="section-label">AI Automation for ${industry.name}</div>
      <h1>${industry.headline}</h1>
      <p>${industry.description}</p>
      <div class="hero-buttons">
        <a href="https://tidycal.com/ronnieysela/ai-strategy-call" class="btn btn-primary" target="_blank">Book Your Free Strategy Call</a>
        <a href="/grader" class="btn btn-outline">Take the AI Readiness Quiz</a>
      </div>
    </div>
  </section>

  <!-- ── Pain Points ── -->
  <section class="pain-points">
    <div class="container">
      <h2>The Challenges ${industry.name} Face Every Day</h2>
      <div class="pain-grid">
${industry.painPoints.map(p => `        <div class="pain-card">
          <div class="pain-icon">${p.icon}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- ── AI Automations ── -->
  <section class="automations">
    <div class="container">
      <h2>How AI Solves These Problems</h2>
      <p>Here are 3 automations that transform how ${lowerName} operate — no coding required.</p>
      <div class="auto-grid">
${industry.automations.map(a => `        <div class="auto-card">
          <div class="auto-icon">${a.icon}</div>
          <h3>${a.title}</h3>
          <p>${a.desc}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- ── Results ── -->
  <section class="results">
    <div class="container">
      <h2>What's Automated for ${industry.name}</h2>
      <div class="results-grid">
${industry.stats.map(s => `        <div class="result-item">
          <div class="result-number">${s.number}</div>
          <div class="result-label">${s.label}</div>
        </div>`).join('\n')}
      </div>
      <p class="results-note">Those are capabilities &mdash; what the system does, not what we promise it will earn you. We don't publish other people's numbers. The one set we can stand behind is our own: <a href="/blog/automate-follow-ups-small-business.html#real-results">what follow-up automation did for our nutrition club</a>, written up with the actual figures.</p>
    </div>
  </section>

${deepDive}  <!-- ── How It Works ── -->
  <section class="how-it-works">
    <div class="container">
      <h2>How It Works</h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>Free Strategy Call</h3>
          <p>We look at your business, identify the biggest time-wasters, and map out which automations will save you the most hours and money.</p>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <h3>We Build It for You</h3>
          <p>Our team builds your custom AI workflows — booking systems, follow-up sequences, marketing campaigns — tailored to how ${lowerName} actually work.</p>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <h3>You Grow on Autopilot</h3>
          <p>Your AI runs 24/7 — answering inquiries, sending follow-ups, and keeping your schedule full while you focus on what you do best.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── FAQ ── -->
  <section class="faq">
    <div class="container">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-list">
${industry.faqs.map(f => `        <div class="faq-item">
          <h3>${f.q}</h3>
          <p>${f.a}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- ── CTA ── -->
  <section class="cta">
    <div class="container">
      <h2>Ready to Automate Your ${ctaNoun}?</h2>
      <p>Book a free 15-minute strategy call. We'll identify exactly where AI can save you the most time and money — no pressure, no pitch.</p>
      <div class="cta-buttons">
        <a href="https://tidycal.com/ronnieysela/ai-strategy-call" class="btn btn-primary" target="_blank" style="font-size:1.15rem; padding:1.1rem 2.5rem;">Book Your Free Call Now</a>
        <a href="/grader" class="btn btn-outline" style="font-size:1rem; padding:0.9rem 2rem;">Take the AI Readiness Quiz</a>
      </div>
    </div>
  </section>

  <!-- ── Related Industries ── -->
  <section class="related">
    <div class="container">
      <h2>AI Automation for Other Industries</h2>
      <div class="related-links">
${related}
      </div>
      <p style="text-align:center;margin-top:2rem;"><a href="/ai-for/">See all ${allIndustries.length} industries &rarr;</a></p>
    </div>
  </section>

  <!-- ── Footer ── -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4>EasyAiFlows</h4>
          <p>Custom AI automation for entrepreneurs who are ready to stop grinding and start growing. Based in Pearland, TX. Serving clients nationwide.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/#services">Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/ai-for/">Industries</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/grader">AI Readiness Grader</a></li>
            <li><a href="https://tidycal.com/ronnieysela/ai-strategy-call" target="_blank">Book a Call</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:azteampossibility@gmail.com">azteampossibility@gmail.com</a></li>
            <li><a href="https://instagram.com/nutritionhub101" target="_blank">Instagram</a></li>
            <li><a href="https://twitter.com/Ronnie71Craig" target="_blank">X / Twitter</a></li>
            <li><a href="https://tiktok.com/@nutritionhub" target="_blank">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 EasyAiFlows. All rights reserved.
      </div>
    </div>
  </footer>

</body>
</html>`;
}

// Generate all pages
const outputDir = __dirname;

industries.forEach(industry => {
  const dir = path.join(outputDir, industry.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const html = generatePage(industry, industries);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  Generated: /ai-for/${industry.slug}/`);
});

console.log(`\nDone! Generated ${industries.length} industry pages.`);
