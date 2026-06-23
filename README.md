# Borderless AI 🌍

> The first AI-powered visa and relocation advisor for remote workers and digital nomads.

**Live:** https://borderless-ai-g2ut.vercel.app

---

## What It Does

Borderless AI helps remote workers, freelancers, and founders navigate the complex world of digital nomad visas, tax residency, and international relocation — in plain language, no legal jargon.

---

## Weekly Build Progress

### ✅ Week 5 — Public Chatbot / Guided Assistant
**Live chat page:** https://borderless-ai-g2ut.vercel.app/chat

Built a fully functional AI-powered chat assistant with:
- 3-question animated intake flow (country, work situation, goal)
- Claude AI responses personalized to each user's profile
- Guardrail system — blocks harmful or out-of-scope requests before API call
- Human checkpoint card — triggers for complex legal or tax situations
- Thumbs up / thumbs down feedback saved to localStorage
- Chat logs saved every 5 messages
- Dark glassmorphism UI with animated gradient orbs
- Deployed on Vercel with ANTHROPIC_API_KEY configured

**Key commits:**
- `feat/week5: restore full designed app/chat/page.tsx with glassmorphism UI`
- `feat/week5: push app/api/chat/route.ts`
- `feat/week5: push lib/supabase.ts`

---

### ✅ Week 4 — Marketing Page
**Live marketing page:** https://borderless-ai-g2ut.vercel.app/marketing

Built a full marketing landing page with:
- Hero section with value proposition
- Problem / solution framing
- Feature highlights
- Social proof section
- Call to action
- Fully responsive design
- Deployed on Vercel

---

### ✅ Week 1–3 — Foundation
**Live homepage:** https://borderless-ai-g2ut.vercel.app

- Next.js 14 app directory setup
- Tailwind CSS styling
- Core homepage with venture concept
- Vercel deployment pipeline
- GitHub continuous deployment

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | Framework and routing |
| React 19 | UI components |
| Tailwind CSS | Styling |
| Claude API (Sonnet 4.6) | AI chat responses |
| Supabase | Data storage |
| Vercel | Deployment |
| GitHub | Version control |

---

## Pages

| Page | URL | Status |
|---|---|---|
| Homepage | / | ✅ Live |
| Marketing | /marketing | ✅ Live |
| Chat Assistant | /chat | ✅ Live |

---

## Local Development

```bash
git clone https://github.com/camibarcenag-debug/borderless-ai.git
cd borderless-ai
npm install
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

*Built by Cami Bárcena — Startup Studio 2026*
