# GitHub Research — Wedding Invitation Templates

Research conducted for visual inspiration and architectural patterns. We use these repositories as **inspiration only**, adapting ideas under permissive licenses where applicable. We do not copy proprietary designs wholesale.

---

## 1. Holymaiden/wedding-app

| Field | Value |
|-------|-------|
| **URL** | https://github.com/Holymaiden/wedding-app |
| **License** | MIT |
| **Stack** | Next.js 15, TypeScript, Framer Motion, Tailwind CSS |

**What we can learn:**
- Interactive letter-opening animation for invitation reveal
- Section-based scroll layout with Framer Motion
- Rose/pink gradient theming approach
- Countdown timer integration
- Mobile-first responsive patterns

**Useful UI ideas:**
- Opening envelope interaction (adapted in Template 01 opening screen)
- Animated section reveals on scroll
- Music player placeholder pattern (future feature)

---

## 2. petershaan12/Weddingly-Free

| Field | Value |
|-------|-------|
| **URL** | https://github.com/petershaan12/Weddingly-Free |
| **License** | MIT |
| **Stack** | Next.js, TypeScript, Tailwind CSS, react-intersection-observer |

**What we can learn:**
- Environment-variable-driven wedding data configuration
- Typewriter text animation for hero sections
- Scroll-triggered animations with Intersection Observer
- Clean single-page invitation structure

**Useful UI ideas:**
- Dynamic configuration pattern (informed our `config.ts` per template)
- Scroll-reveal animation timing
- Responsive hero with couple photo overlay

---

## 3. bymilon/wedding-landing-page

| Field | Value |
|-------|-------|
| **URL** | https://github.com/bymilon/wedding-landing-page |
| **License** | MIT |
| **Stack** | React 19, Vite, Tailwind CSS 4, Motion, Lucide React |

**What we can learn:**
- Full-page section composition (Hero → Venue → Itinerary → RSVP → FAQ)
- Frontend RSVP form with validation and confirmation states
- Premium landing page navigation patterns
- Tailwind CSS 4 design token structure

**Useful UI ideas:**
- RSVP form UX with loading/confirmation states (used in Template 01)
- Venue section with map link CTA
- Full-screen hero with elegant mobile navigation

---

## 4. pcakhilnadh/SethuWedsAkhil

| Field | Value |
|-------|-------|
| **URL** | https://github.com/pcakhilnadh/SethuWedsAkhil |
| **License** | MIT |
| **Stack** | React, TypeScript, Vite, Tailwind CSS, Framer Motion |

**What we can learn:**
- Interactive timeline story section
- Photo gallery with touch/swipe support
- Component separation (`components/`, `data/`, `types/`)
- PWA-ready wedding site structure

**Useful UI ideas:**
- Gallery grid layout patterns
- Story/timeline section structure
- Custom hooks for animation logic

---

## 5. danigonlinea/wedding.github.io

| Field | Value |
|-------|-------|
| **URL** | https://github.com/danigonlinea/wedding.github.io |
| **License** | Apache 2.0 |
| **Stack** | Vue.js, Vite |

**What we can learn:**
- RSVP management data flow
- Gift registry section patterns
- Save-the-date calendar (.ics) integration
- Multi-section invitation card design

**Useful UI ideas:**
- RSVP collection architecture (future `guest_responses` table)
- Calendar integration concept
- Animated invitation card transitions

---

## 6. rampatra/wedding-website

| Field | Value |
|-------|-------|
| **URL** | https://github.com/rampatra/wedding-website |
| **License** | GPL-3.0 (reference only — not used as code base) |
| **Stack** | HTML, CSS, JavaScript, Gulp |

**What we can learn:**
- Industry-standard wedding website feature set
- RSVP via Google Sheets pattern
- Add-to-calendar, Uber booking integrations
- Popular section ordering for wedding sites

**Useful UI ideas:**
- Feature checklist for MVP scope
- Guest-facing utility features (maps, calendar)
- Note: GPL license — inspiration only, no code reuse

---

## 7. sakib-maho/wedding-invitation-webapp

| Field | Value |
|-------|-------|
| **URL** | https://github.com/sakib-maho/wedding-invitation-webapp |
| **License** | MIT |
| **Stack** | HTML, CSS, JavaScript |

**What we can learn:**
- Guest greeting via URL query parameter
- Dashboard + guest page separation
- Animated hero and section transitions
- Build script for deployable output

**Useful UI ideas:**
- Personalized guest URLs (`?guest=Name` — future feature)
- Countdown + animation patterns
- Guest wishes/comments section

---

## Summary of Applied Patterns

| Pattern | Source Inspiration | Our Implementation |
|---------|-------------------|-------------------|
| Template isolation | Weddingly-Free, SethuWedsAkhil | `src/templates/template-XX/` folders |
| Opening animation | Holymaiden/wedding-app | Template 01 envelope open |
| RSVP form UX | bymilon/wedding-landing-page | Template 01 RsvpSection |
| Countdown timer | Multiple repos | Template 01 Countdown component |
| Section composition | rampatra/wedding-website | Hero → Date → Venue → Gallery → Story → RSVP |
| Config-driven fields | Weddingly-Free | `config.ts` per template |
| Scroll animations | Holymaiden, SethuWedsAkhil | Framer Motion in templates |
